import React from 'react';
import './index.css';
import App from './App';
import GlobalFonts from './styles/fonts';
import { createRoot } from 'react-dom/client'; // createRoot를 import
import {RecoilRoot} from 'recoil'

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <RecoilRoot>
      <GlobalFonts />
      <App />
    </RecoilRoot>,
  </React.StrictMode>
);
