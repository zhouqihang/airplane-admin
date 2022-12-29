import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './preview-sys';
import reportWebVitals from './reportWebVitals';

window.__AIRPLANE_ENV = {
  IN_EDITOR: false,
  IS_PREVIEW: true,
  IS_BUILDER: false
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
