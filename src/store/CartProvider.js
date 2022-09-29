import React from 'react';

import CartContext from './cart-context';

const CartProvider = (props) => {
  const addItemToCartHandler = (item) => {};

  const removeItemToCartHandler = (id) => {};

  const cartContext = {
    items: [],
    totalAmount: 0,
    addItem: addItemToCartHandler,
    removeItem: removeItemToCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
  // this needs .Provider cause this component will PROVIDE any components that its wrapped around with the data/context that it needs with the CartProvider component
  // the value is set to cartContext so that we can access the addItemToCart and removerItemToCart handlers
};

export default CartProvider;
