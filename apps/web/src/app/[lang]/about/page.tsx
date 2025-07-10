import { getDictionary } from '@/lib/dictionaries';
import type { Locale } from '@/middleware';

/**
 * Page À propos avec support i18n
 * @param params - Paramètres contenant la locale
 * @returns JSX de la page À propos
 */
export default async function AboutPage({
	params,
}: {
	params: Promise<{ lang: Locale }>;
}) {
	const { lang } = await params;
	const dict = await getDictionary(lang);

	return (
		<div className="container mx-auto max-w-4xl px-4 py-8">
			<h1 className="mb-8 text-4xl font-bold">{dict.about.title}</h1>

			<div className="space-y-8">
				<section>
					<p className="text-lg leading-relaxed text-gray-600 dark:text-gray-400">
						{dict.about.description}
					</p>
				</section>

				<section>
					<h2 className="mb-4 text-2xl font-semibold">Mission</h2>
					<p className="leading-relaxed text-gray-600 dark:text-gray-400">
						{dict.about.mission}
					</p>
				</section>

				<section>
					<h2 className="mb-4 text-2xl font-semibold">Vision</h2>
					<p className="leading-relaxed text-gray-600 dark:text-gray-400">
						{dict.about.vision}
					</p>
				</section>

				<section>
					<h2 className="mb-4 text-2xl font-semibold">
						{dict.home.features.title}
					</h2>
					<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
						<div className="rounded-lg border p-6">
							<h3 className="mb-2 font-semibold">
								{dict.home.features.projectManagement}
							</h3>
							<p className="text-sm text-gray-600 dark:text-gray-400">
								Outils complets pour gérer vos projets de A à Z.
							</p>
						</div>
						<div className="rounded-lg border p-6">
							<h3 className="mb-2 font-semibold">
								{dict.home.features.teamCollaboration}
							</h3>
							<p className="text-sm text-gray-600 dark:text-gray-400">
								Fonctionnalités avancées pour une collaboration fluide.
							</p>
						</div>
						<div className="rounded-lg border p-6">
							<h3 className="mb-2 font-semibold">
								{dict.home.features.taskTracking}
							</h3>
							<p className="text-sm text-gray-600 dark:text-gray-400">
								Suivi détaillé de l'avancement et des performances.
							</p>
						</div>
					</div>
				</section>
			</div>
		</div>
	);
}
