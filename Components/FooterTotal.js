import React from "react";
import { View, Text, Platform } from "react-native";
import { SIZES, COLORS, FONTS } from "../constants";
import { TextButton, LineDivider } from "../Components";
import { LinearGradient } from "expo-linear-gradient";
import { useAuth } from "../context/AuthContext";
//this component used to show price and shipping in cart
const FooterTotal = ({
  subTotal,
  shippingFee,
  total,
  onPress,
  onEmpty,
  containerStyle,
}) => {
  const { dataUser } = useAuth();
  return (
    <View style={{ ...containerStyle }}>
      {/**SHADOW */}
      <LinearGradient
        start={{ X: 0, Y: 0 }}
        end={{ X: 0, Y: 1 }}
        colors={[COLORS.transparent, COLORS.lightGray1]}
        style={{
          position: "absolute",
          top: -15,
          left: 0,
          right: 0,
          height: Platform.OS === "ios" ? 200 : 50,
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
        }}
      />
      {/**ORDER DETAILS */}
      <View
        style={{
          padding: SIZES.padding,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          backgroundColor: COLORS.white,
        }}
      >
        {/* SUBTOTAL */}
        <View style={{ flexDirection: "row" }}>
          <Text style={{ ...FONTS.h3 }}>₪ {subTotal.toFixed(2)}</Text>
          <Text style={{ flex: 1, ...FONTS.body3 }}>المجموع</Text>
        </View>
        {/**SHIPPING FEE */}
        <View
          style={{
            flexDirection: "row",
            marginTop: SIZES.base,
            marginBottom: SIZES.padding,
          }}
        >
          <Text style={{ ...FONTS.h3 }}>₪ {shippingFee.toFixed(2)}</Text>
          <Text style={{ flex: 1, ...FONTS.body3 }}>التوصيل</Text>
        </View>
        {/**LINE DIVIDER */}
        <LineDivider />
        {/**TOTAL */}
        <View
          style={{
            flexDirection: "row",
            marginTop: SIZES.padding,
          }}
        >
          <Text style={{ ...FONTS.h2 }}>₪{total.toFixed(2)}</Text>
          <Text style={{ flex: 1, ...FONTS.h2 }}>المجموع الكلي : </Text>
        </View>
        {/**check out button */}
        {total === 0.0 && dataUser.ismappable ? (
          <TextButton
            buttonContainerStyle={{
              height: 60,
              marginTop: SIZES.padding,
              borderRadius: SIZES.radius,
              backgroundColor: COLORS.primary,
            }}
            label="أضف وجبات"
            onPress={onEmpty}
          />
        ) : dataUser.ismappable ? (
          <TextButton
            buttonContainerStyle={{
              height: 60,
              marginTop: SIZES.padding,
              borderRadius: SIZES.radius,
              backgroundColor: COLORS.primary,
            }}
            label="إحجز طلبك"
            onPress={onPress}
          />
        ) : (
          <TextButton
            buttonContainerStyle={{
              height: 60,
              marginTop: SIZES.padding,
              borderRadius: SIZES.radius,
              backgroundColor: COLORS.transparentPrimray,
            }}
            label="عدل عنوانك لتستطيع الطلب"
            disabled={true}
          />
        )}
      </View>
    </View>
  );
};
export default FooterTotal;
