"use server";

import { parseWithZod } from "@conform-to/zod";
import { redirect } from "next/navigation";
import { zengakuSchema } from "../_schemas/zengaku";

export async function submitZengakuForm(
	_prevState: unknown,
	formData: FormData,
) {
	const submission = parseWithZod(formData, {
		schema: zengakuSchema,
	});

	if (submission.status !== "success") {
		return submission.reply();
	}

	// 成功時（後でlocalStorage保存処理を追加予定）
	console.log("フォームデータ：", submission.value);

	//結果ページにリダイレクト
	redirect("/check/zengaku/result");
}
