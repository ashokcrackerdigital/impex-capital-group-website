import { useEffect, useRef, useState } from "react";
import "./LinkedInFeed.css";

const ELFSIGHT_APP_ID = "35ad7f62-3168-4c39-b646-88177f2602a1";
const LINKEDIN_COMPANY_URL =
  "https://www.linkedin.com/company/impex-capital-group/";
const LOAD_TIMEOUT_MS = 15000;

/**
 * Isolates Elfsight LinkedIn widget in an iframe so its bundled React/i18n
 * never conflicts with the host React app (fixes intermittent blank feed).
 */
const LinkedInFeed = () => {
  const iframeRef = useRef(null);
  const loadedRef = useRef(false);
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let timeoutId;
    let pollId;

    const markLoaded = () => {
      if (cancelled || loadedRef.current) return;
      loadedRef.current = true;
      setLoaded(true);
      setFailed(false);
      clearTimeout(timeoutId);
      clearInterval(pollId);
    };

    const markFailed = () => {
      if (cancelled || loadedRef.current) return;
      setFailed(true);
      clearTimeout(timeoutId);
      clearInterval(pollId);
    };

    const syncIframeHeight = (doc) => {
      const iframe = iframeRef.current;
      if (!iframe || !doc?.body) return;
      const nextHeight = Math.max(doc.body.scrollHeight, 420);
      iframe.style.height = `${nextHeight}px`;
    };

    timeoutId = setTimeout(markFailed, LOAD_TIMEOUT_MS);

    pollId = setInterval(() => {
      try {
        const doc = iframeRef.current?.contentDocument;
        if (!doc) return;

        syncIframeHeight(doc);

        const hasContent = Boolean(
          doc.querySelector(
            ".eapps-widget img, .eapps-widget a, [class*='Post'] img, [class*='Post'] a, [class*='WidgetBackground'] img"
          )
        );

        if (hasContent) {
          markLoaded();
        }
      } catch {
        // Not ready yet
      }
    }, 700);

    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
      clearInterval(pollId);
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
    .elfsight-app-${ELFSIGHT_APP_ID} { width: 100%; }
    [class*="es-widget-toolbar"],
    [class*="eapps-widget-toolbar"],
    [class*="global-styles__BadgeWrapper"],
    [class*="WidgetToolbar"],
    a[href*="elfsight.com"],
    [title*="Free LinkedIn Feed Widget"] {
      display: none !important;
      visibility: hidden !important;
      opacity: 0 !important;
      pointer-events: none !important;
    }
  </style>
  <script src="https://elfsightcdn.com/platform.js" async></script>
</head>
<body>
  <div
    class="elfsight-app-${ELFSIGHT_APP_ID}"
    data-elfsight-app-lazy
    data-elfsight-app-locale="en"
  ></div>
</body>
</html>`;

  return (
    <div className="linkedin-feed-widget">
      {!failed && (
        <iframe
          ref={iframeRef}
          title="Impex Capital Group LinkedIn feed"
          className={`linkedin-feed-iframe${loaded ? " is-loaded" : ""}`}
          srcDoc={srcDoc}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
        />
      )}

      {failed && (
        <div className="linkedin-feed-fallback">
          <p>Follow our latest updates on LinkedIn.</p>
          <a
            href={LINKEDIN_COMPANY_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            View Impex Capital Group on LinkedIn
          </a>
        </div>
      )}
    </div>
  );
};

export default LinkedInFeed;
