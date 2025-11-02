---
sidebar_position: 3
---

# Currency Exchange Quick Start Guide

The Currency Exchange app ("Smart Exchange") delivers real-time conversions, historical trend charts, and cached exchange tables using the Frankfurter API. Follow this quick start to install, configure, and extend the project.

- Repository: [saragolbek/currencyexchange-rates](https://github.com/saragolbek/currencyexchange-rates)
- Live Site: https://currencyexchange-rates.netlify.app/
- Tech Stack: React (Create React App), React Router, Chart.js, Bootstrap, Frankfurter API, localStorage caching

## Prerequisites

- Review the repository README for screenshots and feature descriptions.
- Install Node.js 14+ (Node 18 LTS recommended) and npm or Yarn.
- Ensure you have Git access to clone the repository.
- Confirm outbound HTTPS access to https://api.frankfurter.dev/ for currency data.

## Step 1: Clone and Install

```bash
git clone https://github.com/saragolbek/currencyexchange-rates.git
cd currencyexchange-rates
npm install    # or yarn install
```

## Step 2: Understand the Project Structure

| Path | Purpose |
|------|---------|
| `src/App.js` | Sets up routing between the converter (`/`) and exchange table (`/Exchange/:id`). |
| `src/Home.js` | Provides the currency converter page with historical charting. |
| `src/Exchange.js` | Lists exchange rates for a selected base currency and renders a chart. |
| `src/ChartComponent.js` | Memoized Chart.js wrapper used by both pages. |
| `src/utils.js` | Fetches and caches the list of supported currencies. |
| `public/index.html` | Contains document metadata and the Smart Exchange title. |

Review these files before modifying business logic or UI flows.

## Step 3: Configure Runtime Settings

No custom environment variables are required. The application reads live data directly from the Frankfurter API. For enterprise deployments, consider proxying API calls through your domain if you need rate limiting or authentication.

## Step 4: Launch the App

```bash
npm start    # or yarn start
```

- Development server runs on http://localhost:3000.
- The browser auto-refreshes on file edits.
- Check the console for CORS or network errors if API requests fail.

## Step 5: Exercise Core Journeys

1. **Convert a currency pair:**
   - Enter an amount, choose base and target currencies, and click `Convert`.
   - Confirm the converted value renders below the form.
2. **View historical trends:**
   - After conversion, review the 30-day line chart showing the selected pair.
   - Hover over data points to inspect specific dates.
3. **Inspect exchange tables:**
   - Navigate to `Exchange Rates` in the navbar.
   - Pick a base currency from the dropdown and verify the rates table and chart update.
4. **Validate caching:**
   - Switch base currencies, then return to a previously used one.
   - Confirm rates load instantly from localStorage (inspect DevTools > Application > Local Storage).

## Step 6: Optimize and Extend

- Persist frequently accessed endpoints in `localStorage` by reusing the caching pattern in `utils.js` and `Exchange.js`.
- Abstract additional chart types by enhancing `ChartComponent.js` with new datasets or options.
- Add validation to block negative amounts or empty selections in `Home.js`.
- Introduce unit tests with React Testing Library (the project includes a starter test in `src/App.test.js`).

## Deployment Checklist

1. Build the production bundle:
   ```bash
   npm run build    # or yarn build
   ```
2. Deploy the contents of the `build/` directory to Netlify, Vercel, or your static host.
3. Configure your host to serve `index.html` for all routes (SPA fallback) to support React Router deep links.
4. Monitor usage quotas for the Frankfurter API; implement request throttling or caching rules if needed.

## Monitoring & Troubleshooting

- **Network failures:** Inspect browser DevTools for requests to `https://api.frankfurter.dev`. A 429 status indicates rate limits; implement a backoff or caching strategy.
- **Stale cache data:** Clear localStorage or version cache keys (for example, prefix with a hash) when deploying significant updates.
- **Chart rendering issues:** Ensure Chart.js components remain registered in `ChartComponent.js`; avoid lazy-loading Chart.js without updating registration logic.

## Suggested Enhancements

- Add currency flag icons or display names for improved readability.
- Enable user-defined historical ranges (7, 30, 90 days) by adjusting the query window in `fetchHistoricalRates`.
- Provide downloadable CSV exports for rate tables using the cached data.
- Introduce service worker caching via Workbox to deliver offline rate tables.

## FAQ

#### Do I need an API key?
The Frankfurter API used here is open and does not require authentication.

#### How do I change the default currencies?
Update the initial state in `Home.js` and `Exchange.js` (`baseCurrency`, `targetCurrency`).

#### Why do I see "Failed to fetch" errors?
Check your network connection, verify the API domain is reachable, and confirm you are not being blocked by corporate firewalls.

#### Can I switch to another charting library?
Yes. Replace `ChartComponent.js` with your preferred library, but keep the data format consistent (`labels`, `data`).

#### How do I reset cached currencies?
Clear the `currencies_cache` and any `rates_*` entries from localStorage or change the cache key names in `utils.js` and `Exchange.js`.
