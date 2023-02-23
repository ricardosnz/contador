import { useState, useEffect, useCallback } from 'react';
import { changeStyle, formatTimeLeft } from '../utils';


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


export default function useCounter() {
  const [state, setState] = useState(initialState)

  useEffect(() => {
    if (!state.isActive) return
    const interval = setInterval(() => {
      setState(prevState => ({...prevState, secondsLeft: prevState.secondsLeft - 1}))
    }, 1000);

    if (state.secondsLeft === 0) {
      clearInterval(interval);
      setState(prevState => ({...prevState, isActive: false, buttonText: ''}))
    }

    return () => clearInterval(interval);
  }, [state.isActive, state.secondsLeft]);

  const relog = useCallback(() => {
    
  },[])

  const toggleSettingsVisibility = () => {
    setState(prevState => ({...prevState, settingsVisible:!prevState.settingsVisible}))
  };
  
  const changeActive = () => {
    if (formatTimeLeft(state.secondsLeft) === '0:00') return null;
    
    const text = ['Comenzar', 'Reanudar'].includes(state.buttonText)
    ? 'Pausa'
    : 'Reanudar';
    
    setState(prevState => ({...prevState, isActive:!prevState.isActive, buttonText: text}))
  };
  const timersLength = {
    pomo: state.pomoLength,
    short: state.shortLength,
    long: state.longLength, 
  };

  const applySettings = ({ values }) => {    
    setState(prevState => ({...prevState, ...values, secondsLeft: timersLength[state.timerMode] * 60}))
    changeStyle({ font: values.fontPref, color: values.accentColor });
  };
  
  
  const changeTimerMode = ({ timerMode }) => {
    setState(prevState => ({...prevState, timerMode, isActive: false, buttonText: 'Comenzar', secondsLeft: timersLength[timerMode] * 60}))
  };

  const calcPercentage = () =>
    (state.secondsLeft / (timersLength[state.timerMode] * 60)) * 100;


  return {
    ...state,
    changeTimerMode,
    percentage: calcPercentage(),
    timeleft: formatTimeLeft(state.secondsLeft),
    changeActive,
    timersLength,
    applySettings,
    toggleSettingsVisibility,
  };
}
