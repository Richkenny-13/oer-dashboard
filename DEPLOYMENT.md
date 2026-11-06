# OER Dashboard — Deployment Guide

## What You're Deploying

- **Frontend**: OER Dashboard web app (accessible from any computer)
- **Backend**: 4 REST API endpoints (Vercel serverless functions)
- **Database**: Upstash Redis (stores your admin config changes)
- **Cost**: $0 (all free tiers)

---

## Step 1: GitHub — Push the Project

1. Go to [github.com](https://github.com) and sign in (or create a free account)
2. Click **New repository** → name it `oer-dashboard` → **Create repository**
3. On your local machine, open **Git Bash** (already installed on your PC)
4. Run the following commands:

```bash
cd "C:/Users/Richard/Documents/Claude/Projects/OER database/oer-web"
git init
git add .
git commit -m "Initial OER Dashboard deployment"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/oer-dashboard.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

---

## Step 2: Upstash Redis — Config Database

1. Go to [upstash.com](https://upstash.com) → **Sign up free** (use Google login)
2. Click **Create Database**
   - Name: `oer-config`
   - Type: **Regional** → select `us-east-1`
   - Click **Create**
3. In your new database, click the **REST API** tab
4. Copy these two values — you will need them in Step 3:
   - `UPSTASH_REDIS_REST_URL` — looks like `https://xxxxx.upstash.io`
   - `UPSTASH_REDIS_REST_TOKEN` — long string starting with `AX...`

---

## Step 3: Vercel — Deploy the App

1. Go to [vercel.com](https://vercel.com) → **Sign up free** (use GitHub login)
2. Click **Add New Project** → **Import Git Repository**
3. Select your `oer-dashboard` repository → click **Import**
4. On the configure screen:
   - **Framework Preset**: Other
   - **Root Directory**: `oer-web`  ← **Important: must set this**
   - Click **Environment Variables** and add all four:

| Variable Name | Value |
|---|---|
| `UPSTASH_REDIS_REST_URL` | paste from Upstash Step 3 |
| `UPSTASH_REDIS_REST_TOKEN` | paste from Upstash Step 3 |
| `ADMIN_PASSWORD` | choose a strong password (e.g. `FalconQ2-2026!`) |
| `API_KEY` | choose a random key (e.g. `fc-oer-a8f3k2p9m7`) |

5. Click **Deploy** — takes about 60 seconds
6. Your live URL will be: `https://oer-dashboard.vercel.app` (or similar)

---

## Step 4: Verify Everything Works

Open these URLs in your browser (replace `yourdomain` with your actual Vercel URL):

```
https://yourdomain.vercel.app/                    ← Dashboard loads
https://yourdomain.vercel.app/api/health          ← Returns JSON status
https://yourdomain.vercel.app/api/property-types  ← All property types list
```

---

## Step 5: Admin Panel Setup

1. Open the dashboard URL
2. Press **Ctrl+,** to open the Admin Panel
3. Enter the `ADMIN_PASSWORD` you set in Vercel
4. Click **Unlock Admin Panel**
5. Make a test change → click **Save**
6. Refresh the page — change should persist (stored in Redis)

---

## API Usage — External Software

### Authentication
All API calls require the `x-api-key` header:
```
x-api-key: YOUR_API_KEY
```

### Calculate OER (POST)

```bash
curl -X POST https://yourdomain.vercel.app/api/calculate \
  -H "Content-Type: application/json" \
  -H "x-api-key: YOUR_API_KEY" \
  -d '{
    "propertyType": "multifamily",
    "subtype": "class_b_mf",
    "state": "TX",
    "metroTier": "tier3",
    "submarket": "suburban_prime",
    "catZone": "none",
    "vintage": "mature",
    "propertyClass": "medium"
  }'
```

**Response:**
```json
{
  "low": 30.0,
  "high": 41.0,
  "midpoint": 35.5,
  "confidence": 95,
  "scenarios": {
    "bestCase": 30.0,
    "mostProbable": 35.5,
    "stressCase": 41.0
  },
  "adjustments": {
    "base": { "low": 30, "high": 40 },
    "state": { "low": 0, "high": 1 }
  },
  "dataQuarter": "Q2 2026",
  "calculatedAt": "2026-05-05T14:23:00.000Z"
}
```

### Excel / Power Query Integration

In Excel:
1. **Data** → **Get Data** → **From Other Sources** → **From Web**
2. URL: `https://yourdomain.vercel.app/api/calculate`
3. Advanced → add header: `x-api-key` = your key
4. Use POST with JSON body

Or use this Power Query M formula:
```
let
  url = "https://yourdomain.vercel.app/api/calculate",
  body = Json.FromValue([
    propertyType="multifamily", subtype="class_b_mf",
    state="TX", metroTier="tier3", submarket="suburban_prime",
    catZone="none", vintage="mature", propertyClass="medium"
  ]),
  response = Web.Contents(url, [
    Headers=[#"Content-Type"="application/json", #"x-api-key"="YOUR_KEY"],
    Content=body
  ])
in
  Json.Document(response)
```

---

## Quarterly Data Refresh (the normal path)

Each quarter the baseline in `lib/defaults.js` is rewritten from the latest filings and released by a push to `main`:

1. Edit `lib/defaults.js`: `dataCurrency` (quarter, year, `lastUpdated`, source line, per-asset-class vintage), `baseRanges` where evidence supports a change, `allocations`, `marketNotes`, `openItems`.
2. Commit and push (see "Redeploy After Code Changes"). Vercel deploys in about a minute.
3. Nothing else is needed. Since the Q4 2026 refresh, a deployed `dataCurrency.lastUpdated` that is newer than the cached Redis config makes the deployed data win, so a stale cache can no longer mask a refresh and no admin password is needed to clear it. If Redis is unreachable or deleted, every endpoint serves the deployed defaults instead of failing.

Refresh history: Q2 2026 (initial, 2026-05-06) · Q3 2026 multifamily pass (2026-07-30, never deployed) · Q4 2026 (2026-11-06: Q3 2026 filings, multifamily split re-derived, all sectors re-dated, Redis fallback added; same day: retail and hospitality ranges recalibrated from FY2025 10-Ks, office allocation re-derived from Income/Expense IQ 2024 data, quarterly refresh routine scheduled for the 10th of Feb/May/Aug/Nov).

## Updating Config Between Refreshes

For a one-off edit between quarterly refreshes, you have two options:

**Option A — Admin Panel (easiest):**
1. Open the dashboard → Ctrl+, → unlock with password
2. Edit values in each tab → Save
3. Changes sync to Redis immediately

**Option B — API (for bulk updates):**
```bash
curl -X PUT https://yourdomain.vercel.app/api/config \
  -H "Content-Type: application/json" \
  -H "x-admin-password: YOUR_ADMIN_PASSWORD" \
  -d '{"key": "dataCurrency", "value": "Q3 2026"}'
```

---

## Backup & Restore

**Export current config:**
```bash
curl https://yourdomain.vercel.app/api/config > oer-config-backup-Q2-2026.json
```

**Restore from backup:**
```bash
curl -X PUT https://yourdomain.vercel.app/api/config \
  -H "Content-Type: application/json" \
  -H "x-admin-password: YOUR_ADMIN_PASSWORD" \
  -d '{"fullConfig": <paste backup JSON here>}'
```

---

## Redeploy After Code Changes

If you modify any files in `oer-web/`:
```bash
cd "C:/Users/Richard/Documents/Claude/Projects/OER database/oer-web"
git add .
git commit -m "Update: description of change"
git push
```
Vercel auto-deploys on every push — live in ~60 seconds.

---

## Environment Variables Reference

| Variable | Required | Purpose |
|---|---|---|
| `UPSTASH_REDIS_REST_URL` | Yes | Redis database URL |
| `UPSTASH_REDIS_REST_TOKEN` | Yes | Redis auth token |
| `ADMIN_PASSWORD` | Yes | Admin panel + config write access |
| `API_KEY` | Yes | External API authentication |

To rotate any key: Vercel Dashboard → Settings → Environment Variables → update → Redeploy.

---

## Troubleshooting

| Issue | Fix |
|---|---|
| Dashboard shows "Loading config..." forever | Check Vercel function logs; verify Upstash env vars are set |
| `/api/health` shows `storageReachable: false` | Upstash database is gone or paused; the site keeps serving the deployed defaults. Recreate the database and update the two env vars only if admin-panel edits are needed again |
| Admin save says "Failed" | Verify `ADMIN_PASSWORD` env var matches what you typed |
| API returns 401 Unauthorized | Check `x-api-key` header matches `API_KEY` env var |
| Config reverts after admin save | Check Upstash dashboard — free tier limit is 10k commands/day |
| Need to reset all config to defaults | PUT `fullConfig` with the contents of `lib/defaults.js` |
| Root directory error on Vercel | Confirm Root Directory is set to `oer-web` (not the repo root) |

---

## API Endpoints Summary

| Method | Endpoint | Auth | Purpose |
|---|---|---|---|
| GET | `/api/health` | None | System status check |
| GET | `/api/config` | None | Full config (all adjustments) |
| PUT | `/api/config` | Admin password | Update config section or full config |
| GET | `/api/property-types` | None | All property types / dropdown values |
| POST | `/api/calculate` | API key | Calculate OER for given inputs |

---

*Falcon Capital | Keystone Valuations | OER Dashboard v1.1 | Q4 2026 data (refreshed 2026-11-06)*
