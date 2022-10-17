import React, { useReducer } from 'react';

import CartContext from './cart-context';

// this is the inital cart state when the page is loaded
const defaultCartState = {
  items: [],
  totalAmount: 0,
};

// this is outside the main component function cause it doesnt need anything from the CartProvider component and it wont be recreated every time the CartProvider component is reevaludated
const cartReducer = (state, action) => {
  if (action.type === 'ADD_ITEM') {
    // concat() adds the item to the array but doesnt edit the existing array but returns a new array
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    // looking through our current state for the item we are adding to the cart to see if its already there or not
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    // if it is there add it to this variable
    const existingCartItem = state.items[existingCartItemIndex];
    let updatedItems;

    // if that item already exists do this code
    if (existingCartItem) {
      // copy everything over for that existing item but change just the amount
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      // copy the OG state array so we dont change the OG array
      updatedItems = [...state.items];
      // then update we add the new items to the cart ontop of the already existing items
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      // if the item is added for the first time to the cart
      updatedItems = state.items.concat(action.item);
    }

    // updating the state with the new information when we added a new item to the cart
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  if (action.type === 'REMOVE_ITEM') {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingItem = state.items[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existingItem.price;
    let updatedItems;
    if (existingItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === 'CLEAR') {
    return defaultCartState;
  }

  return defaultCartState;
};

const CartProvider = (props) => {
  // the first element in this array is the state snapshot
  // the second element in this array is a function which allows us to dispatch an action to this reducer
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    // gives the reducer a certain action that we set and then in the reducer, do something on that specifc action
    // we pass in item which is a param in the addItemToCartHandler to forward it to the reducer
    dispatchCartAction({ type: 'ADD_ITEM', item: item });
  };

  const removeItemToCartHandler = (id) => {
    dispatchCartAction({ type: 'REMOVE_ITEM', id: id });
  };

  const clearCartHandler = () => {
    dispatchCartAction({ type: 'CLEAR' });
  };

  const cartContext = {
    // cause we're managing the carts overall state, which items are in the cart and the total amount of those items in the cart
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemToCartHandler,
    clearCart: clearCartHandler,
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
