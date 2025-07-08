import type { Metadata } from 'next'
import { Geist_Mono, Poppins } from 'next/font/google'

import SignUpPage from './auth/signup/page'
import ThemeProvider from './theme-provider'

import { AppSidebar } from '@/components/app-sidebar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { authClient } from '@/lib/auth-client'

import './globals.css'

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
})

const poppins = Poppins({
	variable: '--font-poppins',
	subsets: ['latin'],
	weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
	title: 'Noma',
	description: 'Noma est un outil de gestion de projet.',
}

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	const session = await authClient.getSession()

	return (
		<html lang="fr" suppressHydrationWarning>
			<body className={`${poppins.variable} ${geistMono.variable} antialiased`}>
				<ThemeProvider>
					{session?.data?.user ? (
						<SidebarProvider>
							<AppSidebar />
							<main>
								<SidebarTrigger />
								{children}
							</main>
						</SidebarProvider>
					) : (
						<SignUpPage />
					)}
				</ThemeProvider>
			</body>
		</html>
	)
}
