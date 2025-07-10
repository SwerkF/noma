import type { Locale } from '@/middleware';

/**
 * Type pour les dictionnaires de traduction
 */
export type Dictionary = {
	common: {
		loading: string;
		error: string;
		success: string;
		cancel: string;
		confirm: string;
		save: string;
		edit: string;
		delete: string;
		search: string;
		back: string;
		next: string;
		previous: string;
		close: string;
	};
	navigation: {
		home: string;
		about: string;
		dashboard: string;
		projects: string;
		settings: string;
		profile: string;
		logout: string;
		tasks: string;
		tickets: string;
		workspace: string;
		preferences: string;
		help: string;
	};
	sidebar: {
		selectWorkspace: string;
		personalWorkspace: string;
		designTeam: string;
		development: string;
		creativeProjects: string;
		technicalProjects: string;
		userAvatar: string;
	};
	theme: {
		light: string;
		dark: string;
		system: string;
		theme: string;
	};
	auth: {
		signin: {
			title: string;
			email: string;
			password: string;
			submit: string;
		};
		signup: {
			title: string;
			name: string;
			email: string;
			password: string;
			submit: string;
		};
		signout: string;
		email: string;
		password: string;
		confirmPassword: string;
		forgotPassword: string;
		rememberMe: string;
		alreadyHaveAccount: string;
		dontHaveAccount: string;
		createAccount: string;
		welcomeBack: string;
		getStarted: string;
	};
	home: {
		title: string;
		subtitle: string;
		getStarted: string;
		learnMore: string;
		features: {
			title: string;
			projectManagement: string;
			teamCollaboration: string;
			taskTracking: string;
		};
	};
	about: {
		title: string;
		description: string;
		mission: string;
		vision: string;
	};
	projects: {
		title: string;
		createProject: string;
		noProjects: string;
		projectName: string;
		projectDescription: string;
		status: string;
		dueDate: string;
		members: string;
		progress: string;
	};
	errors: {
		notFound: string;
		serverError: string;
		unauthorized: string;
		forbidden: string;
		badRequest: string;
		networkError: string;
		validationError: string;
	};
	validation: {
		name: {
			required: string;
			minLength: string;
		};
		email: {
			required: string;
			invalid: string;
		};
		password: {
			required: string;
			minLength: string;
			weak: string;
		};
		confirmPassword: {
			required: string;
			noMatch: string;
		};
		currentPassword: {
			required: string;
		};
	};
};

/**
 * Dictionnaires disponibles pour chaque locale
 */
const dictionaries = {
	fr: () => import('@/dictionaries/fr.json').then((module) => module.default),
	en: () => import('@/dictionaries/en.json').then((module) => module.default),
} as const;

/**
 * Récupère le dictionnaire pour une locale donnée
 * @param locale - La locale pour laquelle récupérer le dictionnaire
 * @returns Promise du dictionnaire
 */
export const getDictionary = async (locale: Locale): Promise<Dictionary> => {
	return dictionaries[locale]();
};

/**
 * Utilitaire pour obtenir une traduction imbriquée
 * @param dict - Le dictionnaire
 * @param path - Le chemin vers la traduction (ex: 'common.loading')
 * @returns La traduction ou undefined si non trouvée
 */
export const getNestedTranslation = (
	dict: Dictionary,
	path: string
): string | undefined => {
	return path.split('.').reduce((obj: any, key: string) => obj?.[key], dict);
};
