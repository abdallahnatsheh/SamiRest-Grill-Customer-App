import React from "react";
//main context for the menu and cart
export default React.createContext({
  products: [],
  cart: [],
  addProductToCart: (product) => {},
  removeProductFromCart: (productId) => {},
  removeProduct: (productId) => {},
  addProduct: (productId) => {},
  emptyCart: () => {},
});
