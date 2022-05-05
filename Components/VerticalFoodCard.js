import React from "react";
import { View, TouchableOpacity, Text, Image } from "react-native";
import { COLORS, FONTS, SIZES, icons } from "../constants";

const VerticalFoodCard = ({ containerStyle, item, onPress }) => {
  return (
    <TouchableOpacity
      style={{
        width: 200,
        padding: SIZES.radius,
        alignItems: "center",
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.lightGray2,
        ...containerStyle,
      }}
      onPress={onPress}
    >
      {/**DEALS*/}
      {item?.deals?.enabled ? (
        <View
          style={{
            flexDirection: "row",
          }}
        >
          {/**DEALS */}

          <View style={{ flex: 1, flexDirection: "row", paddingLeft: 125 }}>
            <Text
              style={{
                color: COLORS.yellow,
                ...FONTS.body4,
                paddingLeft: 3,
              }}
            >
              -{item?.deals.value}%
            </Text>
            <Image
              source={icons.coupon}
              style={{ width: 20, height: 20, tintColor: COLORS.yellow }}
              resizeMode="contain"
            />
          </View>
        </View>
      ) : (
        <View
          style={{
            flexDirection: "row",
          }}
        >
          {/**CALORIES */}

          <View style={{ flex: 1, flexDirection: "row" }}>
            <Image
              style={{ width: 20, height: 20, tintColor: COLORS.yellow }}
              resizeMode="contain"
            />
            <Text
              style={{
                color: COLORS.primary,
                ...FONTS.body4,
                paddingLeft: 3,
              }}
            ></Text>
          </View>
        </View>
      )}
      {/**Image section */}
      <View
        style={{
          height: 150,
          width: 150,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          source={{ uri: item?.img }}
          style={{ width: 150, height: 150, bottom: 13 }}
          resizeMode="contain"
        />
      </View>
      {/**INFO SECTION */}

      <View style={{ alignItems: "center", marginTop: -20 }}>
        {/**name */}
        <Text style={{ ...FONTS.h3 }}>{item?.name}</Text>

        {/**info */}
        <Text
          style={{
            ...FONTS.body5,
            color: COLORS.darkGray2,
            textAlign: "center",
          }}
        >
          {item?.info?.length < 20
            ? item?.info
            : item?.info.slice(0, 15) + "..."}
        </Text>
        {/**price */}
        {item?.deals.enabled ? (
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                ...FONTS.h2,
                marginTop: SIZES.radius,
                color: COLORS.yellow,
              }}
            >
              ₪
              {(
                item?.price.defaultPrice.value -
                (item?.price.defaultPrice.value * item?.deals.value) / 100
              ).toFixed(2)}
            </Text>
          </View>
        ) : (
          <Text style={{ ...FONTS.h2, marginTop: SIZES.radius }}>
            ₪{item?.price.defaultPrice.value}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};
export default VerticalFoodCard;
