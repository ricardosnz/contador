import {
  TOGGLE_SETTINGS_VISIBILITY,
  SET_SECONDS_LEFT,
  FINISHED_TIMER,
  CHANGE_TIMER_MODE,
  CHANGE_ACTIVE,
  APPLY_SETTINGS,
} from './types';

export const initialState = {
  settingsVisible: false,
  timerMode: 'pomo',
  pomoLength: 25,
  shortLength: 3,
  longLength: 15,
  fontPref: 'kumbh',
  accentColor: 'default',
  secondsLeft: 25 * 60,
  isActive: false,
  buttonText: 'Comenzar',
};

const reducer = (state, action) => {
  switch (action.type) {
    case TOGGLE_SETTINGS_VISIBILITY:
      return { ...state, settingsVisible: !state.settingsVisible };
    case SET_SECONDS_LEFT:
      return { ...state, secondsLeft: action.payload.secondsLeft };
    case FINISHED_TIMER:
      return { ...state, isActive: false, buttonText: '' };
    case CHANGE_TIMER_MODE:
      return {
        ...state,
        timerMode: action.payload.timerMode,
        isActive: false,
        buttonText: 'Comenzar',
        secondsLeft: state[action.payload.timerMode + 'Length'] * 60,
      };
    case CHANGE_ACTIVE:
      if (action.payload.timeLeft === '0:00') {
        return state;
      }
      const text = ['Comenzar', 'Reanudar'].includes(state.buttonText)
        ? 'Pausa'
        : 'Reanudar';
      return { ...state, isActive: !state.isActive, buttonText: text };
    case APPLY_SETTINGS:
      return {
        ...state,
        ...action.payload.values,
        secondsLeft: action.payload.values.timerLength * 60,
      };
    default:
      return state;
  }
};

export default reducer;
