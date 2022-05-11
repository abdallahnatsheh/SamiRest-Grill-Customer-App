import React from "react";
import { View, Text, Image } from "react-native";
import { images, FONTS, SIZES, COLORS } from "../../constants";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
const AuthLayout = ({
  title,
  subtitle,
  subtitleStyle,
  titleContainerStyle,
  children,
}) => {
  return (
    <View
      style={{
        flex: 1,
        paddingVertical: SIZES.padding,
        backgroundColor: COLORS.white,
      }}
    >
      <KeyboardAwareScrollView
        keyboardDismissMode="on-drag"
        contentContainerStyle={{
          flex: 1,
          paddingHorizontal: SIZES.padding,
        }}
      >
        {/**TITLE AND SUBTITLE */}
        <View style={{ marginTop: SIZES.padding, ...titleContainerStyle }}>
          <Text style={{ textAlign: "center", ...FONTS.h2 }}>{title}</Text>

          <Text
            style={{
              textAlign: "center",
              color: COLORS.darkGray,
              marginTop: SIZES.base,
              ...FONTS.body3,
              ...subtitleStyle,
            }}
          >
            {subtitle}
          </Text>
        </View>

        {/**CONTENT AND ITS CHILDREN */}
        {children}
      </KeyboardAwareScrollView>
    </View>
  );
};
export default AuthLayout;
