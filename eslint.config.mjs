import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import importPlugin from 'eslint-plugin-import';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
	baseDirectory: __dirname,
});

/**
 * Configuration ESLint globale pour le monorepo
 * Supporte TypeScript, React, et les bonnes pratiques générales
 */
export default [
	// Ignorer certains fichiers et dossiers
	{
		ignores: [
			'**/node_modules/**',
			'**/dist/**',
			'**/build/**',
			'**/.next/**',
			'**/apps/web/src/generated/**',
			'**/*.min.js',
			'**/*.min.css',
			'**/pnpm-lock.yaml',
			'**/yarn.lock',
			'**/package-lock.json',
			'**/.cache/**',
			'**/.turbo/**',
			'**/.vercel/**',
			'**/coverage/**',
			'**/next-env.d.ts',
			'**/public/**',
			'**/prisma/migrations/**',
		],
	},

	// Configuration de base JavaScript
	js.configs.recommended,

	// Configuration pour tous les fichiers TypeScript
	{
		files: ['**/*.{ts,tsx}'],
		languageOptions: {
			parser: typescriptParser,
			parserOptions: {
				ecmaVersion: 'latest',
				sourceType: 'module',
				ecmaFeatures: {
					jsx: true,
				},
			},
			globals: {
				console: 'readonly',
				process: 'readonly',
				global: 'readonly',
				Buffer: 'readonly',
				__dirname: 'readonly',
				__filename: 'readonly',
				module: 'readonly',
				require: 'readonly',
				exports: 'readonly',
			},
		},
		plugins: {
			'@typescript-eslint': typescriptEslint,
			import: importPlugin,
		},
		rules: {
			// Règles TypeScript
			'@typescript-eslint/no-unused-vars': [
				'error',
				{
					argsIgnorePattern: '^_',
					varsIgnorePattern: '^_',
				},
			],
			'@typescript-eslint/no-explicit-any': 'warn',
			'@typescript-eslint/no-var-requires': 'error',

			// Règles d'import
			'import/order': [
				'error',
				{
					groups: [
						'builtin',
						'external',
						'internal',
						'parent',
						'sibling',
						'index',
					],
					'newlines-between': 'always',
				},
			],

			// Règles générales
			'no-console': 'warn',
			'no-debugger': 'error',
			'no-unused-vars': 'off', // Désactivé en faveur de @typescript-eslint/no-unused-vars
			'prefer-const': 'error',
			'no-var': 'error',
			eqeqeq: ['error', 'always'],
			semi: ['error', 'always'], // Oblige l'utilisation des points-virgules
		},
	},

	// Configuration spécifique pour React (Next.js)
	{
		files: ['apps/web/**/*.{ts,tsx}'],
		languageOptions: {
			parser: typescriptParser,
			parserOptions: {
				ecmaVersion: 'latest',
				sourceType: 'module',
				ecmaFeatures: {
					jsx: true,
				},
			},
			globals: {
				console: 'readonly',
				process: 'readonly',
				global: 'readonly',
				Buffer: 'readonly',
				__dirname: 'readonly',
				__filename: 'readonly',
				module: 'readonly',
				require: 'readonly',
				exports: 'readonly',
				window: 'readonly',
				document: 'readonly',
				navigator: 'readonly',
				localStorage: 'readonly',
				sessionStorage: 'readonly',
				fetch: 'readonly',
				setTimeout: 'readonly',
				clearTimeout: 'readonly',
				setInterval: 'readonly',
				clearInterval: 'readonly',
				requestAnimationFrame: 'readonly',
				cancelAnimationFrame: 'readonly',
				Event: 'readonly',
				KeyboardEvent: 'readonly',
				MouseEvent: 'readonly',
				DocumentFragment: 'readonly',
				React: 'readonly',
			},
		},
		plugins: {
			react,
			'react-hooks': reactHooks,
		},
		rules: {
			// Règles React
			'react/react-in-jsx-scope': 'off', // Pas nécessaire avec Next.js
			'react/prop-types': 'off', // Utilisation de TypeScript
			'react/jsx-uses-react': 'error',
			'react/jsx-uses-vars': 'error',
			'react/jsx-key': 'error',
			'react/no-unescaped-entities': 'error',

			// Règles React Hooks
			'react-hooks/rules-of-hooks': 'error',
			'react-hooks/exhaustive-deps': 'warn',

			// Points-virgules obligatoires
			semi: ['error', 'always'],
		},
		settings: {
			react: {
				version: 'detect',
			},
		},
	},

	// Configuration pour les fichiers JavaScript
	{
		files: ['**/*.{js,jsx}'],
		languageOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module',
			parserOptions: {
				ecmaFeatures: {
					jsx: true,
				},
			},
			globals: {
				console: 'readonly',
				process: 'readonly',
				global: 'readonly',
				Buffer: 'readonly',
				__dirname: 'readonly',
				__filename: 'readonly',
				module: 'readonly',
				require: 'readonly',
				exports: 'readonly',
			},
		},
		plugins: {
			import: importPlugin,
		},
		rules: {
			'no-unused-vars': [
				'error',
				{
					argsIgnorePattern: '^_',
					varsIgnorePattern: '^_',
				},
			],
			'prefer-const': 'error',
			'no-var': 'error',
			eqeqeq: ['error', 'always'],
			semi: ['error', 'always'],
		},
	},

	// Configuration pour les fichiers de configuration
	{
		files: ['**/next.config.{js,ts}', '**/tailwind.config.{js,ts}'],
		languageOptions: {
			globals: {
				console: 'readonly',
				process: 'readonly',
				global: 'readonly',
				Buffer: 'readonly',
				__dirname: 'readonly',
				__filename: 'readonly',
				module: 'readonly',
				require: 'readonly',
				exports: 'readonly',
			},
		},
		rules: {
			'import/order': 'off',
			'@typescript-eslint/no-var-requires': 'off',
			semi: ['error', 'always'],
		},
	},

	// Étendre les configurations compatibles
	...compat.extends('prettier'),
];
