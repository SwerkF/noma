'use client';

import { Clipboard, DollarSign } from 'lucide-react';
import { toast } from 'sonner';

import PageLayout from '@/components/page-layout';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import Loading from '@/components/ui/loading';
import StatsCard from '@/components/ui/stats-card';

export default function UIPage() {
	const copyToClipboard = (text: string) => {
		toast.success('Copied to clipboard');
		navigator.clipboard.writeText(text);
	};
	return (
		<PageLayout className="justify-start p-16">
			<div className="grid w-full grid-cols-4 gap-4">
				<Card className="col-span-1">
					<CardHeader>
						<CardTitle>Button</CardTitle>
						<CardDescription>
							Button is a component that allows you to create a button.
						</CardDescription>
					</CardHeader>
					<CardContent className="grid grid-cols-4 gap-2">
						<Button
							onClick={() => {
								copyToClipboard('<Button>Button</Button>');
							}}
						>
							Button
						</Button>

						<Button
							variant="secondary"
							onClick={() => {
								copyToClipboard('<Button variant="secondary">Button</Button>');
							}}
						>
							Secondary
						</Button>
						<Button
							variant="outline"
							onClick={() => {
								copyToClipboard('<Button variant="outline">Button</Button>');
							}}
						>
							Outline
						</Button>
						<Button
							variant="ghost"
							onClick={() => {
								copyToClipboard('<Button variant="ghost">Button</Button>');
							}}
						>
							Ghost
						</Button>
						<Button
							variant="link"
							onClick={() => {
								copyToClipboard('<Button variant="link">Button</Button>');
							}}
						>
							Link
						</Button>
						<Button
							variant="destructive"
							onClick={() => {
								copyToClipboard(
									'<Button variant="destructive">Button</Button>'
								);
							}}
						>
							Destructive
						</Button>
						<Button
							variant="accent"
							onClick={() => {
								copyToClipboard('<Button variant="accent">Button</Button>');
							}}
						>
							Accent
						</Button>
						<Button
							isLoading
							onClick={() => {
								copyToClipboard('<Button isLoading>Button</Button>');
							}}
						>
							Loading
						</Button>
					</CardContent>
				</Card>
				<Card className="relative">
					<CardHeader>
						<CardTitle>Loading</CardTitle>
						<CardDescription>
							Loading is a component that allows you to create a loading state.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<Loading />
					</CardContent>
					<div
						className="text-muted-foreground absolute right-2 top-2 cursor-pointer"
						onClick={() => {
							copyToClipboard('<Loading />');
						}}
					>
						<Clipboard size={16} />
					</div>
				</Card>
				<div className="col-span-1 grid grid-cols-1 gap-4">
					<StatsCard
						title="Total Revenue"
						value="100,000"
						previousValue="100,000"
						text="Revenue"
						icon={<DollarSign />}
					/>
					<StatsCard
						title="Total Revenue"
						value="100,000"
						previousValue="100,000"
						text="Revenue"
						icon={<DollarSign />}
					/>
				</div>
			</div>
		</PageLayout>
	);
}
