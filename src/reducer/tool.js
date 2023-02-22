import {createSlice} from '@reduxjs/toolkit'

import {initialState} from './index'

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers:{
    toggleSettingsVisibility: (state, action) => {
      state.settingsVisible = !state.settingsVisible
    },
    setSecondsLeft: (state, {type, payload}) => {
      state.secondsLeft = payload.secondsLeft
    },
    finishedTimer: (state, action) => {
      state.isActive = false
      state.buttonText = ''
    },
    changeTimerMode: (state, {type, payload}) => {
      state.timerMode = payload.timerMode
      state.isActive = false
      state.buttonText = 'Comenzar'
      state.secondsLeft = state[payload.timerMode + 'Length'] * 60
    },
    changeActive: (state, {type, payload}) => {
      if (payload.timeLeft === '0:00') {
        return state;
      }
      const text = ['Comenzar', 'Reanudar'].includes(state.buttonText) ? 'Pausa' : 'Reanudar';
      state.isActive = !state.isActive
      state.buttonText = text
    },
    applySettings: (state, {type, payload}) => {
      const secondsLeft = payload.values.timerLength * 60
      state = {...state, ...payload.values, secondsLeft}
    }
  }
})

export const {toggleSettingsVisibility, setSecondsLeft, finishedTimer, changeTimerMode, changeActive, applySettings} = counterSlice.actions
export default counterSlice.reducer