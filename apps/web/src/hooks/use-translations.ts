'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import type { Dictionary } from '@/lib/dictionaries';
import type { Locale } from '@/middleware';

/**
 * Type récursif pour naviguer dans les propriétés imbriquées du dictionnaire
 */
type NestedRecord = {
	[key: string]: string | NestedRecord;
};

/**
 * Hook personnalisé pour utiliser les traductions côté client
 * @returns Object contenant les traductions, l'état de chargement et la langue
 */
export function useTranslations() {
	const params = useParams();
	const lang = params.lang as Locale;
	const [dict, setDict] = useState<Dictionary | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		/**
		 * Charge les traductions de manière asynchrone
		 */
		const loadTranslations = async () => {
			try {
				setIsLoading(true);
				setError(null);
				const translations = await import(`@/dictionaries/${lang}.json`);
				setDict(translations.default);
			} catch (err) {
				setError(`Erreur lors du chargement des traductions: ${err}`);
			} finally {
				setIsLoading(false);
			}
		};

		if (lang) {
			loadTranslations();
		}
	}, [lang]);

	/**
	 * Fonction utilitaire pour obtenir une traduction par chemin
	 * @param path - Chemin vers la traduction (ex: 'common.loading')
	 * @returns La traduction ou la clé si non trouvée
	 */
	const t = (path: string): string => {
		if (!dict) return path;

		const keys = path.split('.');
		let result: NestedRecord = dict;

		for (const key of keys) {
			if (result && typeof result === 'object' && key in result) {
				result = result[key] as NestedRecord;
			} else {
				return path; // Retourner la clé si la traduction n'est pas trouvée
			}
		}

		return typeof result === 'string' ? result : path;
	};

	return { dict, isLoading, error, lang, t };
}
