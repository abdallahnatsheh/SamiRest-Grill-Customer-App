import React from "react";
import { View, Text, TextInput } from "react-native";
import { FONTS, SIZES, COLORS } from "../constants";

const FormInput = ({
  containerStyle,
  label,
  labelStyle,
  placeholder,
  inputStyle,
  prependComponent,
  appendComponent,
  onChange,
  secureTextEntry,
  keyboardType = "default",
  autoCompleteType = "off",
  autoCapitalize = "none",
  errorMsg = "",
  multiline,
  numberOfLines,
  value,
}) => {
  return (
    <View style={{ ...containerStyle }}>
      {/**LABEL AND ERROR MESSAGE */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ color: COLORS.red, ...FONTS.body4 }}>{errorMsg}</Text>
        <Text style={{ color: COLORS.gray, ...FONTS.body4, ...labelStyle }}>
          {label}
        </Text>
      </View>
      {/**TEXT INPUT */}
      <View
        style={{
          flexDirection: "row",
          height: 55,
          paddingHorizontal: SIZES.padding,
          marginTop: SIZES.base,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.lightGray2,
        }}
      >
        {appendComponent}

        <TextInput
          style={{ flex: 1, textAlign: "right", ...inputStyle }}
          placeholder={placeholder}
          placeholderTextColor={COLORS.gray}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCompleteType={autoCompleteType}
          autoCapitalize={autoCapitalize}
          onChangeText={(text) => onChange(text)}
          multiline={multiline}
          numberOfLines={numberOfLines}
          value={value}
        />
        {prependComponent}
      </View>
    </View>
  );
};
export default FormInput;
