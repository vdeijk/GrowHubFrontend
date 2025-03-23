import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import settingsStore from './core/stores/SettingsStore/SettingsStore';

settingsStore.initialize();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
