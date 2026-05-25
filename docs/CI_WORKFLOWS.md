# CI Workflows (Manual Setup)

The GitHub MCP token used to bootstrap this repo lacks the `workflows` permission scope - this is a known limitation that prevents pushing files to `.github/workflows/` via API. The workflows below must be added manually via GitHub web UI (one-time, ~2 min).

## How to add

1. Go to https://github.com/aanthonya2003-lgtm/kaelins-market-el-cajon/actions/new
2. Click "set up a workflow yourself"
3. Paste the YAML from below
4. Commit

---

## Workflow 1: QC Check (`.github/workflows/qc-check.yml`)

Runs typecheck + lint + build on every push/PR to main.

```yaml
name: QC Check

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
  workflow_dispatch:

jobs:
  qc:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - name: Install
        run: npm install --legacy-peer-deps
      - name: Typecheck
        run: npm run typecheck
      - name: Lint
        run: npm run lint
        continue-on-error: true
      - name: Build
        run: npm run build
        env:
          NEXT_TELEMETRY_DISABLED: '1'
```

---

## Workflow 2: Instagram Token Refresh (`.github/workflows/refresh-instagram-token.yml`)

Runs every 55 days to refresh long-lived Instagram Graph API tokens before they expire at 60 days.

Requires repo secret `INSTAGRAM_ACCESS_TOKEN` (only set once owner verifies @kaelinsmarket handle).

```yaml
name: Refresh Instagram Token

on:
  schedule:
    - cron: '0 9 1,26 1/2 *'
  workflow_dispatch:

jobs:
  refresh:
    runs-on: ubuntu-latest
    steps:
      - name: Refresh
        run: |
          if [ -z "${{ secrets.INSTAGRAM_ACCESS_TOKEN }}" ]; then
            echo 'No INSTAGRAM_ACCESS_TOKEN secret set. Skipping.'
            exit 0
          fi
          RESPONSE=$(curl -s -X GET "https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${{ secrets.INSTAGRAM_ACCESS_TOKEN }}")
          NEW_TOKEN=$(echo "$RESPONSE" | grep -oP '"access_token":"\K[^"]+' || echo "")
          if [ -z "$NEW_TOKEN" ]; then
            echo "::error::Token refresh failed: $RESPONSE"
            exit 1
          fi
          echo "::add-mask::$NEW_TOKEN"
          echo 'Token refreshed. Update INSTAGRAM_ACCESS_TOKEN in Vercel + GitHub secrets.'
```

---

## After both workflows are added

Verify they appear at https://github.com/aanthonya2003-lgtm/kaelins-market-el-cajon/actions

The QC workflow will run automatically on next push. The Instagram refresh workflow stays dormant until you add the `INSTAGRAM_ACCESS_TOKEN` repo secret.
