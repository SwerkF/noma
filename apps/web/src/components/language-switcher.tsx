'use client';

import { Globe } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { Locale } from '@/middleware';

/**
 * Langues disponibles avec leurs métadonnées
 */
const languages = {
	fr: {
		name: 'Français',
		flag: '🇫🇷',
	},
	en: {
		name: 'English',
		flag: '🇺🇸',
	},
} as const;

/**
 * Composant de sélection de langue
 * @param currentLang - La langue actuelle
 * @returns JSX du sélecteur de langue
 */
export function LanguageSwitcher({ currentLang }: { currentLang: Locale }) {
	const pathname = usePathname();
	const router = useRouter();

	/**
	 * Change la langue et redirige vers la nouvelle URL
	 * @param newLang - La nouvelle langue sélectionnée
	 */
	const handleLanguageChange = (newLang: Locale) => {
		// Remplacer la langue actuelle dans le pathname
		const newPathname = pathname.replace(`/${currentLang}`, `/${newLang}`);
		router.push(newPathname);
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" size="sm" className="gap-2">
					<Globe className="h-4 w-4" />
					<span className="hidden sm:inline">
						{languages[currentLang].flag} {languages[currentLang].name}
					</span>
					<span className="sm:hidden">{languages[currentLang].flag}</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				{Object.entries(languages).map(([lang, { name, flag }]) => (
					<DropdownMenuItem
						key={lang}
						onClick={() => handleLanguageChange(lang as Locale)}
						className={currentLang === lang ? 'bg-accent' : ''}
					>
						<span className="mr-2">{flag}</span>
						{name}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
