import React from 'react';
import './style.css';
const Controls = ({timerMode,setTimerMode,setSecondsLeft,pomoLength,shortLength,longLength,setIsActive,setButtonText}) => {
  const secondsLen = {short: shortLength * 60,long: longLength * 60,pomo: pomoLength * 60};

  const handleModeChange = ({ target }) => {
    setTimerMode(target.id);
    setIsActive(false);
    setButtonText('Comenzar');
    // console.log(target)

    setSecondsLeft(secondsLen[target.id]);
  }; 

  return (
    <form className="controls">
      <input type="radio" id="pomo" checked={timerMode === 'pomo'} onChange={handleModeChange} />
      <label htmlFor="pomo" className="controls__button">pomodoro</label>

      <input type="radio" id="short" checked={timerMode === 'short'} onChange={handleModeChange} />
      <label htmlFor="short" className="controls__button">short break</label>

      <input type="radio" id="long" checked={timerMode === 'long'} onChange={handleModeChange} />
      <label htmlFor="long" className="controls__button">long break</label>
    </form>
  );
};

export default Controls;
