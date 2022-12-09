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
  const handleModeChange = (event) => {
    setTimerMode(event.target.id);
    setIsActive(false);
    setButtonText('Comenzar');

    if (event.target.id == 'short') setSecondsLeft(shortLength * 60);
    else if (event.target.id == 'long') setSecondsLeft(longLength * 60);
    else setSecondsLeft(pomoLength * 60);
  };

  return (
    <form className="controls">
      <input
        type="radio"
        id="pomo"
        name="mode"
        checked={timerMode === 'pomo'}
        onChange={handleModeChange}
      />
      <label htmlFor="pomo" className="controls__button">
        pomodoro
      </label>

      <input
        type="radio"
        id="short"
        name="mode"
        checked={timerMode === 'short'}
        onChange={handleModeChange}
      />
      <label htmlFor="short" className="controls__button">
        short break
      </label>

      <input
        type="radio"
        id="long"
        name="mode"
        checked={timerMode === 'long'}
        onChange={handleModeChange}
      />
      <label htmlFor="long" className="controls__button">
        long break
      </label>
    </form>
  );
};

export default Controls;
