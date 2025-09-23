import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { notoSansJp } from "../lib/fonts";

export const metadata: Metadata = {
	title: "YNU-econ 単位チェッカー | 横浜国立大学経済学部",
	description:
		"横浜国立大学経済学部の卒業要件を簡単チェック。全学教育科目・学部教育科目の単位計算が可能です。",
	keywords: "横浜国立大学,横国,経済学部,単位,卒業要件",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ja">
			<body className={notoSansJp.className}>
				<Header />
				<main className="max-w-2xl mx-auto">{children}</main>
			</body>
		</html>
	);
}
