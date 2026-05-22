/* eslint-disable */
/* ResultsScreen */

function Gauge({ score, max = 100 }) {
  const size = 220;
  const stroke = 14;
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const arcSpan = 0.78;
  const arcLen = circ * arcSpan;
  const [animated, setAnimated] = React.useState(0);
  const [displayNum, setDisplayNum] = React.useState(0);

  React.useEffect(() => {
    // Honour prefers-reduced-motion
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setDisplayNum(score);
      setAnimated(1);
      return;
    }
    let raf;
    const start = performance.now();
    const dur = 1400;
    function tick(t) {
      const k = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - k, 3);
      setDisplayNum(Math.round(score * eased));
      setAnimated(eased);
      if (k < 1) raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [score]);

  const dashOffset = arcLen - (animated * (score / max) * arcLen);
  const rot = -90 - (arcSpan * 180);

  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg className="gauge-svg" width={size} height={size} role="img" aria-label={`Score: ${score} out of ${max}`}>
        <g transform={`rotate(${rot} ${size/2} ${size/2})`}>
          <circle
            className="gauge-track"
            cx={size/2} cy={size/2} r={r}
            fill="none"
            strokeWidth={stroke}
            strokeDasharray={`${arcLen} ${circ}`}
            strokeLinecap="butt"
          />
          <circle
            className="gauge-fill"
            cx={size/2} cy={size/2} r={r}
            fill="none"
            strokeWidth={stroke}
            strokeDasharray={`${arcLen} ${circ}`}
            strokeDashoffset={dashOffset}
            strokeLinecap="butt"
          />
        </g>
      </svg>
      <div className="gauge-center" aria-hidden="true">
        <span className="gauge-number">{displayNum}</span>
        <span className="gauge-suffix">out of {max}</span>
      </div>
    </div>
  );
}

function BlockSection({ block, score, detail }) {
  const band = window.bandForBlock(score);
  const statusClass = band === 'high' ? 'status-high' : band === 'mid' ? 'status-mid' : 'status-low';
  const fillClass   = band === 'high' ? 'fill-high'   : band === 'mid' ? 'fill-mid'   : 'fill-low';
  const pct = Math.round((score / 25) * 100);

  return (
    <section className="block-section">
      <div className="block-head">
        <div className="block-meta">
          <div className="blkletter">Block {block.letter}</div>
          <h2 className="blkname">{block.name}</h2>
        </div>
        <div className={'blkscore ' + statusClass} aria-label={`${score} out of 25`}>
          {score}<span className="of">/25</span>
        </div>
      </div>
      <div className="blkbar" role="progressbar" aria-valuenow={score} aria-valuemin={0} aria-valuemax={25}>
        <i className={fillClass} style={{ width: pct + '%' }}></i>
      </div>
      <div className="block-copy">
        {detail.map((p, i) => <p key={i}>{p}</p>)}
      </div>
    </section>
  );
}

function FlagAlert({ flag }) {
  const copy = window.FLAG_COPY[flag];
  if (!copy) return null;
  return (
    <div className="flag-alert" role="alert">
      <div className="flag-meta">
        <span className="flag-icon" aria-hidden="true">!</span>
        <span className="flag-label">Flag</span>
      </div>
      <div className="flag-content">
        <h4>{copy.title}</h4>
        <p>{copy.body}</p>
      </div>
    </div>
  );
}

function ResultsScreen({ scoring, contact, onRestart }) {
  const { total, blockScores, tier, q20Key, flags } = scoring;
  const tierMeta = window.TIER_LABELS[tier];
  const opener = window.openingLine(tier, q20Key);
  const commentary = window.TIER_COMMENTARY[tier];
  const cta = window.TIER_CTA[tier];

  const blockEntries = ['A','B','C','D'].map(letter => {
    const meta = window.BLOCKS[letter];
    const sc = blockScores[letter];
    return {
      letter,
      name: meta.name,
      score: sc,
      detail: window.blockCommentary(tier, letter, sc),
    };
  });

  function openBooking() {
    // Fire analytics event
    window.cbTrack && window.cbTrack('cta_clicked', { tier, total });

    // Build Calendly URL with contact pre-filled.
    // name + email are standard Calendly fields.
    // Phone goes via a custom question param — a1 = first custom question on the event.
    // If phone sits in a different position, change a1 to a2, a3, etc.
    const base = (window.CONFIG && window.CONFIG.calendlyUrl) || 'https://calendly.com/codebreak/30-minute-follow-up-chat';
    const params = new URLSearchParams({
      name: contact.first,
      email: contact.email,
      a1: contact.phone,
    });
    window.open(base + '?' + params.toString(), '_blank', 'noopener');
  }

  return (
    <div className="results-page cb-page scroll">
      <header className="cb-topbar dark">
        <img src="assets/codebreak-logo.png" alt="Codebreak" />
      </header>

      {/* HERO */}
      <section className="results-hero">
        <img src="assets/dino-watermark-grey.png" className="dino-bg" alt="" />
        <div className="results-hero-inner">
          <div className="results-eyebrow">Results for {contact.first}</div>
          <div className="hero-grid">
            <div className="hero-gauge">
              <Gauge score={total} max={100} />
            </div>
            <div className="hero-text">
              <div className="tier-line" style={{ color: tierMeta.color }}>
                <span className="tier-bar" style={{ background: tierMeta.color }}></span>
                {tierMeta.name}
              </div>
              <h1 className="tier-name">{tierMeta.name}</h1>
            </div>
          </div>
        </div>
      </section>

      {/* BODY: opener + commentary + blocks + flags */}
      <section className="results-body">
        <div className="results-wrap">

          <div className="opener-flow">
            <p className="opener-line">{opener}</p>
            <div className="commentary">
              {commentary.map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </div>

          <div className="blocks-flow">
            {blockEntries.map(b => (
              <BlockSection
                key={b.letter}
                block={{ letter: b.letter, name: b.name }}
                score={b.score}
                detail={b.detail}
              />
            ))}
          </div>

          {flags.length > 0 && (
            <div className="flags-flow">
              {flags.map(f => <FlagAlert key={f} flag={f} />)}
            </div>
          )}

        </div>
      </section>

      {/* CTA */}
      <section className="cta-panel">
        <img src="assets/dino-watermark-grey.png" className="dino-bg" alt="" />
        <div className="cta-panel-inner">
          <h3>{cta.headline}</h3>
          <p className="cta-body">{cta.body}</p>
          <button className="cb-btn" onClick={openBooking}>
            {cta.button} <span className="arrow">→</span>
          </button>
          <p className="cta-note">{cta.note}</p>
        </div>
      </section>

      <div className="results-tail">
        <button className="results-restart" onClick={onRestart}>
          ← Retake the check
        </button>
        <div className="results-copyright">
          © 2026 Codebreak Group Ltd<span className="dot">·</span><a href="https://codebreak.co.uk" target="_blank" rel="noreferrer">codebreak.co.uk</a>
        </div>
        <LegalFooter dark={false} />
      </div>
    </div>
  );
}

window.ResultsScreen = ResultsScreen;
