# FetchTab Playwright security automation

Playwright + TypeScript security-regression framework for [FetchTab](https://fetchtab.pankajdev.in). It is designed for a dedicated test account and deliberately avoids creating, importing, sharing, deleting, billing, or extension operations.

## Verified discovery

The public site exposes `/login`, `/forgot-password`, and `/signup`. Authenticated module routes are discovered from the real FetchTab sidebar at test runtime, so the suite covers every module visible to the configured account without hard-coding a stale module list.

## Install and configure

```bash
npm install
npx playwright install
copy .env.example .env
```

Use dedicated non-production accounts only:

```dotenv
BASE_URL=https://fetchtab.pankajdev.in
FETCHTAB_EMAIL=
FETCHTAB_PASSWORD=
```

## Run

```bash
npx playwright test
npx playwright test --headed
npx playwright test --ui
npx playwright test --grep @smoke
npm run test:public-security
npm run test:module-security
npm run typecheck
npx playwright show-report reports/html
```

## Layout

- `tests/fetchtab/` – public checks and dynamic authenticated-module authorization checks
- `tests/auth/fetchtab.setup.ts` – dedicated FetchTab test-account storage state
- `config/fetchtabUser.ts` – local-only credentials configuration
- `.github/workflows/playwright.yml` – CI workflow

## Safety and diagnostics

Credentials and auth states are ignored by Git. HTML, JSON, and JUnit results go to `reports/`; Playwright retains failure screenshots, retry video, and first-retry traces. The suite is non-mutating: it does not alter bookmarks, folders, sharing, imports, billing, or extension state.
