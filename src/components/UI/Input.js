import React from 'react';

import classes from './Input.module.css';

const Input = (props) => {
  return (
    <div className={classes.input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      <input {...props.input} />
      {/* using the spread operator here is taking out all the key value pairs in the input object and putting it as attributes onto the html input. doing this makes it highly configurable anywhere outside of this component */}
    </div>
  );
};

export default Input;
