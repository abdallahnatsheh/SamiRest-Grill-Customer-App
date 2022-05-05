import React from "react";
import { View, Text } from "react-native";
import PropTypes from "prop-types";

import { COLORS, FONTS, SIZES } from "../constants";

const OrderStatus = ({ status, containerStyle, labelStyle }) => {
  function getColor() {
    if (status == "DELIVERED" || status == "ONWAY" || status == "DONE") {
      return COLORS.green;
    } else if (status == "PENDING") {
      return COLORS.red;
    } else if (status == "COOKING") {
      return COLORS.orange;
    }
  }

  function getLabel() {
    if (status == "DELIVERED") {
      return "تم التوصيل";
    } else if (status == "ONWAY") {
      return "قيد التوصيل";
    } else if (status == "PENDING") {
      return "وضع الانتظار";
    } else if (status == "COOKING") {
      return "قيد الطبخ";
    } else if (status == "DONE") {
      return "طلب جاهز";
    }
  }

  return (
    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap-reverse",
        marginTop: SIZES.radius,
        alignItems: "center",
        ...containerStyle,
      }}
    >
      <View
        style={{
          width: 8,
          height: 8,
          borderRadius: 4,
          backgroundColor: getColor(),
        }}
      />
      <Text
        style={{
          color: getColor(),
          margin: SIZES.base,
          ...FONTS.body3,
          ...labelStyle,
        }}
      >
        {getLabel()}
      </Text>
      <View
        style={{
          width: 8,
          height: 8,
          borderRadius: 4,
          backgroundColor: getColor(),
        }}
      />
    </View>
  );
};

OrderStatus.propTypes = {
  status: PropTypes.oneOf(["DELIVERED", "ONWAY", "PENDING", "COOKING", "DONE"]),
};

export default OrderStatus;
