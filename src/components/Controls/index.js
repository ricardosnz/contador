import React from 'react';
import './style.css';
const Controls = ({
  timeMode,
  setTimeMode,
  setSecondsLeft,
  pomoLength,
  shortLength,
  longLength,
  setIsActive,
  setButtonText,
}) => {
  const handleModeChange = (event) => {
    setTimeMode(event.target.id);
    setIsActive(false);
    setButtonText('Comenzar');

    if (event.target.id == 'short') setSecondsLeft(shortLength * 60);
    else if (event.target.id == 'long') setSecondsLeft(longLength * 60);
    else setSecondsLeft(pomoLength * 60);
  };
  console.log(timeMode);

  return (
    <form className="controls">
      <input
        type="radio"
        id="pomo"
        checked={timeMode === 'pomo'}
        onChange={handleModeChange}
      />
      <label htmlFor="pomo" className="controls__button">
        Pomodoro
      </label>

      <input
        type="radio"
        id="short"
        checked={timeMode === 'short'}
        onChange={handleModeChange}
      />
      <label htmlFor="short" className="controls__button">
        Descanso corto
      </label>

      <input
        type="radio"
        id="long"
        checked={timeMode === 'long'}
        onChange={handleModeChange}
      />
      <label htmlFor="long" className="controls__button">
        Descanso largo
      </label>
    </form>
  );
};

export default Controls;
