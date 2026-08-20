import { useEffect, useRef, useState } from "react";
import "./LinkedInFeed.css";

const ELFSIGHT_APP_ID = "35ad7f62-3168-4c39-b646-88177f2602a1";

/**
 * Isolates Elfsight LinkedIn widget in an iframe so its bundled React/i18n
 * never conflicts with the host React app.
 *
 * Important: we never tear the iframe down for a "load failure". The old
 * timeout + selector check was replacing a working feed with the LinkedIn
 * fallback link after a few seconds for many visitors.
 */
const LinkedInFeed = () => {
  const iframeRef = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let pollId;
    let resizeObserver;

    const markReady = () => {
      if (cancelled) return;
      setReady(true);
    };

    const syncIframeHeight = (doc) => {
      const iframe = iframeRef.current;
      if (!iframe || !doc?.body) return;
      const nextHeight = Math.max(doc.body.scrollHeight, 420);
      const nextHeightPx = `${nextHeight}px`;
      // Only write when height changes — writing every observation causes a
      // ResizeObserver feedback loop that CRA surfaces as a runtime overlay.
      if (iframe.style.height === nextHeightPx) return;
      iframe.style.height = nextHeightPx;
    };

    const inspect = () => {
      try {
        const doc = iframeRef.current?.contentDocument;
        if (!doc?.body) return;

        syncIframeHeight(doc);

        if (!resizeObserver && typeof ResizeObserver !== "undefined") {
          let frameId = 0;
          resizeObserver = new ResizeObserver(() => {
            cancelAnimationFrame(frameId);
            frameId = requestAnimationFrame(() => syncIframeHeight(doc));
          });
          resizeObserver.observe(doc.body);
        }

        const root = doc.querySelector(`[class*="elfsight-app-"], .eapps-widget`);
        const hasWidgetChrome = Boolean(
          doc.querySelector(
            ".eapps-widget, [class*='WidgetBackground'], [class*='Post'], [class*='Carousel'], [class*='Slider']"
          )
        );
        const hasMedia = Boolean(
          doc.querySelector(
            ".eapps-widget img, .eapps-widget a, [class*='Post'] img, [class*='Post'] a, iframe"
          )
        );
        const hasChildren = Boolean(root && root.childElementCount > 0);

        if (hasMedia || hasWidgetChrome || hasChildren) {
          markReady();
        }
      } catch {
        // Document not ready yet
      }
    };

    pollId = setInterval(inspect, 500);
    // Always reveal the iframe even if Elfsight DOM classes change —
    // never swap it out for a fallback message.
    const revealId = setTimeout(markReady, 4000);

    return () => {
      cancelled = true;
      clearInterval(pollId);
      clearTimeout(revealId);
      resizeObserver?.disconnect();
    };
  }, []);

  const srcDoc = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <style>
    html, body {
      margin: 0;
      padding: 0;
      background: transparent;
      overflow-x: hidden;
    }
    .elfsight-app-${ELFSIGHT_APP_ID} { width: 100%; min-height: 420px; }
    [class*="es-widget-toolbar"],
    [class*="eapps-widget-toolbar"],
    [class*="WidgetToolbar"] {
      display: none !important;
      visibility: hidden !important;
      pointer-events: none !important;
    }
  </style>
  <script src="https://elfsightcdn.com/platform.js" async></script>
</head>
<body>
  <div
    class="elfsight-app-${ELFSIGHT_APP_ID}"
    data-elfsight-app-locale="en"
  ></div>
</body>
</html>`;

  return (
    <div className="linkedin-feed-widget">
      <iframe
        ref={iframeRef}
        title="Impex Capital Group LinkedIn feed"
        className={`linkedin-feed-iframe${ready ? " is-loaded" : ""}`}
        srcDoc={srcDoc}
        referrerPolicy="no-referrer-when-downgrade"
        sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
      />
    </div>
  );
};

export default LinkedInFeed;
