import type { GakubuFormData } from "@/app/check/_schemas/gakubu";
import { GAKUBU_REQ } from "../constants/creditRequirements";

export type GakubuResultV1 = {
	perCategory: {
		basicSpecialized: {
			have: number;
			need: number;
			ok: boolean;
			surplus: number;
			shortage: number;
		};
		basicSeminar: {
			have: number;
			need: number;
			ok: boolean;
			surplus: number;
			shortage: number;
		};
		coreSpecialized: {
			have: number;
			need: number;
			ok: boolean;
			surplus: number;
			shortage: number;
		};
		appliedSpecialized2: {
			majorField: {
				have: number;
				need: number;
				ok: boolean;
				shortage: number;
			};
			minorField: {
				have: number;
				need: number;
				ok: boolean;
				shortage: number;
			};
			total: {
				have: number;
				need: number;
				ok: boolean;
				surplus: number;
				shortage: number;
			};
		};
		departmentEducationOthers: {
			direct: number;
			fromSurplus: number;
			total: number;
			need: number;
			ok: boolean;
			shortage: number;
		};
	};
	total: {
		have: number;
		need: number;
		ok: boolean;
		shortage: number;
	};
};

export function judgeGakubu(input: GakubuFormData): GakubuResultV1 {
	const sanitizeInput = (n: number) => Math.max(0, Math.floor(n));

	const basicSpecialized = sanitizeInput(input.basicSpecialized);
	const basicSeminar = sanitizeInput(input.basicSeminar);
	const coreSpecialized = sanitizeInput(input.coreSpecialized);
	const majorField = sanitizeInput(input.appliedSpecialized2MajorField);
	const minorField = sanitizeInput(input.appliedSpecialized2MinorField);
	const otherFields = sanitizeInput(input.appliedSpecialized2OtherFields);
	const departmentOthers = sanitizeInput(input.departmentEducationOthers);

	const basicSpecOk = basicSpecialized >= GAKUBU_REQ.basicSpecialized;
	const basicSemOk = basicSeminar >= GAKUBU_REQ.basicSeminar;
	const coreSpecOk = coreSpecialized >= GAKUBU_REQ.coreSpecialized;
	const majorFieldOk = majorField >= GAKUBU_REQ.appliedSpecialized2MajorField;
	const minorFieldOk = minorField >= GAKUBU_REQ.appliedSpecialized2MinorField;

	const appliedSpec2Total = majorField + minorField + otherFields;
	const appliedSpec2Ok =
		appliedSpec2Total >= GAKUBU_REQ.appliedSpecialized2 &&
		majorFieldOk &&
		minorFieldOk;

	const basicSpecSurplus = Math.max(
		0,
		basicSpecialized - GAKUBU_REQ.basicSpecialized,
	);
	const basicSemSurplus = Math.max(0, basicSeminar - GAKUBU_REQ.basicSeminar);
	const coreSpecSurplus = Math.max(
		0,
		coreSpecialized - GAKUBU_REQ.coreSpecialized,
	);
	const appliedSpec2Surplus = Math.max(
		0,
		appliedSpec2Total - GAKUBU_REQ.appliedSpecialized2,
	);

	const basicSpecShortage = Math.max(
		0,
		GAKUBU_REQ.basicSpecialized - basicSpecialized,
	);
	const basicSemShortage = Math.max(0, GAKUBU_REQ.basicSeminar - basicSeminar);
	const coreSpecShortage = Math.max(
		0,
		GAKUBU_REQ.coreSpecialized - coreSpecialized,
	);
	const majorFieldShortage = Math.max(
		0,
		GAKUBU_REQ.appliedSpecialized2MajorField - majorField,
	);
	const minorFieldShortage = Math.max(
		0,
		GAKUBU_REQ.appliedSpecialized2MinorField - minorField,
	);
	const appliedSpec2Shortage = Math.max(
		0,
		GAKUBU_REQ.appliedSpecialized2 - appliedSpec2Total,
	);

	const fromSurplus =
		basicSpecSurplus + basicSemSurplus + coreSpecSurplus + appliedSpec2Surplus;
	const departmentOthersTotal = departmentOthers + fromSurplus;
	const departmentOthersOk =
		departmentOthersTotal >= GAKUBU_REQ.departmentEducationOthers;
	const departmentOthersShortage = Math.max(
		0,
		GAKUBU_REQ.departmentEducationOthers - departmentOthersTotal,
	);

	const totalHave =
		basicSpecialized +
		basicSeminar +
		coreSpecialized +
		appliedSpec2Total +
		departmentOthers;
	const totalOk =
		totalHave >= GAKUBU_REQ.total &&
		basicSpecOk &&
		basicSemOk &&
		coreSpecOk &&
		appliedSpec2Ok &&
		departmentOthersOk;
	const totalShortage = Math.max(0, GAKUBU_REQ.total - totalHave);

	return {
		perCategory: {
			basicSpecialized: {
				have: basicSpecialized,
				need: GAKUBU_REQ.basicSpecialized,
				ok: basicSpecOk,
				surplus: basicSpecSurplus,
				shortage: basicSpecShortage,
			},
			basicSeminar: {
				have: basicSeminar,
				need: GAKUBU_REQ.basicSeminar,
				ok: basicSemOk,
				surplus: basicSemSurplus,
				shortage: basicSemShortage,
			},
			coreSpecialized: {
				have: coreSpecialized,
				need: GAKUBU_REQ.coreSpecialized,
				ok: coreSpecOk,
				surplus: coreSpecSurplus,
				shortage: coreSpecShortage,
			},
			appliedSpecialized2: {
				majorField: {
					have: majorField,
					need: GAKUBU_REQ.appliedSpecialized2MajorField,
					ok: majorFieldOk,
					shortage: majorFieldShortage,
				},
				minorField: {
					have: minorField,
					need: GAKUBU_REQ.appliedSpecialized2MinorField,
					ok: minorFieldOk,
					shortage: minorFieldShortage,
				},
				total: {
					have: appliedSpec2Total,
					need: GAKUBU_REQ.appliedSpecialized2,
					ok: appliedSpec2Ok,
					surplus: appliedSpec2Surplus,
					shortage: appliedSpec2Shortage,
				},
			},
			departmentEducationOthers: {
				direct: departmentOthers,
				fromSurplus,
				total: departmentOthersTotal,
				need: GAKUBU_REQ.departmentEducationOthers,
				ok: departmentOthersOk,
				shortage: departmentOthersShortage,
			},
		},
		total: {
			have: totalHave,
			need: GAKUBU_REQ.total,
			ok: totalOk,
			shortage: totalShortage,
		},
	};
}
