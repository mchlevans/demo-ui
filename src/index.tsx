import * as ReactDOM from 'react-dom/client';
import React from 'react';
import App from './App';
import './style.scss'; // require for bundling

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(<App />);
