import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';

const resizeObserverErrorText =
  "ResizeObserver loop completed with undelivered notifications";
const elfsightI18nErrorText = "Cannot destructure property 'i18n'";

const shouldIgnoreRuntimeNoise = (message = "") =>
  String(message).includes(resizeObserverErrorText) ||
  String(message).includes(elfsightI18nErrorText);

if (typeof window !== "undefined" && "ResizeObserver" in window) {
  const NativeResizeObserver = window.ResizeObserver;
  window.ResizeObserver = class extends NativeResizeObserver {
    constructor(callback) {
      super((entries, observer) => {
        window.requestAnimationFrame(() => callback(entries, observer));
      });
    }
  };
}

window.addEventListener(
  "error",
  (event) => {
    if (shouldIgnoreRuntimeNoise(event?.message)) {
      event.stopImmediatePropagation();
    }
  },
  true
);

const originalOnError = window.onerror;
window.onerror = (message, ...args) => {
  if (shouldIgnoreRuntimeNoise(message)) {
    return true;
  }
  if (typeof originalOnError === "function") {
    return originalOnError(message, ...args);
  }
  return false;
};

window.addEventListener("unhandledrejection", (event) => {
  const reasonMessage = event?.reason?.message || String(event?.reason || "");
  if (shouldIgnoreRuntimeNoise(reasonMessage)) {
    event.preventDefault();
  }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
