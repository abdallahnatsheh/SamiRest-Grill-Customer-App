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
import { IconBotton, TwoPointSlider, TextButton } from ".";

const Section = ({ containerStyle, title, children }) => {
  return (
    <View style={{ marginTop: SIZES.padding, ...containerStyle }}>
      <Text style={{ ...FONTS.h3 }}>{title}</Text>
      {children}
    </View>
  );
};
const FilterModal = ({ isVisible, onClose, setMenuList, menuList }) => {
  const modalAnimatedValue = React.useRef(new Animated.Value(0)).current;
  const [ShowFilterModal, setShowFilterModal] = React.useState(isVisible);
  const [priceRnage, setPriceRange] = React.useState([5, 50]);

  React.useEffect(() => {
    /**      
    if (!ShowFilterModal) {
      onClose()}; */

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
  function renderPricingRange() {
    return (
      <Section title="نطاق السعر">
        <View style={{ alignItems: "center" }}>
          <TwoPointSlider
            values={[5, 50]}
            min={1}
            max={100}
            prefix="₪"
            postfix=""
            onValuesChange={(values) => setPriceRange(values)}
          />
        </View>
      </Section>
    );
  }
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
              تصفية البحث
            </Text>
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 250 }}
          >
            {/**PRICING RANGE SECTION */}
            {renderPricingRange()}
          </ScrollView>
          {/**APPLY BOTTOM */}
          <View
            style={{
              position: "absolute",
              bottom: 150,
              left: 0,
              right: 0,
              height: 110,
              paddingHorizontal: SIZES.padding,
              paddingVertical: SIZES.radius,
              backgroundColor: COLORS.white,
            }}
          >
            <TextButton
              label="تطبيق"
              buttonContainerStyle={{
                height: 50,
                borderRadius: SIZES.base,
                backgroundColor: COLORS.primary,
              }}
              onPress={() => {
                let temp = menuList.filter(
                  (a) =>
                    a.price.defaultPrice.value >= priceRnage[0] &&
                    a.price.defaultPrice.value <= priceRnage[1]
                );
                setMenuList(temp);
                setShowFilterModal(false);
              }}
            />
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};
export default FilterModal;
