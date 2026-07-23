# LWTG Trade Manager

**Lone Wolf Trading Group 🐺 — Live Position Dashboard**

A real-time dashboard that shows all your MITS, QC Signals, and QC Trend positions in one place. Reads live from your Google Sheet, updates every 5 seconds, and gives you one-click Ghost exit controls for MITS instruments.

---

## 🚀 Quick Start — Two Ways to Run

### Option A — GitHub Pages (recommended for most users)

No download, no setup. Just open:

**[https://lonewolftradinggroup-ai.github.io/lwtg-trade-manager](https://lonewolftradinggroup-ai.github.io/lwtg-trade-manager)**

On first launch the ⚙ Connect dialog asks for your GAS /exec URL. Paste it, click Save. Done. The URL is remembered in your browser.

> This is all most users need. The dashboard shows live positions, P&L, and entry/exit levels from your Google Sheet.

---

### Option B — Local (for Ghost exit buttons)

The EXIT and FLATTEN ALL buttons require your Ghost webhook URLs, which live in a personal `lwtg-config.js` file on your machine. GitHub Pages cannot serve this file, so you run the app locally to load it.

**Step 1 — Download both files** from the [latest release](https://github.com/lonewolftradinggroup-ai/lwtg-mits-system/releases):
- `index.html` — the Trade Manager app
- `lwtg-config.js` — your personal configuration template

Place both files in the same folder.

**Step 2 — Fill in lwtg-config.js**

Open it in any text editor and replace the placeholder values:

| Field | What to enter | Where to find it |
|---|---|---|
| `gas_url` | Your GAS /exec URL | Apps Script → Deploy → Manage Deployments |
| `instruments → url` | Ghost webhook URL per instrument | Ghost → Tickers → click ticker → Webhook URL |
| `fee_per_contract` | Your broker round-trip fee | Default: 1.90 |
| `dll_warn` | Session loss warning threshold | Default: -500 |
| `dll_block` | Session loss block threshold | Default: -750 |

> ⚠️ **Keep `lwtg-config.js` private.** It contains your Ghost webhook secrets. Never share it, never commit it to GitHub. It is listed in `.gitignore` for this reason.

**Step 3 — Start a local web server**

Open a terminal in the folder containing your files and run:
```
python -m http.server 8080
```

**Step 4 — Open in Chrome**
```
http://localhost:8080/index.html
```

The dashboard loads immediately with your instruments and Ghost exit buttons active.

---

## 📋 Dashboard Overview

| Element | What it means |
|---|---|
| **MITS cards** | MES, MNQ, MGC, M2K — gold labels |
| **QCS cards** | QC Signals presets — green labels |
| **QCT cards** | QC Trend presets — amber labels |
| **LONG / SHORT / FLAT badge** | Current position — click to manually override |
| **Entry / TP / SL** | Bracket levels for the current position |
| **Live P&L** | Real-time profit/loss from NT8 Price Server |
| **● live vs ● manual** | live = from Google Sheets · manual = badge override |
| **⚙ Connect** | Opens GAS URL dialog — use to change your URL |

---

## ⚙️ Adding or Removing Instruments (Option B only)

Edit the `instruments` array in `lwtg-config.js`. No HTML editing needed.

```javascript
{
  id:     "MNQ",          // Card label
  strat:  "MITS",         // "MITS" | "QC Signals" | "QC Trend"
  tf:     "15m",          // Timeframe (display only)
  ticker: "MNQ1!",        // TradingView continuous contract symbol
  tick:   2.00,           // Dollar value per full point
  url:    "https://quantcrawler.com/api/ghost/webhook/...", // Ghost URL (null = paper)
  qcs:    false,          // true = shows PAPER label, disables EXIT button
},
```

Save the file and reload. Changes apply immediately.

---

## 🔴 Exit Controls

- **EXIT button** — fires a Ghost exit webhook for MITS instruments. Requires `url` set in config.
- **PAPER — NO EXIT** — shown on QCS and QCT cards. Exits handled by the strategy.
- **⚡ FLATTEN ALL** — fires exit webhooks for ALL active MITS instruments simultaneously. **Cannot be undone.** Confirmation required.

---

## 🔌 NT8 Live P&L

The Trade Manager polls the NT8 Price Server at `localhost:8765` every 2 seconds for live prices. Requires NinjaTrader 8 running with the `LWTGPriceServer.cs` indicator loaded. If NT8 is offline, Live P&L falls back to Google Sheets data.

---

## ❓ Troubleshooting

| Problem | Fix |
|---|---|
| ⚙ Connect dialog keeps appearing | `lwtg-config.js` not found or `gas_url` not filled in |
| Cards show wrong position | Check AlertLog for orphan OPEN rows; click badge to override |
| EXIT button does nothing | `url` not set in `lwtg-config.js` for that instrument |
| NT8 offline | NinjaTrader not running or `LWTGPriceServer.cs` not loaded |
| Running locally but config not loading | Make sure both files are in the same folder and you're on `http://` not `file://` |

---

## 📁 Files

| File | Description |
|---|---|
| `index.html` | The Trade Manager app — safe to share, no credentials |
| `lwtg-config.js` | Your personal config — **never share, gitignored** |

---

*Not financial advice. 🐺 Lone Wolf Trading Group*
