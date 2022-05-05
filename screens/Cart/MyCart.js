import React, { useContext } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import {
  SIZES,
  COLORS,
  FONTS,
  icons,
  dummyData,
  images,
} from "../../constants";
import {
  Header,
  IconBotton,
  CartQuantityButton,
  StapperInput,
  FooterTotal,
} from "../../Components";
import { SwipeListView } from "react-native-swipe-list-view";
import shopContext from "../../context/shop-context";

const MyCart = ({ navigation }) => {
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
  function renderHeader() {
    return (
      <Header
        title="سلتي"
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
          <CartQuantityButton
            quantity={context.cart.length}
            onPress={() => navigation.navigate("MyCart")}
          />
        }
      />
    );
  }
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}
    >
      {/**HEADER */}
      {renderHeader()}

      {/**CART LIST */}
      {renderCartList()}
      {/**FOOTER */}
      <FooterTotal
        subTotal={calcFinalPrice()}
        shippingFee={0.0}
        total={calcFinalPrice()}
        onPress={() => navigation.navigate("DeliveryList")}
        onEmpty={() => navigation.replace("Home")}
      />
    </View>
  );
};

export default MyCart;
const styles = StyleSheet.create({
  cartItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: SIZES.radius,
    paddingHorizontal: SIZES.radius,
    borderRadius: SIZES.radius,
  },
});
