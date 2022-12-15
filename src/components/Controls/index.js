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
}) => {
  const secondsLen = {pomo: pomoLength * 60,short: shortLength * 60,long: longLength * 60};

  const handleModeChange = ({ target: {id} }) => {
    setTimerMode(id);
    setIsActive(false);
    setButtonText('Comenzar');
    setSecondsLeft(secondsLen[id]);
  };

  return (
    <form className="controls">
      {Object.keys(secondsLen).map((timer) => (
        <>
          <input type="radio" id={timer} checked={timerMode === timer} onChange={handleModeChange} />
          <label htmlFor={timer} className="controls__button">
            {timer !== 'pomo' ? `${timer} break` : 'pomodoro'}
          </label>
        </>
      ))}
    </form>
  );
};

export default Controls;
