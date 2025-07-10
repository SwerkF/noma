import PageLayout from '@/components/page-layout';
import { LockIcon } from 'lucide-react';

export default function UnauthorizedPage() {
	return (
		<PageLayout>
			<div className="mx-auto max-w-md text-center">
				<LockIcon className="text-primary mx-auto h-12 w-12" />
				<h1 className="text-foreground mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
					Unauthorized Access
				</h1>
				<p className="text-muted-foreground mt-4">
					You do not have the necessary permissions to access this resource.
					Please contact your administrator for assistance.
				</p>
				<div className="mt-6">
					<img
						src="/placeholder.svg"
						alt="Unauthorized access illustration"
						className="mx-auto"
						width="300"
						height="300"
						style={{ aspectRatio: '300/300', objectFit: 'cover' }}
					/>
				</div>
			</div>
		</PageLayout>
	);
}
