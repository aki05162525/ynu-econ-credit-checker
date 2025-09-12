import type { ZengakuFormData } from "@/app/check/_schemas/zengaku";
import { ZENGAKU_REQ } from "../constants/creditRequirements";

export type ZengakuResultV1 = {
	perCategory: {
		humanities: { have: number; need: number; ok: boolean; surplus: number };
		naturalScience: {
			have: number;
			need: number;
			ok: boolean;
			surplus: number;
		};
		english: { have: number; need: number; ok: boolean; surplus: number };
		foreignLanguage: {
			have: number;
			need: number;
			ok: boolean;
			surplus: number;
		};
		others: {
			direct: number;
			fromSurplus: number;
			total: number;
			need: number;
			ok: boolean;
			shortage: number;
		};
		advanced: { have: number; need: number; ok: boolean; shortage: number };
	};
};

export function judgeZengaku(input: ZengakuFormData): ZengakuResultV1 {
	// 念のため整数・0以上に丸める（フォーム側でも担保してるが二重安全）
	const sanitizeInput = (n: number) => Math.max(0, Math.floor(n));

	const humanities = sanitizeInput(input.humanities);
	const naturalScience = sanitizeInput(input.naturalScience);
	const english = sanitizeInput(input.english);
	const foreignLanguage = sanitizeInput(input.foreignLanguage);
	const othersDirect = sanitizeInput(input.generalEducationOthers);

	const humOk = humanities >= ZENGAKU_REQ.humanities;
	const natOk = naturalScience >= ZENGAKU_REQ.naturalScience;
	const engOk = english >= ZENGAKU_REQ.english;
	const flOk = foreignLanguage >= ZENGAKU_REQ.foreignLanguage;

	const humSur = Math.max(0, humanities - ZENGAKU_REQ.humanities);
	const natSur = Math.max(0, naturalScience - ZENGAKU_REQ.naturalScience);
	const engSur = Math.max(0, english - ZENGAKU_REQ.english);
	const flSur = Math.max(0, foreignLanguage - ZENGAKU_REQ.foreignLanguage);

	const fromSurplus = humSur + natSur + engSur + flSur;
	const othersTotal = othersDirect + fromSurplus;
	const othersOk = othersTotal >= ZENGAKU_REQ.others;
	const othersShort = Math.max(0, ZENGAKU_REQ.others - othersTotal);

	// 高度教養科目の特殊ルール：完了時のみ必要単位(4単位)を満たしたとみなす
	// 未完了時は0単位扱いとし、他のカテゴリで取得した単位との重複を避ける
	const advancedHave =
		input.advancedEducation === "completed" ? ZENGAKU_REQ.advanced : 0;
	const advOk = advancedHave >= ZENGAKU_REQ.advanced;
	const advShort = Math.max(0, ZENGAKU_REQ.advanced - advancedHave);

	return {
		perCategory: {
			humanities: {
				have: humanities,
				need: ZENGAKU_REQ.humanities,
				ok: humOk,
				surplus: humSur,
			},
			naturalScience: {
				have: naturalScience,
				need: ZENGAKU_REQ.naturalScience,
				ok: natOk,
				surplus: natSur,
			},
			english: {
				have: english,
				need: ZENGAKU_REQ.english,
				ok: engOk,
				surplus: engSur,
			},
			foreignLanguage: {
				have: foreignLanguage,
				need: ZENGAKU_REQ.foreignLanguage,
				ok: flOk,
				surplus: flSur,
			},
			others: {
				direct: othersDirect,
				fromSurplus,
				total: othersTotal,
				need: ZENGAKU_REQ.others,
				ok: othersOk,
				shortage: othersShort,
			},
			advanced: {
				have: advancedHave,
				need: ZENGAKU_REQ.advanced,
				ok: advOk,
				shortage: advShort,
			},
		},
	};
}
