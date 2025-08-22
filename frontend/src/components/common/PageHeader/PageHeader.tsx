import { cn } from "@/lib/utils";

export type PageHeaderProps = {
	title: string;
	subtitle?: string;
	className?: string;
};

export const PageHeader = ({ title, subtitle, className }: PageHeaderProps) => {
	return (
		<div className={cn("space-y-4", className)}>
			<h1 className="text-2xl font-bold bg-gradient-to-r from-brand to-brand-sec bg-clip-text text-transparent">
				{title}
			</h1>
			{subtitle && (
				<h2 className="text-base text-muted-foreground/70 font-medium">
					{subtitle}
				</h2>
			)}
		</div>
	);
};
