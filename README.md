# FlowMind

Visual workflow automation platform. Build, connect, save, and execute workflows through a browser-based node editor.

## Deploy to the web (no local terminal)

1. Open [Render Blueprint](https://render.com/deploy) and connect this GitHub repository.
2. Render reads `render.yaml`, builds the frontend, and starts the API and website as one web service.
3. Open the generated `onrender.com` URL. The same URL serves the application and its `/api` endpoints.

The service health endpoint is `/api/health`.

## Stack

- React + TypeScript + Vite + React Flow
- Node.js + Express + Zod
- One hosted web service serves both the frontend and backend.

## Important storage limitation

The current JSON store is a development MVP. On Render's free service, local files are ephemeral and may be lost when the service restarts or redeploys. Do not use this deployment for important workflows until durable hosted database storage and authentication are added.

## Local development

Install Node.js 20+, run `npm install`, then `npm run dev`. The web deployment does not require these local commands.
