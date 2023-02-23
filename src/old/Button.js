import React from 'react';
import './style.css';
import Svg from '../components/Svg';

import useCounter from '../hooks/useCounter';

const className = {
  settings: 'pomodoro-app__preferences',
  close: 'pane__close-preferences',
  apply: 'pane__apply-preferences',
};

export default function Button({ type = '', buttonText = '' }) {
  const { toggleSettingsVisibility } = useCounter();

  const isButton = Object.keys(className).includes(type);
  if (isButton) {
    const content = type !== 'settings' ? buttonText : <Svg path={type} />;
    return (
      <button
        className={className[type]}
        name={type === 'settings' && 'settings'}
        onClick={toggleSettingsVisibility}
      >
        {content}
      </button>
    );
  }
}
