import React, { useRef, useState } from 'react';

import classes from './Checkout.module.css';

const isEmpty = (value) => value.trim() === '';
const isSixChars = (value) => value.trim().length === 6;

const Checkout = (props) => {
  const [formInputsValid, setFormInputsValid] = useState({
    name: true,
    address: true,
    postal: true,
    city: true,
  });

  const nameInputRef = useRef();
  const addressInputRef = useRef();
  const postalInputRef = useRef();
  const cityInputRef = useRef();

  const confirmHandler = (e) => {
    e.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredAddress = addressInputRef.current.value;
    const enteredPostal = postalInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredAddressIsValid = !isEmpty(enteredAddress);
    const enteredPostalIsValid = isSixChars(enteredPostal);
    const enteredCityIsValid = !isEmpty(enteredCity);

    setFormInputsValid({
      name: enteredNameIsValid,
      address: enteredAddressIsValid,
      postal: enteredPostalIsValid,
      city: enteredCityIsValid,
    });

    const formIsValid =
      enteredNameIsValid &&
      enteredAddressIsValid &&
      enteredPostalIsValid &&
      enteredCityIsValid;

    if (!formIsValid) {
      return;
    }

    // submit the data
  };

  const nameControlClasses = `${classes.control} ${
    formInputsValid.name ? '' : classes.invalid
  }`;
  const addressControlClasses = `${classes.control} ${
    formInputsValid.address ? '' : classes.invalid
  }`;
  const postalControlClasses = `${classes.control} ${
    formInputsValid.postal ? '' : classes.invalid
  }`;
  const cityControlClasses = `${classes.control} ${
    formInputsValid.city ? '' : classes.invalid
  }`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={nameInputRef} />
        {!formInputsValid.name && <p>Please enter a valid Name</p>}
      </div>
      <div className={addressControlClasses}>
        <label htmlFor='address'>Street Address</label>
        <input type='text' id='address' ref={addressInputRef} />
        {!formInputsValid.address && <p>Please enter a valid Address</p>}
      </div>
      <div className={postalControlClasses}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' ref={postalInputRef} />
        {!formInputsValid.postal && (
          <p>Please enter a valid Postal Code (6 characters long)</p>
        )}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref={cityInputRef} />
        {!formInputsValid.city && <p>Please enter a valid City</p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
