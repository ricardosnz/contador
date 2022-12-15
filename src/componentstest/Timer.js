import React, { useState, useEffect, useReducer } from 'react';

export const TimerContext = React.createContext();

const initialState = { timerMode: 'pomo', setting: false };

const reducer = (state, action) => {
  switch (action.type) {
    case '':
      return;
    case '':
      return;
    default:
      return { ...state };
  }
};

const TimerProvider = ({ children }) => {
  const [settingsVisible, setSettingsVisible] = useState(false);
  const [timerMode, setTimerMode] = useState('pomo'); // options: pomo, short, long
  const [pomoLength, setPomoLength] = useState(25);
  const [shortLength, setShortLength] = useState(3);
  const [longLength, setLongLength] = useState(15);
  const [secondsLeft, setSecondsLeft] = useState(pomoLength * 60);
  const [isActive, setIsActive] = useState(false);
  const [buttonText, setButtonText] = useState('Comenzar');

  useEffect(() => {
    if (isActive) {
      const interval = setInterval(() => {
        setSecondsLeft((secondsLeft) => secondsLeft - 1);
      }, 1000);

      if (secondsLeft === 0) {
        clearInterval(interval);
        setIsActive(false);
        setButtonText('');
      }

      return () => clearInterval(interval);
    }
  }, [isActive, secondsLeft]);

  const toggleSettingsVisibility = (event) => {
    setSettingsVisible(!settingsVisible);
  };

  // let formatSecondsToText = {timeText: "24:52", timeLeft: "24:52"}
  const formatTimeLeft = (seconds) =>
    `${Math.floor(seconds / 60)}:${
      seconds % 60 > 9 ? seconds % 60 : '0' + (seconds % 60)
    }`;

  const typeLength = { pomo: pomoLength, short: shortLength, long: longLength };

  const calcPercentage = () =>
    (secondsLeft / (typeLength[timerMode] * 60)) * 100;

  return (
    <TimerContext.Provider value={{ color: 'red' }}>
      {children}
    </TimerContext.Provider>
  );
};
export default TimerProvider;
