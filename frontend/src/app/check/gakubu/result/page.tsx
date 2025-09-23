"use client";

import { useEffect, useState } from "react";
import {
	formatShortageUnits,
	StatusBadge,
	SubjectMobileCard,
} from "@/app/check/_components";
import type { GakubuFormData } from "@/app/check/_schemas/gakubu";
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
import { type GakubuResultV1, judgeGakubu } from "@/lib/calculations/gakubu";

export default function GakubResultPage() {
	const [result, setResult] = useState<GakubuResultV1 | null>(null);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		try {
			const storedData = localStorage.getItem("gakubu-credits");
			if (!storedData) {
				setError("データが見つかりません");
				return;
			}

			const formData: GakubuFormData = JSON.parse(storedData);
			const judgmentResult = judgeGakubu(formData);
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
		<div className="min-h-screen p-8 space-y-8 ">
			<PageHeader
				title="学部教育科目 判定結果"
				subtitle="各科目の単位取得状況"
				showHomeButton={true}
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
									<TableCell className="font-medium">専門基礎科目</TableCell>
									<TableCell>
										<StatusBadge
											isOk={result.perCategory.basicSpecialized.ok}
										/>
									</TableCell>
									<TableCell>
										{result.perCategory.basicSpecialized.have}単位
									</TableCell>
									<TableCell>
										{formatShortageUnits({
											shortage: result.perCategory.basicSpecialized.shortage,
										})}
									</TableCell>
									<TableCell>
										{result.perCategory.basicSpecialized.surplus}単位
									</TableCell>
								</TableRow>
								<TableRow className="hover:bg-brand-bg/50 dark:hover:bg-brand-ter/20">
									<TableCell className="font-medium">基礎演習</TableCell>
									<TableCell>
										<StatusBadge isOk={result.perCategory.basicSeminar.ok} />
									</TableCell>
									<TableCell>
										{result.perCategory.basicSeminar.have}単位
									</TableCell>
									<TableCell>
										{formatShortageUnits({
											shortage: result.perCategory.basicSeminar.shortage,
										})}
									</TableCell>
									<TableCell>
										{result.perCategory.basicSeminar.surplus}単位
									</TableCell>
								</TableRow>
								<TableRow className="hover:bg-brand-bg/50 dark:hover:bg-brand-ter/20">
									<TableCell className="font-medium">専門基幹科目</TableCell>
									<TableCell>
										<StatusBadge isOk={result.perCategory.coreSpecialized.ok} />
									</TableCell>
									<TableCell>
										{result.perCategory.coreSpecialized.have}単位
									</TableCell>
									<TableCell>
										{formatShortageUnits({
											shortage: result.perCategory.coreSpecialized.shortage,
										})}
									</TableCell>
									<TableCell>
										{result.perCategory.coreSpecialized.surplus}単位
									</TableCell>
								</TableRow>
							</TableBody>
						</Table>
					</div>

					{/* モバイル: カード表示 */}
					<div className="md:hidden space-y-4">
						{[
							{
								name: "専門基礎科目",
								data: result.perCategory.basicSpecialized,
							},
							{ name: "基礎演習", data: result.perCategory.basicSeminar },
							{
								name: "専門基幹科目",
								data: result.perCategory.coreSpecialized,
							},
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

			{/* 専門応用科目Ⅱセクション */}
			<Card className="border-brand/20 shadow-lg">
				<CardHeader>
					<CardTitle className="text-brand">専門応用科目Ⅱ</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-6">
						<div className="space-y-2">
							<div className="flex justify-between">
								<span className="text-muted-foreground">主分野:</span>
								<span className="font-medium">
									{result.perCategory.appliedSpecialized2.majorField.have}単位
								</span>
							</div>
							<div className="flex justify-between items-center">
								<span className="text-muted-foreground">判定:</span>
								<StatusBadge
									isOk={result.perCategory.appliedSpecialized2.majorField.ok}
								/>
							</div>
							{result.perCategory.appliedSpecialized2.majorField.shortage >
								0 && (
								<div className="flex justify-between text-red-600 dark:text-red-400">
									<span>不足:</span>
									<span className="font-medium">
										{result.perCategory.appliedSpecialized2.majorField.shortage}
										単位
									</span>
								</div>
							)}
						</div>

						<div className="space-y-2">
							<div className="flex justify-between">
								<span className="text-muted-foreground">副分野:</span>
								<span className="font-medium">
									{result.perCategory.appliedSpecialized2.minorField.have}単位
								</span>
							</div>
							<div className="flex justify-between items-center">
								<span className="text-muted-foreground">判定:</span>
								<StatusBadge
									isOk={result.perCategory.appliedSpecialized2.minorField.ok}
								/>
							</div>
							{result.perCategory.appliedSpecialized2.minorField.shortage >
								0 && (
								<div className="flex justify-between text-red-600 dark:text-red-400">
									<span>不足:</span>
									<span className="font-medium">
										{result.perCategory.appliedSpecialized2.minorField.shortage}
										単位
									</span>
								</div>
							)}
						</div>

						<div className="space-y-2">
							<div className="flex justify-between">
								<span className="text-muted-foreground">合計単位:</span>
								<span className="font-medium">
									{result.perCategory.appliedSpecialized2.total.have}単位
								</span>
							</div>
							<div className="flex justify-between items-center">
								<span className="text-muted-foreground">全体判定:</span>
								<StatusBadge
									isOk={result.perCategory.appliedSpecialized2.total.ok}
								/>
							</div>
							{result.perCategory.appliedSpecialized2.total.shortage > 0 && (
								<div className="flex justify-between text-red-600 dark:text-red-400">
									<span>不足:</span>
									<span className="font-medium">
										{result.perCategory.appliedSpecialized2.total.shortage}単位
									</span>
								</div>
							)}
						</div>
					</div>
				</CardContent>
			</Card>

			<div className="grid gap-6 md:grid-cols-2">
				<Card className="border-brand/20 shadow-lg">
					<CardHeader>
						<CardTitle className="text-brand">学部教育科目その他</CardTitle>
					</CardHeader>
					<CardContent className="space-y-3">
						<div className="flex justify-between">
							<span className="text-muted-foreground">直接取得単位:</span>
							<span className="font-medium">
								{result.perCategory.departmentEducationOthers.direct}単位
							</span>
						</div>
						<div className="flex justify-between">
							<span className="text-muted-foreground">余剰からの振替:</span>
							<span className="font-medium">
								{result.perCategory.departmentEducationOthers.fromSurplus}単位
							</span>
						</div>
						<div className="flex justify-between">
							<span className="text-muted-foreground">合計単位:</span>
							<span className="font-medium">
								{result.perCategory.departmentEducationOthers.total}単位
							</span>
						</div>
						<div className="flex justify-between items-center pt-2 border-t">
							<span className="text-muted-foreground">判定:</span>
							<StatusBadge
								isOk={result.perCategory.departmentEducationOthers.ok}
							/>
						</div>
						{result.perCategory.departmentEducationOthers.shortage > 0 && (
							<div className="flex justify-between text-red-600 dark:text-red-400">
								<span>不足単位:</span>
								<span className="font-medium">
									{result.perCategory.departmentEducationOthers.shortage}単位
								</span>
							</div>
						)}
					</CardContent>
				</Card>

				<Card className="border-brand/20 shadow-lg flex flex-col justify-center">
					<CardHeader className="pb-4">
						<CardTitle className="text-brand text-center">
							全体の判定結果
						</CardTitle>
					</CardHeader>
					<CardContent className="flex flex-col items-center space-y-4">
						<div className="flex flex-col items-center space-y-2">
							<StatusBadge isOk={result.total.ok} />
							<span className="text-sm text-muted-foreground text-center">
								{result.total.ok
									? "卒業要件を満たしています"
									: "卒業要件を満たしていません"}
							</span>
						</div>
						<div className="text-center space-y-1">
							<div className="text-sm text-muted-foreground">
								合計単位: {result.total.have}単位
							</div>
							{result.total.shortage > 0 && (
								<div className="text-sm text-red-600 dark:text-red-400">
									不足: {result.total.shortage}単位
								</div>
							)}
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
