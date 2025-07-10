import { unauthorized } from 'next/navigation';

import PageLayout from '@/components/page-layout';
import { getUser } from '@/lib/auth-server';

export default async function AuthPage() {
	const user = await getUser();

	if (!user) unauthorized();

	return (
		<PageLayout>
			<div className="flex h-screen flex-col items-center justify-center">
				<h1 className="text-2xl font-bold">Auth</h1>
				{user.email}
			</div>
		</PageLayout>
	);
}
