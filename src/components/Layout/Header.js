import React, { Fragment } from 'react';

import HeaderCardButton from './HeaderCartButton';

import classes from './Header.module.css';

import mealsImage from '../../assets/meals.jpg';

const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>ReactMeals</h1>
        <HeaderCardButton onClick={props.onShowCart} />
      </header>
      <div className={classes['main-image']}>
        <img src={mealsImage} alt='A table of delicous food!' />
      </div>
    </Fragment>
  );
};

export default Header;
