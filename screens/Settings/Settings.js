import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";

import {
  Header,
  IconBotton,
  IconLabelButton,
  LineDivider,
} from "../../Components";
import { COLORS, SIZES, icons } from "../../constants";

const Settings = () => {
  const navigation = useNavigation();
  function renderHeader() {
    return (
      <Header
        title="الإعدادات"
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
          paddingHorizontal: SIZES.padding,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.lightGray2,
        }}
      >
        <IconLabelButton
          icon={icons.profile}
          label=" معلومات الحساب"
          containerStyle={styles.iconLabelContainerStyle}
          iconStyle={styles.iconLabelIconStyle}
          onPress={() => navigation.navigate("MyAccount")}
        />

        <LineDivider
          lineStyle={{
            backgroundColor: COLORS.lightGray1,
          }}
        />
        {/* <IconLabelButton
          icon={icons.filter}
          label="Preferences"
          containerStyle={styles.iconLabelContainerStyle}
          iconStyle={styles.iconLabelIconStyle}
        />

        <LineDivider
          lineStyle={{
            backgroundColor: COLORS.lightGray1,
          }}
        />*/}

        <IconLabelButton
          icon={icons.notification}
          label="الاشعارات"
          containerStyle={styles.iconLabelContainerStyle}
          iconStyle={styles.iconLabelIconStyle}
          onPress={() => navigation.navigate("NotificationSetting")}
        />

        <LineDivider
          lineStyle={{
            backgroundColor: COLORS.lightGray1,
          }}
        />

        {/*<IconLabelButton
          icon={icons.bar}
          label="Data use"
          containerStyle={styles.iconLabelContainerStyle}
          iconStyle={styles.iconLabelIconStyle}
        />

        <LineDivider
          lineStyle={{
            backgroundColor: COLORS.lightGray1,
          }}
        />*/}

        {/*<IconLabelButton
          icon={icons.globe}
          label="Language"
          containerStyle={styles.iconLabelContainerStyle}
          iconStyle={styles.iconLabelIconStyle}
        />

        <LineDivider
          lineStyle={{
            backgroundColor: COLORS.lightGray1,
          }}
        />*/}

        {/*<IconLabelButton
          icon={icons.update}
          label="Check Update"
          containerStyle={styles.iconLabelContainerStyle}
          iconStyle={styles.iconLabelIconStyle}
        />

        <LineDivider
          lineStyle={{
            backgroundColor: COLORS.lightGray1,
          }}
        />*/}

        <IconLabelButton
          icon={icons.call}
          label="تواصل معنا"
          containerStyle={styles.iconLabelContainerStyle}
          iconStyle={styles.iconLabelIconStyle}
          onPress={() => navigation.navigate("AboutUs")}
        />

        <LineDivider
          lineStyle={{
            backgroundColor: COLORS.lightGray1,
          }}
        />

        <IconLabelButton
          icon={icons.privacy}
          label="سياسة الخصوصية"
          containerStyle={styles.iconLabelContainerStyle}
          iconStyle={styles.iconLabelIconStyle}
        />

        <LineDivider
          lineStyle={{
            backgroundColor: COLORS.lightGray1,
          }}
        />

        <IconLabelButton
          icon={icons.term}
          label="البنود و الشروط"
          containerStyle={styles.iconLabelContainerStyle}
          iconStyle={styles.iconLabelIconStyle}
        />

        <LineDivider
          lineStyle={{
            backgroundColor: COLORS.lightGray1,
          }}
        />

        <IconLabelButton
          icon={icons.logout}
          label="تسجيل الخروج"
          containerStyle={styles.iconLabelContainerStyle}
          iconStyle={styles.iconLabelIconStyle}
          onPress={() => navigation.replace("Home")}
        />
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
    marginLeft: SIZES.radius,
    tintColor: COLORS.primary,
  },
});

export default Settings;
