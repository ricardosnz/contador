import React from 'react';
import './style.css';

export default function Controls ({ timerMode, changeModeTimer }) {
  const handleModeChange = ({ target: { id } }) => changeModeTimer({ timerMode: id });
  return (
    <form className="controls">
      <input type="radio" id="pomo" checked={"pomo" === timerMode} onChange={handleModeChange}/>
      <label htmlFor="pomo" className="controls__button">pomodoro</label>
      <input type="radio" id="short" checked={"short" === timerMode} onChange={handleModeChange}/>
      <label htmlFor="short" className="controls__button">short break</label>
      <input type="radio" id="long" checked={"long" === timerMode} onChange={handleModeChange}/>
      <label htmlFor="long" className="controls__button">long break</label>
    </form>
  );
};

