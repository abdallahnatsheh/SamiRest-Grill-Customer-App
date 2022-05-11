import React, { useState } from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { Header, IconBotton, TextButton, OrderCard } from "../../Components";
import { COLORS, SIZES, FONTS, icons, dummyData } from "../../constants";
import { useAuth } from "../../context/AuthContext";
import { useProfileOrdersHook } from "../../Hooks/profileOrdersHook";

const Order = ({ navigation }) => {
  //import the data of the user
  const { currentUser, dataUser } = useAuth();

  //set selected list tab to be delivery list
  const [selectedTab, setSelectedTab] = useState("2");

  //get order data from this custom hook
  const ordersList = useProfileOrdersHook();

  //filter order list to the reserve type of deliveries
  function bookorderlistmaker() {
    const tempList = ordersList.filter((item) => item.orderType == "reserve");
    return tempList;
  }

  //filter order list to the delivery type of deliveries
  function deliverylistmaker() {
    const tempList = ordersList.filter((item) => item.orderType == "deliver");
    return tempList;
  }

  //render screen header and show user picture if existed
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

  //tab buttons to choose the list of delivery types
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
          }}
        />
      </View>
    );
  }

  //rednder delivery order list depending on the selected tab to choose the type of the list
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
          data={selectedTab == 2 ? deliverylistmaker() : bookorderlistmaker()}
          keyExtractor={(item) => `${item.id}`}
          stickySectionHeadersEnabled={false}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <OrderCard orderItem={item} dataUser={dataUser} />
          )}
          ListFooterComponent={
            <View style={{ height: 50 }}>
              <TouchableOpacity
                onPress={() => {
                  setSelectedTab("2");
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
  //show the screen if user is logged in , and if orderlist existed
  return currentUser ? (
    ordersList.length >= 0 ? (
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
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    )
  ) : (
    <View>
      <TouchableOpacity
        onPress={navigation.replace("SignIn")}
      ></TouchableOpacity>
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
export default Order;
