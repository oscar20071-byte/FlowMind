# FlowMind

FlowMind is a browser-based visual workflow builder. It runs as a static website hosted by **GitHub Pages**. It does not require Render, a Node.js server, or another hosting provider at runtime.

## Live website

After GitHub Pages deployment is enabled: https://oscar20071-byte.github.io/FlowMind/

## Features

- Visual workflow editor powered by React Flow.
- Manual Trigger, Set Value, Condition, and Log nodes.
- Connect nodes by dragging from the right output handle to the left input handle.
- Execute workflows in the browser.
- Save and load workflows using this browser's local storage.
- GitHub Actions builds and deploys the site automatically when changes are pushed to `main`.

## Storage and privacy

Workflows are saved in the current browser using `localStorage`. They are not uploaded to a server and do not automatically synchronize across devices, browsers, or accounts. Clearing browser site data may delete locally saved workflows. Export/backup and cross-device sync are future features.

## Development

The frontend is in `frontend/`. To build it locally, install Node.js 20+ and run:

```bash
npm install
npm run build
```

The old Express backend remains in the repository for reference and its tests, but the GitHub Pages application does not call or require it.
