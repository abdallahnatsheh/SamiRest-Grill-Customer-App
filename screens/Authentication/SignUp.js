import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { FONTS, SIZES, COLORS, icons } from "../../constants";
import AuthLayout from "./AuthLayout";
import {
  FormInput,
  CustomSwitch,
  TextButton,
  TextIconButton,
} from "../../Components";
import utils from "../../utils/Utils";
import { Formik } from "formik";
import { useAuth } from "../../context/AuthContext";

const SignUp = ({ navigation }) => {
  const { signUp } = useAuth();
  // password errors
  const [passwordError, setPasswordError] = React.useState("");
  //confirm password error
  const [confirmPasswordError, setconfirmPasswordError] = React.useState("");

  //email vallidations errors
  const [emailError, setEmailError] = React.useState("");
  //show password or not
  const [showPass, setShowPass] = React.useState(false);
  //isSubmitting check
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  //function to check if everything validate to enable signin
  function isVerythingOk(email, password, confirmPassword) {
    return (
      email != "" &&
      password != "" &&
      confirmPassword != "" &&
      passwordError == "" &&
      confirmPasswordError == "" &&
      emailError == ""
    );
  }
  return (
    <Formik
      initialValues={{ email: "", password: "", confirmPassword: "" }}
      onSubmit={async (values) => {
        setIsSubmitting(true);
        await signUp(values.email, values.password);
        setIsSubmitting(false);
      }}
      validate={(values) => {
        const errors = {};
        const reEmail =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const onealpha = /[a-z]/i;
        const onenum = /[0-9~!@#$%^&*()_+\-={}|[\]\\:";'<>?,./]/i;
        if (!values.email) {
          setEmailError("البريد الالكتروني مطلوب");
        } else if (!reEmail.test(values.email)) {
          setEmailError("البريد الالكتروني غير صالح");
        } else if (values.email.length < 0 || values.email.length > 100) {
          setEmailError("البريد الالكتروني غير صالح");
        } else {
          setEmailError("");
        }
        if (!values.password) {
          setPasswordError("كلمة السر مطلوبة");
        } else if (values.password < 6 || values.password > 100) {
          setPasswordError("كلمة السر غير صالحة");
        } else if (!onealpha.test(values.password)) {
          setPasswordError("على الاقل حرف واحد كبير او صغير");
        } else if (!onenum.test(values.password)) {
          setPasswordError("رقم او رمز واحد على الاقل");
        } else {
          setPasswordError("");
        }
        if (!values.confirmPassword) {
          setconfirmPasswordError("تأكيد كلمة السر مطلوب");
        } else if (values.confirmPassword < 6 || values.password > 100) {
          setconfirmPasswordError("تأكيد كلمة السر غير صالح");
        } else if (values.confirmPassword !== values.password) {
          setconfirmPasswordError("كلمات السر ليست متطابقة");
        } else {
          setconfirmPasswordError("");
        }
        return errors;
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <AuthLayout title="مرحبا بك !" subtitle="انشئ حساب للإستمرار">
          <View style={{ flex: 1, marginTop: SIZES.padding * 2 }}>
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
              label="كلمة السر"
              secureTextEntry={!showPass}
              autoCompleteType="password"
              containerStyle={{ marginTop: SIZES.radius }}
              onChange={handleChange("password")}
              onBlur={handleBlur("password")}
              errorMsg={passwordError}
              appendComponent={
                //its show password or hide it
                <TouchableOpacity
                  style={{
                    width: 40,
                    justifyContent: "center",
                  }}
                  onPress={() => setShowPass(!showPass)}
                >
                  <Image
                    source={showPass ? icons.eye_close : icons.eye}
                    style={{ height: 20, width: 20, tintColor: COLORS.gray }}
                  />
                </TouchableOpacity>
              }
            />
            <FormInput
              label="تأكيد كلمة المرور"
              secureTextEntry={!showPass}
              autoCompleteType="password"
              containerStyle={{ marginTop: SIZES.radius }}
              onChange={handleChange("confirmPassword")}
              onBlur={handleBlur("confirmPassword")}
              errorMsg={confirmPasswordError}
              appendComponent={
                //its for validation marks if good or not
                <View style={{ justifyContent: "center" }}>
                  <Image
                    source={
                      confirmPasswordError == "" ? icons.correct : icons.cross
                    }
                    style={{
                      height: 20,
                      width: 20,
                      tintColor:
                        values.confirmPassword == "" &&
                        confirmPasswordError == ""
                          ? COLORS.gray
                          : values.confirmPassword != "" &&
                            confirmPasswordError == ""
                          ? COLORS.green
                          : COLORS.red,
                    }}
                  />
                </View>
              }
            />
            {/**SIGN IN  */}
            <TextButton
              label="اشتراك"
              buttonContainerStyle={{
                height: 55,
                alignItems: "center",
                marginTop: SIZES.padding,
                borderRadius: SIZES.radius,
                backgroundColor:
                  isVerythingOk(values.email, values.password) && !isSubmitting
                    ? COLORS.primary
                    : COLORS.transparentPrimray,
              }}
              onPress={handleSubmit}
              disabled={
                isSubmitting || !isVerythingOk(values.email, values.password)
              }
            />

            {/**SIGN UP */}
            <View
              style={{
                flexDirection: "row",
                marginTop: SIZES.radius,
                justifyContent: "center",
              }}
            >
              <TextButton
                label={"سجل الاّن"}
                buttonContainerStyle={{
                  marginRight: 3,
                  backgroundColor: null,
                }}
                labelStyle={{ color: COLORS.primary, ...FONTS.h3 }}
                onPress={() => navigation.goBack()}
              />
              <Text style={{ color: COLORS.darkGray, ...FONTS.body3 }}>
                الديك حساب بالفعل ؟
              </Text>
            </View>
          </View>
        </AuthLayout>
      )}
    </Formik>
  );
};

export default SignUp;
