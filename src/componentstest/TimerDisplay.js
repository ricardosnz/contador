import React from 'react';
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './style.css';

const TimerDisplay = ({
  timerMode,
  percentage,
  timeLeft,
  setIsActive,
  buttonText,
  setButtonText,
  changeActive
}) => {
  
  const handleClick = () => {
    if (timeLeft === '0:00') return null

    setIsActive(prev => !prev);
    setButtonText(buttonText === 'Comenzar' || buttonText === 'Reanudar' ? 'Pausa' : 'Reanudar');
  };

  

  let timesUpMsg =
    timerMode === 'pomo' ? 'Tiempo de descanso' : 'Volver al trabajo!';

  let timeText = timeLeft === '0:00' ? timesUpMsg : timeLeft;

  let textSize = timeLeft === '0:00' ? '12px' : '28px';

  return (
    <div className="timer" onClick={changeActive}>
      <div className="timer__display">
      <CircularProgressbarWithChildren
          value={percentage}
          text={timeText}
          strokeWidth={3}
          styles={buildStyles({
            // How long animation takes to go from one percentage to another, in seconds
            pathTransitionDuration: 0.5,
            // Colors & Fonts
            pathColor: 'var(--accent-color)',
            textColor: 'var(--text)',
            textSize: textSize,
            fontFamily: 'var(--font-current)',
            trailColor: 'none',
          })}
        >
          <button className="display__start-pause">{buttonText}</button>
        </CircularProgressbarWithChildren>
      </div>
    </div>
  );
};

export default TimerDisplay;
