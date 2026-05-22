/* eslint-disable */
/* IntroScreen, GateScreen, CalcScreen, LegalFooter */

function LegalFooter({ dark }) {
  return (
    <div className={'legal-footer' + (dark ? ' legal-footer-dark' : '')}>
      <p>This marketing health check is provided by Codebreak Group Ltd for general informational purposes only. Your results are based on the answers you provide and should not be treated as financial, legal, advertising, or business advice.</p>
      <p>By submitting this quiz, you agree that Codebreak Group Ltd may process your information to provide your results and respond to your enquiry. Where you opt in, we may also contact you with marketing insights, offers, and updates. You can unsubscribe at any time. Please read our <a href="https://www.codebreak.co.uk/privacy-policy/" target="_blank" rel="noreferrer">Privacy Policy</a> for details about how we use and protect your data.</p>
      <p>This site is not part of, endorsed by, sponsored by, administered by, or otherwise affiliated with Meta Platforms, Inc., Facebook, Instagram, Google LLC, or YouTube. Meta, Facebook, Instagram, Google, and YouTube are trademarks of their respective owners.</p>
      <p><button className="ck-settings-link" onClick={() => window.openCookieSettings && window.openCookieSettings()}>Cookie settings</button></p>
    </div>
  );
}

window.LegalFooter = LegalFooter;

function IntroScreen({ onStart }) {
  return (
    <div className="cb-page fit">
      <img src="assets/dino-watermark-grey.png" alt="" className="cb-dino-bg"
        style={{ right: '-15%', bottom: '-10%', width: '60%', opacity: 0.04 }} />
      <header className="cb-topbar">
        <img src="assets/codebreak-logo.png" alt="Codebreak" />
      </header>

      <main className="intro-wrap">
        <div className="intro-inner">
          <h1 className="intro-h1">
            Is your marketing<br/>actually <span className="accent">working,</span><br/>or just costing you money?
          </h1>
          <p className="intro-lede">
            Answer 20 questions about your marketing, your spend, and your business. Get a scored breakdown that shows you exactly where you're strong, where you're leaking, and what to fix first.
          </p>

          <button className="cb-btn" onClick={onStart}>
            Start the health check <span className="arrow">→</span>
          </button>

          <p className="intro-trust">
            <strong>Over 500 UK service business founders have taken this.</strong> Most are surprised by what they find.
          </p>
          <p className="intro-reassure">
            No sign-up needed until you see your results. Your details stay with us, no spam, no hard sell.
          </p>
        </div>
      </main>
      <footer className="cb-copyright">
        © 2026 Codebreak Group Ltd
        <LegalFooter dark={true} />
      </footer>
    </div>
  );
}

function GateScreen({ onSubmit, onBack }) {
  const [first, setFirst] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [errors, setErrors] = React.useState({});

  function validate() {
    const e = {};
    if (!first.trim()) e.first = 'We need a first name.';
    if (!email.trim()) e.email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'That email doesn\'t look right.';
    if (!phone.trim()) e.phone = 'Phone is required.';
    else if (phone.replace(/\D/g, '').length < 7) e.phone = 'Phone looks too short.';
    return e;
  }

  function submit(ev) {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length === 0) {
      onSubmit({ first: first.trim(), email: email.trim(), phone: phone.trim() });
    }
  }

  return (
    <div className="cb-page fit">
      <img src="assets/dino-watermark-grey.png" alt="" className="cb-dino-bg"
        style={{ left: '-20%', top: '-5%', width: '70%', opacity: 0.03 }} />
      <header className="cb-topbar">
        <img src="assets/codebreak-logo.png" alt="Codebreak" />
      </header>

      <main className="gate-wrap">
        <div className="gate-inner">
          <button className="gate-back" type="button" onClick={onBack}>← Previous question</button>
          <h1 className="gate-h1">Your results are ready.</h1>
          <p className="gate-sub">
            We've scored your marketing across four areas. Enter your details below and we'll show you exactly where you stand, what's working, what's leaking, and what to fix first.
          </p>

          <form className="gate-fields" onSubmit={submit} noValidate>
            <div className={'gate-field' + (errors.first ? ' err' : '')}>
              <label htmlFor="g-first">First name</label>
              <input id="g-first" type="text" value={first} onChange={e => setFirst(e.target.value)}
                placeholder="Joel" autoComplete="given-name" />
              {errors.first && <span className="errmsg">{errors.first}</span>}
            </div>
            <div className={'gate-field' + (errors.email ? ' err' : '')}>
              <label htmlFor="g-email">Email address</label>
              <input id="g-email" type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="joel@yourcompany.co.uk" autoComplete="email" />
              {errors.email && <span className="errmsg">{errors.email}</span>}
            </div>
            <div className={'gate-field' + (errors.phone ? ' err' : '')}>
              <label htmlFor="g-phone">Phone number</label>
              <input id="g-phone" type="tel" value={phone} onChange={e => setPhone(e.target.value)}
                placeholder="07xxx xxx xxx" autoComplete="tel" />
              {errors.phone && <span className="errmsg">{errors.phone}</span>}
            </div>

            <button type="submit" className="cb-btn block" style={{ marginTop: 8 }}>
              Show me my results <span className="arrow">→</span>
            </button>
          </form>
          <p className="gate-note">
            By submitting your details you agree to Codebreak using your information for marketing purposes.
          </p>
        </div>
      </main>
      <footer className="cb-copyright">
        © 2026 Codebreak Group Ltd
        <LegalFooter dark={true} />
      </footer>
    </div>
  );
}

function CalcScreen() {
  return (
    <div className="cb-page fit">
      <header className="cb-topbar">
        <img src="assets/codebreak-logo.png" alt="Codebreak" />
      </header>
      <main className="calc-wrap">
        <div className="calc-bars">
          <i></i><i></i><i></i><i></i><i></i>
        </div>
        <h2 className="calc-h">Calculating your score...</h2>
      </main>
      <footer className="cb-copyright">
        © 2026 Codebreak Group Ltd
        <LegalFooter dark={true} />
      </footer>
    </div>
  );
}

window.IntroScreen = IntroScreen;
window.GateScreen  = GateScreen;
window.CalcScreen  = CalcScreen;
