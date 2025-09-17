"use server";

import { parseWithZod } from "@conform-to/zod";
import { redirect } from "next/navigation";
import { gakubuSchema } from "../_schemas/gakubu";

export async function submitGakubForm(_prevState: unknown, formData: FormData) {
	const submission = parseWithZod(formData, {
		schema: gakubuSchema,
	});

	if (submission.status !== "success") {
		return submission.reply();
	}

	console.log("フォームデータ：", submission);

	redirect("/check/gakubu/result");
}
