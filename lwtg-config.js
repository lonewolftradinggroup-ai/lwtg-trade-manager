// ============================================================
// lwtg-config.js — LWTG MITS User Configuration
// ============================================================
// Edit this file once during setup. All LWTG apps read from it.
// Place this file in the same folder as your Trade Manager and
// Journal HTML files.
//
// ⚠️  KEEP THIS FILE PRIVATE — it contains your Ghost webhook
//     URLs and secrets. Add it to .gitignore if you use Git.
//     Never share this file or post it in Discord.
// ============================================================

const LWTG_CONFIG = {

  // ── Your GAS /exec URL ──────────────────────────────────────
  // Find this in Apps Script → Deploy → Manage Deployments.
  // Copy the /exec URL exactly — do not retype it.
  gas_url: "https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec",

  // ── Fees & Risk Thresholds ──────────────────────────────────
  fee_per_contract: 1.90,   // Round-trip commission per contract ($)
  dll_warn:         -500,   // Session P&L warning threshold ($) — Telegram alert fires here
  dll_block:        -750,   // Session P&L block threshold ($) — matches Pine DLL gate

  // ── NT8 Price Server ────────────────────────────────────────
  // Leave as-is unless you changed the port in LWTGPriceServer.cs
  nt8_url: "http://localhost:8765",

  // ── Poll Interval ───────────────────────────────────────────
  // How often Trade Manager polls your Google Sheet (milliseconds)
  poll_interval_ms: 5000,   // 5 seconds — recommended minimum

  // ── Instrument Cards ────────────────────────────────────────
  // One entry per instrument or preset you are trading.
  // Fields:
  //   id       — unique label shown on the card
  //   strat    — "MITS" | "QC Signals" | "QC Trend"
  //   tf       — timeframe shown on card (display only)
  //   ticker   — TradingView continuous contract symbol
  //   url      — Ghost webhook URL for this instrument (null = paper/no exit button)
  //   tick     — dollar value per full point (used for live P&L calculation)
  //   qcs      — true if QC Signals preset (disables EXIT button, shows PAPER label)
  //
  // Ghost webhook URL format:
  //   https://quantcrawler.com/api/ghost/webhook/YOUR-UUID?secret=YOUR-SECRET
  //   Find your URL in Ghost → Tickers → click your ticker → Webhook URL
  //
  // ⚠️  MITS instruments need their Ghost URL for the EXIT button to work.
  //     QC Signals and QC Trend cards set url:null (exits handled by the strategy).

  instruments: [

    // ── MITS ──────────────────────────────────────────────────
    {
      id:     "MES",
      strat:  "MITS",
      tf:     "15m",
      ticker: "MES1!",
      tick:   5.00,
      url:    "https://quantcrawler.com/api/ghost/webhook/YOUR-MES-UUID?secret=YOUR-MES-SECRET",
    },
    {
      id:     "MNQ",
      strat:  "MITS",
      tf:     "15m",
      ticker: "MNQ1!",
      tick:   2.00,
      url:    "https://quantcrawler.com/api/ghost/webhook/YOUR-MNQ-UUID?secret=YOUR-MNQ-SECRET",
    },
    {
      id:     "MGC",
      strat:  "MITS",
      tf:     "5m",
      ticker: "MGC1!",
      tick:   10.00,
      url:    "https://quantcrawler.com/api/ghost/webhook/YOUR-MGC-UUID?secret=YOUR-MGC-SECRET",
    },
    {
      id:     "M2K",
      strat:  "MITS",
      tf:     "15m",
      ticker: "M2K1!",
      tick:   5.00,
      url:    "https://quantcrawler.com/api/ghost/webhook/YOUR-M2K-UUID?secret=YOUR-M2K-SECRET",
    },

    // ── QC Signals ────────────────────────────────────────────
    // url is null — QC Signals exits are handled by the strategy, not by the EXIT button.
    // Remove any presets you are not running.
    {
      id:     "MNQ-4m",
      strat:  "QC Signals",
      tf:     "4m",
      ticker: "MNQ1!",
      tick:   2.00,
      url:    null,
      qcs:    true,
    },
    {
      id:     "MES-5m",
      strat:  "QC Signals",
      tf:     "5m",
      ticker: "MES1!",
      tick:   5.00,
      url:    null,
      qcs:    true,
    },

    // ── QC Trend ──────────────────────────────────────────────
    // url is null while paper trading. Add Ghost URL when going live.
    {
      id:     "MNQ-4m-QCT",
      strat:  "QC Trend",
      tf:     "4m",
      ticker: "MNQ1!",
      tick:   2.00,
      url:    null,
      qcs:    false,
    },

  ],

};
