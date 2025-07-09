import SignupForm from './signup-form';

import PageLayout from '@/components/page-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function SignUpPage() {
	return (
		<PageLayout>
			<Card>
				<CardHeader>
					<CardTitle>Inscription</CardTitle>
				</CardHeader>
				<CardContent>
					<SignupForm />
				</CardContent>
			</Card>
		</PageLayout>
	);
}
