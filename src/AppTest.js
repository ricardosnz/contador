import React from 'react';
import './App.css';
import CounterProvider from './context/CounterContext';
import Header from './components/Header';
import Controls from './components/Controls';
import TimerDisplay from './components/TimerDisplay';
import Button from './components/Button';
import Settings from './componentstest/Settings';

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
