// eslint-disable-next-line no-undef
module.exports = {
	env: { browser: true, es2020: true },
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:react-hooks/recommended',
		'plugin:react/recommended'
	],
	settings: {
		react: {
			version: 'detect'
		}
	},
	parser: '@typescript-eslint/parser',
	parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
	plugins: ['react', '@typescript-eslint', 'prettier', 'vitest', 'react-refresh'],
	rules: {
		'react-refresh/only-export-components': 'warn',
		'react/react-in-jsx-scope': 'off',
		'@typescript-eslint/no-empty-interface': 'warn',
		'@typescript-eslint/no-unused-vars': 'warn',
		'prettier/prettier': 'warn',
		'@typescript-eslint/no-empty-function': 'warn',
		'no-empty-pattern': 'warn',
		'no-mixed-spaces-and-tabs': 'warn',
		'react-hooks/rules-of-hooks': 'error',
		'react-hooks/exhaustive-deps': 'error'
	}
};
