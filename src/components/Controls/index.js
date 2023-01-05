import React from 'react';
import './style.css';
const Controls = ({
  timerMode,
  setTimerMode,
  setSecondsLeft,
  pomoLength,
  shortLength,
  longLength,
  setIsActive,
  setButtonText,

  typeLength,
  changeModeTimer,
}) => {
  const handleModeChange = ({ target: { id } }) =>
    changeModeTimer({ timerMode: id });

  // setTimerMode(id);
  // setIsActive(false);
  // setButtonText('Comenzar');
  // setSecondsLeft(typeLength[id] * 60);
  const timerKeys = Object.keys(typeLength);
  return (
    <form className="controls">
      {timerKeys.map((timerKey) => {
        const timerName =
          timerKey !== 'pomo' ? `${timerKey} break` : 'pomodoro';
        const isChecked = timerMode === timerKey;
        return (
          <>
            <input type="radio" id={timerKey} checked={isChecked} onChange={handleModeChange}
            />
            <label htmlFor={timerKey} className="controls__button">
              {timerName}
            </label>
          </>
        );
      })}
    </form>
  );
};

export default Controls;
