import React from 'react';
import './App.css';
import Header from './components/Header';
import Controls from './componentstest/Controls';
import TimerDisplay from './componentstest/TimerDisplay';
import Button from './componentstest/Button';
import Settings from './componentstest/Settings';

import CounterProvider from './context/CounterContext';

import useCounter from './componentstest/useCounter';

function App() {
  return (
    <div className="pomodoro-app">
      <CounterProvider>
        <Header />
        <Controls />
        <TimerDisplay />
        <Button type="settings" />
        <Settings />
      </CounterProvider>
    </div>
  );
}

export default App;
