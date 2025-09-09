# EWS PWA

Mobile-first PWA built with React + Vite. The Home page is based on Figma design node 536-81536 from the file AmqqSvBAueyNwzP8YkUe4P.

## Prerequisites
- Node.js 18+ and npm

## Install & Run
```pwsh
# From the workspace root
cd $PSScriptRoot
npm i
npm run dev
```

## Production build
```pwsh
npm run build
npm run preview
```

## Fetch assets from Figma (optional)
Create a Figma Personal Access Token and set it as FIGMA_TOKEN.
```pwsh
Copy-Item .env.example .env
# Edit .env and set FIGMA_TOKEN, or set for current session:
$env:FIGMA_TOKEN = "<your_figma_token>"

# Download a node image into src/assets
powershell -ExecutionPolicy Bypass -File ./scripts/fetch-figma-assets.ps1 -FileKey AmqqSvBAueyNwzP8YkUe4P -NodeIds "536:81536" -OutDir "src/assets"

# To overwrite the Home hero image directly, provide -OutName "hero.png" (works when a single NodeId is supplied)
powershell -ExecutionPolicy Bypass -File ./scripts/fetch-figma-assets.ps1 -FileKey AmqqSvBAueyNwzP8YkUe4P -NodeIds "<NEW_NODE_ID>" -OutDir "src/assets" -OutName "hero.png"

# Node alternative
node ./scripts/fetch-figma-assets.mjs AmqqSvBAueyNwzP8YkUe4P 536:81536 src/assets

# Node: save as hero.png when fetching a single node
node ./scripts/fetch-figma-assets.mjs AmqqSvBAueyNwzP8YkUe4P <NEW_NODE_ID> src/assets hero.png
```

## Project structure
- src/pages/Home.tsx – Home screen
- src/assets – images/assets
- public – PWA manifest and icons

### Updating Home to a new Figma selection
Home uses `src/assets/hero.png` for the main hero. To switch to a different selection:
1) Fetch the new node image from Figma into `src/assets/hero.png` using one of the commands above.
2) Restart dev server if running. The Home page will reflect the new design asset.

## Notes
- Ensure you run npm commands in the repo root that contains package.json.