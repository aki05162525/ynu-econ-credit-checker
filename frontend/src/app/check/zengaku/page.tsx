"use client";

import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { useActionState } from "react";
import { PageHeader } from "@/components/common/PageHeader";
import { submitZengakuForm } from "../_actions/zengaku";
import { FormSection } from "../_components/FormSection";
import { NumberField } from "../_components/NumberField";
import { RadioField } from "../_components/RadioField";
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
				<FormSection title="基礎科目">
					<NumberField field={fields.humanities} label="人文科学系" />
					<NumberField field={fields.naturalScience} label="自然科学系" />
					<NumberField
						field={fields.generalEducationOthers}
						label="全学教育その他"
					/>
				</FormSection>

				<FormSection title="外国語科目">
					<NumberField field={fields.english} label="英語" />
					<NumberField field={fields.foreignLanguage} label="初修外国語" />
				</FormSection>

				<FormSection title="高度全学教育指定科目">
					<RadioField
						field={fields.advancedEducation}
						label="履修状況"
						options={[
							{ value: "unfinished", label: "未修了" },
							{ value: "completed", label: "修了済み" },
						]}
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
