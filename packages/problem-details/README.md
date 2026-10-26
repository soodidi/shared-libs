# @soodidi/problem-details

Format d'erreur de l'API (Problem Details, RFC 9457, BE-004), partagé entre le backend et le front.

```ts
// Backend (filtre d'exception)
import { createProblem, fieldErrorsFromIssues } from '@soodidi/problem-details';

createProblem({
  status: 400,
  detail: '2 champs sont invalides',
  errors: fieldErrorsFromIssues(issues),
});

// Front (client HTTP)
import { ProblemDetailsError, parseProblemDetails } from '@soodidi/problem-details';

const problem = parseProblemDetails(await response.json());
if (problem) throw new ProblemDetailsError(problem);

// Formulaire (FE-006)
error.fieldErrors.forEach(({ field, message }) => form.setError(field, { message }));
```

`isClientError` permet de ne pas envoyer les erreurs attendues (4xx) à Sentry (FE-009).
