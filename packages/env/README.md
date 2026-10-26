# @soodidi/env

Validation de la configuration au démarrage (GLB-005, BE-005) : l'app refuse de démarrer avec une liste claire des variables manquantes ou invalides.

```ts
import { envBoolean, parseEnv } from '@soodidi/env';
import { z } from 'zod';

export const env = parseEnv(
  z.object({
    PORT: z.coerce.number().int().default(3000),
    DATABASE_URL: z.url(),
    ENABLE_DOCS: envBoolean.default(false),
  }),
  process.env,
  { label: "Configuration de l'API" },
);
```
