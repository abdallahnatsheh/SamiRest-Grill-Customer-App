import React, { useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  RefreshControl,
} from "react-native";
import {
  FONTS,
  COLORS,
  SIZES,
  dummyData,
  icons,
  images,
  constants,
} from "../../constants";
import { Header, HorizontalFoodCard } from "../../Components";
import FilterModal from "../../Components/FilterModal";
import shopContext from "../../context/shop-context";
import { useAuth } from "../../context/AuthContext";

const MainMenu = ({ navigation }) => {
  const context = useContext(shopContext);
  const { currentUser, dataUser } = useAuth();

  const [menuList, setMenuList] = React.useState(context.products);

  const [showFilterModal, setShowFilterModal] = React.useState(false);
  function renderSearch() {
    return (
      <View
        style={{
          flexDirection: "row",
          height: 40,
          alignItems: "center",
          marginHorizontal: SIZES.padding,
          marginVertical: SIZES.base,
          paddingHorizontal: SIZES.radius,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.lightGray2,
        }}
      >
        {/**FILTER BTN */}
        <TouchableOpacity onPress={() => setShowFilterModal(true)}>
          <Image
            source={icons.filter}
            style={{ height: 20, width: 20, tintColor: COLORS.black }}
          />
        </TouchableOpacity>
        {/**TEXT INPUT */}
        <TextInput
          style={{
            flex: 1,
            marginRight: SIZES.radius,
            ...FONTS.body3,
            textAlign: "right",
          }}
          placeholder="ابحث عن وجبة ..."
          onChangeText={(text) => {
            let temp = context.products.filter((a) => a.name.includes(text));
            setMenuList(temp);
          }}
        />
        <Image
          source={icons.search}
          style={{ height: 20, width: 20, tintColor: COLORS.black }}
        />
      </View>
    );
  }
  const [refreshing, setRefreshing] = React.useState(false);
  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    console.log("refresj");
    wait(2000).then(() => setRefreshing(false));
  }, []);
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      {/**HEADER */}
      <Header
        containerStyle={{
          height: 50,
          paddingHorizontal: SIZES.padding,
          marginTop: 40,
          alignItems: "center",
        }}
        title="قائمة الوجبات"
        leftComponent={
          <TouchableOpacity
            style={{
              width: 40,
              height: 40,
              alignItems: "center",
              justifyContent: "center",
              borderWidth: 1,
              borderColor: COLORS.gray2,
              borderRadius: SIZES.radius,
            }}
            onPress={() => navigation.goBack()}
          >
            <Image
              source={icons.back}
              style={{ width: 20, height: 20, borderRadius: SIZES.radius }}
            />
          </TouchableOpacity>
        }
        rightComponent={
          <TouchableOpacity
            style={{
              borderRadius: SIZES.radius,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() =>
              currentUser
                ? navigation.navigate("MyAccount")
                : navigation.navigate("SignIn")
            }
          >
            <Image
              source={
                dataUser.personalImage
                  ? { uri: dataUser?.personalImage }
                  : images.profile
              }
              style={{ width: 40, height: 40, borderRadius: SIZES.radius }}
            />
          </TouchableOpacity>
        }
      />
      {/**SEARCH BAR  */}
      {renderSearch()}
      {/**filter modal */}
      {showFilterModal && (
        <FilterModal
          isVisible={showFilterModal}
          onClose={() => setShowFilterModal(false)}
          setMenuList={setMenuList}
          menuList={context.products}
        />
      )}
      {/**MENU LIST  */}
      <FlatList
        data={menuList}
        keyExtractor={(item) => `${item.id}`}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
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
              onPress={() => navigation.navigate("FoodDetail", { item: item })}
            />
          );
        }}
        ListFooterComponent={<View style={{ height: 200 }} />}
      />
    </View>
  );
};

export default MainMenu;
