import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

import { TextButton, OrderStatus } from "../Components";
import { FONTS, COLORS, SIZES, images } from "../constants";

const OrderCard = ({ orderItem }) => {
  const navigation = useNavigation();
  function getStatus() {
    if (orderItem.status == "تم التوصيل") {
      return "DELIVERED";
    } else if (orderItem.status == "قيد التوصيل") {
      return "ONWAY";
    } else if (orderItem.status == "وضع الانتظار") {
      return "PENDING";
    } else if (orderItem.status == "قيد الطبخ") {
      return "COOKING";
    } else if (orderItem.status == "طلب جاهز") {
      return "DONE";
    }
  }

  return (
    <View
      style={{
        marginBottom: SIZES.radius,
        padding: SIZES.radius,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.lightGray2,
      }}
    >
      {/* Order Info */}
      <View
        style={{
          flexDirection: "row",
        }}
      >
        {/* Price / Order no */}
        {orderItem.orderType != "special" && (
          <View>
            <Text
              style={{
                color: COLORS.primary,
                ...FONTS.h2,
                fontSize: 18,
              }}
            >
              {orderItem.totalPrice} ₪
            </Text>
          </View>
        )}
        {/* Info */}
        <View
          style={{
            flex: 1,
            marginRight: SIZES.radius,
            flexWrap: "wrap-reverse",
          }}
        >
          {orderItem.orderType == "special" && (
            <Text style={{ ...FONTS.h2, fontSize: 18 }}>
              {orderItem.orders.name}
            </Text>
          )}

          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap-reverse",
            }}
          >
            {/* Item count */}
            <Text style={{ ...FONTS.body4, color: COLORS.gray }}>
              {orderItem.orderType != "special"
                ? orderItem.orders.length
                : orderItem.orders.quantity}
              وجبة
            </Text>
            {/* dot separator */}
            <View
              style={{
                backgroundColor: COLORS.gray,
                marginHorizontal: SIZES.base,
                height: 4,
                width: 4,
                borderRadius: 2,
                alignSelf: "center",
              }}
            />
            {/* Delivered Timestamp */}
            <Text style={{ color: COLORS.gray, ...FONTS.body4 }}>
              {orderItem.date + " , " + orderItem.time}
            </Text>
          </View>

          <OrderStatus
            status={getStatus()}
            containerStyle={{
              marginTop: 0,
            }}
            labelStyle={{
              ...FONTS.body4,
            }}
          />
        </View>

        {/* Logo */}
        <View
          style={{
            width: 60,
            height: 60,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 10,
            backgroundColor: COLORS.white,
          }}
        >
          <Image
            source={
              getStatus() == "DELIVERED"
                ? images.done
                : getStatus() == "ONWAY"
                ? images.delivering
                : getStatus() == "PENDING"
                ? images.pending
                : getStatus() == "COOKING"
                ? images.cooking
                : images.done
            }
            style={{
              width: 35,
              height: 35,
              tintColor: COLORS.primary,
            }}
          />
        </View>
      </View>

      {/* Buttons */}
      <View
        style={{
          flexDirection: "row",
          marginTop: SIZES.radius,
        }}
      >
        {
          // On the way --> Track Order + Cancel
          orderItem.status == "قيد التوصيل" && (
            <>
              <TextButton
                buttonContainerStyle={{
                  ...styles.textButtonContainer,
                  backgroundColor: COLORS.primary,
                }}
                label="تتبع الطلب"
                labelStyle={{
                  ...FONTS.body4,
                }}
                onPress={() => navigation.navigate("Map")}
              />

              <TextButton
                buttonContainerStyle={{
                  ...styles.textButtonContainer,
                  backgroundColor: COLORS.transparentPrimary9,
                  marginLeft: SIZES.radius,
                }}
                label="معلومات الطلب"
                labelStyle={{
                  ...FONTS.body4,
                  color: COLORS.primary,
                }}
                onPress={() =>
                  navigation.navigate("DeliveryStatus", {
                    orderItem: orderItem,
                  })
                }
              />
            </>
          )
        }

        {
          // Delivered / Cancel --> Re-order + Rate
          orderItem.status != "قيد التوصيل" && (
            <>
              <TextButton
                buttonContainerStyle={{
                  ...styles.textButtonContainer,
                  backgroundColor: COLORS.primary,
                }}
                label="معلومات الطلب"
                labelStyle={{
                  ...FONTS.h4,
                }}
                onPress={() =>
                  navigation.navigate("DeliveryStatus", {
                    orderItem: orderItem,
                  })
                }
              />
            </>
          )
        }
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textButtonContainer: {
    flex: 1,
    height: 40,
    borderRadius: 10,
  },
});

export default OrderCard;
