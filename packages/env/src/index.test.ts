import { describe, expect, it } from 'vitest';
import { z } from 'zod';
import { EnvValidationError, envBoolean, parseEnv } from './index.js';

const schema = z.object({
  PORT: z.coerce.number().int().default(3000),
  DATABASE_URL: z.url(),
  ENABLE_DOCS: envBoolean.default(false),
});

describe('parseEnv', () => {
  it('returns typed values with defaults', () => {
    expect(
      parseEnv(schema, { DATABASE_URL: 'postgres://localhost/app', ENABLE_DOCS: 'true' }),
    ).toEqual({
      PORT: 3000,
      DATABASE_URL: 'postgres://localhost/app',
      ENABLE_DOCS: true,
    });
  });

  it('lists every invalid variable', () => {
    expect(() => parseEnv(schema, { PORT: 'abc' }, { label: 'API' })).toThrow(EnvValidationError);
    try {
      parseEnv(schema, { PORT: 'abc' }, { label: 'API' });
    } catch (error) {
      expect((error as EnvValidationError).message).toMatch(/^API invalide :/);
      expect((error as EnvValidationError).issues.map((issue) => issue.path[0])).toEqual([
        'PORT',
        'DATABASE_URL',
      ]);
    }
  });
});

describe('envBoolean', () => {
  it.each([
    ['true', true],
    ['1', true],
    ['false', false],
    ['0', false],
    ['', false],
  ])('parses %j as %s', (input, expected) => {
    expect(envBoolean.parse(input)).toBe(expected);
  });
});
