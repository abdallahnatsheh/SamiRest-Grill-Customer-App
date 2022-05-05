// Formik x React Native example
import React from "react";
import {
  Button,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Formik } from "formik";
import { FormInput, TextButton, Header } from "../../Components";
import AuthLayout from "../Authentication/AuthLayout";
import { FONTS, SIZES, COLORS, icons, dummyData } from "../../constants";
import { useAuth } from "../../context/AuthContext";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../Firebase/firebase.Config";

const Support = ({ navigation, route }) => {
  const { dataUser } = useAuth();

  //these states for form validations
  //meal name errors will be here
  const [nameError, setNameError] = React.useState("");
  // meal people number is here
  const [phoneNumberError, setPhoneNumberError] = React.useState("");
  //meal describtion is here
  const [describtionError, setDescribtionError] = React.useState("");
  //email vallidations errors
  const [emailError, setEmailError] = React.useState("");
  //isSubmitting check
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  //function to check if everything validate to enable signin
  function isVerythingOk(name, phoneNumber, email, describtion) {
    return (
      name != "" &&
      phoneNumber != "" &&
      describtion != "" &&
      email != "" &&
      nameError == "" &&
      phoneNumberError == "" &&
      emailError == "" &&
      describtionError == ""
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
      <Header
        containerStyle={{
          height: 50,
          paddingHorizontal: SIZES.padding,
          marginTop: 40,
          alignItems: "center",
          backgroundColor: COLORS.white,
        }}
        title="الدعم الفني"
        leftComponent={
          <TouchableOpacity
            style={{
              width: 40,
              height: 40,
              alignItems: "center",
              justifyContent: "center",
              borderWidth: 1,
              borderColor: COLORS.gray2,
              borderRadius: SIZES.radius,
            }}
            onPress={() => navigation.goBack()}
          >
            <Image
              source={icons.back}
              style={{ width: 20, height: 20, borderRadius: SIZES.radius }}
            />
          </TouchableOpacity>
        }
        rightComponent={
          <TouchableOpacity
            style={{
              borderRadius: SIZES.radius,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => navigation.navigate("MyAccount")}
          >
            <Image
              source={
                dataUser?.personalImage
                  ? { uri: dataUser?.personalImage }
                  : dummyData?.myProfile?.profile_image
              }
              style={{ width: 40, height: 40, borderRadius: SIZES.radius }}
            />
          </TouchableOpacity>
        }
      />
      <Formik
        initialValues={{
          name: "",
          phoneNumber: "",
          email: "",
          describtion: "",
        }}
        onSubmit={async (values) => {
          setIsSubmitting(true);
          const orderResult = collection(db, "cSupport");
          await addDoc(orderResult, {
            name: values.name,
            email: values.email,
            phone: values.phoneNumber,
            describtion: values.describtion,
          })
            .then(function () {
              navigation.navigate("Home");
            })
            .catch(function () {
              Alert.alert("خطأ", "خطأ في الخدمة", "خطأ", [{ text: "حسناً" }]);
            });
          setIsSubmitting(false);
        }}
        validate={(values) => {
          const errors = {};
          const nameArabicRegex = /^[\u0621-\u064A\u0660-\u0669 ]+$/i;
          const emailRegex =
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          const phoneRegex =
            /^\+?(972|0)()?0?(([23489]{1}\d{7})|[5]{1}\d{8})$/i;
          const descRegex = /^[a-zA-Z0-9 ]*$/i;
          const nameRegex = /^[a-zA-Z ]*$/i;

          if (!values.name) {
            setNameError("الاسم مطلوب");
          } else if (
            !nameArabicRegex.test(values.name) &&
            !nameRegex.test(values.name)
          ) {
            setNameError("الاسم غير صالح");
          } else if (values.name.length <= 0 || values.name.length > 20) {
            setNameError("الاسم غير صالح");
          } else {
            setNameError("");
          }
          if (!values.email) {
            setEmailError("البريد الالكتروني مطلوب");
          } else if (!emailRegex.test(values.email)) {
            setEmailError("البريد الالكتروني غير صالح");
          } else {
            setEmailError("");
          }
          if (values.phoneNumber && !phoneRegex.test(values.phoneNumber)) {
            setPhoneNumberError("رقم الهاتف غير صالح");
          } else {
            setPhoneNumberError("");
          }
          if (!values.describtion) {
            setDescribtionError("الوصف مطلوب");
          } else if (
            !values.describtion ||
            (!nameArabicRegex.test(values.describtion) &&
              !descRegex.test(values.describtion))
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
            title="الدعم الفني"
            subtitle="إذا عندك اسئلة أو اي مشكلة تقنية تةاصل معنا وسنرد باقرب وقت"
          >
            <View style={{ flex: 1, marginTop: SIZES.padding * 2 }}>
              <FormInput
                label="اسمك الكامل"
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
              {/**FORM INPUT */}
              <FormInput
                label="البريد الالكتروني"
                keyboardType="email-address"
                autoCompleteType="email"
                onChange={handleChange("email")}
                onBlur={handleBlur("email")}
                errorMsg={emailError}
                appendComponent={
                  //its for validation marks if good or not
                  <View style={{ justifyContent: "center" }}>
                    <Image
                      source={emailError == "" ? icons.correct : icons.cross}
                      style={{
                        height: 20,
                        width: 20,
                        tintColor:
                          values.email == "" && emailError == ""
                            ? COLORS.gray
                            : values.email != "" && emailError == ""
                            ? COLORS.green
                            : COLORS.red,
                      }}
                    />
                  </View>
                }
              />
              <FormInput
                label="رقم الهاتف"
                onChange={handleChange("phoneNumber")}
                onBlur={handleBlur("phoneNumber")}
                keyboardType="number-pad"
                errorMsg={phoneNumberError}
                appendComponent={
                  //its for validation marks if good or not
                  <View style={{ justifyContent: "center" }}>
                    <Image
                      source={
                        phoneNumberError == "" ? icons.correct : icons.cross
                      }
                      style={{
                        height: 20,
                        width: 20,
                        tintColor:
                          values.phoneNumber == "" && phoneNumberError == ""
                            ? COLORS.gray
                            : values.phoneNumber != "" && phoneNumberError == ""
                            ? COLORS.green
                            : COLORS.red,
                      }}
                    />
                  </View>
                }
              />
              <FormInput
                label="التفاصيل"
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
              <TextButton
                label="اطلب الان"
                buttonContainerStyle={{
                  height: 55,
                  alignItems: "center",
                  marginTop: SIZES.padding,
                  borderRadius: SIZES.radius,
                  borderRadius: SIZES.radius,
                  backgroundColor:
                    isVerythingOk(values.email, values.password) &&
                    !isSubmitting
                      ? COLORS.primary
                      : COLORS.transparentPrimray,
                }}
                onPress={handleSubmit}
                disabled={
                  isSubmitting ||
                  !isVerythingOk(
                    values.name,
                    values.phoneNumber,
                    values.email,
                    values.describtion
                  )
                }
              />
            </View>
          </AuthLayout>
        )}
      </Formik>
    </View>
  );
};

export default Support;
