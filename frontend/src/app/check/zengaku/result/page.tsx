"use client";

import { CircleCheckBig, CircleX } from "lucide-react";
import { useEffect, useState } from "react";
import type { ZengakuFormData } from "@/app/check/_schemas/zengaku";
import { PageHeader } from "@/components/common/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { judgeZengaku, type ZengakuResultV1 } from "@/lib/calculations/zengaku";

export default function ZengakuResultPage() {
	const [result, setResult] = useState<ZengakuResultV1 | null>(null);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		try {
			const storedData = localStorage.getItem("zengaku-credits");
			if (!storedData) {
				setError("データが見つかりません");
				return;
			}

			const formData: ZengakuFormData = JSON.parse(storedData);
			const judgmentResult = judgeZengaku(formData);
			setResult(judgmentResult);
		} catch (err) {
			setError("データの読み込みに失敗しました");
			console.error("Error loading data:", err);
		}
	}, []);

	if (error) {
		return (
			<div className="min-h-screen p-8">
				<PageHeader title="エラー" subtitle={error} />
			</div>
		);
	}

	if (!result) {
		return (
			<div className="min-h-screen p-8">
				<PageHeader title="読み込み中..." subtitle="結果を計算しています" />
			</div>
		);
	}

	const getStatusBadge = (isOk: boolean) => {
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
	};

	return (
		<div className="min-h-screen p-8 space-y-8 bg-brand-bg dark:bg-background">
			<PageHeader
				title="全学教育科目 判定結果"
				subtitle="各科目の単位取得状況"
			/>

			<Card className="border-brand/20 shadow-lg">
				<CardHeader>
					<CardTitle className="text-brand">単位取得状況一覧</CardTitle>
				</CardHeader>
				<CardContent>
					{/* デスクトップ: テーブル表示 */}
					<div className="hidden md:block">
						<Table>
							<TableHeader>
								<TableRow className="border-brand/20">
									<TableHead className="font-semibold text-brand">
										科目
									</TableHead>
									<TableHead className="font-semibold text-brand">
										判定
									</TableHead>
									<TableHead className="font-semibold text-brand">
										取得単位
									</TableHead>
									<TableHead className="font-semibold text-brand">
										不足単位
									</TableHead>
									<TableHead className="font-semibold text-brand">
										余剰単位
									</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								<TableRow className="hover:bg-brand-bg/50 dark:hover:bg-brand-ter/20">
									<TableCell className="font-medium">人文科学系</TableCell>
									<TableCell>
										{getStatusBadge(result.perCategory.humanities.ok)}
									</TableCell>
									<TableCell>
										{result.perCategory.humanities.have}単位
									</TableCell>
									<TableCell>
										{result.perCategory.humanities.ok ? (
											"-"
										) : (
											<span className="text-red-600 dark:text-red-400 font-medium">
												{result.perCategory.humanities.need -
													result.perCategory.humanities.have}
												単位
											</span>
										)}
									</TableCell>
									<TableCell>
										{result.perCategory.humanities.surplus}単位
									</TableCell>
								</TableRow>
								<TableRow className="hover:bg-brand-bg/50 dark:hover:bg-brand-ter/20">
									<TableCell className="font-medium">自然科学系</TableCell>
									<TableCell>
										{getStatusBadge(result.perCategory.naturalScience.ok)}
									</TableCell>
									<TableCell>
										{result.perCategory.naturalScience.have}単位
									</TableCell>
									<TableCell>
										{result.perCategory.naturalScience.ok ? (
											"-"
										) : (
											<span className="text-red-600 dark:text-red-400 font-medium">
												{result.perCategory.naturalScience.need -
													result.perCategory.naturalScience.have}
												単位
											</span>
										)}
									</TableCell>
									<TableCell>
										{result.perCategory.naturalScience.surplus}単位
									</TableCell>
								</TableRow>
								<TableRow className="hover:bg-brand-bg/50 dark:hover:bg-brand-ter/20">
									<TableCell className="font-medium">英語</TableCell>
									<TableCell>
										{getStatusBadge(result.perCategory.english.ok)}
									</TableCell>
									<TableCell>{result.perCategory.english.have}単位</TableCell>
									<TableCell>
										{result.perCategory.english.ok ? (
											"-"
										) : (
											<span className="text-red-600 dark:text-red-400 font-medium">
												{result.perCategory.english.need -
													result.perCategory.english.have}
												単位
											</span>
										)}
									</TableCell>
									<TableCell>
										{result.perCategory.english.surplus}単位
									</TableCell>
								</TableRow>
								<TableRow className="hover:bg-brand-bg/50 dark:hover:bg-brand-ter/20">
									<TableCell className="font-medium">初修外国語</TableCell>
									<TableCell>
										{getStatusBadge(result.perCategory.foreignLanguage.ok)}
									</TableCell>
									<TableCell>
										{result.perCategory.foreignLanguage.have}単位
									</TableCell>
									<TableCell>
										{result.perCategory.foreignLanguage.ok ? (
											"-"
										) : (
											<span className="text-red-600 dark:text-red-400 font-medium">
												{result.perCategory.foreignLanguage.need -
													result.perCategory.foreignLanguage.have}
												単位
											</span>
										)}
									</TableCell>
									<TableCell>
										{result.perCategory.foreignLanguage.surplus}単位
									</TableCell>
								</TableRow>
							</TableBody>
						</Table>
					</div>

					{/* モバイル: カード表示 */}
					<div className="md:hidden space-y-4">
						{[
							{ name: "人文科学系", data: result.perCategory.humanities },
							{ name: "自然科学系", data: result.perCategory.naturalScience },
							{ name: "英語", data: result.perCategory.english },
							{ name: "初修外国語", data: result.perCategory.foreignLanguage },
						].map((subject) => (
							<div
								key={subject.name}
								className="border border-brand/20 rounded-lg p-4 space-y-3 bg-card"
							>
								<div className="flex items-center justify-between">
									<h3 className="font-semibold text-brand">{subject.name}</h3>
									{getStatusBadge(subject.data.ok)}
								</div>
								<div className="grid grid-cols-3 gap-2 text-sm">
									<div className="text-center">
										<div className="text-muted-foreground">取得</div>
										<div className="font-medium">{subject.data.have}単位</div>
									</div>
									<div className="text-center">
										<div className="text-muted-foreground">不足</div>
										<div className="font-medium">
											{subject.data.ok ? (
												"-"
											) : (
												<span className="text-red-600 dark:text-red-400">
													{subject.data.need - subject.data.have}単位
												</span>
											)}
										</div>
									</div>
									<div className="text-center">
										<div className="text-muted-foreground">余剰</div>
										<div className="font-medium">
											{subject.data.surplus}単位
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</CardContent>
			</Card>

			<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
				<Card className="border-brand/20 shadow-lg md:col-span-2">
					<CardHeader>
						<CardTitle className="text-brand">全学教育その他</CardTitle>
					</CardHeader>
					<CardContent className="space-y-3">
						<div className="flex justify-between">
							<span className="text-muted-foreground">直接取得単位:</span>
							<span className="font-medium">
								{result.perCategory.others.direct}単位
							</span>
						</div>
						<div className="flex justify-between">
							<span className="text-muted-foreground">余剰からの振替:</span>
							<span className="font-medium">
								{result.perCategory.others.fromSurplus}単位
							</span>
						</div>
						<div className="flex justify-between">
							<span className="text-muted-foreground">合計単位:</span>
							<span className="font-medium">
								{result.perCategory.others.total}単位
							</span>
						</div>
						<div className="flex justify-between items-center pt-2 border-t">
							<span className="text-muted-foreground">判定:</span>
							{getStatusBadge(result.perCategory.others.ok)}
						</div>
						{result.perCategory.others.shortage > 0 && (
							<div className="flex justify-between text-red-600 dark:text-red-400">
								<span>不足単位:</span>
								<span className="font-medium">
									{result.perCategory.others.shortage}単位
								</span>
							</div>
						)}
					</CardContent>
				</Card>

				<Card className="border-brand/20 shadow-lg flex flex-col justify-center md:col-span-2 lg:col-span-1">
					<CardHeader className="pb-4">
						<CardTitle className="text-brand text-center">
							高度全学教育指定科目
						</CardTitle>
					</CardHeader>
					<CardContent className="flex flex-col items-center space-y-4">
						<div className="flex flex-col items-center space-y-2">
							{getStatusBadge(result.perCategory.advanced.ok)}
							<span className="text-sm text-muted-foreground text-center">
								{result.perCategory.advanced.ok
									? "要件を満たしています"
									: "要件を満たしていません"}
							</span>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
