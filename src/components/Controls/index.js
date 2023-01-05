import React from 'react';
import './style.css';

export default function Controls ({ timerMode, timersLength, changeModeTimer }) {
  const handleModeChange = ({ target: { id } }) =>
    changeModeTimer({ timerMode: id });
  const timerKeys = Object.keys(timersLength);
  return (
    <form className="controls">
      {timerKeys.map((timerKey) => {
        const timerName =
          timerKey !== 'pomo' ? `${timerKey} break` : 'pomodoro';
        const isChecked = timerMode === timerKey;
        return (
          <>
            <input type="radio" id={timerKey} checked={isChecked} onChange={handleModeChange}/>
            <label htmlFor={timerKey} className="controls__button">{timerName}</label>
          </>
        );
      })}
    </form>
  );
};

