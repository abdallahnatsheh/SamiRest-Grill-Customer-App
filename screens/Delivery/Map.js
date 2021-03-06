import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Platform,
} from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { LinearGradient } from "expo-linear-gradient";
import * as Location from "expo-location";
import {
  COLORS,
  FONTS,
  icons,
  SIZES,
  dummyData,
  constants,
} from "../../constants";
import { utils } from "../../utils";
import { IconBotton } from "../../Components";
import { Alert } from "react-native-web";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { db } from "../../Firebase/firebase.Config";
//google map for live tracking and duration 
const Map = ({ navigation, route }) => {
  const dataUser = route.params.dataUser;
  const orderItem = route.params.orderItem;
  //map refrence 
  const mapView = React.useRef();
  //starting region
  const [region, setRegion] = React.useState(null);
  //customer coordinates
  const [toLoc, setToLoc] = React.useState(null);
  //order worker current coordinates
  const [fromLoc, setFromLoc] = React.useState(null);
  //angle for the marke on the map
  const [angle, setAngle] = React.useState(0);
  const [isReady, setIsReady] = React.useState(false);
  //current duration to get to destination
  const [duration, setDuration] = React.useState("");
  //used to show a close view of the map
  const [allCor, setAllCor] = React.useState();
  //check for location permission to be a able track delivery location
  React.useEffect(async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert("عليك اعطاء صلاحيات الموقع لتفعيل خاصية التتبع");
      return;
    }
    let initialRegion = {
      latitude: 31.768318999999998,
      longitude: 35.21371,
      latitudeDelta: 0.02,
      longitudeDelta: 0.02,
    };
    setRegion(initialRegion);
    setFromLoc(orderItem.workerData.liveCoor);
    try {
      let result = await Location.geocodeAsync(
        dataUser.firstAddress + "," + dataUser?.secondAddress
      );
      setToLoc({
        latitude: result[0].latitude,
        longitude: result[0].longitude,
      });
    } catch (e) {
      console.log("geo error", e.message);
    }
  }, []);
  //get delivery live location
  React.useEffect(
    () =>
      onSnapshot(doc(db, "orders", orderItem.id), (snapshot) => {
        setFromLoc(snapshot.data().workerData.liveCoor);
        console.log("snapshot", snapshot.data().workerData.liveCoor);
      }),
    []
  );
  //check if the order is delivered 
  React.useEffect(
    () =>
      onSnapshot(doc(db, "orders", orderItem.id), (snapshot) => {
        if (snapshot.data().status === "تم التوصيل") {
          console.log("snapshot", snapshot.data().status);
          navigation.replace("DeliveryDone");
        }
      }),
    []
  );
  // Render

  function renderMaps() {
    return (
      <MapView
        ref={mapView}
        style={{
          flex: 1,
        }}
        loadingEnabled
        loadingIndicatorColor
        mapType="mutedStandard"
        provider={PROVIDER_GOOGLE}
        initialRegion={region}
      >
        {fromLoc && (
          <Marker
            key={"fromLoc"}
            identifier="fromLoc"
            coordinate={fromLoc}
            tracksViewChanges={false}
            title={"موقع طلبيتك"}
            pinColor={"#FF8000"}
            // rotation={angle}
            anchor={{ x: 0.5, y: 0.5 }}
          ></Marker>
        )}

        {toLoc && (
          <Marker
            key={"toLoc"}
            identifier="toLoc"
            coordinate={toLoc}
            title={"موقعك"}
            tracksViewChanges={false}
            pinColor={"#0080FF"}
            anchor={{ x: 0.5, y: 0.5 }}
          ></Marker>
        )}

        <MapViewDirections
          origin={fromLoc}
          destination={toLoc}
          apikey={constants.GOOGLE_MAP_API_KEY}
          strokeWidth={5}
          strokeColor={COLORS.primary}
          mode="DRIVING"
          optimizeWaypoints={true}
          onReady={(result) => {
            setDuration(Math.ceil(result.duration));
            setAllCor(result.coordinates);
            if (!isReady) {
              // Fit route into maps
              mapView.current.fitToCoordinates(result.coordinates, {
                edgePadding: {
                  right: SIZES.width * 0.1,
                  bottom: 400,
                  left: SIZES.width * 0.1,
                  top: SIZES.height * 0.1,
                },
              });

              // Reposition the navigator
              let nextLoc = {
                latitude: result.coordinates[0]["latitude"],
                longitude: result.coordinates[0]["longitude"],
              };

              if (result.coordinates.length >= 2) {
                let angle = utils.calculateAngle(result.coordinates);
                setAngle(angle);
              }

              setFromLoc(nextLoc);
              setIsReady(true);
            }
          }}
        />
      </MapView>
    );
  }

  function renderHeaderButtons() {
    return (
      <>
        <IconBotton
          icon={icons.back}
          containerStyle={{
            position: "absolute",
            top: SIZES.padding * 2,
            left: SIZES.padding,
            ...styles.buttonStyle,
          }}
          iconStyle={{
            width: 20,
            height: 20,
            tintColor: COLORS.gray2,
          }}
          onPress={() => navigation.goBack()}
        />

        <View
          style={{
            position: "absolute",
            top: SIZES.padding * 2,
            right: SIZES.padding,
          }}
        >
          <IconBotton
            icon={icons.globe}
            containerStyle={{
              ...styles.buttonStyle,
            }}
            iconStyle={{
              width: 20,
              height: 20,
              tintColor: COLORS.gray,
            }}
            onPress={() => {
              mapView.current.fitToCoordinates(allCor),
                {
                  edgePadding: {
                    right: SIZES.width * 0.1,
                    bottom: 400,
                    left: SIZES.width * 0.1,
                    top: SIZES.height * 0.1,
                  },
                };
            }}
          />

          <IconBotton
            icon={icons.focus}
            containerStyle={{
              marginTop: SIZES.radius,
              ...styles.buttonStyle,
            }}
            iconStyle={{
              width: 20,
              height: 20,
              tintColor: COLORS.gray,
            }}
            onPress={() => {
              mapView.current.fitToSuppliedMarkers(["fromLoc"]),
                {
                  edgePadding: {
                    right: SIZES.width * 0.1,
                    bottom: 400,
                    left: SIZES.width * 0.1,
                    top: SIZES.height * 0.1,
                  },
                };
            }}
          />
        </View>
      </>
    );
  }

  function renderDeliveryInfo() {
    return (
      <View
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
        }}
      >
        {/* Shadow */}
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          colors={[COLORS.transparent, COLORS.lightGray1]}
          style={{
            position: "absolute",
            top: -20,
            left: 0,
            right: 0,
            height: Platform.OS === "ios" ? 200 : 50,
          }}
        />

        <View
          style={{
            padding: SIZES.padding,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            backgroundColor: COLORS.white,
          }}
        >
          {/* Delivery Time */}
          <View
            style={{
              flexDirection: "row-reverse",
              alignItems: "center",
            }}
          >
            <Image
              source={icons.clock}
              style={{
                width: 40,
                height: 40,
                tintColor: COLORS.black,
              }}
            />

            <View
              style={{
                marginRight: SIZES.padding,
              }}
            >
              <Text style={{ color: COLORS.gray, ...FONTS.body4 }}>
                وقت وصول طلبيتك
              </Text>
              <Text style={{ ...FONTS.h3 }}>{duration} دقيقة</Text>
            </View>
          </View>

          {/* Address */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: SIZES.padding,
              flexDirection: "row-reverse",
            }}
          >
            <Image
              source={icons.focus}
              style={{
                width: 40,
                height: 40,
                tintColor: COLORS.black,
              }}
            />

            <View
              style={{
                marginRight: SIZES.padding,
              }}
            >
              <Text style={{ color: COLORS.gray, ...FONTS.body4 }}>عنوانك</Text>
              <Text style={{ ...FONTS.h3 }}>
                {dataUser.firstAddress + "," + dataUser?.secondAddress}
              </Text>
            </View>
          </View>

          {/* Delivery Man Details */}
          <TouchableOpacity
            style={{
              flexDirection: "row-reverse",
              height: 70,
              marginTop: SIZES.padding,
              borderRadius: SIZES.radius,
              paddingHorizontal: SIZES.radius,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: COLORS.primary,
            }}
            onPress={() => {
              utils.dialCall(parseInt(orderItem.workerData.phoneNumber));
            }}
          >
            <Image
              source={{ uri: orderItem.workerData.personalImage }}
              style={{
                width: 40,
                height: 40,
                borderRadius: 5,
              }}
            />

            <View style={{ flex: 1, marginRight: SIZES.radius }}>
              <Text style={{ color: COLORS.white, ...FONTS.h3 }}>
                {orderItem.workerData.firstName}
              </Text>
              <Text style={{ color: COLORS.white, ...FONTS.body4 }}>
                موظف التوصيل
              </Text>
            </View>

            <View
              style={{
                height: 40,
                width: 40,
                alignItems: "center",
                justifyContent: "center",
                borderWidth: 1,
                borderRadius: 5,
                borderColor: COLORS.white,
                backgroundColor: COLORS.transparentWhite1,
              }}
            >
              <Image
                source={icons.call}
                style={{
                  width: 30,
                  height: 30,
                }}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      {/* Map */}
      {renderMaps()}
      {/* Header Buttons */}
      {renderHeaderButtons()}

      {/* Delivery Info */}
      {renderDeliveryInfo()}
    </View>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    width: 40,
    height: 40,
    borderRadius: SIZES.radius,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: COLORS.gray2,
    backgroundColor: COLORS.white,
  },
});

export default Map;
