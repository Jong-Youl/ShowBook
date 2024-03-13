import React from 'react';
import './index.css';
import App from './App';
import GlobalFonts from './styles/fonts';
import { createRoot } from 'react-dom/client'; // createRoot를 import

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <GlobalFonts />
    <App />
  </React.StrictMode>,
);
