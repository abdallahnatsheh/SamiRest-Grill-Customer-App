import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import MainDrawer from "./navigation/MainDrawer";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import rootReducer from "./stores/rootReducer";
import CartContext from "./context/CartContext";
import AuthContext, { useAuth } from "./context/AuthContext";
//import { useFonts } from "@use-expo/font";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import {
  SignIn,
  SignUp,
  ForgotPassword,
  FoodDetail,
  Checkout,
  MyCart,
  Success,
  AddCard,
  DeliveryStatus,
  DeliveryList,
  Map,
  DailyDeals,
  MainMenu,
  Support,
  Settings,
  ChangePassword,
  NotificationSetting,
  MyAccount,
  MyAccountEdit,
  Order,
  Review,
  MySpecialOrder,
  OrderList,
  AboutUs,
} from "./screens";
import { navigationRef } from "./navigation/rootNavigation";

const Stack = createStackNavigator();
const store = createStore(rootReducer, applyMiddleware(thunk));
const customFonts = {
  PoppinsBlack: require("./assets/fonts/PoppinsBlack.ttf"),
  PoppinsBold: require("./assets/fonts/PoppinsBold.ttf"),
  PoppinsSemiBold: require("./assets/fonts/PoppinsSemiBold.ttf"),
  TajawalMedium: require("./assets/fonts/TajawalMedium.ttf"),
  ElMessiriBold: require("./assets/fonts/ElMessiriBold.ttf"),
  ElMessiriSemiBold: require("./assets/fonts/ElMessiriSemiBold.ttf"),
};

const App = () => {
  //const [isLoaded, error] = useFonts(customFonts);
  const [appIsReady, setAppIsReady] = useState(false);

  /*if (!isLoaded) {
    return null;
  }*/
  /*useEffect(() => {
    (async () => {})();
  }, []);
  */
  useEffect(() => {
    async function prepare() {
      try {
        // Keep the splash screen visible while we fetch resources
        await SplashScreen.preventAutoHideAsync();
        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync(customFonts);
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  useEffect(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <CartContext>
      <Provider store={store}>
        <NavigationContainer ref={navigationRef}>
          <AuthContext>
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
              }}
              initialRouteName={"Home"}
            >
              <Stack.Screen name="Home" component={MainDrawer} />
              <Stack.Screen name="SignIn" component={SignIn} />
              <Stack.Screen name="SignUp" component={SignUp} />
              <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
              <Stack.Screen name="FoodDetail" component={FoodDetail} />
              <Stack.Screen name="Checkout" component={Checkout} />
              <Stack.Screen name="MyCart" component={MyCart} />
              <Stack.Screen
                name="Success"
                component={Success}
                options={{ gestureEnabled: false }}
              />
              <Stack.Screen name="DeliveryList" component={DeliveryList} />
              <Stack.Screen name="AddCard" component={AddCard} />
              <Stack.Screen
                name="DeliveryStatus"
                component={DeliveryStatus}
                options={{ gestureEnabled: false }}
              />
              <Stack.Screen name="MyAccount" component={MyAccount} />
              <Stack.Screen name="MyAccountEdit" component={MyAccountEdit} />
              <Stack.Screen name="Order" component={Order} />
              <Stack.Screen name="MySpecialOrder" component={MySpecialOrder} />
              <Stack.Screen name="OrderList" component={OrderList} />

              <Stack.Screen name="Review" component={Review} />

              <Stack.Screen name="Map" component={Map} />
              <Stack.Screen name="DailyDeals" component={DailyDeals} />
              <Stack.Screen name="MainMenu" component={MainMenu} />
              <Stack.Screen name="Support" component={Support} />
              <Stack.Screen name="Settings" component={Settings} />
              <Stack.Screen name="ChangePassword" component={ChangePassword} />
              <Stack.Screen
                name="NotificationSetting"
                component={NotificationSetting}
              />
              <Stack.Screen name="AboutUs" component={AboutUs} />
            </Stack.Navigator>
          </AuthContext>
        </NavigationContainer>
      </Provider>
    </CartContext>
  );
};

export default App;
