"use client";

import { useEffect, useState } from "react";
import {
	formatShortageUnits,
	StatusBadge,
	SubjectMobileCard,
} from "@/app/check/_components";
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
										<StatusBadge isOk={result.perCategory.humanities.ok} />
									</TableCell>
									<TableCell>
										{result.perCategory.humanities.have}単位
									</TableCell>
									<TableCell>
										{formatShortageUnits({
											shortage: result.perCategory.humanities.shortage,
										})}
									</TableCell>
									<TableCell>
										{result.perCategory.humanities.surplus}単位
									</TableCell>
								</TableRow>
								<TableRow className="hover:bg-brand-bg/50 dark:hover:bg-brand-ter/20">
									<TableCell className="font-medium">自然科学系</TableCell>
									<TableCell>
										<StatusBadge isOk={result.perCategory.naturalScience.ok} />
									</TableCell>
									<TableCell>
										{result.perCategory.naturalScience.have}単位
									</TableCell>
									<TableCell>
										{formatShortageUnits({
											shortage: result.perCategory.naturalScience.shortage,
										})}
									</TableCell>
									<TableCell>
										{result.perCategory.naturalScience.surplus}単位
									</TableCell>
								</TableRow>
								<TableRow className="hover:bg-brand-bg/50 dark:hover:bg-brand-ter/20">
									<TableCell className="font-medium">英語</TableCell>
									<TableCell>
										<StatusBadge isOk={result.perCategory.english.ok} />
									</TableCell>
									<TableCell>{result.perCategory.english.have}単位</TableCell>
									<TableCell>
										{formatShortageUnits({
											shortage: result.perCategory.english.shortage,
										})}
									</TableCell>
									<TableCell>
										{result.perCategory.english.surplus}単位
									</TableCell>
								</TableRow>
								<TableRow className="hover:bg-brand-bg/50 dark:hover:bg-brand-ter/20">
									<TableCell className="font-medium">初修外国語</TableCell>
									<TableCell>
										<StatusBadge isOk={result.perCategory.foreignLanguage.ok} />
									</TableCell>
									<TableCell>
										{result.perCategory.foreignLanguage.have}単位
									</TableCell>
									<TableCell>
										{formatShortageUnits({
											shortage: result.perCategory.foreignLanguage.shortage,
										})}
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
							<SubjectMobileCard
								key={subject.name}
								name={subject.name}
								data={subject.data}
							/>
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
							<StatusBadge isOk={result.perCategory.others.ok} />
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
							<StatusBadge isOk={result.perCategory.advanced.ok} />
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
