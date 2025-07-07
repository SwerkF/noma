'use client';

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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Folder,
  LayoutDashboard,
  ListTodo,
  Ticket,
  Settings,
  User,
  HelpCircle,
  LogOut,
  ChevronUp,
  Building2,
  Moon,
  Sun,
  Monitor,
} from 'lucide-react';
import { useState } from 'react';
import { useTheme } from 'next-themes';

/**
 * Éléments de navigation principaux de la sidebar
 */
const navigationItems = [
  {
    title: 'Dashboard',
    icon: LayoutDashboard,
    href: '/dashboard',
  },
  {
    title: 'Projets',
    icon: Folder,
    href: '/projects',
  },
  {
    title: 'Tâches',
    icon: ListTodo,
    href: '/tasks',
  },
  {
    title: 'Tickets',
    icon: Ticket,
    href: '/tickets',
  },
];

/**
 * Workspaces disponibles pour l'utilisateur
 */
const workspaces = [
  { id: '1', name: 'Mon Workspace', description: 'Workspace personnel' },
  { id: '2', name: 'Équipe Design', description: 'Projets créatifs' },
  { id: '3', name: 'Développement', description: 'Projets techniques' },
];

/**
 * Composant pour basculer entre les thèmes
 * @returns {JSX.Element} Bouton de bascule de thème
 */
function ThemeToggle() {
  const { theme, setTheme } = useTheme();

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
        return 'Clair';
      case 'dark':
        return 'Sombre';
      default:
        return 'Système';
    }
  };

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        onClick={toggleTheme}
        tooltip={`Thème: ${getThemeLabel()}`}
      >
        {getThemeIcon()}
        <span>Thème: {getThemeLabel()}</span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

/**
 * Composant principal de la sidebar de l'application
 * @returns {JSX.Element} Composant sidebar avec navigation, sélecteur workspace et menu utilisateur
 */
export function AppSidebar() {
  const [selectedWorkspace, setSelectedWorkspace] = useState('1');

  const handleLogout = () => {
    console.log('Déconnexion...');
  };

  const handleSettings = () => {
    console.log('Ouverture des paramètres...');
  };

  const handleHelp = () => {
    console.log("Ouverture de l'assistance...");
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarGroup>
          <SidebarGroupLabel>Workspace</SidebarGroupLabel>
          <SidebarGroupContent>
            <Select
              value={selectedWorkspace}
              onValueChange={setSelectedWorkspace}
            >
              <SelectTrigger className="w-full">
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4" />
                  <SelectValue placeholder="Sélectionner un workspace" />
                </div>
              </SelectTrigger>
              <SelectContent>
                {workspaces.map((workspace) => (
                  <SelectItem key={workspace.id} value={workspace.id}>
                    <div className="flex flex-col items-start">
                      <span className="font-medium">{workspace.name}</span>
                      <span className="text-xs text-muted-foreground">
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
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
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
          <SidebarGroupLabel>Préférences</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <ThemeToggle />
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
                      alt="Avatar utilisateur"
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
                        alt="Avatar utilisateur"
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
                <DropdownMenuItem onClick={() => console.log('Profil')}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profil</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleSettings}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Paramètres</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleHelp}>
                  <HelpCircle className="mr-2 h-4 w-4" />
                  <span>Assistance</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Déconnexion</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
