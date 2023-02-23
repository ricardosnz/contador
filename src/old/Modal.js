import ReactDOM, { useState, useEfect, useReducer } from 'react';

const Modal = () => {};

const PortalModal = () => {
  return <Modal />;
};

React.createPortal(<PortalModal />, document.getElementById('modal'));
