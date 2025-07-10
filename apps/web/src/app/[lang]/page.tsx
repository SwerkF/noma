import Image from 'next/image';

import { getDictionary } from '@/lib/dictionaries';
import type { Locale } from '@/middleware';

/**
 * Page d'accueil avec support i18n
 * @param params - Paramètres contenant la locale
 * @returns JSX de la page d'accueil
 */
export default async function Home({
	params,
}: {
	params: Promise<{ lang: Locale }>;
}) {
	const { lang } = await params;
	const dict = await getDictionary(lang);

	return (
		<div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
			<main className="row-start-2 flex flex-col items-center gap-[32px] sm:items-start">
				<Image
					className="dark:invert"
					src="/next.svg"
					alt="Next.js logo"
					width={180}
					height={38}
					priority
				/>

				<div className="text-center sm:text-left">
					<h1 className="mb-4 text-4xl font-bold">{dict.home.title}</h1>
					<p className="mb-8 text-lg text-gray-600 dark:text-gray-400">
						{dict.home.subtitle}
					</p>
				</div>

				<div className="grid w-full max-w-4xl grid-cols-1 gap-6 md:grid-cols-3">
					<div className="rounded-lg border p-6">
						<h3 className="mb-2 font-semibold">
							{dict.home.features.projectManagement}
						</h3>
						<p className="text-sm text-gray-600 dark:text-gray-400">
							Gérez vos projets efficacement avec nos outils intuitifs.
						</p>
					</div>
					<div className="rounded-lg border p-6">
						<h3 className="mb-2 font-semibold">
							{dict.home.features.teamCollaboration}
						</h3>
						<p className="text-sm text-gray-600 dark:text-gray-400">
							Collaborez en temps réel avec votre équipe.
						</p>
					</div>
					<div className="rounded-lg border p-6">
						<h3 className="mb-2 font-semibold">
							{dict.home.features.taskTracking}
						</h3>
						<p className="text-sm text-gray-600 dark:text-gray-400">
							Suivez l'avancement de vos tâches et projets.
						</p>
					</div>
				</div>

				<div className="flex flex-col items-center gap-4 sm:flex-row">
					<a
						className="bg-foreground text-background flex h-10 items-center justify-center gap-2 rounded-full border border-solid border-transparent px-4 text-sm font-medium transition-colors hover:bg-[#383838] sm:h-12 sm:w-auto sm:px-5 sm:text-base dark:hover:bg-[#ccc]"
						href={`/${lang}/auth/signup`}
					>
						{dict.home.getStarted}
					</a>
					<a
						className="flex h-10 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-4 text-sm font-medium transition-colors hover:border-transparent hover:bg-[#f2f2f2] sm:h-12 sm:w-auto sm:px-5 sm:text-base dark:border-white/[.145] dark:hover:bg-[#1a1a1a]"
						href={`/${lang}/about`}
					>
						{dict.home.learnMore}
					</a>
				</div>
			</main>
		</div>
	);
}
