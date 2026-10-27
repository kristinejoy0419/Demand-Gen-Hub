/* Demand Gen Hub: GTM brief -> integrated demand gen plan.
   One state object, editable input tables on the left, computed plan tabs on the right. */
(function () {
  'use strict';

  const STORE_KEY = 'demand-gen-hub:v3';
  const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const RISK_STATUS = ['On track', 'Watching', 'Triggered'];
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
        { risk: 'Commercial MQL → SQO lands below plan', likelihood: 'Medium', impact: 2000000, status: 'On track', owner: 'Demand gen',
          signal: 'Weekly MQL → SQO rate by segment', trigger: 'Commercial below 13% for 3 weeks in a row',
          contingency: 'Raise the MQL score threshold with RevOps, route low-fit MQLs to nurture, and move 10% of Commercial paid budget to in-product PQL plays.',
          mitigation: 'Agree scoring and SLA with RevOps before the year starts; review at day 30' },
        { risk: 'AI answers cut organic clicks', likelihood: 'Medium', impact: 1000000, status: 'Watching', owner: 'Content + web',
          signal: 'Non-brand organic sessions vs AI citation rate on tracked prompts', trigger: 'Organic sessions down 15% quarter on quarter with no lift in AI-referred traffic',
          contingency: 'Move half of the SEO content budget to AEO answer pages and comparison content, and add AI-referred MQLs to the weekly readout.',
          mitigation: 'Structure priority pages as direct answers; track citations monthly' },
        { risk: 'SDR capacity in launch months', likelihood: 'Medium', impact: 1500000, status: 'Watching', owner: 'Sales / SDR',
          signal: 'Share of MQLs worked within 24 hours', trigger: 'Follow-up SLA under 85% in any week',
          contingency: 'Route Tier 3 and Commercial MQLs to automated nurture, borrow 2 SDRs from outbound for the launch month, and send partner-sourced leads to partner managers.',
          mitigation: 'Stagger regional launch dates; plan SDR coverage with sales a quarter ahead' },
        { risk: 'Regional plans fall short of what regions owe', likelihood: 'Low', impact: 8900000, status: 'Triggered', owner: 'Field',
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
      tiers: [{ tier: 'Tier 1 · 1:1', accounts: 0, share: 100, play: '' }],
      products: [{ name: '', share: 100, launch: 0 }],
      moments: [], regionPlans: {}, risks: [], raci: {}
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
  let tab = 'summary';
  function load() { try { const v = localStorage.getItem(STORE_KEY); return v ? JSON.parse(v) : null; } catch (e) { return null; } }
  function save() { try { localStorage.setItem(STORE_KEY, JSON.stringify(S)); } catch (e) { /* storage unavailable */ } }

  /* ---------- helpers ---------- */
  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const num = (v) => { const n = parseFloat(v); return isFinite(n) ? n : 0; };
  const fmtInt = (n) => Math.round(n).toLocaleString('en-US');
  function money(n) {
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
    const map = { 'in-name': 'name', 'in-fy': 'fy', 'in-product': 'product', 'in-brief': 'brief', 'in-goal': 'goal', 'in-start': 'start', 'in-r1': 'r1', 'in-r3': 'r3', 'in-cycle': 'cycle', 'in-sdrs': 'sdrs', 'in-sdrcap': 'sdrCap' };
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
      { key: 'role', label: 'Role', w: 130 }, { key: 'part', label: 'Part in the deal', w: 110 }, { key: 'cares', label: 'Cares about', type: 'area' },
      { key: 'aware', label: 'Aware offer', type: 'area' }, { key: 'consider', label: 'Consider offer', type: 'area' }, { key: 'decide', label: 'Decide offer', type: 'area' }
    ], { noun: 'role', make: () => ({ role: '', part: '', cares: '', aware: '', consider: '', decide: '' }) });
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
      { key: 'status', label: 'Status', type: 'select', options: RISK_STATUS },
      { key: 'likelihood', label: 'Likelihood', type: 'select', options: ['High', 'Medium', 'Low'] },
      { key: 'impact', label: 'Pipeline at risk $', type: 'num', w: 80 }, { key: 'owner', label: 'Owner', w: 90 },
      { key: 'signal', label: 'Early warning signal', type: 'area', w: 160 }, { key: 'trigger', label: 'Trigger', type: 'area', w: 150 },
      { key: 'contingency', label: 'Contingency plan', type: 'area', w: 200 }, { key: 'mitigation', label: 'Prevent now', type: 'area', w: 160 }
    ], { noun: 'risk', make: () => ({ risk: '', status: 'On track', likelihood: 'Medium', impact: 0, owner: '', signal: '', trigger: '', contingency: '', mitigation: '' }) });
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
  function hqDigest(P) {
    const all = P.regions.map((r) => ({ r, d: digest(r, P) }));
    const fixes = all.flatMap(({ r, d }) => d.items.filter((i) => i[0] === 'fix').map((i) => '<b>' + esc(r.name) + ':</b> ' + i[1]));
    const watches = all.reduce((a, { d }) => a + d.items.filter((i) => i[0] === 'watch').length, 0);
    const sub = P.regions.filter((r) => r.status === 'Submitted').length;
    const worst = P.regions.slice().sort((a, b) => b.gap - a.gap)[0];
    return '<div class="box hqd"><h3>Regional digest</h3><p>' + sub + ' of ' + P.regions.length + ' regions submitted. Regional programs cover ' + coverCell(P.roll.coverage) + ' of what regions owe, leaving ' + fmtInt(P.roll.gap) + ' MQLs (' + money(P.roll.gap * (P.tot.mql ? P.tot.pipe / P.tot.mql : 0)) + ' pipeline) uncovered' +
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
      status: ['Not started', 'Draft', 'Submitted'].includes(d.status) ? d.status : 'Draft',
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
  const TABS = [
    ['summary', 'Summary'], ['quarters', 'Quarterly plan'], ['funnel', 'Funnel by segment'], ['regions', 'Regional plans'], ['channels', 'Channel mix'],
    ['committee', 'Buying committee & ABM'], ['calendar', 'Calendar'], ['owners', 'Owners'], ['paid', 'Paid brief'], ['measure', 'Measurement'], ['risks', 'Risks & contingencies']
  ];
  function renderTabs() {
    $('tabs').innerHTML = TABS.map(([k, l]) => '<button class="tab" role="tab" type="button" data-tab="' + k + '" aria-selected="' + (k === tab) + '">' + l + '</button>').join('');
    $('tabs').onclick = (e) => { const k = e.target.dataset.tab; if (k) { tab = k; try { localStorage.setItem(STORE_KEY + ':tab', k); } catch (x) { /* ignore */ } renderTabs(); render(); } };
  }

  function render() {
    const P = compute();
    $('panel').innerHTML = VIEWS[tab](P);
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
        '<div class="split">' + healthBox(P) + productBox(P) + '</div>' +
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
      return '<div><h2>Funnel by segment</h2><p class="lead">Each segment has its own deal size and MQL-to-SQO rate, so the volume needed differs a lot. Smaller deals need far more MQLs per dollar of pipeline. Tap a segment to see how its numbers are built.</p></div>' +
        '<div class="out"><table class="t" data-export><thead><tr><th>Segment</th><th class="n">Share</th><th class="n">Pipeline</th><th class="n">Avg deal</th><th class="n">SQOs</th><th class="n">MQLs</th><th class="n">Leads</th><th class="n">Bookings</th></tr></thead><tbody>' + rows +
        '</tbody><tfoot><tr><td>Total</td><td class="n">100%</td><td class="n">' + money(t.pipe) + '</td><td class="n">' + money(t.sqo ? t.pipe / t.sqo : 0) + '</td><td class="n">' + fmtInt(t.sqo) + '</td><td class="n">' + fmtInt(t.mql) + '</td><td class="n">' + fmtInt(t.leads) + '</td><td class="n">' + money(t.bookings) + '</td></tr></tfoot></table></div>' +
        '<p class="note">Sales cycle: ' + fmtInt(num(S.cycle)) + ' days, so pipeline created after month ' + Math.max(1, 12 - Math.round(num(S.cycle) / 30)) + ' mostly closes next fiscal year.</p>';
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
        return '<div class="box region' + (r.status === 'Not started' ? ' empty' : '') + '" id="rg-' + slug(r.name) + '"><div class="rhead"><h3>' + esc(r.name) + '</h3>' + statusPill(r.status) + '</div>' +
          '<p class="note">' + pct(r.w * 100) + ' of the number · ' + money(r.pipe) + ' pipeline · ' + fmtInt(r.mql) + ' MQLs' + (r.lead ? ' · owned by ' + esc(r.lead) : '') + '</p>' +
          '<div><b>HQ delivers</b> ' + fmtInt(r.fromHq) + ' MQLs from global programs</div>' +
          '<div><b>Region owes</b> ' + fmtInt(r.owes) + ' MQLs from its own programs</div>' + list +
          (r.plan.adapt ? '<div><b>Adapting locally</b> ' + esc(r.plan.adapt) + '</div>' : '') +
          '<div class="' + (r.gap > 0.5 ? 'gap' : 'ok') + '">' + (r.gap > 0.5 ? 'Gap: ' + fmtInt(r.gap) + ' MQLs' : 'Covered') + ' · ' + coverCell(r.coverage) + ' coverage</div>' + digestBox(r, P) + '</div>';
      }).join('');
      return '<div><h2>Regional plans</h2><p class="lead">HQ owns the strategy, message, platforms and measurement. Each region owns its slice of the number and uploads its plan in the left pane, under Regional plans. Each upload gets a digest that checks it against the global plan. Tap a region to see how its numbers are built.</p></div>' +
        '<div class="out"><table class="t" data-export><thead><tr><th>Region</th><th>Status</th><th class="n">Pipeline</th><th class="n">MQL target</th><th class="n">From HQ programs</th><th class="n">Region owes</th><th class="n">Committed</th><th class="n">Regional budget</th><th class="n">Coverage</th><th class="n">Gap</th></tr></thead><tbody>' + rows +
        '</tbody><tfoot><tr><td>Total</td><td>' + P.regions.filter((r) => r.status === 'Submitted').length + ' of ' + P.regions.length + ' submitted</td><td class="n">' + money(P.tot.pipe) + '</td><td class="n">' + fmtInt(R.mql) + '</td><td class="n">' + fmtInt(R.fromHq) + '</td><td class="n">' + fmtInt(R.owes) + '</td><td class="n">' + fmtInt(R.committed) + '</td><td class="n">' + money(R.spend) + '</td><td class="n">' + coverCell(R.coverage) + '</td><td class="n">' + fmtInt(R.gap) + '</td></tr></tfoot></table></div>' +
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
    risks() {
      const so = { Triggered: 0, Watching: 1, 'On track': 2 }, lo = { High: 0, Medium: 1, Low: 2 };
      const list = S.risks.slice().sort((a, b) => ((so[a.status] ?? 3) - (so[b.status] ?? 3)) || ((lo[a.likelihood] ?? 3) - (lo[b.likelihood] ?? 3)));
      const count = (st) => list.filter((r) => (r.status || 'On track') === st).length;
      const atRisk = list.filter((r) => r.status === 'Triggered' || r.status === 'Watching').reduce((t, r) => t + Math.max(0, num(r.impact)), 0);
      const cards = list.map((r) => {
        const st = r.status || 'On track';
        return '<details class="risk ' + st.replace(' ', '-').toLowerCase() + '"' + (st === 'Triggered' ? ' open' : '') + '><summary>' +
          '<span class="rtop">' + riskPill(st) + '<span class="note">' + esc(r.likelihood || '–') + ' likelihood' + (num(r.impact) ? ' · ' + money(num(r.impact)) + ' pipeline at risk' : '') + '</span>' + '</span>' +
          '<b class="rname">' + esc(r.risk || 'Untitled risk') + '</b><span class="note">Owner: ' + esc(r.owner || '–') + '</span></summary>' +
          '<div class="rbody">' +
          '<div><h4>Early warning</h4><p>' + (esc(r.signal) || '<span class="note">Add the signal to watch</span>') + '</p></div>' +
          '<div><h4>Trigger</h4><p>' + (esc(r.trigger) || '<span class="note">Add the threshold that sets off the plan</span>') + '</p></div>' +
          '<div class="act"><h4>' + (st === 'Triggered' ? 'Do now' : 'If triggered') + '</h4><p>' + (esc(r.contingency) || '<span class="note">Add the contingency plan</span>') + '</p></div>' +
          '<div><h4>Prevent now</h4><p>' + (esc(r.mitigation) || '<span class="note">–</span>') + '</p></div>' +
          '</div></details>';
      }).join('') || '<p class="note">No risks yet. Add them in the left pane, under Risks &amp; contingencies.</p>';
      const exp = list.map((r) => '<tr><td>' + esc(r.risk) + '</td><td>' + esc(r.status) + '</td><td>' + esc(r.likelihood) + '</td><td>' + money(num(r.impact)) + '</td><td>' + esc(r.owner) + '</td><td>' + esc(r.signal) + '</td><td>' + esc(r.trigger) + '</td><td>' + esc(r.contingency) + '</td><td>' + esc(r.mitigation) + '</td></tr>').join('');
      return '<div><h2>Risks &amp; contingencies</h2><p class="lead">Each risk has an early warning signal, the threshold that triggers it, and the plan we run when it does. Owners check their signals in the weekly pipeline review. Open a risk to see its plan.</p></div>' +
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
      const rows = S.personas.map((p) => '<tr><td><b>' + esc(p.role) + '</b><div class="note">' + esc(p.part) + '</div></td><td>' + esc(p.cares) + '</td><td>' + esc(p.aware) + '</td><td>' + esc(p.consider) + '</td><td>' + esc(p.decide) + '</td></tr>').join('');
      const trs = P.tiers.map((t) => '<tr><td><b>' + esc(t.tier) + '</b></td><td class="n">' + fmtInt(num(t.accounts)) + '</td><td class="n">' + pct(t.w * 100) + '</td><td class="n">' + money(t.pipe) + '</td><td class="n">' + money(t.perAcct) + '</td><td>' + esc(t.play) + '</td></tr>').join('');
      return '<div><h2>Buying committee &amp; ABM</h2><p class="lead">One buying committee with role-specific tracks. Each role gets the story it cares about, and every track points at the same account-level pipeline goal.</p></div>' +
        '<div class="out"><table class="t" data-export><thead><tr><th>Role</th><th>Cares about</th><th>Aware</th><th>Consider</th><th>Decide</th></tr></thead><tbody>' + rows + '</tbody></table></div>' +
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
      return '<div><h2>Owners</h2><p class="lead">Who does what, so campaigns stay focused and nobody runs a random act of marketing. Click a cell to change it.</p></div>' +
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
        ['Tier 1 account engagement', 'Buying committee coverage', 'Monthly', 'Demand gen + Sales', 'ABM platform']
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

  function statusPill(st) { return '<span class="pill ' + (st === 'Submitted' ? 'on' : st === 'Draft' ? 'both' : 'burst') + '">' + esc(st) + '</span>'; }
  // tappable row label and the hidden row that shows how the numbers are built
  function dl(label) { return '<button class="dl" type="button" aria-expanded="false">' + label + '</button>'; }
  function why(cols, lines, foot) {
    return '<tr class="why" hidden><td colspan="' + cols + '"><div class="whybox"><b>How this is built</b><dl>' +
      lines.map(([k, f, v]) => '<dt>' + k + '</dt><dd>' + f + (v !== '' ? ' = <b>' + v + '</b>' : '') + '</dd>').join('') +
      '</dl>' + (foot ? '<p class="note">' + esc(foot) + '</p>' : '') + '</div></td></tr>';
  }
  function riskPill(st) { return '<span class="pill ' + (st === 'Triggered' ? 'burst' : st === 'Watching' ? 'both' : 'on') + '">' + esc(st) + '</span>'; }
  function likePill(l) { return '<span class="pill ' + (l === 'High' ? 'burst' : l === 'Medium' ? 'both' : 'on') + '">' + esc(l || '–') + '</span>'; }
  function coverCell(c) { return Math.round(Math.min(c, 9.99) * 100) + '%'; }

  function health(P) {
    const out = [];
    const over = P.monthly.map((v, i) => [v, i]).filter(([v]) => P.sdrCap > 0 && v > P.sdrCap + 0.5);
    if (P.sdrCap <= 0) out.push(['watch', 'Set SDR headcount to check follow-up capacity']);
    else if (over.length) out.push(['fix', 'SDR capacity is over in ' + over.map(([, i]) => P.labels[i]).join(', ') + ' (' + fmtInt(Math.max(...over.map(([v]) => v))) + ' MQLs vs ' + fmtInt(P.sdrCap) + ' a month)']);
    else out.push(['ok', 'SDRs can work every month\'s MQLs (' + fmtInt(P.sdrCap) + ' a month)']);
    const sub = P.regions.filter((r) => r.status === 'Submitted').length;
    const cov = P.roll.coverage;
    out.push([sub === P.regions.length && cov >= 0.95 ? 'ok' : 'fix', sub + ' of ' + P.regions.length + ' regions submitted · regional coverage ' + coverCell(cov)]);
    const lateFrom = Math.max(1, 12 - Math.round(num(S.cycle) / 30));
    if (lateFrom < 12) out.push(['watch', 'Pipeline sourced after month ' + lateFrom + ' (' + P.labels[lateFrom - 1] + ') mostly closes next fiscal year']);
    const paid = P.channels.filter((c) => c.owner === 'Paid (shared svc)').reduce((s, c) => s + c.w, 0);
    out.push([paid > 0.35 ? 'watch' : 'ok', 'Paid is ' + pct(paid * 100) + ' of the mix' + (paid > 0.35 ? ', so the plan leans on a team you don\'t run' : '')]);
    const r = P.budget ? P.tot.pipe / P.budget : 0;
    out.push([r === 0 ? 'watch' : r < 5 ? 'fix' : r < 10 ? 'watch' : 'ok', r ? 'Pipeline to spend ' + r.toFixed(1) + 'x' : 'Set cost per MQL to see pipeline to spend']);
    const trig = S.risks.filter((x) => x.status === 'Triggered').length, watch = S.risks.filter((x) => x.status === 'Watching').length;
    if (trig) out.push(['fix', trig + ' risk' + (trig > 1 ? 's' : '') + ' triggered: run the contingency on the Risks tab']);
    if (watch) out.push(['watch', watch + ' risk' + (watch > 1 ? 's' : '') + ' with early warning signals moving']);
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
    S.personas.forEach((p) => lines.push('- ' + p.role + ': ' + [p.aware, p.consider].filter(Boolean).join(' → ')));
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
  async function copyText(text, msg) {
    try { await navigator.clipboard.writeText(text); toast(msg); }
    catch (e) {
      const ta = document.createElement('textarea'); ta.value = text; document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); toast(msg); } catch (x) { toast('Select the text and copy it'); }
      ta.remove();
    }
  }
  function wire() {
    $('btn-copy').onclick = () => { const d = tableData(); if (!d) return toast('No table on this tab'); copyText(d.map((r) => r.join('\t')).join('\n'), 'Table copied'); };
    $('btn-csv').onclick = () => { const d = tableData(); if (!d) return toast('No table on this tab'); copyText(d.map((r) => r.map((c) => /[",\n]/.test(c) ? '"' + c.replace(/"/g, '""') + '"' : c).join(',')).join('\n'), 'CSV copied'); };
    $('btn-reset').onclick = () => { S = example(); save(); bindInputs(); $('example-pill').hidden = false; render(); toast('Example reloaded'); };
    $('btn-blank').onclick = () => { S = blank(); save(); bindInputs(); $('example-pill').hidden = true; render(); toast('Started a blank plan'); };
    $('in-rp-file').onchange = (e) => uploadPlan(e.target.files[0]);
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
