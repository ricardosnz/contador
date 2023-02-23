import { createSlice } from '@reduxjs/toolkit';

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

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    toggleSettingsVisibility: (state) => {
      state.settingsVisible = !state.settingsVisible;
    },
    setSecondsLeft: (state, { payload }) => {
      state.secondsLeft = payload.secondsLeft;
    },
    finishedTimer: (state) => {
      state = { ...state, isActive: false, buttonText: '' };
    },
    changeTimerMode: (state, { payload }) => {
      state.timerMode = payload.timerMode;
      state.isActive = false;
      state.buttonText = 'Comenzar';
      state.secondsLeft = state[payload.timerMode + 'Length'] * 60;
    },
    changeActive: (state, { payload }) => {
      if (payload.timeLeft === '0:00') return state;

      const text = ['Comenzar', 'Reanudar'].includes(state.buttonText)
        ? 'Pausa'
        : 'Reanudar';
      state = {...state, isActive: !state.isActive, buttonText: text }
    },
    applySettings: (state, { payload }) => {
      const secondsLeft = payload.values.timerLength * 60;
      console.log(state)
      state = { ...state, ...payload.values, secondsLeft };
      console.log(state)
    },
  },
});

export const {
  toggleSettingsVisibility,
  setSecondsLeft,
  finishedTimer,
  changeTimerMode,
  changeActive,
  applySettings,
} = counterSlice.actions;
export default counterSlice.reducer;
