/* eslint-disable */
/* Top-level App — state machine + integrations */

/* ============================================================
   CONFIGURATION
   Set these before deploying.
   ============================================================ */
const CONFIG = {
  // Webhook endpoint (Zapier / Make / your own endpoint)
  // Replace with your real URL. Leave blank to disable.
  webhookUrl: 'https://hooks.zapier.com/hooks/catch/6879762/4oafe7l/',

  // Calendly link (used in results.jsx via window.open)
  // results.jsx appends ?name=&email=&a1= automatically
  calendlyUrl: 'https://calendly.com/codebreak/30-minute-follow-up-chat',

  // GA4 measurement ID — set to your GA4 ID to enable analytics
  // e.g. 'G-XXXXXXXXXX'
  ga4Id: 'G-1RGMF8X7H3',

  // Meta Pixel ID — set to enable Meta Pixel (fires after advertising consent)
  // e.g. '1234567890123'
  metaPixelId: '1051748388502575',

  // Google Tag Manager container ID — alternative to direct GA4
  // e.g. 'GTM-XXXXXXX'. Leave blank if using ga4Id directly.
  gtmId: '',

  // Supabase — for the admin submissions panel
  // Project Settings → API → Project URL + anon public key
  supabaseUrl:      'https://znvqbjmybrpveujbwnax.supabase.co',
  supabaseAnonKey:  'sb_publishable__b_OKtwqQughtpCony8KTQ_a9sTOnNy',
};

// Expose CONFIG globally so cookie.jsx can read it
window.CONFIG = CONFIG;

/* ============================================================
   ANALYTICS
   Single lightweight wrapper. Add GA4 ID to CONFIG to enable.
   ============================================================ */
window.cbTrack = function(event, props = {}) {
  if (typeof gtag === 'function') {
    gtag('event', event, props);
  }
  // console.log('[CB Analytics]', event, props); // uncomment for local debugging
};

/* ============================================================
   WEBHOOK
   Called after gate submission. Non-blocking — results show
   regardless of success or failure.
   ============================================================ */
async function sendWebhook(payload) {
  if (!CONFIG.webhookUrl) return;
  try {
    const res = await fetch(CONFIG.webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('Webhook returned ' + res.status);
  } catch (err) {
    // Log the failure but don't block the user
    console.error('[CODEBREAK] Webhook failed:', err);
    // TODO: send to dead-letter queue / retry mechanism if needed
  }
}

/* ============================================================
   SUPABASE
   Direct insert — runs alongside Zapier webhook, non-blocking.
   Admin panel reads from here.
   ============================================================ */
async function sendToSupabase(payload) {
  const { supabaseUrl, supabaseAnonKey } = CONFIG;
  if (!supabaseUrl || supabaseUrl === 'YOUR_SUPABASE_URL') return;
  try {
    const res = await fetch(`${supabaseUrl}/rest/v1/submissions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': supabaseAnonKey,
        'Authorization': `Bearer ${supabaseAnonKey}`,
        'Prefer': 'return=minimal',
      },
      body: JSON.stringify({
        contact:    payload.contact,
        scoring:    payload.scoring,
        answers:    payload.answers,
        referrer:   payload.referrer,
        user_agent: payload.userAgent,
      }),
    });
    if (!res.ok) throw new Error('Supabase insert ' + res.status);
  } catch (err) {
    console.error('[CODEBREAK] Supabase insert failed:', err);
  }
}

/* ============================================================
   LOCAL STORAGE PERSISTENCE
   Persists quiz answers and stage so users can resume after
   closing the tab mid-quiz.
   ============================================================ */
const LS_KEY = 'cb_quiz_state';

function loadState() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch { return null; }
}

function saveState(data) {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(data));
  } catch { /* storage full or blocked — degrade gracefully */ }
}

function clearState() {
  try { localStorage.removeItem(LS_KEY); } catch { }
}

/* ============================================================
   CONSENT GATING
   Quiz cannot start until the user has made a cookie choice.
   Matches the CONSENT_KEY used in cookie.jsx.
   ============================================================ */
const CONSENT_KEY = 'cb_cookie_consent';
function hasConsent() {
  try { return !!localStorage.getItem(CONSENT_KEY); } catch { return false; }
}

/* ============================================================
   APP
   ============================================================ */
function App() {
  const saved = React.useMemo(() => loadState(), []);

  // stages: 'intro' | 'resume' | 'quiz' | 'gate' | 'calc' | 'results'
  const [stage, setStage] = React.useState('intro');
  const [answers, setAnswers] = React.useState(saved?.answers || null);
  const [contact, setContact] = React.useState(null);
  const [scoring, setScoring] = React.useState(null);
  const isPreview = /preview=tier[123]/.test(window.location.search);
  const [showResume, setShowResume] = React.useState(
    !isPreview && !!(saved?.answers && Object.keys(saved.answers).length > 0 && !saved.completed)
  );

  // Consent gating — true once the user has made any cookie choice
  const [consentReady, setConsentReady] = React.useState(() => hasConsent());
  React.useEffect(() => {
    const handler = () => setConsentReady(true);
    window.addEventListener('cb_consent_saved', handler);
    return () => window.removeEventListener('cb_consent_saved', handler);
  }, []);

  // Dev preview: ?preview=tier1|tier2|tier3 — jump straight to a stubbed results screen
  React.useEffect(() => {
    const m = window.location.search.match(/preview=(tier[123])/);
    if (!m) return;
    const t = m[1];
    const mockAnswers = {};
    const pickIdx = t === 'tier1' ? 0 : t === 'tier2' ? 1 : 3;
    window.QUESTIONS.forEach((q) => {
      let idx = pickIdx;
      if (q.id === 'q11' && t === 'tier3') idx = 2;
      mockAnswers[q.id] = Math.min(idx, q.options.length - 1);
    });
    setAnswers(mockAnswers);
    setContact({ first: 'Joel', email: 'joel@codebreak.co.uk', phone: '07123456789' });
    setScoring(window.scoreFromAnswers(mockAnswers));
    setStage('results');
  }, []);

  // Scroll to top on stage change
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
  }, [stage]);

  // Persist answers to localStorage whenever they change
  React.useEffect(() => {
    if (answers && Object.keys(answers).length > 0) {
      saveState({ answers, completed: false });
    }
  }, [answers]);

  // --- Stage transitions ---

  function start() {
    if (!consentReady) return;
    window.cbTrack('quiz_started');
    setShowResume(false);
    setStage('quiz');
  }

  function resumeQuiz() {
    if (!consentReady) return;
    setShowResume(false);
    setStage('quiz');
  }

  function discardAndStart() {
    if (!consentReady) return;
    clearState();
    setAnswers(null);
    setShowResume(false);
    window.cbTrack('quiz_started');
    setStage('quiz');
  }

  function quizDone(a) {
    setAnswers(a);
    setStage('gate');
  }

  function backToQuiz() {
    setStage('quiz');
  }

  function gateDone(c) {
    setContact(c);
    setStage('calc');

    const sc = window.scoreFromAnswers(answers);
    setScoring(sc);

    const tierLabel = { one: 'Scale Ready', two: 'Nearly There', three: 'Fix First' };
    const payload = {
      // Flat fields — easy to map in Zapier / Make without navigating nested objects
      first_name:  c.first,
      email:       c.email,
      phone:       c.phone,
      score:       sc.total,
      tier:        sc.tier,
      tier_label:  tierLabel[sc.tier] || sc.tier,

      // Full nested objects (retained for Supabase + any advanced Zap steps)
      contact: c,
      answers,
      scoring: sc,
      submittedAt: new Date().toISOString(),
      userAgent: navigator.userAgent,
      referrer: document.referrer || '',
    };

    // Fire-and-forget — results show regardless
    sendWebhook(payload);
    sendToSupabase(payload);

    window.cbTrack('gate_submitted', { tier: sc.tier, total: sc.total, flags: sc.flags.length });

    // Mark as completed so the resume prompt won't re-appear
    saveState({ answers, completed: true });

    setTimeout(() => {
      setStage('results');
      window.cbTrack('results_viewed', { tier: sc.tier, total: sc.total, flags: sc.flags.length });
    }, 1600);
  }

  function restart() {
    clearState();
    setAnswers(null);
    setContact(null);
    setScoring(null);
    setShowResume(false);
    setStage('intro');
  }

  // Resume prompt overlay — shown on intro when saved progress exists
  if (showResume) {
    return (
      <div className="cb-page fit" style={{ alignItems: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'column', gap: 0 }}>
        <header className="cb-topbar" style={{ width: '100%' }}>
          <img src="assets/codebreak-logo.png" alt="Codebreak" />
        </header>
        <main className="intro-wrap">
          <div className="intro-inner" style={{ maxWidth: 520 }}>
            <h1 className="intro-h1" style={{ fontSize: 'clamp(28px,6vw,48px)' }}>
              Welcome back.
            </h1>
            <p className="intro-lede">
              You started the health check and got {Object.keys(saved.answers).length} of 20 questions in. Pick up where you left off, or start fresh.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 8 }}>
              <button className="cb-btn" onClick={resumeQuiz}>
                Continue where I left off <span className="arrow">→</span>
              </button>
              <button
                onClick={discardAndStart}
                style={{
                  background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)',
                  fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 11,
                  letterSpacing: '0.14em', textTransform: 'uppercase', cursor: 'pointer',
                  padding: '8px 0', textAlign: 'left'
                }}>
                Start again from the beginning
              </button>
            </div>
          </div>
        </main>
        <footer className="cb-copyright">© 2026 Codebreak Group Ltd</footer>
      </div>
    );
  }

  if (stage === 'intro')   return <IntroScreen onStart={start} />;
  if (stage === 'quiz')    return <QuizScreen onComplete={quizDone} onBack={() => setStage('intro')} initialAnswers={answers || {}} />;
  if (stage === 'gate')    return <GateScreen onSubmit={gateDone} onBack={backToQuiz} />;
  if (stage === 'calc')    return <CalcScreen />;
  if (stage === 'results') return <ResultsScreen scoring={scoring} contact={contact} onRestart={restart} />;
  return null;
}

window.App = App;
ReactDOM.createRoot(document.getElementById('root')).render(<App />);
