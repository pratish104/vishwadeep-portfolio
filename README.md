# Vishwadeep Pratap — Portfolio

React + TypeScript + Vite + Tailwind CSS portfolio generated from the supplied Astra implementation.

## Requirements
Node.js 20.19+ or Node.js 22+

## Run
```bash
npm install
npm run dev
```

## Checks
```bash
npm run typecheck
npm run build
npx playwright install chromium
npm run test:e2e
```

## Personalize
- `src/data/site.ts` — email, GitHub, LinkedIn, resume path, skills and journey
- `src/data/projects.ts` — project links, descriptions, technologies and case studies
- `src/styles.css` — colors and typography
- `index.html` — SEO/Open Graph metadata

The current resume is included at `public/Vishwadeep_Pratap_Resume.pdf`.

For a real DigiPath screenshot, place an optimized image at:
`public/projects/digipath.webp`
and add the `image` object described in Astra's instructions.


## Project previews
The portfolio uses self-contained HTML/CSS previews for projects that are still under development. They open inside the project case-study dialog and are intentionally labeled as previews rather than live demos. Add a project-specific GitHub URL only after the repository is public and verified; add a live demo URL only after the project is deployed.
