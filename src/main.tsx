import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './variables.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import settingsStore from './core/stores/SettingsStore/SettingsStore';
import { Auth0Provider } from '@auth0/auth0-react';

settingsStore.initialize();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN}
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Auth0Provider>
  </StrictMode>,
);
