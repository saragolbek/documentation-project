---
sidebar_position: 2
---
# LoveLitReviews Quick Start Guide

LoveLitReviews is a romance-focused social review platform. This quick start guide walks you through standing up the stack, authenticating, exercising core journeys, and pushing updates to production.

- **Repository:** [saragolbek/LoveLitReviews](https://github.com/saragolbek/LoveLitReviews)
- **Live Site:** https://lovelitreviews.onrender.com
- **Production API Base:** https://lovelitreviews-backend.onrender.com
- **Tech Stack:** React 18 + Vite, Express.js, PostgreSQL, Google Books API, Bootstrap, Font Awesome

## Prerequisites

- Review the LoveLitReviews README for architectural context and open issues.
- Install Node.js 20+, npm, Git, and PostgreSQL locally.
- Create a Google Cloud project and generate a Google Books API key.
- Ensure you can provision environment variables for both client and server.
- Optional: Set up accounts on Render (front end, back end, managed Postgres) if you intend to deploy.

## Authentication & Access

- The platform uses cookie-based JWT auth. Tokens are issued by the Express API and stored as `httpOnly`, `secure`, `SameSite=none` cookies.
- Plan to operate against one of two environments:
  - **Local:** `http://localhost:5173` client, `http://localhost:5000` API.
  - **Production:** `https://lovelitreviews.onrender.com` client, `https://lovelitreviews-backend.onrender.com` API.
- For development, you can self-register through `/login` once the stack is running; the signup endpoint is open by design.

## Step 1: Inspect the Project Structure

| Path | Purpose |
|------|---------|
| `src/App.jsx` | Defines high-level routes (`/`, `/books/:id`, `/profile/:username`, `/login`). |
| `src/components/Layout.jsx` | Applies auth checks, renders global navigation, executes logout. |
| `src/pages/Home.jsx` | Manages Google Books search, review form, and feed display. |
| `src/pages/Book.jsx` | Combines Google metadata with stored reviews and averages. |
| `src/pages/ProfilePage.jsx` | Displays a user's bookshelf and handles owner-only deletion. |
| `server/index.js` | Express API with auth, book, and review routes plus PostgreSQL integration. |

Review these files before proceeding so you understand how data flows between client and server.

## Step 2: Clone and Install Dependencies

```bash
git clone https://github.com/saragolbek/LoveLitReviews.git
cd LoveLitReviews
npm install
cd server
npm install
```

Return to the repository root after installing server dependencies.

## Step 3: Configure Environment Variables

1. In the project root, create `.env` with at least:
   - `VITE_API_BASE_URL=http://localhost:5000`
   - `VITE_GOOGLE_BOOKS_API_KEY=<your_google_books_key>`
2. In `server/.env`, define:
   - `PORT=5000`
   - `VITE_SECRET_KEY=<jwt_secret_for_signing>`
   - `DATABASE_URL=<postgres_connection_string>` (include SSL options if required)
3. If working toward deployment, add equivalents in Render's dashboard for each service.

## Step 4: Prepare PostgreSQL

1. Start PostgreSQL locally or connect to your managed instance.
2. Create a database (for example `lovelitreviews_dev`).
3. Provision the required tables using SQL similar to:
   ```sql
   CREATE TABLE users (
     username TEXT PRIMARY KEY,
     password TEXT NOT NULL
   );

   CREATE TABLE books (
     id TEXT PRIMARY KEY,
     title TEXT,
     author TEXT,
     thumbnail TEXT,
     description TEXT,
     categories TEXT
   );

   CREATE TABLE reviews (
     id SERIAL PRIMARY KEY,
     book_id TEXT REFERENCES books(id),
     username TEXT REFERENCES users(username),
     title TEXT,
     author TEXT,
     thumbnail TEXT,
     overall_rating INTEGER,
     story_rating INTEGER,
     style_rating INTEGER,
     steam_rating INTEGER,
     comment TEXT
   );
   ```
4. Confirm the connection details match `DATABASE_URL` in `server/.env`.

## Step 5: Launch the Stack

From the repository root run two commands (in separate terminals or with concurrent scripts):

```bash
npm run dev      # starts Vite on http://localhost:5173
npm run server   # starts Express API on http://localhost:5000
```

Open http://localhost:5173 in a browser and verify the landing page loads. Use network tools to confirm API calls reach the local server.

## Step 6: Create Test Data and Exercise Journeys

1. **Register & authenticate:** Navigate to `/login`, switch to the sign-up form, and create a test account. Log in and observe that protected routes render.
2. **Submit a review:** Use the search box on the home page. Select a Google Books result, complete the four rating categories, add a comment, and submit.
3. **Verify persistence:** Refresh the home page and confirm the new review appears with correct star ratings.
4. **Inspect book detail:** Click the book thumbnail to open `/books/:id`; review aggregated averages and description content.
5. **Check profile controls:** Visit `/profile/<your_username>` and delete a review to confirm owner-only access.
6. **Guest validation:** Open an incognito window, browse the feed, and confirm you are redirected to `/login` when attempting to access protected pages.

## Step 7: Prepare for Deployment (Optional)

1. Run `npm run build` to produce the production-ready client in `dist/`.
2. Configure Render (or your host of choice):
   - Front end: static site using `npm install` → `npm run build`, publish directory `dist/`.
   - Back end: web service running `node server/index.js`, with environment variables matching `.env` values.
   - Database: Render managed PostgreSQL or equivalent.
3. Update `VITE_API_BASE_URL` to the production API URL before deploying the front end.
4. After deployment, test the live site: log in, submit and delete a review, review server logs for errors.

## Reference: API Endpoints

- `POST /api/signup` — create user (bcrypt hashing applied server-side).
- `POST /api/login` — authenticate, set JWT and username cookies.
- `POST /api/logout` — clear auth cookies.
- `GET /api/authenticated` — return `{ authenticated, username }` if token is valid.
- `GET /api/reviews` — list all reviews (home feed).
- `POST /api/reviews` — upsert book metadata, insert review (requires auth).
- `DELETE /api/reviews/:id` — delete review authored by current user.
- `GET /api/books/:id` — fetch stored book and associated reviews.
- `GET /api/profile/:username` — fetch reviews for a specific user plus ownership flag.

## Front-End Module Checklist

- Keep layout changes inside `Layout.jsx` to preserve auth gating.
- Reuse `StarRater.jsx` (interactive) and `StarHelper.jsx` (read-only) for consistent rating visuals.
- Place new Sass rules alongside existing files in `src/styles` and import them where needed.
- Follow Bootstrap utility classes for spacing and typography to match existing design.

## Security & Operations

- Rotate `VITE_SECRET_KEY` and clear tokens if a leak is suspected.
- Avoid logging credentials or JWT payloads; rely on HTTP status codes for troubleshooting.
- Monitor Render logs for authentication failures, database errors, or CORS mismatches.
- Back up the PostgreSQL database; include `users`, `books`, and `reviews` tables in retention policies.
- Known issues: sporadic logout cookie persistence and 401 responses on hard refresh. Investigate cookie attributes and browser policies when reproducing.

## UX & Accessibility Notes

- Maintain label relationships (`htmlFor` ↔ `id`) in forms to support screen readers.
- Provide descriptive `alt` text for new imagery, mirroring the existing book thumbnail pattern.
- Keep keyboard navigation intact; do not remove focus outlines without providing accessible alternatives.

## Suggested Next Enhancements

- Add profile customization (avatars, bios, social links).
- Expose analytics for trending books and active reviewers.
- Improve session resilience by handling logout edge cases and refresh flows.
- Plan moderation features to manage inappropriate or spam reviews.

## FAQ

#### How do I reset a password during development?
Hash the new password with `bcrypt.hash(<password>, 10)` and update the `users` table directly, then log in through the UI.

#### Why am I seeing 401 errors after a page refresh?
Cookies may be blocked. Ensure you are serving over HTTPS (for secure cookies) or temporarily disable the `secure` flag when testing locally.

#### Can I switch to another database engine?
Not without refactoring queries; the current implementation relies on PostgreSQL features and the `pg` client.

#### What is the fastest way to seed demo content?
Create a test user via the UI, submit several reviews, then duplicate entries in the `reviews` table or export/import using SQL scripts.

#### How do I enable HTTPS locally?
Use a self-signed certificate with tools like `vite-plugin-mkcert` for the client and a reverse proxy (for example, `ngrok`) to tunnel requests to the Express server.
