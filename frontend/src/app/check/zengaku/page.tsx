"use client";

import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { useActionState } from "react";
import { PageHeader } from "@/components/common/PageHeader";
import { submitZengakuForm } from "../_actions/zengaku";
import { zengakuSchema } from "../_schemas/zengaku";

export default function ZengakuPage() {
	const [lastResult, action] = useActionState(submitZengakuForm, undefined);
	const [form, fields] = useForm({
		lastResult,
		onValidate({ formData }) {
			return parseWithZod(formData, { schema: zengakuSchema });
		},
		shouldValidate: "onBlur",
		shouldRevalidate: "onInput",
	});

	return (
		<div className="min-h-screen p-8 space-y-8">
			<PageHeader
				title="履修単位（全学教育科目）"
				subtitle="取得済みの単位を入力してください。"
			/>
			<form
				id={form.id}
				onSubmit={form.onSubmit}
				action={action}
				noValidate
				className="space-y-6"
			>
				{/* 基礎科目 */}
				<div className="space-y-4">
					<h3 className="text-lg font-semibold">基礎科目</h3>

					<div>
						<label className="block text-sm font-bold mb-2">
							人文科学系
							<input
								type="number"
								key={fields.humanities.key}
								name={fields.humanities.name}
								defaultValue={fields.humanities.initialValue}
								className="mt-1 block w-full px-3 py-2 border border-border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
								min="0"
							/>
						</label>
						<div className="text-error text-sm mt-1">
							{fields.humanities.errors}
						</div>
					</div>

					<div>
						<label className="block text-sm font-bold mb-2">
							自然科学系
							<input
								type="number"
								key={fields.naturalScience.key}
								name={fields.naturalScience.name}
								defaultValue={fields.naturalScience.initialValue}
								className="mt-1 block w-full px-3 py-2 border border-border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
								min="0"
							/>
						</label>
						<div className="text-error text-sm mt-1">
							{fields.naturalScience.errors}
						</div>
					</div>

					<div>
						<label className="block text-sm font-bold mb-2">
							全学教育その他
							<input
								type="number"
								key={fields.generalEducationOthers.key}
								name={fields.generalEducationOthers.name}
								defaultValue={fields.generalEducationOthers.initialValue}
								className="mt-1 block w-full px-3 py-2 border border-border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
								min="0"
							/>
						</label>
						<div className="text-error text-sm mt-1">
							{fields.generalEducationOthers.errors}
						</div>
					</div>
				</div>

				{/* 外国語科目 */}
				<div className="space-y-4">
					<h3 className="text-lg font-semibold">外国語科目</h3>

					<div>
						<label className="block text-sm font-bold mb-2">
							英語
							<input
								type="number"
								key={fields.english.key}
								name={fields.english.name}
								defaultValue={fields.english.initialValue}
								className="mt-1 block w-full px-3 py-2 border border-border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
								min="0"
							/>
						</label>
						<div className="text-error text-sm mt-1">
							{fields.english.errors}
						</div>
					</div>

					<div>
						<label className="block text-sm font-bold mb-2">
							初修外国語
							<input
								type="number"
								key={fields.foreignLanguage.key}
								name={fields.foreignLanguage.name}
								defaultValue={fields.foreignLanguage.initialValue}
								className="mt-1 block w-full px-3 py-2 border border-border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
								min="0"
							/>
						</label>
						<div className="text-error text-sm mt-1">
							{fields.foreignLanguage.errors}
						</div>
					</div>
				</div>

				{/* 高度全学教育指定科目 */}
				<div className="space-y-4">
					<h3 className="text-lg font-semibold">高度全学教育指定科目</h3>

					<div>
						<div className="block text-sm font-bold mb-2">履修状況</div>
						<div className="space-y-2">
							<label className="flex items-center">
								<input
									type="radio"
									key={fields.advancedEducation.key}
									name={fields.advancedEducation.name}
									value="unfinished"
									defaultChecked={
										fields.advancedEducation.initialValue === "unfinished"
									}
									className="mr-2"
								/>
								未修了
							</label>
							<label className="flex items-center">
								<input
									type="radio"
									key={fields.advancedEducation.key}
									name={fields.advancedEducation.name}
									value="completed"
									defaultChecked={
										fields.advancedEducation.initialValue === "completed"
									}
									className="mr-2"
								/>
								修了済み
							</label>
						</div>
						<div className="text-error text-sm mt-1">
							{fields.advancedEducation.errors}
						</div>
					</div>
				</div>

				<button
					type="submit"
					className="w-full bg-brand text-white py-2 px-4 rounded-md hover:bg-brand-sec focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
				>
					次へ
				</button>
			</form>
		</div>
	);
}
