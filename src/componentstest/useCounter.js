import { useState, useEffect } from 'react';
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
  // const [state, setState] = useState(initialState)
  const [settingsVisible, setSettingsVisible] = useState(false);
  const [timerMode, setTimerMode] = useState('pomo'); // options: pomo, short, long
  const [pomoLength, setPomoLength] = useState(25);
  const [shortLength, setShortLength] = useState(3);
  const [longLength, setLongLength] = useState(15);
  const [fontPref, setFontPref] = useState('kumbh'); // options: kumbh, roboto, space
  const [accentColor, setAccentColor] = useState('default'); // options: default, blue, purple
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

  const toggleSettingsVisibility = () => {
    setSettingsVisible(!settingsVisible);
  };

  const changeActive = () => {
    if (formatTimeLeft(secondsLeft) === '0:00') return null;

    const text = ['Comenzar', 'Reanudar'].includes(buttonText)
      ? 'Pausa'
      : 'Reanudar';
    setIsActive(!isActive);
    setButtonText(text);
  };

  const applySettings = ({ values }) => {
    const { pomoLength, shortLength, longLength, fontPref, accentColor } =
      values;
    setPomoLength(pomoLength);
    setShortLength(shortLength);
    setLongLength(longLength);
    setFontPref(fontPref);
    setAccentColor(accentColor);
    setSecondsLeft(timersLength[timerMode] * 60);
    changeStyle({ font: fontPref, color: accentColor });
  };

  const timersLength = {
    pomo: pomoLength,
    short: shortLength,
    long: longLength,
  };

  const changeTimerMode = ({ timerMode }) => {
    setTimerMode(timerMode);
    setIsActive(false);
    setButtonText('Comenzar');
    setSecondsLeft(timersLength[timerMode] * 60);
  };

  const calcPercentage = () =>
    (secondsLeft / (timersLength[timerMode] * 60)) * 100;


  return {
    timerMode,
    changeTimerMode,
    percentage: calcPercentage(),
    timeleft: formatTimeLeft(secondsLeft),
    isActive,
    setIsActive,
    buttonText,
    setButtonText,
    changeActive,
    settingsVisible,
    fontPref,
    accentColor,
    timersLength,
    applySettings,
    toggleSettingsVisibility,
  };
}
