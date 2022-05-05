import React, { useContext, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import {
  SIZES,
  COLORS,
  FONTS,
  icons,
  images,
  dummyData,
  constants,
} from "../../constants";
import { IconBotton, StapperInput, FooterTotal } from "../../Components";
import { SwipeListView } from "react-native-swipe-list-view";
import { connect } from "react-redux";
import { setSelectedTab } from "../../stores/tab/tabAction";
import shopContext from "../../context/shop-context";

const CartTab = ({ navigation, setSelectedTab }) => {
  const context = useContext(shopContext);

  function renderCartList() {
    return context.cart.length > 0 ? (
      <SwipeListView
        data={context.cart}
        keyExtractor={(item) => `${item.id}`}
        contentContainerStyle={{
          marginTop: SIZES.radius,
          paddingHorizontal: SIZES.padding,
          paddingBottom: SIZES.padding * 2,
        }}
        disableRightSwipe={true}
        rightOpenValue={-75}
        renderItem={(data, rowMap) => (
          <View
            style={{
              height: 100,
              backgroundColor: COLORS.lightGray2,
              ...styles.cartItemContainer,
            }}
          >
            {/**QUANTITY */}
            <StapperInput
              containerStyle={{
                height: 50,
                width: 125,
                backgroundColor: COLORS.white,
              }}
              value={data.item.quantity}
              onAdd={context.addProduct.bind(this, data.item)}
              onMinus={context.removeProductFromCart.bind(this, data.item)}
            />
            {/*FOOD DETAILS */}
            <View style={{ flex: 1, paddingRight: 12 }}>
              <Text style={{ ...FONTS.body3 }}>{data.item.name}</Text>
              {data.item.price.types && (
                <Text style={{ ...FONTS.body5, color: COLORS.darkGray }}>
                  {data.item.price?.types[data.item?.types]?.name}
                </Text>
              )}
              {data.item.addons.length > 0 && (
                <Text style={{ ...FONTS.body5, color: COLORS.darkGray }}>
                  {data.item.addons.length <= 2
                    ? data.item.addons.map((addon) => addon.name + ",")
                    : data.item.addons[0].name +
                      "," +
                      data.item.addons[1].name +
                      "..."}
                </Text>
              )}

              <Text
                style={{
                  color: COLORS.primary,
                  ...FONTS.h3,
                  textAlign: "right",
                }}
              >
                ₪{Number(data.item.totalPrice).toFixed(2)}
              </Text>
            </View>
            {/**FOOD IMAGE */}
            <View style={{ width: 90, height: 100, marginLeft: -10 }}>
              <Image
                source={{ uri: data.item.img }}
                resizeMode="contain"
                style={{
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: -2,
                }}
              />
            </View>
          </View>
        )}
        renderHiddenItem={(data, rowMap) => (
          <IconBotton
            containerStyle={{
              flex: 1,
              justifyContent: "flex-end",
              backgroundColor: COLORS.primary,
              ...styles.cartItemContainer,
            }}
            icon={icons.delete_icon}
            iconStyle={{
              marginRight: 10,
            }}
            onPress={context.removeProduct.bind(this, data.item)}
          />
        )}
      />
    ) : (
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          padding: 70,
        }}
      >
        <Image source={images.emptyCart} style={{ width: 150, height: 150 }} />
      </View>
    );
  }
  function calcFinalPrice() {
    let finalPrice = 0;
    context.cart.map((cl) => (finalPrice = +finalPrice + +cl.totalPrice));
    return finalPrice;
  }
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}
    >
      {/**CART LIST */}
      {renderCartList()}
      {/**FOOTER */}
      <FooterTotal
        subTotal={calcFinalPrice()}
        shippingFee={0.0}
        total={calcFinalPrice()}
        containerStyle={{ paddingBottom: 150 }}
        onPress={() => navigation.navigate("DeliveryList")}
        onEmpty={() => setSelectedTab(constants.screens.home)}
      />
    </View>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(CartTab);
function mapStateToProps(state) {
  return { selectedTab: state.tabReducer.selectedTab };
}
function mapDispatchToProps(dispatch) {
  return {
    setSelectedTab: (selectedTab) => {
      return dispatch(setSelectedTab(selectedTab));
    },
  };
}
const styles = StyleSheet.create({
  cartItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: SIZES.radius,
    paddingHorizontal: SIZES.radius,
    borderRadius: SIZES.radius,
  },
});
