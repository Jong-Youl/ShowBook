import React from 'react';
import './index.css';
import App from './App';
import GlobalFonts from './styles/fonts';
import { createRoot } from 'react-dom/client'; // createRoot를 import
import { RecoilRoot } from 'recoil';

const container = document.getElementById('root');
const root = createRoot(container);
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/serviceWorker.js')
      .then(registration => {
        console.log('Service Worker registered with scope:', registration.scope);
      })
      .catch(error => {
        console.log('Service Worker registration failed:', error);
      });
  });
}
root.render(
    <RecoilRoot>
      <GlobalFonts />
      <App />
    </RecoilRoot>
);
