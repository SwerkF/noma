# Noma - Configuration Globale ESLint et Prettier

Ce monorepo utilise une configuration globale pour ESLint et Prettier qui s'applique à tous les packages et applications.

## Configuration

### ESLint

La configuration ESLint globale se trouve dans `eslint.config.mjs` à la racine du projet. Elle inclut :

- **Règles TypeScript** : Utilise `@typescript-eslint` pour les fichiers `.ts` et `.tsx`
- **Règles React** : Configuration spécifique pour les fichiers React dans `apps/web/`
- **Règles d'import** : Organisation automatique des imports avec `eslint-plugin-import`
- **Environnements** : Configuration des globales pour Node.js et navigateur selon le contexte

### Prettier

La configuration Prettier globale se trouve dans `.prettierrc` à la racine du projet. Elle utilise :

- **Tabs** : Utilise des tabs au lieu d'espaces (conforme aux règles du workspace)
- **Pas de point-virgules** : `semi: false`
- **Guillemets simples** : `singleQuote: true`
- **Plugin d'organisation des imports** : `prettier-plugin-organize-imports`

## Scripts Disponibles

### Scripts de Linting

```bash
# Vérifier les erreurs ESLint sans les corriger
pnpm run lint:check

# Corriger automatiquement les erreurs ESLint
pnpm run lint
```

### Scripts de Formatage

```bash
# Vérifier le formatage Prettier sans le corriger
pnpm run format:check

# Corriger automatiquement le formatage Prettier
pnpm run format
```

### Scripts Combinés

```bash
# Vérifier à la fois ESLint et Prettier
pnpm run check-all

# Corriger à la fois Prettier et ESLint
pnpm run fix-all
```

## Intégration avec Git

Le projet utilise Husky et lint-staged pour exécuter automatiquement les vérifications sur les fichiers modifiés :

- **Pre-commit** : Exécute Prettier et ESLint sur les fichiers modifiés
- **Configuration** : Voir `.lintstagedrc` pour les détails

## Structure des Règles

### Règles ESLint Principales

- `@typescript-eslint/no-unused-vars` : Erreur pour les variables non utilisées
- `@typescript-eslint/no-explicit-any` : Avertissement pour l'utilisation d'`any`
- `import/order` : Organisation automatique des imports
- `no-console` : Avertissement pour les `console.log`
- `prefer-const` : Préférer `const` à `let` quand possible

### Fichiers Ignorés

La configuration ignore automatiquement :

- `node_modules/`
- `.next/`
- `dist/` et `build/`
- Fichiers générés dans `apps/web/src/generated/`
- Fichiers de configuration spécifiques (next.config.ts, etc.)

## Utilisation dans les Éditeurs

### VS Code

Ajoutez cette configuration à votre `.vscode/settings.json` :

```json
{
	"editor.formatOnSave": true,
	"editor.codeActionsOnSave": {
		"source.fixAll.eslint": true,
		"source.organizeImports": true
	},
	"eslint.workingDirectories": ["apps/web"],
	"prettier.configPath": ".prettierrc"
}
```

### Configuration Spécifique par Package

Chaque package peut étendre la configuration globale en créant son propre `eslint.config.mjs` qui importe la configuration racine :

```javascript
import globalConfig from '../../eslint.config.mjs'

export default [
	...globalConfig,
	// Règles spécifiques au package
]
```

## Dépendances

Les dépendances ESLint et Prettier sont installées au niveau racine pour être partagées par tous les packages :

- `eslint` + plugins TypeScript et React
- `prettier` + plugin d'organisation des imports
- `lint-staged` et `husky` pour l'intégration Git

## Mise à Jour

Pour mettre à jour les règles de linting/formatage :

1. Modifiez `eslint.config.mjs` pour ESLint
2. Modifiez `.prettierrc` pour Prettier
3. Testez avec `pnpm run check-all`
4. Appliquez les corrections avec `pnpm run fix-all`
