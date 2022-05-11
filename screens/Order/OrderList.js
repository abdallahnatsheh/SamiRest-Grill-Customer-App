import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { View, Text, Image, Alert, ActivityIndicator } from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import {
  Header,
  TextButton,
  LineDivider,
  FormInput,
  IconBotton,
} from "../../Components";
import { FONTS, COLORS, SIZES, icons, constants } from "../../constants";
import { utils } from "../../utils";

const OrderList = ({ navigation, route }) => {
  const { orderItem } = route.params;

  function renderHeader() {
    return (
      <Header
        title="قائمة الطلبية"
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
      />
    );
  }

  function specialOrderDetails() {
    return (
      <ScrollView>
        <View
          style={{
            marginTop: SIZES.padding,
            paddingVertical: SIZES.padding,
            borderRadius: SIZES.radius,
            borderWidth: 2,
            borderColor: COLORS.lightGray2,
            backgroundColor: COLORS.white,
          }}
        >
          {/*TRACK ORDER AND ORDER ID */}
          <View
            style={{
              justifyContent: "space-between",
              paddingHorizontal: SIZES.padding,
            }}
          >
            <View>
              <Text style={{ padding: 10, ...FONTS.h3 }}>
                اسم الطلبية: {orderItem.orders.name}
              </Text>
              <Text style={{ padding: 10, ...FONTS.h3 }}>
                عدد الاشخاص: {orderItem.orders.quantity}
              </Text>
              <Text style={{ padding: 10, ...FONTS.h3 }}>
                تفاصيل الطلبية: {orderItem.orders.describtion}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
  function renderTrackOrder(item, index) {
    return (
      <View
        style={{
          marginTop: SIZES.padding,
          paddingVertical: SIZES.padding,
          borderRadius: SIZES.radius,
          borderWidth: 2,
          borderColor: COLORS.lightGray2,
          backgroundColor: COLORS.white,
        }}
      >
        {/*TRACK ORDER AND ORDER ID */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: SIZES.padding,
          }}
        >
          <Text style={{ color: COLORS.darkGray, ...FONTS.body3 }}>
            {orderItem.totalPrice}₪
          </Text>
          <View>
            <Text style={{ ...FONTS.h3 }}>{item.name}</Text>
            {item.price.types.length > 0 && (
              <Text style={{ ...FONTS.body4, color: COLORS.black }}>
                {item.price.types[item.types].name}
              </Text>
            )}
            {item.addons.length > 0 && (
              <Text style={{ ...FONTS.body5, color: COLORS.darkGray }}>
                {item.addons.map((addon) => addon.name + ",")}
              </Text>
            )}
          </View>
        </View>
      </View>
    );
  }

  function renderFooter() {
    return (
      <View style={{ marginTop: SIZES.radius, marginBottom: SIZES.padding }}>
        <TextButton
          buttonContainerStyle={{ height: 55, borderRadius: SIZES.base }}
          label="تم"
          onPress={() => navigation.goBack()}
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
      {orderItem.orderType != "special" ? (
        <FlatList
          data={orderItem.orders}
          keyExtractor={(item) => `${item.id}`}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: SIZES.padding }}
          renderItem={({ item, index }) => {
            return renderTrackOrder(item, index);
          }}
          ListFooterComponent={renderFooter()}
        />
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: SIZES.padding }}
          ListHeaderComponent={specialOrderDetails()}
          ListFooterComponent={renderFooter()}
        />
      )}
    </View>
  );
};

export default OrderList;
