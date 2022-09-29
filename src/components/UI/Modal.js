import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
// ReactDOM is being used for creating a portal. putting the backdrop and overlay above the main root element

import classes from './Modal.module.css';

const Backdrop = (props) => {
  return <div onClick={props.onCloseCart} className={classes.backdrop}></div>;
};

const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const portalElement = document.getElementById('overlays');

const Modal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop onCloseCart={props.onClick} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </Fragment>
  );
};

export default Modal;
