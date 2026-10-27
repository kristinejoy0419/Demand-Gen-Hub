# Demand Gen Hub

Turns a GTM strategy into an integrated demand gen plan. It starts from the marketing-sourced pipeline target, works back through the funnel, and plans the programs, buying committee, calendar and owners that deliver it. Paid media is one workstream, handed off as a brief to the [Paid Media Hub](https://github.com/kristinejoy0419/paid-media-hub).

It opens pre-filled with an **illustrative example**: a fictional AI work platform growing enterprise pipeline with IT buyers in a launch year. Its targets, rates and costs are planning assumptions, not any company's real plan or results.

## Run it

It's a static site with no build step.

- **Locally:** open `index.html` in a browser.
- **GitHub Pages:** go to *Settings → Pages*, set *Source* to "Deploy from a branch", then choose `main` and `/ (root)`. The site will be served at `https://<user>.github.io/<repo>/`.

## Inputs (left rail)

Grouped as Strategy, Targets, Audience, Programs, Regions and Execution.

- **Campaign & brief:** campaign name, fiscal year, products in scope and brief notes.
- **Campaigns:** each campaign's tier (Tier 1 launch, Tier 2 launch, always-on, seasonal), status, theme, hero offer, audience, product, start, launch and end months, share of pipeline, programs and owner.
- **Product mix:** each product's share of pipeline and its launch month.
- **Pipeline goal & funnel:** the sourced pipeline target, plan start month, lead → MQL rate, SQO → closed-won rate, sales cycle, and SDR headcount and capacity.
- **Targets & baseline:** the sales bookings target, pipeline coverage needed and marketing's share of it; last year's sourced pipeline, MQLs, SQOs and budget; the expansion share of pipeline, PQL → SQO rate, PQLs a month and the influenced pipeline target.
- **Segments:** share of the target, average deal size and MQL → SQO rate for each segment.
- **Regions:** each region's share of the global number and who owns it.
- **Buying committee:** each role, its part in the deal and what it cares about.
- **Offers & assets:** one row per asset with its role, stage, status (live, in production, missing), owner, due month, the regions that need it localized and the localization status.
- **ABM tiers** and **ABM by region:** accounts, pipeline share and play per tier; each region's Tier 1, 2 and 3 accounts, account owner and next play.
- **Channels & programs:** email, webinars, events, content, SEO, AEO/GEO (AI answer engines), paid, partner, SDR plays and in-product signals, each with an owner, stage, motion, who runs it, share and cost per MQL.
- **Launch moments:** launches, events and buying seasons by plan month. They drive the bursts.
- **Regional plans:** each regional lead uploads a CSV or Excel plan (program, month, budget and MQL columns in any order). A template and a [sample LATAM plan](samples/latam-plan.csv) are linked in the pane. Plans can also be shared by copy and paste.
- **Risks & contingencies:** status, likelihood, pipeline at risk, owner, early warning signal, trigger, contingency plan and prevention.
- **Actuals:** MQLs, SQOs, pipeline and spend for each closed month.
- **Team & SLAs:** each team's people, how much it can run at once, its SLA, how to engage it and the escalation path.
- **Asks of leadership:** the decisions and resources needed, from whom and by when.

## Outputs (tabs)

| Group | Tab | What it shows |
| --- | --- | --- |
| Overview | Plan on a page | Pipeline vs last year, coverage of the sales need, budget, pacing, campaigns, what needs attention, pipeline by quarter, asks, budget scenarios and risks. Prints to one PDF |
| | Summary | Headline numbers, plan health, product mix, last year and coverage checks, the reverse funnel and MQLs by month |
| Execution | Pacing | Plan vs actual by month, a run-rate forecast and what to do about a gap |
| Plan | Campaigns | One card per campaign with theme, hero offer, audience, programs, a 12-month timeline and milestones worked back from launch |
| | Quarterly plan | MQLs, SQOs, pipeline and budget by quarter, by region and by segment |
| | Funnel & motion | The funnel by segment, new logo vs expansion with PQL supply, and sourced vs influenced |
| | Channel mix | Each program's share, pipeline, MQLs, SQOs, budget and pipeline to spend |
| | Calendar | MQLs by program and month |
| Regions & accounts | Regional plans | The regional roll-up, a regional digest of what to act on first, and a section and digest per region, with an optional Claude-written read |
| | Buying committee & ABM | Asset status, an offer matrix by role and stage, a to-do list, and ABM by region, with a region picker |
| Execution | Team & owners | Team load against capacity, SLAs and escalation paths, and a RACI |
| | Paid brief | A copy-ready brief for the paid media shared service |
| | Measurement | KPIs with targets, review cadence, owners and sources |
| | Scenarios & asks | Asks of leadership, pipeline at 80%, 100% and 120% budget, and the cut order |
| | Risks | Risk cards with signal, trigger and contingency |

Tap a row in Funnel, Regional plans, Channel mix or Quarterly plan to see how its numbers are built. Copy any tab's table to paste into Sheets, or copy it as CSV.

## How the math works

- Pipeline per segment = target × segment share. SQOs = segment pipeline ÷ deal size. MQLs = SQOs ÷ MQL → SQO rate. Leads = MQLs ÷ lead → MQL rate.
- Program share splits pipeline, SQOs and MQLs across enabled programs. Budget = program MQLs × cost per MQL.
- Regional roll-up: programs run by HQ (or HQ and regions together) deliver each region's share of their MQLs. Region-run programs set what each region owes, and the region's committed programs are measured against it.
- Pacing forecast = pipeline to date + the rest of the plan × pace to date.
- Budget scenarios cut the least efficient programs first (up to 60% of each) and add to the most efficient (up to half again each budget) at half their average return.
- Campaign milestones: brief 3 months before launch, messaging locked 2 months before, creative, paid flight brief and sales enablement 1 month before, retro 2 months after.
- Plan health flags SDR capacity, unsubmitted regions and coverage, late-year pipeline that closes next year, a paid-heavy mix, low pipeline to spend and triggered risks and risks whose signals are moving.
- Monthly MQLs: always-on programs spread evenly; burst programs follow launch moments (a launch lifts its month and the next, events and seasons lift their own month); "both" blends the two 60/40.

## Notes

- Inputs are saved in your browser's localStorage. Use "Reload example" to reset, or "Start blank" to clear everything.

## Files

- `index.html`: page structure and inputs
- `styles.css`: theme tokens (light and dark) and layout
- `app.js`: the plan engine, rendering and copy tools
