import { z } from "zod";

const errorMessage = "0以上で入力";

export const gakubuSchema = z.object({
	// 専門基礎科目
	basicSpecialized: z.number().int().min(0, errorMessage),

	// 基礎演習
	basicSeminar: z.number().int().min(0, errorMessage),

	// 専門基幹科目
	coreSpecialized: z.number().int().min(0, errorMessage),

	// 専門応用科目Ⅱ
	appliedSpecialized2: z.object({
		majorField: z.number().int().min(0, errorMessage),
		minorField: z.number().int().min(0, errorMessage),
		otherFields: z.number().int().min(0, errorMessage),
	}),

	// 学部教育科目その他
	departmentEducationOthers: z.number().int().min(0, errorMessage),
});

export type GakubuFormData = z.infer<typeof gakubuSchema>;
