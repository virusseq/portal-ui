module.exports = {
  extends: [
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:react-hooks/recommended',
    // 'plugin:jsx-a11y/strict',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', '@emotion', 'prettier', 'jsx-a11y'],
  root: true,
  rules: {
    'no-duplicate-imports': 'warn',
    'prettier/prettier': ['warn', { singleQuote: true, trailingComma: 'all' }],
    'jsx-a11y/href-no-hash': 'off',
    '@emotion/no-vanilla': 'error',
    '@emotion/pkg-renaming': 'error',
    '@emotion/syntax-preference': ['warn', 'string'],
  },
};
