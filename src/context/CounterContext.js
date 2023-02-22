import React, { createContext, useState, useEffect, useReducer } from 'react';
import { formatTimeLeft, changeStyle } from '../utils';

import reducer, {
  TOGGLE_SETTINGS_VISIBILITY,
  SET_SECONDS_LEFT,
  FINISHED_TIMER,
  CHANGE_TIMER_MODE,
  CHANGE_ACTIVE,
  APPLY_SETTINGS,
} from './reductor';

const initialState = {
  settingsVisible: false,
  timerMode: 'pomo', // options: pomo, short, long
  pomoLength: 25,
  shortLength: 3,
  longLength: 15,
  fontPref: 'kumbh', // options: kumbh, roboto, space
  accentColor: 'default', // options: default, blue, purple
  secondsLeft: 25 * 60,
  isActive: false,
  buttonText: 'Comenzar',
};

export const CounterContext = createContext();

const CounterProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (!state.isActive) return;
    const interval = setInterval(() => {
      dispatch({
        type: SET_SECONDS_LEFT,
        payload: { secondsLeft: state.secondsLeft - 1 },
      });
    }, 1000);

    if (state.secondsLeft === 0) {
      clearInterval(interval);
      dispatch({ type: FINISHED_TIMER });
    }

    return () => clearInterval(interval);
  }, [state.isActive, state.secondsLeft]);

  const timersLength = {
    pomo: state.pomoLength,
    short: state.shortLength,
    long: state.longLength,
  };

  const toggleSettingsVisibility = () => {
    dispatch({ type: TOGGLE_SETTINGS_VISIBILITY });
  };

  const changeTimerMode = ({ timerMode }) => {
    dispatch({ type: CHANGE_TIMER_MODE, payload: { timerMode } });
  };

  const changeActive = () => {
    dispatch({
      type: CHANGE_ACTIVE,
      payload: { timerLeft: formatTimeLeft(state.secondsLeft) },
    });
  };

  const applySettings = ({ values }) => {
    dispatch({ type: APPLY_SETTINGS, payload: { values } });
    changeStyle({ font: values.fontPref, color: values.accentColor });
  };

  const calcPercentage = () =>
    (state.secondsLeft / (state[state.timerMode + 'Length'] * 60)) * 100;

  return (
    <CounterContext.Provider
      value={{
        ...state,
        changeTimerMode,
        percentage: calcPercentage(),
        timeleft: formatTimeLeft(state.secondsLeft),
        changeActive,
        timersLength,
        applySettings,
        toggleSettingsVisibility,
      }}
    >
      {children}
    </CounterContext.Provider>
  );
};
export default CounterProvider;
