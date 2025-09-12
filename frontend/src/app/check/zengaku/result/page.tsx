"use client";

import { useEffect, useState } from "react";
import type { ZengakuFormData } from "@/app/check/_schemas/zengaku";
import { PageHeader } from "@/components/common/PageHeader";
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
		<div className="min-h-screen p-8 space-y-8">
			<PageHeader
				title="全学教育科目 判定結果"
				subtitle="各科目の単位充足状況"
			/>

			<div className="space-y-6">
				<div className="border p-4 rounded-lg">
					<h3 className="font-bold text-lg mb-2">人文科学系</h3>
					<p>取得単位: {result.perCategory.humanities.have}単位</p>
					<p>必要単位: {result.perCategory.humanities.need}単位</p>
					<p>判定: {result.perCategory.humanities.ok ? "✓ 充足" : "× 不足"}</p>
					<p>余剰単位: {result.perCategory.humanities.surplus}単位</p>
				</div>

				<div className="border p-4 rounded-lg">
					<h3 className="font-bold text-lg mb-2">自然科学系</h3>
					<p>取得単位: {result.perCategory.naturalScience.have}単位</p>
					<p>必要単位: {result.perCategory.naturalScience.need}単位</p>
					<p>
						判定: {result.perCategory.naturalScience.ok ? "✓ 充足" : "× 不足"}
					</p>
					<p>余剰単位: {result.perCategory.naturalScience.surplus}単位</p>
				</div>

				<div className="border p-4 rounded-lg">
					<h3 className="font-bold text-lg mb-2">英語</h3>
					<p>取得単位: {result.perCategory.english.have}単位</p>
					<p>必要単位: {result.perCategory.english.need}単位</p>
					<p>判定: {result.perCategory.english.ok ? "✓ 充足" : "× 不足"}</p>
					<p>余剰単位: {result.perCategory.english.surplus}単位</p>
				</div>

				<div className="border p-4 rounded-lg">
					<h3 className="font-bold text-lg mb-2">初修外国語</h3>
					<p>取得単位: {result.perCategory.foreignLanguage.have}単位</p>
					<p>必要単位: {result.perCategory.foreignLanguage.need}単位</p>
					<p>
						判定: {result.perCategory.foreignLanguage.ok ? "✓ 充足" : "× 不足"}
					</p>
					<p>余剰単位: {result.perCategory.foreignLanguage.surplus}単位</p>
				</div>

				<div className="border p-4 rounded-lg">
					<h3 className="font-bold text-lg mb-2">全学教育その他</h3>
					<p>直接取得単位: {result.perCategory.others.direct}単位</p>
					<p>余剰からの充当: {result.perCategory.others.fromSurplus}単位</p>
					<p>合計単位: {result.perCategory.others.total}単位</p>
					<p>必要単位: {result.perCategory.others.need}単位</p>
					<p>判定: {result.perCategory.others.ok ? "✓ 充足" : "× 不足"}</p>
					{result.perCategory.others.shortage > 0 && (
						<p>不足単位: {result.perCategory.others.shortage}単位</p>
					)}
				</div>

				<div className="border p-4 rounded-lg">
					<h3 className="font-bold text-lg mb-2">高度全学教育指定科目</h3>
					<p>取得単位: {result.perCategory.advanced.have}単位</p>
					<p>必要単位: {result.perCategory.advanced.need}単位</p>
					<p>判定: {result.perCategory.advanced.ok ? "✓ 充足" : "× 不足"}</p>
					{result.perCategory.advanced.shortage > 0 && (
						<p>不足単位: {result.perCategory.advanced.shortage}単位</p>
					)}
				</div>
			</div>
		</div>
	);
}
