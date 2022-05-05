import React, { useEffect, useReducer } from "react";

import ShopContext from "./shop-context";
import {
  shopReducer,
  ADD_PRODUCT,
  REMOVE_PRODUCT,
  REMOVE_IT,
  ADD_IT,
  EMPTY_CART,
} from "./reducers";
//import { useGetMainMenuMeals } from "../Components/firebase/mainMenuHooks/mainMenuHook";
import useLocalStorage from "../Hooks/useLocalStorage";
import { useGetMainMenuMeals } from "../Hooks/mainMenuHook";
//fix cart list to be  saved in cookies for future use , without it will be alot of bugs
function fixList(list) {
  let temp = [];
  list.map((item) => temp.push({ ...item.data(), quantity: 0, id: item.id }));
  return temp;
}
let menuList = [];

const CartContext = (props) => {
  //get menu list from firestore
  const [menuItemsData] = useGetMainMenuMeals();

  if (menuItemsData.length !== 0) {
    //fix the list into array with id and quantity because firebase uses item.id
    //to get it so this fix make it easy to search the cart and count the quantity
    menuList = fixList(menuItemsData);
  }
  const products = menuList;
  //initialize cart storage cookie
  const [storageCart, setStorageCart] = useLocalStorage("@cart", []);
  const [cartState, dispatch] = useReducer(shopReducer, {
    cart: storageCart.cart ? storageCart.cart : storageCart,
  });
  //check if the cart change and update it
  useEffect(() => {
    if (cartState && cartState !== null) {
      setStorageCart(cartState);
    }
  }, [cartState]);
  //cart functions dispatch
  //takes the product that wanted to be worked with and send it to dispatch function
  const addProductToCart = (product) => {
    dispatch({ type: ADD_PRODUCT, product: product });
  };

  const removeProductFromCart = (product) => {
    dispatch({ type: REMOVE_PRODUCT, product: product });
  };
  const removeProduct = (product) => {
    dispatch({ type: REMOVE_IT, product: product });
  };
  const addProduct = (product) => {
    dispatch({ type: ADD_IT, product: product });
  };
  const emptyCart = () => {
    dispatch({ type: EMPTY_CART });
  };

  return (
    <ShopContext.Provider
      value={{
        products: products,
        cart: cartState.cart,
        addProductToCart: addProductToCart,
        removeProductFromCart: removeProductFromCart,
        removeProduct: removeProduct,
        addProduct: addProduct,
        emptyCart: emptyCart,
      }}
    >
      {props.children}
    </ShopContext.Provider>
  );
};

export default CartContext;
