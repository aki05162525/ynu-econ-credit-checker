import Link from "next/link";

export type HeaderProps = {
	title?: string;
};

export const Header = ({ title = "YNU-econ 単位チェッカー" }: HeaderProps) => {
	return (
		<header className="flex items-center justify-center bg-brand p-4 shadow-sm">
			<Link
				href="/"
				className="text-white hover:text-gray-200 transition-colors"
			>
				<h1 className="font-semibold text-xl">{title}</h1>
			</Link>
		</header>
	);
};
