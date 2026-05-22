/* eslint-disable */
/* QuizScreen — one question per viewport */

function ProgressBar({ current, total }) {
  const pct = Math.round((current / total) * 100);
  const microcopy = window.PROGRESS_COPY[current] || window.PROGRESS_COPY.default;
  return (
    <div className="quiz-progress">
      <div className="quiz-progress-row">
        <span><span className="num">Question {current} of {total}</span></span>
        <span className="keep">{microcopy}</span>
      </div>
      <div className="quiz-progress-bar" role="progressbar" aria-valuenow={current} aria-valuemin={1} aria-valuemax={total}>
        <div className="quiz-progress-fill" style={{ width: pct + '%' }}></div>
      </div>
    </div>
  );
}

function QuizScreen({ onComplete, onBack, initialAnswers }) {
  const total = window.QUESTIONS.length;
  const [idx, setIdx] = React.useState(() => {
    // If resuming, start at the furthest answered question + 1
    if (initialAnswers && Object.keys(initialAnswers).length > 0) {
      const answered = window.QUESTIONS.filter(q => initialAnswers[q.id] != null);
      const lastIdx = window.QUESTIONS.findIndex(q => q.id === answered[answered.length - 1]?.id);
      return Math.min(lastIdx + 1, total - 1);
    }
    return 0;
  });
  const [answers, setAnswers] = React.useState(initialAnswers || {});
  const [direction, setDirection] = React.useState('fwd');
  const [pendingIdx, setPendingIdx] = React.useState(null);

  const q = window.QUESTIONS[idx];
  const block = window.BLOCKS[q.block];

  // Auto-skip handling (Q13 when Q12 = "never used an agency")
  React.useEffect(() => {
    if (!q.skipIfPriorOption) return;
    if (pendingIdx !== null) return;
    if (answers[q.id] != null) return; // already answered
    const { qId, flag, autoSelect } = q.skipIfPriorOption;
    const priorIdx = answers[qId];
    if (priorIdx == null) return;
    const priorQ = window.QUESTIONS.find(qq => qq.id === qId);
    const priorOpt = priorQ && priorQ.options[priorIdx];
    if (priorOpt && priorOpt[flag]) {
      const t = setTimeout(() => pick(autoSelect), 60);
      return () => clearTimeout(t);
    }
  }, [idx, answers, pendingIdx]); // eslint-disable-line

  function pick(optionIdx) {
    if (pendingIdx !== null) return;
    const next = { ...answers, [q.id]: optionIdx };
    setAnswers(next);
    setPendingIdx(optionIdx);

    // Analytics
    window.cbTrack && window.cbTrack('question_answered', {
      question_id: q.id,
      option_index: optionIdx,
      block: q.block,
      question_number: idx + 1,
    });

    setTimeout(() => {
      if (idx === total - 1) {
        onComplete(next);
      } else {
        setDirection('fwd');
        setIdx(idx + 1);
        setPendingIdx(null);
      }
    }, 360);
  }

  function goBack() {
    if (idx === 0) { onBack && onBack(); return; }
    setDirection('back');
    setIdx(idx - 1);
    setPendingIdx(null);
  }

  return (
    <div className="cb-page fit">
      <header className="cb-topbar">
        <img src="assets/codebreak-logo.png" alt="Codebreak" />
      </header>

      <main className="quiz-stage">
        <ProgressBar current={idx + 1} total={total} />

        <div key={idx} className={direction === 'fwd' ? 'q-anim-fwd' : 'q-anim-back'}>
          <div className="quiz-block-label">
            Block {q.block} <span className="dot">·</span> {block.name}
          </div>
          <h1 className="quiz-question">{q.text}</h1>

          <div className="quiz-options" role="group" aria-label="Answer options">
            {q.options.map((opt, i) => {
              const selected = pendingIdx === i || (pendingIdx === null && answers[q.id] === i);
              return (
                <button
                  key={i}
                  className={'quiz-opt' + (selected ? ' selected' : '')}
                  onClick={() => pick(i)}
                  disabled={pendingIdx !== null}
                  aria-pressed={selected}
                >
                  <span className="opt-tag" aria-hidden="true">{String.fromCharCode(65 + i)}</span>
                  <span>{opt.text}</span>
                </button>
              );
            })}
          </div>

          <button className="quiz-back" onClick={goBack}>
            ← {idx === 0 ? 'Back' : 'Previous question'}
          </button>
        </div>
      </main>
      <footer className="cb-copyright">
        © 2026 Codebreak Group Ltd
        <LegalFooter dark={true} />
      </footer>
    </div>
  );
}

window.QuizScreen = QuizScreen;
