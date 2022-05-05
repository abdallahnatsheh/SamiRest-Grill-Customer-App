import React from "react";
import { View, Image } from "react-native";
import { SIZES, COLORS, icons } from "../../constants";
import AuthLayout from "./AuthLayout";
import { FormInput, TextButton } from "../../Components";
import { Formik } from "formik";
import { useAuth } from "../../context/AuthContext";

const ForgotPassword = () => {
  const { resetPassword } = useAuth();

  //email vallidations errors
  const [emailError, setEmailError] = React.useState("");
  //isSubmitting check
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  //function to check if everything validate to enable signin
  function isVerythingOk(email) {
    return email != "" && emailError == "";
  }
  return (
    <Formik
      initialValues={{ email: "" }}
      onSubmit={async (values) => {
        setIsSubmitting(true);
        await resetPassword(values.email);
        setIsSubmitting(false);
      }}
      validate={(values) => {
        const errors = {};
        const reEmail =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!values.email) {
          setEmailError("البريد الالكتروني مطلوب");
        } else if (!reEmail.test(values.email)) {
          setEmailError("البريد الالكتروني غير صالح");
        } else if (values.email.length < 0 || values.email.length > 100) {
          setEmailError("البريد الالكتروني غير صالح");
        } else {
          setEmailError("");
        }
        return errors;
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <AuthLayout
          title="تغيير كلمة المرور"
          subtitle="ادخل بريدك الالكتروني ليصلك الرابط على البريد الالكتروني"
        >
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
            {/**SIGN IN  */}
            <TextButton
              label="ارسل الطلب "
              buttonContainerStyle={{
                height: 55,
                alignItems: "center",
                marginTop: SIZES.padding,
                borderRadius: SIZES.radius,
                backgroundColor:
                  isVerythingOk(values.email) && !isSubmitting
                    ? COLORS.primary
                    : COLORS.transparentPrimray,
              }}
              onPress={handleSubmit}
              disabled={isSubmitting || !isVerythingOk(values.email)}
            />
          </View>
        </AuthLayout>
      )}
    </Formik>
  );
};

export default ForgotPassword;
