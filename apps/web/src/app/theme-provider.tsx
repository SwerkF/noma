'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import type { ThemeProviderProps } from 'next-themes';

/**
 * Composant fournisseur de thème pour l'application
 * Configure le mode sombre par défaut et gère la persistance du thème
 * @param {ThemeProviderProps} props - Propriétés du fournisseur de thème
 * @returns {JSX.Element} Fournisseur de thème configuré
 */
export default function ThemeProvider({
  children,
  ...props
}: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={true}
      disableTransitionOnChange
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
