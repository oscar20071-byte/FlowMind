# FlowMind

Visual workflow automation platform. Build, connect, save, and execute workflows through a visual node editor.

## MVP stack
- React + TypeScript + Vite
- React Flow
- Node.js + Express + Zod
- Local JSON persistence for development

## Run locally
1. Install Node.js 20+.
2. Run `npm install` at the repository root.
3. Run `npm run dev`.
4. Open http://localhost:5173. API health: http://localhost:4000/api/health.

## Node types
Manual Trigger, Set Value, Condition, and Log.

## Production note
Local JSON storage is for development only. Before production, add PostgreSQL, authentication, authorization, encrypted secrets, durable queues, isolated workers, timeouts, rate limits, and audit logging. Never execute arbitrary user-provided code.

See docs/ARCHITECTURE.md and docs/API.md.
