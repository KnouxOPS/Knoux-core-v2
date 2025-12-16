import React from 'react';
import ReactDOM from 'react-dom/client';
import './src/styles/globals.css';
import App from './src/App';
import { HashRouter } from 'react-router-dom';
import { ThemeProvider } from './src/contexts/ThemeContext';
import { DownloadProvider } from './src/contexts/DownloadContext';
import { NotificationProvider } from './src/contexts/NotificationContext';
import { SystemSettingsProvider } from './src/contexts/SystemSettingsContext';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Could not find root element to mount to');
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <HashRouter>
      <ThemeProvider>
        <SystemSettingsProvider>
          {' '}
          {/* SystemSettingsProvider now manages language and can get theme from ThemeProvider's localStorage */}
          <NotificationProvider>
            <DownloadProvider>
              {' '}
              {/* DownloadProvider might use SystemSettings for paths, etc. */}
              <App />
            </DownloadProvider>
          </NotificationProvider>
        </SystemSettingsProvider>
      </ThemeProvider>
    </HashRouter>
  </React.StrictMode>
);
