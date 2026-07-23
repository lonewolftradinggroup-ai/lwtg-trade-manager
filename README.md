# LWTG Trade Manager

**Lone Wolf Trading Group 🐺 — Live Position Dashboard**

A real-time dashboard that shows all your MITS, QC Signals, and QC Trend positions in one place. Reads live from your Google Sheet, updates every 5 seconds, and gives you one-click Ghost exit controls for MITS instruments.

---

## 🚀 Quick Start

### What you need
- Google Chrome
- Python installed (for the local web server)
- Your GAS /exec URL (from Section 6 of the User Guide)
- Your Ghost webhook URLs (from Ghost → Tickers → click ticker → Webhook URL)

### Step 1 — Download both files
From the [latest release](https://github.com/lonewolftradinggroup-ai/lwtg-mits-system/releases):
- `index.html` — the Trade Manager app
- `lwtg-config.js` — your personal configuration template

Place both files in the **same folder**.

### Step 2 — Fill in lwtg-config.js
Open `lwtg-config.js` in any text editor and replace the placeholder values:

| Field | What to enter |
|---|---|
| `gas_url` | Your GAS /exec URL |
| `instruments → url` | Your Ghost webhook URL for each MITS instrument |
| `fee_per_contract` | Your broker round-trip commission (default: 1.90) |
| `dll_warn` | Session loss warning threshold (default: -500) |
| `dll_block` | Session loss block threshold (default: -750) |

> ⚠️ **Keep `lwtg-config.js` private.** It contains your Ghost webhook secrets. Never share it, never commit it to GitHub. It is listed in `.gitignore` for this reason.

### Step 3 — Start the local web server
Run `LWTG_Start_Apps.bat` from your desktop, or open a terminal and run:
```
python -m http.server 8080 --directory "C:\path\to\your\apps"
```

### Step 4 — Open in Chrome
```
http://localhost:8080/index.html
```

If `lwtg-config.js` is present and filled in correctly, the dashboard loads immediately with your instruments. No prompt needed.

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

## ⚙️ Adding or Removing Instruments

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

Save the file and reload the Trade Manager. Changes apply immediately.

---

## 🔴 Exit Controls

- **EXIT button** — fires a Ghost exit webhook for MITS instruments. Use to close a position manually.
- **PAPER — NO EXIT** — shown on QCS and QCT cards. Exits are handled by the strategy.
- **⚡ FLATTEN ALL** — fires exit webhooks for ALL active MITS instruments simultaneously. **Cannot be undone.** Confirmation required.

---

## 🔌 NT8 Live P&L

The Trade Manager polls the NT8 Price Server at `localhost:8765` every 2 seconds for live prices. This requires:
- NinjaTrader 8 running
- `LWTGPriceServer.cs` NinjaScript indicator loaded on your chart

If NT8 is offline, the Live P&L field shows `NT8 offline` and falls back to Google Sheets data.

---

## ❓ Troubleshooting

| Problem | Fix |
|---|---|
| Dashboard won't load | Make sure the local web server is running and you're on `http://` not `file://` |
| Cards show wrong position | Click the badge to manually override, or check AlertLog for orphan OPEN rows |
| EXIT button does nothing | Check that `url` is set in `lwtg-config.js` for that instrument |
| ⚙ Connect dialog keeps appearing | `lwtg-config.js` is missing or `gas_url` is not filled in |
| NT8 offline | NinjaTrader is not running or `LWTGPriceServer.cs` is not loaded |
| Live P&L shows wrong numbers | Check `tick` values in `lwtg-config.js` match your instrument |

---

## 📁 Files

| File | Description |
|---|---|
| `index.html` | The Trade Manager app — safe to share, no credentials |
| `lwtg-config.js` | Your personal config — **never share, gitignored** |

---

*Not financial advice. 🐺 Lone Wolf Trading Group*
