'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import { useTranslations } from '@/hooks/use-translations';
import { signUp } from '@/lib/auth-client';
import { signupSchema, SignupSchema } from '@/packages/zod/authSchemas';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function SignupForm() {
	const { dict, isLoading, lang } = useTranslations();
	const router = useRouter();

	const form = useForm<SignupSchema>({
		resolver: zodResolver(signupSchema),
		defaultValues: {
			name: '',
			email: '',
			password: '',
		},
	});

	async function onSubmit(values: SignupSchema) {
		await signUp.email(
			{
				email: values.email,
				password: values.password,
				name: values.name,
			},
			{
				onSuccess: () => {
					router.push(`/${lang}/auth`);
				},
				onError: (error) => {
					toast.error(error.error.message);
				},
			}
		);
	}

	if (isLoading) {
		return (
			<div className="flex h-screen items-center justify-center">
				<div className="animate-pulse">
					<div className="mb-4 h-8 w-48 rounded bg-gray-200"></div>
					<div className="h-4 w-32 rounded bg-gray-200"></div>
				</div>
			</div>
		);
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="min-w-sm space-y-8"
			>
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>{dict?.auth.signup.name}</FormLabel>
							<FormControl>
								<Input placeholder={dict?.auth.signup.name} {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>{dict?.auth.signup.email}</FormLabel>
							<FormControl>
								<Input
									type="email"
									placeholder={dict?.auth.signup.email}
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>{dict?.auth.signup.password}</FormLabel>
							<FormControl>
								<Input
									type="password"
									placeholder={dict?.auth.signup.password}
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit" isLoading={isLoading}>
					{dict?.auth.signup.submit}
				</Button>
			</form>
		</Form>
	);
}
