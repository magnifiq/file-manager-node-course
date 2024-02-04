module.exports = {
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: 'eslint:recommended',
  parserOptions: {
    ecmaVersion: 2021, 
  },
  rules: {
      'no-console': 'off',
      'brace-style': ['error', 'stroustrup', { allowSingleLine: true }],
      'no-restricted-syntax': 'off',
  },
};
