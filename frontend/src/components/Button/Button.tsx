export type ButtonVariant = "solid" | "outline";

export type ButtonProps = {
	onClick?: () => void;
	children: React.ReactNode;
	className?: string;
	variant?: ButtonVariant;
};

export const baseStyle = "rounded px-8 py-2 font-bold";

export const variantStyle: Record<ButtonVariant, string> = {
	solid: "bg-brand text-white hover:bg-brand-sec",
	outline: "border border-brand text-brand hover:bg-brand-bg",
};

export const Button = ({
	onClick,
	children,
	className,
	variant = "outline",
}: ButtonProps) => {
	const classNames = `${baseStyle} ${variantStyle[variant]} ${className ?? ""}`;

	return (
		<button type="button" onClick={onClick} className={classNames}>
			{children}
		</button>
	);
};
