import React from "react";
import { View, Text, Image, ScrollView } from "react-native";
import {
  Header,
  TextButton,
  LineDivider,
  TextIconButton,
} from "../../Components";
import { FONTS, COLORS, SIZES, icons, constants } from "../../constants";

const DeliveryStatus = ({ navigation, route }) => {
  const { orderItem } = route.params;

  //KEEP TRACKING STATE VALUE
  const [currentState, setCurrentState] = React.useState(getStatus());
  function getStatus() {
    if (orderItem.status == "تم التوصيل") {
      return 3;
    } else if (orderItem.status == "قيد التوصيل") {
      return 2;
    } else if (orderItem.status == "وضع الانتظار") {
      return 0;
    } else if (orderItem.status == "قيد الطبخ") {
      return 1;
    } else if (orderItem.status == "طلب جاهز") {
      return 2;
    }
  }
  function renderHeader() {
    return (
      <Header
        title="حالة الطلب"
        containerStyle={{
          height: 50,
          marginHorizontal: SIZES.padding,
          marginTop: 40,
        }}
      />
    );
  }
  function renderInfo() {
    return (
      <View
        style={{ marginTop: SIZES.radius, paddingHorizontal: SIZES.padding }}
      >
        <Text
          style={{ textAlign: "center", color: COLORS.gray, ...FONTS.body4 }}
        >
          تاريخ ووقت الطلبية
        </Text>
        <Text style={{ textAlign: "center", ...FONTS.h2 }}>
          {orderItem.time + "/" + orderItem.date}
        </Text>
      </View>
    );
  }
  function renderTrackOrder() {
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
            marginBottom: 20,
            paddingHorizontal: SIZES.padding,
          }}
        >
          <Text style={{ color: COLORS.gray, ...FONTS.body3 }}>
            {orderItem.id}
          </Text>
          <Text style={{ ...FONTS.h3 }}>رمز تعريفي</Text>
        </View>
        <LineDivider lineStyle={{ backgroundColor: COLORS.lightGray2 }} />
        {orderItem.orderType == "deliver" && (
          <View
            style={{
              marginTop: SIZES.padding,
              paddingHorizontal: SIZES.padding,
            }}
          >
            {constants.track_order_status.map((item, index) => {
              return (
                <View
                  key={`StatusList-${index}`}
                  style={{ flexWrap: "wrap-reverse" }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      flexWrap: "wrap-reverse",
                      alignItems: "center",
                      marginVertical: -5,
                    }}
                  >
                    <View style={{ marginRight: SIZES.radius }}>
                      <Text style={{ ...FONTS.h3 }}>{item.title}</Text>
                      <Text style={{ color: COLORS.gray, ...FONTS.body4 }}>
                        {item.sub_title}
                      </Text>
                    </View>
                    <Image
                      source={icons.check_circle}
                      style={{
                        width: 40,
                        height: 40,
                        tintColor:
                          index <= currentState
                            ? COLORS.primary
                            : COLORS.lightGray1,
                      }}
                    />
                  </View>
                  {/**if we are not on the last item we will render the line  */}
                  {index < constants.track_order_status.length - 1 && (
                    <View style={{ flexWrap: "wrap-reverse" }}>
                      {index < currentState && (
                        <View
                          style={{
                            height: 50,
                            width: 3,
                            marginLeft: 18,
                            backgroundColor: COLORS.primary,
                            zIndex: -1,
                          }}
                        />
                      )}
                      {index >= currentState && (
                        <Image
                          source={icons.dotted_line}
                          resizeMode="cover"
                          style={{
                            height: 50,
                            width: 4,
                            marginLeft: 17,
                          }}
                        />
                      )}
                    </View>
                  )}
                </View>
              );
            })}
          </View>
        )}
        {orderItem.orderType != "deliver" && (
          <View
            style={{
              marginTop: SIZES.padding,
              paddingHorizontal: SIZES.padding,
            }}
          >
            {constants.track_special_order_status.map((item, index) => {
              return (
                <View
                  key={`StatusList-${index}`}
                  style={{ flexWrap: "wrap-reverse" }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginVertical: -5,
                    }}
                  >
                    <View style={{ marginRight: SIZES.radius }}>
                      <Text style={{ ...FONTS.h3 }}>{item.title}</Text>
                      <Text style={{ color: COLORS.gray, ...FONTS.body4 }}>
                        {item.sub_title}
                      </Text>
                    </View>
                    <Image
                      source={icons.check_circle}
                      style={{
                        width: 40,
                        height: 40,
                        tintColor:
                          index <= currentState
                            ? COLORS.primary
                            : COLORS.lightGray1,
                      }}
                    />
                  </View>
                  {/**if we are not on the last item we will render the line  */}
                  {index < constants.track_special_order_status.length - 1 && (
                    <View style={{ flexWrap: "wrap-reverse" }}>
                      {index < currentState && (
                        <View
                          style={{
                            height: 50,
                            width: 3,
                            marginLeft: 18,
                            backgroundColor: COLORS.primary,
                            zIndex: -1,
                          }}
                        />
                      )}
                      {index >= currentState && (
                        <Image
                          source={icons.dotted_line}
                          resizeMode="cover"
                          style={{
                            height: 50,
                            width: 4,
                            marginLeft: 17,
                          }}
                        />
                      )}
                    </View>
                  )}
                </View>
              );
            })}
          </View>
        )}
      </View>
    );
  }
  function renderFooter() {
    return (
      <View style={{ marginTop: SIZES.radius, marginBottom: SIZES.padding }}>
        {orderItem.orderType == "deliver" &&
          currentState < constants.track_order_status.length - 1 && (
            <View style={{ flexDirection: "row", height: 55 }}>
              {/** cancel button */}
              <TextButton
                buttonContainerStyle={{
                  width: "40%",
                  borderRadius: SIZES.base,
                  backgroundColor: COLORS.lightGray2,
                }}
                label="تم"
                labelStyle={{ color: COLORS.primary }}
                onPress={() => navigation.goBack()}
              />
              {/**mapView button */}
              <TextIconButton
                containerStyle={{
                  flex: 1,
                  marginLeft: SIZES.radius,
                  borderRadius: SIZES.base,
                  backgroundColor: COLORS.primary,
                }}
                label="قائمة الطلبية"
                labelStyle={{ color: COLORS.white, ...FONTS.h3 }}
                onPress={() =>
                  navigation.navigate("OrderList", { orderItem: orderItem })
                }
              />
            </View>
          )}
        {orderItem.orderType == "deliver" &&
          currentState >= constants.track_order_status.length - 1 && (
            <View style={{ flexDirection: "row", height: 55 }}>
              {/** cancel button */}
              <TextButton
                buttonContainerStyle={{
                  width: "40%",
                  borderRadius: SIZES.base,
                  backgroundColor: COLORS.primary,
                }}
                label="تم"
                labelStyle={{ color: COLORS.white, ...FONTS.h3 }}
                onPress={() => navigation.goBack()}
              />
              {/**mapView button */}
              <TextIconButton
                containerStyle={{
                  flex: 1,
                  marginLeft: SIZES.radius,
                  borderRadius: SIZES.base,
                  backgroundColor: COLORS.lightGray2,
                }}
                label="قائمة الطلبية"
                labelStyle={{ color: COLORS.primary }}
                onPress={() =>
                  navigation.navigate("OrderList", { orderItem: orderItem })
                }
              />
            </View>
          )}
        {orderItem.orderType != "deliver" &&
          currentState >= constants.track_special_order_status.length - 1 && (
            <View style={{ flexDirection: "row", height: 55 }}>
              {/** cancel button */}
              <TextButton
                buttonContainerStyle={{
                  width: "40%",
                  borderRadius: SIZES.base,
                  backgroundColor: COLORS.primary,
                }}
                label="تم"
                labelStyle={{ color: COLORS.white, ...FONTS.h3 }}
                onPress={() => navigation.goBack()}
              />
              {/**mapView button */}
              <TextIconButton
                containerStyle={{
                  flex: 1,
                  marginLeft: SIZES.radius,
                  borderRadius: SIZES.base,
                  backgroundColor: COLORS.lightGray2,
                }}
                label="قائمة الطلبية"
                labelStyle={{ color: COLORS.primary }}
                onPress={() =>
                  navigation.navigate("OrderList", { orderItem: orderItem })
                }
              />
            </View>
          )}
        {orderItem.orderType != "deliver" &&
          currentState < constants.track_special_order_status.length - 1 && (
            <View style={{ flexDirection: "row", height: 55 }}>
              {/** cancel button */}
              <TextButton
                buttonContainerStyle={{
                  width: "40%",
                  borderRadius: SIZES.base,
                  backgroundColor: COLORS.lightGray2,
                }}
                label="تم"
                labelStyle={{ color: COLORS.primary }}
                onPress={() => navigation.goBack()}
              />
              {/**mapView button */}
              <TextIconButton
                containerStyle={{
                  flex: 1,
                  marginLeft: SIZES.radius,
                  borderRadius: SIZES.base,
                  backgroundColor: COLORS.primary,
                }}
                label="قائمة الطلبية"
                labelStyle={{ color: COLORS.white, ...FONTS.h3 }}
                onPress={() =>
                  navigation.navigate("OrderList", { orderItem: orderItem })
                }
              />
            </View>
          )}
      </View>
    );
  }
  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: SIZES.padding,
        backgroundColor: COLORS.white,
      }}
    >
      {/**HEADER */}
      {renderHeader()}
      {/**INFO */}
      {renderInfo()}

      {/**TRACK ORDER */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {renderTrackOrder()}
      </ScrollView>

      {/**FOOTER */}
      {renderFooter()}
    </View>
  );
};

export default DeliveryStatus;
