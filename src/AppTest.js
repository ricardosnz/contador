import React from 'react';
import './App.css';
import Header from './componentstest/Header';
import Controls from './componentstest/Controls';
import TimerDisplay from './componentstest/TimerDisplay';
import Button from './componentstest/Button';
import Settings from './componentstest/Settings';
import { useState, useEffect } from 'react';

function App() {
  const [settingsVisible, setSettingsVisible] = useState(false);
  const [timeMode, setTimeMode] = useState('pomo'); // options: pomo, short, long
  const [pomoLength, setPomoLength] = useState(25);
  const [shortLength, setShortLength] = useState(3);
  const [longLength, setLongLength] = useState(15);
  const [fontpPref, setFontPref] = useState('kumbh'); // options: kumbh, roboto, space
  const [changeColor, setChangeColor] = useState('default'); // options: default, blue, purple
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

  const toggleSettingsVisibility = () => setSettingsVisible(!settingsVisible);

  const formatTimeLeft = (seconds) => {
    return `${Math.floor(seconds / 60)}:${
      seconds % 60 > 9 ? seconds % 60 : '0' + (seconds % 60)
    }`;
  };

  const calcPercentage = () => {
    if (timeMode === 'pomo') {
      return (secondsLeft / (pomoLength * 60)) * 100;
    }
    if (timeMode === 'short') {
      return (secondsLeft / (shortLength * 60)) * 100;
    }
    if (timeMode === 'long') {
      return (secondsLeft / (longLength * 60)) * 100;
    }
  };

  return (
    <div className="pomodoro-app">
      <Header>Pomodoro</Header>
      <Controls
        setTimeMode={setTimeMode}
        setSecondsLeft={setSecondsLeft}
        pomoLength={pomoLength}
        shortLength={shortLength}
        longLength={longLength}
        setIsActive={setIsActive}
        buttonText={buttonText}
        setButtonText={setButtonText}
      />
      <TimerDisplay
        timeMode={timeMode}
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
        pomoLength={pomoLength}
        setPomoLength={setPomoLength}
        shortLength={shortLength}
        setShortLength={setShortLength}
        longLength={longLength}
        setLongLength={setLongLength}
        fontpPref={fontpPref}
        setFontPref={setFontPref}
        changeColor={changeColor}
        setChangeColor={setChangeColor}
        closeSettings={toggleSettingsVisibility}
        setSecondsLeft={setSecondsLeft}
        timeMode={timeMode}
      />
    </div>
  );
}

export default App;
