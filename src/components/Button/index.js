import React from 'react';
import './style.css';
import useCounter from '../../hooks/useCounter';
import Svg from '../Svg';

const className = {
  settings: 'pomodoro-app__preferences',
  close: 'pane__close-preferences',
  apply: 'pane__apply-preferences',
};

export default function Button({ type = '', buttonText = '' }) {
  const { toggleSettingsVisibility } = useCounter();

  const notButton = !Object.keys(className).includes(type);
  if (notButton) return null;

  const selectContent = type !== 'settings' ? buttonText : <Svg path={type} />;

  return (
    <button
      className={className[type]}
      name={type === 'settings' && 'settings'}
      onClick={toggleSettingsVisibility}
    >
      {selectContent}
    </button>
  );
}
