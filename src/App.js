import React from 'react';
import './App.css';
import CounterProvider from './context/CounterContext';
import Header from './components/Header';
import Controls from './components/Controls';
import TimerDisplay from './components/TimerDisplay';
import Button from './components/Button';
import Settings from './components/Settings';

export default function App() {
  return (
    <div className="pomodoro-app">
      <Header />
      <Controls />
      <TimerDisplay />
      <Button type="settings" />
      <Settings />
    </div>
  );
}
