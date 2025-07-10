import type { Dictionary } from '@/lib/dictionaries';

/**
 * Traduit un message Zod en utilisant le dictionnaire
 * @param message - Message avec clé de traduction (ex: 'dict.validation.name.required')
 * @param dict - Dictionnaire de traductions
 * @returns Message traduit ou message original si pas de traduction
 */
export function translateZodMessage(message: string, dict: Dictionary): string {
	// Si le message ne commence pas par 'dict.', le retourner tel quel
	if (!message.startsWith('dict.')) {
		return message;
	}

	// Extraire le chemin de traduction (enlever 'dict.')
	const path = message.replace('dict.', '');

	// Naviguer dans le dictionnaire
	const keys = path.split('.');
	let result: any = dict;

	for (const key of keys) {
		if (result && typeof result === 'object' && key in result) {
			result = result[key];
		} else {
			return message; // Retourner le message original si pas trouvé
		}
	}

	return typeof result === 'string' ? result : message;
}
