/**
 * YNU 経済学部 卒業要件定数
 */

export const SUBJECT_CATEGORIES = {
	GENERAL_EDUCATION: {
		title: "全学教育科目",
		credits: 34,
	},
	FACULTY_EDUCATION: {
		title: "学部教育科目",
		credits: 90,
	},
} as const;

export const ZENGAKU_REQ = {
	humanities: 4,
	naturalScience: 4,
	english: 8,
	foreignLanguage: 2,
	others: 16,
	advanced: 4, // completed = 4、unfinished = 0 で判定
} as const;
