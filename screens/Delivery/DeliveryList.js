import { LinearGradient } from "expo-linear-gradient";
import React, { useContext, useState } from "react";
import { View, Text, Image, Alert, ActivityIndicator } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import {
  Header,
  TextButton,
  LineDivider,
  FormInput,
  IconBotton,
} from "../../Components";
import { FONTS, COLORS, SIZES, icons, constants } from "../../constants";
import { useAuth } from "../../context/AuthContext";
import shopContext from "../../context/shop-context";
import { utils } from "../../utils";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../Firebase/firebase.Config";
const DeliveryList = ({ navigation }) => {
  const context = useContext(shopContext);
  const { currentUser, dataUser } = useAuth();
  ///choose if the order with delivery service or not
  const [deliveryMod, setDeliveryMod] = useState(1);
  /// notes for the order
  const [notes, setNotes] = useState("");
  //notes validations
  const [notesError, setNotesError] = useState("");
  /// if order is being submitted ot not
  const [isSubmitting, setIsSubmitting] = useState(false);

  //handle sending order to database
  const handleSubmit = async (event) => {
    setIsSubmitting(true);
    const orderResult = collection(db, "orders");
    addDoc(orderResult, {
      orders: context.cart,
      notes: notes,
      cartTotal: calcFinalPrice(),
      dataUser: {
        firstName: dataUser.firstName,
        lastName: dataUser.lastName,
        firstAddress: dataUser.firstAddress,
        secondAddress: dataUser.secondAddress,
        phoneNumber: dataUser.phoneNumber,
        email: dataUser.email,
        uid: dataUser.uid,
      },
      status: "وضع الانتظار",
      orderTime: getTime(),
      orderDate: getDate(),
      orderType: deliveryMod === 1 ? "reserve" : "deliver",
    })
      .then(function () {
        context.emptyCart();
        navigation.replace("Success");
      })
      .catch(function () {
        Alert.alert("خطأ", "خطأ في الخدمة", [{ text: "حسناً" }]);
        setIsSubmitting(false);
      });
  };
  function calcFinalPrice() {
    let finalPrice = 0;
    context.cart.map((cl) => (finalPrice = +finalPrice + +cl.totalPrice));
    return finalPrice.toFixed(2);
  }
  function renderHeader() {
    return (
      <Header
        title="قائمة المشتريات"
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
  function getTime() {
    var today = new Date();

    var time = today.getHours() + ":" + today.getMinutes();
    return time;
  }
  function getDate() {
    var today = new Date();

    var date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    return date;
  }
  function renderInfo() {
    return (
      <View
        style={{ marginTop: SIZES.radius, paddingHorizontal: SIZES.padding }}
      >
        <Text
          style={{ textAlign: "center", color: COLORS.gray, ...FONTS.body4 }}
        >
          وقت الطلبية
        </Text>
        <Text style={{ textAlign: "center", ...FONTS.h2 }}>
          {getDate()} / {getTime()}
        </Text>
      </View>
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
            {utils.handleFinalPrice(
              item,
              item.addons,
              item.types,
              item.quantity
            )}
            ₪
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
      <View>
        {/**SHADOW */}
        <LinearGradient
          start={{ X: 0, Y: 0 }}
          end={{ X: 0, Y: 1 }}
          colors={[COLORS.transparent, COLORS.lightGray1]}
          style={{
            position: "absolute",
            top: -15,
            left: 0,
            right: 0,
            height: Platform.OS === "ios" ? 200 : 50,
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
          }}
        />
        {/**ORDER DETAILS */}
        <View
          style={{
            padding: SIZES.padding,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            backgroundColor: COLORS.white,
          }}
        >
          {/* delivery or booking */}
          <View style={{ flexDirection: "row" }}>
            <TextButton
              key={`delivery-1`}
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
                borderColor: deliveryMod === 1 ? COLORS.primary : COLORS.gray,
                backgroundColor: deliveryMod === 1 ? COLORS.primary : null,
              }}
              label="حجز"
              labelStyle={{
                color: deliveryMod === 1 ? COLORS.white : COLORS.black,
                padding: 2,
                ...FONTS.body5,
              }}
              disabled={false}
              onPress={() => setDeliveryMod(1)}
            />
            <TextButton
              key={`delivery-2`}
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
                borderColor: deliveryMod === 2 ? COLORS.primary : COLORS.gray,
                backgroundColor: deliveryMod === 2 ? COLORS.primary : null,
              }}
              label="توصيل"
              labelStyle={{
                color: deliveryMod === 2 ? COLORS.white : COLORS.black,
                padding: 2,
                ...FONTS.body5,
              }}
              disabled={false}
              onPress={() => setDeliveryMod(2)}
            />
            <Text style={{ flex: 1, ...FONTS.body3 }}>نوع الطلبية : </Text>
          </View>
          <LineDivider />
          {/**notes */}
          <View
            style={{
              marginTop: SIZES.base,
              marginBottom: SIZES.padding,
            }}
          >
            <FormInput
              label="ملاحظات"
              labelStyle={{ color: COLORS.black }}
              value={notes}
              onChange={(value) => {
                value.length > 0 && value.length < 500
                  ? setNotesError("")
                  : setNotesError("الملاحظات غير صالحة ");
                setNotes(value);
              }}
              placeholder="ادخل اي ملاحظة تخص الطلبية"
              multiline={true}
              numberOfLines={3}
              errorMsg={notesError}
              appendComponent={
                //its for validation marks if good or not
                <View style={{ justifyContent: "center" }}>
                  <Image
                    source={notesError == "" ? icons.correct : icons.cross}
                    style={{
                      height: 20,
                      width: 20,
                      tintColor:
                        notes == "" && notesError == ""
                          ? COLORS.gray
                          : notes != "" && notesError == ""
                          ? COLORS.green
                          : COLORS.red,
                    }}
                  />
                </View>
              }
            />
          </View>
          {/**LINE DIVIDER */}
          <LineDivider />
          {/**check out button */}
          {currentUser ? (
            <TextButton
              buttonContainerStyle={{
                height: 60,
                marginTop: SIZES.padding,
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.primary,
              }}
              label="إحجز طلبك"
              onPress={handleSubmit}
              disabled={isSubmitting}
            />
          ) : (
            <TextButton
              buttonContainerStyle={{
                height: 60,
                marginTop: SIZES.padding,
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.primary,
              }}
              label="سجل دخولك اولا"
              onPress={() => navigation.navigate("SignIn")}
              disabled={isSubmitting}
            />
          )}
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
      {context.cart.length > 0 ? (
        <FlatList
          data={context.cart}
          keyExtractor={(item) => `${item.id}`}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: SIZES.padding }}
          ListHeaderComponent={
            <View>
              {/**HEADER */}
              {renderHeader()}
              {renderInfo()}
            </View>
          }
          renderItem={({ item, index }) => {
            return renderTrackOrder(item, index);
          }}
        />
      ) : (
        <View>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      )}
      <View>{renderFooter()}</View>
    </View>
  );
};

export default DeliveryList;
