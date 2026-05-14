# Hintro Dashboard

A pixel-accurate implementation of the Hintro mock dashboard, built with React + Vite.

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).
## Live Demo

🔗 [View Project](https://hintro-dashboard-assignment.vercel.app/)

## Tech Stack

- **React 18** with Vite
- **React Router v6** for routing
- **CSS Modules** with CSS custom properties — zero hardcoded colors, all theming via `:root` variables
- No UI libraries — every component is hand-written

## Project Structure

```
src/
  api/            # Thin fetch wrappers (profile, dashboard, callSessions)
  components/
    layout/       # Sidebar, Topbar, Layout
    dashboard/    # StatCard, RecentCalls
    modals/       # LogoutModal, FeedbackModal, FeedbackHistoryModal
  context/        # UserContext — holds active userId and profile
  hooks/          # useDashboard — fetches stats + sessions together
  pages/          # DashboardPage
  styles/         # globals.css with the full CSS token system
  utils/          # formatDuration, formatDate helpers
```

## Switching Users

A `u1 / u2` toggle is in the top bar. All data re-fetches automatically when you switch.

- **u1** — empty states throughout (no sessions, zeroed stats)
- **u2** — randomized live data from the mock API

## Features

- Stats cards: Total Sessions, Average Duration (seconds → Xm Ysec), AI Used, Last Session (relative time)
- Recent calls grouped by date with three-dot context menus
- Logout flow with confirmation modal
- Feedback form stored in `localStorage` under `hintro_feedback`
- Feedback History reads and displays all stored entries
- Fully responsive — sidebar collapses to a hamburger drawer on mobile
- Loading skeletons while data fetches
- Smooth transitions on all interactive elements

## Assumptions

- No authentication screen — user switching via the toggle is the mock auth mechanism
- `averageDuration` from the API is in seconds; displayed as `Xm Ysec`
- Other sidebar nav items (Call Insights, Knowledge Base, Prompts, Boxy Controls) are navigation stubs — the assignment scope is the Dashboard page only
- Base URL: `https://mock-backend-hintro.vercel.app`
