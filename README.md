# SalesCoach Playwright automation

Production-oriented Playwright + TypeScript regression framework for [SalesCoach](https://salescoach-28ae3.firebaseapp.com). It keeps roles in isolated storage states and performs no create, delete, billing, or integration operation unless dedicated test data is explicitly provisioned.

## Verified discovery

The public site exposes `/login`, `/forgot-password`, and `/signup`. Login provides email/password, Google sign-in, recovery, and organization creation. Authenticated navigation is captured from the real sidebar at test runtime; role suites operate only on modules actually shown to that account.

## Install and configure

```bash
npm install
npx playwright install
copy .env.example .env
```

Use dedicated non-production accounts only:

```dotenv
BASE_URL=https://salescoach-28ae3.firebaseapp.com
ORG_ADMIN_EMAIL=
ORG_ADMIN_PASSWORD=
MANAGER_EMAIL=
MANAGER_PASSWORD=
SALES_REP_EMAIL=
SALES_REP_PASSWORD=
```

## Run

```bash
npx playwright test
npx playwright test --headed
npx playwright test --ui
npx playwright test --grep @smoke
npx playwright test --grep @org-admin
npx playwright test --grep @manager
npx playwright test --grep @sales-rep
npm run typecheck
npx playwright show-report reports/html
```

## Layout

- `pages/` – Page Objects, app shell, and reusable feature model
- `fixtures/` – role-aware fixtures
- `tests/auth/` – authentication and storage-state setup
- `tests/org-admin`, `tests/manager`, `tests/sales-rep` – isolated role suites
- `tests/common`, `tests/negative`, `tests/ui`, `tests/regression` – public checks
- `config/`, `utils/`, `test-data/` – environment, account, test-data, monitoring, helpers
- `.github/workflows/playwright.yml` – CI workflow

## Safety and diagnostics

Credentials and auth states are ignored by Git. HTML, JSON, and JUnit results go to `reports/`; Playwright retains failure screenshots, retry video, and first-retry traces. Mutating, usage-limit, meeting-provider, billing, and cross-organization tests need dedicated test fixtures plus cleanup support before enabling.
