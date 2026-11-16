# FlowMind architecture

- Frontend: React + TypeScript + Vite + React Flow.
- API: Node.js + Express + Zod validation.
- Workflow service: saves workflow definitions.
- Execution engine: executes only registered node types.
- Development persistence: local JSON file.

## Production roadmap
Replace local JSON persistence with PostgreSQL/Prisma. Add authentication, tenant isolation, encrypted credentials, Redis/BullMQ workers, timeouts, concurrency controls, rate limits, audit logs, and integration tests. Never execute arbitrary user-provided code.
