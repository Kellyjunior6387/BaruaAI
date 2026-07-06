# Barua AI — Testing Guide & Implemented Features

This guide details everything implemented so far for the **Barua** personalized interactive experiences web app and details step-by-step instructions on how to test it.

---

## 1. Implemented Architecture & Features

### 💌 Recipient Experience (14-Screen Animated Journey)
Located under `src/components/recipient/` and `src/app/for/[slug]/`:
- **Themes (`src/lib/recipient/themes.ts`)**: Romantic (rose), Playful (yellow), and Cinematic (dark/gray) style mapping.
- **State Controller (`src/components/recipient/useRecipientState.ts`)**: Custom hook tracking screen indices (0-13) and recipient selections.
- **Screens (`src/components/recipient/screens/`)**: 14 distinct files managing transitions (Framer Motion progress animations, memory grids with signed URLs, delayed CTA action prompts, category filters, and confirmation steps).
- **Server Actions & page routes (`src/app/for/[slug]/`)**: Exposes edge endpoints for server logging of `opened` events, response submissions, and storage image signature resolutions.

### 🔑 Authentication (Magic Link)
Located in root and `src/app/`:
- **Middleware Routing (`middleware.ts`)**: Restricts unauthenticated access to creator routes (`/dashboard` and `/create`) while leaving recipient experience pages (`/for/[slug]`) publicly readable.
- **Login Portal (`src/app/login/page.tsx`)**: Email OTP signIn request form styled with Barua branding, handling errors and success callbacks.
- **Verification Callback (`src/app/auth/callback/route.ts`)**: Exchanges code payloads from verification emails for cookies-stored user sessions, redirecting targets back to creator dashboards.

### 📊 Creator Dashboard
Located under `src/app/dashboard/` and `src/components/dashboard/`:
- **Dashboard Layout (`src/app/dashboard/layout.tsx`)**: Exposes navigation shell headers containing "+ New Barua" shortcuts and user sign-out menus.
- **Listings Page (`src/app/dashboard/page.tsx`)**: Queries experiences, responses, and opens metrics in a single database roundtrip, grouping them as list cards with status badges ("Waiting" or "Responded!").
- **Detail View (`src/app/dashboard/[id]/page.tsx`)**: Interactive share widget (clipboard copies, custom WhatsApp link templates) and danger zone delete links.
- **Relative Time Helper (`src/lib/utils/relativeTime.ts`)**: Pure date-math logic displaying relative periods (e.g. "just now", "3 days ago") without heavy external library dependencies.

---

## 2. How to Test the Flow

Follow these instructions to validate the application locally:

### Step A: Set up Environment Variables
Ensure you have a `.env.local` file at the root of the project with your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Step B: Run the Development Server
Propose running the server if not already running:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your web browser.

### Step C: Test Authentication Redirect
1. Navigate directly to `http://localhost:3000/dashboard` or `http://localhost:3000/create`.
2. The middleware will detect you have no active session and immediately redirect you to the login page: `http://localhost:3000/login?redirect=%2Fdashboard`.

### Step D: Sign In (Magic Link)
1. Enter your email address and click **Send magic link**.
2. If using local Supabase Inbucket (or your email provider):
   - Access the email inbox.
   - Click the verification link.
3. The browser will handle `/auth/callback`, establish your auth cookies, and redirect you to `/dashboard` (or the creator wizard `/create` if you came from there).
4. Verify the top-right header displays your email, and clicking it shows the **Sign out** menu.

### Step E: Create a Barua
1. Click **+ New Barua** in the dashboard.
2. Complete the 7-step creation wizard (Basics, Theme, Story Beats, Memories, Ask line, proposed Date Options, and a Closing message).
3. Upon finishing, click **Seal & Send**.
4. You will be redirected to the success screen showing a preview link: `barua.app/for/your-recipient-xyz`.

### Step F: Test the Recipient Experience (Incognito Mode)
1. Copy the generated link (e.g., `http://localhost:3000/for/recipient-xyz`).
2. Open a new **Incognito Browser Window** (to ensure you are seen as an unauthenticated recipient, not the creator).
3. Paste the URL and hit Enter.
4. Go through the 14-screen interactive path:
   - Walk through the progressive story reveal.
   - View shared memory cards.
   - Read the handwriting reflection note.
   - See the tension statement sequence.
   - Say **Yes, I'd love that** at the emotional peak ask screen.
   - Choose a Date Category (e.g., Food & Drinks), pick an Activity (e.g., Coffee Date), and pick a Proposed Date.
   - Click **Confirm & send**.
5. Once confirmed, you will see the animated checkmark "Sent. 💌" success screen.

### Step G: Track Responses on the Dashboard
1. Go back to your authenticated browser window at `http://localhost:3000/dashboard`.
2. The card status badge for this recipient will change from **Waiting** (gray) to **Responded! 💌** (pink).
3. The open stats tracker will show the number of times they viewed it.
4. Click the card to open the detail view:
   - Verify the celebratory card details: shows their exact selected activity, date choice, and response time (e.g. "Responded 2 minutes ago").
5. Scroll to the bottom and test the deletion flow:
   - Click **Delete this Barua**.
   - Confirm the browser dialog prompt.
   - Verify the item is removed and you are redirected to the dashboard.
