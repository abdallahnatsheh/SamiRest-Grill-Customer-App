import React from "react";
import { View, Text, Image, BackHandler } from "react-native";
import { TextButton } from "../../Components";
import { FONTS, COLORS, SIZES, images } from "../../constants";
//show a screen that the delivery is done
const DeliveryDone = ({ navigation }) => {
  React.useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        return true;
      }
    );
    return () => BackHandler.remove();
  }, []);
  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: SIZES.padding,
        backgroundColor: COLORS.white,
      }}
    >
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Image
          source={images.success}
          resizeMode="contain"
          style={{ width: 150, height: 150, tintColor: COLORS.primary }}
        />
        <Text style={{ marginTop: SIZES.padding, ...FONTS.h1 }}>
          صحة وعافية
        </Text>
        <Text
          style={{
            textAlign: "center",
            marginTop: SIZES.base,
            color: COLORS.darkGray,
            ...FONTS.body3,
          }}
        >
          تم استلام الطلب بنجاح
        </Text>
      </View>
      <TextButton
        label="موافق"
        buttonContainerStyle={{
          height: 55,
          marginTop: SIZES.padding,
          marginBottom: SIZES.padding,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.primary,
        }}
        onPress={() => navigation.replace("Home")}
      />
    </View>
  );
};

export default DeliveryDone;
