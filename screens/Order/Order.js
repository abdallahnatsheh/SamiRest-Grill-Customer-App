import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  SectionList,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  RefreshControl,
} from "react-native";

import { Header, IconBotton, TextButton, OrderCard } from "../../Components";
import {
  COLORS,
  SIZES,
  FONTS,
  icons,
  images,
  dummyData,
} from "../../constants";
import { useAuth } from "../../context/AuthContext";
import { useProfileOrdersHook } from "../../Hooks/profileOrdersHook";

const Order = ({ navigation }) => {
  const { currentUser, dataUser } = useAuth();
  const [selectedTab, setSelectedTab] = useState("2");
  //get order data from this custom hook
  const ordersList = useProfileOrdersHook();
  //main orders list
  const [orders, setOrders] = useState(deliverylistmaker());

  useEffect(() => {
    setOrders(deliverylistmaker());
  }, [ordersList]);

  function bookorderlistmaker() {
    const tempList = ordersList.filter((item) => item.orderType == "reserve");
    return tempList;
  }
  function deliverylistmaker() {
    const tempList = ordersList.filter((item) => item.orderType == "deliver");
    return tempList;
  }
  function renderHeader() {
    return (
      <Header
        title="طلباتي"
        containerStyle={{
          height: 50,
          marginHorizontal: SIZES.padding,
          marginTop: 40,
        }}
        leftComponent={
          <IconBotton
            icon={icons.back}
            containerStyle={{
              width: 40,
              height: 40,
              justifyContent: "center",
              alignItems: "center",
              borderWidth: 1,
              borderRadius: SIZES.radius,
              borderColor: COLORS.gray2,
            }}
            iconStyle={{
              width: 20,
              height: 20,
              tintColor: COLORS.gray2,
            }}
            onPress={() => navigation.goBack()}
          />
        }
        rightComponent={
          <TouchableOpacity
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
    );
  }

  function renderTabButtons() {
    return (
      <View
        style={{
          flexDirection: "row",
          height: 50,
          marginTop: SIZES.radius,
          paddingHorizontal: SIZES.padding,
        }}
      >
        <TextButton
          buttonContainerStyle={{
            flex: 1,
            borderRadius: SIZES.radius,
            backgroundColor:
              selectedTab == "1" ? COLORS.primary : COLORS.transparentPrimary9,
          }}
          label="طلبات حجز"
          labelStyle={{
            color: selectedTab == "1" ? COLORS.white : COLORS.primary,
          }}
          onPress={() => {
            setSelectedTab("1");
            setOrders(bookorderlistmaker());
          }}
        />
        <TextButton
          buttonContainerStyle={{
            flex: 1,
            marginLeft: SIZES.padding,
            borderRadius: SIZES.radius,
            backgroundColor:
              selectedTab == "2" ? COLORS.primary : COLORS.transparentPrimary9,
          }}
          label="طلبات توصيل"
          labelStyle={{
            color: selectedTab == "2" ? COLORS.white : COLORS.primary,
          }}
          onPress={() => {
            setSelectedTab("2");
            setOrders(deliverylistmaker());
          }}
        />
      </View>
    );
  }

  function renderOrders() {
    return (
      <View
        style={{
          flex: 1,
          paddingTop: SIZES.padding,
          paddingHorizontal: SIZES.padding,
        }}
      >
        <FlatList
          data={orders}
          keyExtractor={(item) => `${item.id}`}
          stickySectionHeadersEnabled={false}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => <OrderCard orderItem={item} />}
          ListFooterComponent={
            <View style={{ height: 50 }}>
              <TouchableOpacity
                onPress={() => {
                  setSelectedTab("2");
                  setOrders(deliverylistmaker());
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
          ListEmptyComponent={
            <View>
              <Text
                style={{
                  textAlign: "center",
                  justifyContent: "center",
                  padding: 10,
                  ...FONTS.h2,
                }}
              >
                لا يوجد طلبات حتى الان
              </Text>
            </View>
          }
        />
      </View>
    );
  }

  return currentUser ? (
    ordersList ? (
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.white,
        }}
      >
        {renderHeader()}
        {renderTabButtons()}
        {renderOrders()}
      </View>
    ) : (
      <ActivityIndicator />
    )
  ) : (
    <View>
      <TouchableOpacity
        onPress={navigation.replace("SignIn")}
      ></TouchableOpacity>
    </View>
  );
};

export default Order;