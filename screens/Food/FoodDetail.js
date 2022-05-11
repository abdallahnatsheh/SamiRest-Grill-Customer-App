import React, { useContext } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  FlatList,
  SectionList,
} from "react-native";
import {
  SIZES,
  COLORS,
  FONTS,
  icons,
  images,
  dummyData,
} from "../../constants";
import {
  Header,
  IconBotton,
  CartQuantityButton,
  IconLabel,
  TextButton,
  LineDivider,
  StapperInput,
} from "../../Components";
import shopContext from "../../context/shop-context";
import { utils } from "../../utils";
import { useAuth } from "../../context/AuthContext";

const FoodDetail = ({ navigation, route }) => {
  ///STATE TO CHECK THE SELCTED MEAL SIZE
  const [selectedSize, setSelectedSize] = React.useState(0);
  const [selectedAddon, setSelectedAddon] = React.useState([]);
  const [qty, setQty] = React.useState(1);
  const { item } = route.params;
  const context = useContext(shopContext);
  const { dataUser } = useAuth();
  // Add/Remove checked checkbox item from list
  const handleCheck = (item) => {
    var updatedList = [...selectedAddon];
    if (!selectedAddon.find((o) => o.name === item.name)) {
      updatedList.push(item);
    } else {
      updatedList = updatedList.filter((o) => o.name !== item.name);
    }
    setSelectedAddon(updatedList);
  };

  //calculate final price
  const handleFinalPrice = (foodTypeAddon, foodTypeValue, neededQuantitiy) => {
    let TypeSum = 0;
    if (foodTypeAddon.length > 0) {
      foodTypeAddon.map((addon) =>
        item.price.addons.find((add, i) => {
          if (add.name === addon.name) {
            TypeSum += Number(add.value);
          }
        })
      );
    } else {
      TypeSum = 0;
    }
    /**    let sum =
      (foodTypeValue.value ? foodTypeValue.value + TypeSum : 0 + TypeSum) *
      (neededQuantitiy + handleQuantity(item.id)); */
    let sum =
      (item.price.types.length > 0
        ? item.price.types[foodTypeValue].value + TypeSum
        : item.price.defaultPrice.value + TypeSum) * neededQuantitiy;
    /**    let finalprice =
      (item.deals.enabled && !item.deals.dailyDealEnable) ||
      (item.deals.enabled &&
        item.deals.dailyDealEnable &&
        today >= new Date(item.deals.fromDate.seconds * 1000) &&
        today < new Date(item.deals.toDate.seconds * 1000))
        ? sum - (sum * item.deals.value) / 100
        : sum; */
    let finalprice =
      (item.deals.enabled && !item.deals.dailyDealEnable) ||
      (item.deals.enabled && item.deals.dailyDealEnable)
        ? sum - (sum * item.deals.value) / 100
        : sum;
    return finalprice.toFixed(2);
  };
  //create final order to be added to the cart
  const makeOrder = () => {
    let order = {
      ...item,
      quantity: qty,
      types:
        item.price.types.length > 0
          ? selectedSize
          : { name: item.name, value: item.price.defaultPrice.value },
      addons: selectedAddon,
      totalPrice: utils.handleFinalPrice(
        item,
        selectedAddon,
        selectedSize,
        qty
      ),
    };
    return order;
  };

  function renderHeader() {
    return (
      <Header
        title="التفاصيل"
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
  function renderDetail() {
    return (
      <View
        style={{
          marginTop: SIZES.radius,
          marginBottom: SIZES.padding,
          paddingHorizontal: SIZES.padding,
        }}
      >
        {/**FOOD CARD SECTION */}
        <View
          style={{
            height: 190,
            borderRadius: 15,
            backgroundColor: COLORS.lightGray2,
            justifyContent: "center",
            alignItems: "center",
            paddingTop: 35,
          }}
        >
          {/**FOOD IMAGE */}
          <Image
            source={{ uri: item?.img }}
            resizeMode="contain"
            style={{ height: "100%", width: "100%", top: -20 }}
          />
        </View>
        {/**FOOD INFO SECTION */}
        <View style={{ marginTop: SIZES.radius }}>
          {/**NAME AND DESCRIBTION */}
          <Text style={{ ...FONTS.h1 }}>{item?.name}</Text>
          <Text
            style={{
              marginTop: SIZES.base,
              color: COLORS.darkGray,
              textAlign: "right",
              ...FONTS.body3,
            }}
          >
            {item?.info}
          </Text>
          {/**SHIPPING, DURATION AND RATING  */}
          <View
            style={{
              flexDirection: "row",
              marginTop: SIZES.padding,
              flexDirection: "row-reverse",
            }}
          >
            {/**SHIPPING */}
            <IconLabel
              containerStyle={{
                marginLeft: SIZES.radius,
                paddingHorizontal: 0,
              }}
              icon={icons.dollar}
              iconStyle={{
                tintColor: COLORS.black,
              }}
              label="توصيل مجاني"
            />
            {/**DURATION */}
            <IconLabel
              containerStyle={{
                marginLeft: SIZES.radius,
                paddingHorizontal: 0,
              }}
              icon={icons.clock}
              iconStyle={{
                tintColor: COLORS.black,
              }}
              label={
                dataUser ? dataUser.traverDuration + " دقيقة" : 0 + "دقيقة"
              }
            />
            {/**RATING */}
            {item.deals.enabled ? (
              <IconLabel
                containerStyle={{
                  backgroundColor:
                    item.deals.enabled && !item.deals.dailyDealEnable
                      ? COLORS.primary
                      : COLORS.yellow,
                }}
                icon={icons.discount}
                label={"-" + item.deals.value}
                labelStyle={{
                  color: COLORS.white,
                  paddingRight: 2,
                }}
              />
            ) : (
              <IconLabel />
            )}
          </View>

          {/**SIZES SECTION AND MEAL TYPES AND ADDONS IN FUTURE */}
          {item.price.types.length > 0 && (
            <View
              style={{
                flexDirection: "row",
                marginTop: SIZES.padding,
                alignItems: "center",
                flexDirection: "row-reverse",
              }}
            >
              <Text
                style={{
                  ...FONTS.h3,
                  paddingLeft: 10,
                }}
              >
                الانواع:
              </Text>
              <FlatList
                numColumns={4}
                listKey={"typeList"}
                showsHorizontalScrollIndicator={false}
                data={item.price.types}
                keyExtractor={(item) => `${item.name}`}
                renderItem={({ item, index }) => (
                  <TextButton
                    key={`Sizes-${index}`}
                    buttonContainerStyle={{
                      width: "auto",
                      minWidth: 55,
                      maxwidth: 100,
                      height: "auto",
                      minHeight: 55,
                      maxHeight: 100,
                      margin: SIZES.base,
                      borderWidth: 1,
                      borderRadius: SIZES.radius,
                      borderColor:
                        selectedSize == index ? COLORS.primary : COLORS.gray,
                      backgroundColor:
                        selectedSize == index ? COLORS.primary : null,
                    }}
                    label={item.name}
                    label2={item.value + " ₪"}
                    label2Style={{
                      color:
                        selectedSize == index ? COLORS.white : COLORS.black,
                      ...FONTS.body5,
                    }}
                    labelStyle={{
                      color:
                        selectedSize == index ? COLORS.white : COLORS.black,
                      padding: 2,
                      ...FONTS.body5,
                    }}
                    disabled={false}
                    onPress={() => setSelectedSize(index)}
                  />
                )}
              />
            </View>
          )}
          {item.price.addons.length > 0 && item.price.types.length > 0 && (
            <LineDivider />
          )}
          {item.price.addons.length > 0 && (
            <View
              style={{
                flexDirection: "row",
                marginTop: SIZES.padding,
                alignItems: "center",
                flexDirection: "row-reverse",
              }}
            >
              <Text
                style={{
                  ...FONTS.h3,
                  paddingLeft: 10,
                }}
              >
                إضافات:
              </Text>
              <FlatList
                horizontal={false}
                showsHorizontalScrollIndicator={false}
                data={item.price.addons}
                keyExtractor={(item) => `${item.name}`}
                numColumns={4}
                listKey={"addonsList"}
                renderItem={({ item, index }) => (
                  <>
                    <TextButton
                      key={`Sizes-${index}`}
                      buttonContainerStyle={{
                        width: "auto",
                        minWidth: 55,
                        maxwidth: 100,
                        height: "auto",
                        minHeight: 55,
                        maxHeight: 100,
                        margin: SIZES.base,
                        borderWidth: 1,
                        borderRadius: SIZES.radius,
                        borderColor: selectedAddon.find(
                          (o) => o.name === item.name
                        )
                          ? COLORS.primary
                          : COLORS.gray,
                        backgroundColor: selectedAddon.find(
                          (o) => o.name === item.name
                        )
                          ? COLORS.primary
                          : null,
                      }}
                      label={item.name}
                      label2={item.value + " ₪"}
                      label2Style={{
                        color: selectedAddon.find((o) => o.name === item.name)
                          ? COLORS.white
                          : COLORS.black,
                        ...FONTS.body5,
                      }}
                      labelStyle={{
                        color: selectedAddon.find((o) => o.name === item.name)
                          ? COLORS.white
                          : COLORS.black,
                        padding: 2,
                        ...FONTS.body5,
                      }}
                      disabled={false}
                      onPress={() => handleCheck(item)}
                    />
                  </>
                )}
              />
            </View>
          )}
        </View>
      </View>
    );
  }
  function renderFooter(item) {
    return (
      <View
        style={{
          flexDirection: "row",
          height: 120,
          alignItems: "center",
          paddingHorizontal: SIZES.padding,
          paddingBottom: SIZES.radius,
        }}
      >
        {/**StapperInput */}
        <StapperInput
          value={qty}
          onAdd={() => setQty(qty + 1)}
          onMinus={() => {
            if (qty > 1) {
              setQty(qty - 1);
            }
          }}
        />
        {/**text button */}
        <TextButton
          buttonContainerStyle={{
            flex: 1,
            flexDirection: "row",
            height: 60,
            marginLeft: SIZES.radius,
            paddingHorizontal: SIZES.radius,
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.primary,
          }}
          label2="اضف للسلة"
          label={
            utils.handleFinalPrice(item, selectedAddon, selectedSize, qty) +
            " ₪"
            /*item.price.types.length > 0
              ? (
                  item.price.types[selectedSize].value +
                  item.price.defaultPrice.value * qty
                ).toFixed(2)
              : (item.price.defaultPrice.value * qty).toFixed(2) + " ₪"*/
          }
          onPress={context.addProductToCart.bind(this, makeOrder())}
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
      {/**HEADER */}

      {renderHeader()}
      {/**BODY */}
      <FlatList ListHeaderComponent={renderDetail()}></FlatList>
      {/**FOOTER */}
      <LineDivider />
      {renderFooter(item)}
    </View>
  );
};

export default FoodDetail;
