import path from 'path';
import type { Config } from 'jest';
import type { JestConfigWithTsJest } from 'ts-jest';

const isTest = process.env.NODE_ENV === 'test';

// Sync object
const config: JestConfigWithTsJest = {
  extensionsToTreatAsEsm: ['.ts'],
  testEnvironment: 'node',
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  verbose: true,
  testRegex: ['__tests__/.*test.[jt]sx?$'],
  transform: {
    '^.+\\.ts?$': [
      'ts-jest',
      {
        useESM: true,
      },
    ],
  },
};

export default config;
