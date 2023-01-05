import React, { useState, useEffect, useReducer } from 'react';

export const TimerContext = React.createContext();

const initialState = {
  timerMode: 'pomo',
  fontPref: 'kumbh',
  accentColor: 'default',
  settingsVisible: false,
  isActive: false,
  pomoLength: 25,
  shortLength: 3,
  longLength: 15,
  secondsLeft: 1500,
  buttonText: 'comenzar',
};

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
  const [state, setState] = useState(initialState);

  const { timerMode, fontPref, accentColor, settingsVisible, isActive, pomoLength, shortLength, longLength, secondsLeft } = state;

  useEffect(() => {
    if (isActive) {
      const interval = setInterval(
        () => setSecondsLeft((secondsLeft) => secondsLeft - 1),
        1000
      );
      if (secondsLeft === 0) {
        clearInterval(interval);
        setState((prevState) => ({
          ...prevState,
          isActive: false,
          buttonText: '',
        }));
      }
      return () => clearInterval(interval);
    }
  }, [isActive, secondsLeft]);

  const toggleSettingsVisibility = () =>
    setState((prevState) => ({
      ...prevState,
      settingsVisible: !settingsVisible,
    }));

  // let formatSecondsToText = {timeText: "24:52", timeLeft: "24:52"}
  const formatTimeLeft = (seconds) =>
    `${Math.floor(seconds / 60)}:${
      seconds % 60 > 9 ? seconds % 60 : '0' + (seconds % 60)
    }`;

  const typeLength = { pomo: pomoLength, short: shortLength, long: longLength };

  const calcPercentage = () =>
    (secondsLeft / (typeLength[timerMode] * 60)) * 100;

  const applySettings = ({ values }) => {
    setState((prevState) => ({ ...prevState, ...values }));
    changeStyle({ fonts: fontPref, colors: accentColor });
    setSecondsLeft(typeLength[timerMode] * 60);
  };

  const changeMode = (timerMode) => {
    setState(prevState => ({...prevState, timerMode, isActive: false, buttonText: 'comenzar' }))
    setSecondsLeft(typeLength[timerMode]*60);
  }

  return (
    <TimerContext.Provider value={{ applySettings, toggleSettingsVisibility, calcPercentage, formatTimeLeft, typeLength, ...state }}>
      {children}
    </TimerContext.Provider>
  );
};
export default TimerProvider;
