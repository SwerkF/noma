import SignupForm from './signup-form';

import PageLayout from '@/components/page-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getDictionary } from '@/lib/dictionaries';
import type { Locale } from '@/middleware';

export default async function SignUpPage({
	params,
}: {
	params: Promise<{ lang: Locale }>;
}) {
	const { lang } = await params;
	const dict = await getDictionary(lang);
	return (
		<PageLayout>
			<Card>
				<CardHeader>
					<CardTitle>{dict.auth.signup.title}</CardTitle>
				</CardHeader>
				<CardContent>
					<SignupForm />
				</CardContent>
			</Card>
		</PageLayout>
	);
}
