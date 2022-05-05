import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  FlatList,
} from "react-native";
import { connect } from "react-redux";
import { setSelectedTab } from "../stores/tab/tabAction";
import Home from "./Home/Home";
import CartTab from "./Cart/CartTab";
import SpecialOrder from "./SpecialOrder/SpecialOrder";
import {
  COLORS,
  FONTS,
  SIZES,
  icons,
  constants,
  dummyData,
  images,
} from "../constants";
import { Header } from "../Components";
import { LinearGradient } from "expo-linear-gradient";
import { useAuth } from "../context/AuthContext";

const TabButton = ({ label, icons, isFocused, onPress }) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View
        style={{
          flex: isFocused ? 4 : 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            width: "80%",
            height: 40,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 50,
            backgroundColor: isFocused ? COLORS.primary : COLORS.white,
          }}
        >
          <Image
            source={icons}
            style={{
              width: 20,
              height: 20,
              tintColor: isFocused ? COLORS.white : COLORS.gray,
            }}
          />
          {isFocused && (
            <Text
              numberOfLines={1}
              style={{
                marginLeft: SIZES.base,
                color: COLORS.white,
                ...FONTS.h3,
              }}
            >
              {label}
            </Text>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const MainLayout = ({ navigation, selectedTab, setSelectedTab }) => {
  const { currentUser, dataUser } = useAuth();
  const flatListRef = React.useRef();
  React.useEffect(() => {
    setSelectedTab(constants.screens.home);
  }, []);
  React.useEffect(() => {
    if (selectedTab == constants.screens.home) {
      flatListRef?.current?.scrollToIndex({
        index: 0,
      });
    }
    /*if (selectedTab == constants.screens.mainMenu) {
      flatListRef?.current?.scrollToIndex({
        index: 1,
      });
    }*/
    if (selectedTab == constants.screens.cart) {
      flatListRef?.current?.scrollToIndex({
        index: 2,
      });
    }
    /*if (selectedTab == constants.screens.dailyDeals) {
      flatListRef?.current?.scrollToIndex({
        index: 3,
      });
    }*/
    if (selectedTab == constants.screens.specialOrders) {
      flatListRef?.current?.scrollToIndex({
        index: 4,
      });
    }
  }, [selectedTab]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
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
        title={selectedTab.toUpperCase()}
        rightComponent={
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
            onPress={() => navigation.openDrawer()}
          >
            <Image source={icons.menu} />
          </TouchableOpacity>
        }
        leftComponent={
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
                dataUser?.personalImage
                  ? { uri: dataUser?.personalImage }
                  : dummyData?.myProfile?.profile_image
              }
              style={{ width: 40, height: 40, borderRadius: SIZES.radius }}
            />
          </TouchableOpacity>
        }
      />

      {/**CONTENT */}
      <View style={{ flex: 1 }}>
        <FlatList
          ref={flatListRef}
          horizontal
          scrollEnabled={false}
          pagingEnabled
          snapToAlignment="center"
          snapToInterval={SIZES.width}
          onScrollToIndexFailed={() => {
            flatListRef?.current?.scrollToIndex({
              index: 0,
            });
          }}
          showsHorizontalScrollIndicator={false}
          data={constants.bottom_tabs}
          keyExtractor={(item) => `${item.id}`}
          renderItem={({ item, index }) => {
            return (
              <View style={{ height: SIZES.height, width: SIZES.width }}>
                {item.label == constants.screens.home && (
                  <Home navigation={navigation} />
                )}
                {/*{item.label == constants.screens.mainMenu && (
                  <MainMenu navigation={navigation} />
                )}*/}
                {item.label == constants.screens.cart && (
                  <CartTab navigation={navigation} />
                )}
                {/*
                {item.label == constants.screens.dailyDeals && (
                  <DailyDeals navigation={navigation} />
                )}*/}
                {item.label == constants.screens.specialOrders && (
                  <SpecialOrder />
                )}
              </View>
            );
          }}
        />
      </View>
      {/**FOOTER */}
      <View style={{ height: 75, justifyContent: "flex-end" }}>
        {/**Shadow effect  */}
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 4 }}
          colors={[COLORS.transparent, COLORS.lightGray1]}
          style={{
            position: "absolute",
            top: -20,
            left: 0,
            right: 0,
            height: 100,
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
          }}
        />
        {/**Tabs */}
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            paddingHorizontal: SIZES.radius,
            paddingBottom: 10,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            backgroundColor: COLORS.white,
          }}
        >
          <TabButton
            label={constants.screens.home}
            icons={icons.home}
            isFocused={selectedTab === constants.screens.home}
            onPress={() => setSelectedTab(constants.screens.home)}
          />
          {/*
          <TabButton
            label={constants.screens.mainMenu}
            icons={icons.restaurantMenu}
            isFocused={selectedTab === constants.screens.mainMenu}
            onPress={() => setSelectedTab(constants.screens.mainMenu)}
          />*/}
          <TabButton
            label={constants.screens.cart}
            icons={icons.cart}
            isFocused={selectedTab === constants.screens.cart}
            onPress={() => setSelectedTab(constants.screens.cart)}
          />
          {/*
          <TabButton
            label={constants.screens.dailyDeals}
            icons={icons.coupon}
            isFocused={selectedTab === constants.screens.dailyDeals}
            onPress={() => setSelectedTab(constants.screens.dailyDeals)}
          />*/}
          <TabButton
            label={constants.screens.specialOrders}
            icons={icons.specialOrder}
            isFocused={selectedTab === constants.screens.specialOrders}
            onPress={() => setSelectedTab(constants.screens.specialOrders)}
          />
        </View>
      </View>
    </View>
  );
};

function mapStateToProps(state) {
  return { selectedTab: state.tabReducer.selectedTab };
}
function mapDispatchToProps(dispatch) {
  return {
    setSelectedTab: (selectedTab) => {
      return dispatch(setSelectedTab(selectedTab));
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(MainLayout);
