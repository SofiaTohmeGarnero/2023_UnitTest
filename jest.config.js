/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  setupFilesAfterEnv: ['<rootDir>/jest.setupTest.ts'],
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy',
  },
  transform: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/fileTransformer.js',
  },
  collectCoverageFrom: [
    'src/components/**/*.ts',
    'src/components/**/*.tsx',
    'src/containers/**/*.ts',
    'src/containers/**/*.tsx',
    'src/helpers/*.ts',
    'src/helpers/*.js',
    'src/reducers/*.ts',
    'src/reducers/*.js',
  ],
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 50,
      lines: 50,
      statements: 50,
    },
  },
}
