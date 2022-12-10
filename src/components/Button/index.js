import React from 'react';
import './style.css';
import Svg from '../Svg';
import { setting } from '../../utils';

const typesClass = { settings: 'pomodoro-app__preferences', close: 'pane__close-preferences', apply: 'pane__apply-preferences' };

const Button = ({ type = '', buttonText = '', toggleVisibility }) => Object.keys(typesClass).includes(type) && <div className={'pane__apply-row'}>
    <button
    className={typesClass[type]}
    name={type == 'settings' && 'settings'}
    onClick={toggleVisibility}
    >
    {type !== 'settings' ? buttonText : <Svg pathD={setting} />}
  </button>
</div>

export default Button;