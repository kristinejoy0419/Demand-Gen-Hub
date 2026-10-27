# Demand Gen Hub

Turns a GTM strategy into an integrated demand gen plan. It starts from the marketing-sourced pipeline target, works back through the funnel, and plans the programs, buying committee, calendar and owners that deliver it. Paid media is one workstream, handed off as a brief to the [Paid Media Hub](https://github.com/kristinejoy0419/paid-media-hub).

It opens pre-filled with an **illustrative example**: a fictional AI work platform growing enterprise pipeline with IT buyers in a launch year. Its targets, rates and costs are planning assumptions, not any company's real plan or results.

## Run it

It's a static site with no build step.

- **Locally:** open `index.html` in a browser.
- **GitHub Pages:** go to *Settings → Pages*, set *Source* to "Deploy from a branch", then choose `main` and `/ (root)`. The site will be served at `https://<user>.github.io/<repo>/`.

## Inputs (left rail)

1. **Campaign & brief:** campaign name, fiscal year, products in scope and brief notes.
- **Product mix:** each product's share of pipeline and its launch month.
2. **Pipeline goal & funnel:** the sourced pipeline target, plan start month, lead → MQL rate, SQO → closed-won rate, sales cycle, and SDR headcount and capacity.
3. **Segments:** share of the target, average deal size and MQL → SQO rate for each segment (for example Enterprise and Commercial).
4. **Regions:** each region's share of the global number and who owns it.
5. **Buying committee:** each role, its part in the deal and what it cares about.
- **Offers & assets:** one row per asset with its role, stage (aware, consider, decide), status (live, in production, missing), owner, due month, the regions that need it localized and the localization status.
6. **ABM tiers:** accounts per tier, share of pipeline and the play for each tier.
- **ABM by region:** each region's Tier 1, 2 and 3 accounts, account owner and next play.
7. **Channels & programs:** email, webinars, events, content, SEO, AEO/GEO (AI answer engines), paid, partner, SDR plays and in-product signals. Each has an owner, funnel stage, motion (always-on, burst or both), who runs it (HQ, region or both), share of sourced pipeline and cost per MQL.
8. **Launch moments:** launches, events and buying seasons by plan month. They drive the bursts.
9. **Regional plans:** each regional lead picks their region and uploads their plan as a CSV or Excel file (one row per program with program, month, budget and MQL columns, in any order; month can be a plan month number, a month name or a date). A template and a [sample LATAM plan](samples/latam-plan.csv) are linked in the pane. Programs can then be edited in place, along with the status and what the region adapts locally. Plans can also be shared by copy and paste.
10. **Risks & contingencies:** each risk's status (on track, watching, triggered), likelihood, pipeline at risk, owner, early warning signal, trigger threshold, contingency plan and what we do now to prevent it.

## Outputs (tabs)

| Tab | What it shows |
| --- | --- |
| Summary | Pipeline target, SQOs, MQLs, program budget, plan health flags, product mix, the reverse funnel and MQLs by month |
| Quarterly plan | MQLs, SQOs, pipeline and budget by quarter, plus pipeline by region and by segment for each quarter |
| Funnel by segment | Pipeline, SQOs, MQLs, leads and bookings for each segment |
| Regional plans | A roll-up of each region's target, what HQ programs deliver, what the region owes, what it has committed, coverage and gap. A regional digest lists what to act on first, then each region's section has its own digest that checks the plan against the global plan: coverage, budget, cost per MQL, SDR capacity, launch timing and late-year pipeline. With an Anthropic API key (kept in the browser tab, never saved), each region can also get a Claude-written read |
| Channel mix | Each program's share of pipeline, MQLs, SQOs, budget and pipeline-to-spend ratio |
| Buying committee & ABM | Counts of live, in-production and missing assets, an offer matrix by role and stage that shows gaps, a to-do list by due month, and ABM accounts, pipeline, owner and next play by region. Pick a region to see what it can use and what it is waiting on |
| Calendar | MQLs by program and month, with always-on programs flat and bursts on launch moments |
| Owners | A RACI of workstreams by function. Click a cell to change it |
| Paid brief | A copy-ready brief for the paid media team: target, markets, audiences, account lists, flighting, offers and KPIs |
| Measurement | KPIs with targets, review cadence, owners and sources (including SEO and AEO/GEO), plus the operating rhythm with RevOps |
| Risks & contingencies | Counts by status and pipeline at risk, then one card per risk. Open a card to see its early warning signal, trigger, contingency plan and prevention. Triggered risks open first |

Tap a row in Funnel by segment, Regional plans, Channel mix or Quarterly plan to see how its numbers are built, step by step.

Copy any tab's table to paste into Sheets, or copy it as CSV.

## How the math works

- Pipeline per segment = target × segment share. SQOs = segment pipeline ÷ deal size. MQLs = SQOs ÷ MQL → SQO rate. Leads = MQLs ÷ lead → MQL rate.
- Program share splits pipeline, SQOs and MQLs across enabled programs. Budget = program MQLs × cost per MQL.
- Regional roll-up: programs run by HQ (or HQ and regions together) deliver each region's share of their MQLs. Region-run programs set what each region owes, and the region's committed programs are measured against it.
- Plan health flags SDR capacity, unsubmitted regions and coverage, late-year pipeline that closes next year, a paid-heavy mix, low pipeline to spend and triggered risks and risks whose signals are moving.
- Monthly MQLs: always-on programs spread evenly; burst programs follow launch moments (a launch lifts its month and the next, events and seasons lift their own month); "both" blends the two 60/40.

## Notes

- Inputs are saved in your browser's localStorage. Use "Reload example" to reset, or "Start blank" to clear everything.

## Files

- `index.html`: page structure and inputs
- `styles.css`: theme tokens (light and dark) and layout
- `app.js`: the plan engine, rendering and copy tools
