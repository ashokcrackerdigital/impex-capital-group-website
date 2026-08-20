import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';

const resizeObserverErrorText =
  "ResizeObserver loop completed with undelivered notifications";
const resizeObserverLimitText = "ResizeObserver loop limit exceeded";
const elfsightI18nErrorText = "Cannot destructure property 'i18n'";

const shouldIgnoreRuntimeNoise = (message = "") => {
  const text = String(message);
  return (
    text.includes(resizeObserverErrorText) ||
    text.includes(resizeObserverLimitText) ||
    text.includes("ResizeObserver loop") ||
    text.includes(elfsightI18nErrorText)
  );
};

const dismissWebpackOverlayIfNoise = () => {
  const overlay = document.getElementById("webpack-dev-server-client-overlay");
  if (!overlay) return;

  // Overlay content lives in an iframe; message may also be on the host page.
  let overlayText = overlay.textContent || "";
  try {
    overlayText += overlay.contentDocument?.body?.textContent || "";
  } catch {
    // Cross-origin / not ready yet
  }

  if (shouldIgnoreRuntimeNoise(overlayText)) {
    overlay.remove();
  }
};

const dismissWebpackOverlay = () => {
  document.getElementById("webpack-dev-server-client-overlay")?.remove();
};

if (typeof window !== "undefined" && "ResizeObserver" in window) {
  const NativeResizeObserver = window.ResizeObserver;
  window.ResizeObserver = class extends NativeResizeObserver {
    constructor(callback) {
      super((entries, observer) => {
        window.requestAnimationFrame(() => {
          try {
            callback(entries, observer);
          } catch (error) {
            if (!shouldIgnoreRuntimeNoise(error?.message)) {
              throw error;
            }
          }
        });
      });
    }
  };
}

window.addEventListener(
  "error",
  (event) => {
    if (shouldIgnoreRuntimeNoise(event?.message)) {
      event.stopImmediatePropagation();
      event.preventDefault();
      // Webpack registers its listener first; clear overlay if it already painted.
      dismissWebpackOverlay();
      window.requestAnimationFrame(dismissWebpackOverlay);
      window.setTimeout(dismissWebpackOverlay, 50);
      return;
    }
  },
  true
);

const originalOnError = window.onerror;
window.onerror = (message, ...args) => {
  if (shouldIgnoreRuntimeNoise(message)) {
    dismissWebpackOverlay();
    window.requestAnimationFrame(dismissWebpackOverlay);
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
    dismissWebpackOverlay();
  }
});

// Catch the overlay if webpack painted it before our handlers ran.
if (typeof MutationObserver !== "undefined") {
  const overlayObserver = new MutationObserver(() => {
    dismissWebpackOverlayIfNoise();
  });
  const startObserving = () => {
    overlayObserver.observe(document.body, { childList: true });
  };
  if (document.body) {
    startObserving();
  } else {
    document.addEventListener("DOMContentLoaded", startObserving, { once: true });
  }
}

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
// or send to an analytics endpoint. See: https://bit.ly/CRA-vitals
reportWebVitals();
