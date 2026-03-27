Fortune App — Scaffold

This repository is a starter scaffold for a small paid "fortune" web app.

Structure
- backend/ — Express API that creates Shopify checkouts (or simulates them) and returns fortunes
- frontend/ — Vite + React single-page app that requests a fortune (redirects to Shopify checkout or simulates payment)
- .github/copilot-instructions.md — workspace instructions (generated)

Quick start (developer)
1. Copy environment variables into `backend/.env` from `backend/.env.example`.
2. From `backend/` run `npm install` then `npm run dev`.
3. From `frontend/` run `npm install` then `npm run dev`.

Notes
- Real Shopify store credentials are required to actually charge $1 per fortune. Without them the scaffold runs a simulated purchase flow.
- See `backend/README.md` and `frontend/README.md` for more details.
