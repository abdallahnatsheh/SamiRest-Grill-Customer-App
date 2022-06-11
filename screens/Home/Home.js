import React, { useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  RefreshControl,
} from "react-native";
import {
  FONTS,
  COLORS,
  SIZES,
  dummyData,
  icons,
  constants,
} from "../../constants";
import {
  HorizontalFoodCard,
  VerticalFoodCard,
  LocationModal,
} from "../../Components";
import { useAuth } from "../../context/AuthContext";
import shopContext from "../../context/shop-context";
import * as Location from "expo-location";
import { ToastAndroid } from "react-native";
import MapViewDirections from "react-native-maps-directions";
import axios from "axios";
import { isPointInPolygon } from "geolib";

const Home = ({ navigation }) => {
  const { currentUser, dataUser } = useAuth();
  const context = useContext(shopContext);
  //location live complete text places
  const [showLocationModal, setShowLocationModal] = React.useState(false);
  //check location mapping ability
  const [ifLocMapped, setIfLocMapped] = React.useState("");
  const [locationEnable, setLocationEnable] = React.useState(true);
  const [today, setToday] = React.useState("");

  React.useEffect(() => {
    function getCurrentTime() {
      axios
        .get(`http://worldtimeapi.org/api/timezone/Asia/Jerusalem`)
        .then((res) => {
          setToday(new Date(JSON.stringify(res.data.datetime).slice(1, -1)));
        });
    }
    getCurrentTime();
  }, []);

  //to track selection of category
  React.useEffect(async () => {
    if (currentUser && dataUser) {
      try {
        let result = await Location.geocodeAsync(
          dataUser.firstAddress + "," + dataUser?.secondAddress
        );
        setIfLocMapped(result[0]);
        if (result[0]) {
          dataUser.ismappable = true;
          dataUser.locationCoor = result[0];
        } else {
          dataUser.ismappable = false;
        }
      } catch (e) {
        console.log("geo error:", e.message);
      }
    }
  }, [currentUser, dataUser, dataUser.firstAddress, dataUser.shippingType]);

  const createDailyDealList = () => {
    //retrive popular list
    let tempDailyDealsList = context.products.filter(
      (a) =>
        (a.deals.enabled &&
          a.deals.dailyDealEnable &&
          today >= new Date(a.deals.fromDate.seconds * 1000) &&
          today < new Date(a.deals.toDate.seconds * 1000)) == true
    );
    let dailyDealsList =
      [tempDailyDealsList].length >= 3
        ? tempDailyDealsList.sort(() => 0.5 - Math.random())
        : tempDailyDealsList;
    //set popular list based on category id
    return dailyDealsList.slice(0, 3);
  };
  const createDealList = () => {
    //retrive the deals list  menu
    let teampDealsList = context.products.filter(
      (a) => a.deals.enabled && !a.deals.dailyDealEnable == true
    );
    // select three random meals from list if length bigger or equal to three items
    let dealsList =
      [teampDealsList].length >= 3
        ? teampDealsList.sort(() => 0.5 - Math.random())
        : teampDealsList;
    //set the recommended menu based on categoryId
    return dealsList.slice(0, 3);
  };
  //handler make main menu list and render only random 3 meals
  const createMainMenu = () => {
    // select three random meals from list if length bigger or equal to three items
    let selectedMenu =
      context.products.length >= 3
        ? context.products.sort(() => 0.5 - Math.random()).slice(0, 3)
        : context.products;
    //return menu list
    return selectedMenu;
  };
  function getDuration() {
    //this function used to check if the customer address support delivery service
    //by checking if he is inside the supported area using google map polygon coordinates
    //and then get the delivery duration for the best and closest road
    let ifInside =
      ifLocMapped &&
      isPointInPolygon(
        {
          latitude: ifLocMapped?.latitude,
          longitude: ifLocMapped?.longitude,
        },
        [
          { latitude: 31.7524789, longitude: 35.2478983 },
          { latitude: 31.7555076, longitude: 35.2499796 },
          { latitude: 31.7588281, longitude: 35.2518893 },
          { latitude: 31.7620027, longitude: 35.2529408 },
          { latitude: 31.7653232, longitude: 35.2522756 },
          { latitude: 31.7669653, longitude: 35.2472975 },
          { latitude: 31.7662719, longitude: 35.2424052 },
          { latitude: 31.7596308, longitude: 35.2361821 },
          { latitude: 31.7545222, longitude: 35.235045 },
          { latitude: 31.7517124, longitude: 35.2350773 },
          { latitude: 31.7489026, longitude: 35.2359679 },
          { latitude: 31.7493407, longitude: 35.2423621 },
          { latitude: 31.7505449, longitude: 35.2454306 },
          { latitude: 31.7524789, longitude: 35.2478983 },
        ]
      );
    let ifOutide =
      ifLocMapped &&
      isPointInPolygon(
        {
          latitude: ifLocMapped?.latitude,
          longitude: ifLocMapped?.longitude,
        },
        [
          { latitude: 31.7606916, longitude: 35.2560904 },
          { latitude: 31.7682441, longitude: 35.255061 },
          { latitude: 31.774337, longitude: 35.2512847 },
          { latitude: 31.7796272, longitude: 35.248023 },
          { latitude: 31.7827283, longitude: 35.2413275 },
          { latitude: 31.7798827, longitude: 35.2364346 },
          { latitude: 31.7755777, longitude: 35.233087 },
          { latitude: 31.7712725, longitude: 35.2278515 },
          { latitude: 31.7647782, longitude: 35.2257063 },
          { latitude: 31.7465661, longitude: 35.2235946 },
          { latitude: 31.7413195, longitude: 35.2233238 },
          { latitude: 31.7344669, longitude: 35.2257995 },
          { latitude: 31.7303972, longitude: 35.240363 },
          { latitude: 31.7352702, longitude: 35.2525335 },
          { latitude: 31.7443768, longitude: 35.2555211 },
          { latitude: 31.7606916, longitude: 35.2560904 },
        ]
      );

    if (ifInside && ifOutide) {
      dataUser.shippingType = "inside";
    } else if (!ifInside && ifOutide) {
      dataUser.shippingType = "outside";
    } else if (!ifInside && !ifOutide) {
      dataUser.shippingType = "away";
    }
    return (
      <MapViewDirections
        origin={dummyData.fromLocs[1]}
        destination={{
          latitude: ifLocMapped ? ifLocMapped.latitude : 0,
          longitude: ifLocMapped ? ifLocMapped.longitude : 0,
        }}
        apikey={constants.GOOGLE_MAP_API_KEY}
        mode="DRIVING"
        optimizeWaypoints={true}
        onReady={(result) => {
          dataUser.traverDuration = Math.ceil(result.duration);
          dataUser.locationDistance = result.distance;
        }}
      />
    );
  }
  async function handleGetLocation() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setLocationEnable(false);
      return;
    } else {
      setLocationEnable(true);
      setShowLocationModal(true);
    }
    if (currentUser && dataUser) {
      try {
        let result = await Location.geocodeAsync(
          dataUser.firstAddress + "," + dataUser?.secondAddress
        );
        setIfLocMapped(result[0]);
        if (result[0]) {
          dataUser.ismappable = true;
          dataUser.locationCoor = result[0];
        } else {
          dataUser.ismappable = false;
        }
      } catch (e) {
        console.log("geo error:", e.message);
      }
    }
  }
  // this function to follow google play policy of using location service
  function UseLocationWithAlert() {
    if (currentUser) {
      Alert.alert(
        "ملاحظة",
        "  تطبيق توصيل مطعم سامي يستخدم صلاحيات الموقع من اجل تحديد موقع عنوانك على الخريطة من اجل خدمة توصيل دقيقة ",
        [
          {
            text: "لا اوافق",
          },
          {
            text: "موافق",
            onPress: handleGetLocation,
          },
        ]
      );
    } else {
      Alert.alert("خطأ", "سجل دخولك اولا", [{ text: "حسناً" }]);
    }
  }
  // render flat list section and check if location permission is granted
  const Section = ({ title, onPress, children }) => {
    if (!locationEnable) {
      ToastAndroid.showWithGravity(
        "عليك تفعيل صلاحيات الموقع ",
        10,
        ToastAndroid.BOTTOM
      );
    }

    return (
      <View>
        {/**HEADER */}
        <View
          style={{
            flexDirection: "row",
            marginHorizontal: SIZES.padding,
            marginTop: 30,
            marginBottom: 20,
          }}
        >
          <TouchableOpacity onPress={onPress}>
            <Text style={{ color: COLORS.primary, ...FONTS.body3 }}>
              اظهر باقي القائمة
            </Text>
          </TouchableOpacity>
          <Text style={{ flex: 1, ...FONTS.h3 }}>{title}</Text>
        </View>
        {/**CONTENT */}
        {children}
      </View>
    );
  };

  function renderMenuTypes() {
    return (
      <Section
        title="قائمة الوجبات"
        onPress={() => navigation.navigate("MainMenu")}
      ></Section>
    );
  }
  //render 3 random orders that have deals
  function renderDeals() {
    return (
      <Section title="الخصومات" onPress={() => navigation.navigate("MainMenu")}>
        <FlatList
          data={createDealList()}
          keyExtractor={(item) => `${item.id}`}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => {
            return (
              <HorizontalFoodCard
                containerStyle={{
                  height: 180,
                  width: SIZES.width * 0.85,
                  marginLeft: index == 0 ? SIZES.padding : 18,
                  marginRight: SIZES.base,
                  paddingRight: SIZES.radius,
                  alignItems: "center",
                }}
                imageStyle={{
                  height: 150,
                  width: 150,
                  alignItems: "center",
                }}
                item={item}
                onPress={() =>
                  navigation.navigate("FoodDetail", { item: item })
                }
              />
            );
          }}
          ListEmptyComponent={
            <View style={{ marginLeft: 120 }}>
              <Text
                style={{
                  padding: 10,
                  ...FONTS.h4,
                }}
              >
                لايوجد خصومات , او انتظر ...
              </Text>
            </View>
          }
        />
      </Section>
    );
  }
  //render 3 random daily deals orders
  function renderDailyDeals() {
    return (
      <Section
        title="العروض اليومية"
        onPress={() => navigation.navigate("DailyDeals", { today: today })}
      >
        <FlatList
          horizontal
          data={createDailyDealList()}
          keyExtractor={(item) => `${item.id}`}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <TouchableOpacity>
              <VerticalFoodCard
                containerStyle={{
                  marginLeft: index == 0 ? SIZES.padding : 18,
                  marginRight: SIZES.base,
                }}
                item={item}
                onPress={() =>
                  navigation.navigate("FoodDetail", { item: item })
                }
              />
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <View style={{ marginLeft: 85 }}>
              <Text
                style={{
                  padding: 10,
                  ...FONTS.h4,
                }}
              >
                لايوجد عروض يومية, او انتظر ...
              </Text>
            </View>
          }
        />
      </Section>
    );
  }
  /*
  //category menu for future use
  function renderFoodCategories() {
    return (
      <FlatList
        horizontal
        data={dummyData.categories}
        keyExtractor={(item) => `${item.id}`}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={{
              flexDirection: "row",
              height: 55,
              marginTop: SIZES.padding,
              marginLeft: index == 0 ? SIZES.padding : SIZES.radius,
              marginRight:
                index == dummyData.categories.length - 1 ? SIZES.padding : 0,
              paddingHorizontal: 8,
              borderRadius: SIZES.radius,
              backgroundColor:
                selectCatId == item.id ? COLORS.primary : COLORS.lightGray2,
            }}
            onPress={() => {
              setSelectCatId(item.id);
              handleChangeCategory(item.id, selectMenuType);
            }}
          >
            <Image
              source={item.icon}
              style={{ marginTop: 5, height: 50, width: 50 }}
            />
            <Text
              style={{
                alignSelf: "center",
                marginRight: SIZES.base,
                color: selectCatId == item.id ? COLORS.white : COLORS.darkGray,
                ...FONTS.h3,
              }}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    );
  }*/
  //show customer address with the ability to change it using google places api
  function renderDeliveryto() {
    return (
      <View
        style={{ marginTop: SIZES.padding, marginHorizontal: SIZES.padding }}
      >
        <Text style={{ color: COLORS.primary, ...FONTS.body3 }}>
          التوصيل إلى
        </Text>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            marginTop: SIZES.base,
            alignItems: "center",
          }}
          onPress={() => UseLocationWithAlert()}
        >
          <Image
            source={icons.down_arrow}
            style={{
              marginRight: SIZES.base,
              height: 20,
              width: 20,
              tintColor: COLORS.primary,
            }}
          />
          <Text style={{ ...FONTS.h3 }}>
            {dataUser.firstAddress && ifLocMapped
              ? dataUser.firstAddress + "," + dataUser?.secondAddress
              : dataUser.firstAddress && !ifLocMapped
              ? "عدل عنوانك لانه لايمكن تحديده على الخريطة"
              : !currentUser
              ? " سجل دخولك حتى تستطيع الطلب"
              : "قم بادخال معلوماتك حتى تتمكن من الطلب"}
          </Text>
        </TouchableOpacity>
        {/**location modal */}
        {showLocationModal && dataUser.firstAddress && (
          <LocationModal
            isVisible={showLocationModal}
            onClose={() => setShowLocationModal(false)}
          />
        )}
      </View>
    );
  }
  //refresh the page to be updated
  const [refreshing, setRefreshing] = React.useState(false);
  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    navigation.replace("Home");
    wait(2000).then(() => setRefreshing(false));
  }, []);
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      {context.products ? (
        <FlatList
          data={createMainMenu()}
          extraData={dataUser}
          keyExtractor={(item) => `${item.id}`}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListHeaderComponent={
            <View>
              {/**DELIVERY ADDRESS SECTION */}
              {renderDeliveryto()}
              {/**just a easy way to get travel duration to customer location */}
              {getDuration()}
              {/**food category */}
              {/*renderFoodCategories()*/}

              {/**DAILY DEALS SECTION */}
              {renderDailyDeals()}
              {/**RECOMMENDED SECTION */}
              {renderDeals()}
              {/**Menu Types */}
              {renderMenuTypes()}
            </View>
          }
          renderItem={({ item, index }) => {
            return (
              <HorizontalFoodCard
                containerStyle={{
                  height: 130,
                  alignItems: "center",
                  marginHorizontal: SIZES.padding,
                  marginBottom: SIZES.radius,
                }}
                imageStyle={{
                  marginTop: 20,
                  height: 110,
                  width: 110,
                }}
                item={item}
                onPress={() =>
                  navigation.navigate("FoodDetail", { item: item })
                }
              />
            );
          }}
          ListFooterComponent={<View style={{ height: 200 }} />}
          ListEmptyComponent={
            <View>
              <TouchableOpacity
                onPress={() => {
                  onRefresh();
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    justifyContent: "center",
                    padding: 10,
                    color: COLORS.primary,
                    ...FONTS.h4,
                  }}
                >
                  اضغط هنا للتحديث
                </Text>
              </TouchableOpacity>
            </View>
          }
        />
      ) : (
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});
export default Home;
