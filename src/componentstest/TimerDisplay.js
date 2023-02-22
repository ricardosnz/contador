import React from 'react';
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './style.css';

import useCounter from '../hooks/useCounter';

const TimerDisplay = () => {
  const { timerMode, percentage, timeLeft, buttonText, changeActive } =
    useCounter();
  let timesUpMsg =
    timerMode === 'pomo' ? 'Tiempo de descanso' : 'Volver al trabajo!';

  let timeText = timeLeft === '0:00' ? timesUpMsg : timeLeft;

  let textSize = timeLeft === '0:00' ? '12px' : '28px';

  return (
    <div className="timer" onClick={() => changeActive(timeLeft)}>
      <div className="timer__display">
        <CircularProgressbarWithChildren
          value={percentage}
          text={timeText}
          strokeWidth={3}
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
