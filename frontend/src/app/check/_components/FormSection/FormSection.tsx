export type FormSectionProps = {
	title: string;
	children: React.ReactNode;
};

export const FormSection = ({ title, children }: FormSectionProps) => (
	<div className="space-y-4">
		<h3 className="text-lg font-semibold">{title}</h3>
		{children}
	</div>
);
