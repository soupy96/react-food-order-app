import React from 'react';

import classes from './Input.module.css';

// we use React.forwardRef() to use the ref in MealItemForm.js on the input element
const Input = React.forwardRef((props, ref) => {
  return (
    <div className={classes.input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      <input ref={ref} {...props.input} />
      {/* using the spread operator here is taking out all the key value pairs in the input object and putting it as attributes onto the html input. doing this makes it highly configurable anywhere outside of this component */}
    </div>
  );
});

export default Input;
