# FetchTab Playwright Automation

Base URL:
https://fetchtab.pankajdev.in

## Setup

npm install
npx playwright install

Set test credentials:

PowerShell:
$env:FETCHTAB_EMAIL="your-test-email"
$env:FETCHTAB_PASSWORD="your-password"

Linux/macOS:
export FETCHTAB_EMAIL="your-test-email"
export FETCHTAB_PASSWORD="your-password"

## Run

npm test
npm run test:headed
npm run test:debug
npm run test:chromium
npm run test:smoke
npm run test:regression
npm run report

## Important

The Page Objects contain semantic locator patterns. Replace/refine them with the exact FetchTab DOM selectors after inspecting the application with Playwright Codegen or browser DevTools. Do not commit real credentials.

## Initial coverage

Authentication:
- Valid login
- Invalid login
- Empty login fields
- Invalid email format
- Logout

Dashboard:
- Load
- Search

Bookmarks:
- Add
- Delete

Folders:
- Create

Recommended next modules:
- Edit bookmark
- Duplicate bookmark
- Bookmark validation
- Folder rename/delete
- Nested folders
- Import/export
- Extension synchronization
- Plan/limit scenarios
- Cross-browser regression
