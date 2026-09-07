# SalesCoach AI Playwright automation

End-to-end Playwright + TypeScript coverage for the public SalesCoach AI app at `https://salescoach-28ae3.firebaseapp.com`.

## Run

1. Install dependencies: `npm install`
2. Install Playwright browsers if needed: `npx playwright install`
3. Copy `.env.example` to `.env`.
4. Run the public suite: `npm test` or `npm run test:smoke`.

Public tests work without credentials. To include the authenticated-login setup, add a dedicated non-production account as `SALESCOACH_EMAIL` and `SALESCOACH_PASSWORD` in `.env`. Never commit `.env` or `playwright/.auth/user.json`.

## Coverage

- Login form rendering, mandatory fields, empty submit, and invalid-user protection
- Login-to-password-recovery and login-to-signup navigation
- Signup terms requirement, client-side valid-input enablement, and safe return to login
- Authenticated dashboard smoke check when dedicated credentials are configured
- Reusable page objects for Login, Signup, Password Recovery, and Dashboard

## Commands

- `npm test` — all tests in Chromium and Firefox
- `npm run test:auth` — SalesCoach tests in Chromium
- `npm run test:smoke` — smoke-tagged checks
- `npm run test:regression` — regression-tagged checks
- `npm run test:headed` — run visibly
- `npm run test:debug` — open Playwright Inspector
- `npm run report` — open the latest HTML report

## Layout

- `tests/salescoach/` — active SalesCoach scenarios and optional authenticated-state setup
- `pages/` — reusable page-object locators
- `fixtures/` — typed Playwright fixtures
- `data/` and `utils/` — credentials and test utilities

This is a standalone SalesCoach project; Playwright runs the suite in `tests/salescoach/`.
