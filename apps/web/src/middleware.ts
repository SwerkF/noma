import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

/**
 * Configuration des locales supportées
 */
const locales = ['fr', 'en'] as const;
const defaultLocale = 'fr' as const;

export type Locale = (typeof locales)[number];

/**
 * Détermine la locale préférée basée sur les headers de la requête
 * @param request - La requête Next.js
 * @returns La locale préférée
 */
function getLocale(request: NextRequest): Locale {
	// Analyser les headers Accept-Language
	const negotiatorHeaders: Record<string, string> = {};
	request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

	// Obtenir les langues préférées
	const languages = new Negotiator({ headers: negotiatorHeaders }).languages();

	// Matcher avec nos locales supportées
	const locale = match(languages, locales, defaultLocale);

	return locale as Locale;
}

/**
 * Middleware pour gérer l'internationalisation
 * @param request - La requête Next.js
 * @returns Réponse de redirection ou continuation
 */
export function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;

	// Vérifier si le pathname contient déjà une locale supportée
	const pathnameHasLocale = locales.some(
		(locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
	);

	// Si une locale est déjà présente, continuer
	if (pathnameHasLocale) return;

	// Rediriger vers la locale appropriée
	const locale = getLocale(request);
	request.nextUrl.pathname = `/${locale}${pathname}`;

	return NextResponse.redirect(request.nextUrl);
}

export const config = {
	matcher: [
		// Ignorer les fichiers internes Next.js et les ressources statiques
		'/((?!_next|api|favicon.ico|.*\\.).*)',
	],
};
