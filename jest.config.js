module.exports = {
  testEnvironment: 'jsdom',
  testRegex: '/test/.*\\.(test|spec)?\\.(ts|tsx)$',
  moduleFileExtensions: ['js', 'ts', 'tsx', 'json', 'gql', 'graphql'],
  maxWorkers: 2,
  modulePaths: ['<rootDir>/src'],
  setupFiles: ['dotenv/config'],
  transform: {
    '^.+\\.(j|t)sx?$': ['ts-jest'],
    '\\.(gql|graphql)$': ['@jagi/jest-transform-graphql'],
  },
};
