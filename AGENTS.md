# Instructions pour les assistants IA

Ce repo suit les règles de [engineering-guidelines](https://github.com/soodidi/engineering-guidelines) : lire `AGENTS.md` et `adr/global/README.md` de ce repo avant de coder.

- Monorepo npm workspaces (`packages/*`) ; garder les mêmes versions des outils communs (TypeScript, ESLint, Vitest, Zod) dans tous les packages.
- Tout changement d'un package publié s'accompagne d'un changeset (`npx changeset`).
- Pas de logique métier propre à une app ici (GLB-010).
- `npm run verify` doit passer avant de proposer une PR.
