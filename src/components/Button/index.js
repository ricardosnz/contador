import React from 'react';
import './style.css';
import Svg from '../Svg';

const typesClassName = {
  settings: 'pomodoro-app__preferences',
  close: 'pane__close-preferences',
  apply: 'pane__apply-preferences',
};

const Button = ({ type = '', buttonText = '', toggleVisibility }) =>
  Object.keys(typesClassName).includes(type) && (
    <button className={typesClassName[type]} name={type == 'settings' && 'settings'} onClick={toggleVisibility}>
      {type !== 'settings' ? buttonText : <Svg path={type} />}
    </button>
);

export default Button;
