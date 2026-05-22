/* eslint-disable */
/* Admin panel — submissions browser + results viewer */

(function () {

  /* ── Supabase client ───────────────────────────────────────
     Fill in your Project URL and anon key once you have them.
     Project Settings → API in the Supabase dashboard.
  ─────────────────────────────────────────────────────────── */
  const SUPABASE_URL      = 'https://znvqbjmybrpveujbwnax.supabase.co';
  const SUPABASE_ANON_KEY = 'sb_publishable__b_OKtwqQughtpCony8KTQ_a9sTOnNy';

  const CONFIGURED = SUPABASE_URL !== 'https://placeholder.supabase.co';

  const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  /* ── Tier helpers ───────────────────────────────────────── */
  const TIER_LABEL = { one: 'Scale Ready', two: 'Nearly There', three: 'Fix First' };
  const TIER_BG    = { one: '#22c55e',    two: '#FFE800',      three: '#ef4444'   };
  const TIER_FG    = { one: '#fff',       two: '#1d1d1d',      three: '#fff'      };

  /* ── Login screen ───────────────────────────────────────── */
  function AdminLogin({ onLogin }) {
    const [email,    setEmail]    = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error,    setError]    = React.useState('');
    const [busy,     setBusy]     = React.useState(false);

    async function submit(e) {
      e.preventDefault();
      setBusy(true); setError('');
      const { error } = await sb.auth.signInWithPassword({ email, password });
      if (error) { setError('Invalid email or password.'); setBusy(false); }
      else onLogin();
    }

    return (
      <div className="adm-login-wrap">
        <div className="adm-login-card">
          <img src="assets/codebreak-logo.png" alt="Codebreak" className="adm-logo" />
          <h1 className="adm-login-h">Submissions</h1>
          <form onSubmit={submit} className="adm-login-form">
            <input className="adm-input" type="email" placeholder="Email"
              value={email} onChange={e => setEmail(e.target.value)}
              autoComplete="email" required />
            <input className="adm-input" type="password" placeholder="Password"
              value={password} onChange={e => setPassword(e.target.value)}
              autoComplete="current-password" required />
            {error && <p className="adm-error">{error}</p>}
            <button type="submit" className="cb-btn block" disabled={busy}>
              {busy ? 'Signing in…' : 'Sign in'} <span className="arrow">→</span>
            </button>
          </form>
        </div>
      </div>
    );
  }

  /* ── Stats bar ──────────────────────────────────────────── */
  function StatsBar({ rows }) {
    const total    = rows.length;
    const thisWeek = rows.filter(r => Date.now() - new Date(r.created_at) < 7 * 86400000).length;
    const avg      = total ? Math.round(rows.reduce((s, r) => s + r.scoring.total, 0) / total) : 0;
    const tc       = { one: 0, two: 0, three: 0 };
    rows.forEach(r => tc[r.scoring.tier]++);

    const stats = [
      { n: total,     label: 'Total' },
      { n: thisWeek,  label: 'This week' },
      { n: avg,       label: 'Avg score' },
      { n: tc.one,    label: 'Scale Ready',  color: '#22c55e' },
      { n: tc.two,    label: 'Nearly There', color: '#FFE800' },
      { n: tc.three,  label: 'Fix First',    color: '#ef4444' },
    ];

    return (
      <div className="adm-stats">
        {stats.map(s => (
          <div key={s.label} className="adm-stat">
            <span className="adm-stat-n" style={s.color ? { color: s.color } : {}}>{s.n}</span>
            <span className="adm-stat-l">{s.label}</span>
          </div>
        ))}
      </div>
    );
  }

  /* ── Submissions table ──────────────────────────────────── */
  function SubmissionsTable({ rows, onView, onDelete }) {
    const [q,    setQ]    = React.useState('');
    const [tier, setTier] = React.useState('all');

    const filtered = rows.filter(r => {
      const hay = (r.contact.first + ' ' + r.contact.email).toLowerCase();
      const tierMap = { 'Scale Ready': 'one', 'Nearly There': 'two', 'Fix First': 'three' };
      return hay.includes(q.toLowerCase()) && (tier === 'all' || r.scoring.tier === tier);
    });

    return (
      <div className="adm-table-wrap">
        <div className="adm-filters">
          <input className="adm-search" type="search" placeholder="Search name or email…"
            value={q} onChange={e => setQ(e.target.value)} />
          <div className="adm-tier-pills">
            {['all', 'one', 'two', 'three'].map(t => (
              <button key={t}
                className={'adm-pill' + (tier === t ? ' adm-pill-on' : '')}
                style={tier === t && t !== 'all' ? { background: TIER_BG[t], color: TIER_FG[t] } : {}}
                onClick={() => setTier(t)}>
                {t === 'all' ? 'All' : TIER_LABEL[t]}
              </button>
            ))}
          </div>
        </div>

        <table className="adm-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Score</th>
              <th>Tier</th>
              <th>Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(r => (
              <tr key={r.id} className="adm-tr" onClick={() => onView(r)}>
                <td className="adm-td-bold">{r.contact.first}</td>
                <td className="adm-td-dim">{r.contact.email}</td>
                <td className="adm-td-dim">{r.contact.phone}</td>
                <td>
                  <b>{r.scoring.total}</b>
                  <span className="adm-of">/100</span>
                </td>
                <td>
                  <span className="adm-badge"
                    style={{ background: TIER_BG[r.scoring.tier], color: TIER_FG[r.scoring.tier] }}>
                    {TIER_LABEL[r.scoring.tier]}
                  </span>
                </td>
                <td className="adm-td-dim adm-td-date">
                  {new Date(r.created_at).toLocaleString('en-GB', {
                    day: 'numeric', month: 'short', year: 'numeric',
                    hour: '2-digit', minute: '2-digit',
                    timeZone: 'Europe/London'
                  })}
                </td>
                <td>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button className="adm-view-btn"
                      onClick={e => { e.stopPropagation(); onView(r); }}>
                      View →
                    </button>
                    <button className="adm-del-btn"
                      onClick={e => { e.stopPropagation(); onDelete(r.id); }}>
                      ✕
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="adm-empty">No submissions found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }

  /* ── Error boundary ─────────────────────────────────────── */
  class ResultsErrorBoundary extends React.Component {
    constructor(props) { super(props); this.state = { error: null }; }
    static getDerivedStateFromError(e) { return { error: e }; }
    render() {
      if (this.state.error) {
        return (
          <div style={{ padding: 48, color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-body)' }}>
            <p style={{ color: '#ef4444', marginBottom: 8 }}>Could not render results.</p>
            <pre style={{ fontSize: 12, opacity: 0.6 }}>{this.state.error.message}</pre>
          </div>
        );
      }
      return this.props.children;
    }
  }

  /* ── Results viewer overlay ─────────────────────────────── */
  function ResultsViewer({ row, onClose }) {
    React.useEffect(() => {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = prev; };
    }, []);

    // Normalise scoring — handle legacy field names from early test submissions
    const tierMap = { tier1: 'one', tier2: 'two', tier3: 'three' };
    const rawScoring = row.scoring;
    const scoring = {
      ...rawScoring,
      tier:        tierMap[rawScoring.tier] || rawScoring.tier,
      blockScores: rawScoring.blockScores || rawScoring.blocks || { A: 0, B: 0, C: 0, D: 0 },
    };

    return (
      <div className="adm-viewer">
        {/* Top bar — hidden in print */}
        <div className="adm-viewer-bar no-print">
          <button className="adm-back" onClick={onClose}>← All submissions</button>
          <div className="adm-viewer-meta">
            <span>
              {row.contact.first} &middot; {row.contact.email} &middot; {row.contact.phone}
            </span>
            <button className="cb-btn adm-pdf-btn" onClick={() => window.print()}>
              Download PDF ↓
            </button>
          </div>
        </div>

        {/* Full results page — same as what the user saw */}
        <div className="adm-viewer-body">
          <ResultsErrorBoundary>
            <ResultsScreen
              scoring={scoring}
              contact={row.contact}
              onRestart={onClose}
            />
          </ResultsErrorBoundary>
        </div>
      </div>
    );
  }

  /* ── App shell ──────────────────────────────────────────── */
  function AdminApp() {
    const [authed,  setAuthed]  = React.useState(false);
    const [rows,    setRows]    = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [viewing, setViewing] = React.useState(null);

    // Resume session on page load
    React.useEffect(() => {
      sb.auth.getSession().then(({ data }) => {
        if (data.session) { setAuthed(true); load(); }
      });
    }, []);

    async function load() {
      setLoading(true);
      const { data, error } = await sb
        .from('submissions')
        .select('*')
        .order('created_at', { ascending: false });
      if (!error) setRows(data || []);
      setLoading(false);
    }

    async function signOut() {
      await sb.auth.signOut();
      setAuthed(false); setRows([]); setViewing(null);
    }

    async function deleteRow(id) {
      if (!window.confirm('Delete this submission? This cannot be undone.')) return;
      // .select('id') forces Supabase to return the deleted row(s);
      // an empty array means RLS blocked the delete (e.g. expired session).
      const { data, error } = await sb
        .from('submissions')
        .delete()
        .eq('id', id)
        .select('id');
      if (error) {
        console.error('[Admin] Delete error:', error);
        alert('Delete failed: ' + error.message + '\n\nTry signing out and back in.');
        return;
      }
      if (!data || data.length === 0) {
        console.warn('[Admin] Delete returned no rows — session may have expired. Re-fetching from DB.');
        // Sign out and force a fresh login so the session is valid
        await sb.auth.signOut();
        setAuthed(false);
        setRows([]);
        alert('Your session expired. Please sign in again and retry the delete.');
        return;
      }
      setRows(prev => prev.filter(r => r.id !== id));
    }

    if (!CONFIGURED) {
      return (
        <div className="adm-login-wrap">
          <div className="adm-login-card">
            <img src="assets/codebreak-logo.png" alt="Codebreak" className="adm-logo" />
            <h1 className="adm-login-h">Almost ready.</h1>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-body)', lineHeight: 1.6, margin: 0 }}>
              Open <code style={{ color: 'var(--cb-yellow)', background: 'rgba(255,232,0,0.1)', padding: '2px 6px' }}>admin.jsx</code> and
              replace <code style={{ color: 'var(--cb-yellow)', background: 'rgba(255,232,0,0.1)', padding: '2px 6px' }}>SUPABASE_URL</code> and <code style={{ color: 'var(--cb-yellow)', background: 'rgba(255,232,0,0.1)', padding: '2px 6px' }}>SUPABASE_ANON_KEY</code> with
              your values from Supabase → Project Settings → API.
            </p>
          </div>
        </div>
      );
    }

    if (!authed) {
      return <AdminLogin onLogin={() => { setAuthed(true); load(); }} />;
    }

    if (viewing) {
      return <ResultsViewer row={viewing} onClose={() => setViewing(null)} />;
    }

    return (
      <div className="adm-wrap">
        <header className="adm-header no-print">
          <img src="assets/codebreak-logo.png" alt="Codebreak" style={{ height: 18 }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: 13 }}>
              {rows.length} submission{rows.length !== 1 ? 's' : ''}
            </span>
            <button className="adm-signout" onClick={signOut}>Sign out</button>
          </div>
        </header>

        <main className="adm-main">
          {loading ? (
            <p className="adm-loading">Loading…</p>
          ) : (
            <>
              <StatsBar rows={rows} />
              <SubmissionsTable rows={rows} onView={setViewing} onDelete={deleteRow} />
            </>
          )}
        </main>
      </div>
    );
  }

  ReactDOM.createRoot(document.getElementById('admin-root')).render(<AdminApp />);

})();
