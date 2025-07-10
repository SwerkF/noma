'use client';

import {
	Building2,
	ChevronUp,
	Folder,
	HelpCircle,
	LayoutDashboard,
	ListTodo,
	LogOut,
	Monitor,
	Moon,
	Settings,
	Sun,
	Ticket,
	User,
} from 'lucide-react';
import { useTheme } from 'next-themes';
import { useState } from 'react';

import { LanguageSwitcher } from '@/components/language-switcher';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '@/components/ui/sidebar';
import { useTranslations } from '@/hooks/use-translations';

/**
 * Composant pour basculer entre les thèmes avec traductions
 * @returns {JSX.Element} Bouton de bascule de thème
 */
function ThemeToggle() {
	const { theme, setTheme } = useTheme();
	const { dict } = useTranslations();

	if (!dict) return null;

	/**
	 * Bascule entre les thèmes disponibles
	 */
	const toggleTheme = () => {
		if (theme === 'light') {
			setTheme('dark');
		} else if (theme === 'dark') {
			setTheme('system');
		} else {
			setTheme('light');
		}
	};

	/**
	 * Obtient l'icône appropriée selon le thème actuel
	 * @returns {JSX.Element} Icône du thème
	 */
	const getThemeIcon = () => {
		switch (theme) {
			case 'light':
				return <Sun className="h-4 w-4" />;
			case 'dark':
				return <Moon className="h-4 w-4" />;
			default:
				return <Monitor className="h-4 w-4" />;
		}
	};

	/**
	 * Obtient le libellé du thème actuel
	 * @returns {string} Libellé du thème
	 */
	const getThemeLabel = () => {
		switch (theme) {
			case 'light':
				return dict.theme.light;
			case 'dark':
				return dict.theme.dark;
			default:
				return dict.theme.system;
		}
	};

	return (
		<SidebarMenuItem>
			<SidebarMenuButton
				onClick={toggleTheme}
				tooltip={`${dict.theme.theme}: ${getThemeLabel()}`}
			>
				{getThemeIcon()}
				<span>
					{dict.theme.theme}: {getThemeLabel()}
				</span>
			</SidebarMenuButton>
		</SidebarMenuItem>
	);
}

/**
 * Composant principal de la sidebar de l'application avec traductions
 * @returns {JSX.Element} Composant sidebar avec navigation, sélecteur workspace et menu utilisateur
 */
export function AppSidebar() {
	const [selectedWorkspace, setSelectedWorkspace] = useState('1');
	const { dict, lang } = useTranslations();

	// Afficher un skeleton pendant le chargement
	if (!dict) {
		return (
			<Sidebar collapsible="icon">
				<div className="animate-pulse p-4">
					<div className="mb-4 h-4 rounded bg-gray-200"></div>
					<div className="mb-2 h-8 rounded bg-gray-200"></div>
					<div className="mb-2 h-8 rounded bg-gray-200"></div>
					<div className="h-8 rounded bg-gray-200"></div>
				</div>
			</Sidebar>
		);
	}

	/**
	 * Éléments de navigation principaux traduits
	 */
	const navigationItems = [
		{
			title: dict.navigation.dashboard,
			icon: LayoutDashboard,
			href: `/${lang}/dashboard`,
		},
		{
			title: dict.navigation.projects,
			icon: Folder,
			href: `/${lang}/projects`,
		},
		{
			title: dict.navigation.tasks,
			icon: ListTodo,
			href: `/${lang}/tasks`,
		},
		{
			title: dict.navigation.tickets,
			icon: Ticket,
			href: `/${lang}/tickets`,
		},
	];

	/**
	 * Workspaces traduits
	 */
	const workspaces = [
		{
			id: '1',
			name: dict.sidebar.personalWorkspace,
			description: dict.sidebar.personalWorkspace,
		},
		{
			id: '2',
			name: dict.sidebar.designTeam,
			description: dict.sidebar.creativeProjects,
		},
		{
			id: '3',
			name: dict.sidebar.development,
			description: dict.sidebar.technicalProjects,
		},
	];

	const handleLogout = () => {
		// Logique de déconnexion
	};

	const handleSettings = () => {
		// Navigation vers les paramètres
	};

	const handleHelp = () => {
		// Navigation vers l'aide
	};

	return (
		<Sidebar collapsible="icon">
			<SidebarHeader>
				<SidebarGroup>
					<SidebarGroupLabel>{dict.navigation.workspace}</SidebarGroupLabel>
					<SidebarGroupContent>
						<Select
							value={selectedWorkspace}
							onValueChange={setSelectedWorkspace}
						>
							<SelectTrigger className="w-full">
								<div className="flex items-center gap-2">
									<Building2 className="h-4 w-4" />
									<SelectValue placeholder={dict.sidebar.selectWorkspace} />
								</div>
							</SelectTrigger>
							<SelectContent>
								{workspaces.map((workspace) => (
									<SelectItem key={workspace.id} value={workspace.id}>
										<div className="flex flex-col items-start">
											<span className="font-medium">{workspace.name}</span>
											<span className="text-muted-foreground text-xs">
												{workspace.description}
											</span>
										</div>
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarHeader>

			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>{dict.navigation.dashboard}</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{navigationItems.map((item) => (
								<SidebarMenuItem key={item.href}>
									<SidebarMenuButton asChild>
										<a href={item.href}>
											<item.icon className="h-4 w-4" />
											<span>{item.title}</span>
										</a>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>

				<SidebarGroup>
					<SidebarGroupLabel>{dict.navigation.preferences}</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							<ThemeToggle />
							<SidebarMenuItem>
								<LanguageSwitcher currentLang={lang} />
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>

			<SidebarFooter>
				<SidebarMenu>
					<SidebarMenuItem>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<SidebarMenuButton
									size="lg"
									className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
								>
									<Avatar className="h-8 w-8 rounded-lg">
										<AvatarImage
											src="/avatars/user.jpg"
											alt={dict.sidebar.userAvatar}
										/>
										<AvatarFallback className="rounded-lg">JD</AvatarFallback>
									</Avatar>
									<div className="grid flex-1 text-left text-sm leading-tight">
										<span className="truncate font-semibold">John Doe</span>
										<span className="truncate text-xs">
											john.doe@example.com
										</span>
									</div>
									<ChevronUp className="ml-auto size-4" />
								</SidebarMenuButton>
							</DropdownMenuTrigger>
							<DropdownMenuContent
								className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
								side="bottom"
								align="end"
								sideOffset={4}
							>
								<DropdownMenuLabel className="p-0 font-normal">
									<div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
										<Avatar className="h-8 w-8 rounded-lg">
											<AvatarImage
												src="/avatars/user.jpg"
												alt={dict.sidebar.userAvatar}
											/>
											<AvatarFallback className="rounded-lg">JD</AvatarFallback>
										</Avatar>
										<div className="grid flex-1 text-left text-sm leading-tight">
											<span className="truncate font-semibold">John Doe</span>
											<span className="truncate text-xs">
												john.doe@example.com
											</span>
										</div>
									</div>
								</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<DropdownMenuItem onClick={() => {}}>
									<User className="mr-2 h-4 w-4" />
									<span>{dict.navigation.profile}</span>
								</DropdownMenuItem>
								<DropdownMenuItem onClick={handleSettings}>
									<Settings className="mr-2 h-4 w-4" />
									<span>{dict.navigation.settings}</span>
								</DropdownMenuItem>
								<DropdownMenuItem onClick={handleHelp}>
									<HelpCircle className="mr-2 h-4 w-4" />
									<span>{dict.navigation.help}</span>
								</DropdownMenuItem>
								<DropdownMenuSeparator />
								<DropdownMenuItem onClick={handleLogout}>
									<LogOut className="mr-2 h-4 w-4" />
									<span>{dict.navigation.logout}</span>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
		</Sidebar>
	);
}
