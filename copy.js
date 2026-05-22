/* ============================================================
   CODEBREAK MARKETING HEALTH CHECK, RESULTS COPY
   ============================================================
   All copy is taken verbatim from the content document.
   Keyed by tier (one/two/three), q20 key, block + band.
   ============================================================ */

/* ============================================================
   OPENING LINES, tier + q20 answer
   ============================================================ */
window.TIER_OPENERS = {
  one: {
    ready:           'You said you’re ready to scale. Your results back that up.',
    growing:         'You said you want a proper system behind the growth. Your results say you’re in the right position to build one.',
    spending_blind:  'You said you’re not sure what’s working. That’s worth looking at, but your overall score is stronger than you probably expected.',
    burned:          'You said you’ve been burned before. Your score suggests that wasn’t entirely your fault, and that you’re closer to ready than you probably feel.',
    feast_famine:    'You said it’s feast or famine. Your score is stronger than most, which means the inconsistency is fixable, and probably faster than you think.',
    _default:        'Your score puts you in the top tier of businesses we see come through this. That’s not flattery, it’s what the numbers say.',
  },
  two: {
    spending_blind:  'You said you’re spending but you don’t know what’s working. Your results show why, and the fix is more straightforward than it probably feels.',
    burned:          'You said you’ve been burned and you’re cautious. That’s a reasonable place to be. Your results show you’re closer to ready than you probably feel.',
    feast_famine:    'You said it’s feast or famine. Your results show the specific gaps creating that pattern, and they’re fixable.',
    ready:           'Your score is in solid territory, closer than most. There are a few specific things holding it back, and they’re worth addressing before you scale the spend.',
    growing:         'Your score is in solid territory, closer than most. There are a few specific things holding it back, and they’re worth addressing before you scale the spend.',
    _default:        'Your score is in solid territory, closer than most. There are a few specific things holding it back, and they’re worth addressing before you scale the spend.',
  },
  three: {
    feast_famine:    'You said it’s feast or famine. Your results show why, and it’s not what most people think.',
    burned:          'You said you’ve been burned before. Your results suggest the problem may not have been entirely the agency’s fault, and that’s actually useful information.',
    spending_blind:  'You said you’re spending but you don’t know what’s working. Your results explain why, there are some specific gaps here that would make any marketing difficult to measure, let alone improve.',
    _default:        'Your score puts you in a position worth being honest about. You’re not ready to scale yet, but the path from here is clearer than it probably feels.',
  },
};

/* ============================================================
   TIER OVERALL COMMENTARY
   ============================================================ */
window.TIER_COMMENTARY = {
  one: [
    'You’ve built something solid.',
    'Most founders who come through this are surprised to find gaps they didn’t expect. You’re the other kind, the score reflects a business with real foundations. You know your numbers, your website is working, and you’re spending at a level where paid media can actually produce something meaningful.',
    'The question now isn’t whether marketing can work for you. It’s how fast you want to move, and whether the systems behind the growth are built to handle what’s coming.',
    'This is a good conversation to be having.',
  ],
  two: [
    'You’ve got most of the pieces.',
    'The business is real, there’s revenue behind it, and you’re thinking seriously about growth, otherwise you wouldn’t be here.',
    'But there are gaps. Not catastrophic ones. Specific, fixable ones.',
    'The problem with scaling when these gaps exist isn’t that it won’t work at all. It’s that it’ll work at maybe half the efficiency it should. You’ll spend twice as much to get the same result. That’s not a marketing problem, it’s a foundations problem.',
    'The good news is that most founders in your position are one or two fixes away from being genuinely scale-ready. The question is whether you want to find those fixes now, or keep spending and wondering why the results aren’t quite there.',
  ],
  three: [
    'Here’s the honest version of your results.',
    'Scaling your marketing right now, before addressing a few specific things, would be like putting your foot down on the accelerator while the handbrake is still on. You’d spend more, stress more, and probably end up more convinced that marketing doesn’t work.',
    'It does work. But only when the foundations are there.',
    'The businesses that get the best results aren’t always the biggest or the most sophisticated. They’re the ones who were honest enough to fix what needed fixing before they scaled. That honesty is a strength, not a failing.',
    'What your results show isn’t a problem. It’s a starting point.',
  ],
};

/* ============================================================
   BLOCK COMMENTARY, keyed by [tier][block][band]
   Each tier has its own variants where the brief provided one.
   Fallbacks: if a tier doesn't have a variant for a band,
   we walk to a neighbouring tier (low→tier2, then tier3).
   ============================================================ */
window.BLOCK_COMMENTARY = {
  /* ---- TIER ONE, high & mid commentary ---- */
  one: {
    A: {
      high: [
        'Your measurement setup is ahead of most. You know where your customers come from, your pipeline is tracked, and you can tell the difference between a channel that’s working and one that isn’t.',
        'That matters more than most founders realise. When attribution is clean, every decision sharpens, where to spend more, where to pull back, what’s performing and what’s theatre.',
        'One thing worth staying on top of: attribution drift. As campaigns scale, tracking breaks quietly. Make sure someone owns this actively, not just in theory.',
      ],
      mid: [
        'Your measurement is functional but there are gaps. You’ve got a picture, but it’s not sharp enough to make confident decisions at scale.',
        'The good news: this is fixable without a major overhaul. Tighten your CRM discipline, get call tracking in place if phone enquiries are part of your pipeline, and make sure your reporting is built around cost per customer, not cost per click.',
      ],
    },
    B: {
      high: [
        'Your conversion infrastructure is strong. Your offer is clear, your website is doing its job, and paid traffic has somewhere worth landing.',
        'This is the multiplier most businesses get wrong. The same ad budget on a weak website produces a fraction of the results it produces on a strong one. You’ve sorted this.',
        'Keep testing. Conversion rates drift as traffic volumes change. Small improvements here compound significantly over time.',
      ],
      mid: [
        'There’s some leakage in this block, not catastrophic, but it’s costing you leads you’ve already paid for.',
        'Whether it’s landing page quality, offer clarity, or review volume, something here is letting paid traffic escape before it converts. Conversion fixes are typically faster and cheaper than anything else in the marketing stack. Worth identifying and sorting before you turn up the spend.',
      ],
    },
    C: {
      high: [
        'You’re investing at a level where paid media can produce real data, and you own your accounts. You’ve got a realistic view of what marketing costs and what it takes to make it work.',
        'That’s rarer than it should be. Most founders we speak to are spending below the floor, locked out of their own accounts, or expecting twelve months of results from a three-month budget.',
        'You’re not any of those things. That means when we talk, it’s about growth, not groundwork.',
      ],
      mid: [
        'Spend and history tell a mixed story. There’s willingness here, but either the budget isn’t quite where it needs to be, or there’s some agency history that’s left a mark.',
        'If you’ve been burned before, that’s understandable, and it’s worth talking about before you commit to anything. We operate differently. No long contracts. You own every account from day one. The fee is a fixed line item, not a percentage of ad spend that scales with waste.',
      ],
    },
    D: {
      high: [
        'You’ve got the foundations. Consistent profitability, delivery capacity, a realistic view of how long this takes, and a close rate that means more leads will produce more revenue.',
        'This is what scale-ready actually looks like. Not just "we want to grow", but "we can handle growth and we’re prepared to back it."',
        'The next step is to look at where the fastest opportunity is and put a proper plan behind it.',
      ],
      mid: [
        'You’re close. There are one or two things that would make scaling more effective, whether that’s close rate, delivery capacity, or commitment horizon.',
        'None of it’s insurmountable. But it’s worth a frank conversation about what needs to be true before the throttle goes down, and how quickly you can get there.',
      ],
    },
  },

  /* ---- TIER TWO, low & mid commentary ---- */
  two: {
    A: {
      low: [
        'This is the most important thing to fix. Not because it’s the most visible problem, it isn’t, but because without it, everything else is guesswork.',
        'Right now you can’t reliably tell which marketing is producing customers and which is producing noise. That means you can’t optimise, you can’t hold anyone accountable, and you can’t make confident decisions about where to spend more.',
        'The fix isn’t complicated: a CRM that every lead goes into, call tracking if the phone is a primary enquiry channel, and clean reporting built around cost per customer. Done properly, this takes two to four weeks. Once it’s in place, every decision gets significantly sharper.',
      ],
      mid: [
        'Partially there, but incomplete. You’ve got enough visibility to feel like you know what’s happening, but probably not enough to make precise decisions when meaningful money is on the line.',
        'The gap between "roughly knowing" and "actually knowing" is bigger than it looks. Especially as spend increases.',
        'Priority: close the loop between your ad platforms and your CRM. Make sure phone enquiries trace back to source. And make sure whoever manages your marketing reports on cost per customer, not cost per click.',
      ],
    },
    B: {
      low: [
        'This is where a significant chunk of your ad spend is likely being lost right now.',
        'If your website isn’t converting, your offer isn’t clearly articulated, or paid traffic is landing on your homepage, you’re paying for visitors who arrive, look around, and leave. The ads aren’t failing. The destination is.',
        'The average UK service website converts at 2–3%. A well-built one converts at 18%+. That’s five or six times the enquiries from the same budget. Before scaling spend, this needs attention.',
      ],
      mid: [
        'There’s leakage here, probably not catastrophic, but meaningful.',
        'One thing worth identifying: where exactly are you losing people after the click? Landing page? Unclear offer? Not enough social proof? Usually it’s one of these three, and usually it’s fixable without rebuilding everything from scratch.',
        'A conversion audit before scaling is the fastest way to improve results without increasing budget.',
      ],
    },
    C: {
      low: [
        'A couple of things in this block are worth flagging directly.',
        'If your spend is below £2,000 a month, you’re below the threshold where most paid media platforms have enough data to optimise. That’s not a moral failing, it’s a mechanical reality. The platform needs volume to learn. Below a certain floor, results are inconsistent and hard to read.',
        'If you’ve had a bad agency experience and you’re not sure you own all your accounts, check now. Log in to Google Ads, Meta Business Manager, and Google Search Console. If you don’t have admin access to all of them, get it before anything else.',
      ],
      mid: [
        'Budget and history are in reasonable shape, but there’s room to sharpen both.',
        'If spend is at the lower end of the viable range, results will come, but slowly. The platforms need data and data costs clicks. Founders who get the fastest results are the ones who commit to a real budget for a real period and don’t panic at month two.',
        'If there’s agency history here, we’d rather talk through it directly than pretend it didn’t happen. It shapes what a good engagement looks like, and what it definitely shouldn’t look like.',
      ],
    },
    D: {
      low: [
        'This is the most honest part of your results.',
        'Something structural needs attention before scaling makes sense. Maybe delivery capacity, if enquiries doubled tomorrow, the business would break. Maybe close rate, if fewer than 15% of qualified enquiries are converting, more leads will just cost more money for the same result. Maybe profit consistency.',
        'None of this is unusual. Most businesses in your revenue band have at least one of these gaps. But spending seriously on marketing before they’re addressed tends to accelerate problems rather than growth.',
        'The most useful conversation we can have with you right now isn’t about campaigns. It’s about what needs to be true first.',
      ],
      mid: [
        'You’re close to ready. There are one or two things, close rate, delivery capacity, or commitment horizon, that would make scaling significantly more effective if addressed first.',
        'This doesn’t mean do nothing for six months. It means go into scaling with clear eyes about what the business can handle today, and what it needs to be able to handle more.',
        'A conversation about this is more valuable than a proposal right now.',
      ],
    },
  },

  /* ---- TIER THREE, low only ---- */
  three: {
    A: {
      low: [
        'You’re currently making marketing decisions without the data to back them up.',
        'That’s the reality for most businesses at your stage, and it means that any money spent on marketing right now is difficult to evaluate, impossible to optimise, and very easy for an agency to hide behind.',
        'The fix: a CRM every lead goes into, from first contact to closed sale. Call tracking if the phone is a primary enquiry channel. GA4 set up properly with goal tracking. This isn’t exciting work, but it’s the work that makes everything else worth doing.',
      ],
    },
    B: {
      low: [
        'Paid traffic needs somewhere worth landing. Right now there are gaps here that mean even well-run campaigns would struggle to produce consistent results.',
        'The most common issues at this score: a website too old or too slow to convert mobile traffic, a homepage doing the job a landing page should be doing, and an offer that’s too vague to compel action.',
        'These need attention before meaningful ad spend goes in. Not because the ads are the problem, but because the destination is.',
      ],
    },
    C: {
      low: [
        'Budget reality check: if you’re spending under £2,000 a month on paid media, you’re unlikely to be generating the data volume most campaigns need to optimise, and under £500, you’re below the floor entirely. The algorithm needs volume. Without it, results are inconsistent and almost impossible to read.',
        'This doesn’t mean spend money you can’t afford. It means match your expectations to your budget, or your budget to your expectations. Most "paid ads don’t work" stories come from budgets that were never large enough to give the channel a fair chance.',
      ],
    },
    D: {
      low: [
        'Something structural needs to come first.',
        'Delivery capacity, close rate, profitability, or commitment horizon, one or more of these isn’t where it needs to be for scaling to make sense. That’s a current state, not a permanent one.',
        'The most useful thing you can do right now isn’t find another agency. It’s identify the one or two things that, if fixed, would change your score significantly. Then fix them.',
        'When you’ve done that, come back. The conversation will be completely different.',
      ],
    },
  },
};

/* ============================================================
   CTA COPY
   ============================================================ */
window.TIER_CTA = {
  one: {
    headline: 'Let’s look at where you can grow fastest.',
    body: 'Your score puts you in a strong position. The next step is a 30-minute strategy call, we’ll look at your specific numbers, identify your biggest opportunities, and give you a clear picture of what a serious paid media strategy could produce. If it’s a fit, we’ll tell you. If it isn’t, we’ll tell you that too.',
    button: 'Book your strategy call',
    note: 'We’ll review your results before the call. Expect a real conversation, not a sales script.',
  },
  two: {
    headline: 'You’re closer than you think. Let’s close the gaps.',
    body: 'Your score shows a business that’s mostly ready, with a few specific things holding it back. A 30-minute call won’t be a pitch. It’ll be a straight conversation about what those gaps are, how quickly they’re fixable, and what scaling your marketing realistically looks like from here. No lock-in. No obligation. Just a clear picture of where you are and what’s next.',
    button: 'Book your free audit call',
    note: 'We’ll review your results before the call. Come prepared to be honest, we will be too.',
  },
  three: {
    headline: 'You’re not ready to scale yet. But you’re not far off.',
    body: 'Your results are honest, and so are we. Scaling paid media right now wouldn’t produce the results you want, because there are a few things that need to be in place first. That doesn’t mean we can’t help. A 30-minute call right now is worth having, not to talk about campaigns, but to give you a clear picture of exactly what needs to change and in what order. No pitch. No pressure. Just straight advice from people who’ve had this conversation hundreds of times.',
    button: 'Book your free 30-minute call',
    note: 'We’ll tell you what needs fixing, in what order, and roughly how long it’ll take. If we’re not the right fit to help you get there, we’ll tell you that too.',
  },
};

/* ============================================================
   TIER LABELS
   ============================================================ */
window.TIER_LABELS = {
  one:   { name: 'Scale Ready',   color: '#1e8a4f', range: '75–100', tag: 'Strong' },
  two:   { name: 'Nearly There',  color: '#e09a00', range: '50–74',  tag: 'Mostly there' },
  three: { name: 'Fix First',     color: '#c0392b', range: '0–49',   tag: 'Foundation work' },
};

/* ============================================================
   HARD FLAG CALLOUTS
   ============================================================ */
window.FLAG_COPY = {
  slow_lead: {
    title: 'You’re losing leads you’ve already paid for.',
    body: 'Research across millions of inbound enquiries shows that responding within five minutes makes you 21 times more likely to qualify a lead than responding within 30 minutes. Same-day response is costing you a significant percentage of your enquiries, they’ve already called someone else. This isn’t a marketing problem. It’s an operations problem. And it’s costing you more than most ad budgets. Fix it before you spend another pound on traffic.',
  },
  no_crm: {
    title: 'You’re losing leads you don’t even know about.',
    body: 'Without a system that logs every enquiry from first contact to closed sale, leads fall through the gaps silently. You follow up the ones you remember. The rest go cold, or go to a competitor who called back first. A CRM doesn’t have to be complicated. It has to be used. This is the single most important infrastructure fix for any business serious about scaling.',
  },
  no_ownership: {
    title: 'You may not own your own marketing assets.',
    body: 'Your Google Ads account, Meta Business Manager, Google Business Profile, and analytics data are business assets. If an agency set them up in their name, they own your audience data, your conversion history, and your campaign learnings, and they can walk away with them. Log in and check. If you don’t have admin access to every account, get it, in writing if necessary. No agency worth working with should ever hold your accounts.',
  },
  low_spend_mid: {
    title: 'Your budget may be working against you.',
    body: 'You’re in the game, but below the level where paid media becomes genuinely predictable. Most platforms need volume to optimise, and volume costs clicks. At this spend level, results will come, but slowly and inconsistently. The founders who scale fastest are the ones who commit to a budget that gives the algorithm enough to work with, and hold their nerve while it learns.',
  },
  low_spend_low: {
    title: 'Your budget may be working against you.',
    body: 'Below roughly £500 a month, most platforms don’t have enough data to do anything useful with. You’re not getting bad results because paid media doesn’t work. You’re getting bad results because the engine doesn’t have enough fuel. This is one of the most common reasons founders write off paid ads too early, the budget was never large enough to give it a fair chance.',
  },
  old_website: {
    title: 'Your website may be costing you more than your ads.',
    body: 'An old website isn’t just a design issue. Slow load speeds on mobile, outdated conversion structure, and poor user experience can cut your enquiry rate significantly before an ad has done anything wrong. A website converting at 3% and one converting at 18% can sit in the same Google Ads auction with the same budget. The difference in leads is not small.',
  },
  low_close: {
    title: 'More leads won’t fix a conversion problem, they’ll make it more expensive.',
    body: 'If fewer than 15% of your qualified enquiries are becoming customers, scaling traffic will scale the problem, not the solution. The issue is in the sales process, the quality of the leads, or the offer itself. This is fixable, but it needs to be fixed before, not after, serious marketing investment.',
  },
  profit_instability: {
    title: 'Scaling on unstable foundations speeds up problems, not growth.',
    body: 'Consistent profitability isn’t just a hygiene metric, it’s the thing that gives a marketing investment enough runway to work. Campaigns from cold traffic typically take three to six months to optimise. If the business can’t sustain that period without stress, the relationship will end too early to produce results. Getting this stable first is the most profitable marketing decision you can make.',
  },
  capacity: {
    title: 'More leads into a business that can’t handle them isn’t growth, it’s chaos.',
    body: 'Before scaling the marketing, the delivery needs to scale with it. A flood of enquiries into an overloaded team produces bad jobs, poor reviews, and a damaged reputation. That sets you back further than staying where you are. Sort the capacity first. Then scale.',
  },
};

/* ============================================================
   RESOLVERS
   ============================================================ */
window.openingLine = function(tier, q20Key) {
  const bucket = window.TIER_OPENERS[tier] || {};
  return bucket[q20Key] || bucket._default;
};

window.blockCommentary = function(tier, block, blockScore) {
  const band = window.bandForBlock(blockScore);
  // Try tier-specific variant first, then sensible fallbacks
  const order = tier === 'one'
    ? ['one','two','three']
    : tier === 'two'
      ? ['two','one','three']
      : ['three','two','one'];
  for (const t of order) {
    const set = window.BLOCK_COMMENTARY[t]?.[block];
    if (set && set[band]) return set[band];
  }
  // Final fallback: anything that exists for this block
  for (const t of order) {
    const set = window.BLOCK_COMMENTARY[t]?.[block];
    if (set) {
      const any = set.high || set.mid || set.low;
      if (any) return any;
    }
  }
  return [];
};
