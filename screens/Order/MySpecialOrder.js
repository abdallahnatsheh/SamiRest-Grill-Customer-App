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
import { useProfileSpecialOrdersHook } from "../../Hooks/specialOrdersHook";

const MySpecialOrder = ({ navigation }) => {
  const { currentUser, dataUser } = useAuth();
  //get order data from this custom hook
  const ordersList = useProfileSpecialOrdersHook();
  //main orders list
  const [orders, setOrders] = useState(ordersList);

  useEffect(() => {
    setOrders(ordersList);
  }, [ordersList]);

  function renderHeader() {
    return (
      <Header
        title="طلباتي الخاصة"
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
                  setOrders(ordersList);
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
              <TouchableOpacity
                onPress={() => {
                  setOrders(ordersList);
                }}
              ></TouchableOpacity>
            </View>
          }
        />
      </View>
    );
  }

  return currentUser ? (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}
    >
      {renderHeader()}
      {renderOrders()}
    </View>
  ) : (
    <View>
      <TouchableOpacity
        onPress={navigation.replace("SignIn")}
      ></TouchableOpacity>
    </View>
  );
};

export default MySpecialOrder;
