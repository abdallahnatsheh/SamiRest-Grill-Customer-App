import React from "react";
import {
  View,
  Text,
  Animated,
  ScrollView,
  TouchableWithoutFeedback,
  Modal,
} from "react-native";
import {
  COLORS,
  FONTS,
  SIZES,
  constants,
  icons,
  dummyData,
} from "../constants";
import { IconBotton, TextButton } from ".";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useAuth } from "../context/AuthContext";

const LocationModal = ({ isVisible, onClose }) => {
  const modalAnimatedValue = React.useRef(new Animated.Value(0)).current;
  const [ShowFilterModal, setShowFilterModal] = React.useState(isVisible);
  const [chosenLocation, setChosenLocation] = React.useState("");
  const { dataUser } = useAuth();
  React.useEffect(() => {
    if (ShowFilterModal) {
      Animated.timing(modalAnimatedValue, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(modalAnimatedValue, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }).start(() => onClose());
    }
  }, [ShowFilterModal]);
  const modalY = modalAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [SIZES.height, SIZES.height - 680],
  });

  return (
    <Modal animationType="fade" transparent={true} visible={isVisible}>
      <View style={{ flex: 1, backgroundColor: COLORS.transparentBlack7 }}>
        {/**TRANPARENT BACKGROUND */}
        <TouchableWithoutFeedback onPress={() => setShowFilterModal(false)}>
          <View
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
          />
        </TouchableWithoutFeedback>
        <Animated.View
          style={{
            left: 0,
            top: modalY,
            width: "100%",
            height: "100%",
            padding: SIZES.padding,
            borderTopRightRadius: SIZES.padding,
            borderTopLeftRadius: SIZES.padding,
            backgroundColor: COLORS.white,
          }}
        >
          {/**HEADER */}
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <IconBotton
              containerStyle={{
                borderWidth: 2,
                borderRadius: 10,
                borderColor: COLORS.gray2,
              }}
              icon={icons.cross}
              iconStyle={{ tintColor: COLORS.gray2 }}
              onPress={() => setShowFilterModal(false)}
            />
            <Text style={{ flex: 1, fontSize: 18, ...FONTS.h3 }}>
              اختار مكان التوصيل
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <GooglePlacesAutocomplete
              placeholder="اختر منطقتك:"
              onPress={(data) => {
                setChosenLocation(data.description);
              }}
              minLength={2}
              query={{
                key: constants.GOOGLE_MAP_API_KEY,
                language: "ar",
                components: "country:il",
              }}
              debounce={200}
              listViewDisplayed={false}
              keyboardShouldPersistTaps="handled"
              enableHighAccuracyLocation={true}
              keepResultsAfterBlur={true}
              enablePoweredByContainer={false}
              styles={{
                textInput: { backgroundColor: COLORS.lightGray2 },
                container: {
                  height: 55,
                  paddingHorizontal: SIZES.padding,
                  marginTop: SIZES.base,
                  borderRadius: SIZES.radius,
                },
              }}
            />
          </View>

          {/**APPLY BOTTOM */}
          <View
            style={{
              position: "absolute",
              bottom: 150,
              left: 0,
              right: 0,
              paddingHorizontal: SIZES.padding,
              backgroundColor: COLORS.white,
            }}
          >
            <TextButton
              label="تطبيق"
              buttonContainerStyle={{
                height: 50,
                borderRadius: SIZES.base,
                backgroundColor:
                  chosenLocation.length === 0
                    ? COLORS.transparentPrimray
                    : COLORS.primary,
              }}
              disabled={chosenLocation.length === 0}
              onPress={() => {
                dataUser.firstAddress = chosenLocation;
                dataUser.secondAddress = "";
                setShowFilterModal(false);
              }}
            />
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};
export default LocationModal;
