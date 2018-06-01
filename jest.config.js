module.exports = {
  setupFiles: ['<rootDir>/config/tests-setup.js'],
  transform: { '^.+\\.(jsx|js)?$': '<rootDir>/node_modules/babel-jest' },
  moduleNameMapper: { '^.+\\.(css|scss)$': 'identity-obj-proxy' }
}
