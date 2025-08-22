import { z } from "zod";

const errorMessage = "0以上で入力";

export const zengakuSchema = z.object({
	//基礎科目
	humanities: z.number().int().min(0, errorMessage),
	naturalScience: z.number().int().min(0, errorMessage),
	generalEducationOthers: z.number().int().min(0, errorMessage),

	//外国語科目
	english: z.number().int().min(0, errorMessage),
	foreignLanguage: z.number().int().min(0, errorMessage),

	// 高度全学教育指定科目
	advancedEducation: z.enum(["unfinished", "completed"], {
		required_error: "履修状況を選択してください",
	}),
});

export type ZengakuFormData = z.infer<typeof zengakuSchema>;
