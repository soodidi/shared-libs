import { z } from 'zod';

/** Content-Type des réponses d'erreur (RFC 9457). */
export const PROBLEM_JSON_CONTENT_TYPE = 'application/problem+json';

/** Erreur sur un champ précis, renvoyée avec les erreurs de validation (BE-004, FE-006). */
export const fieldErrorSchema = z.object({
  field: z.string(),
  code: z.string(),
  message: z.string().optional(),
});

/**
 * Problem Details (RFC 9457) + extensions `errors` et `traceId` (BE-004).
 * Les membres inconnus sont conservés : la RFC autorise les extensions.
 */
export const problemDetailsSchema = z.looseObject({
  type: z.string().default('about:blank'),
  title: z.string(),
  status: z.number().int().min(400).max(599),
  detail: z.string().optional(),
  instance: z.string().optional(),
  errors: z.array(fieldErrorSchema).optional(),
  traceId: z.string().optional(),
});

export type FieldError = z.infer<typeof fieldErrorSchema>;
export type ProblemDetails = z.infer<typeof problemDetailsSchema>;

/** Données acceptées par `createProblem` : seul `status` est obligatoire. */
export type CreateProblemInput = {
  status: number;
  title?: string;
  type?: string;
  detail?: string;
  instance?: string;
  errors?: FieldError[];
  traceId?: string;
  /** Membres d'extension (RFC 9457 §3.2). */
  [extension: string]: unknown;
};

const DEFAULT_TITLES: Readonly<Partial<Record<number, string>>> = {
  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not Found',
  409: 'Conflict',
  422: 'Unprocessable Content',
  429: 'Too Many Requests',
  500: 'Internal Server Error',
  503: 'Service Unavailable',
};

/** Construit un Problem Details valide (côté serveur). Le titre par défaut dépend du statut. */
export function createProblem(input: CreateProblemInput): ProblemDetails {
  return problemDetailsSchema.parse({
    ...input,
    title: input.title ?? DEFAULT_TITLES[input.status] ?? 'Error',
  });
}

/** Lit un corps de réponse inconnu : renvoie le Problem Details, ou `null` s'il n'en est pas un. */
export function parseProblemDetails(body: unknown): ProblemDetails | null {
  const result = problemDetailsSchema.safeParse(body);
  return result.success ? result.data : null;
}

/** Issue au format Standard Schema (Zod, Valibot, ArkType, pipe de validation NestJS). */
export type StandardIssue = {
  readonly message: string;
  readonly path?: readonly (PropertyKey | { readonly key: PropertyKey })[] | undefined;
  readonly code?: string;
};

/**
 * Convertit des issues de validation en erreurs par champ.
 * Le chemin devient une chaîne pointée : `["lines", 0, "price"]` → `"lines.0.price"`.
 */
export function fieldErrorsFromIssues(issues: readonly StandardIssue[]): FieldError[] {
  return issues.map((issue) => ({
    field:
      issue.path
        ?.map((segment) => String(typeof segment === 'object' ? segment.key : segment))
        .join('.') ?? '',
    code: issue.code ?? 'invalid',
    message: issue.message,
  }));
}

/** Erreur levée par les clients HTTP quand l'API renvoie un Problem Details. */
export class ProblemDetailsError extends Error {
  override readonly name = 'ProblemDetailsError';
  readonly problem: ProblemDetails;

  constructor(problem: ProblemDetails) {
    super(problem.detail ?? problem.title);
    this.problem = problem;
  }

  get status(): number {
    return this.problem.status;
  }

  /** Erreurs par champ, prêtes à être mappées sur un formulaire (FE-006). */
  get fieldErrors(): FieldError[] {
    return this.problem.errors ?? [];
  }

  /** Erreur attendue (4xx) : à afficher à l'utilisateur, pas à envoyer à Sentry (FE-009). */
  get isClientError(): boolean {
    return this.status < 500;
  }
}

export function isProblemDetailsError(error: unknown): error is ProblemDetailsError {
  return error instanceof ProblemDetailsError;
}
