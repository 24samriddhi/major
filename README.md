# DocIT — Front-end Prototype

A demo-first Next.js + React front-end for an AI-powered parent care system. Minimal white space, clear headings, simple forms, Vitals Vault, medical document upload and healthcare booking — with a colourful, icon-driven, light/dark UI.

## What works now

- Clerk sign-in / sign-up (landing page)
- Protected dashboard, profile, vitals, documents and booking routes
- Light / dark mode toggle (persisted in localStorage)
- Responsive top bar + sidebar navigation, with a mobile tab bar
- User profile form with elderly-specific caregiver details
- Vitals entry + local browser history table
- PDF/JPG/PNG file picker with filename list (no OCR yet)
- Healthcare booking confirmation
- LocalStorage demo persistence so the investor/client demo feels live

## 1) Set up the project

Node.js 20.9+ is recommended by the current Clerk Next.js docs.

```bash
npm create next-app@latest docit -- --ts --app --eslint
```

Then copy every file from this project into the generated folder (overwrite `app/`, add `components/`, `middleware.ts`, etc.), or just use this folder as-is and run `npm install` inside it.

## 2) Install dependencies

```bash
npm install
```

This project uses `@clerk/nextjs`, `next`, `react`, `react-dom`, and `lucide-react`.

## 3) Configure Clerk

```bash
npx -y clerk@latest init
```

This can create `.env.local` and wire Clerk into the app automatically. Keep `CLERK_SECRET_KEY` server-side and never commit `.env.local`.

Or add your keys manually — copy `.env.example` to `.env.local`:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
```

## 4) Run

```bash
npm run dev
```

Open http://localhost:3000

## 5) Demo flow

Create account → Dashboard → Profile → Vitals Vault → Medical Records → Healthcare Booking → User menu / sign out.

## Project structure

```
app/
  layout.tsx        Root layout (ClerkProvider + globals.css)
  page.tsx           Landing / sign-in page
  globals.css        Full design system (light + dark mode)
  dashboard/page.tsx
  profile/page.tsx
  vitals/page.tsx
  documents/page.tsx
  booking/page.tsx
components/
  AppNav.tsx         Top bar + sidebar + mobile nav + dark mode toggle
middleware.ts         Clerk route protection (must stay named middleware.ts)
```

## Backend later

Keep the same UI and replace LocalStorage with API calls/database. Suggested later stack: Next.js route handlers or a separate Node API + PostgreSQL/Supabase, object storage for documents, then OCR/AI as a second phase.
