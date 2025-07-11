import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { numberToCurrency, stringToNumber } from '@/lib/format';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';

export default function StatsCard({
	title,
	value,
	previousValue,
	text,
	icon,
}: {
	title: string;
	value: string;
	previousValue: string;
	text: string;
	icon: React.ReactNode;
}) {
	return (
		<Card className="gap-2">
			<CardHeader>
				<CardTitle className="text-sm font-bold">{title}</CardTitle>
			</CardHeader>
			<CardContent>
				<p className="text-3xl font-bold">
					{numberToCurrency(stringToNumber(value))}
				</p>
				<p className="text-muted-foreground text-xs">{icon}</p>
			</CardContent>
			{previousValue && (
				<CardFooter>
					<div className="flex items-center gap-1">
						<div className="flex items-center gap-1">
							<span className="text-muted-foreground text-xs">
								{numberToCurrency(stringToNumber(previousValue))}
							</span>
							{stringToNumber(previousValue) < stringToNumber(value) && (
								<ArrowUpRight className="h-4 w-4 text-green-500" />
							)}
							{stringToNumber(previousValue) > stringToNumber(value) && (
								<ArrowDownRight className="h-4 w-4 text-red-500" />
							)}
						</div>
						<div className="text-muted-foreground text-xs">{text}</div>
					</div>
				</CardFooter>
			)}
		</Card>
	);
}
