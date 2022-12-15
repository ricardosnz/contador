import React from 'react';
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './style.css';
const TimerDisplay = ({ timerMode, percentage, timeLeft, isActive, setIsActive, buttonText, setButtonText }) => {
  const handleClick = () => {
    if (timeLeft === '0:00') {
      return null;
    }
    setIsActive(active => !active);
    setButtonText(['Comenzar', 'Reanudar'].includes(buttonText) ? 'Pausa' : 'Reanudar')
  };
 
  let timesUpMsg = timerMode === 'pomo' ? 'Tiempo de descanso' : 'Volver al trabajo!';

  let timeText = timeLeft === '0:00' ? timesUpMsg : timeLeft;

  let textSize = timeLeft === '0:00' ? '12px' : '28px';
  return (
    <div className="timer" onClick={handleClick}>
      <div className="timer__display">
        <CircularProgressbarWithChildren
          value={percentage}
          text={timeText}
          strokeWidth={3}
          backgroundPadding
          counterClockwise
          styles={buildStyles({
            pathTransitionDuration: 0.5,
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
