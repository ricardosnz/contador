import React from 'react';
import './App.css';
import Header from './components/Header';
import Controls from './components/Controls';
import TimerDisplay from './components/TimerDisplay';
import Button from './components/Button';
import Settings from './componentstest/Settings';
import { useState, useEffect } from 'react';

const colors = { default: '#F87070', blue: '#70F3F8', purple: '#D881F8' };

const fonts = {
  kumbh: `'Kumbh Sans', sans-serif`,
  roboto: `'Roboto Slab', serif`,
  space: `'Space Mono', monospace`,
};

function App() {
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

  const toggleSettingsVisibility = (event) => {
    setSettingsVisible(!settingsVisible);
  };

  // let formatSecondsToText = {timeText: "24:52", timeLeft: "24:52"}
  const formatTimeLeft = (seconds) =>
    `${Math.floor(seconds / 60)}:${
      seconds % 60 > 9 ? seconds % 60 : '0' + (seconds % 60)
    }`;

  const typeLength = { pomo: pomoLength, short: shortLength, long: longLength };

  const applySettings = ({ values }) => {
    const {
      pomoLength,
      shortLength,
      longLength,
      fontPref,
      accentColor,
      secondsLeft,
    } = values;
    setPomoLength(pomoLength);
    setShortLength(shortLength);
    setLongLength(longLength);
    setFontPref(fontPref);
    setAccentColor(accentColor);
    setSecondsLeft(secondsLeft);
    changeStyle({ font: fontPref, color: accentColor });
  };

  const calcPercentage = () =>
    (secondsLeft / (typeLength[timerMode] * 60)) * 100;

  const changeTimerMode = ({ timerMode }) => {
    // controls.js
    setTimerMode(timerMode);
    setIsActive(false);
    setButtonText('Comenzar');
    setSecondsLeft(typeLength[timerMode] * 60);
  };

  return (
    <div className="pomodoro-app">
      <Header>Pomodoro</Header>
      <Controls
        timerMode={timerMode}
        setTimerMode={setTimerMode}
        setSecondsLeft={setSecondsLeft}
        setIsActive={setIsActive}
        buttonText={buttonText}
        setButtonText={setButtonText}
        typeLength={typeLength}
        changeModeTimer={changeTimerMode}
      />
      <TimerDisplay
        timerMode={timerMode}
        percentage={calcPercentage()}
        timeLeft={formatTimeLeft(secondsLeft)}
        isActive={isActive}
        setIsActive={setIsActive}
        buttonText={buttonText}
        setButtonText={setButtonText}
      />
      <Button type="settings" toggleVisibility={toggleSettingsVisibility} />
      <Settings
        visible={settingsVisible}
        toggleSettingsVisibility={toggleSettingsVisibility}
        visible={() => settingsVisible((prev) => !prev)}
        applySettings={applySettings}
        setPomoLength={setPomoLength}
        setShortLength={setShortLength}
        typeLength={typeLength}
        setLongLength={setLongLength}
        fontPref={fontPref}
        setFontPref={setFontPref}
        accentColor={accentColor}
        setAccentColor={setAccentColor}
        closeSettings={toggleSettingsVisibility}
        setSecondsLeft={setSecondsLeft}
        timerMode={timerMode}
      />

      {/* <Button type="settings" toggleVisibility={toggleSettingsVisibility} />
      <Controls />
      <TimerDisplay /> 
      <Settings /> */}
    </div>
  );
}

export default App;
