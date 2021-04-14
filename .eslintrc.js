module.exports = {
  extends: [
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'react-app',
    'plugin:jsx-a11y/strict',
  ],
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint', 
    '@emotion',
    'prettier', 
    'jsx-a11y'
  ],
  rules: {
    'prettier/prettier': [1, { trailingComma: 'all', singleQuote: true }],
    'jsx-a11y/href-no-hash': 'off',
  },
};
