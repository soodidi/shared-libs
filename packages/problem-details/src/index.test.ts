import { describe, expect, it } from 'vitest';
import {
  ProblemDetailsError,
  createProblem,
  fieldErrorsFromIssues,
  parseProblemDetails,
} from './index.js';

describe('createProblem', () => {
  it('uses the default title for a known status', () => {
    expect(createProblem({ status: 404 })).toMatchObject({
      type: 'about:blank',
      title: 'Not Found',
      status: 404,
    });
  });

  it('keeps an explicit title and extensions', () => {
    const problem = createProblem({ status: 422, title: 'Invoice already paid', traceId: 'abc' });
    expect(problem.title).toBe('Invoice already paid');
    expect(problem.traceId).toBe('abc');
  });
});

describe('parseProblemDetails', () => {
  it('returns null for a body that is not a problem', () => {
    expect(parseProblemDetails({ message: 'oops' })).toBeNull();
    expect(parseProblemDetails('Internal error')).toBeNull();
  });

  it('keeps unknown extension members', () => {
    const problem = parseProblemDetails({ title: 'Conflict', status: 409, retryAfter: 3 });
    expect(problem).toMatchObject({ status: 409, retryAfter: 3 });
  });
});

describe('fieldErrorsFromIssues', () => {
  it('joins nested paths with dots', () => {
    expect(
      fieldErrorsFromIssues([
        { message: 'Required', path: ['lines', 0, { key: 'price' }], code: 'invalid_type' },
        { message: 'Invalid' },
      ]),
    ).toEqual([
      { field: 'lines.0.price', code: 'invalid_type', message: 'Required' },
      { field: '', code: 'invalid', message: 'Invalid' },
    ]);
  });
});

describe('ProblemDetailsError', () => {
  it('exposes status, field errors and client/server nature', () => {
    const error = new ProblemDetailsError(
      createProblem({ status: 400, errors: [{ field: 'email', code: 'invalid_format' }] }),
    );
    expect(error.status).toBe(400);
    expect(error.isClientError).toBe(true);
    expect(error.fieldErrors).toEqual([{ field: 'email', code: 'invalid_format' }]);
    expect(error.message).toBe('Bad Request');
  });
});
