import React, { createContext, useEffect, useReducer } from 'react';
import { formatTimeLeft, changeStyle } from '../utils';

import reducerCounter, { initialState } from '../reducer';
import {
  TOGGLE_SETTINGS_VISIBILITY,
  SET_SECONDS_LEFT,
  FINISHED_TIMER,
  CHANGE_TIMER_MODE,
  CHANGE_ACTIVE,
  APPLY_SETTINGS,
} from '../reducer/types';


export const CounterContext = createContext();

const CounterProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducerCounter, initialState);

  useEffect(() => {
    if (!state.isActive) return;
    const interval = setInterval(() => {
      dispatch({ type: SET_SECONDS_LEFT,payload: { secondsLeft: state.secondsLeft - 1 } });
    }, 1000);

    if (state.secondsLeft === 0) {
      clearInterval(interval);
      dispatch({ type: FINISHED_TIMER });
    }

    return () => clearInterval(interval);
  }, [state.isActive, state.secondsLeft]);

  const toggleSettingsVisibility = () => {
    dispatch({ type: TOGGLE_SETTINGS_VISIBILITY });
  };

  const changeTimerMode = ({ timerMode }) => {
    dispatch({ type: CHANGE_TIMER_MODE, payload: { timerMode } });
  };

  const changeActive = (timerLeft) => {
    dispatch({ type: CHANGE_ACTIVE, payload: { timerLeft } });
  };

  const applySettings = ({ values }) => {
    dispatch({ type: APPLY_SETTINGS, payload: { values } });
    changeStyle({ font: values.fontPref, color: values.accentColor });
  };

  const calcPercentage = () => (state.secondsLeft / (state[state.timerMode + 'Length'] * 60)) * 100;

  return (
    <CounterContext.Provider
      value={{
        ...state,
        changeTimerMode,
        percentage: calcPercentage(),
        timeLeft: formatTimeLeft(state.secondsLeft),
        changeActive,
        applySettings,
        toggleSettingsVisibility,
      }}
    >
      {children}
    </CounterContext.Provider>
  );
};
export default CounterProvider;
