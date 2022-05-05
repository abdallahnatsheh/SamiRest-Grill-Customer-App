import React, { useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  RefreshControl,
} from "react-native";
import { FONTS, COLORS, SIZES, dummyData, icons } from "../../constants";
import { HorizontalFoodCard, VerticalFoodCard } from "../../Components";
import { useAuth } from "../../context/AuthContext";
import shopContext from "../../context/shop-context";

const Home = ({ navigation }) => {
  const { currentUser, dataUser } = useAuth();
  const context = useContext(shopContext);

  //to track select category
  //const [selectCatId, setSelectCatId] = React.useState(1);
  //track selected menu
  //const [selectMenuType, setSelectMenuType] = React.useState(1);
  //to show menu list
  const [menuList, setMenuList] = React.useState([]);
  //deals list
  const [dealList, setDealList] = React.useState([]);
  //daily deals menu list
  const [popular, setPopular] = React.useState([]);

  //to track selection of category
  React.useEffect(() => {
    //retrive popular list
    let tempDailyDealsList = context.products.filter(
      (a) => (a.deals.enabled && a.deals.dailyDealEnable) == true
    );
    let dailyDealsList =
      [tempDailyDealsList].length >= 3
        ? tempDailyDealsList.sort(() => 0.5 - Math.random())
        : tempDailyDealsList;

    //retrive the deals list  menu
    let teampDealsList = context.products.filter(
      (a) => a.deals.enabled && !a.deals.dailyDealEnable == true
    );
    // select three random meals from list if length bigger or equal to three items
    let dealsList =
      [teampDealsList].length >= 3
        ? teampDealsList.sort(() => 0.5 - Math.random())
        : teampDealsList;

    // select three random meals from list if length bigger or equal to three items
    let selectedMenu =
      context.products.length >= 3
        ? context.products.sort(() => 0.5 - Math.random()).slice(0, 3)
        : context.products;

    //set popular list based on category id
    setPopular(dailyDealsList.slice(0, 3));
    //set the recommended menu based on categoryId
    setDealList(dealsList.slice(0, 3));
    //set menu list
    setMenuList(selectedMenu);
  }, []);
  //handler

  const Section = ({ title, onPress, children }) => {
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
              أظهر الجميع
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

  function renderDeals() {
    return (
      <Section title="الخصومات" onPress={() => navigation.navigate("MainMenu")}>
        <FlatList
          data={dealList}
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
                  marginRight: index == dealList.length - 1 ? SIZES.padding : 0,
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
        />
      </Section>
    );
  }
  function renderDailyDeals() {
    return (
      <Section
        title="العروض اليومية"
        onPress={() => navigation.navigate("DailyDeals")}
      >
        <FlatList
          horizontal
          data={popular}
          keyExtractor={(item) => `${item.id}`}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <TouchableOpacity>
              <VerticalFoodCard
                containerStyle={{
                  marginLeft: index == 0 ? SIZES.padding : 18,
                  marginRight: index == popular.length - 1 ? SIZES.padding : 0,
                }}
                item={item}
                onPress={() =>
                  navigation.navigate("FoodDetail", { item: item })
                }
              />
            </TouchableOpacity>
          )}
        />
      </Section>
    );
  }
  /* function renderFoodCategories() {
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
            {dataUser.firstAddress && dataUser.secondAddress
              ? dataUser.firstAddress + "," + dataUser.secondAddress
              : "قم بادخال معلوماتك حتى تتمكن من الطلب"}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
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
      {popular && dealList && menuList ? (
        <FlatList
          data={menuList}
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
