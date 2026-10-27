/* Demand Gen Hub: GTM brief -> integrated demand gen plan.
   One state object, editable input tables on the left, computed plan tabs on the right. */
(function () {
  'use strict';

  const STORE_KEY = 'demand-gen-hub:v5';
  const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const STAGES = ['Aware', 'Consider', 'Decide'], ASSET_STATUS = ['Live', 'In production', 'Missing'], LOC_STATUS = ['Not needed', 'Requested', 'In progress', 'Ready'];
  let comRegion = 'All regions';
  const RISK_STATUS = ['On track', 'Watching', 'Triggered'];
  const PLAN_STATUS = ['Not started', 'Draft', 'Submitted', 'Changes requested', 'Approved'];
  const isIn = (st) => st === 'Submitted' || st === 'Approved';
  const RISK_LINKS = ['Owner sets it', 'Regional coverage', 'SDR capacity', 'MQL → SQO', 'Pacing'];
  const FUNCTIONS = ['Demand gen', 'PMM', 'Field', 'Partner', 'Paid (shared svc)', 'Creative', 'RevOps', 'Sales / SDR'];

  /* ---------- example ---------- */
  function example() {
    return {
      isExample: true,
      name: 'FY27 IT buyer expansion',
      fy: 'FY27',
      product: 'AI agent suite for IT, admin & governance add-on, core work platform',
      brief: 'Illustrative example only. An AI work platform moving upmarket: grow enterprise pipeline with IT as a full member of the buying committee, alongside Ops and business leaders. Two new product launches this year plus the always-on core ICP programs.',
      goal: 50000000,
      start: '2027-02',
      r1: 22, r3: 25, cycle: 120,
      sdrs: 5, sdrCap: 100,
      salesTarget: 35000000, coverage: 3, mktShare: 50,
      lyPipe: 38000000, lyMql: 3450, lySqo: 560, lyBudget: 3100000,
      expShare: 35, expConv: 30, pqlPerMonth: 60, influenced: 120000000,
      campaigns: [
        { name: 'Governed AI for IT', tier: 'Tier 1 launch', product: 'AI agent suite for IT', theme: 'AI agents IT can say yes to', offer: 'Analyst report on governed AI agents', audience: 'CIO / Head of IT, IT admin / architect', start: 1, launch: 2, end: 6, share: 35, programs: 'webinar, paid, events, content, aeo, sdr', owner: 'Demand gen', status: 'In flight' },
        { name: 'Admin & governance add-on', tier: 'Tier 2 launch', product: 'Admin & governance add-on', theme: 'Control without slowing teams down', offer: 'Security review pack', audience: 'IT admin / architect, CIO / Head of IT', start: 4, launch: 5, end: 8, share: 15, programs: 'webinar, email, paid, partner', owner: 'PMM', status: 'Planning' },
        { name: 'Work, unblocked', tier: 'Always-on', product: 'Core work platform', theme: 'Where cross-team work stalls, and how to fix it', offer: 'ROI calculator + customer story', audience: 'COO / Ops leader, Team lead (existing user)', start: 1, launch: 1, end: 12, share: 40, programs: 'email, content, seo, product, paid, sdr', owner: 'Demand gen', status: 'In flight' },
        { name: 'Year-end consolidation', tier: 'Seasonal', product: 'Core work platform', theme: 'Consolidate tools before next year\'s budget locks', offer: 'Business case workshop', audience: 'COO / Ops leader, CIO / Head of IT', start: 9, launch: 11, end: 12, share: 10, programs: 'events, sdr, partner, email', owner: 'Field', status: 'Planning' }
      ],
      actuals: [
        { month: 1, mql: 228, sqo: 39, pipe: 2800000, spend: 165000 },
        { month: 2, mql: 462, sqo: 74, pipe: 5400000, spend: 540000 }
      ],
      team: [
        { fn: 'Demand gen', hc: 6, cap: 8, sla: 'Campaign brief to every team 12 weeks before launch', intake: 'Campaign brief + weekly campaign stand-up', escal: 'Head of Campaigns' },
        { fn: 'Paid (shared svc)', hc: 3, cap: 5, sla: 'Flight live 10 business days after brief; pacing report every Monday', intake: 'Paid brief tab into the shared-services intake form', escal: 'Head of shared services, then chief of staff' },
        { fn: 'Creative', hc: 2, cap: 4, sla: 'First round in 5 business days, two revision rounds', intake: 'Creative request with the campaign brief attached', escal: 'Creative director' },
        { fn: 'PMM', hc: 4, cap: 6, sla: 'Messaging locked 8 weeks before launch', intake: 'Launch tiering review', escal: 'Head of PMM' },
        { fn: 'Field', hc: 5, cap: 6, sla: 'Event plans submitted a quarter ahead', intake: 'Regional plan upload', escal: 'Regional VPs' },
        { fn: 'Sales / SDR', hc: 5, cap: 4, sla: 'MQLs worked within 24 hours', intake: 'Routing rules in the CRM', escal: 'Head of sales development' },
        { fn: 'RevOps', hc: 2, cap: 3, sla: 'Pipeline dashboard refreshed by Monday 9am', intake: 'RevOps ticket', escal: 'Head of RevOps' }
      ],
      asks: [
        { ask: 'Approve $3.6M program budget, with 10% held back until the Q1 pacing review', who: 'CMO + Finance', by: 1, why: 'Funds the plan while keeping room to move money to what converts' },
        { ask: 'SLA with paid shared services: flights live 10 business days after brief, weekly pacing', who: 'Head of shared services', by: 1, why: 'Paid carries 20% of sourced pipeline but sits outside the team' },
        { ask: '2 more SDRs, or overflow routing, for launch months', who: 'Head of sales development', by: 2, why: 'MQLs exceed SDR capacity in Mar and Jun' },
        { ask: 'Decide who covers LATAM: HQ programs or a partner', who: 'CRO', by: 3, why: 'LATAM has no plan, owner or ABM play' },
        { ask: 'Agree sourced vs influenced definitions and the PQL handoff', who: 'RevOps + Product', by: 1, why: 'Expansion pipeline depends on product signals reaching sales' }
      ],
      products: [
        { name: 'Core work platform', share: 60, launch: 0 },
        { name: 'AI agent suite for IT', share: 28, launch: 2 },
        { name: 'Admin & governance add-on', share: 12, launch: 5 }
      ],
      segments: [
        { name: 'Enterprise', share: 70, acv: 120000, mqlSqo: 22 },
        { name: 'Commercial', share: 30, acv: 35000, mqlSqo: 16 }
      ],
      regions: [
        { name: 'North America', share: 55, lead: 'HQ + NA field' },
        { name: 'EMEA', share: 25, lead: 'EMEA field' },
        { name: 'APJ', share: 15, lead: 'APJ field' },
        { name: 'LATAM', share: 5, lead: 'HQ (covered centrally)' }
      ],
      personas: [
        { role: 'CIO / Head of IT', part: 'Economic buyer', cares: 'Security, governance, tool consolidation, AI risk', aware: 'Analyst report on governed AI agents', consider: 'Security & admin deep-dive webinar', decide: 'Exec briefing + reference call' },
        { role: 'COO / Ops leader', part: 'Business sponsor', cares: 'Cross-team execution, speed, cost', aware: 'Benchmark: where work stalls', consider: 'ROI calculator + customer story', decide: 'Business case workshop' },
        { role: 'IT admin / architect', part: 'Technical evaluator', cares: 'SSO, permissions, integrations, rollout effort', aware: 'Integration guides, community', consider: 'Hands-on lab / sandbox', decide: 'Security review pack' },
        { role: 'Team lead (existing user)', part: 'Champion', cares: 'Getting their team unblocked', aware: 'In-product AI agent prompts', consider: 'Template gallery + office hours', decide: 'Internal pitch kit for their exec' }
      ],
      assets: [
        { role: 'CIO / Head of IT', stage: 'Aware', asset: 'Analyst report on governed AI agents', status: 'Live', owner: 'PMM', due: 0, regions: 'EMEA, APJ', loc: 'Ready' },
        { role: 'CIO / Head of IT', stage: 'Consider', asset: 'Security & admin deep-dive webinar', status: 'In production', owner: 'Demand gen', due: 2, regions: 'EMEA, APJ', loc: 'Requested' },
        { role: 'CIO / Head of IT', stage: 'Decide', asset: 'Exec briefing + reference call', status: 'Live', owner: 'Sales / SDR', due: 0, regions: '', loc: 'Not needed' },
        { role: 'COO / Ops leader', stage: 'Aware', asset: 'Benchmark: where work stalls', status: 'In production', owner: 'PMM', due: 2, regions: 'EMEA', loc: 'Requested' },
        { role: 'COO / Ops leader', stage: 'Consider', asset: 'ROI calculator + customer story', status: 'Live', owner: 'PMM', due: 0, regions: 'EMEA, APJ, LATAM', loc: 'In progress' },
        { role: 'COO / Ops leader', stage: 'Decide', asset: 'Business case workshop', status: 'Missing', owner: 'Field', due: 4, regions: '', loc: 'Not needed' },
        { role: 'IT admin / architect', stage: 'Aware', asset: 'Integration guides, community', status: 'Live', owner: 'PMM', due: 0, regions: '', loc: 'Not needed' },
        { role: 'IT admin / architect', stage: 'Consider', asset: 'Hands-on lab / sandbox', status: 'In production', owner: 'Demand gen', due: 2, regions: 'APJ', loc: 'Requested' },
        { role: 'IT admin / architect', stage: 'Decide', asset: 'Security review pack', status: 'Live', owner: 'PMM', due: 0, regions: 'EMEA', loc: 'Ready' },
        { role: 'Team lead (existing user)', stage: 'Aware', asset: 'In-product AI agent prompts', status: 'Live', owner: 'Demand gen', due: 0, regions: '', loc: 'Not needed' },
        { role: 'Team lead (existing user)', stage: 'Consider', asset: 'Template gallery + office hours', status: 'Live', owner: 'Demand gen', due: 0, regions: '', loc: 'Not needed' },
        { role: 'Team lead (existing user)', stage: 'Decide', asset: 'Internal pitch kit for their exec', status: 'Missing', owner: 'Creative', due: 3, regions: 'EMEA, APJ, LATAM', loc: 'Requested' }
      ],
      abmRegions: [
        { region: 'North America', t1: 22, t2: 165, t3: 1375, owner: 'NA enterprise AE + SDR pod', next: 'Exec dinners for the 22 Tier 1 accounts in month 9; security deep-dive invites now' },
        { region: 'EMEA', t1: 10, t2: 75, t3: 625, owner: 'EMEA field + SDR pod', next: 'Invite Tier 1 to the London and Munich summits; GDPR governance webinar for Tier 2' },
        { region: 'APJ', t1: 6, t2: 45, t3: 375, owner: 'APJ partner team', next: 'Partner-hosted briefings in Sydney and Tokyo' },
        { region: 'LATAM', t1: 2, t2: 15, t3: 125, owner: '', next: '' }
      ],
      tiers: [
        { tier: 'Tier 1 · 1:1', accounts: 40, share: 35, play: 'Custom content, exec dinners, AE + SDR named plays, direct mail' },
        { tier: 'Tier 2 · 1:few', accounts: 300, share: 40, play: 'Industry clusters, intent-triggered ads, vertical webinars' },
        { tier: 'Tier 3 · 1:many', accounts: 2500, share: 25, play: 'Programmatic ABM, nurture tracks, in-product signals' }
      ],
      channels: [
        { id: 'email', on: true, name: 'Email nurture & lifecycle', owner: 'Demand gen', kind: 'Owned', stage: 'Consider', motion: 'Always-on', runBy: 'HQ', share: 12, cpm: 150 },
        { id: 'webinar', on: true, name: 'Webinars & virtual events', owner: 'Demand gen', kind: 'Owned', stage: 'Consider', motion: 'Both', runBy: 'Both', share: 14, cpm: 600 },
        { id: 'events', on: true, name: 'Field & flagship events', owner: 'Field', kind: 'Owned', stage: 'Decide', motion: 'Burst', runBy: 'Region', share: 12, cpm: 2000 },
        { id: 'content', on: true, name: 'Content & offers', owner: 'PMM', kind: 'Owned', stage: 'Aware', motion: 'Both', runBy: 'HQ', share: 8, cpm: 400 },
        { id: 'seo', on: true, name: 'SEO (organic search)', owner: 'Demand gen', kind: 'Earned', stage: 'Aware', motion: 'Always-on', runBy: 'HQ', share: 5, cpm: 250 },
        { id: 'aeo', on: true, name: 'AEO / GEO (AI answer engines)', owner: 'PMM', kind: 'Earned', stage: 'Aware', motion: 'Always-on', runBy: 'HQ', share: 3, cpm: 350 },
        { id: 'paid', on: true, name: 'Paid media', owner: 'Paid (shared svc)', kind: 'Paid', stage: 'Aware', motion: 'Both', runBy: 'Both', share: 20, cpm: 1200 },
        { id: 'partner', on: true, name: 'Partner marketing', owner: 'Partner', kind: 'Partner', stage: 'Consider', motion: 'Both', runBy: 'Region', share: 8, cpm: 900 },
        { id: 'sdr', on: true, name: 'SDR outbound & sales plays', owner: 'Sales / SDR', kind: 'Sales', stage: 'Decide', motion: 'Always-on', runBy: 'Region', share: 12, cpm: 1500 },
        { id: 'product', on: true, name: 'In-product signals (PQL)', owner: 'Demand gen', kind: 'Product', stage: 'Consider', motion: 'Always-on', runBy: 'HQ', share: 6, cpm: 100 }
      ],
      moments: [
        { month: 2, name: 'Launch: AI agent suite for IT', type: 'Launch' },
        { month: 5, name: 'Launch: admin & governance add-on', type: 'Launch' },
        { month: 8, name: 'Flagship customer event', type: 'Event' },
        { month: 11, name: 'Year-end budget season', type: 'Season' }
      ],
      regionPlans: {
        'North America': { status: 'Submitted', adapt: 'AWS marketplace offers, US public sector proof points', programs: [
          { name: 'IT leader roadshow (5 cities)', month: 3, budget: 420000, mql: 210 },
          { name: 'AWS partner co-marketing', month: 6, budget: 150000, mql: 90 },
          { name: 'Tier 1 exec dinners', month: 9, budget: 180000, mql: 40 }
        ] },
        EMEA: { status: 'Draft', adapt: 'Data residency proof points, local partner logos, DE/FR language versions', programs: [
          { name: 'London + Munich IT summits', month: 4, budget: 260000, mql: 110 },
          { name: 'GDPR-ready AI governance webinar (DE/FR)', month: 6, budget: 40000, mql: 70 }
        ] },
        APJ: { status: 'Draft', adapt: 'Japanese localization, partner-led motion', programs: [
          { name: 'Sydney + Tokyo partner days', month: 5, budget: 120000, mql: 50 }
        ] },
        LATAM: { status: 'Not started', adapt: '', programs: [] }
      },
      risks: [
        { risk: 'A product launch slips a quarter', likelihood: 'High', impact: 3500000, status: 'Watching', owner: 'PMM',
          signal: 'Launch readiness review: beta exit criteria, pricing and enablement sign-off', trigger: 'Launch date not locked 6 weeks before the burst',
          contingency: 'Hold the launch burst budget. Keep always-on core programs running. Re-time the launch webinar and paid burst to the new date, and fill the gap with a governance pre-briefing for Tier 1 accounts.',
          mitigation: 'Weekly launch stand-up with PMM; build creative so the date can change without rework' },
        { risk: 'Commercial MQL → SQO lands below plan', likelihood: 'Medium', impact: 2000000, status: 'On track', owner: 'Demand gen', link: 'MQL → SQO',
          signal: 'Weekly MQL → SQO rate by segment', trigger: 'Commercial below 13% for 3 weeks in a row',
          contingency: 'Raise the MQL score threshold with RevOps, route low-fit MQLs to nurture, and move 10% of Commercial paid budget to in-product PQL plays.',
          mitigation: 'Agree scoring and SLA with RevOps before the year starts; review at day 30' },
        { risk: 'AI answers cut organic clicks', likelihood: 'Medium', impact: 1000000, status: 'Watching', owner: 'Content + web',
          signal: 'Non-brand organic sessions vs AI citation rate on tracked prompts', trigger: 'Organic sessions down 15% quarter on quarter with no lift in AI-referred traffic',
          contingency: 'Move half of the SEO content budget to AEO answer pages and comparison content, and add AI-referred MQLs to the weekly readout.',
          mitigation: 'Structure priority pages as direct answers; track citations monthly' },
        { risk: 'SDR capacity in launch months', likelihood: 'Medium', impact: 1500000, status: 'Watching', owner: 'Sales / SDR', link: 'SDR capacity',
          signal: 'Share of MQLs worked within 24 hours', trigger: 'Follow-up SLA under 85% in any week',
          contingency: 'Route Tier 3 and Commercial MQLs to automated nurture, borrow 2 SDRs from outbound for the launch month, and send partner-sourced leads to partner managers.',
          mitigation: 'Stagger regional launch dates; plan SDR coverage with sales a quarter ahead' },
        { risk: 'Regional plans fall short of what regions owe', likelihood: 'Low', impact: 8900000, status: 'Triggered', owner: 'Field', link: 'Regional coverage',
          signal: 'Regional coverage in the roll-up', trigger: 'Any region under 70% coverage 4 weeks before the quarter starts',
          contingency: 'HQ fills the gap with a global webinar series and a paid burst into the short regions, and escalates to the regional VP for a plan by the next forecast call.',
          mitigation: 'Set a submission date for every region; review the roll-up weekly' }
      ],
      raci: {}
    };
  }
  function blank() {
    const e = example();
    return Object.assign(e, {
      isExample: false, name: '', fy: '', product: '', brief: '', goal: 0,
      segments: [{ name: 'Enterprise', share: 100, acv: 100000, mqlSqo: 20 }],
      regions: [{ name: 'Global', share: 100, lead: 'HQ' }],
      personas: [{ role: '', part: '', cares: '', aware: '', consider: '', decide: '' }],
      tiers: [{ tier: 'Tier 1 · 1:1', accounts: 0, share: 100, play: '' }], assets: [], abmRegions: [],
      products: [{ name: '', share: 100, launch: 0 }],
      moments: [], regionPlans: {}, risks: [], raci: {},
      campaigns: [], actuals: [], team: [], asks: [], salesTarget: 0, lyPipe: 0, lyMql: 0, lySqo: 0, lyBudget: 0, influenced: 0, expShare: 0
    });
  }
  // fill anything a saved or pasted plan is missing
  function fill(s) {
    const d = blank();
    Object.keys(d).forEach((k) => { if (s[k] == null) s[k] = d[k]; });
    return s;
  }

  /* ---------- state ---------- */
  let S = fill(load() || example());
  let rpSel = null; // region shown in the regional plan input
  let tab = 'onepage';
  function load() { try { const v = localStorage.getItem(STORE_KEY); return v ? JSON.parse(v) : null; } catch (e) { return null; } }
  function save() { try { localStorage.setItem(STORE_KEY, JSON.stringify(S)); } catch (e) { /* storage unavailable */ } }

  /* ---------- helpers ---------- */
  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const num = (v) => { const n = parseFloat(v); return isFinite(n) ? n : 0; };
  const fmtInt = (n) => Math.round(n).toLocaleString('en-US');
  function money(n) {
    if (n < 0) return '−' + money(-n);
    const a = Math.abs(n);
    if (a >= 1e6) return '$' + (n / 1e6).toFixed(a >= 1e7 ? 1 : 2) + 'M';
    if (a >= 1e3) return '$' + (n / 1e3).toFixed(a >= 1e5 ? 0 : 1) + 'K';
    return '$' + Math.round(n);
  }
  const pct = (n) => (Math.round(n * 10) / 10) + '%';
  function norm(rows, key) {
    const t = rows.reduce((s, r) => s + Math.max(0, num(r[key])), 0);
    return rows.map((r) => (t > 0 ? Math.max(0, num(r[key])) / t : 0));
  }
  function monthLabels() {
    const [y, m] = (S.start || '2027-01').split('-').map(Number);
    return Array.from({ length: 12 }, (_, i) => MONTHS[((m || 1) - 1 + i) % 12]);
  }
  function toast(t) { const el = $('toast'); el.textContent = t; el.hidden = false; clearTimeout(toast.t); toast.t = setTimeout(() => (el.hidden = true), 1800); }

  /* ---------- the plan engine ---------- */
  function compute() {
    const goal = Math.max(0, num(S.goal));
    const r1 = Math.max(0.001, num(S.r1) / 100), r3 = Math.max(0.001, num(S.r3) / 100);
    const segW = norm(S.segments, 'share');
    const segs = S.segments.map((s, i) => {
      const pipe = goal * segW[i];
      const acv = Math.max(1, num(s.acv));
      const sqo = pipe / acv;
      const mql = sqo / Math.max(0.001, num(s.mqlSqo) / 100);
      return { name: s.name || 'Segment ' + (i + 1), w: segW[i], pipe, acv, sqo, mql, leads: mql / r1, won: sqo * r3, bookings: pipe * r3 };
    });
    const tot = segs.reduce((a, s) => ({ pipe: a.pipe + s.pipe, sqo: a.sqo + s.sqo, mql: a.mql + s.mql, leads: a.leads + s.leads, won: a.won + s.won, bookings: a.bookings + s.bookings }),
      { pipe: 0, sqo: 0, mql: 0, leads: 0, won: 0, bookings: 0 });

    const regW = norm(S.regions, 'share');
    const regions = S.regions.map((r, i) => ({ name: r.name, lead: r.lead, w: regW[i], pipe: tot.pipe * regW[i], sqo: tot.sqo * regW[i], mql: tot.mql * regW[i], leads: tot.leads * regW[i] }));

    const live = S.channels.filter((c) => c.on);
    const chW = norm(live, 'share');
    const channels = live.map((c, i) => {
      const mql = tot.mql * chW[i];
      const cost = mql * Math.max(0, num(c.cpm));
      return Object.assign({}, c, { w: chW[i], pipe: tot.pipe * chW[i], sqo: tot.sqo * chW[i], mql, cost });
    });
    const budget = channels.reduce((s, c) => s + c.cost, 0);

    // month weights: launches lift that month and the next, events and seasons their own month
    const lift = Array(12).fill(1);
    const momentAt = Array.from({ length: 12 }, () => []);
    S.moments.forEach((m) => {
      const i = Math.round(num(m.month)) - 1;
      if (i < 0 || i > 11) return;
      momentAt[i].push(m.name);
      if (m.type === 'Launch') { lift[i] += 0.6; if (i + 1 < 12) lift[i + 1] += 0.3; }
      else if (m.type === 'Event') lift[i] += 0.5;
      else lift[i] += 0.35;
    });
    const flat = Array(12).fill(1 / 12);
    const burstRaw = lift.map((l) => Math.pow(l - 0.85, 2));
    const bt = burstRaw.reduce((a, b) => a + b, 0);
    const burst = burstRaw.map((b) => b / bt);
    channels.forEach((c) => {
      const d = c.motion === 'Always-on' ? flat : c.motion === 'Burst' ? burst : flat.map((f, i) => 0.6 * f + 0.4 * burst[i]);
      c.byMonth = d.map((x) => x * c.mql);
    });
    const monthly = Array.from({ length: 12 }, (_, i) => channels.reduce((s, c) => s + c.byMonth[i], 0));

    const tierW = norm(S.tiers, 'share');
    const tiers = S.tiers.map((t, i) => {
      const pipe = tot.pipe * tierW[i];
      const acc = Math.max(0, num(t.accounts));
      return Object.assign({}, t, { w: tierW[i], pipe, perAcct: acc ? pipe / acc : 0 });
    });

    const monthlyCost = Array.from({ length: 12 }, (_, i) => channels.reduce((s, c) => s + c.byMonth[i] * Math.max(0, num(c.cpm)), 0));

    const prodW = norm(S.products, 'share');
    const products = S.products.map((p, i) => Object.assign({}, p, { w: prodW[i], pipe: tot.pipe * prodW[i], mql: tot.mql * prodW[i], sqo: tot.sqo * prodW[i] }));

    // regional roll-up: HQ and shared programs deliver most of each region's MQLs; region-run programs are what the region owes
    const fromHq = channels.filter((c) => c.runBy !== 'Region').reduce((s, c) => s + c.mql, 0);
    const owedAll = channels.filter((c) => c.runBy === 'Region').reduce((s, c) => s + c.mql, 0);
    regions.forEach((r) => {
      const pl = S.regionPlans[r.name] || { status: 'Not started', programs: [], adapt: '' };
      r.plan = pl;
      r.status = pl.status || 'Not started';
      r.fromHq = fromHq * r.w;
      r.owes = owedAll * r.w;
      r.committed = (pl.programs || []).reduce((s, x) => s + Math.max(0, num(x.mql)), 0);
      r.spend = (pl.programs || []).reduce((s, x) => s + Math.max(0, num(x.budget)), 0);
      r.coverage = r.owes ? r.committed / r.owes : 1;
      r.gap = Math.max(0, r.owes - r.committed);
    });
    const roll = regions.reduce((a, r) => ({ mql: a.mql + r.mql, fromHq: a.fromHq + r.fromHq, owes: a.owes + r.owes, committed: a.committed + r.committed, spend: a.spend + r.spend, gap: a.gap + r.gap }),
      { mql: 0, fromHq: 0, owes: 0, committed: 0, spend: 0, gap: 0 });
    roll.coverage = roll.owes ? roll.committed / roll.owes : 1;

    const sqoPerMql = tot.mql ? tot.sqo / tot.mql : 0, pipePerMql = tot.mql ? tot.pipe / tot.mql : 0;
    const quarters = [0, 1, 2, 3].map((q) => {
      const idx = [q * 3, q * 3 + 1, q * 3 + 2];
      const mql = idx.reduce((s, i) => s + monthly[i], 0);
      return { name: 'Q' + (q + 1), months: idx, mql, sqo: mql * sqoPerMql, pipe: mql * pipePerMql, cost: idx.reduce((s, i) => s + monthlyCost[i], 0), moments: idx.flatMap((i) => momentAt[i]) };
    });

    const sdrCap = Math.max(0, num(S.sdrs)) * Math.max(0, num(S.sdrCap));

    return { goal, r1, r3, segs, tot, regions, roll, channels, budget, monthly, monthlyCost, momentAt, tiers, products, quarters, sdrCap, labels: monthLabels() };
  }

  /* ---------- generic editable table ---------- */
  function editor(host, rows, cols, opts) {
    opts = opts || {};
    const el = $(host);
    const head = cols.map((c) => '<th>' + esc(c.label) + '</th>').join('') + '<th></th>';
    const body = rows.map((r, ri) => '<tr>' + cols.map((c) => {
      const id = host + '-' + ri + '-' + c.key, v = r[c.key];
      if (c.type === 'check') return '<td><input type="checkbox" id="' + id + '" data-r="' + ri + '" data-k="' + c.key + '"' + (v ? ' checked' : '') + ' aria-label="' + esc(c.label) + '"></td>';
      if (c.type === 'select') return '<td><select id="' + id + '" data-r="' + ri + '" data-k="' + c.key + '" aria-label="' + esc(c.label) + '">' + c.options.map((o) => '<option' + (o === v ? ' selected' : '') + '>' + esc(o) + '</option>').join('') + '</select></td>';
      if (c.type === 'area') return '<td><textarea id="' + id + '" data-r="' + ri + '" data-k="' + c.key + '" aria-label="' + esc(c.label) + '" style="min-width:' + (c.w || 140) + 'px">' + esc(v) + '</textarea></td>';
      return '<td><input id="' + id + '" data-r="' + ri + '" data-k="' + c.key + '"' + (c.type === 'num' ? ' type="number" step="any" min="0"' : '') + ' value="' + esc(v) + '" aria-label="' + esc(c.label) + '" style="min-width:' + (c.w || 90) + 'px"></td>';
    }).join('') + '<td class="x"><button class="btn ghost" type="button" data-del="' + ri + '" aria-label="Remove row">×</button></td></tr>').join('');
    el.innerHTML = '<div class="ed"><table><thead><tr>' + head + '</tr></thead><tbody>' + body + '</tbody></table></div>' +
      '<div class="btns" style="margin-top:8px"><button class="btn" type="button" data-add>Add ' + esc(opts.noun || 'row') + '</button></div>';
    el.oninput = el.onchange = (e) => {
      const t = e.target; if (!t.dataset.k) return;
      const col = cols.find((c) => c.key === t.dataset.k);
      rows[+t.dataset.r][t.dataset.k] = col.type === 'check' ? t.checked : col.type === 'num' ? num(t.value) : t.value;
      changed(false);
    };
    el.onclick = (e) => {
      const t = e.target;
      if (t.dataset.del != null) { rows.splice(+t.dataset.del, 1); changed(true); }
      else if (t.hasAttribute('data-add')) { rows.push(opts.make ? opts.make() : {}); changed(true); }
    };
  }

  function bindInputs() {
    const map = { 'in-name': 'name', 'in-fy': 'fy', 'in-product': 'product', 'in-brief': 'brief', 'in-goal': 'goal', 'in-start': 'start', 'in-r1': 'r1', 'in-r3': 'r3', 'in-cycle': 'cycle', 'in-sdrs': 'sdrs', 'in-sdrcap': 'sdrCap',
      'in-sales': 'salesTarget', 'in-cov': 'coverage', 'in-mkt': 'mktShare', 'in-lypipe': 'lyPipe', 'in-lymql': 'lyMql', 'in-lysqo': 'lySqo', 'in-lybudget': 'lyBudget',
      'in-exp': 'expShare', 'in-expconv': 'expConv', 'in-pql': 'pqlPerMonth', 'in-infl': 'influenced' };
    Object.keys(map).forEach((id) => {
      const el = $(id), k = map[id];
      el.value = S[k] == null ? '' : S[k];
      el.oninput = () => { S[k] = el.type === 'number' ? num(el.value) : el.value; changed(false); };
    });
    editor('ed-segments', S.segments, [
      { key: 'name', label: 'Segment', w: 100 }, { key: 'share', label: 'Share %', type: 'num', w: 60 },
      { key: 'acv', label: 'Avg deal $', type: 'num', w: 80 }, { key: 'mqlSqo', label: 'MQL→SQO %', type: 'num', w: 60 }
    ], { noun: 'segment', make: () => ({ name: '', share: 0, acv: 50000, mqlSqo: 20 }) });
    editor('ed-regions', S.regions, [
      { key: 'name', label: 'Region', w: 110 }, { key: 'share', label: 'Share %', type: 'num', w: 60 }, { key: 'lead', label: 'Owned by', w: 130 }
    ], { noun: 'region', make: () => ({ name: '', share: 0, lead: '' }) });
    editor('ed-personas', S.personas, [
      { key: 'role', label: 'Role', w: 130 }, { key: 'part', label: 'Part in the deal', w: 110 }, { key: 'cares', label: 'Cares about', type: 'area' }
    ], { noun: 'role', make: () => ({ role: '', part: '', cares: '' }) });
    const roles = S.personas.map((p) => p.role).filter(Boolean);
    editor('ed-assets', S.assets, [
      { key: 'role', label: 'Role', type: 'select', options: roles.length ? roles : [''] }, { key: 'stage', label: 'Stage', type: 'select', options: STAGES },
      { key: 'asset', label: 'Asset or offer', type: 'area', w: 150 }, { key: 'status', label: 'Status', type: 'select', options: ASSET_STATUS },
      { key: 'owner', label: 'Owner', type: 'select', options: FUNCTIONS }, { key: 'due', label: 'Due month', type: 'num', w: 46 },
      { key: 'regions', label: 'Localize for', w: 110 }, { key: 'loc', label: 'Localization', type: 'select', options: LOC_STATUS }
    ], { noun: 'asset', make: () => ({ role: roles[0] || '', stage: 'Aware', asset: '', status: 'Missing', owner: 'PMM', due: 0, regions: '', loc: 'Not needed' }) });
    editor('ed-campaigns', S.campaigns, [
      { key: 'name', label: 'Campaign', w: 140 }, { key: 'tier', label: 'Tier', type: 'select', options: CAMP_TIERS }, { key: 'status', label: 'Status', type: 'select', options: CAMP_STATUS },
      { key: 'theme', label: 'Theme', type: 'area', w: 150 }, { key: 'offer', label: 'Hero offer', type: 'area', w: 140 }, { key: 'audience', label: 'Audience (roles)', type: 'area', w: 140 },
      { key: 'product', label: 'Product', w: 120 }, { key: 'start', label: 'Start mo', type: 'num', w: 44 }, { key: 'launch', label: 'Launch mo', type: 'num', w: 44 }, { key: 'end', label: 'End mo', type: 'num', w: 44 },
      { key: 'share', label: 'Pipeline %', type: 'num', w: 50 }, { key: 'programs', label: 'Programs', type: 'area', w: 130 }, { key: 'owner', label: 'Owner', type: 'select', options: FUNCTIONS }
    ], { noun: 'campaign', make: () => ({ name: '', tier: 'Tier 2 launch', status: 'Planning', theme: '', offer: '', audience: '', product: '', start: 1, launch: 2, end: 4, share: 0, programs: '', owner: 'Demand gen' }) });
    editor('ed-actuals', S.actuals, [
      { key: 'month', label: 'Month #', type: 'num', w: 44 }, { key: 'mql', label: 'MQLs', type: 'num', w: 56 }, { key: 'sqo', label: 'SQOs', type: 'num', w: 50 },
      { key: 'pipe', label: 'Pipeline $', type: 'num', w: 86 }, { key: 'spend', label: 'Spend $', type: 'num', w: 76 }
    ], { noun: 'month', make: () => ({ month: (S.actuals.reduce((m, a) => Math.max(m, num(a.month)), 0) || 0) + 1, mql: 0, sqo: 0, pipe: 0, spend: 0 }) });
    editor('ed-team', S.team, [
      { key: 'fn', label: 'Team', type: 'select', options: FUNCTIONS }, { key: 'hc', label: 'People', type: 'num', w: 44 }, { key: 'cap', label: 'Can run at once', type: 'num', w: 50 },
      { key: 'sla', label: 'SLA', type: 'area', w: 160 }, { key: 'intake', label: 'How to engage', type: 'area', w: 140 }, { key: 'escal', label: 'Escalation', w: 130 }
    ], { noun: 'team', make: () => ({ fn: 'Demand gen', hc: 1, cap: 3, sla: '', intake: '', escal: '' }) });
    editor('ed-asks', S.asks, [
      { key: 'ask', label: 'Ask or decision', type: 'area', w: 170 }, { key: 'who', label: 'From', w: 120 }, { key: 'by', label: 'By month', type: 'num', w: 44 }, { key: 'why', label: 'Why it matters', type: 'area', w: 150 }
    ], { noun: 'ask', make: () => ({ ask: '', who: '', by: 1, why: '' }) });
    editor('ed-abm', S.abmRegions, [
      { key: 'region', label: 'Region', w: 100 }, { key: 't1', label: 'Tier 1', type: 'num', w: 46 }, { key: 't2', label: 'Tier 2', type: 'num', w: 50 }, { key: 't3', label: 'Tier 3', type: 'num', w: 56 },
      { key: 'owner', label: 'Account owner', w: 120 }, { key: 'next', label: 'Next play', type: 'area', w: 170 }
    ], { noun: 'region', make: () => ({ region: '', t1: 0, t2: 0, t3: 0, owner: '', next: '' }) });
    editor('ed-tiers', S.tiers, [
      { key: 'tier', label: 'Tier', w: 100 }, { key: 'accounts', label: 'Accounts', type: 'num', w: 70 },
      { key: 'share', label: 'Pipeline %', type: 'num', w: 60 }, { key: 'play', label: 'Play', type: 'area', w: 180 }
    ], { noun: 'tier', make: () => ({ tier: '', accounts: 0, share: 0, play: '' }) });
    editor('ed-channels', S.channels, [
      { key: 'on', label: 'On', type: 'check' }, { key: 'name', label: 'Program', w: 150 },
      { key: 'owner', label: 'Owner', type: 'select', options: FUNCTIONS },
      { key: 'stage', label: 'Stage', type: 'select', options: ['Aware', 'Consider', 'Decide'] },
      { key: 'motion', label: 'Motion', type: 'select', options: ['Always-on', 'Burst', 'Both'] },
      { key: 'runBy', label: 'Run by', type: 'select', options: ['HQ', 'Region', 'Both'] },
      { key: 'share', label: 'Share %', type: 'num', w: 56 }, { key: 'cpm', label: '$ / MQL', type: 'num', w: 60 }
    ], { noun: 'program', make: () => ({ id: 'c' + Date.now(), on: true, name: '', owner: 'Demand gen', kind: 'Owned', stage: 'Consider', motion: 'Always-on', runBy: 'HQ', share: 0, cpm: 500 }) });
    editor('ed-moments', S.moments, [
      { key: 'month', label: 'Month #', type: 'num', w: 50 }, { key: 'name', label: 'Moment', w: 180 },
      { key: 'type', label: 'Type', type: 'select', options: ['Launch', 'Event', 'Season'] }
    ], { noun: 'moment', make: () => ({ month: 1, name: '', type: 'Launch' }) });
    editor('ed-products', S.products, [
      { key: 'name', label: 'Product', w: 150 }, { key: 'share', label: 'Pipeline %', type: 'num', w: 60 },
      { key: 'launch', label: 'Launch month', type: 'num', w: 56 }
    ], { noun: 'product', make: () => ({ name: '', share: 0, launch: 0 }) });
    editor('ed-risks', S.risks, [
      { key: 'risk', label: 'Risk or assumption', type: 'area', w: 150 },
      { key: 'link', label: 'Status set by', type: 'select', options: RISK_LINKS },
      { key: 'status', label: 'Status (if owner sets it)', type: 'select', options: RISK_STATUS },
      { key: 'likelihood', label: 'Likelihood', type: 'select', options: ['High', 'Medium', 'Low'] },
      { key: 'impact', label: 'Pipeline at risk $', type: 'num', w: 80 }, { key: 'owner', label: 'Owner', w: 90 },
      { key: 'signal', label: 'Early warning signal', type: 'area', w: 160 }, { key: 'trigger', label: 'Trigger', type: 'area', w: 150 },
      { key: 'contingency', label: 'Contingency plan', type: 'area', w: 200 }, { key: 'mitigation', label: 'Prevent now', type: 'area', w: 160 }
    ], { noun: 'risk', make: () => ({ risk: '', link: 'Owner sets it', status: 'On track', likelihood: 'Medium', impact: 0, owner: '', signal: '', trigger: '', contingency: '', mitigation: '' }) });
    bindRegionPlan();
  }

  /* ---------- regional plans: each GEO lead fills in theirs ---------- */
  const PLAN_TAG = 'DEMAND GEN HUB · REGIONAL PLAN';
  function regionPlan(name) {
    if (!S.regionPlans[name]) S.regionPlans[name] = { status: 'Not started', adapt: '', programs: [] };
    return S.regionPlans[name];
  }
  function bindRegionPlan() {
    const names = S.regions.map((r) => r.name).filter(Boolean);
    if (!names.includes(rpSel)) rpSel = names[0] || null;
    const sel = $('in-rp-region');
    sel.innerHTML = names.map((n) => '<option' + (n === rpSel ? ' selected' : '') + '>' + esc(n) + '</option>').join('');
    sel.onchange = () => { rpSel = sel.value; bindRegionPlan(); };
    const has = !!rpSel;
    ['in-rp-status', 'in-rp-adapt', 'btn-rp-copy', 'in-rp-file'].forEach((id) => { $(id).disabled = !has; });
    if (!has) { $('ed-rp-programs').innerHTML = '<p class="hint">Add a region above first.</p>'; return; }
    const pl = regionPlan(rpSel);
    $('in-rp-status').value = pl.status || 'Not started';
    $('in-rp-status').onchange = (e) => { pl.status = e.target.value; changed(false); };
    $('in-rp-adapt').value = pl.adapt || '';
    $('in-rp-adapt').oninput = (e) => { pl.adapt = e.target.value; changed(false); };
    editor('ed-rp-programs', pl.programs, [
      { key: 'name', label: 'Regional program', w: 150 }, { key: 'month', label: 'Month #', type: 'num', w: 46 },
      { key: 'budget', label: 'Budget $', type: 'num', w: 70 }, { key: 'mql', label: 'MQLs', type: 'num', w: 50 }
    ], { noun: 'program', make: () => ({ name: '', month: 1, budget: 0, mql: 0 }) });
  }
  /* ---------- plan upload: CSV or Excel, one row per program ---------- */
  const COLS = { name: /program|campaign|tactic|activity|name|initiative/i, month: /month|date|when|timing|start/i, budget: /budget|cost|spend|investment|\$/i, mql: /mql|leads?\b/i, region: /region|geo|market|theater/i };
  function parseCsv(text) {
    const sep = (text.split('\n')[0].match(/\t/g) || []).length > (text.split('\n')[0].match(/,/g) || []).length ? '\t' : ',';
    const rows = []; let row = [], cell = '', q = false;
    for (let i = 0; i < text.length; i++) {
      const ch = text[i];
      if (q) { if (ch === '"') { if (text[i + 1] === '"') { cell += '"'; i++; } else q = false; } else cell += ch; }
      else if (ch === '"') q = true;
      else if (ch === sep) { row.push(cell); cell = ''; }
      else if (ch === '\n' || ch === '\r') { if (ch === '\r' && text[i + 1] === '\n') i++; row.push(cell); rows.push(row); row = []; cell = ''; }
      else cell += ch;
    }
    if (cell || row.length) { row.push(cell); rows.push(row); }
    return rows.filter((r) => r.some((c) => String(c).trim()));
  }
  function loadXlsx() {
    if (window.XLSX) return Promise.resolve(window.XLSX);
    return new Promise((ok, fail) => {
      const sc = document.createElement('script');
      sc.src = 'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js';
      sc.onload = () => ok(window.XLSX); sc.onerror = () => fail(new Error('Excel reader did not load'));
      document.head.appendChild(sc);
    });
  }
  function money2num(v) {
    const t = String(v == null ? '' : v).replace(/[$,\s]/g, '');
    const m = t.match(/^(-?[\d.]+)([kKmM]?)/); if (!m) return 0;
    return parseFloat(m[1]) * (/k/i.test(m[2]) ? 1e3 : /m/i.test(m[2]) ? 1e6 : 1);
  }
  // a month as written in the file -> plan month (1 = plan start)
  function planMonth(v) {
    const startM = num((S.start || '2027-01').split('-')[1]) || 1;
    const rel = (cal) => ((cal - startM + 12) % 12) + 1;
    if (typeof v === 'number') return v > 20000 ? rel(new Date(Math.round((v - 25569) * 864e5)).getUTCMonth() + 1) : Math.round(v);
    const t = String(v || '').trim(); if (!t) return 0;
    const name = MONTHS.findIndex((m) => t.toLowerCase().startsWith(m.toLowerCase()));
    if (name >= 0) return rel(name + 1);
    const iso = t.match(/^(\d{4})-(\d{1,2})/); if (iso) return rel(+iso[2]);
    const us = t.match(/^(\d{1,2})\/\d{1,2}\/\d{2,4}$/); if (us) return rel(+us[1]);
    const n = parseInt(t.replace(/^m(onth)?\s*/i, ''), 10); return isFinite(n) ? n : 0;
  }
  function rowsToPrograms(rows, region) {
    let h = rows.findIndex((r) => r.filter((c) => Object.values(COLS).some((re) => re.test(String(c)))).length >= 2);
    if (h < 0) throw new Error('Couldn\'t find a header row with program, month, budget and MQL columns');
    const head = rows[h].map((c) => String(c));
    const col = {};
    Object.keys(COLS).forEach((k) => { col[k] = head.findIndex((c, i) => COLS[k].test(c) && !Object.values(col).includes(i)); });
    if (col.name < 0) throw new Error('No program column found');
    const out = [];
    rows.slice(h + 1).forEach((r) => {
      if (col.region >= 0 && r[col.region] && String(r[col.region]).trim().toLowerCase() !== region.toLowerCase()) return;
      const name = String(r[col.name] || '').trim(); if (!name) return;
      out.push({ name, month: col.month >= 0 ? planMonth(r[col.month]) : 0, budget: col.budget >= 0 ? money2num(r[col.budget]) : 0, mql: col.mql >= 0 ? money2num(r[col.mql]) : 0 });
    });
    if (!out.length) throw new Error('No programs found for ' + region);
    return out;
  }
  async function uploadPlan(file) {
    if (!rpSel || !file) return;
    const region = rpSel;
    try {
      let rows;
      if (/\.xlsx?$/i.test(file.name)) {
        const X = await loadXlsx();
        const wb = X.read(await file.arrayBuffer(), { type: 'array' });
        const sheet = wb.SheetNames.find((n) => n.toLowerCase() === region.toLowerCase()) || wb.SheetNames[0];
        rows = X.utils.sheet_to_json(wb.Sheets[sheet], { header: 1, raw: true, defval: '' });
      } else rows = parseCsv(await file.text());
      const pl = regionPlan(region);
      pl.programs = rowsToPrograms(rows, region);
      pl.file = file.name; pl.uploaded = new Date().toISOString().slice(0, 10); pl.ai = '';
      if (pl.status === 'Not started') pl.status = 'Draft';
      if (pl.status === 'Approved') { pl.status = 'Submitted'; pl.review = { st: 'Submitted', note: 'New file after approval: ' + file.name, date: new Date().toISOString().slice(0, 10) }; }
      tab = 'regions'; renderTabs(); changed(true);
      toast(pl.programs.length + ' programs read from ' + file.name);
      const el = document.getElementById('rg-' + slug(region)); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } catch (e) { toast(e.message || 'Couldn\'t read that file'); }
    $('in-rp-file').value = '';
  }
  function templateCsv() {
    const pl = rpSel ? regionPlan(rpSel) : { programs: [] };
    const rows = (pl.programs.length ? pl.programs : [{ name: 'Example: city roadshow', month: 3, budget: 100000, mql: 50 }])
      .map((x) => [rpSel || '', '"' + String(x.name).replace(/"/g, '""') + '"', P_label(x.month), Math.round(num(x.budget)), Math.round(num(x.mql))].join(','));
    return 'Region,Program,Month,Budget,MQLs\n' + rows.join('\n') + '\n';
  }
  function P_label(m) { return monthLabels()[Math.round(num(m)) - 1] || m; }
  const slug = (t) => String(t).toLowerCase().replace(/[^a-z0-9]+/g, '-');

  /* ---------- digest: read a region's plan against the global plan ---------- */
  function digest(r, P) {
    const progs = (r.plan.programs || []).filter((x) => x.name || num(x.mql));
    if (!progs.length) return { head: 'No plan yet. ' + esc(r.name) + ' owes ' + fmtInt(r.owes) + ' MQLs from its own programs.', items: [['fix', 'Ask ' + esc(r.lead || 'the regional lead') + ' to upload a plan.']] };
    const items = [];
    const regCh = P.channels.filter((c) => c.runBy === 'Region');
    const planCpm = regCh.reduce((a, c) => a + c.mql, 0) ? regCh.reduce((a, c) => a + c.cost, 0) / regCh.reduce((a, c) => a + c.mql, 0) : 0;
    const allotted = regCh.reduce((a, c) => a + c.cost, 0) * r.w;
    const cpm = r.committed ? r.spend / r.committed : 0;
    // coverage
    if (r.gap > 0.5) items.push(['fix', 'Short ' + fmtInt(r.gap) + ' MQLs. At ' + money(cpm || planCpm) + ' per MQL that is about ' + money(r.gap * (cpm || planCpm)) + ' more in regional programs, or ask HQ to point a global webinar or paid burst at ' + esc(r.name) + '.']);
    else if (r.coverage > 1.2) items.push(['ok', 'Covers ' + coverCell(r.coverage) + ' of what it owes. HQ could ease paid spend into ' + esc(r.name) + ' or raise its target.']);
    else items.push(['ok', 'Covers what it owes (' + coverCell(r.coverage) + ').']);
    // budget
    if (allotted && r.spend > allotted * 1.1) items.push(['fix', 'Spends ' + money(r.spend) + ' against about ' + money(allotted) + ' planned for region-run programs, ' + money(r.spend - allotted) + ' over.']);
    else if (allotted) items.push(['ok', 'Spends ' + money(r.spend) + ' of about ' + money(allotted) + ' planned for region-run programs.']);
    // efficiency
    if (planCpm && cpm > planCpm * 1.5) items.push(['watch', 'Costs ' + money(cpm) + ' per MQL against ' + money(planCpm) + ' planned.']);
    progs.forEach((x) => { const c = num(x.mql) ? num(x.budget) / num(x.mql) : 0; if (planCpm && c > planCpm * 2) items.push(['watch', esc(x.name) + ' costs ' + money(c) + ' per MQL, over twice the plan. Check the MQL estimate or treat it as influence, not sourced.']); });
    const noMql = progs.filter((x) => !num(x.mql)).length, noMonth = progs.filter((x) => !num(x.month)).length;
    if (noMql) items.push(['watch', noMql + ' program' + (noMql > 1 ? 's have' : ' has') + ' no MQL estimate.']);
    if (noMonth) items.push(['watch', noMonth + ' program' + (noMonth > 1 ? 's have' : ' has') + ' no month.']);
    // SDR capacity
    progs.forEach((x) => { const i = Math.round(num(x.month)) - 1; if (P.sdrCap > 0 && P.monthly[i] > P.sdrCap + 0.5) items.push(['watch', esc(x.name) + ' lands in ' + P.labels[i] + ', when SDRs are already over capacity. Line up follow-up before it runs.']); });
    // launches
    S.moments.filter((m) => m.type === 'Launch').forEach((m) => {
      const lm = Math.round(num(m.month));
      if (!progs.some((x) => { const d = Math.round(num(x.month)) - lm; return d >= 0 && d <= 1; })) items.push(['watch', 'Nothing in ' + esc(r.name) + ' follows ' + esc(m.name) + ' (' + (P.labels[lm - 1] || 'month ' + lm) + '). A local event or webinar in that window would ride the launch.']);
    });
    // late-year pipeline
    const lateFrom = Math.max(1, 12 - Math.round(num(S.cycle) / 30));
    const late = progs.filter((x) => num(x.month) > lateFrom).reduce((a, x) => a + num(x.mql), 0);
    if (r.committed && late / r.committed > 0.3) items.push(['watch', fmtInt(late / r.committed * 100) + '% of its MQLs land after ' + P.labels[lateFrom - 1] + ', so that pipeline mostly closes next year.']);
    const rank = { fix: 0, watch: 1, ok: 2 };
    items.sort((a, b) => rank[a[0]] - rank[b[0]]);
    return { head: progs.length + ' program' + (progs.length === 1 ? '' : 's') + ' · ' + money(r.spend) + ' · ' + fmtInt(r.committed) + ' MQLs · ' + coverCell(r.coverage) + ' of what ' + esc(r.name) + ' owes', items };
  }
  function digestBox(r, P) {
    const d = digest(r, P), lab = { fix: 'Fix', watch: 'Watch', ok: 'OK' };
    const ai = r.plan.ai ? '<div class="aidig"><b>Claude\'s read</b><div>' + esc(r.plan.ai).replace(/\n/g, '<br>') + '</div></div>' : '';
    const btn = aiKey && (r.plan.programs || []).length ? '<button class="btn" type="button" data-ai="' + esc(r.name) + '">' + (r.plan.ai ? 'Refresh Claude\'s read' : 'Ask Claude for a read') + '</button>' : '';
    return '<div class="digest"><div class="dhead"><b>Digest</b>' + (r.plan.file ? '<span class="note">from ' + esc(r.plan.file) + (r.plan.uploaded ? ' · ' + esc(r.plan.uploaded) : '') + '</span>' : '') + '</div>' +
      '<p class="note">' + d.head + '</p><div class="health">' + d.items.map(([k, t]) => '<span class="hp ' + k + '">' + lab[k] + '</span><span>' + t + '</span>').join('') + '</div>' + ai + btn + '</div>';
  }
  // HQ sign-off on a region's plan
  function reviewBox(r) {
    const st = r.status, rv = r.plan.review, n = esc(r.name), gap = r.gap > 0.5 ? ' with a ' + fmtInt(r.gap) + ' MQL gap' : '';
    const last = rv && rv.note ? '<p class="note">' + (rv.st === 'Changes requested' ? 'Sent back' : rv.st === 'Approved' ? 'Approved' : 'Note') + (rv.date ? ' ' + esc(rv.date) : '') + ': ' + esc(rv.note) + '</p>' : rv && rv.st === 'Approved' ? '<p class="note">Approved ' + esc(rv.date || '') + '</p>' : '';
    if (st === 'Approved') return '<div class="review ok">' + last + '<button class="btn" type="button" data-rv="reopen" data-region="' + n + '">Reopen</button></div>';
    if (st === 'Not started') return '<div class="review">' + last + '<p class="note">Nothing to review until ' + n + ' uploads a plan.</p></div>';
    return '<div class="review">' + last + '<label class="f">Note to ' + n + ' (optional)<input type="text" class="rv-note" placeholder="' + (gap ? 'e.g. close the gap with a second roadshow leg' : 'e.g. looks good') + '"></label>' +
      '<div class="rv-btns"><button class="btn primary" type="button" data-rv="approve" data-region="' + n + '">Approve' + gap + '</button><button class="btn" type="button" data-rv="back" data-region="' + n + '">Send back</button></div>' +
      (st === 'Draft' ? '<p class="note">' + n + ' still has this as a draft.</p>' : '') + '</div>';
  }
  function hqDigest(P) {
    const all = P.regions.map((r) => ({ r, d: digest(r, P) }));
    const fixes = all.flatMap(({ r, d }) => d.items.filter((i) => i[0] === 'fix').map((i) => '<b>' + esc(r.name) + ':</b> ' + i[1]));
    const watches = all.reduce((a, { d }) => a + d.items.filter((i) => i[0] === 'watch').length, 0);
    const sub = P.regions.filter((r) => isIn(r.status)).length, appr = P.regions.filter((r) => r.status === 'Approved').length;
    const worst = P.regions.slice().sort((a, b) => b.gap - a.gap)[0];
    return '<div class="box hqd"><h3>Regional digest</h3><p>' + sub + ' of ' + P.regions.length + ' regions submitted, ' + appr + ' approved. Regional programs cover ' + coverCell(P.roll.coverage) + ' of what regions owe, leaving ' + fmtInt(P.roll.gap) + ' MQLs (' + money(P.roll.gap * (P.tot.mql ? P.tot.pipe / P.tot.mql : 0)) + ' pipeline) uncovered' +
      (worst && worst.gap > 0.5 ? '. The biggest gap is ' + esc(worst.name) + ' at ' + fmtInt(worst.gap) + ' MQLs' : '') + '. ' + watches + ' smaller item' + (watches === 1 ? '' : 's') + ' to watch are in each region below.</p>' +
      (fixes.length ? '<b>Act on first</b><ul>' + fixes.slice(0, 4).map((f) => '<li>' + f + '</li>').join('') + '</ul>' : '<p class="note">Nothing to fix.</p>') + '</div>';
  }
  let aiKey = '';
  async function askClaude(name) {
    const P = compute(), r = P.regions.find((x) => x.name === name); if (!r || !aiKey) return;
    const d = digest(r, P);
    const ctx = {
      plan: { name: S.name, fiscalYear: S.fy, products: S.product, pipelineTarget: P.tot.pipe, mqlTarget: Math.round(P.tot.mql), months: P.labels, launches: S.moments, salesCycleDays: num(S.cycle) },
      region: { name: r.name, share: +(r.w * 100).toFixed(1), mqlTarget: Math.round(r.mql), fromHqPrograms: Math.round(r.fromHq), owesFromOwnPrograms: Math.round(r.owes), committed: Math.round(r.committed), budget: Math.round(r.spend), adaptingLocally: r.plan.adapt, programs: r.plan.programs },
      ruleChecks: d.items.map((i) => i[0] + ': ' + i[1].replace(/<[^>]+>/g, ''))
    };
    toast('Asking Claude about ' + name + '…');
    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'content-type': 'application/json', 'x-api-key': aiKey, 'anthropic-version': '2023-06-01', 'anthropic-dangerous-direct-browser-access': 'true' },
        body: JSON.stringify({ model: 'claude-sonnet-5-5', max_tokens: 700, messages: [{ role: 'user', content:
          'You are a VP of demand generation reviewing a regional marketing plan against the global plan. In 5 short bullets (plain text, start each with "- "), say what is strong, what is at risk, and the specific actions the regional lead should take before the plan is approved. Be concrete with numbers and months. No preamble.\n\n' + JSON.stringify(ctx) }] })
      });
      const j = await res.json();
      if (!res.ok) throw new Error((j.error && j.error.message) || 'Request failed');
      regionPlan(name).ai = (j.content || []).filter((c) => c.type === 'text').map((c) => c.text).join('\n').trim();
      changed(false); toast('Claude\'s read added to ' + name);
    } catch (e) { toast('Claude request failed: ' + e.message); }
  }

  function planBlock(name) {
    const pl = regionPlan(name);
    return PLAN_TAG + '\n' + JSON.stringify({ plan: S.name || '', region: name, status: pl.status, adapt: pl.adapt, programs: pl.programs });
  }
  function importPlan(text) {
    const at = text.indexOf('{');
    let d;
    try { d = JSON.parse(text.slice(at, text.lastIndexOf('}') + 1)); } catch (e) { return toast('That doesn\'t look like a regional plan'); }
    if (at < 0 || !d || !d.region) return toast('That doesn\'t look like a regional plan');
    if (!S.regions.some((r) => r.name === d.region)) return toast('No region called ' + d.region + ' in this plan');
    S.regionPlans[d.region] = {
      status: PLAN_STATUS.includes(d.status) ? d.status : 'Draft',
      adapt: String(d.adapt || ''),
      programs: (Array.isArray(d.programs) ? d.programs : []).map((x) => ({ name: String(x.name || ''), month: num(x.month), budget: num(x.budget), mql: num(x.mql) }))
    };
    if (S.regionPlans[d.region]) S.regionPlans[d.region].file = 'pasted plan';
    rpSel = d.region; $('in-rp-paste').value = '';
    changed(true); toast(d.region + ' plan added to the roll-up');
  }

  function changed(rebind) {
    if (S.isExample) { S.isExample = false; }
    $('example-pill').hidden = !S.isExample;
    save();
    if (rebind) bindInputs();
    render();
  }

  /* ---------- tabs ---------- */
  const TAB_GROUPS = [
    ['Overview', [['onepage', 'Plan on a page'], ['summary', 'Summary'], ['pacing', 'Pacing'], ['checks', 'Check the math']]],
    ['Plan', [['campaigns', 'Campaigns'], ['quarters', 'Quarterly plan'], ['funnel', 'Funnel & motion'], ['channels', 'Channel mix'], ['calendar', 'Calendar']]],
    ['Regions & accounts', [['regions', 'Regional plans'], ['committee', 'Buying committee & ABM']]],
    ['Execution', [['owners', 'Team & owners'], ['paid', 'Paid brief'], ['measure', 'Measurement'], ['scenarios', 'Scenarios & asks'], ['risks', 'Risks']]]
  ];
  const TABS = TAB_GROUPS.flatMap((g) => g[1]);
  function renderTabs() {
    const cur = TAB_GROUPS.find((g) => g[1].some((t) => t[0] === tab)) || TAB_GROUPS[0];
    $('tabs').innerHTML = '<div class="sections" aria-label="Sections">' + TAB_GROUPS.map(([g, ts]) => '<button class="sec" type="button" data-group="' + esc(g) + '" aria-pressed="' + (g === cur[0]) + '">' + esc(g) + '</button>').join('') + '</div>' +
      '<div class="subtabs" role="tablist">' + cur[1].map(([k, l]) => '<button class="tab" role="tab" type="button" data-tab="' + k + '" aria-selected="' + (k === tab) + '">' + l + '</button>').join('') + '</div>';
    const on = $('tabs').querySelector('.tab[aria-selected=true]'), row = on && on.parentElement;
    if (row) row.scrollLeft = Math.max(0, on.offsetLeft - row.offsetLeft - 24);
    $('tabs').onclick = (e) => {
      const b = e.target.closest('button'); if (!b) return;
      let k = b.dataset.tab;
      if (b.dataset.group) { const g = TAB_GROUPS.find((x) => x[0] === b.dataset.group); k = (lastIn[g[0]] && g[1].some((t) => t[0] === lastIn[g[0]])) ? lastIn[g[0]] : g[1][0][0]; }
      if (!k) return;
      tab = k; const g = TAB_GROUPS.find((x) => x[1].some((t) => t[0] === k)); if (g) lastIn[g[0]] = k;
      try { localStorage.setItem(STORE_KEY + ':tab', k); } catch (x) { /* ignore */ }
      renderTabs(); render();
    };
  }
  const lastIn = {};

  function render() {
    const P = extend(compute());
    $('panel').innerHTML = (VIEWS[tab] || VIEWS2[tab])(P);
    if (tab === 'owners') bindRaci();
  }

  const VIEWS = {
    summary(P) {
      const t = P.tot, s2p = P.budget ? t.pipe / P.budget : 0;
      const steps = [['Leads', t.leads, 'raw responses'], ['MQLs', t.mql, 'marketing qualified'], ['SQOs', t.sqo, 'sales accepted opps'], ['Closed-won', t.won, 'deals']];
      const max = Math.max(1, t.leads);
      const funnel = steps.map((s, i) => {
        let rate = '';
        if (i === 1) rate = '<div class="rate">' + pct(P.r1 * 100) + ' of leads become MQLs</div>';
        if (i === 2) rate = '<div class="rate">' + pct(t.mql ? (t.sqo / t.mql) * 100 : 0) + ' of MQLs become SQOs (blended)</div>';
        if (i === 3) rate = '<div class="rate">' + pct(P.r3 * 100) + ' of SQOs close</div>';
        return rate + '<div class="fstep"><div class="lab">' + s[0] + '<small>' + s[2] + '</small></div><div class="bar"><i style="width:' + (s[1] / max * 100).toFixed(2) + '%"></i></div><div class="val">' + fmtInt(s[1]) + '</div></div>';
      }).join('');
      return '<div><h2>' + esc(S.name || 'Untitled plan') + '</h2><p class="lead">' + esc(S.fy) + (S.product ? ' · ' + esc(S.product) : '') + '</p></div>' +
        '<div class="tiles">' +
        '<div class="tile hero"><span>Sourced pipeline target</span><b>' + money(t.pipe) + '</b><span>' + money(t.bookings) + ' expected bookings</span></div>' +
        '<div class="tile"><span>SQOs needed</span><b>' + fmtInt(t.sqo) + '</b><span>' + fmtInt(t.sqo / 12) + ' a month</span></div>' +
        '<div class="tile"><span>MQLs needed</span><b>' + fmtInt(t.mql) + '</b><span>' + fmtInt(t.mql / 12) + ' a month</span></div>' +
        '<div class="tile"><span>Program budget</span><b>' + money(P.budget) + '</b><span>' + (s2p ? s2p.toFixed(1) + 'x pipeline to spend' : 'set $ / MQL') + '</span></div>' +
        '</div>' +
        '<div class="split">' + healthBox(P) + productBox(P) + baselineBox(P) + '</div>' +
        '<div class="split"><div class="box" style="grid-column:1/-1"><h3>Reverse funnel</h3><p class="note">Worked back from the pipeline target. Bars are to scale.</p><div class="funnel">' + funnel + '</div></div></div>' +
        '<div class="box"><h3>MQLs by month</h3><p class="note">Always-on programs run flat; burst programs follow launch moments (marked).</p>' + monthChart(P) + '</div>';
    },
    funnel(P) {
      const rows = P.segs.map((s, i) => '<tr><td>' + dl(esc(s.name)) + '</td><td class="n">' + pct(s.w * 100) + '</td><td class="n">' + money(s.pipe) + '</td><td class="n">' + money(s.acv) + '</td><td class="n">' + fmtInt(s.sqo) + '</td><td class="n">' + fmtInt(s.mql) + '</td><td class="n">' + fmtInt(s.leads) + '</td><td class="n">' + money(s.bookings) + '</td></tr>' + why(8, [
        ['Pipeline', money(P.goal) + ' target × ' + pct(s.w * 100) + ' segment share', money(s.pipe)],
        ['SQOs', money(s.pipe) + ' pipeline ÷ ' + money(s.acv) + ' average deal', fmtInt(s.sqo)],
        ['MQLs', fmtInt(s.sqo) + ' SQOs ÷ ' + pct(num(S.segments[i].mqlSqo)) + ' MQL → SQO rate', fmtInt(s.mql)],
        ['Leads', fmtInt(s.mql) + ' MQLs ÷ ' + pct(P.r1 * 100) + ' lead → MQL rate', fmtInt(s.leads)],
        ['Bookings', money(s.pipe) + ' pipeline × ' + pct(P.r3 * 100) + ' SQO → closed-won rate', money(s.bookings)]
      ], 'Change the share, deal size and MQL → SQO rate under Segments, and the other rates under Pipeline goal & funnel.')).join('');
      const t = P.tot;
      return '<div><h2>Funnel &amp; motion</h2><p class="lead">Each segment has its own deal size and MQL-to-SQO rate, so the volume needed differs a lot. Smaller deals need far more MQLs per dollar of pipeline. Tap a segment to see how its numbers are built.</p></div>' +
        '<div class="out"><table class="t" data-export><thead><tr><th>Segment</th><th class="n">Share</th><th class="n">Pipeline</th><th class="n">Avg deal</th><th class="n">SQOs</th><th class="n">MQLs</th><th class="n">Leads</th><th class="n">Bookings</th></tr></thead><tbody>' + rows +
        '</tbody><tfoot><tr><td>Total</td><td class="n">100%</td><td class="n">' + money(t.pipe) + '</td><td class="n">' + money(t.sqo ? t.pipe / t.sqo : 0) + '</td><td class="n">' + fmtInt(t.sqo) + '</td><td class="n">' + fmtInt(t.mql) + '</td><td class="n">' + fmtInt(t.leads) + '</td><td class="n">' + money(t.bookings) + '</td></tr></tfoot></table></div>' +
        '<p class="note">Sales cycle: ' + fmtInt(num(S.cycle)) + ' days, so pipeline created after month ' + Math.max(1, 12 - Math.round(num(S.cycle) / 30)) + ' mostly closes next fiscal year.</p>' + motionBox(P);
    },
    regions(P) {
      const R = P.roll;
      const hqMql = P.channels.filter((c) => c.runBy !== 'Region').reduce((a, c) => a + c.mql, 0), regMql = P.channels.filter((c) => c.runBy === 'Region').reduce((a, c) => a + c.mql, 0);
      const rows = P.regions.map((r) => '<tr><td>' + dl(esc(r.name)) + '</td><td>' + statusPill(r.status) + '</td><td class="n">' + money(r.pipe) + '</td><td class="n">' + fmtInt(r.mql) + '</td><td class="n">' + fmtInt(r.fromHq) + '</td><td class="n">' + fmtInt(r.owes) + '</td><td class="n">' + fmtInt(r.committed) + '</td><td class="n">' + money(r.spend) + '</td><td class="n">' + coverCell(r.coverage) + '</td><td class="n">' + fmtInt(r.gap) + '</td></tr>' + why(10, [
        ['Pipeline', money(P.tot.pipe) + ' × ' + pct(r.w * 100) + ' region share', money(r.pipe)],
        ['MQL target', fmtInt(P.tot.mql) + ' MQLs × ' + pct(r.w * 100), fmtInt(r.mql)],
        ['From HQ programs', fmtInt(hqMql) + ' MQLs from programs HQ runs or shares × ' + pct(r.w * 100), fmtInt(r.fromHq)],
        ['Region owes', fmtInt(regMql) + ' MQLs from region-run programs × ' + pct(r.w * 100), fmtInt(r.owes)],
        ['Committed', (r.plan.programs || []).map((x) => esc(x.name || 'Untitled') + ' ' + fmtInt(num(x.mql))).join(' + ') || 'No programs entered yet', fmtInt(r.committed)],
        ['Coverage', fmtInt(r.committed) + ' committed ÷ ' + fmtInt(r.owes) + ' owed', coverCell(r.coverage)],
        ['Gap', fmtInt(r.owes) + ' owed − ' + fmtInt(r.committed) + ' committed', fmtInt(r.gap)]
      ], 'The region enters its programs in the left pane, under Regional plans.')).join('');
      const hq = P.channels.filter((c) => c.runBy !== 'Region').map((c) => esc(c.name)).join(', ') || 'None';
      const own = P.channels.filter((c) => c.runBy === 'Region').map((c) => esc(c.name)).join(', ') || 'None';
      const sections = P.regions.map((r) => {
        const progs = (r.plan.programs || []).filter((x) => x.name || num(x.mql));
        const list = progs.length ? '<ul>' + progs.map((x) => '<li>' + esc(x.name || 'Untitled') + ' <span class="note">· month ' + fmtInt(num(x.month)) + ' (' + (P.labels[Math.round(num(x.month)) - 1] || '?') + ') · ' + money(num(x.budget)) + ' · ' + fmtInt(num(x.mql)) + ' MQLs</span></li>').join('') + '</ul>' : '<p class="note">No regional programs yet.</p>';
        return '<div class="box region' + (r.status === 'Not started' ? ' empty' : '') + '" id="rg-' + slug(r.name) + '"><div class="rmain"><div class="rhead"><h3>' + esc(r.name) + '</h3>' + statusPill(r.status) + '</div>' +
          '<p class="note">' + pct(r.w * 100) + ' of the number · ' + money(r.pipe) + ' pipeline · ' + fmtInt(r.mql) + ' MQLs' + (r.lead ? ' · owned by ' + esc(r.lead) : '') + '</p>' +
          '<div><b>HQ delivers</b> ' + fmtInt(r.fromHq) + ' MQLs from global programs</div>' +
          '<div><b>Region owes</b> ' + fmtInt(r.owes) + ' MQLs from its own programs</div>' + list +
          (r.plan.adapt ? '<div><b>Adapting locally</b> ' + esc(r.plan.adapt) + '</div>' : '') +
          '<div class="' + (r.gap > 0.5 ? 'gap' : 'ok') + '">' + (r.gap > 0.5 ? 'Gap: ' + fmtInt(r.gap) + ' MQLs' : 'Covered') + ' · ' + coverCell(r.coverage) + ' coverage</div>' + reviewBox(r) + '</div>' + digestBox(r, P) + '</div>';
      }).join('');
      const regNames = P.regions.map((r) => r.name);
      const upChips = P.regions.map((r) => '<span class="upchip' + (r.plan.file || (r.plan.programs || []).length ? ' done' : '') + '">' + esc(r.name) + ' · ' + (r.plan.file ? esc(r.plan.file) : (r.plan.programs || []).length ? (r.plan.programs.length + ' program' + (r.plan.programs.length === 1 ? '' : 's') + ' entered') : 'no plan yet') + '</span>').join('');
      const upload = '<div class="box rgup"><div class="rgup-head"><h3>Upload a regional plan</h3><span class="note">CSV or Excel · one row per program · columns for program, month, budget and MQLs, in any order</span></div>' +
        '<div class="rgup-row"><label class="f">Region<select id="rg-up-region">' + regNames.map((n) => '<option' + (n === rpSel ? ' selected' : '') + '>' + esc(n) + '</option>').join('') + '</select></label>' +
        '<label class="f rgup-file">Plan file<input id="rg-up-file" type="file" accept=".csv,.tsv,.txt,.xlsx,.xls"' + (regNames.length ? '' : ' disabled') + '></label></div>' +
        '<p class="hint"><button class="linkbtn" type="button" id="rg-up-template">Download the template</button> · <a href="samples/latam-plan.csv" download>Try a sample LATAM plan</a> · A region can also copy its plan as text and HQ pastes it in the left pane, under Regional plans.</p>' +
        '<div class="upchips">' + upChips + '</div></div>';
      return '<div><h2>Regional plans</h2><p class="lead">HQ owns the strategy, message, platforms and measurement. Each region owns its slice of the number and uploads its plan below. Each upload gets a digest that checks it against the global plan. Tap a region to see how its numbers are built.</p></div>' + upload +
        '<div class="out"><table class="t" data-export><thead><tr><th>Region</th><th>Status</th><th class="n">Pipeline</th><th class="n">MQL target</th><th class="n">From HQ programs</th><th class="n">Region owes</th><th class="n">Committed</th><th class="n">Regional budget</th><th class="n">Coverage</th><th class="n">Gap</th></tr></thead><tbody>' + rows +
        '</tbody><tfoot><tr><td>Total</td><td>' + P.regions.filter((r) => isIn(r.status)).length + ' of ' + P.regions.length + ' in · ' + P.regions.filter((r) => r.status === 'Approved').length + ' approved</td><td class="n">' + money(P.tot.pipe) + '</td><td class="n">' + fmtInt(R.mql) + '</td><td class="n">' + fmtInt(R.fromHq) + '</td><td class="n">' + fmtInt(R.owes) + '</td><td class="n">' + fmtInt(R.committed) + '</td><td class="n">' + money(R.spend) + '</td><td class="n">' + coverCell(R.coverage) + '</td><td class="n">' + fmtInt(R.gap) + '</td></tr></tfoot></table></div>' +
        '<p class="note">HQ programs: ' + hq + '. Region-run programs: ' + own + '. Change who runs a program in Channels &amp; programs.</p>' +
        hqDigest(P) + '<div class="regions">' + sections + '</div>' +
        '<div class="box"><h3>Keep consistent vs adapt</h3><div class="split"><div><b>Keep consistent</b><ul><li>Positioning and campaign theme</li><li>Target account criteria and ABM tiers</li><li>Brand and creative system</li><li>Funnel definitions and attribution</li></ul></div><div><b>Adapt by region</b><ul><li>Language and local proof points</li><li>Channel mix and offers</li><li>Timing around local seasons and holidays</li><li>Compliance, such as GDPR in EMEA</li></ul></div></div></div>';
    },
    quarters(P) {
      const spm = P.tot.mql ? P.tot.sqo / P.tot.mql : 0, ppm = P.tot.mql ? P.tot.pipe / P.tot.mql : 0;
      const rows = P.quarters.map((q) => '<tr><td>' + dl('<b>' + q.name + '</b>') + '</td><td>' + q.months.map((i) => P.labels[i]).join(', ') + '</td><td class="n">' + fmtInt(q.mql) + '</td><td class="n">' + fmtInt(q.sqo) + '</td><td class="n">' + money(q.pipe) + '</td><td class="n">' + money(q.cost) + '</td><td>' + (esc(q.moments.join(' · ')) || '<span class="note">Always-on only</span>') + '</td></tr>' + why(7, [
        ['MQLs', q.months.map((i) => P.labels[i] + ' ' + fmtInt(P.monthly[i])).join(' + '), fmtInt(q.mql)],
        ['SQOs', fmtInt(q.mql) + ' MQLs × ' + pct(spm * 100) + ' blended MQL → SQO', fmtInt(q.sqo)],
        ['Pipeline', fmtInt(q.mql) + ' MQLs × ' + money(ppm) + ' pipeline per MQL', money(q.pipe)],
        ['Budget', q.months.map((i) => P.labels[i] + ' ' + money(P.monthlyCost[i])).join(' + '), money(q.cost)],
        ['Biggest programs', P.channels.map((c) => [c.name, q.months.reduce((a, i) => a + c.byMonth[i], 0)]).sort((a, b) => b[1] - a[1]).slice(0, 3).map(([n, v]) => esc(n) + ' ' + fmtInt(v)).join(', '), '']
      ], 'Months with a launch, event or season get a burst; always-on programs are spread evenly.')).join('');
      const tq = P.quarters.reduce((a, q) => ({ mql: a.mql + q.mql, sqo: a.sqo + q.sqo, pipe: a.pipe + q.pipe, cost: a.cost + q.cost }), { mql: 0, sqo: 0, pipe: 0, cost: 0 });
      const split = (items) => items.map((x) => '<tr><td>' + esc(x.name) + '</td>' + P.quarters.map((q) => '<td class="n">' + money(q.pipe * x.w) + '</td>').join('') + '<td class="n">' + money(P.tot.pipe * x.w) + '</td></tr>').join('');
      const qh = P.quarters.map((q) => '<th class="n">' + q.name + '</th>').join('');
      return '<div><h2>Quarterly plan</h2><p class="lead">The plan as leadership and finance read it: what lands each quarter, and what it costs. Tap a quarter to see how it is built.</p></div>' +
        '<div class="out"><table class="t" data-export><thead><tr><th>Quarter</th><th>Months</th><th class="n">MQLs</th><th class="n">SQOs</th><th class="n">Pipeline</th><th class="n">Program budget</th><th>Moments</th></tr></thead><tbody>' + rows +
        '</tbody><tfoot><tr><td>Year</td><td></td><td class="n">' + fmtInt(tq.mql) + '</td><td class="n">' + fmtInt(tq.sqo) + '</td><td class="n">' + money(tq.pipe) + '</td><td class="n">' + money(tq.cost) + '</td><td></td></tr></tfoot></table></div>' +
        '<h3>Pipeline by region and quarter</h3><div class="out"><table class="t"><thead><tr><th>Region</th>' + qh + '<th class="n">Year</th></tr></thead><tbody>' + split(P.regions) + '</tbody></table></div>' +
        '<h3>Pipeline by segment and quarter</h3><div class="out"><table class="t"><thead><tr><th>Segment</th>' + qh + '<th class="n">Year</th></tr></thead><tbody>' + split(P.segs) + '</tbody></table></div>' +
        '<p class="note">Quarters start at the plan start month. Budget follows when each program delivers its MQLs.</p>';
    },
    risks(P) {
      const so = { Triggered: 0, Watching: 1, 'On track': 2 }, lo = { High: 0, Medium: 1, Low: 2 };
      const list = P.risks.slice().sort((a, b) => ((so[a.status] ?? 3) - (so[b.status] ?? 3)) || ((lo[a.likelihood] ?? 3) - (lo[b.likelihood] ?? 3)));
      const count = (st) => list.filter((r) => (r.status || 'On track') === st).length;
      const atRisk = list.filter((r) => r.status === 'Triggered' || r.status === 'Watching').reduce((t, r) => t + Math.max(0, num(r.impact)), 0);
      const cards = list.map((r) => {
        const st = r.status || 'On track';
        return '<details class="risk ' + st.replace(' ', '-').toLowerCase() + '"' + (st === 'Triggered' ? ' open' : '') + '><summary>' +
          '<span class="rtop">' + riskPill(st) + '<span class="note">' + (r.auto ? 'Tracked from the plan: ' + esc(r.link) : st === 'Triggered' ? 'Happening now' : esc(r.likelihood || '–') + ' likelihood') + (num(r.impact) ? ' · ' + money(num(r.impact)) + ' pipeline at risk' : '') + '</span>' + '</span>' +
          '<b class="rname">' + esc(r.risk || 'Untitled risk') + '</b><span class="note">Owner: ' + esc(r.owner || '–') + '</span></summary>' +
          '<div class="rbody">' +
          '<div class="wide basis"><h4>Based on</h4><p>' + r.basis + '</p></div>' +
          '<div><h4>Early warning</h4><p>' + (esc(r.signal) || '<span class="note">Add the signal to watch</span>') + '</p></div>' +
          '<div><h4>Trigger</h4><p>' + (esc(r.trigger) || '<span class="note">Add the threshold that sets off the plan</span>') + '</p></div>' +
          '<div class="act"><h4>' + (st === 'Triggered' ? 'Do now' : 'If triggered') + '</h4><p>' + (esc(r.contingency) || '<span class="note">Add the contingency plan</span>') + '</p></div>' +
          '<div><h4>Prevent now</h4><p>' + (esc(r.mitigation) || '<span class="note">–</span>') + '</p></div>' +
          '</div></details>';
      }).join('') || '<p class="note">No risks yet. Add them in the left pane, under Risks &amp; contingencies.</p>';
      const exp = list.map((r) => '<tr><td>' + esc(r.risk) + '</td><td>' + esc(r.status) + '</td><td>' + (r.auto ? 'Tracked: ' + esc(r.link) : esc(r.likelihood)) + '</td><td>' + money(num(r.impact)) + '</td><td>' + esc(r.owner) + '</td><td>' + esc(r.signal) + '</td><td>' + esc(r.trigger) + '</td><td>' + esc(r.contingency) + '</td><td>' + esc(r.mitigation) + '</td></tr>').join('');
      return '<div><h2>Risks &amp; contingencies</h2><p class="lead">Each risk has an early warning signal, the threshold that triggers it, and the plan we run when it does. Risks tied to a plan number (regional coverage, SDR capacity, MQL → SQO, pacing) set their own status and pipeline at risk from the live plan; the rest are set by their owner. Open a risk to see what it is based on and its plan.</p></div>' +
        '<div class="tiles"><div class="tile' + (count('Triggered') ? ' alert' : '') + '"><span>Triggered</span><b>' + count('Triggered') + '</b><span>contingency running</span></div>' +
        '<div class="tile"><span>Watching</span><b>' + count('Watching') + '</b><span>signal moving</span></div>' +
        '<div class="tile"><span>On track</span><b>' + count('On track') + '</b><span>no action</span></div>' +
        '<div class="tile"><span>Pipeline at risk</span><b>' + money(atRisk) + '</b><span>triggered and watching</span></div></div>' +
        '<div class="risks">' + cards + '</div>' +
        '<table class="t" data-export hidden><thead><tr><th>Risk</th><th>Status</th><th>Likelihood</th><th>Pipeline at risk</th><th>Owner</th><th>Early warning</th><th>Trigger</th><th>Contingency</th><th>Prevent now</th></tr></thead><tbody>' + exp + '</tbody></table>';
    },
    channels(P) {
      const maxW = Math.max(0.001, ...P.channels.map((c) => c.w));
      const pts = P.channels.reduce((a, c) => a + Math.max(0, num(c.share)), 0), spm = P.tot.mql ? P.tot.sqo / P.tot.mql : 0;
      const rows = P.channels.map((c) => '<tr><td>' + dl(esc(c.name)) + '</td><td>' + esc(c.owner) + '</td><td>' + esc(c.stage) + '</td><td>' + motionPill(c.motion) + '</td><td class="n">' + pct(c.w * 100) + '</td><td><div class="meter"><i style="width:' + (c.w / maxW * 100).toFixed(1) + '%"></i></div></td><td class="n">' + money(c.pipe) + '</td><td class="n">' + fmtInt(c.mql) + '</td><td class="n">' + fmtInt(c.sqo) + '</td><td class="n">' + money(c.cost) + '</td><td class="n">' + (c.cost ? (c.pipe / c.cost).toFixed(1) + 'x' : '–') + '</td></tr>' + why(11, [
        ['Share', fmtInt(num(c.share)) + ' of ' + fmtInt(pts) + ' share points across programs that are on', pct(c.w * 100)],
        ['Pipeline', money(P.tot.pipe) + ' × ' + pct(c.w * 100), money(c.pipe)],
        ['MQLs', fmtInt(P.tot.mql) + ' MQLs × ' + pct(c.w * 100), fmtInt(c.mql)],
        ['SQOs', fmtInt(c.mql) + ' MQLs × ' + pct(spm * 100) + ' blended MQL → SQO', fmtInt(c.sqo)],
        ['Budget', fmtInt(c.mql) + ' MQLs × ' + money(num(c.cpm)) + ' per MQL', money(c.cost)],
        ['Pipe : spend', money(c.pipe) + ' ÷ ' + money(c.cost), c.cost ? (c.pipe / c.cost).toFixed(1) + 'x' : '–'],
        ['Timing', c.motion === 'Always-on' ? 'Spread evenly across the year' : c.motion === 'Burst' ? 'Concentrated in launch, event and season months' : '60% spread evenly, 40% in launch, event and season months', '']
      ], 'Change share, cost per MQL, motion and who runs it under Channels & programs.')).join('');
      const paid = P.channels.find((c) => c.owner === 'Paid (shared svc)');
      const paidShare = P.channels.filter((c) => c.owner === 'Paid (shared svc)').reduce((s, c) => s + c.w, 0);
      return '<div><h2>Channel mix</h2><p class="lead">Every program ladders up to one pipeline number. Paid media is ' + pct(paidShare * 100) + ' of sourced pipeline' + (paid ? '; the rest comes from owned, earned, partner, sales and product programs.' : '.') + ' Tap a program to see how its numbers are built.</p></div>' +
        '<div class="out"><table class="t" data-export><thead><tr><th>Program</th><th>Owner</th><th>Stage</th><th>Motion</th><th class="n">Share</th><th></th><th class="n">Pipeline</th><th class="n">MQLs</th><th class="n">SQOs</th><th class="n">Budget</th><th class="n">Pipe : spend</th></tr></thead><tbody>' + rows +
        '</tbody><tfoot><tr><td>Total</td><td></td><td></td><td></td><td class="n">100%</td><td></td><td class="n">' + money(P.tot.pipe) + '</td><td class="n">' + fmtInt(P.tot.mql) + '</td><td class="n">' + fmtInt(P.tot.sqo) + '</td><td class="n">' + money(P.budget) + '</td><td class="n">' + (P.budget ? (P.tot.pipe / P.budget).toFixed(1) + 'x' : '–') + '</td></tr></tfoot></table></div>';
    },
    committee(P) {
      const A = S.assets, cnt = (st) => A.filter((x) => x.status === st).length;
      const locOpen = A.filter((x) => x.regions && (x.loc === 'Requested' || x.loc === 'In progress')).length;
      const regs = S.regions.map((r) => r.name).filter(Boolean);
      const forReg = (x) => comRegion === 'All regions' || regionList(x.regions).some((g) => g.toLowerCase() === comRegion.toLowerCase());
      const cell = (role, stage) => {
        const xs = A.filter((x) => x.role === role && x.stage === stage);
        if (!xs.length) return '<td><div class="asset miss"><span class="pill burst">No asset</span><span class="note">Gap: add one under Offers &amp; assets</span></div></td>';
        return '<td>' + xs.map((x) => {
          const due = num(x.due) ? ' · due ' + (P.labels[Math.round(num(x.due)) - 1] || 'month ' + x.due) : '';
          let loc = '';
          if (comRegion !== 'All regions') loc = forReg(x) ? '<span class="note">' + esc(comRegion) + ': ' + esc(x.loc) + '</span>' : '<span class="note">' + esc(comRegion) + ': global English version</span>';
          else if (x.regions) loc = '<span class="note">Localize for ' + esc(x.regions) + ': ' + esc(x.loc) + '</span>';
          return '<div class="asset ' + (x.status === 'Missing' ? 'miss' : '') + '">' + assetPill(x.status) + '<b>' + esc(x.asset || 'Untitled') + '</b><span class="note">' + esc(x.owner) + due + '</span>' + loc + '</div>';
        }).join('') + '</td>';
      };
      const rows = S.personas.map((p) => '<tr><td><b>' + esc(p.role) + '</b><div class="note">' + esc(p.part) + '</div><div class="note">' + esc(p.cares) + '</div></td>' + STAGES.map((st) => cell(p.role, st)).join('') + '</tr>').join('');
      const todo = A.filter((x) => x.status !== 'Live' || (x.regions && x.loc !== 'Ready' && x.loc !== 'Not needed')).filter(forReg)
        .sort((a, b) => (num(a.due) || 99) - (num(b.due) || 99))
        .map((x) => '<tr><td>' + esc(x.asset) + '<div class="note">' + esc(x.role) + ' · ' + esc(x.stage) + '</div></td><td>' + assetPill(x.status) + '</td><td>' + esc(x.owner) + '</td><td>' + (num(x.due) ? (P.labels[Math.round(num(x.due)) - 1] || x.due) : '–') + '</td><td>' + (x.regions ? esc(x.regions) + ' · ' + esc(x.loc) : '–') + '</td></tr>').join('');
      const totT = P.tiers.map((t) => Math.max(0, num(t.accounts)));
      const abm = S.abmRegions.filter((g) => comRegion === 'All regions' || g.region === comRegion).map((g) => {
        const accts = [num(g.t1), num(g.t2), num(g.t3)];
        const pipe = accts.reduce((a, n, i) => a + (P.tiers[i] && totT[i] ? P.tiers[i].pipe * n / totT[i] : 0), 0);
        const flag = !g.owner || !g.next;
        return '<tr' + (flag ? ' class="flagrow"' : '') + '><td><b>' + esc(g.region) + '</b></td><td class="n">' + fmtInt(accts[0]) + '</td><td class="n">' + fmtInt(accts[1]) + '</td><td class="n">' + fmtInt(accts[2]) + '</td><td class="n">' + money(pipe) + '</td><td>' + (esc(g.owner) || '<span class="pill burst">No owner</span>') + '</td><td>' + (esc(g.next) || '<span class="pill burst">No next play</span>') + '</td></tr>';
      }).join('');
      const sums = [0, 1, 2].map((i) => S.abmRegions.reduce((a, g) => a + num(g['t' + (i + 1)]), 0));
      const mism = P.tiers.slice(0, 3).map((t, i) => (sums[i] !== totT[i] ? esc(t.tier) + ': ' + fmtInt(sums[i]) + ' by region vs ' + fmtInt(totT[i]) + ' in the plan' : '')).filter(Boolean);
      const trs = P.tiers.map((t) => '<tr><td><b>' + esc(t.tier) + '</b></td><td class="n">' + fmtInt(num(t.accounts)) + '</td><td class="n">' + pct(t.w * 100) + '</td><td class="n">' + money(t.pipe) + '</td><td class="n">' + money(t.perAcct) + '</td><td>' + esc(t.play) + '</td></tr>').join('');
      // the top card follows the region picker: what this region can use now, what it waits on, and its ABM book
      const regionCard = () => {
        const all = comRegion === 'All regions';
        const mine = (x) => regionList(x.regions).some((g) => g.toLowerCase() === comRegion.toLowerCase());
        const usable = A.filter((x) => x.status === 'Live' && (all || !mine(x) || x.loc === 'Ready' || x.loc === 'Not needed')).length;
        const waitLoc = A.filter((x) => x.status === 'Live' && !all && mine(x) && x.loc !== 'Ready' && x.loc !== 'Not needed').length;
        const locN = all ? locOpen : A.filter((x) => mine(x) && (x.loc === 'Requested' || x.loc === 'In progress')).length;
        const g = all ? null : S.abmRegions.find((x) => x.region === comRegion);
        const acc = all ? sums : g ? [num(g.t1), num(g.t2), num(g.t3)] : [0, 0, 0];
        const pipe = acc.reduce((a, n, i) => a + (P.tiers[i] && totT[i] ? P.tiers[i].pipe * n / totT[i] : 0), 0);
        const roles = S.personas.length, gapList = S.personas.filter((p) => !A.some((x) => x.role === p.role && x.status === 'Live' && (all || !mine(x) || x.loc === 'Ready' || x.loc === 'Not needed'))), gapRoles = gapList.length;
        return '<div class="box regcard"><div class="regcard-head"><label class="f regpick">Show for<select id="committee-region">' + ['All regions'].concat(regs).map((r) => '<option' + (r === comRegion ? ' selected' : '') + '>' + esc(r) + '</option>').join('') + '</select></label>' +
          '<p class="note">' + (all ? 'Totals across every region. Pick a region to see what it can use now and what it is waiting on.' : 'What ' + esc(comRegion) + ' can put in front of buyers today, what it is waiting on, and its account book' + (g && g.owner ? ', owned by ' + esc(g.owner) : '') + '.') + '</p></div>' +
          '<div class="tiles">' +
          '<div class="tile"><span>' + (all ? 'Assets live' : 'Ready in ' + esc(comRegion)) + '</span><b>' + usable + '</b><span>of ' + A.length + (waitLoc ? ' · ' + waitLoc + ' live but not localized yet' : '') + '</span></div>' +
          '<div class="tile' + (gapRoles ? ' alert' : '') + '"><span>Roles with nothing ready</span><b>' + gapRoles + '</b><span>' + (gapRoles ? gapList.map((p) => esc(p.role)).join(', ') : 'of ' + roles + ' in the committee') + '</span></div>' +
          '<div class="tile' + (cnt('Missing') ? ' alert' : '') + '"><span>Missing or in production</span><b>' + (cnt('Missing') + cnt('In production')) + '</b><span>' + cnt('Missing') + ' missing · ' + cnt('In production') + ' in production (global)</span></div>' +
          '<div class="tile"><span>Localization open</span><b>' + locN + '</b><span>' + (all ? 'requested or in progress' : 'for ' + esc(comRegion)) + '</span></div>' +
          '<div class="tile"><span>ABM accounts</span><b>' + fmtInt(acc[0] + acc[1] + acc[2]) + '</b><span>' + fmtInt(acc[0]) + ' / ' + fmtInt(acc[1]) + ' / ' + fmtInt(acc[2]) + ' by tier · ' + money(pipe) + ' pipeline</span></div>' +
          '</div>' + (!all && g && g.next ? '<p class="note"><b>Next play:</b> ' + esc(g.next) + '</p>' : !all ? '<p class="note"><span class="pill burst">No next play</span> Add one under ABM by region.</p>' : '') + '</div>';
      };
      return '<div><h2>Buying committee &amp; ABM</h2><p class="lead">Every role in the deal needs an asset at every stage. This tracks which ones are live, which are missing, who owns them, and which regions need them localized. Pick a region to see what that region can use now and what it is waiting on.</p></div>' +
        regionCard() +
        '<h3>Offers by role and stage</h3><div class="out"><table class="t matrix"><thead><tr><th>Role</th><th>Aware</th><th>Consider</th><th>Decide</th></tr></thead><tbody>' + rows + '</tbody></table></div>' +
        '<h3>To do' + (comRegion !== 'All regions' ? ' for ' + esc(comRegion) : '') + '</h3><div class="out"><table class="t" data-export><thead><tr><th>Asset</th><th>Status</th><th>Owner</th><th>Due</th><th>Localization</th></tr></thead><tbody>' + (todo || '<tr><td colspan="5" class="note">Nothing open.</td></tr>') + '</tbody></table></div>' +
        '<h3>ABM by region</h3><div class="out"><table class="t"><thead><tr><th>Region</th><th class="n">Tier 1</th><th class="n">Tier 2</th><th class="n">Tier 3</th><th class="n">Pipeline</th><th>Account owner</th><th>Next play</th></tr></thead><tbody>' + abm + '</tbody></table></div>' +
        (mism.length ? '<p class="note">Account counts by region don\'t match the tiers: ' + mism.join('; ') + '.</p>' : '') +
        '<h3>ABM tiers</h3><div class="out"><table class="t"><thead><tr><th>Tier</th><th class="n">Accounts</th><th class="n">Share</th><th class="n">Pipeline</th><th class="n">Per account</th><th>Play</th></tr></thead><tbody>' + trs + '</tbody></table></div>';
    },
    calendar(P) {
      const max = Math.max(1, ...P.channels.flatMap((c) => c.byMonth));
      const head = P.labels.map((m, i) => '<th class="m' + (P.momentAt[i].length ? ' mo' : '') + '">' + m + (P.momentAt[i].length ? '<span class="moment">' + esc(P.momentAt[i].join(' · ')) + '</span>' : '') + '</th>').join('');
      const rows = P.channels.map((c) => '<tr><td style="white-space:nowrap">' + esc(c.name) + '</td><td>' + motionPill(c.motion) + '</td>' + c.byMonth.map((v) => {
        const a = v / max;
        return '<td class="h" style="background:color-mix(in srgb,var(--heat1) ' + Math.round(a * 85) + '%,var(--heat0));color:' + (a > 0.55 ? 'var(--accent-ink)' : 'var(--ink)') + '">' + fmtInt(v) + '</td>';
      }).join('') + '</tr>').join('');
      const totals = P.monthly.map((v) => '<td class="n">' + fmtInt(v) + '</td>').join('');
      return '<div><h2>Calendar</h2><p class="lead">MQLs each program delivers by month. Always-on programs keep pipeline predictable; bursts stack on launches, events and buying seasons.</p></div>' +
        '<div class="out"><table class="t heat" data-export><thead><tr><th>Program</th><th>Motion</th>' + head + '</tr></thead><tbody>' + rows + '</tbody><tfoot><tr><td>All programs</td><td></td>' + totals + '</tr></tfoot></table></div>';
    },
    owners(P) {
      const head = FUNCTIONS.map((f) => '<th class="n" style="text-align:center">' + esc(f) + '</th>').join('');
      const rows = workstreams(P).map((w) => '<tr><td>' + esc(w.name) + '</td>' + FUNCTIONS.map((f) => { const v = raciGet(w, f); return '<td class="c ' + v.replace('–', '') + '" data-w="' + esc(w.key) + '" data-f="' + esc(f) + '" title="Click to change">' + v + '</td>'; }).join('') + '</tr>').join('');
      return '<div><h2>Team &amp; owners</h2><p class="lead">Who carries what, how other teams are engaged, and who decides. Click a RACI cell to change it.</p></div>' + teamBox(P) + '<h3>RACI</h3>' +
        '<div class="legend"><span><b class="R">R</b>Responsible</span><span><b class="A">A</b>Accountable</span><span><b class="C">C</b>Consulted</span><span><b>I</b>Informed</span></div>' +
        '<div class="out"><table class="t raci" data-export><thead><tr><th>Workstream</th>' + head + '</tr></thead><tbody>' + rows + '</tbody></table></div>';
    },
    paid(P) {
      return '<div><h2>Paid brief</h2><p class="lead">Paid media runs as a shared service, so the campaigns team hands it a brief. Paste this into the <a href="https://kristinejoy0419.github.io/paid-media-hub/" target="_blank" rel="noopener">Paid Media Hub</a> to build the media plan, BOM and trafficking.</p></div>' +
        '<div class="btns"><button class="btn primary" type="button" id="btn-brief">Copy brief</button></div><div class="brief" id="brief-text">' + esc(paidBrief(P)) + '</div>';
    },
    measure(P) {
      const t = P.tot, conv = t.mql ? t.sqo / t.mql * 100 : 0;
      const kpis = [
        ['Marketing-sourced pipeline', money(t.pipe), 'Weekly', 'Demand gen + RevOps', 'CRM opportunity source'],
        ['SQOs', fmtInt(t.sqo), 'Weekly', 'Demand gen + Sales', 'CRM'],
        ['MQLs', fmtInt(t.mql), 'Weekly', 'Demand gen', 'Marketing automation'],
        ['MQL → SQO conversion', pct(conv), 'Monthly', 'Demand gen + Sales', 'CRM funnel report'],
        ['Pipeline velocity', fmtInt(num(S.cycle)) + ' days or faster', 'Monthly', 'RevOps', 'CRM stage history'],
        ['SQO → closed-won', pct(P.r3 * 100), 'Quarterly', 'Sales + RevOps', 'CRM'],
        ['Pipeline to program spend', P.budget ? (t.pipe / P.budget).toFixed(1) + 'x' : '–', 'Monthly', 'Demand gen + Finance', 'Budget tracker + CRM'],
        ['Tier 1 account engagement', 'Buying committee coverage', 'Monthly', 'Demand gen + Sales', 'ABM platform'],
        ['Expansion pipeline', money(P.motion.expPipe), 'Monthly', 'Demand gen + Customer success', 'CRM (expansion opportunities)'],
        ['PQL → SQO', pct(num(S.expConv)), 'Monthly', 'Demand gen + Product', 'Product analytics + CRM'],
        ['Influenced pipeline', P.motion.influenced ? money(P.motion.influenced) : '–', 'Quarterly', 'RevOps', 'Multi-touch attribution'],
        ['Pacing vs plan', 'Within 5% of plan to date', 'Weekly', 'Demand gen + RevOps', 'Pacing tab + CRM']
      ];
      const seo = P.channels.find((c) => c.id === 'seo'), aeo = P.channels.find((c) => c.id === 'aeo');
      if (seo) kpis.push(['SEO: organic MQLs', fmtInt(seo.mql), 'Monthly', esc(seo.owner), 'Web analytics + marketing automation'],
        ['SEO: non-brand organic sessions and rankings', 'Priority buyer terms on page one', 'Monthly', esc(seo.owner), 'Search console + rank tracker']);
      if (aeo) kpis.push(['AEO/GEO: AI citation rate', 'Cited on tracked buyer prompts', 'Monthly', esc(aeo.owner), 'AI visibility tracker'],
        ['AEO/GEO: share of answer', 'vs top 3 competitors', 'Monthly', esc(aeo.owner), 'AI visibility tracker'],
        ['AEO/GEO: AI-referred sessions and MQLs', fmtInt(aeo.mql) + ' MQLs', 'Monthly', esc(aeo.owner), 'Web analytics (AI referrers)']);
      const rows = kpis.map((k) => '<tr><td><b>' + k[0] + '</b></td><td class="n">' + k[1] + '</td><td>' + k[2] + '</td><td>' + k[3] + '</td><td>' + k[4] + '</td></tr>').join('');
      return '<div><h2>Measurement</h2><p class="lead">Pipeline first, efficiency second. Agree on these definitions with RevOps before the year starts, and report from one shared dashboard.</p></div>' +
        '<div class="out"><table class="t" data-export><thead><tr><th>Metric</th><th class="n">Target</th><th>Review</th><th>Owner</th><th>Source</th></tr></thead><tbody>' + rows + '</tbody></table></div>' +
        '<div class="split"><div class="box"><h3>Operating rhythm</h3><ul><li>Weekly pipeline review with RevOps and sales</li><li>Monthly readout to marketing and sales leadership, presented jointly with RevOps</li><li>Quarterly plan reset: shift budget to what is converting</li></ul></div>' +
        '<div class="box"><h3>Shared definitions</h3><ul><li>What counts as an MQL and an SQO</li><li>Sourced vs influenced pipeline</li><li>Attribution model and lookback window</li><li>Lead follow-up SLA for sales</li></ul></div></div>';
    }
  };

  /* ---------- campaigns, pacing, scenarios, team, motion, baseline ---------- */
  const CAMP_TIERS = ['Tier 1 launch', 'Tier 2 launch', 'Always-on', 'Seasonal'];
  const CAMP_STATUS = ['Planning', 'In flight', 'Done'];
  const listOf = (t) => String(t || '').split(/[,;]+/).map((x) => x.trim()).filter(Boolean);
  function chFor(text) {
    const on = S.channels.filter((c) => c.on), out = [];
    listOf(text).forEach((t) => {
      const k = t.toLowerCase();
      const c = on.find((x) => x.id === k) || on.find((x) => x.name.toLowerCase().startsWith(k)) || on.find((x) => x.name.toLowerCase().includes(k));
      if (c && !out.includes(c)) out.push(c);
    });
    return out;
  }
  // put extra spend into the most efficient programs, each up to half again its budget, at half its average return
  function addSpend(P, amount, pipeGoal) {
    let left = amount, pipe = 0, spent = 0; const moves = [];
    for (const { c, eff } of P.cutList.slice().reverse()) {
      if (left <= 0 || (pipeGoal && pipe >= pipeGoal)) break;
      let add = Math.min(left, c.cost * 0.5);
      if (pipeGoal) add = Math.min(add, (pipeGoal - pipe) / (eff * 0.5));
      if (add < 1) continue;
      pipe += add * eff * 0.5; left -= add; spent += add; moves.push('add ' + money(add) + ' to ' + c.name);
    }
    return { pipe, spent, moves };
  }
  function milestones(c) {
    const L = Math.round(num(c.launch)) || 1;
    const ms = [
      ['Campaign brief', L - 3, 'Demand gen', 'Brief'], ['Messaging locked', L - 2, 'PMM', 'Messaging'], ['Creative & assets', L - 1, 'Creative', 'Creative'],
      ['Sales enablement', L - 1, 'PMM + Sales', 'Enablement'], ['Launch', L, c.owner || 'Demand gen', 'Launch'], ['Retro & reset', L + 2, 'Demand gen + RevOps', 'Retro']
    ];
    if (chFor(c.programs).some((x) => x.id === 'paid')) ms.splice(3, 0, ['Paid flight brief', L - 1, 'Paid (shared svc)', 'Paid brief']);
    return ms;
  }
  function extend(P) {
    const ppm = P.tot.mql ? P.tot.pipe / P.tot.mql : 0, spm = P.tot.mql ? P.tot.sqo / P.tot.mql : 0;
    P.ppm = ppm; P.spm = spm;
    // campaigns
    const cw = norm(S.campaigns, 'share');
    P.camps = S.campaigns.map((c, i) => Object.assign({}, c, { w: cw[i], pipe: P.tot.pipe * cw[i], mql: P.tot.mql * cw[i], cost: P.budget * cw[i], chans: chFor(c.programs), ms: milestones(c) }));
    // pacing against actuals
    const acts = S.actuals.filter((a) => num(a.month) >= 1 && num(a.month) <= 12 && (num(a.mql) || num(a.pipe)));
    const asOf = acts.reduce((m, a) => Math.max(m, Math.round(num(a.month))), 0);
    const months = Array.from({ length: 12 }, (_, i) => {
      const a = acts.find((x) => Math.round(num(x.month)) === i + 1);
      return { i, plan: { mql: P.monthly[i], sqo: P.monthly[i] * spm, pipe: P.monthly[i] * ppm, spend: P.monthlyCost[i] }, act: a ? { mql: num(a.mql), sqo: num(a.sqo), pipe: num(a.pipe), spend: num(a.spend) } : null };
    });
    const sum = (k, w) => months.slice(0, asOf).reduce((s, m) => s + (w === 'act' ? (m.act ? m.act[k] : 0) : m.plan[k]), 0);
    const cum = {}; ['mql', 'sqo', 'pipe', 'spend'].forEach((k) => { cum[k] = { plan: sum(k, 'plan'), act: sum(k, 'act') }; });
    const pace = cum.pipe.plan ? cum.pipe.act / cum.pipe.plan : 1;
    const restPlan = months.slice(asOf).reduce((s, m) => s + m.plan.pipe, 0);
    P.pace = { months, asOf, cum, pace, forecast: cum.pipe.act + restPlan * pace, restPlan };
    // scenarios: cut the least efficient spend first, add to the most efficient at a lower marginal return
    const byEff = P.channels.filter((c) => c.cost > 0).map((c) => ({ c, eff: c.pipe / c.cost })).sort((a, b) => a.eff - b.eff);
    const scen = (f) => {
      let delta = P.budget * (f - 1), pipe = P.tot.pipe; const moves = [];
      if (delta < 0) {
        let left = -delta;
        for (const { c, eff } of byEff) { if (left <= 0) break; const cut = Math.min(left, c.cost * 0.6); pipe -= cut * eff; left -= cut; moves.push('cut ' + c.name + ' by ' + money(cut)); }
      } else if (delta > 0) {
        const a = addSpend({ cutList: byEff }, delta); pipe += a.pipe; moves.push(...a.moves);
      }
      return { f, budget: P.budget * f, pipe, mql: ppm ? pipe / ppm : 0, moves };
    };
    P.scen = [scen(0.8), scen(1), scen(1.2)];
    P.cutList = byEff;
    // team load: what each function carries at once
    P.team = S.team.map((t) => {
      const fn = t.fn;
      const chans = P.channels.filter((c) => c.owner === fn).length;
      const assets = S.assets.filter((a) => a.owner === fn && a.status !== 'Live').length;
      const camps = P.camps.filter((c) => c.owner === fn || c.chans.some((x) => x.owner === fn && x.owner !== c.owner)).length;
      const load = chans + assets + camps;
      return Object.assign({}, t, { chans, assets, camps, load, over: num(t.cap) > 0 && load > num(t.cap) });
    });
    // new logo vs expansion
    const e = Math.min(100, Math.max(0, num(S.expShare))) / 100;
    const expSqo = P.tot.sqo * e, pqlNeed = num(S.expConv) ? expSqo / (num(S.expConv) / 100) : 0, pqlSupply = num(S.pqlPerMonth) * 12;
    P.motion = { e, newPipe: P.tot.pipe * (1 - e), expPipe: P.tot.pipe * e, newSqo: P.tot.sqo * (1 - e), expSqo, expMqlViaMql: P.tot.mql * e, pqlNeed, pqlSupply, influenced: num(S.influenced) };
    P.risks = S.risks.map((r) => liveRisk(r, P));
    // baseline and coverage
    const need = num(S.salesTarget) * num(S.coverage), mktNeed = need * num(S.mktShare) / 100;
    P.base = {
      need, mktNeed, covGap: mktNeed - P.tot.pipe,
      ly: { pipe: num(S.lyPipe), mql: num(S.lyMql), sqo: num(S.lySqo), budget: num(S.lyBudget) },
      lyConv: num(S.lyMql) ? num(S.lySqo) / num(S.lyMql) : 0, lyCpm: num(S.lyMql) ? num(S.lyBudget) / num(S.lyMql) : 0,
      planCpm: P.tot.mql ? P.budget / P.tot.mql : 0
    };
    return P;
  }
  // a risk tied to a plan signal sets its own status and pipeline at risk from the live numbers
  function riskLink(r) {
    if (RISK_LINKS.includes(r.link)) return r.link;
    const t = String(r.risk || '');
    return /region/i.test(t) ? 'Regional coverage' : /SDR/i.test(t) ? 'SDR capacity' : /SQO|conversion/i.test(t) ? 'MQL → SQO' : /pac(e|ing)/i.test(t) ? 'Pacing' : 'Owner sets it';
  }
  function liveRisk(r, P) {
    const link = riskLink(r), own = Object.assign({}, r, { link, auto: false, basis: 'Status, likelihood and pipeline at risk are set by the owner in the left pane, under Risks & contingencies.' });
    const ppm = P.ppm, pps = P.tot.sqo ? P.tot.pipe / P.tot.sqo : 0;
    const auto = (status, impact, basis) => Object.assign({}, r, { link, auto: true, status, impact: Math.max(0, impact), basis });
    if (link === 'Regional coverage') {
      const R = P.roll, low = P.regions.filter((g) => g.owes > 0.5 && g.coverage < 0.7);
      return auto(low.length ? 'Triggered' : R.coverage < 0.95 ? 'Watching' : 'On track', R.gap * ppm,
        'Regional roll-up: ' + (low.length ? low.map((g) => esc(g.name) + ' ' + Math.round(g.coverage * 100) + '%').join(', ') + ' under 70% coverage. ' : 'every region at 70% or more. ') +
        'Regions are short ' + fmtInt(R.gap) + ' MQLs × ' + money(ppm) + ' pipeline per MQL = ' + money(R.gap * ppm) + ' at risk.');
    }
    if (link === 'SDR capacity') {
      if (!(P.sdrCap > 0)) return Object.assign(own, { basis: 'Set SDR headcount and capacity in the left pane to track this from the plan.' });
      const over = P.monthly.map((v, i) => [v - P.sdrCap, i]).filter(([x]) => x > 0.5), excess = over.reduce((a, [x]) => a + x, 0);
      return auto(over.length ? 'Watching' : 'On track', excess * ppm,
        over.length ? 'MQLs planned above what SDRs can work in ' + over.map(([x, i]) => P.labels[i] + ' (+' + fmtInt(x) + ')').join(', ') + ' against ' + fmtInt(P.sdrCap) + ' a month. If those ' + fmtInt(excess) + ' MQLs go unworked, that is ' + money(excess * ppm) + ' of pipeline. Becomes Triggered when the weekly follow-up SLA slips.' :
          'Every month\'s planned MQLs fit within ' + fmtInt(P.sdrCap) + ' a month of SDR capacity.');
    }
    if (link === 'MQL → SQO') {
      const c = P.pace.cum;
      if (!P.pace.asOf || !c.mql.act) return Object.assign(own, { basis: 'Tracked from actuals once you enter them in the left pane, under Actuals. Until then the owner sets the status.' });
      const act = c.sqo.act / c.mql.act, ratio = P.spm ? act / P.spm : 1, rest = P.tot.mql - c.mql.act;
      const lost = Math.max(0, (P.spm - act) * Math.max(0, rest) * pps);
      return auto(ratio < 0.85 ? 'Triggered' : ratio < 0.95 ? 'Watching' : 'On track', lost,
        'Actuals through ' + P.labels[P.pace.asOf - 1] + ': ' + pct(act * 100) + ' MQL → SQO vs ' + pct(P.spm * 100) + ' planned (' + Math.round(ratio * 100) + '% of plan). At that rate the remaining ' + fmtInt(rest) + ' MQLs make ' + money(lost) + ' less pipeline. Watching under 95% of plan, Triggered under 85%.');
    }
    if (link === 'Pacing') {
      if (!P.pace.asOf) return Object.assign(own, { basis: 'Tracked from actuals once you enter them in the left pane, under Actuals.' });
      const [k] = paceStatus(P.pace.pace), gap = P.tot.pipe - P.pace.forecast;
      return auto(k === 'fix' ? 'Triggered' : k === 'watch' ? 'Watching' : 'On track', gap,
        'Pipeline through ' + P.labels[P.pace.asOf - 1] + ' is at ' + Math.round(P.pace.pace * 100) + '% of plan, so the year lands at ' + money(P.pace.forecast) + ' against ' + money(P.tot.pipe) + '.');
    }
    return own;
  }
  const growth = (now, then) => (then ? (now / then - 1) * 100 : null);
  const vsLy = (now, then) => { const g = growth(now, then); return g == null ? '' : (g >= 0 ? '+' : '') + Math.round(g) + '% vs last year'; };
  function paceStatus(p) { return p >= 0.95 ? ['ok', 'On pace'] : p >= 0.85 ? ['watch', 'Behind'] : ['fix', 'Well behind']; }
  function hp(k, t) { return '<span class="hp ' + k + '">' + t + '</span>'; }
  // what lives in one month of a campaign, and what could turn it red
  function monthInfo(c, P, n) {
    const s = Math.max(1, Math.round(num(c.start)) || 1), e = Math.min(12, Math.max(s, Math.round(num(c.end)) || 12)), L = Math.round(num(c.launch)) || s;
    const flags = [], lives = [];
    const ms = n < 1 ? c.ms.filter((x) => x[1] < 1) : c.ms.filter((x) => x[1] === n);
    const roles = listOf(c.audience);
    if (n < 1) {
      flags.push([c.status === 'Planning' ? 'fix' : 'watch', ms.length + ' milestone' + (ms.length === 1 ? '' : 's') + ' fall before the plan year starts. ' + (c.status === 'Planning' ? 'Start them now or move the launch later.' : 'Check they are already done.')]);
    } else {
      const i = n - 1, live = n >= s && n <= e;
      // SDR follow-up capacity
      if (P.sdrCap > 0 && P.monthly[i] > P.sdrCap + 0.5) flags.push(['fix', 'SDRs are over capacity: ' + fmtInt(P.monthly[i]) + ' MQLs across the plan vs ' + fmtInt(P.sdrCap) + ' they can work. ' + (live ? 'This campaign adds about ' + fmtInt(P.monthly[i] * c.w) + '. Route overflow to nurture or move a burst.' : '')]);
      // pacing against actuals
      const m = P.pace.months[i];
      if (m && m.act && m.plan.pipe) {
        const r = m.act.pipe / m.plan.pipe, [k, l] = paceStatus(r);
        if (k !== 'ok') flags.push([k, l + ': ' + money(m.act.pipe) + ' pipeline vs ' + money(m.plan.pipe) + ' planned (' + Math.round(r * 100) + '%).']);
        else lives.push(['Actuals', 'On pace: ' + money(m.act.pipe) + ' vs ' + money(m.plan.pipe) + ' planned']);
      }
      // too much landing at once
      if (ms.length >= 3) flags.push(['watch', ms.length + ' milestones land in the same month. Check the owners can carry them together.']);
      // owners who are already over capacity
      ms.forEach((x) => { const t = P.team.find((t) => t.over && x[2].toLowerCase().includes(String(t.fn).toLowerCase())); if (t) flags.push(['watch', esc(t.fn) + ' owns ' + esc(x[0].toLowerCase()) + ' but is already over capacity (' + t.load + ' vs ' + fmtInt(t.cap) + ').']); });
      // assets the audience needs
      const need = S.assets.filter((a) => roles.includes(a.role) && a.status !== 'Live');
      need.filter((a) => Math.round(num(a.due)) === n).forEach((a) => flags.push(['watch', esc(a.asset) + ' for ' + esc(a.role) + ' is due (' + esc(a.status) + ', ' + esc(a.owner) + ').']));
      if (n === L) {
        const late = need.filter((a) => a.status === 'Missing' || Math.round(num(a.due)) > L || !num(a.due));
        if (late.length) flags.push(['fix', 'Launches without: ' + late.map((a) => esc(a.asset) + ' (' + esc(a.status) + ')').join(', ') + '.']);
      }
      if (live) {
        const progs = c.chans.map((x) => P.channels.find((y) => y.id === x.id)).filter(Boolean).map((y) => [y.name, y.byMonth[i] * c.w]).filter((x) => x[1] >= 0.5);
        lives.push(['In market', fmtInt(P.monthly[i] * c.w) + ' MQLs and ' + money(P.monthlyCost[i] * c.w) + ' spend from this campaign']);
        if (progs.length) lives.push(['Programs', progs.map(([nm, v]) => esc(nm) + ' ' + fmtInt(v)).join(', ')]);
      } else lives.push(['In market', 'Not in market this month']);
      if (P.momentAt[i].length) lives.push(['Launch moments', P.momentAt[i].map(esc).join(', ')]);
      const reg = P.regions.flatMap((r) => (r.plan.programs || []).filter((x) => Math.round(num(x.month)) === n).map((x) => esc(x.name) + ' (' + esc(r.name) + ')'));
      if (reg.length) lives.push(['Regional programs', reg.join(', ')]);
      const asks = S.asks.filter((a) => Math.round(num(a.by)) === n);
      if (asks.length) lives.push(['Asks due', asks.map((a) => esc(a.ask) + ' (' + esc(a.who) + ')').join('; ')]);
    }
    const k = flags.some((f) => f[0] === 'fix') ? 'fix' : flags.length ? 'watch' : '';
    return { k, flags, lives, ms };
  }
  function timeline(c, P, ci) {
    const s = Math.max(1, Math.round(num(c.start)) || 1), e = Math.min(12, Math.max(s, Math.round(num(c.end)) || 12)), L = Math.round(num(c.launch)) || s;
    const early = c.ms.filter((x) => x[1] < 1);
    const ns = (early.length ? [0] : []).concat(P.labels.map((_, i) => i + 1));
    const info = ns.map((n) => monthInfo(c, P, n));
    const name = (n) => (n < 1 ? 'Before the plan year' : P.labels[n - 1]);
    const cells = ns.map((n, j) => {
      const x = info[j], cls = n < 1 ? ' pre' : (n >= s && n <= e ? ' on' : '') + (n === L ? ' launch' : '');
      return '<button type="button" class="tlc' + (x.k ? ' ' + x.k : '') + '" data-tl="' + ci + '-' + n + '" aria-expanded="false" title="' + name(n) + ': see what is in this month">' +
        '<span class="tl' + cls + '">' + (n < 1 ? 'Before' : P.labels[n - 1]) + (x.k ? '<i class="dot"></i>' : '') + '</span><span class="tlm">' + x.ms.map((m) => '<span>' + esc(m[3] || m[0]) + '</span>').join('') + '</span></button>';
    }).join('');
    const dets = ns.map((n, j) => {
      const x = info[j];
      const fl = x.flags.map(([k, t]) => hp(k, k === 'fix' ? 'Fix' : 'Watch') + '<span>' + t + '</span>').join('');
      const msr = x.ms.map((m) => '<li><b>' + esc(m[0]) + '</b> <span class="note">· ' + esc(m[2]) + '</span></li>').join('');
      const lv = x.lives.map(([h, t]) => '<div><h4>' + h + '</h4><p>' + t + '</p></div>').join('');
      return '<div class="tldet" data-for="' + ci + '-' + n + '" hidden><div class="tldh"><b>' + name(n) + (n === L ? ' · launch month' : '') + '</b>' + (x.k ? hp(x.k, x.k === 'fix' ? 'Needs a fix' : 'Watch') : '<span class="hp ok">Clear</span>') + '</div>' +
        (fl ? '<div class="health">' + fl + '</div>' : '<p class="note">Nothing flagged this month.</p>') +
        '<div class="tlgrid">' + (msr ? '<div><h4>Milestones</h4><ul class="tlms">' + msr + '</ul></div>' : '') + lv + '</div></div>';
    }).join('');
    const nFlag = info.filter((x) => x.k).length;
    return '<div class="tlwrap"><div class="tlhead"><b>Timeline</b><span class="note">In market ' + P.labels[s - 1] + '–' + P.labels[e - 1] + ' · launch ' + (P.labels[L - 1] || '–') + ' · click a month to see what is in it' + (nFlag ? ' and why it is flagged' : '') + '</span>' +
      '<span class="tlkey"><i class="k on"></i>In market <i class="k launch"></i>Launch <i class="dot fix"></i>Needs a fix <i class="dot watch"></i>Watch <span class="tlmk">Milestones</span></span></div>' +
      '<div class="tlscroll"><div class="tlrow" style="grid-template-columns:repeat(' + ns.length + ',minmax(56px,1fr))">' + cells + '</div></div>' + dets + '</div>';
  }
  function campaignHealth(P) {
    const out = [];
    const tot = S.campaigns.reduce((a, c) => a + num(c.share), 0);
    if (S.campaigns.length && Math.round(tot) !== 100) out.push(['watch', 'Campaign shares add to ' + fmtInt(tot) + '%, rebalanced to 100%']);
    P.camps.forEach((c) => {
      const early = c.ms.filter((m) => m[1] < 1);
      if (early.length && c.status === 'Planning') out.push(['fix', esc(c.name) + ': ' + early.map((m) => m[0].toLowerCase()).join(', ') + ' fall before the plan starts, so start now']);
      if (!c.chans.length) out.push(['watch', esc(c.name) + ' has no programs attached']);
      const gaps = listOf(c.audience).filter((role) => !S.assets.some((a) => a.role === role && a.status === 'Live'));
      if (gaps.length) out.push(['watch', esc(c.name) + ': no live asset yet for ' + gaps.map(esc).join(', ')]);
    });
    return out;
  }

  const VIEWS2 = {
    checks(P) {
      const tol = (a, b) => Math.abs(a - b) <= Math.max(1, Math.abs(b) * 0.005);
      const sumIn = (rows, k) => rows.reduce((a, r) => a + Math.max(0, num(r[k])), 0);
      const sum = (arr, f) => arr.reduce((a, x) => a + f(x), 0);
      const ties = [], inputs = [];
      const tie = (what, a, b, fmt, how) => ties.push([what, fmt(a), fmt(b), tol(a, b), how]);
      // 1. do the outputs tie back to the inputs and to each other
      tie('Pipeline goal → funnel pipeline', num(S.goal), P.tot.pipe, money, 'The goal you typed should equal the sum of segment pipeline.');
      tie('Segments: SQOs × deal size', sum(P.segs, (x) => x.sqo * x.acv), P.tot.pipe, money, 'Each segment\'s SQOs times its deal size, added up.');
      tie('Segments: MQLs × MQL → SQO rate', sum(S.segments.map((x, i) => [x, P.segs[i]]), ([x, g]) => g.mql * num(x.mqlSqo) / 100), P.tot.sqo, fmtInt, 'Each segment\'s MQLs times its conversion rate, added up.');
      tie('Regions add up to total MQLs', sum(P.regions, (r) => r.mql), P.tot.mql, fmtInt, 'Region MQL targets on the Regional plans tab.');
      P.regions.forEach((r) => tie(r.name + ': HQ delivers + region owes', r.fromHq + r.owes, r.mql, fmtInt, 'What HQ programs deliver plus what the region owes should equal its target.'));
      tie('Regions: committed = sum of their programs', sum(P.regions, (r) => r.committed), sum(P.regions, (r) => sum(r.plan.programs || [], (x) => Math.max(0, num(x.mql)))), fmtInt, 'Committed MQLs should match the uploaded program rows.');
      tie('Channels add up to total MQLs', sum(P.channels, (c) => c.mql), P.tot.mql, fmtInt, 'Channel mix tab.');
      tie('Channel budgets add up to program budget', sum(P.channels, (c) => c.cost), P.budget, money, 'Each channel is its MQLs × cost per MQL.');
      tie('Months add up to total MQLs', sum(P.monthly, (x) => x), P.tot.mql, fmtInt, 'Calendar and pacing use these monthly numbers.');
      tie('Monthly spend adds up to budget', sum(P.monthlyCost, (x) => x), P.budget, money, 'Budget phasing by month.');
      tie('Quarters add up to total pipeline', sum(P.quarters, (q) => q.pipe), P.tot.pipe, money, 'Quarterly plan tab.');
      tie('Campaigns add up to total pipeline', sum(P.camps, (c) => c.pipe), P.camps.length ? P.tot.pipe : 0, money, 'Campaigns tab. Shares are rebalanced to 100% if they don\'t add up.');
      tie('Products add up to total pipeline', sum(P.products, (x) => x.pipe), P.tot.pipe, money, 'Product mix.');
      // 2. inputs worth a second look
      const shares = [['Segment shares', S.segments, 'share'], ['Region shares', S.regions, 'share'], ['Channel shares (on)', S.channels.filter((c) => c.on), 'share'], ['Campaign shares', S.campaigns, 'share'], ['Product shares', S.products, 'share'], ['ABM tier shares', S.tiers, 'share']];
      shares.forEach(([l, rows, k]) => { if (!rows.length) return; const t = sumIn(rows, k); inputs.push([Math.round(t) === 100 ? 'ok' : 'watch', l + ' add to ' + fmtInt(t) + '%' + (Math.round(t) === 100 ? '' : '. The dashboard rescales them to 100%, so every number built on them moves. Fix the inputs so what you typed is what you see.')]); });
      const r1 = num(S.r1), r3 = num(S.r3);
      if (r1 <= 0 || r1 > 100) inputs.push(['fix', 'Lead → MQL rate is ' + r1 + '%. It should be between 1 and 100.']);
      if (r3 <= 0 || r3 > 100) inputs.push(['fix', 'SQO → won rate is ' + r3 + '%. It should be between 1 and 100.']);
      S.segments.forEach((x) => { if (!(num(x.acv) > 0)) inputs.push(['fix', esc(x.name || 'A segment') + ' has no deal size, so its SQOs can\'t be worked out.']); const m = num(x.mqlSqo); if (m <= 0 || m > 60) inputs.push(['watch', esc(x.name || 'A segment') + ' MQL → SQO is ' + m + '%. Most B2B plans sit between 10% and 35%.']); });
      const cpms = S.channels.filter((c) => c.on).map((c) => num(c.cpm)).filter((x) => x > 0).sort((a, b) => a - b), med = cpms.length ? cpms[Math.floor(cpms.length / 2)] : 0;
      S.channels.filter((c) => c.on).forEach((c) => { const v = num(c.cpm); if (!(v > 0)) inputs.push(['watch', esc(c.name) + ' has no cost per MQL, so it counts as free in the budget.']); else if (med && v > med * 5) inputs.push(['watch', esc(c.name) + ' costs ' + money(v) + ' per MQL, more than 5× the typical ' + money(med) + '. Check it isn\'t a typo.']); });
      P.regions.forEach((r) => (r.plan.programs || []).forEach((x) => {
        const m = Math.round(num(x.month));
        if (m < 1 || m > 12) inputs.push(['fix', esc(r.name) + ': "' + esc(x.name) + '" has month ' + esc(String(x.month)) + '. Months run 1 to 12.']);
        if (num(x.mql) > 0 && !(num(x.budget) > 0)) inputs.push(['watch', esc(r.name) + ': "' + esc(x.name) + '" has MQLs but no budget.']);
        if (num(x.budget) > 0 && num(x.mql) > 0 && num(x.budget) / num(x.mql) > cpms[cpms.length - 1] * 3 && cpms.length) inputs.push(['watch', esc(r.name) + ': "' + esc(x.name) + '" works out to ' + money(num(x.budget) / num(x.mql)) + ' per MQL. Check the budget or MQL column.']);
      }));
      S.actuals.forEach((a) => { if (num(a.sqo) > num(a.mql) && num(a.mql)) inputs.push(['fix', 'Actuals for ' + (P.labels[Math.round(num(a.month)) - 1] || 'a month') + ' show more SQOs than MQLs.']); });
      const okIn = inputs.filter((x) => x[0] !== 'ok').length;
      const okTies = ties.filter((t) => t[3]).length;
      const rows = ties.map(([w, a, b, ok, how]) => '<tr><td>' + esc(w) + '<div class="note">' + how + '</div></td><td class="n">' + a + '</td><td class="n">' + b + '</td><td>' + hp(ok ? 'ok' : 'fix', ok ? 'Ties' : 'Off') + '</td></tr>').join('');
      return '<div><h2>Check the math</h2><p class="lead">Every number on the dashboard is built from the inputs in the left pane. This tab re-adds the totals a second way to prove they tie out, and flags inputs that look wrong. Tap any row label elsewhere in the hub to see how that number is built.</p></div>' +
        '<div class="tiles"><div class="tile' + (okTies < ties.length ? ' alert' : '') + '"><span>Totals that tie out</span><b>' + okTies + ' of ' + ties.length + '</b><span>within 0.5% rounding</span></div>' +
        '<div class="tile' + (okIn ? ' alert' : '') + '"><span>Inputs to check</span><b>' + okIn + '</b><span>' + (okIn ? 'listed below' : 'none flagged') + '</span></div></div>' +
        '<h3>Inputs to check</h3><div class="health">' + (inputs.length ? inputs.sort((a, b) => (a[0] === 'ok') - (b[0] === 'ok')).map(([k, t]) => hp(k, k === 'fix' ? 'Fix' : k === 'watch' ? 'Check' : 'OK') + '<span>' + t + '</span>').join('') : hp('ok', 'OK') + '<span>Nothing looks off.</span>') + '</div>' +
        '<h3>Do the totals tie out?</h3><div class="out"><table class="t" data-export><thead><tr><th>Check</th><th class="n">Added up this way</th><th class="n">Dashboard shows</th><th>Result</th></tr></thead><tbody>' + rows + '</tbody></table></div>' +
        '<div class="box"><h3>Spot-check it by hand in two minutes</h3><ol class="spot">' +
        '<li><b>Work the funnel backwards.</b> ' + money(P.tot.pipe) + ' goal ÷ blended deal size ' + money(P.tot.sqo ? P.tot.pipe / P.tot.sqo : 0) + ' = ' + fmtInt(P.tot.sqo) + ' SQOs. ÷ ' + pct(P.tot.mql ? P.tot.sqo / P.tot.mql * 100 : 0) + ' MQL → SQO = ' + fmtInt(P.tot.mql) + ' MQLs. Check these against the Summary tab.</li>' +
        '<li><b>Pick one channel.</b> ' + (P.channels[0] ? esc(P.channels[0].name) + ': ' + fmtInt(P.channels[0].mql) + ' MQLs × ' + money(num(P.channels[0].cpm)) + ' per MQL = ' + money(P.channels[0].cost) + '. Find it on Channel mix.' : 'Add a channel first.') + '</li>' +
        '<li><b>Pick one region.</b> ' + (P.regions[0] ? esc(P.regions[0].name) + ': ' + pct(P.regions[0].w * 100) + ' of ' + fmtInt(P.tot.mql) + ' MQLs = ' + fmtInt(P.regions[0].mql) + '. Open its row on Regional plans to see the same split.' : 'Add a region first.') + '</li>' +
        '<li><b>Export and re-add.</b> Use Export this tab → Excel on any tab and sum a column. It should match the total row.</li></ol></div>';
    },
    onepage(P) {
      const t = P.tot, B = P.base, pc = P.pace, [pk, pl] = paceStatus(pc.pace);
      const camps = P.camps.map((c) => '<tr><td><b>' + esc(c.name) + '</b><div class="note">' + esc(c.offer) + '</div></td><td>' + esc(c.tier) + '</td><td>' + (P.labels[Math.round(num(c.launch)) - 1] || '–') + '</td><td class="n">' + money(c.pipe) + '</td><td class="n">' + money(c.cost) + '</td></tr>').join('');
      const q = P.quarters.map((x) => '<td class="n">' + money(x.pipe) + '</td>').join('');
      const hl = health(P).filter((h) => h[0] !== 'ok').slice(0, 5).map(([k, s]) => hp(k, k === 'fix' ? 'Fix' : 'Watch') + '<span>' + esc(s) + '</span>').join('');
      const asks = S.asks.slice(0, 4).map((a) => '<li><b>' + esc(a.ask) + '</b> <span class="note">· ' + esc(a.who) + (num(a.by) ? ' · by ' + (P.labels[Math.round(num(a.by)) - 1] || '') : '') + '</span></li>').join('');
      const risks = P.risks.filter((r) => r.status !== 'On track').map((r) => '<li>' + riskPill(r.status) + ' ' + esc(r.risk) + '</li>').join('');
      const s80 = P.scen[0], s120 = P.scen[2];
      return '<div class="op-head"><div><h2>' + esc(S.name || 'Untitled plan') + '</h2><p class="lead">' + esc(S.fy) + ' plan on a page' + (S.product ? ' · ' + esc(S.product) : '') + '</p></div><button class="btn" type="button" id="btn-print">Print or save as PDF</button></div>' +
        '<div class="tiles">' +
        '<div class="tile hero"><span>Sourced pipeline</span><b>' + money(t.pipe) + '</b><span>' + (vsLy(t.pipe, B.ly.pipe) || 'set last year to compare') + '</span></div>' +
        '<div class="tile' + (B.covGap > 0.5 ? ' alert' : '') + '"><span>Covers sales need</span><b>' + (B.mktNeed ? coverCell(t.pipe / B.mktNeed) : '–') + '</b><span>' + (B.mktNeed ? 'of ' + money(B.mktNeed) + ' marketing owes' : 'set the sales target') + '</span></div>' +
        '<div class="tile"><span>Program budget</span><b>' + money(P.budget) + '</b><span>' + (P.budget ? (t.pipe / P.budget).toFixed(1) + 'x pipeline to spend' : '') + '</span></div>' +
        '<div class="tile' + (pk === 'fix' ? ' alert' : '') + '"><span>' + (pc.asOf ? 'Pacing through ' + P.labels[pc.asOf - 1] : 'Pacing') + '</span><b>' + (pc.asOf ? coverCell(pc.pace) : '–') + '</b><span>' + (pc.asOf ? pl + ' · forecast ' + money(pc.forecast) : 'no actuals yet') + '</span></div>' +
        '</div>' +
        '<div class="split"><div class="box"><h3>Campaigns</h3><div class="out"><table class="t"><thead><tr><th>Campaign</th><th>Tier</th><th>Launch</th><th class="n">Pipeline</th><th class="n">Budget</th></tr></thead><tbody>' + camps + '</tbody></table></div></div>' +
        '<div class="box"><h3>What needs attention</h3><div class="health">' + (hl || '<span class="note">Nothing flagged.</span>') + '</div></div></div>' +
        '<div class="box"><h3>Pipeline by quarter</h3><div class="out"><table class="t"><thead><tr>' + P.quarters.map((x) => '<th class="n">' + x.name + '</th>').join('') + '<th class="n">Year</th></tr></thead><tbody><tr>' + q + '<td class="n"><b>' + money(t.pipe) + '</b></td></tr></tbody></table></div></div>' +
        '<div class="split"><div class="box"><h3>What I need from leadership</h3><ul>' + (asks || '<li class="note">No asks yet</li>') + '</ul></div>' +
        '<div class="box"><h3>If the budget moves</h3><p>At 80%: ' + money(s80.pipe) + ' pipeline (' + money(s80.pipe - t.pipe) + '). First cuts: ' + esc(P.cutList.slice(0, 2).map((x) => x.c.name).join(', ')) + '.</p><p>At 120%: ' + money(s120.pipe) + ' pipeline (+' + money(s120.pipe - t.pipe) + '): ' + esc(s120.moves.slice(0, 3).join('; ')) + (s120.moves.length > 3 ? ' and more' : '') + '. Extra dollars earn about half the average return.</p></div>' +
        '<div class="box"><h3>Risks being watched</h3><ul class="plain">' + (risks || '<li class="note">None</li>') + '</ul></div></div>';
    },
    campaigns(P) {
      const ch = campaignHealth(P);
      const cards = P.camps.map((c, i) => {
        const ms = c.ms.map((m) => '<tr><td>' + esc(m[0]) + '</td><td>' + (m[1] < 1 ? '<span class="pill burst">Before plan start</span>' : esc(P.labels[m[1] - 1] || 'Next FY')) + '</td><td>' + esc(m[2]) + '</td></tr>').join('');
        return '<details class="camp"' + (i === 0 ? ' open' : '') + '><summary><span class="rtop"><span class="pill ' + (c.tier === 'Tier 1 launch' ? 'burst' : c.tier === 'Always-on' ? 'on' : 'both') + '">' + esc(c.tier) + '</span><span class="note">' + esc(c.status || 'Planning') + ' · owner ' + esc(c.owner || '–') + '</span></span>' +
          '<b class="rname">' + esc(c.name || 'Untitled campaign') + '</b><span class="note">' + money(c.pipe) + ' pipeline · ' + fmtInt(c.mql) + ' MQLs · ' + money(c.cost) + ' budget · ' + pct(c.w * 100) + ' of the plan</span>' + timeline(c, P, i) + '</summary>' +
          '<div class="rbody"><div><h4>Theme</h4><p>' + (esc(c.theme) || '<span class="note">–</span>') + '</p></div><div><h4>Hero offer</h4><p>' + (esc(c.offer) || '<span class="note">–</span>') + '</p></div>' +
          '<div><h4>Audience</h4><p>' + (esc(c.audience) || '<span class="note">–</span>') + '</p></div><div><h4>Product</h4><p>' + (esc(c.product) || '<span class="note">–</span>') + '</p></div>' +
          '<div><h4>Programs</h4><p>' + (c.chans.map((x) => esc(x.name)).join(', ') || '<span class="note">None matched</span>') + '</p></div>' +
          '<div class="wide"><h4>Milestones</h4><div class="out"><table class="t"><thead><tr><th>Milestone</th><th>When</th><th>Owner</th></tr></thead><tbody>' + ms + '</tbody></table></div></div></div></details>';
      }).join('');
      const exp = P.camps.map((c) => '<tr><td>' + esc(c.name) + '</td><td>' + esc(c.tier) + '</td><td>' + esc(c.theme) + '</td><td>' + esc(c.offer) + '</td><td>' + esc(c.audience) + '</td><td>' + (P.labels[Math.round(num(c.launch)) - 1] || '') + '</td><td>' + money(c.pipe) + '</td><td>' + fmtInt(c.mql) + '</td><td>' + money(c.cost) + '</td><td>' + esc(c.owner) + '</td></tr>').join('');
      return '<div><h2>Campaigns</h2><p class="lead">The plan as campaigns, not just channels. Each has a theme, a hero offer, an audience, its share of the number, the programs that carry it, and milestones worked back from launch. Open a campaign for its plan.</p></div>' +
        (ch.length ? '<div class="box"><h3>Campaign checks</h3><div class="health">' + ch.map(([k, t]) => hp(k, k === 'fix' ? 'Fix' : 'Watch') + '<span>' + t + '</span>').join('') + '</div></div>' : '') +
        '<div class="risks">' + (cards || '<p class="note">No campaigns yet. Add them in the left pane, under Campaigns.</p>') + '</div>' +
        '<table class="t" data-export hidden><thead><tr><th>Campaign</th><th>Tier</th><th>Theme</th><th>Hero offer</th><th>Audience</th><th>Launch</th><th>Pipeline</th><th>MQLs</th><th>Budget</th><th>Owner</th></tr></thead><tbody>' + exp + '</tbody></table>';
    },
    pacing(P) {
      const pc = P.pace, [pk, pl] = paceStatus(pc.pace);
      const v = (a, p) => (p ? Math.round((a / p - 1) * 100) : 0);
      const cell = (a, p, fmt) => '<td class="n">' + fmt(a) + ' <span class="' + (a >= p * 0.95 ? 'up' : 'down') + '">' + (v(a, p) >= 0 ? '+' : '') + v(a, p) + '%</span></td>';
      const rows = pc.months.map((m) => '<tr' + (m.act ? '' : ' class="dim"') + '><td>' + P.labels[m.i] + '</td><td class="n">' + fmtInt(m.plan.mql) + '</td>' + (m.act ? cell(m.act.mql, m.plan.mql, fmtInt) : '<td class="n">–</td>') +
        '<td class="n">' + money(m.plan.pipe) + '</td>' + (m.act ? cell(m.act.pipe, m.plan.pipe, money) : '<td class="n">–</td>') + '<td class="n">' + money(m.plan.spend) + '</td>' + (m.act ? '<td class="n">' + money(m.act.spend) + '</td>' : '<td class="n">–</td>') + '</tr>').join('');
      const actConv = pc.cum.mql.act ? pc.cum.sqo.act / pc.cum.mql.act : 0;
      const acts = [];
      if (!pc.asOf) acts.push(['watch', 'Add actuals in the left pane, under Actuals, to see pacing.']);
      else {
        const gap = P.tot.pipe - pc.forecast;
        if (gap > 0.5) {
          const rec = addSpend(P, P.budget, gap);
          acts.push([pk === 'ok' ? 'watch' : 'fix', 'At this pace the year lands at ' + money(pc.forecast) + ', ' + money(gap) + ' short. Buying it back would take about ' + money(rec.spent) + ' more (' + esc(rec.moves.slice(0, 4).join('; ')) + (rec.moves.length > 4 ? '…' : '') + ')' + (rec.pipe < gap - 0.5 ? ', which only recovers ' + money(rec.pipe) + '. Fix conversion before adding spend.' : '. Fix conversion first, since added budget earns half the average return.')]);
        } else acts.push(['ok', 'At this pace the year lands at ' + money(pc.forecast) + ', on or above target.']);
        if (actConv && actConv < P.spm * 0.95) acts.push(['watch', 'MQL → SQO is running at ' + pct(actConv * 100) + ' against ' + pct(P.spm * 100) + ' planned. Check lead quality with sales before adding volume.']);
        if (pc.cum.spend.act > pc.cum.spend.plan * 1.05) acts.push(['watch', 'Spend is ' + money(pc.cum.spend.act - pc.cum.spend.plan) + ' ahead of plan to date.']);
        P.risks.filter((r) => r.status === 'Triggered').forEach((r) => acts.push(['fix', 'Triggered: ' + esc(r.risk) + '. ' + esc(r.contingency)]));
      }
      return '<div><h2>Pacing</h2><p class="lead">Plan vs actual by month, a run-rate forecast for the year, and what to do about it. Enter actuals in the left pane each month, or paste them from the CRM report.</p></div>' +
        '<div class="tiles"><div class="tile' + (pk === 'fix' ? ' alert' : '') + '"><span>Pipeline to date' + (pc.asOf ? ' · through ' + P.labels[pc.asOf - 1] : '') + '</span><b>' + money(pc.cum.pipe.act) + '</b><span>of ' + money(pc.cum.pipe.plan) + ' planned · ' + (pc.asOf ? pl : 'no actuals') + '</span></div>' +
        '<div class="tile"><span>Run-rate forecast</span><b>' + money(pc.forecast) + '</b><span>vs ' + money(P.tot.pipe) + ' target</span></div>' +
        '<div class="tile"><span>MQLs to date</span><b>' + fmtInt(pc.cum.mql.act) + '</b><span>of ' + fmtInt(pc.cum.mql.plan) + ' planned</span></div>' +
        '<div class="tile"><span>MQL → SQO to date</span><b>' + (actConv ? pct(actConv * 100) : '–') + '</b><span>' + pct(P.spm * 100) + ' planned</span></div></div>' +
        '<div class="box"><h3>What to do</h3><div class="health">' + acts.map(([k, t]) => hp(k, k === 'fix' ? 'Fix' : k === 'watch' ? 'Watch' : 'OK') + '<span>' + t + '</span>').join('') + '</div></div>' +
        '<div class="out"><table class="t" data-export><thead><tr><th>Month</th><th class="n">MQL plan</th><th class="n">MQL actual</th><th class="n">Pipeline plan</th><th class="n">Pipeline actual</th><th class="n">Spend plan</th><th class="n">Spend actual</th></tr></thead><tbody>' + rows + '</tbody></table></div>' +
        '<p class="note">Forecast = pipeline to date + the rest of the plan × pace to date (' + coverCell(pc.pace) + '). Green is within 5% of plan.</p>';
    },
    scenarios(P) {
      const rows = P.scen.map((s) => '<tr' + (s.f === 1 ? ' class="base"' : '') + '><td><b>' + Math.round(s.f * 100) + '% budget</b></td><td class="n">' + money(s.budget) + '</td><td class="n">' + money(s.pipe) + '</td><td class="n">' + (s.f === 1 ? '–' : (s.pipe >= P.tot.pipe ? '+' : '') + money(s.pipe - P.tot.pipe)) + '</td><td class="n">' + fmtInt(s.mql) + '</td><td class="n">' + (s.budget ? (s.pipe / s.budget).toFixed(1) + 'x' : '–') + '</td><td>' + (esc(s.moves.join('; ')) || 'Plan as built') + '</td></tr>').join('');
      const cut = P.cutList.map((x, i) => '<tr><td>' + (i + 1) + '</td><td>' + esc(x.c.name) + '</td><td class="n">' + money(x.c.cost) + '</td><td class="n">' + x.eff.toFixed(1) + 'x</td><td class="n">' + money(x.c.cost * 0.6 * x.eff) + '</td></tr>').join('');
      const asks = S.asks.map((a) => '<tr><td><b>' + esc(a.ask) + '</b></td><td>' + esc(a.who) + '</td><td>' + (num(a.by) ? P.labels[Math.round(num(a.by)) - 1] || '' : '–') + '</td><td>' + esc(a.why) + '</td></tr>').join('') || '<tr><td colspan="4" class="note">No asks yet. Add them in the left pane.</td></tr>';
      return '<div><h2>Scenarios &amp; asks</h2><p class="lead">What happens to pipeline if the budget moves, what gets cut first, and the decisions needed from leadership to deliver the plan.</p></div>' +
        '<h3>What I need from leadership</h3><div class="out"><table class="t" data-export><thead><tr><th>Ask or decision</th><th>From</th><th>By</th><th>Why it matters</th></tr></thead><tbody>' + asks + '</tbody></table></div>' +
        '<h3>Budget scenarios</h3><div class="out"><table class="t"><thead><tr><th>Scenario</th><th class="n">Budget</th><th class="n">Pipeline</th><th class="n">Change</th><th class="n">MQLs</th><th class="n">Pipe : spend</th><th>What changes</th></tr></thead><tbody>' + rows + '</tbody></table></div>' +
        '<p class="note">Cuts come out of the least efficient programs first, up to 60% of each. Added budget goes to the most efficient programs first, up to half again each one\'s budget, at half their average return, since the next dollar works less hard than the first.</p>' +
        '<h3>Cut order</h3><div class="out"><table class="t"><thead><tr><th>#</th><th>Program</th><th class="n">Budget</th><th class="n">Pipe : spend</th><th class="n">Pipeline lost at a 60% cut</th></tr></thead><tbody>' + cut + '</tbody></table></div>';
    }
  };
  function teamBox(P) {
    const rows = P.team.map((t) => '<tr' + (t.over ? ' class="flagrow"' : '') + '><td><b>' + esc(t.fn) + '</b></td><td class="n">' + fmtInt(num(t.hc)) + '</td><td class="n">' + fmtInt(t.load) + ' / ' + fmtInt(num(t.cap)) + (t.over ? ' <span class="pill burst">Over</span>' : '') + '</td><td>' + esc(t.sla) + '</td><td>' + esc(t.intake) + '</td><td>' + esc(t.escal) + '</td></tr>').join('');
    return '<h3>Team capacity &amp; SLAs</h3><p class="note">Load counts the programs, unfinished assets and campaigns each team carries at once, against what it can run. Teams outside demand gen, like paid shared services, get an SLA and an escalation path, not just a brief.</p>' +
      '<div class="out"><table class="t" data-export><thead><tr><th>Team</th><th class="n">People</th><th class="n">Load / capacity</th><th>SLA</th><th>How to engage</th><th>Escalation</th></tr></thead><tbody>' + rows + '</tbody></table></div>';
  }
  function motionBox(P) {
    const M = P.motion;
    return '<h3>New logo vs expansion</h3><div class="out"><table class="t"><thead><tr><th>Motion</th><th class="n">Share</th><th class="n">Pipeline</th><th class="n">SQOs</th><th>Fed by</th></tr></thead><tbody>' +
      '<tr><td><b>New logo</b></td><td class="n">' + pct((1 - M.e) * 100) + '</td><td class="n">' + money(M.newPipe) + '</td><td class="n">' + fmtInt(M.newSqo) + '</td><td>MQLs from the programs in Channel mix</td></tr>' +
      '<tr><td><b>Expansion</b></td><td class="n">' + pct(M.e * 100) + '</td><td class="n">' + money(M.expPipe) + '</td><td class="n">' + fmtInt(M.expSqo) + '</td><td>' + fmtInt(M.pqlNeed) + ' PQLs at ' + pct(num(S.expConv)) + ' PQL → SQO</td></tr></tbody></table></div>' +
      '<div class="split"><div class="box"><b>PQL supply</b><p>' + fmtInt(M.pqlSupply) + ' PQLs a year from product signals (' + fmtInt(num(S.pqlPerMonth)) + ' a month) against ' + fmtInt(M.pqlNeed) + ' needed. ' + (Math.round(M.pqlSupply) >= Math.round(M.pqlNeed) ? 'Covered.' : '<span class="down">Short ' + fmtInt(M.pqlNeed - M.pqlSupply) + '. Add in-product triggers or route more expansion through sales plays.</span>') + '</p></div>' +
      '<div class="box"><b>Sourced vs influenced</b><p>' + money(P.tot.pipe) + ' sourced and ' + money(M.influenced) + ' influenced' + (M.influenced ? ' (' + (M.influenced / Math.max(1, P.tot.pipe)).toFixed(1) + 'x sourced)' : '') + '. Sourced is the number marketing owns; influenced shows reach into deals sales sources.</p></div></div>';
  }
  function baselineBox(P) {
    const B = P.base, t = P.tot, planConv = P.spm;
    const flags = [];
    if (B.lyConv && planConv > B.lyConv * 1.15) flags.push(['watch', 'Plan assumes ' + pct(planConv * 100) + ' MQL → SQO vs ' + pct(B.lyConv * 100) + ' last year. Show what changes to earn it.']);
    if (B.lyCpm && B.planCpm < B.lyCpm * 0.8) flags.push(['watch', 'Plan assumes ' + money(B.planCpm) + ' per MQL vs ' + money(B.lyCpm) + ' last year.']);
    if (B.mktNeed && B.covGap > 0.5) flags.push(['fix', 'Sales needs ' + money(B.need) + ' pipeline (' + money(num(S.salesTarget)) + ' × ' + num(S.coverage) + 'x). Marketing owes ' + pct(num(S.mktShare)) + ', ' + money(B.mktNeed) + '. The plan is ' + money(B.covGap) + ' short.']);
    else if (B.mktNeed) flags.push(['ok', 'Covers the ' + money(B.mktNeed) + ' marketing owes toward ' + money(B.need) + ' pipeline coverage.']);
    const row = (k, now, then, f) => '<tr><td>' + k + '</td><td class="n">' + (then ? f(then) : '–') + '</td><td class="n">' + f(now) + '</td><td class="n">' + (then ? (growth(now, then) >= 0 ? '+' : '') + Math.round(growth(now, then)) + '%' : '–') + '</td></tr>';
    return '<div class="box"><h3>Vs last year &amp; coverage</h3><div class="out"><table class="t"><thead><tr><th></th><th class="n">Last year</th><th class="n">Plan</th><th class="n">Change</th></tr></thead><tbody>' +
      row('Sourced pipeline', t.pipe, B.ly.pipe, money) + row('MQLs', t.mql, B.ly.mql, fmtInt) + row('SQOs', t.sqo, B.ly.sqo, fmtInt) + row('Program budget', P.budget, B.ly.budget, money) +
      '</tbody></table></div><div class="health">' + flags.map(([k, s]) => hp(k, k === 'fix' ? 'Fix' : k === 'watch' ? 'Watch' : 'OK') + '<span>' + s + '</span>').join('') + '</div></div>';
  }

  function statusPill(st) { return '<span class="pill ' + (st === 'Approved' ? 'ok' : st === 'Submitted' ? 'on' : st === 'Draft' ? 'both' : 'burst') + '">' + esc(st) + '</span>'; }
  // tappable row label and the hidden row that shows how the numbers are built
  function dl(label) { return '<button class="dl" type="button" aria-expanded="false">' + label + '</button>'; }
  function why(cols, lines, foot) {
    return '<tr class="why" hidden><td colspan="' + cols + '"><div class="whybox"><b>How this is built</b><dl>' +
      lines.map(([k, f, v]) => '<dt>' + k + '</dt><dd>' + f + (v !== '' ? ' = <b>' + v + '</b>' : '') + '</dd>').join('') +
      '</dl>' + (foot ? '<p class="note">' + esc(foot) + '</p>' : '') + '</div></td></tr>';
  }
  function assetPill(st) { return '<span class="pill ' + (st === 'Live' ? 'on' : st === 'In production' ? 'both' : 'burst') + '">' + esc(st) + '</span>'; }
  const regionList = (t) => String(t || '').split(/[,;/]+/).map((x) => x.trim()).filter(Boolean);
  function offers(role, stage) { return S.assets.filter((x) => x.role === role && x.stage === stage && x.status !== 'Missing').map((x) => x.asset).join(', '); }
  function riskPill(st) { return '<span class="pill ' + (st === 'Triggered' ? 'burst' : st === 'Watching' ? 'both' : 'on') + '">' + esc(st) + '</span>'; }
  function likePill(l) { return '<span class="pill ' + (l === 'High' ? 'burst' : l === 'Medium' ? 'both' : 'on') + '">' + esc(l || '–') + '</span>'; }
  function coverCell(c) { return Math.round(Math.min(c, 9.99) * 100) + '%'; }

  function health(P) {
    const out = [];
    const over = P.monthly.map((v, i) => [v, i]).filter(([v]) => P.sdrCap > 0 && v > P.sdrCap + 0.5);
    if (P.sdrCap <= 0) out.push(['watch', 'Set SDR headcount to check follow-up capacity']);
    else if (over.length) out.push(['fix', 'SDR capacity is over in ' + over.map(([, i]) => P.labels[i]).join(', ') + ' (' + fmtInt(Math.max(...over.map(([v]) => v))) + ' MQLs vs ' + fmtInt(P.sdrCap) + ' a month)']);
    else out.push(['ok', 'SDRs can work every month\'s MQLs (' + fmtInt(P.sdrCap) + ' a month)']);
    const sub = P.regions.filter((r) => isIn(r.status)).length, appr = P.regions.filter((r) => r.status === 'Approved').length;
    const cov = P.roll.coverage;
    out.push([sub === P.regions.length && cov >= 0.95 ? 'ok' : 'fix', sub + ' of ' + P.regions.length + ' regions submitted (' + appr + ' approved) · regional coverage ' + coverCell(cov)]);
    const lateFrom = Math.max(1, 12 - Math.round(num(S.cycle) / 30));
    if (lateFrom < 12) out.push(['watch', 'Pipeline sourced after month ' + lateFrom + ' (' + P.labels[lateFrom - 1] + ') mostly closes next fiscal year']);
    const paid = P.channels.filter((c) => c.owner === 'Paid (shared svc)').reduce((s, c) => s + c.w, 0);
    out.push([paid > 0.35 ? 'watch' : 'ok', 'Paid is ' + pct(paid * 100) + ' of the mix' + (paid > 0.35 ? ', so the plan leans on a team you don\'t run' : '')]);
    const r = P.budget ? P.tot.pipe / P.budget : 0;
    out.push([r === 0 ? 'watch' : r < 5 ? 'fix' : r < 10 ? 'watch' : 'ok', r ? 'Pipeline to spend ' + r.toFixed(1) + 'x' : 'Set cost per MQL to see pipeline to spend']);
    const miss = S.assets.filter((x) => x.status === 'Missing').length;
    if (miss) out.push(['watch', miss + ' buying committee asset' + (miss > 1 ? 's' : '') + ' missing']);
    const noPlay = S.abmRegions.filter((g) => !g.owner || !g.next).length;
    if (noPlay) out.push(['watch', noPlay + ' region' + (noPlay > 1 ? 's have' : ' has') + ' no ABM owner or next play']);
    const LR = (P.risks || extend(P).risks), trig = LR.filter((x) => x.status === 'Triggered').length, watch = LR.filter((x) => x.status === 'Watching').length;
    if (trig) out.push(['fix', trig + ' risk' + (trig > 1 ? 's' : '') + ' triggered: run the contingency on the Risks tab']);
    if (watch) out.push(['watch', watch + ' risk' + (watch > 1 ? 's' : '') + ' with early warning signals moving']);
    const E = P.pace ? P : extend(P);
    if (E.pace.asOf) { const [k, l] = paceStatus(E.pace.pace); out.push([k, l + ': pipeline is at ' + coverCell(E.pace.pace) + ' of plan through ' + P.labels[E.pace.asOf - 1] + ', forecast ' + money(E.pace.forecast)]); }
    if (E.base.mktNeed && E.base.covGap > 0.5) out.push(['fix', 'Plan is ' + money(E.base.covGap) + ' short of what marketing owes toward sales pipeline coverage']);
    E.team.filter((t) => t.over).forEach((t) => out.push(['watch', t.fn + ' is carrying ' + t.load + ' workstreams against capacity for ' + num(t.cap)]));
    campaignHealth(E).filter((h) => h[0] === 'fix').forEach((h) => out.push(h));
    const rank = { fix: 0, watch: 1, ok: 2 };
    return out.sort((a, b) => rank[a[0]] - rank[b[0]]);
  }
  function healthBox(P) {
    const lab = { fix: 'Fix', watch: 'Watch', ok: 'OK' };
    return '<div class="box"><h3>Plan health</h3><div class="health">' + health(P).map(([k, t]) => '<span class="hp ' + k + '">' + lab[k] + '</span><span>' + esc(t) + '</span>').join('') + '</div></div>';
  }
  function productBox(P) {
    const rows = P.products.map((p) => '<tr><td>' + esc(p.name || 'Untitled') + (num(p.launch) ? ' <span class="note">· launches month ' + fmtInt(num(p.launch)) + '</span>' : '') + '</td><td class="n">' + pct(p.w * 100) + '</td><td class="n">' + money(p.pipe) + '</td><td class="n">' + fmtInt(p.mql) + '</td></tr>').join('');
    return '<div class="box"><h3>Product mix</h3><div class="out"><table class="t"><thead><tr><th>Product</th><th class="n">Share</th><th class="n">Pipeline</th><th class="n">MQLs</th></tr></thead><tbody>' + rows + '</tbody></table></div></div>';
  }
  function motionPill(m) { return '<span class="pill ' + (m === 'Always-on' ? 'on' : m === 'Burst' ? 'burst' : 'both') + '">' + esc(m) + '</span>'; }

  function monthChart(P) {
    const W = 720, H = 220, pl = 44, pr = 10, pt = 26, pb = 28;
    const max = Math.max(1, ...P.monthly);
    const step = niceStep(max / 4), top = Math.ceil(max / step) * step;
    const bw = (W - pl - pr) / 12;
    let g = '';
    for (let v = 0; v <= top + 1e-9; v += step) {
      const y = pt + (H - pt - pb) * (1 - v / top);
      g += '<line x1="' + pl + '" x2="' + (W - pr) + '" y1="' + y + '" y2="' + y + '" stroke="var(--line)"/><text x="' + (pl - 6) + '" y="' + (y + 4) + '" font-size="10" text-anchor="end">' + fmtInt(v) + '</text>';
    }
    const bars = P.monthly.map((v, i) => {
      const h = (H - pt - pb) * (v / top), x = pl + i * bw + bw * 0.18, y = H - pb - h;
      const mo = P.momentAt[i].length > 0;
      return '<rect x="' + x.toFixed(1) + '" y="' + y.toFixed(1) + '" width="' + (bw * 0.64).toFixed(1) + '" height="' + h.toFixed(1) + '" rx="3" fill="' + (mo ? 'var(--wine)' : 'var(--accent)') + '"><title>' + P.labels[i] + ': ' + fmtInt(v) + ' MQLs' + (mo ? ' · ' + esc(P.momentAt[i].join(', ')) : '') + '</title></rect>' +
        '<text x="' + (pl + i * bw + bw / 2).toFixed(1) + '" y="' + (H - 10) + '" font-size="10" text-anchor="middle">' + P.labels[i] + '</text>' +
        (mo ? '<text x="' + (pl + i * bw + bw / 2).toFixed(1) + '" y="' + (y - 6).toFixed(1) + '" font-size="10" text-anchor="middle" style="fill:var(--wine);font-weight:600">' + fmtInt(v) + '</text>' : '');
    }).join('');
    return '<div class="out"><svg viewBox="0 0 ' + W + ' ' + H + '" width="100%" style="min-width:520px;max-width:900px" role="img" aria-label="MQLs by month">' + g + bars + '</svg></div>' +
      '<div class="legend"><span><b style="background:var(--accent)">&nbsp;</b>Base month</span><span><b style="background:var(--wine)">&nbsp;</b>Launch, event or season</span></div>';
  }
  function niceStep(x) { const p = Math.pow(10, Math.floor(Math.log10(Math.max(1, x)))); const f = x / p; return (f <= 1 ? 1 : f <= 2 ? 2 : f <= 5 ? 5 : 10) * p; }

  /* ---------- owners (RACI) ---------- */
  function workstreams(P) {
    const core = [
      { key: 'strategy', name: 'Campaign strategy & pipeline plan' },
      { key: 'message', name: 'Messaging & positioning' },
      { key: 'abm', name: 'ABM account selection & tiers' },
      { key: 'measure', name: 'Funnel definitions & reporting' }
    ];
    return core.concat(P.channels.map((c) => ({ key: 'ch:' + c.id, name: c.name, owner: c.owner })));
  }
  function raciDefault(w, f) {
    const fixed = {
      strategy: { 'Demand gen': 'R', PMM: 'C', Field: 'C', Partner: 'C', 'Paid (shared svc)': 'C', Creative: 'I', RevOps: 'C', 'Sales / SDR': 'C' },
      message: { 'Demand gen': 'C', PMM: 'R', Field: 'I', Partner: 'I', 'Paid (shared svc)': 'I', Creative: 'C', RevOps: 'I', 'Sales / SDR': 'C' },
      abm: { 'Demand gen': 'R', PMM: 'I', Field: 'C', Partner: 'I', 'Paid (shared svc)': 'C', Creative: 'I', RevOps: 'C', 'Sales / SDR': 'C' },
      measure: { 'Demand gen': 'C', PMM: 'I', Field: 'I', Partner: 'I', 'Paid (shared svc)': 'I', Creative: 'I', RevOps: 'R', 'Sales / SDR': 'C' }
    };
    if (fixed[w.key]) return fixed[w.key][f] || '–';
    if (f === w.owner) return 'R';
    if (f === 'Demand gen') return 'A';
    if (f === 'PMM' || f === 'Creative') return 'C';
    if (f === 'RevOps' || f === 'Sales / SDR') return 'I';
    return '–';
  }
  function raciGet(w, f) { const k = w.key + '|' + f; return (S.raci && S.raci[k]) || raciDefault(w, f); }
  function bindRaci() {
    const order = ['R', 'A', 'C', 'I', '–'];
    $('panel').onclick = (e) => {
      const td = e.target.closest('td.c'); if (!td) return;
      const k = td.dataset.w + '|' + td.dataset.f;
      const cur = td.textContent;
      S.raci = S.raci || {};
      S.raci[k] = order[(order.indexOf(cur) + 1) % order.length];
      save(); render();
    };
  }

  /* ---------- paid brief ---------- */
  function paidBrief(P) {
    const paid = P.channels.filter((c) => c.owner === 'Paid (shared svc)');
    const mql = paid.reduce((s, c) => s + c.mql, 0), pipe = paid.reduce((s, c) => s + c.pipe, 0), cost = paid.reduce((s, c) => s + c.cost, 0);
    const lines = [];
    lines.push('PAID MEDIA BRIEF · ' + (S.name || 'Untitled plan') + (S.fy ? ' (' + S.fy + ')' : ''));
    lines.push('');
    lines.push('Objective');
    lines.push('Deliver ' + fmtInt(mql) + ' MQLs and ' + money(pipe) + ' in sourced pipeline, ' + pct(paid.reduce((s, c) => s + c.w, 0) * 100) + ' of the ' + money(P.tot.pipe) + ' plan. Working budget: ' + money(cost) + '.');
    lines.push('');
    lines.push('Products in scope');
    lines.push(S.product || 'TBD');
    lines.push('');
    lines.push('Markets (share of target)');
    P.regions.forEach((r) => lines.push('- ' + r.name + ': ' + pct(r.w * 100) + ' · ' + fmtInt(r.mql * (P.tot.mql ? mql / P.tot.mql : 0)) + ' MQLs from paid'));
    lines.push('');
    lines.push('Audiences (buying committee)');
    S.personas.forEach((p) => lines.push('- ' + p.role + ' (' + p.part + '): ' + p.cares));
    lines.push('');
    lines.push('Account lists');
    P.tiers.forEach((t) => lines.push('- ' + t.tier + ': ' + fmtInt(num(t.accounts)) + ' accounts'));
    lines.push('');
    lines.push('Flighting');
    lines.push('Always-on base all year, with bursts around:');
    S.moments.forEach((m) => lines.push('- Month ' + m.month + ' (' + (P.labels[Math.round(num(m.month)) - 1] || '?') + '): ' + m.name));
    lines.push('');
    lines.push('Offers to promote');
    S.personas.forEach((p) => lines.push('- ' + p.role + ': ' + [offers(p.role, 'Aware'), offers(p.role, 'Consider')].filter(Boolean).join(' → ')));
    lines.push('');
    lines.push('KPIs');
    lines.push('Primary: MQLs and sourced pipeline. Secondary: cost per MQL, Tier 1 account reach. Report weekly into the shared pipeline dashboard.');
    lines.push('');
    lines.push('Handoff');
    lines.push('Engaged accounts route to nurture and SDR follow-up within the agreed SLA. Retargeting supports webinars, events and content offers in the calendar.');
    return lines.join('\n');
  }

  /* ---------- copy / export ---------- */
  function tableData() {
    const t = $('panel').querySelector('table[data-export]') || $('panel').querySelector('table');
    if (!t) return null;
    return Array.from(t.rows).filter((r) => !r.classList.contains('why')).map((r) => Array.from(r.cells).map((c) => c.innerText.replace(/\s+/g, ' ').trim()));
  }
  const tabLabel = () => (TABS.find((t) => t[0] === tab) || [tab, tab])[1];
  const fileBase = () => slug((S.name || 'demand-gen-plan') + '-' + tabLabel());
  function rowsOf(t) { return Array.from(t.rows).filter((r) => !r.classList.contains('why')).map((r) => Array.from(r.cells).map((c) => c.textContent.replace(/[▸▾]/g, '').replace(/\s+/g, ' ').trim())); }
  function allTables() {
    // the hidden export copy stands in for card layouts; otherwise every visible table
    const ex = Array.from($('panel').querySelectorAll('table[data-export]'));
    const vis = Array.from($('panel').querySelectorAll('table')).filter((t) => !t.hasAttribute('data-export') && !t.closest('[hidden]'));
    return ex.concat(vis.filter((t) => !ex.some((x) => x.contains(t))));
  }
  function download(name, blob) {
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = name;
    document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 2000);
  }
  // a clean copy of the tab for docs: drill-downs and month details open, controls removed, plain table borders
  function docHtml() {
    const c = $('panel').cloneNode(true);
    c.querySelectorAll('button, select, input, textarea, svg, .toolbar, table[data-export], .regpick, .rgup, #btn-print').forEach((x) => x.remove());
    c.querySelectorAll('[hidden]').forEach((x) => { if (x.matches('tr.why')) x.hidden = false; else x.remove(); });
    c.querySelectorAll('details').forEach((d) => { const div = document.createElement('div'); const sm = d.querySelector('summary'); if (sm) { const h = document.createElement('h3'); h.innerHTML = sm.innerHTML; div.appendChild(h); sm.remove(); } while (d.firstChild) div.appendChild(d.firstChild); d.replaceWith(div); });
    c.querySelectorAll('table').forEach((t) => { t.setAttribute('border', '1'); t.setAttribute('cellpadding', '6'); t.style.cssText = 'border-collapse:collapse;font-size:10pt'; });
    return '<h1>' + esc(S.name || 'Demand gen plan') + ' · ' + esc(tabLabel()) + '</h1>' + c.innerHTML;
  }
  async function exportTab(kind) {
    const tables = allTables(), main = tableData();
    if (kind === 'pdf') return window.print();
    if (kind === 'sheets') {
      if (!tables.length) return toast('No table on this tab');
      return copyText(tables.map((t) => rowsOf(t).map((r) => r.map((x) => x.replace(/\t/g, ' ')).join('\t')).join('\n')).join('\n\n'), 'Copied. Paste into cell A1 of a Google Sheet');
    }
    if (kind === 'csv') {
      if (!main) return toast('No table on this tab');
      return download(fileBase() + '.csv', new Blob([main.map((r) => r.map((c) => /[",\n]/.test(c) ? '"' + c.replace(/"/g, '""') + '"' : c).join(',')).join('\n')], { type: 'text/csv' }));
    }
    if (kind === 'xlsx') {
      if (!tables.length) return toast('No table on this tab');
      try {
        const X = await loadXlsx(), wb = X.utils.book_new(), used = {};
        tables.forEach((t, i) => {
          let h = t.closest('.box, div') && t.closest('.out') ? (t.closest('.out').previousElementSibling || {}).innerText : '';
          let nm = String(h || (i ? tabLabel() + ' ' + (i + 1) : tabLabel())).replace(/[\\/?*\[\]:]/g, ' ').trim().slice(0, 28) || 'Sheet';
          if (used[nm]) nm = nm.slice(0, 25) + ' ' + (++used[nm]); else used[nm] = 1;
          X.utils.book_append_sheet(wb, X.utils.aoa_to_sheet(rowsOf(t).map((r) => r.map((v) => { const n = Number(v.replace(/[$,%x]/g, '')); return v && /^[−-]?\$?[\d,.]+[%x]?$/.test(v) && isFinite(n) ? (v.includes('%') ? n / 100 : n) : v; }))), nm);
        });
        X.writeFile(wb, fileBase() + '.xlsx');
      } catch (e) { toast('Excel export needs a connection. Try Copy for Google Sheets.'); }
      return;
    }
    const html = docHtml();
    if (kind === 'docs') {
      try {
        await navigator.clipboard.write([new ClipboardItem({ 'text/html': new Blob([html], { type: 'text/html' }), 'text/plain': new Blob([$('panel').innerText], { type: 'text/plain' }) })]);
        toast('Copied. Paste into a Google Doc');
      } catch (e) {
        const d = document.createElement('div'); d.contentEditable = 'true'; d.innerHTML = html; d.style.cssText = 'position:fixed;left:-9999px'; document.body.appendChild(d);
        const r = document.createRange(); r.selectNodeContents(d); const sel = getSelection(); sel.removeAllRanges(); sel.addRange(r);
        try { document.execCommand('copy'); toast('Copied. Paste into a Google Doc'); } catch (x) { toast('Copy didn\'t work here. Try Download Word.'); }
        sel.removeAllRanges(); d.remove();
      }
      return;
    }
    if (kind === 'doc') download(fileBase() + '.doc', new Blob(['<html><head><meta charset="utf-8"><style>body{font-family:Arial,sans-serif;font-size:11pt}h1{font-size:18pt}h2{font-size:15pt}h3{font-size:12pt}td,th{border:1px solid #999;padding:4pt;vertical-align:top}</style></head><body>' + html + '</body></html>'], { type: 'application/msword' }));
  }
  async function copyText(text, msg) {
    try { await navigator.clipboard.writeText(text); toast(msg); }
    catch (e) {
      const ta = document.createElement('textarea'); ta.value = text; document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); toast(msg); } catch (x) { toast('Select the text and copy it'); }
      ta.remove();
    }
  }
  function wire() {
    $('export').addEventListener('click', (e) => { const b = e.target.closest('button[data-ex]'); if (!b) return; $('export').open = false; exportTab(b.dataset.ex); });
    document.addEventListener('click', (e) => { if (!e.target.closest('#export')) $('export').open = false; });
    // print with every campaign, risk and drill-down open, then put them back
    let reopen = [];
    window.addEventListener('beforeprint', () => { reopen = Array.from($('panel').querySelectorAll('details:not([open])')); reopen.forEach((d) => { d.open = true; }); });
    window.addEventListener('afterprint', () => { reopen.forEach((d) => { d.open = false; }); reopen = []; });
    $('btn-reset').onclick = () => { S = example(); save(); bindInputs(); $('example-pill').hidden = false; render(); toast('Example reloaded'); };
    $('btn-blank').onclick = () => { S = blank(); save(); bindInputs(); $('example-pill').hidden = true; render(); toast('Started a blank plan'); };
    $('panel').addEventListener('change', (e) => { if (e.target.id === 'committee-region') { comRegion = e.target.value; render(); } });
    $('in-rp-file').onchange = (e) => uploadPlan(e.target.files[0]);
    $('panel').addEventListener('change', (e) => {
      if (e.target.id === 'rg-up-region') { rpSel = e.target.value; bindRegionPlan(); }
      if (e.target.id === 'rg-up-file') { const f = e.target.files[0]; e.target.value = ''; uploadPlan(f); }
    });
    $('panel').addEventListener('click', (e) => { if (e.target.id === 'rg-up-template') $('btn-rp-template').click(); });
    $('panel').addEventListener('click', (e) => {
      const b = e.target.closest('button[data-rv]'); if (!b) return;
      const name = b.dataset.region, pl = regionPlan(name), box = b.closest('.review'), note = box && box.querySelector('.rv-note') ? box.querySelector('.rv-note').value.trim() : '';
      const date = new Date().toISOString().slice(0, 10);
      if (b.dataset.rv === 'back' && !note) { toast('Add a note so ' + name + ' knows what to change'); box.querySelector('.rv-note').focus(); return; }
      const st = b.dataset.rv === 'approve' ? 'Approved' : b.dataset.rv === 'back' ? 'Changes requested' : 'Submitted';
      pl.status = st; pl.review = { st, note: b.dataset.rv === 'reopen' ? 'Reopened by HQ' : note, date };
      changed(true); toast(name + ': ' + (st === 'Approved' ? 'approved' : st === 'Changes requested' ? 'sent back with your note' : 'reopened'));
    });
    $('btn-rp-template').onclick = () => {
      const a = document.createElement('a');
      a.href = URL.createObjectURL(new Blob([templateCsv()], { type: 'text/csv' }));
      a.download = slug(rpSel || 'region') + '-plan-template.csv'; document.body.appendChild(a); a.click(); a.remove();
    };
    $('in-ai-key').oninput = (e) => { aiKey = e.target.value.trim(); render(); };
    $('panel').addEventListener('click', (e) => { const b = e.target.closest('button[data-ai]'); if (b) askClaude(b.dataset.ai); });
    $('btn-rp-copy').onclick = () => { if (rpSel) copyText(planBlock(rpSel), rpSel + ' plan copied. Send it to HQ'); };
    $('btn-rp-import').onclick = () => { const v = $('in-rp-paste').value.trim(); if (v) importPlan(v); else toast('Paste a plan first'); };
    $('panel').addEventListener('click', (e) => {
      const b = e.target.closest('button.dl'); if (!b) return;
      const row = b.closest('tr').nextElementSibling;
      if (row && row.classList.contains('why')) { row.hidden = !row.hidden; b.setAttribute('aria-expanded', String(!row.hidden)); }
    });
    $('panel').addEventListener('click', (e) => {
      const b = e.target.closest('button[data-tl]'); if (!b) return;
      e.preventDefault();
      const wrap = b.closest('.tlwrap'), id = b.dataset.tl, open = b.getAttribute('aria-expanded') === 'true';
      wrap.querySelectorAll('button[data-tl]').forEach((x) => { x.setAttribute('aria-expanded', 'false'); x.classList.remove('sel'); });
      wrap.querySelectorAll('.tldet').forEach((d) => { d.hidden = open || d.dataset.for !== id; });
      if (!open) { b.setAttribute('aria-expanded', 'true'); b.classList.add('sel'); }
    });
    const CHEERS = ['You make pipeline look easy. 🙌', 'Your funnel math is so clean it squeaks. 🧼', 'Somewhere a CRO just smiled at your coverage ratio. 😌', 'SDRs everywhere are thanking you for that SLA. 💌',
      'Spreadsheets fear you. Respectfully. 📊', 'You put the “fun” in funnel. 🎢', 'Plot twist: the buying committee is a fan of yours. 💅', 'Regions sent their plans on time. Just kidding. But you\'ve got this. 😅',
      'Your MQL → SQO rate called. It\'s proud of you. ✨', 'Legend has it your campaign briefs never need a v2. 🏆', 'Coffee count: high. Pipeline: higher. ☕', 'Go ahead, flex that pipe-to-spend ratio. 💪'];
    let cheerI = Math.floor(Math.random() * CHEERS.length);
    const newCheer = () => { cheerI = (cheerI + 1) % CHEERS.length; $('cheer-t').textContent = CHEERS[cheerI]; };
    $('cheer-t').textContent = CHEERS[cheerI];
    $('cheer-new').onclick = newCheer; $('spider').onclick = newCheer;
    document.addEventListener('click', (e) => { if (e.target.id === 'btn-print') window.print(); });
    document.addEventListener('click', (e) => { if (e.target.id === 'btn-brief') copyText($('brief-text').innerText, 'Brief copied'); });
    const rail = $('rail'), scrim = $('scrim');
    const setRail = (open) => { rail.classList.toggle('open', open); scrim.classList.toggle('open', open); $('btn-open-rail').setAttribute('aria-expanded', String(open)); };
    $('btn-open-rail').onclick = () => setRail(true);
    $('btn-close-rail').onclick = scrim.onclick = () => setRail(false);
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setRail(false); });
  }

  /* ---------- boot ---------- */
  try { const t = localStorage.getItem(STORE_KEY + ':tab'); if (t && TABS.some((x) => x[0] === t)) tab = t; } catch (e) { /* ignore */ }
  $('example-pill').hidden = !S.isExample;
  bindInputs(); renderTabs(); wire(); render();
})();
