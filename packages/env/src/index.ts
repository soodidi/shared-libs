import { z } from 'zod';

/** Levée quand la configuration est invalide. Le message liste chaque variable fautive. */
export class EnvValidationError extends Error {
  override readonly name = 'EnvValidationError';
  readonly issues: readonly z.core.$ZodIssue[];

  constructor(label: string, issues: readonly z.core.$ZodIssue[]) {
    const lines = issues.map(
      (issue) => `  - ${issue.path.join('.') || '(racine)'} : ${issue.message}`,
    );
    super(`${label} invalide :\n${lines.join('\n')}`);
    this.issues = issues;
  }
}

type ParseEnvOptions = {
  /** Nom affiché dans le message d'erreur, ex. « Configuration de l'API ». */
  label?: string;
};

/**
 * Valide une source de configuration (`process.env`, `import.meta.env`…) et renvoie un objet typé.
 * À appeler une seule fois, au démarrage : l'app refuse de démarrer si la config est invalide (GLB-005).
 */
export function parseEnv<TSchema extends z.ZodType>(
  schema: TSchema,
  source: unknown,
  { label = 'Configuration' }: ParseEnvOptions = {},
): z.output<TSchema> {
  const result = schema.safeParse(source);
  if (!result.success) {
    throw new EnvValidationError(label, result.error.issues);
  }
  return result.data;
}

/**
 * Booléen lu depuis une variable d'environnement : `"true"`, `"1"` → true ; `"false"`, `"0"`, vide → false.
 * (`z.coerce.boolean()` considère `"false"` comme vrai.)
 */
export const envBoolean = z
  .enum(['true', 'false', '1', '0', ''])
  .transform((value) => value === 'true' || value === '1');
