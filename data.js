/* ============================================================
   CODEBREAK MARKETING HEALTH CHECK, DATA
   ============================================================
   20 questions across 4 blocks (A–D), 5 questions each.
   Question, option, and scoring copy taken verbatim from
   Joel's content document.
   ============================================================ */

window.QUESTIONS = [
  /* ===== BLOCK A, Measurement & Attribution (Q1–5) ===== */
  {
    id: 'q1',
    block: 'A',
    text: 'Do you know what it costs you to acquire a new customer right now?',
    options: [
      { text: 'Yes, I know it to within about 10%.',           score: 5 },
      { text: 'I have a rough ballpark but it’s not precise.',  score: 3 },
      { text: 'Not really, I’d have to dig for it.',           score: 1 },
      { text: 'No idea.',                                       score: 0 },
    ],
  },
  {
    id: 'q2',
    block: 'A',
    text: 'How do you track leads from the moment they first get in touch to when they become a paying customer?',
    options: [
      { text: 'A proper CRM, every lead is logged and tracked.',  score: 5 },
      { text: 'A spreadsheet, it’s manual but I keep on top of it.', score: 3 },
      { text: 'Email inbox and memory, mostly.',                 score: 1, flags: ['no_crm'] },
      { text: 'We don’t really track them.',                     score: 0, flags: ['no_crm'] },
    ],
  },
  {
    id: 'q3',
    block: 'A',
    text: 'Can you say with confidence where your last ten customers actually came from?',
    options: [
      { text: 'Yes, I know exactly which channel brought each one in.', score: 5 },
      { text: 'Most of them, word of mouth is harder to trace.',        score: 3 },
      { text: 'A few of them, the rest is a guess.',                    score: 1 },
      { text: 'Honestly, I couldn’t tell you.',                          score: 0 },
    ],
  },
  {
    id: 'q4',
    block: 'A',
    text: 'Do you have call tracking set up so you can tell which marketing channel is generating your phone enquiries?',
    options: [
      { text: 'Yes, calls are tracked back to their source.',        score: 5 },
      { text: 'No, but most of our enquiries come in another way.',  score: 2 },
      { text: 'No, and a lot of our leads do call us.',              score: 0 },
      { text: 'I didn’t know that was a thing.',                      score: 0 },
    ],
  },
  {
    id: 'q5',
    block: 'A',
    text: 'When a new enquiry comes in, how quickly does someone from your business get back to them?',
    options: [
      { text: 'Within five minutes, we’re on it immediately.',  score: 5 },
      { text: 'Within the hour, usually.',                       score: 3 },
      { text: 'Same day.',                                       score: 1, flags: ['slow_lead'] },
      { text: 'When we get to it, next day sometimes.',         score: 0, flags: ['slow_lead'] },
    ],
  },

  /* ===== BLOCK B, Offer, Website & Conversion (Q6–10) ===== */
  {
    id: 'q6',
    block: 'B',
    text: 'If someone asked you right now what your business does and who it’s for, could you answer in one sentence, including the outcome, who it’s for, and roughly what it costs?',
    options: [
      { text: 'Yes, one sentence, right now, no problem.',                  score: 5 },
      { text: 'Roughly, it depends on the client so it varies.',            score: 2 },
      { text: 'It’s complicated, we do a lot of different things.',         score: 1 },
      { text: 'Not really, I’ve never put it quite like that.',             score: 0 },
    ],
  },
  {
    id: 'q7',
    block: 'B',
    text: 'Do you know what percentage of your website visitors actually get in touch with you?',
    options: [
      { text: 'Yes, I know the number and I keep an eye on it.',  score: 5 },
      { text: 'I have a rough idea.',                              score: 2 },
      { text: 'I’ve never actually checked.',                      score: 0 },
      { text: 'I didn’t know websites had a conversion rate.',     score: 0 },
    ],
  },
  {
    id: 'q8',
    block: 'B',
    text: 'How old is your current website?',
    options: [
      { text: 'Under two years old.',           score: 5 },
      { text: 'Two to four years old.',         score: 3 },
      { text: 'Five years old or more.',        score: 1, flags: ['old_website'] },
      { text: 'I’m honestly not sure.',         score: 0, flags: ['old_website'] },
    ],
  },
  {
    id: 'q9',
    block: 'B',
    text: 'When someone clicks one of your adverts, where do they land?',
    options: [
      { text: 'A dedicated landing page built for that specific ad.', score: 5 },
      { text: 'The most relevant service page on our website.',       score: 3 },
      { text: 'Our homepage.',                                        score: 0 },
      { text: 'We’re not currently running any ads.',                 score: 1 },
    ],
  },
  {
    id: 'q10',
    block: 'B',
    text: 'How many Google reviews do you have, and when did the last one come in?',
    options: [
      { text: '50 or more, with at least one in the last few weeks.',  score: 5 },
      { text: 'Between 20 and 50, reasonably recent.',                 score: 3 },
      { text: 'Under 20, or the last one was months ago.',             score: 1 },
      { text: 'Barely any.',                                           score: 0 },
    ],
  },

  /* ===== BLOCK C, Spend, Channels & History (Q11–15) ===== */
  {
    id: 'q11',
    block: 'C',
    text: 'What do you currently spend each month going directly to advertising platforms, Google, Meta, and similar? Not including agency fees.',
    options: [
      { text: '£10,000 a month or more.',                       score: 5 },
      { text: '£2,000 to £10,000 a month.',                     score: 4 },
      { text: '£500 to £2,000 a month.',                        score: 2, flags: ['low_spend_mid'] },
      { text: 'Under £500 a month, or nothing at all.',         score: 0, flags: ['low_spend_low'] },
    ],
  },
  {
    id: 'q12',
    block: 'C',
    text: 'Have you worked with a marketing agency before?',
    options: [
      { text: 'Yes, and it worked well.',                          score: 5 },
      { text: 'Yes, mixed results, some good some not.',           score: 3 },
      { text: 'Yes, and it was a bad experience.',                 score: 2 },
      { text: 'No, never used one.',                               score: 2, neverUsed: true },
    ],
  },
  {
    id: 'q13',
    block: 'C',
    text: 'If you’ve worked with an agency before, which of these best describes how it ended up?',
    skipIfPriorOption: { qId: 'q12', flag: 'neverUsed', autoSelect: 4 },
    options: [
      { text: 'They delivered, we moved on for unrelated reasons.',                 score: 5 },
      { text: 'Monthly reports full of impressions. Phone never rang.',              score: 2 },
      { text: 'Promised leads, delivered excuses, and we were locked in.',           score: 1 },
      { text: 'Junior account manager, impossible to reach, no real strategy.',      score: 1 },
      { text: 'Haven’t worked with one, skip this.',                                score: 3 },
    ],
  },
  {
    id: 'q14',
    block: 'C',
    text: 'Do you own your own advertising accounts, Google Ads, Meta Business Manager, your Google Business Profile?',
    options: [
      { text: 'Yes, everything is in my name, I have full access.',              score: 5 },
      { text: 'Most of them, I’m not 100% sure about all of them.',              score: 2, flags: ['no_ownership'] },
      { text: 'No, the agency set them up and manages them.',                    score: 0, flags: ['no_ownership'] },
      { text: 'I’ve never run paid ads.',                                         score: 3 },
    ],
  },
  {
    id: 'q15',
    block: 'C',
    text: 'Roughly what percentage of your annual turnover do you invest in marketing, including ad spend, agency fees, and tools?',
    options: [
      { text: 'Eight percent or more.',     score: 5 },
      { text: 'Five to eight percent.',     score: 4 },
      { text: 'Two to five percent.',       score: 2 },
      { text: 'Under two percent.',         score: 0 },
    ],
  },

  /* ===== BLOCK D, Scale Readiness (Q16–20) ===== */
  {
    id: 'q16',
    block: 'D',
    text: 'How long have you been consistently profitable, not just busy, but actually banking profit month after month?',
    options: [
      { text: 'More than two years, it’s solid.',          score: 5 },
      { text: 'Between one and two years.',                 score: 4 },
      { text: 'Six to twelve months, it’s been up and down.', score: 2 },
      { text: 'Under six months, or it’s inconsistent.',    score: 0, flags: ['profit_instability'] },
    ],
  },
  {
    id: 'q17',
    block: 'D',
    text: 'If your enquiries doubled overnight, could your business handle it, or would things start breaking?',
    options: [
      { text: 'Yes, we have capacity and we’re ready for it.',     score: 5 },
      { text: 'Mostly, we’d need to hire one person fairly quickly.', score: 3 },
      { text: 'It’d be tight, we’d struggle.',                     score: 1, flags: ['capacity'] },
      { text: 'Honestly, we’d break.',                              score: 0, flags: ['capacity'] },
    ],
  },
  {
    id: 'q18',
    block: 'D',
    text: 'What percentage of your qualified enquiries, people who are a genuine fit for what you do, actually become paying customers?',
    options: [
      { text: 'Over 50%, we close most of the right ones.',  score: 5 },
      { text: '30 to 50%, solid, room to improve.',          score: 4 },
      { text: '15 to 30%, it varies a lot.',                 score: 2 },
      { text: 'Under 15%, or I don’t actually track this.',   score: 0, flags: ['low_close'] },
    ],
  },
  {
    id: 'q19',
    block: 'D',
    text: 'How long are you prepared to give a marketing investment before you decide whether it’s working?',
    options: [
      { text: 'Twelve months or more, I understand it takes time.',  score: 5 },
      { text: 'Six to twelve months, I’m realistic about it.',       score: 4 },
      { text: 'Three to six months, I’d want to see progress by then.', score: 2 },
      { text: 'Under three months, I need to see results fast.',     score: 0 },
    ],
  },
  {
    id: 'q20',
    block: 'D',
    text: 'Last one. Which of these best describes how you feel about your marketing right now?',
    isQ20: true,
    options: [
      { text: 'Ready to scale, the foundations are there, I want growth.',        score: 5, q20Key: 'ready' },
      { text: 'Growing, but I want a proper system behind it.',                    score: 4, q20Key: 'growing' },
      { text: 'Spending money but I’m not sure what’s working.',                   score: 2, q20Key: 'spending_blind' },
      { text: 'Been burned before and I’m cautious, but open.',                   score: 2, q20Key: 'burned' },
      { text: 'Feast or famine, busy one month, dead the next.',                  score: 1, q20Key: 'feast_famine' },
    ],
  },
];

/* ============================================================
   BLOCK METADATA
   ============================================================ */
window.BLOCKS = {
  A: { name: 'Measurement & Attribution',  short: 'You can see what’s working.' },
  B: { name: 'Offer, Website & Conversion', short: 'Traffic has somewhere worth landing.' },
  C: { name: 'Spend, Channels & History',   short: 'You’re fuelling the engine.' },
  D: { name: 'Scale Readiness',             short: 'The business can handle growth.' },
};

/* ============================================================
   SCORING
   ============================================================ */
window.scoreFromAnswers = function(answers) {
  // answers: { q1: 0, q2: 2, ... } where value is the option index
  const blockScores = { A: 0, B: 0, C: 0, D: 0 };
  const flags = new Set();
  let q20Key = null;

  for (const q of window.QUESTIONS) {
    const idx = answers[q.id];
    if (idx == null) continue;
    const opt = q.options[idx];
    if (!opt) continue;
    blockScores[q.block] += opt.score;
    if (opt.flags) opt.flags.forEach(f => flags.add(f));
    if (q.isQ20) q20Key = opt.q20Key;
  }

  const total = blockScores.A + blockScores.B + blockScores.C + blockScores.D;
  let tier;
  if (total >= 75)      tier = 'one';
  else if (total >= 50) tier = 'two';
  else                  tier = 'three';

  return { total, blockScores, tier, q20Key, flags: Array.from(flags) };
};

/* Block band, green/amber/red */
window.bandForBlock = function(score) {
  if (score >= 20) return 'high';
  if (score >= 12) return 'mid';
  return 'low';
};

/* ============================================================
   PROGRESS MICROCOPY
   ============================================================ */
window.PROGRESS_COPY = {
  default: 'Keep going',
  5:  'A quarter of the way through, keep going.',
  10: 'Halfway. The next section is where most founders find the gaps.',
  15: 'Nearly there. This last section is the most important one.',
  19: 'One more after this.',
  20: 'Last question. Your results are almost ready.',
};
