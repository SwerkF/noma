'use client';

import Lottie from 'lottie-react';
import { useTheme } from 'next-themes';

import { cn } from '@/lib/utils';

const defaultProps = {
	pageSize: 'full-page',
	size: 'w-10 h-10',
	className: 'flex items-center justify-center',
};

import CONFIG_DARK from '@/assets/lottie/loader-dark.json';
import CONFIG_LIGHT from '@/assets/lottie/loader-light.json';

export default function Loading({
	pageSize,
	className,
}: {
	pageSize?:
		| 'full-page'
		| 'small-page'
		| 'medium-page'
		| 'large-page'
		| 'small-loading';
	size?: 'w-10 h-10' | 'w-16 h-16' | 'w-24 h-24' | 'w-32 h-32' | 'w-40 h-40';
	className?: string;
}) {
	const theme = useTheme();

	return (
		<div
			className={cn(
				defaultProps.className,
				className,
				pageSize === 'full-page'
					? 'h-screen w-full'
					: pageSize === 'small-page'
						? 'h-10 w-10'
						: pageSize === 'medium-page'
							? 'h-20 w-20'
							: pageSize === 'large-page'
								? 'h-32 w-32'
								: pageSize === 'small-loading'
									? 'h-10 w-10'
									: 'h-full w-full'
			)}
		>
			<Lottie
				animationData={theme.theme === 'dark' ? CONFIG_DARK : CONFIG_LIGHT}
				loop={true}
			/>
		</div>
	);
}
