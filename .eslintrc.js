module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    // Disable or adjust specific rules here
    'prefer-template': 0,
    'react/no-children-prop': 0,
    'linebreak-style': 0,
    'react/jsx-one-expression-per-line': 0, // Disable "one expression per line" rule
    'jsx-quotes': 0, // Disable quotes rule for JSX
    'react/self-closing-comp': 0, // Disable self-closing component rule
    'react/button-has-type': 0, // Disable button type requirement rule
    'react/no-array-index-key': 0, // Disable array index key rule
    'jsx-a11y/control-has-associated-label': 0, // Disable label association rule
    'comma-dangle': 0, // Disable trailing comma rule
  },
};