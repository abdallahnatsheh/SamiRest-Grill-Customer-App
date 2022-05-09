import React, { useState } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  Alert,
  StyleSheet,
  ScrollView,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as ImagePicker from "expo-image-picker";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import {
  Header,
  IconBotton,
  TextButton,
  FormInput,
  FormDateInput,
  FormPicker,
} from "../../Components";
import {
  COLORS,
  SIZES,
  FONTS,
  icons,
  constants,
  dummyData,
} from "../../constants";
import { Formik } from "formik";
import { useAuth } from "../../context/AuthContext";
import moment from "moment";
import {
  query,
  getDocs,
  collection,
  where,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../../Firebase/firebase.Config";
const MyAccountEdit = ({ navigation }) => {
  const { currentUser, dataUser } = useAuth();

  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [phoneNoError, setPhoneNoError] = useState("");
  const [birthday, setBirthday] = useState(null);
  const [gender, setGender] = useState("");
  const [firstAddressError, setFirstAddressError] = useState("");
  const [secondAddressError, setSecondAddressError] = useState("");
  //isSubmitting check
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      const uploadUri =
        Platform.OS === "ios" ? result.uri.replace("file://", "") : result.uri;
      const tempImag = await fetch(uploadUri);
      const imgBytes = await tempImag.blob();
      const imageRef = ref(
        storage,
        `/users/images/${currentUser.uid}/perosnalimage`
      );
      await uploadBytes(imageRef, imgBytes)
        .then(() => {
          getDownloadURL(imageRef)
            .then((url) => {
              const userData = doc(db, "users", currentUser.uid);
              updateDoc(userData, {
                personalImage: url,
              }).then(() => {
                dataUser.personalImage = result.uri;
                navigation.navigate("MyAccountEdit");
              });
            })
            .catch((error) => {
              console.log(error);
              Alert.alert("خطأ", "مشكلة في خدمة سحابية", [{ text: "حسناً" }]);
            });
        })
        .catch((error) => {
          console.log(error);
          Alert.alert("خطأ", "مشكلة في خدمة سحابية", [{ text: "حسناً" }]);
        });
    }
  };
  function isVerythingOk(
    firstName,
    lastName,
    phoneNumber,
    firstAddress,
    secondAddress
  ) {
    return (
      firstName != "" &&
      lastName != "" &&
      firstAddress != "" &&
      secondAddress != "" &&
      phoneNumber != "" &&
      firstNameError == "" &&
      lastNameError == "" &&
      phoneNoError == "" &&
      secondAddressError == "" &&
      firstAddressError == ""
    );
  }
  function renderHeader() {
    return (
      <Header
        title="تعديل الحساب الشخصي"
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
          <View
            style={{
              width: 40,
            }}
          />
        }
      />
    );
  }
  return currentUser ? (
    <Formik
      initialValues={{
        firstName: dataUser?.firstName,
        lastName: dataUser?.lastName,
        phoneNumber: dataUser?.phoneNumber,
        birthday: dataUser?.birthday,
        gender: dataUser?.gender,
        firstAddress: dataUser?.firstAddress,
        secondAddress: dataUser?.secondAddress,
      }}
      onSubmit={async (values) => {
        setIsSubmitting(true);
        try {
          //check if user is exist and submit his data to firestore
          const profileRef = collection(db, "users");
          const q = query(profileRef, where("uid", "==", currentUser.uid));
          const docs = await getDocs(q);
          if (docs.docs.length !== 0) {
            const userData = doc(db, "users", currentUser.uid);
            await updateDoc(userData, {
              firstName: values.firstName,
              lastName: values.lastName,
              firstAddress: values.firstAddress,
              secondAddress: values.secondAddress,
              phoneNumber: values.phoneNumber,
              birthday: moment(birthday).format("YYYY-MM-DD"),
              gender: gender,
            }).then(() => {
              navigation.navigate("MyAccount");
            });
          }
        } catch (e) {
          Alert.alert("خطأ", "خطأ في الخدمة", [{ text: "حسناً" }]);
          console.log(e);
        }
        setIsSubmitting(false);
        // .then(() => navigation.replace("Home"))
        //.catch((r) => console.log("damn error", r));
      }}
      validate={(values) => {
        const errors = {};
        const nameArabicRegex = /^[\u0621-\u064A\u0660-\u0669 ]+$/i;
        const phoneRegex = /^\+?(972|0)()?0?(([23489]{1}\d{7})|[5]{1}\d{8})$/i;
        if (!values.firstName) {
          setFirstNameError("الإسم الاول مطلوب");
        } else if (!nameArabicRegex.test(values.firstName)) {
          setFirstNameError(" الاسم غير صالح");
        } else if (
          values.firstName.length < 0 ||
          values.firstName.length > 100
        ) {
          setFirstNameError(" الإسم غير صالح");
        } else {
          setFirstNameError("");
        }
        if (!values.lastName) {
          setLastNameError("الإسم الاخير مطلوب");
        } else if (!nameArabicRegex.test(values.lastName)) {
          setLastNameError(" الاسم غير صالح");
        } else if (values.lastName.length < 0 || values.lastName.length > 100) {
          setLastNameError(" الإسم غير صالح");
        } else {
          setLastNameError("");
        }
        if (!values.phoneNumber) {
          setPhoneNoError("رقم الهاتف مطلوب");
        } else if (!phoneRegex.test(values.phoneNumber)) {
          setPhoneNoError("رقم الهاتف غير صالح");
        } else {
          setPhoneNoError("");
        }
        if (!values.firstAddress) {
          setFirstAddressError("العنوان الاول مطلوب");
        } else if (values.firstAddress < 2 || values.firstAddress > 30) {
          setFirstAddressError("العنوان الاول غير صالح");
        } else {
          setFirstAddressError("");
        }
        if (!values.secondAddress) {
          setSecondAddressError("العنوان الاول مطلوب");
        } else if (values.secondAddress < 2 || values.secondAddress > 30) {
          setSecondAddressError("العنوان الاول غير صالح");
        } else {
          setSecondAddressError("");
        }
        return errors;
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <View
          style={{
            flex: 1,
            backgroundColor: COLORS.white,
          }}
        >
          {renderHeader()}

          <KeyboardAwareScrollView
            horizontal={false}
            keyboardDismissMode="on-drag"
            contentContainerStyle={{
              marginTop: SIZES.radius,
              paddingHorizontal: SIZES.padding,
              paddingBottom: 40,
            }}
          >
            <View
              style={{
                paddingVertical: SIZES.padding,
                paddingHorizontal: SIZES.radius,
                borderRadius: SIZES.radius,
              }}
            >
              {/*personal image picker */}
              <TouchableOpacity
                style={{
                  borderRadius: SIZES.radius,
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onPress={pickImage}
              >
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: SIZES.radius,
                  }}
                >
                  <Image
                    source={
                      dataUser.personalImage
                        ? { uri: dataUser.personalImage }
                        : dummyData?.myProfile?.profile_image
                    }
                    style={{
                      width: 100,
                      height: 100,
                      maxHeight: 100,
                      maxWidth: 100,
                      minHeight: 50,
                      minWidth: 50,
                      borderRadius: SIZES.radius,
                    }}
                  />
                  <Text
                    style={{
                      color: COLORS.gray,
                      ...FONTS.body4,
                      padding: SIZES.padding,
                      textAlign: "center",
                    }}
                  >
                    إضغط لتغيير الصورة
                  </Text>
                </View>
              </TouchableOpacity>
              {/* first Name and last name */}

              <FormInput
                label="الاسم الشخصي"
                onChange={handleChange("firstName")}
                onBlur={handleBlur("firstName")}
                errorMsg={firstNameError}
                inputContainerStyle={{
                  backgroundColor: COLORS.white,
                }}
                value={values.firstName}
              />
              <FormInput
                label="اسم العائلة"
                onChange={handleChange("lastName")}
                onBlur={handleBlur("lastName")}
                errorMsg={lastNameError}
                inputContainerStyle={{
                  backgroundColor: COLORS.white,
                }}
                value={values.lastName}
              />

              {/* Phone Number */}
              <FormInput
                label="رقم الهاتف"
                onChange={handleChange("phoneNumber")}
                onBlur={handleBlur("phoneNumber")}
                errorMsg={phoneNoError}
                keyboardType={"number-pad"}
                containerStyle={{
                  marginTop: SIZES.radius,
                }}
                inputContainerStyle={{
                  backgroundColor: COLORS.white,
                }}
                value={values.phoneNumber}
              />

              {/* D.O.B */}
              <FormDateInput
                label="تاريخ الميلاد"
                placeholder="MM/DD/YYYY"
                value={birthday}
                setDate={setBirthday}
                containerStyle={{
                  marginTop: SIZES.radius,
                }}
                inputContainerStyle={{
                  backgroundColor: COLORS.lightGray2,
                }}
              />

              {/* Gender */}
              <FormPicker
                label="الجنس"
                placeholder="اختر جنسك"
                modalTitle="اختر جنسك"
                value={gender}
                setValue={setGender}
                options={constants.gender}
                containerStyle={{
                  marginTop: SIZES.radius,
                }}
                inputContainerStyle={{
                  backgroundColor: COLORS.lightGray2,
                }}
              />

              {/* Address */}
              <FormInput
                label="العنوان الاساسي"
                onChange={handleChange("firstAddress")}
                onBlur={handleBlur("firstAddress")}
                errorMsg={firstAddressError}
                containerStyle={{
                  marginTop: SIZES.radius,
                }}
                inputContainerStyle={{
                  backgroundColor: COLORS.white,
                }}
                value={values.firstAddress}
              />

              {/* City */}
              <FormInput
                label="العنوان الفرعي"
                onChange={handleChange("secondAddress")}
                onBlur={handleBlur("secondAddress")}
                errorMsg={secondAddressError}
                containerStyle={{
                  marginTop: SIZES.radius,
                }}
                inputContainerStyle={{
                  backgroundColor: COLORS.white,
                }}
                value={values.secondAddress}
              />
            </View>
          </KeyboardAwareScrollView>

          <TextButton
            buttonContainerStyle={{
              height: 60,
              marginTop: SIZES.padding,
              marginHorizontal: SIZES.padding,
              marginBottom: SIZES.padding,
              borderRadius: SIZES.radius,
              backgroundColor:
                isVerythingOk(
                  values.firstName,
                  values.lastName,
                  values.phoneNumber,
                  values.firstAddress,
                  values.secondAddress
                ) && !isSubmitting
                  ? COLORS.primary
                  : COLORS.transparentPrimray,
            }}
            onPress={handleSubmit}
            disabled={
              isSubmitting ||
              !isVerythingOk(
                values.firstName,
                values.lastName,
                values.phoneNumber,
                values.firstAddress,
                values.secondAddress
              )
            }
            label="حفظ التغييرات"
          />
        </View>
      )}
    </Formik>
  ) : (
    <View>
      <TouchableOpacity
        onPress={navigation.replace("SignIn")}
      ></TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: SIZES.base,
    backgroundColor: COLORS.lightGray2,
    width: "100%",
    height: "100%",
  },
});
export default MyAccountEdit;
