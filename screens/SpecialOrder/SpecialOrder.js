// Formik x React Native example
import React from "react";
import { View, Image, Alert } from "react-native";
import { Formik } from "formik";
import { FormInput, TextButton } from "../../Components";
import AuthLayout from "../Authentication/AuthLayout";
import { SIZES, COLORS, icons } from "../../constants";
import { useAuth } from "../../context/AuthContext";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../Firebase/firebase.Config";
import { useNavigation } from "@react-navigation/native";

const SpecialOrder = () => {
  const { currentUser, dataUser } = useAuth();
  const navigation = useNavigation();
  //these states for form validations
  //meal name errors will be here
  const [nameError, setNameError] = React.useState("");
  // meal people number is here
  const [numberError, setNumberError] = React.useState("");
  //meal describtion is here
  const [describtionError, setDescribtionError] = React.useState("");
  //isSubmitting check
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  //function to check if everything validate to enable ordering
  function isVerythingOk(name, quantity, describtion) {
    return (
      name != "" &&
      quantity != "" &&
      describtion != "" &&
      nameError == "" &&
      numberError == "" &&
      describtionError == ""
    );
  }

  return (
    <Formik
      initialValues={{ name: "", quantity: "", describtion: "" }}
      onSubmit={async (values) => {
        const today = new Date(
          Date("he-IL", {
            timeZone: "Asia/Jerusalem",
          })
        );
        var date =
          today.getFullYear() +
          "-" +
          (today.getMonth() + 1) +
          "-" +
          today.getDate();
        var time =
          today.getHours() +
          ":" +
          today.getMinutes() +
          ":" +
          today.getSeconds();
        setIsSubmitting(true);
        const orderResult = collection(db, "specialOrders");
        addDoc(orderResult, {
          specialOrder: {
            name: values.name,
            quantity: values.quantity,
            describtion: values.describtion,
          },
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
          orderTime: time,
          orderDate: date,
        })
          .then(function () {
            Alert.alert("تم الأرسال", "تم ارسال الطلب بنجاح", [
              { text: "حسناً" },
            ]);
            setIsSubmitting(false);
          })
          .catch(function () {
            Alert.alert("خطأ", "خطأ في الخدمة", [{ text: "حسناً" }]);
            setIsSubmitting(false);
          });
        setIsSubmitting(false);
      }}
      validate={(values) => {
        const errors = {};
        const nameArabicRegex = /^[\u0621-\u064A\u0660-\u0669 ]+$/i;
        if (!values.name) {
          setNameError("الاسم مطلوب");
          //errors.name = "الاسم مطلوب";
        } else if (!nameArabicRegex.test(values.name)) {
          setNameError("الاسم غير صالح");
          //errors.name = "الاسم غير صالح";
        } else if (values.name.length <= 0 || values.name.length > 20) {
          setNameError("الاسم غير صالح");
          //errors.name = "الاسم غير صالح";
        } else {
          setNameError("");
        }
        if (!values.quantity) {
          // errors.quantity = "الكمية مطلوبة";
          setNumberError("الكمية مطلوبة");
        } else if (values.quantity < 0 || values.quantity > 1000) {
          //errors.quantity = "ادخل كمية صالحة ";
          setNumberError("ادخل كمية صالحة ");
        } else {
          setNumberError("");
        }
        if (!values.describtion) {
          setDescribtionError("الوصف مطلوب");
        } else if (
          !values.describtion ||
          !nameArabicRegex.test(values.describtion)
        ) {
          setDescribtionError("الوصف غير صالح");
        } else if (
          values.describtion.length <= 0 ||
          values.describtion.length > 100
        ) {
          setDescribtionError("الوصف غير صالح");
        } else {
          setDescribtionError("");
        }

        return errors;
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <AuthLayout
          title="طلبية خاصة"
          subtitle=" اطلب اي وجبة تحتاجها غير موجودة بقائمة الوجبات "
        >
          <View style={{ flex: 1, marginTop: SIZES.padding * 2 }}>
            <FormInput
              label="اسم الوجبة"
              onChange={handleChange("name")}
              onBlur={handleBlur("name")}
              errorMsg={nameError}
              appendComponent={
                //its for validation marks if good or not
                <View style={{ justifyContent: "center" }}>
                  <Image
                    source={nameError == "" ? icons.correct : icons.cross}
                    style={{
                      height: 20,
                      width: 20,
                      tintColor:
                        values.name == "" && nameError == ""
                          ? COLORS.gray
                          : values.name != "" && nameError == ""
                          ? COLORS.green
                          : COLORS.red,
                    }}
                  />
                </View>
              }
            />
            <FormInput
              label="الكمية /عدد الأشخاص"
              onChange={handleChange("quantity")}
              onBlur={handleBlur("quantity")}
              keyboardType="number-pad"
              errorMsg={numberError}
              appendComponent={
                //its for validation marks if good or not
                <View style={{ justifyContent: "center" }}>
                  <Image
                    source={numberError == "" ? icons.correct : icons.cross}
                    style={{
                      height: 20,
                      width: 20,
                      tintColor:
                        values.quantity == "" && numberError == ""
                          ? COLORS.gray
                          : values.quantity != "" && numberError == ""
                          ? COLORS.green
                          : COLORS.red,
                    }}
                  />
                </View>
              }
            />
            <FormInput
              label="تفاصيل الطلبية"
              onChange={handleChange("describtion")}
              onBlur={handleBlur("describtion")}
              errorMsg={describtionError}
              appendComponent={
                //its for validation marks if good or not
                <View style={{ justifyContent: "center" }}>
                  <Image
                    source={
                      describtionError == "" ? icons.correct : icons.cross
                    }
                    style={{
                      height: 20,
                      width: 20,
                      tintColor:
                        values.describtion == "" && describtionError == ""
                          ? COLORS.gray
                          : values.describtion != "" && describtionError == ""
                          ? COLORS.green
                          : COLORS.red,
                    }}
                  />
                </View>
              }
            />
            {currentUser ? (
              <TextButton
                label="اطلب الان"
                buttonContainerStyle={{
                  height: 55,
                  alignItems: "center",
                  marginTop: SIZES.padding,
                  borderRadius: SIZES.radius,
                  backgroundColor:
                    isSubmitting ||
                    !isVerythingOk(
                      values.name,
                      values.quantity,
                      values.describtion
                    )
                      ? COLORS.transparentPrimray
                      : COLORS.primary,
                }}
                onPress={handleSubmit}
                disabled={
                  isSubmitting ||
                  !isVerythingOk(
                    values.name,
                    values.quantity,
                    values.describtion
                  )
                }
              />
            ) : (
              <TextButton
                label="سجل دخولك اولا"
                buttonContainerStyle={{
                  height: 55,
                  alignItems: "center",
                  marginTop: SIZES.padding,
                  borderRadius: SIZES.radius,
                  backgroundColor: COLORS.primary,
                }}
                onPress={() => navigation.navigate("SignIn")}
              />
            )}
          </View>
        </AuthLayout>
      )}
    </Formik>
  );
};

export default SpecialOrder;
