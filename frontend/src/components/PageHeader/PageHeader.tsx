export type PageHeaderProps = {
	title: string;
	subtitle?: string;
	className?: string;
};

export const PageHeader = ({ title, subtitle, className }: PageHeaderProps) => {
	return (
		<div className={`space-y-4 ${className ?? ""}`}>
			<h1 className="text-2xl font-bold">{title}</h1>
			{subtitle && <h2 className="text-base text-gray-600">{subtitle}</h2>}
		</div>
	);
};
