import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import PomoProvider from './context/CounterContext';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <PomoProvider>
    <App />
  </PomoProvider>
);
