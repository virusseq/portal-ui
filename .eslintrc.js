module.exports = {
  extends: [
    'plugin:@typescript-eslint/recommended',
    'prettier',
    // 'plugin:jsx-a11y/strict',
  ],
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
    // '@emotion',
    'prettier',
    'jsx-a11y',
  ],
  root: true,
  rules: {
    'prettier/prettier': ['warn', { singleQuote: true, trailingComma: 'all' }],
    'jsx-a11y/href-no-hash': 'off',
  },
};
