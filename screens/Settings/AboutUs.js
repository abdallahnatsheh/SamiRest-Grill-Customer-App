import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, ScrollView, StyleSheet, Linking } from "react-native";

import {
  Header,
  IconBotton,
  IconLabelButton,
  LineDivider,
  TextButton,
} from "../../Components";
import { COLORS, SIZES, icons } from "../../constants";
import { utils } from "../../utils";
const AboutUs = () => {
  const navigation = useNavigation();

  function renderHeader() {
    return (
      <Header
        title="تواصل معنا"
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
          <View
            style={{
              width: 40,
            }}
          />
        }
      />
    );
  }
  function renderSettings() {
    return (
      <View
        style={{
          marginTop: SIZES.radius,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.lightGray2,
        }}
      >
        <IconLabelButton
          label="العنوان: القدس – جبل المكبر – حيّ الصلعة 20"
          containerStyle={styles.iconLabelContainerStyle}
        />
        <LineDivider
          lineStyle={{
            backgroundColor: COLORS.lightGray1,
            paddingHorizontal: SIZES.padding,
          }}
        />
        <IconLabelButton
          label="هاتف أرضي: 026200870"
          containerStyle={styles.iconLabelContainerStyle}
          onPress={() => utils.dialCall(parseInt("026200870"))}
        />
        <IconLabelButton
          label="هاتف محمول: 0525509109"
          containerStyle={styles.iconLabelContainerStyle}
          onPress={() => utils.dialCall(parseInt("0525509109"))}
        />
        <LineDivider
          lineStyle={{
            backgroundColor: COLORS.lightGray1,
            paddingHorizontal: SIZES.padding,
          }}
        />
        <View
          style={{
            flexDirection: "row",
            height: 50,
            margin: SIZES.radius,
            paddingHorizontal: SIZES.padding,
          }}
        >
          <TextButton
            buttonContainerStyle={{
              flex: 1,
              borderRadius: SIZES.radius,
              backgroundColor: COLORS.blue,
            }}
            label="Facebook"
            labelStyle={{
              color: COLORS.white,
            }}
            onPress={() => {
              Linking.openURL("https://www.facebook.com/samiRestgrill/");
            }}
          />
          <TextButton
            buttonContainerStyle={{
              flex: 1,
              marginLeft: SIZES.padding,
              borderRadius: SIZES.radius,
              backgroundColor: COLORS.green,
            }}
            label="WhatsApp"
            labelStyle={{
              color: COLORS.white,
            }}
            onPress={() => {
              Linking.openURL("https://wa.me/972525509109");
            }}
          />
        </View>
      </View>
    );
  }
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}
    >
      {renderHeader()}

      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: SIZES.padding,
        }}
      >
        {renderSettings()}
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  iconLabelContainerStyle: {
    height: 70,
    alignItems: "center",
    paddingHorizontal: 0,
    flexDirection: "row-reverse",
  },
  iconLabelIconStyle: {
    margin: SIZES.radius,
    tintColor: COLORS.primary,
  },
});

export default AboutUs;
