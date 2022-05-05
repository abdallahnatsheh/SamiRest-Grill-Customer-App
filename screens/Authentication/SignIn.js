import React from "react";
import { View, Text, TouchableOpacity, Image, BackHandler } from "react-native";
import { FONTS, SIZES, COLORS, icons } from "../../constants";
import AuthLayout from "./AuthLayout";
import { FormInput, CustomSwitch, TextButton } from "../../Components";
import { useAuth } from "../../context/AuthContext";
import { Formik } from "formik";
const SignIn = ({ navigation }) => {
  const { login } = useAuth();
  //email vallidations errors
  const [emailError, setEmailError] = React.useState("");
  //password vaidations errors
  const [passwordError, setPasswordError] = React.useState("");
  //isSubmitting check
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  //show password or not
  const [showPass, setShowPass] = React.useState(false);
  //save email switch
  //const [saveMe, setSaveMe] = React.useState(false);
  function isVerythingOk(email, password) {
    return (
      email != "" && password != "" && emailError == "" && passwordError == ""
    );
  }
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={async (values) => {
        setIsSubmitting(true);
        await login(values.email, values.password);
        setIsSubmitting(false);
        // .then(() => navigation.replace("Home"))
        //.catch((r) => console.log("damn error", r));
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
        return errors;
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <AuthLayout title="تسجيل الدخول" subtitle="مرحبا بعودتك !">
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
            {/**SAVE ME & FORGOT PASSWORD */}
            <View
              style={{
                flexDirection: "row",
                marginTop: SIZES.radius,
                justifyContent: "space-between",
              }}
            >
              <TextButton
                label="نسيت كلمة السر ؟"
                buttonContainerStyle={{
                  backgroundColor: null,
                }}
                labelStyle={{
                  color: COLORS.gray,
                  ...FONTS.body4,
                }}
                onPress={() => navigation.navigate("ForgotPassword")}
              />
              {/* <CustomSwitch value={saveMe} onChange={(value) => setSaveMe(value)} />*/}
            </View>
            {/**SIGN IN  */}
            <TextButton
              label="تسجيل الدخول"
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
                label={"انشئ حسابك"}
                buttonContainerStyle={{
                  marginRight: 3,
                  backgroundColor: null,
                }}
                labelStyle={{ color: COLORS.primary, ...FONTS.h3 }}
                onPress={() => navigation.navigate("SignUp")}
              />
            </View>
            {/*
        the api not implemented good to be worked with , waiting for updates from react native 
        <View>
          <TextIconButton
            containerStyle={{
              height: 50,
              alignItems: "center",
              marginTop: SIZES.radius,
              borderRadius: SIZES.radius,
              backgroundColor: COLORS.lightGray2,
            }}
            icon={icons.google}
            iconPosition="LEFT"
            iconStyle={{ tintColor: COLORS.lightOrange }}
            label="تسجيل باستخدام جوجل"
            labelStyle={{
              marginLeft: SIZES.radius,
            }}
            onPress={async () => {
              await loginWithGoogle().then(() => navigation.replace("Home"));
            }}
          />
        </View>*/}
          </View>
          {/**FOOTER SECTION */}
        </AuthLayout>
      )}
    </Formik>
  );
};

export default SignIn;
