/* Demand Gen Hub: GTM brief -> integrated demand gen plan.
   One state object, editable input tables on the left, computed plan tabs on the right. */
(function () {
  'use strict';

  const STORE_KEY = 'demand-gen-hub:v1';
  const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
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
        { id: 'seo', on: true, name: 'SEO & AI search (GEO)', owner: 'Demand gen', kind: 'Earned', stage: 'Aware', motion: 'Always-on', runBy: 'HQ', share: 8, cpm: 250 },
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
      moments: [], raci: {}
    });
  }

  /* ---------- state ---------- */
  let S = load() || example();
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

    return { goal, r1, r3, segs, tot, regions, channels, budget, monthly, momentAt, tiers, labels: monthLabels() };
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
    const map = { 'in-name': 'name', 'in-fy': 'fy', 'in-product': 'product', 'in-brief': 'brief', 'in-goal': 'goal', 'in-start': 'start', 'in-r1': 'r1', 'in-r3': 'r3', 'in-cycle': 'cycle' };
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
    ['summary', 'Summary'], ['funnel', 'Funnel by segment'], ['regions', 'Global vs regional'], ['channels', 'Channel mix'],
    ['committee', 'Buying committee & ABM'], ['calendar', 'Calendar'], ['owners', 'Owners'], ['paid', 'Paid brief'], ['measure', 'Measurement']
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
        '<div class="split"><div class="box" style="grid-column:1/-1"><h3>Reverse funnel</h3><p class="note">Worked back from the pipeline target. Bars are to scale.</p><div class="funnel">' + funnel + '</div></div></div>' +
        '<div class="box"><h3>MQLs by month</h3><p class="note">Always-on programs run flat; burst programs follow launch moments (marked).</p>' + monthChart(P) + '</div>';
    },
    funnel(P) {
      const rows = P.segs.map((s) => '<tr><td>' + esc(s.name) + '</td><td class="n">' + pct(s.w * 100) + '</td><td class="n">' + money(s.pipe) + '</td><td class="n">' + money(s.acv) + '</td><td class="n">' + fmtInt(s.sqo) + '</td><td class="n">' + fmtInt(s.mql) + '</td><td class="n">' + fmtInt(s.leads) + '</td><td class="n">' + money(s.bookings) + '</td></tr>').join('');
      const t = P.tot;
      return '<div><h2>Funnel by segment</h2><p class="lead">Each segment has its own deal size and MQL-to-SQO rate, so the volume needed differs a lot. Smaller deals need far more MQLs per dollar of pipeline.</p></div>' +
        '<div class="out"><table class="t" data-export><thead><tr><th>Segment</th><th class="n">Share</th><th class="n">Pipeline</th><th class="n">Avg deal</th><th class="n">SQOs</th><th class="n">MQLs</th><th class="n">Leads</th><th class="n">Bookings</th></tr></thead><tbody>' + rows +
        '</tbody><tfoot><tr><td>Total</td><td class="n">100%</td><td class="n">' + money(t.pipe) + '</td><td class="n">' + money(t.sqo ? t.pipe / t.sqo : 0) + '</td><td class="n">' + fmtInt(t.sqo) + '</td><td class="n">' + fmtInt(t.mql) + '</td><td class="n">' + fmtInt(t.leads) + '</td><td class="n">' + money(t.bookings) + '</td></tr></tfoot></table></div>' +
        '<p class="note">Sales cycle: ' + fmtInt(num(S.cycle)) + ' days, so pipeline created after month ' + Math.max(1, 12 - Math.round(num(S.cycle) / 30)) + ' mostly closes next fiscal year.</p>';
    },
    regions(P) {
      const rows = P.regions.map((r) => '<tr><td>' + esc(r.name) + '</td><td>' + esc(r.lead) + '</td><td class="n">' + pct(r.w * 100) + '</td><td class="n">' + money(r.pipe) + '</td><td class="n">' + fmtInt(r.sqo) + '</td><td class="n">' + fmtInt(r.mql) + '</td><td class="n">' + fmtInt(r.leads) + '</td></tr>').join('');
      const by = (v) => P.channels.filter((c) => c.runBy === v).map((c) => '<li>' + esc(c.name) + '</li>').join('') || '<li class="note">None</li>';
      return '<div><h2>Global vs regional</h2><p class="lead">HQ owns the strategy, message, platforms and measurement. Regions own execution and their slice of the number.</p></div>' +
        '<div class="out"><table class="t" data-export><thead><tr><th>Region</th><th>Owned by</th><th class="n">Share</th><th class="n">Pipeline</th><th class="n">SQOs</th><th class="n">MQLs</th><th class="n">Leads</th></tr></thead><tbody>' + rows + '</tbody></table></div>' +
        '<div class="split">' +
        '<div class="box"><h3>Run by HQ</h3><p class="note">Needs scale and one consistent story.</p><ul>' + by('HQ') + '</ul></div>' +
        '<div class="box"><h3>Run by regions</h3><p class="note">Needs local knowledge and sales alignment.</p><ul>' + by('Region') + '</ul></div>' +
        '<div class="box"><h3>Global spine, local activation</h3><p class="note">HQ builds it once, regions localize it.</p><ul>' + by('Both') + '</ul></div>' +
        '</div>' +
        '<div class="box"><h3>Keep consistent vs adapt</h3><div class="split"><div><b>Keep consistent</b><ul><li>Positioning and campaign theme</li><li>Target account criteria and ABM tiers</li><li>Brand and creative system</li><li>Funnel definitions and attribution</li></ul></div><div><b>Adapt by region</b><ul><li>Language and local proof points</li><li>Channel mix and offers</li><li>Timing around local seasons and holidays</li><li>Compliance, such as GDPR in EMEA</li></ul></div></div></div>';
    },
    channels(P) {
      const maxW = Math.max(0.001, ...P.channels.map((c) => c.w));
      const rows = P.channels.map((c) => '<tr><td>' + esc(c.name) + '</td><td>' + esc(c.owner) + '</td><td>' + esc(c.stage) + '</td><td>' + motionPill(c.motion) + '</td><td class="n">' + pct(c.w * 100) + '</td><td><div class="meter"><i style="width:' + (c.w / maxW * 100).toFixed(1) + '%"></i></div></td><td class="n">' + money(c.pipe) + '</td><td class="n">' + fmtInt(c.mql) + '</td><td class="n">' + fmtInt(c.sqo) + '</td><td class="n">' + money(c.cost) + '</td><td class="n">' + (c.cost ? (c.pipe / c.cost).toFixed(1) + 'x' : '–') + '</td></tr>').join('');
      const paid = P.channels.find((c) => c.owner === 'Paid (shared svc)');
      const paidShare = P.channels.filter((c) => c.owner === 'Paid (shared svc)').reduce((s, c) => s + c.w, 0);
      return '<div><h2>Channel mix</h2><p class="lead">Every program ladders up to one pipeline number. Paid media is ' + pct(paidShare * 100) + ' of sourced pipeline' + (paid ? '; the rest comes from owned, earned, partner, sales and product programs.' : '.') + '</p></div>' +
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
      const rows = kpis.map((k) => '<tr><td><b>' + k[0] + '</b></td><td class="n">' + k[1] + '</td><td>' + k[2] + '</td><td>' + k[3] + '</td><td>' + k[4] + '</td></tr>').join('');
      return '<div><h2>Measurement</h2><p class="lead">Pipeline first, efficiency second. Agree on these definitions with RevOps before the year starts, and report from one shared dashboard.</p></div>' +
        '<div class="out"><table class="t" data-export><thead><tr><th>Metric</th><th class="n">Target</th><th>Review</th><th>Owner</th><th>Source</th></tr></thead><tbody>' + rows + '</tbody></table></div>' +
        '<div class="split"><div class="box"><h3>Operating rhythm</h3><ul><li>Weekly pipeline review with RevOps and sales</li><li>Monthly readout to marketing and sales leadership, presented jointly with RevOps</li><li>Quarterly plan reset: shift budget to what is converting</li></ul></div>' +
        '<div class="box"><h3>Shared definitions</h3><ul><li>What counts as an MQL and an SQO</li><li>Sourced vs influenced pipeline</li><li>Attribution model and lookback window</li><li>Lead follow-up SLA for sales</li></ul></div></div>';
    }
  };

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
    return Array.from(t.rows).map((r) => Array.from(r.cells).map((c) => c.innerText.replace(/\s+/g, ' ').trim()));
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
    document.addEventListener('click', (e) => { if (e.target.id === 'btn-brief') copyText($('brief-text').innerText, 'Brief copied'); });
  }

  /* ---------- boot ---------- */
  try { const t = localStorage.getItem(STORE_KEY + ':tab'); if (t && TABS.some((x) => x[0] === t)) tab = t; } catch (e) { /* ignore */ }
  $('example-pill').hidden = !S.isExample;
  bindInputs(); renderTabs(); wire(); render();
})();
