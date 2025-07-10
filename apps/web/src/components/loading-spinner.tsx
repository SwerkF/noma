'use client';

import { Loader2 } from 'lucide-react';

import { useTranslations } from '@/hooks/use-translations';

/**
 * Props pour le composant LoadingSpinner
 */
interface LoadingSpinnerProps {
	size?: 'sm' | 'md' | 'lg';
	text?: string;
}

/**
 * Composant de spinner de chargement avec traduction
 * @param size - Taille du spinner
 * @param text - Texte personnalisé ou utilise la traduction par défaut
 * @returns JSX du spinner de chargement
 */
export function LoadingSpinner({ size = 'md', text }: LoadingSpinnerProps) {
	const { t } = useTranslations();

	const sizeClasses = {
		sm: 'h-4 w-4',
		md: 'h-6 w-6',
		lg: 'h-8 w-8',
	};

	return (
		<div className="flex items-center justify-center gap-2">
			<Loader2 className={`${sizeClasses[size]} animate-spin`} />
			<span className="text-muted-foreground text-sm">
				{text || t('common.loading')}
			</span>
		</div>
	);
}
