const nextJest = require('next/jest');

const createJestConfig = nextJest({
  
  dir: './',
});

/** @type {import('jest').Config} */
const config = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  preset: 'ts-jest',
  transformIgnorePatterns: [
    'node_modules/(?!(msw)/)', 
  ],
  moduleDirectories: ['node_modules'],
  moduleNameMapper: {
    '^@/services/(.*)$': '<rootDir>/services/$1',
  '^@/utils/(.*)$': '<rootDir>/utils/$1',
  },
};

module.exports = createJestConfig(config);