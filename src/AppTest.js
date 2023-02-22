import React from 'react';
import './App.css';
import Header from './components/Header';
import Controls from './components/Controls';
import TimerDisplay from './componentstest/TimerDisplay';
import Button from './components/Button';
import Settings from './componentstest/Settings';
// import Settings from './components/Settings';
import { useState, useEffect } from 'react';

import { changeStyle } from './utils';

import useCounter from './componentstest/useCounter';

function App() {
  const {
    timerMode,
    changeTimerMode,
    percentage,
    timeleft,
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
  } = useCounter();

  return (
    <div className="pomodoro-app">
      <Header>{timerMode}</Header>
      <Controls
        timerMode={timerMode}
        timersLength={timersLength}
        changeModeTimer={changeTimerMode}
      />
      <TimerDisplay
        timerMode={timerMode}
        percentage={percentage}
        timeLeft={timeleft}
        isActive={isActive}
        setIsActive={setIsActive}
        buttonText={buttonText}
        setButtonText={setButtonText}
        changeActive={changeActive}
      />
      <Button type="settings" toggleVisibility={toggleSettingsVisibility} />
      <Settings
        visible={settingsVisible}
        fontPref={fontPref}
        accentColor={accentColor}
        timersLength={timersLength}
        applySettings={applySettings}
        toggleSettingsVisibility={toggleSettingsVisibility}
      />

      {/* <Button type="settings" toggleVisibility={toggleSettingsVisibility} />
      <Controls />
      <TimerDisplay /> 
      <Settings /> */}
    </div>
  );
}

export default App;
