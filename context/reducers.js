export const ADD_PRODUCT = "ADD_PRODUCT";
export const REMOVE_PRODUCT = "REMOVE_PRODUCT";
export const EMPTY_CART = "EMPTY_CART";
export const REMOVE_IT = "REMOVE_IT";
export const ADD_IT = "ADD_IT";
import * as RootNavigation from "../navigation/rootNavigation";

//add meal to cart ,check if existed will increase the quantity if not add it
const addProductToCart = (product, state) => {
  const updatedCart = [...state.cart];
  const updatedItemIndex = updatedCart.findIndex(
    (item) => item.id === product.id
  );

  if (updatedItemIndex < 0) {
    updatedCart.push({ ...product, quantity: product.quantity });
  } else {
    const updatedItem = {
      ...updatedCart[updatedItemIndex],
    };

    updatedItem.quantity = product.quantity;
    updatedItem.totalPrice = product.totalPrice;
    updatedItem.types = product.types;
    updatedItem.addons = product.addons;
    updatedCart[updatedItemIndex] = updatedItem;
  }
  RootNavigation.navigate("MyCart");
  return { ...state, cart: updatedCart };
};
//it will empty the cart after successfull purchase
const emptyCart = (state) => {
  return { ...state, cart: [] };
};

//remove item from cart
//checks if existed and if there is one it will be removed from cart if theres alot it will
//decrease the quantity and lower the total price

const removeProductFromCart = (product, state) => {
  const updatedCart = [...state.cart];
  const updatedItemIndex = updatedCart.findIndex(
    (item) => item.id === product.id
  );

  const updatedItem = {
    ...updatedCart[updatedItemIndex],
  };
  updatedItem.quantity--;

  if (updatedItem.quantity <= 0) {
    updatedCart.splice(updatedItemIndex, 1);
  } else {
    let TypeSum = 0;
    if (updatedItem.addons.length > 0) {
      updatedItem.addons.map((addon) =>
        updatedItem.price.addons.find((add, i) => {
          if (add.name === addon.name) {
            TypeSum += Number(add.value);
          }
        })
      );
    } else {
      TypeSum = 0;
    }
    let sum =
      updatedItem.price.types.length > 0
        ? updatedItem.price.types[updatedItem.types].value + TypeSum
        : updatedItem.price.defaultPrice.value + TypeSum;
    /**    let finalprice =
      (item.deals.enabled && !item.deals.dailyDealEnable) ||
      (item.deals.enabled &&
        item.deals.dailyDealEnable &&
        today >= new Date(item.deals.fromDate.seconds * 1000) &&
        today < new Date(item.deals.toDate.seconds * 1000))
        ? sum - (sum * item.deals.value) / 100
        : sum; */
    let finalprice =
      (updatedItem.deals.enabled && !updatedItem.deals.dailyDealEnable) ||
      (updatedItem.deals.enabled && updatedItem.deals.dailyDealEnable)
        ? sum - (sum * updatedItem.deals.value) / 100
        : sum;

    updatedItem.totalPrice -= finalprice.toFixed(2);

    updatedCart[updatedItemIndex] = updatedItem;
  }
  return { ...state, cart: updatedCart };
};
const removeProduct = (product, state) => {
  const updatedCart = [...state.cart];
  const updatedItemIndex = updatedCart.findIndex(
    (item) => item.id === product.id
  );
  updatedCart.splice(updatedItemIndex, 1);
  return { ...state, cart: updatedCart };
};
const addProduct = (product, state) => {
  const updatedCart = [...state.cart];
  const updatedItemIndex = updatedCart.findIndex(
    (item) => item.id === product.id
  );

  const updatedItem = {
    ...updatedCart[updatedItemIndex],
  };
  updatedItem.quantity = updatedItem.quantity + 1;
  let TypeSum = 0;
  if (updatedItem.addons.length > 0) {
    updatedItem.addons.map((addon) =>
      updatedItem.price.addons.find((add, i) => {
        if (add.name === addon.name) {
          TypeSum += Number(add.value);
        }
      })
    );
  } else {
    TypeSum = 0;
  }

  let sum =
    updatedItem.price.types.length > 0
      ? updatedItem.price.types[updatedItem.types].value + TypeSum
      : updatedItem.price.defaultPrice.value + TypeSum;
  /**    let finalprice =
      (item.deals.enabled && !item.deals.dailyDealEnable) ||
      (item.deals.enabled &&
        item.deals.dailyDealEnable &&
        today >= new Date(item.deals.fromDate.seconds * 1000) &&
        today < new Date(item.deals.toDate.seconds * 1000))
        ? sum - (sum * item.deals.value) / 100
        : sum; */
  let finalprice =
    (updatedItem.deals.enabled && !updatedItem.deals.dailyDealEnable) ||
    (updatedItem.deals.enabled && updatedItem.deals.dailyDealEnable)
      ? sum - (sum * updatedItem.deals.value) / 100
      : sum;

  updatedItem.totalPrice = +updatedItem.totalPrice + +finalprice.toFixed(2);

  updatedCart[updatedItemIndex] = updatedItem;

  return { ...state, cart: updatedCart };
};
//manage cart actions for the dispatch functions
export const shopReducer = (state, action) => {
  switch (action.type) {
    case ADD_PRODUCT:
      return addProductToCart(action.product, state);
    case REMOVE_PRODUCT:
      return removeProductFromCart(action.product, state);
    case REMOVE_IT:
      return removeProduct(action.product, state);
    case ADD_IT:
      return addProduct(action.product, state);
    case EMPTY_CART:
      return emptyCart(state);
    default:
      return state;
  }
};
