import type { Metadata } from 'next';
import { Geist_Mono, Poppins } from 'next/font/google';
import { notFound } from 'next/navigation';
import { Toaster } from 'sonner';

import ThemeProvider from './theme-provider';

import { AppSidebar } from '@/components/app-sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { getDictionary } from '@/lib/dictionaries';
import type { Locale } from '@/middleware';
import './globals.css';

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

const poppins = Poppins({
	variable: '--font-poppins',
	subsets: ['latin'],
	weight: ['400', '500', '600', '700'],
});

/**
 * Génère les paramètres statiques pour les locales supportées
 * @returns Array des paramètres pour chaque locale
 */
export async function generateStaticParams() {
	return [{ lang: 'fr' }, { lang: 'en' }];
}

/**
 * Génère les métadonnées pour chaque locale
 * @param params - Paramètres contenant la locale
 * @returns Métadonnées localisées
 */
export async function generateMetadata({
	params,
}: {
	params: Promise<{ lang: Locale }>;
}): Promise<Metadata> {
	const { lang } = await params;
	const dict = await getDictionary(lang);

	return {
		title: 'Noma',
		description: dict.about.description,
	};
}

/**
 * Layout principal avec support i18n
 * @param children - Composants enfants
 * @param params - Paramètres contenant la locale
 * @returns JSX du layout
 */
export default async function RootLayout({
	children,
	params,
}: Readonly<{
	children: React.ReactNode;
	params: Promise<{ lang: Locale }>;
}>) {
	const { lang } = await params;

	// Vérifier si la locale est supportée
	const supportedLocales = ['fr', 'en'];
	if (!supportedLocales.includes(lang)) {
		notFound();
	}

	//const session = await authClient.getSession();

	return (
		<html lang={lang} suppressHydrationWarning>
			<body className={`${poppins.variable} ${geistMono.variable} antialiased`}>
				<ThemeProvider>
					<SidebarProvider>
						<AppSidebar />
						<main className="w-full">
							<SidebarTrigger />
							{children}
						</main>
					</SidebarProvider>
				</ThemeProvider>
				<Toaster />
			</body>
		</html>
	);
}
