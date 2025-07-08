import { FlatCompat } from '@eslint/eslintrc'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import globalConfig from '../../eslint.config.mjs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
	baseDirectory: __dirname,
})

/**
 * Configuration ESLint spécifique pour l'application web Next.js
 * Étend la configuration globale avec les règles spécifiques à Next.js
 */
const eslintConfig = [
	...globalConfig,
	...compat.extends('next/core-web-vitals', 'next/typescript'),
	{
		files: ['**/*.{ts,tsx}'],
		rules: {
			// Règles spécifiques à Next.js
			'@next/next/no-html-link-for-pages': 'error',
			'@next/next/no-img-element': 'warn',
		},
	},
]

export default eslintConfig
