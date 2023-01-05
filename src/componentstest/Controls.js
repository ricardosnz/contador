import React from 'react';
import './style.css';
const Controls = () => {

  const handleSubmit = () => {
    evt.preventDefault()
    changeMode({timerMode: evt.target.id})
  }

  const changeMode = (timerMode) => {
    // setState(prevState => ({...prevState, timerMode, isActive: false, buttonText: 'comenzar' }))
    setTimerMode(timerMode)
    setIsActive(false)
    setButtonText('comenzar')
    setSecondsLeft(typeLength[timerMode]*60);
  }
  const handleModeChange = (evt) => {
    evt.preventDefault()
    setTimeMode(evt.target.id);
    setIsActive(false);
    setButtonText('Comenzar');
    setSecondsLeft(typeLength[evt.submitter.id] * 60)
  };
  return (
    <form className="controls" onSubmit={handleSubmit}>
      <button type='submit' id='short' className='controls__button'>Descanso corto</button>
      <button type='submit' id='pomo' className='controls__button'>Pomodoro</button>
      <button type='submit' id='long' className='controls__button'>Descaso largo</button>
    </form>
  );
};

export default Controls;
