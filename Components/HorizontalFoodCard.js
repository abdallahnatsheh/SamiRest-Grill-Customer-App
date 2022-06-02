import React from "react";
import { View, TouchableOpacity, Text, Image } from "react-native";
import { COLORS, FONTS, SIZES, icons } from "../constants";
import axios from "axios";

const HorizontalFoodCard = ({ containerStyle, imageStyle, item, onPress }) => {
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

  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.lightGray2,
        ...containerStyle,
      }}
      onPress={onPress}
    >
      {/**Image section */}
      <Image
        source={{ uri: item?.img }}
        style={imageStyle}
        resizeMode="contain"
      />

      {/**INFO SECTION */}
      <View style={{ flex: 1, paddingRight: 6, paddingTop: 15 }}>
        {/**name */}
        <Text style={{ ...FONTS.h3, fontSize: 17 }}>{item?.name}</Text>
        {/**info */}
        <Text style={{ ...FONTS.body4, color: COLORS.darkGray2 }}>
          {item?.info.length < 20
            ? item?.info
            : item?.info.slice(0, 15) + "..."}
        </Text>
        {/**price */}
        {(item?.deals.enabled && !item?.deals.dailyDealEnable) ||
        (item?.deals.enabled &&
          item?.deals.dailyDealEnable &&
          today >= new Date(item?.deals.fromDate.seconds * 1000) &&
          today < new Date(item?.deals.toDate.seconds * 1000)) ? (
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                ...FONTS.h2,
                marginTop: SIZES.base,
                color: item?.deals.dailyDealEnable
                  ? COLORS.yellow
                  : COLORS.primary,
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
          <Text style={{ ...FONTS.h2, marginTop: SIZES.base }}>
            ₪{item?.price.defaultPrice.value}
          </Text>
        )}
      </View>
      {/** DEALS    */}
      {(item?.deals.enabled && !item?.deals.dailyDealEnable) ||
      (item?.deals.enabled &&
        item?.deals.dailyDealEnable &&
        today >= new Date(item?.deals.fromDate.seconds * 1000) &&
        today < new Date(item?.deals.toDate.seconds * 1000)) ? (
        <View
          style={{
            flexDirection: "row",
            position: "absolute",
            top: 5,
            right: SIZES.radius,
          }}
        >
          <Text
            style={{
              color:
                item?.deals.dailyDealEnable &&
                today >= new Date(item?.deals.fromDate.seconds * 1000) &&
                today < new Date(item?.deals.toDate.seconds * 1000)
                  ? COLORS.yellow
                  : COLORS.primary,
              ...FONTS.body4,
              paddingLeft: 3,
            }}
          >
            -{item?.deals.value}%
          </Text>
          <Image
            source={icons.coupon}
            style={{
              width: 20,
              height: 20,
              tintColor:
                item?.deals.dailyDealEnable &&
                today >= new Date(item?.deals.fromDate.seconds * 1000) &&
                today < new Date(item?.deals.toDate.seconds * 1000)
                  ? COLORS.yellow
                  : COLORS.primary,
            }}
            resizeMode="contain"
          />
        </View>
      ) : (
        <View
          style={{
            flexDirection: "row",
            position: "absolute",
            top: 5,
            right: SIZES.radius,
          }}
        >
          <Image
            style={{ width: 20, height: 20, tintColor: COLORS.primary }}
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
      )}
    </TouchableOpacity>
  );
};
export default HorizontalFoodCard;
