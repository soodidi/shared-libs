# @soodidi/eslint-config

Configuration ESLint (flat config) des ADR FE-002, FE-004, FE-007, FE-008 et BE-007.

| Fonction | Contenu                                                                                            |
| -------- | -------------------------------------------------------------------------------------------------- |
| `base`   | `@eslint/js` + `typescript-eslint` strict typé, pas d'`enum`, exports nommés, pas de `console.log` |
| `react`  | `base` + React Hooks (règles du React Compiler), jsx-a11y, TanStack Query, Testing Library         |
| `node`   | `base` + globals Node, tolérance pour les classes NestJS décorées                                  |

```js
// eslint.config.js
import { react } from '@soodidi/eslint-config';

export default [{ ignores: ['dist'] }, ...react({ tsconfigRootDir: import.meta.dirname })];
```

> ESLint 10 : `eslint-plugin-jsx-a11y-x` (fork maintenu, compatible ESLint 10) remplace `eslint-plugin-jsx-a11y`, qui ne supporte pas ESLint 10. TypeScript ≤ 6.0 : limite actuelle de `typescript-eslint`.
