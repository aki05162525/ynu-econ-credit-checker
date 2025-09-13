import { CircleCheckBig, CircleX } from "lucide-react";

interface StatusBadgeProps {
	isOk: boolean;
}

export function StatusBadge({ isOk }: StatusBadgeProps) {
	return (
		<span
			className={`inline-flex items-center justify-center w-8 h-8 rounded-full transition-colors ${
				isOk
					? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
					: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
			}`}
		>
			{isOk ? (
				<CircleCheckBig className="w-4 h-4" />
			) : (
				<CircleX className="w-4 h-4" />
			)}
		</span>
	);
}
