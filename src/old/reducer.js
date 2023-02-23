import { useReducer, useEffect } from 'react';

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

const reducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_SETTINGS_VISIBILITY':
      return { ...state, settingsVisible: !state.settingsVisible };
    case 'CHANGE_TIMER_MODE':
      return {
        ...state,
        timerMode: action.payload.timerMode,
        isActive: false,
        buttonText: 'Comenzar',
        secondsLeft: state[action.payload.timerMode + 'Length'] * 60,
      };
    case 'SET_ACTIVE':
      return { ...state, isActive: action.payload.isActive };
    case 'SET_BUTTON_TEXT':
      return { ...state, buttonText: action.payload.buttonText };
    case 'CHANGE_ACTIVE':
      if (action.payload.timeLeft === '0:00') {
        return state;
      }
      const text = ['Comenzar', 'Reanudar'].includes(state.buttonText)
          ? 'Pausa'
          : 'Reanudar';
      return { ...state, isActive: !state.isActive, buttonText: text };
    case 'SET_SECONDS_LEFT':
      return { ...state, secondsLeft: action.payload.secondsLeft };
    case 'APPLY_SETTINGS':
      return {
        ...state,
        ...action.payload.values,
        secondsLeft: state[action.payload.values.timerMode + 'Length'] * 60,
      };
    default:
      return state;
  }
};

export default function useCounter() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (state.isActive) {
      const interval = setInterval(() => {
        dispatch({ type: 'SET_SECONDS_LEFT', payload: { secondsLeft: state.secondsLeft - 1 } })
      }, 1000);

      if (state.secondsLeft === 0) {
        clearInterval(interval);
        dispatch({ type: 'SET_SECONDS_LEFT', payload: { secondsLeft: state.secondsLeft - 1 } })
        setIsActive(false);
        setButtonText('');
      }

      return () => clearInterval(interval);
    }
  }, [isActive, secondsLeft]);

  const toggleSettingsVisibility = () => {
    dispatch({ type: 'TOGGLE_SETTINGS_VISIBILITY' });
  };

  const changeTimerMode = (timerMode) => {
    dispatch({ type: 'CHANGE_TIMER_MODE', payload: { timerMode } });
  };

  const changeActive = (timeLeft) => {
    dispatch({ type: 'CHANGE_ACTIVE', payload: { timeLeft } });
  };

  const applySettings = (values) => {
    dispatch({ type: 'APPLY_SETTINGS', payload: { values } });
  };

  const timeleft = `${Math.floor(state.secondsLeft / 60)}:${
    state.secondsLeft % 60 > 9
      ? state.secondsLeft % 60
      : '0' + (state.secondsLeft % 60)
  }`;

  return {
    ...state,
    changeTimerMode,
    percentage:
      (state.secondsLeft / (state[state.timerMode + 'Length'] * 60)) * 100,
    timeleft,
    changeActive,
    applySettings,
    toggleSettingsVisibility,
  };
}
