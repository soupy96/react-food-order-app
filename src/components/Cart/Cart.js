import React from 'react';

import Modal from '../UI/Modal';

import classes from './Cart.module.css';

const Cart = (props) => {
  const cartItems = (
    <ul className={classes['cart-items']}>
      {[{ id: 'c1', name: 'sushi', amount: 2, price: 12.99, key: '123' }].map(
        (item) => (
          <li key={item.key}>{item.name}</li>
        )
      )}
    </ul>
  );

  return (
    <Modal onClick={props.onCloseCart}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>35.62</span>
      </div>
      <div className={classes.actions}>
        <button onClick={props.onCloseCart} className={classes['button--alt']}>
          Close
        </button>
        <button className={classes.button}>Order</button>
      </div>
    </Modal>
  );
};

export default Cart;
