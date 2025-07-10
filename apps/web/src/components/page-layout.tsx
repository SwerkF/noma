'use client';

import { ReactNode } from 'react';

import Loading from './ui/loading';

import { useTranslations } from '@/hooks/use-translations';
import { cn } from '@/lib/utils';

/**
 * Props pour le composant PageLayout
 */
interface PageLayoutProps {
	children: ReactNode;
	title?: string;
	showTitle?: boolean;
	className?: string;
}

/**
 * Composant de layout de page avec support i18n
 * @param children - Contenu de la page
 * @param title - Titre optionnel de la page
 * @param showTitle - Afficher le titre ou non
 * @param className - Classes CSS additionnelles
 * @returns JSX du layout de page
 */
export default function PageLayout({
	children,
	title,
	showTitle = false,
	className = '',
}: PageLayoutProps) {
	const { isLoading } = useTranslations();

	if (isLoading) {
		return <Loading />;
	}

	return (
		<div
			className={cn(
				'flex h-screen flex-col items-center justify-center',
				className
			)}
		>
			{showTitle && title && (
				<h1 className="mb-6 text-2xl font-bold">{title}</h1>
			)}
			{children}
		</div>
	);
}
