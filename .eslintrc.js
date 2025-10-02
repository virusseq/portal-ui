module.exports = {
	env: {
		browser: true,
		es6: true,
		node: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:react-hooks/recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:import/recommended',
		'plugin:import/typescript',
		'prettier',
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
		jsx: true,
	},
	plugins: ['@typescript-eslint', '@emotion', 'prettier', 'jsx-a11y'],
	root: true,
	rules: {
		'no-duplicate-imports': 'warn',
		'prettier/prettier': [
			'warn',
			{
				printWidth: 120,
				semi: true,
				singleAttributePerLine: true,
				singleQuote: true,
				tabWidth: 4,
				trailingComma: 'all',
				useTabs: true,
			},
		],
		'jsx-a11y/href-no-hash': 'off',
		'import/first': ['warn', 'absolute-first'],
		'import/order': [
			'warn',
			{
				groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
				'newlines-between': 'always',
				warnOnUnassignedImports: true,
			},
		],
		'import/newline-after-import': 'warn',
		'use-isnan': 'warn',
		'@emotion/import-from-emotion': 'error',
		'@emotion/no-vanilla': 'error',
		'@emotion/pkg-renaming': 'error',
		'@emotion/syntax-preference': ['warn', 'string'],
		'@emotion/styled-import': 'error',
		'@typescript-eslint/no-empty-interface': [
			'warn',
			{
				allowSingleExtends: false,
			},
		],
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/no-var-requires': 'off',
	},
	settings: {
		'import/resolver': {
			'babel-module': { allowExistingDirectories: true },
		},
		'import/internal-regex': '^#',
		react: {
			version: 'detect',
		},
	},
};
