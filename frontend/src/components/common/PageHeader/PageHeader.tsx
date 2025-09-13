import { Home } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export type PageHeaderProps = {
	title: string;
	subtitle?: string;
	className?: string;
	showHomeButton?: boolean;
};

export const PageHeader = ({
	title,
	subtitle,
	className,
	showHomeButton = false,
}: PageHeaderProps) => {
	return (
		<div className={cn("space-y-4", className)}>
			<div className="flex items-center justify-between">
				<h1 className="text-2xl font-bold bg-gradient-to-r from-brand to-brand-sec bg-clip-text text-transparent">
					{title}
				</h1>
				{showHomeButton && (
					<Link
						href="/"
						className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-brand hover:text-brand-sec transition-colors rounded-lg hover:bg-brand-bg/50"
					>
						<Home className="w-4 h-4" />
						ホーム
					</Link>
				)}
			</div>
			{subtitle && (
				<h2 className="text-base text-muted-foreground/70 font-medium">
					{subtitle}
				</h2>
			)}
		</div>
	);
};
