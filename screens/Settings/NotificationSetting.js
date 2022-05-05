import React, { useState } from "react";
import { View, Text, Image, ScrollView } from "react-native";

import { Header, IconBotton, CustomSwitch } from "../../Components";
import { COLORS, FONTS, SIZES, icons } from "../../constants";

const NotificationSettingCard = ({
  title,
  desc,
  isSelected,
  setIsSelected,
}) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        height: 85,
        marginTop: SIZES.radius,
        paddingHorizontal: SIZES.radius,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.lightGray2,
      }}
    >
      <CustomSwitch
        value={isSelected}
        onChange={(value) => setIsSelected(value)}
      />
      <View
        style={{
          flex: 1,
          marginRight: SIZES.radius,
        }}
      >
        <Text style={{ ...FONTS.h3 }}>{title}</Text>
        <Text style={{ color: COLORS.darkGray2, ...FONTS.body5 }}>{desc}</Text>
      </View>

      <Image
        source={icons.notification}
        style={{
          width: 30,
          height: 30,
          tintColor: COLORS.primary,
        }}
      />
    </View>
  );
};

const NotificationSetting = ({ navigation }) => {
  const [notification, setNotification] = useState(true);

  function renderHeader() {
    return (
      <Header
        title="الإشعارات"
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

  function renderOptions() {
    return (
      <View>
        <NotificationSettingCard
          title="إشعارات الطلبات"
          desc="اشعارات عند تغيير الطلبات"
          isSelected={notification}
          setIsSelected={setNotification}
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
        {renderOptions()}
      </ScrollView>
    </View>
  );
};

export default NotificationSetting;
