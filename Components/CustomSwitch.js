import React from "react";
import { View, Text, TouchableWithoutFeedback, StyleSheet } from "react-native";
import { FONTS, SIZES, COLORS } from "../constants";
const CustomSwitch = ({ value, onChange }) => {
  return (
    <TouchableWithoutFeedback onPress={() => onChange(!value)}>
      <View style={{ flexDirection: "row" }}>
        {/**switch  */}

        {/**Text */}
        <Text
          style={{
            color: value ? COLORS.primary : COLORS.gray,
            marginRight: SIZES.base,
            ...FONTS.body4,
          }}
        >
          تذكرني
        </Text>
        <View
          style={value ? styles.switchOnContainer : styles.switchOffContainer}
        >
          <View
            style={{
              ...styles.dot,
              backgroundColor: value ? COLORS.white : COLORS.gray,
            }}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  switchOnContainer: {
    width: 40,
    height: 20,
    paddingRight: 2,
    justifyContent: "center",
    alignItems: "flex-end",
    borderRadius: 10,
    backgroundColor: COLORS.primary,
  },
  switchOffContainer: {
    width: 40,
    height: 20,
    paddingRight: 2,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: 10,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
});
export default CustomSwitch;
