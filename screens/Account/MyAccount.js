import React from "react";
import { View, ScrollView, Image, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import { Header, IconBotton, TextButton, InfoItem } from "../../Components";
import { COLORS, SIZES, icons, dummyData, FONTS } from "../../constants";
import { useAuth } from "../../context/AuthContext";

const MyAccount = ({ navigation }) => {
  const { currentUser, dataUser } = useAuth();
  function renderHeader() {
    return (
      <Header
        title="حسابي الشخصي"
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
          <TextButton
            label="تعديل"
            labelStyle={{
              color: COLORS.primary,
            }}
            buttonContainerStyle={{
              backgroundColor: null,
            }}
            onPress={() => navigation.navigate("MyAccountEdit")}
          />
        }
      />
    );
  }

  function renderSectionOne() {
    return (
      <View
        style={{
          marginTop: SIZES.padding,
          borderRadius: SIZES.radius,
          paddingHorizontal: SIZES.radius,
          backgroundColor: COLORS.lightGray2,
        }}
      >
        <View
          style={{
            borderRadius: SIZES.radius,
            alignItems: "center",
            justifyContent: "center",
            paddingTop: SIZES.radius,
          }}
        >
          <Image
            source={
              dataUser?.personalImage
                ? { uri: dataUser?.personalImage }
                : dummyData?.myProfile?.profile_image
            }
            style={{ width: 100, height: 100, borderRadius: SIZES.radius }}
          />
        </View>
        <InfoItem label="الاسم الشخصي" value={dataUser.firstName} />
        <InfoItem label="اسم العائلة" value={dataUser.lastName} />
        <InfoItem
          label="رقم الهاتف"
          value={dataUser.phoneNumber}
          withDivider={false}
        />
      </View>
    );
  }

  function renderSectionTwo() {
    return (
      <View
        style={{
          marginTop: SIZES.padding,
          borderRadius: SIZES.radius,
          paddingHorizontal: SIZES.radius,
          backgroundColor: COLORS.lightGray2,
        }}
      >
        <InfoItem label="تاريخ الميلاد" value={dataUser.birthday} />

        <InfoItem label="الجنس" value="ذكر" />

        <InfoItem
          label="تاريخ الانضمام"
          value={Date(currentUser.createdAt).toLocaleString()}
        />

        <InfoItem label="البريد الإلكتروني" value={dataUser.email} />

        <InfoItem label=" العنوان الاساسي" value={dataUser.firstAddress} />
        <InfoItem
          label=" العنوان الفرعي"
          value={dataUser.secondAddress}
          withDivider={false}
        />
      </View>
    );
  }

  return currentUser ? (
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
        {renderSectionOne()}
        {renderSectionTwo()}
      </ScrollView>
    </View>
  ) : (
    <View>
      <TouchableOpacity
        onPress={navigation.replace("SignIn")}
      ></TouchableOpacity>
    </View>
  );
};

export default MyAccount;
