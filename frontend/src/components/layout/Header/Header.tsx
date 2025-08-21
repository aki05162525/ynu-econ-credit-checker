export type HeaderProps = {
	title?: string;
};

export const Header = ({ title = "YNU-econ 単位チェッカー" }: HeaderProps) => {
	return (
		<header className="flex items-center justify-center bg-brand p-4 shadow-sm">
			<h1 className="font-semibold text-xl text-white">{title}</h1>
		</header>
	);
};
