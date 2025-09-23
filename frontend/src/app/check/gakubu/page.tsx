"use client";

import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { useActionState } from "react";
import { PageHeader } from "@/components/common/PageHeader";
import { submitGakubForm } from "../_actions/gakubu";
import { FormSection } from "../_components/FormSection";
import { NumberField } from "../_components/NumberField";
import { gakubuSchema } from "../_schemas/gakubu";

export default function GakubuPage() {
	const [lastResult, action] = useActionState(submitGakubForm, undefined);

	const [form, fields] = useForm({
		lastResult,
		onValidate({ formData }) {
			return parseWithZod(formData, { schema: gakubuSchema });
		},
		onSubmit(_, { formData }) {
			const submission = parseWithZod(formData, { schema: gakubuSchema });
			if (submission.status === "success") {
				try {
					localStorage.setItem(
						"gakubu-credits",
						JSON.stringify(submission.value),
					);
				} catch (error) {
					console.error("localStorage保存に失敗:", error);
				}
			}
		},
		shouldValidate: "onBlur",
		shouldRevalidate: "onInput",
	});

	return (
		<div className="min-h-screen p-8 space-y-8">
			<PageHeader
				title="履修単位（学部教育科目）"
				subtitle="取得済みの単位を入力してください。"
			/>
			<form
				id={form.id}
				onSubmit={form.onSubmit}
				action={action}
				noValidate
				className="space-y-6"
			>
				<FormSection title="基本科目">
					<NumberField field={fields.basicSpecialized} label="専門基礎" />
					<NumberField field={fields.basicSeminar} label="基礎演習" />
					<NumberField field={fields.coreSpecialized} label="専門基幹" />
				</FormSection>
				<FormSection title="専門応用科目Ⅱ">
					<NumberField
						field={fields.appliedSpecialized2MajorField}
						label="主専攻分野"
					/>
					<NumberField
						field={fields.appliedSpecialized2MinorField}
						label="副専攻分野"
					/>
					<NumberField
						field={fields.appliedSpecialized2OtherFields}
						label="その他分野"
					/>
				</FormSection>
				<FormSection title="その他">
					<NumberField
						field={fields.departmentEducationOthers}
						label="専門応用Ⅰ・特殊講義・経営科目等"
					/>
				</FormSection>
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
