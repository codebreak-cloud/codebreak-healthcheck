/* eslint-disable */
/* Cookie consent — banner, preferences panel, consent persistence */

const CONSENT_KEY = 'cb_cookie_consent';

function loadConsent() {
  try { return JSON.parse(localStorage.getItem(CONSENT_KEY)); }
  catch { return null; }
}

function persistConsent(prefs) {
  try {
    localStorage.setItem(CONSENT_KEY, JSON.stringify({
      ...prefs,
      savedAt: new Date().toISOString(),
    }));
  } catch {}
}

/* Apply consent — loads tracking scripts based on user preferences */
function applyConsent(prefs) {

  /* ── GTM (loads GA4 + any tags configured inside GTM) ──────── */
  if (prefs.analytics && window.CONFIG?.gtmId && !document.getElementById('cb-gtm')) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
    const s = document.createElement('script');
    s.id = 'cb-gtm';
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtm.js?id=' + window.CONFIG.gtmId;
    document.head.appendChild(s);
  }

  /* ── GA4 direct (only if not using GTM) ────────────────────── */
  if (prefs.analytics && window.CONFIG?.ga4Id && !window.CONFIG?.gtmId && !document.getElementById('cb-ga4')) {
    const s = document.createElement('script');
    s.id = 'cb-ga4';
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + window.CONFIG.ga4Id;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    function gtag(){ window.dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', window.CONFIG.ga4Id);
  }

  /* ── Meta Pixel ─────────────────────────────────────────────── */
  if (prefs.advertising && window.CONFIG?.metaPixelId && !document.getElementById('cb-pixel')) {
    (function(f,b,e,v,n,t,s){
      if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;t.id='cb-pixel';
      t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)
    })(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
    window.fbq('init', window.CONFIG.metaPixelId);
    window.fbq('track', 'PageView');
  }
}

/* ── Toggle switch ────────────────────────────────────────── */
function CookieSwitch({ id, label, description, checked, disabled, onChange }) {
  return (
    <div className="ck-row">
      <div className="ck-row-text">
        <span className="ck-row-label">{label}</span>
        <span className="ck-row-desc">{description}</span>
      </div>
      <div className="ck-row-control">
        {disabled ? (
          <span className="ck-always">Always on</span>
        ) : (
          <button
            role="switch"
            aria-checked={checked}
            aria-label={label}
            id={id}
            className={'ck-switch' + (checked ? ' on' : '')}
            onClick={() => onChange(!checked)}
          >
            <span className="ck-switch-thumb" />
          </button>
        )}
      </div>
    </div>
  );
}

/* ── Preferences panel ────────────────────────────────────── */
function CookiePanel({ prefs, onSave, onClose }) {
  const [analytics, setAnalytics]     = React.useState(!!prefs.analytics);
  const [advertising, setAdvertising] = React.useState(!!prefs.advertising);

  return (
    <div className="ck-backdrop" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="ck-panel" role="dialog" aria-modal="true" aria-label="Cookie preferences">
        <div className="ck-panel-head">
          <span className="ck-panel-title">Cookie settings</span>
          <button className="ck-close" onClick={onClose} aria-label="Close">✕</button>
        </div>

        <div className="ck-panel-body">
          <CookieSwitch
            id="ck-necessary"
            label="Strictly necessary cookies"
            description="Required for this website to work. These are always on."
            checked={true}
            disabled={true}
          />
          <CookieSwitch
            id="ck-analytics"
            label="Analytics cookies"
            description="Help us understand how people use this page and where improvements are needed."
            checked={analytics}
            onChange={setAnalytics}
          />
          <CookieSwitch
            id="ck-advertising"
            label="Advertising cookies"
            description="Help us measure ad performance and show relevant ads on platforms such as Meta and Google."
            checked={advertising}
            onChange={setAdvertising}
          />
        </div>

        <div className="ck-panel-foot">
          <button className="cb-btn block" onClick={() => onSave({ analytics, advertising })}>
            Save choices <span className="arrow">→</span>
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Banner ───────────────────────────────────────────────── */
function CookieBanner({ onAcceptAll, onRejectAll, onManage }) {
  return (
    <div className="ck-banner" role="region" aria-label="Cookie consent">
      <div className="ck-banner-inner">
        <p className="ck-banner-text">
          We use essential cookies to make this website work. With your permission, we'll also use analytics and advertising cookies to measure performance and improve our marketing. You can accept all, reject non-essential cookies, or manage your choices.
        </p>
        <div className="ck-banner-actions">
          <button className="ck-btn-primary" onClick={onAcceptAll}>Accept all</button>
          <button className="ck-btn-secondary" onClick={onRejectAll}>Reject non-essential</button>
          <button className="ck-btn-ghost" onClick={onManage}>Manage choices</button>
        </div>
      </div>
    </div>
  );
}

/* ── Root component ───────────────────────────────────────── */
function CookieConsent() {
  const saved = React.useMemo(() => loadConsent(), []);
  const [showBanner, setShowBanner] = React.useState(!saved);
  const [showPanel, setShowPanel]   = React.useState(false);
  const [prefs, setPrefs]           = React.useState(saved || { analytics: false, advertising: false });

  // Expose global hook so footer "Cookie Settings" links can reopen the panel
  React.useEffect(() => {
    window.openCookieSettings = () => { setShowPanel(true); setShowBanner(false); };
    return () => { delete window.openCookieSettings; };
  }, []);

  // Apply persisted consent on mount
  React.useEffect(() => { if (saved) applyConsent(saved); }, []); // eslint-disable-line

  function acceptAll() {
    const p = { analytics: true, advertising: true };
    persistConsent(p); applyConsent(p);
    setPrefs(p); setShowBanner(false); setShowPanel(false);
  }

  function rejectAll() {
    const p = { analytics: false, advertising: false };
    persistConsent(p);
    setPrefs(p); setShowBanner(false); setShowPanel(false);
  }

  function saveChoices(p) {
    persistConsent(p); applyConsent(p);
    setPrefs(p); setShowBanner(false); setShowPanel(false);
  }

  function openPanel() { setShowPanel(true); setShowBanner(false); }

  function closePanel() {
    setShowPanel(false);
    if (!loadConsent()) setShowBanner(true);
  }

  return (
    <React.Fragment>
      {showBanner && !showPanel && (
        <CookieBanner
          onAcceptAll={acceptAll}
          onRejectAll={rejectAll}
          onManage={openPanel}
        />
      )}
      {showPanel && (
        <CookiePanel
          prefs={prefs}
          onSave={saveChoices}
          onClose={closePanel}
        />
      )}
    </React.Fragment>
  );
}

// Mount independently of the main app
const consentRoot = document.getElementById('consent-root');
if (consentRoot) {
  ReactDOM.createRoot(consentRoot).render(<CookieConsent />);
}

window.CookieConsent = CookieConsent;
