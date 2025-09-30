import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { formatShortageUnits, formatShortageUnitsMobile } from "./unitUtils";

describe("formatShortageUnits", () => {
	test("不足が0の場合は '-' を返す", () => {
		expect(formatShortageUnits({ shortage: 0 })).toBe("-");
	});

	test("不足がある場合はクラス付きのspanを返す", () => {
		render(<div>{formatShortageUnits({ shortage: 3 })}</div>);
		const shortageText = screen.getByText("3単位");
		expect(shortageText).toBeInTheDocument();
		expect(shortageText).toHaveClass(
			"text-red-600",
			"dark:text-red-400",
			"font-medium",
		);
	});
});

describe("formatShortageUnitsMobile", () => {
	test("不足が0の場合は '-' を返す", () => {
		expect(formatShortageUnitsMobile({ shortage: 0 })).toBe("-");
	});

	test("不足がある場合はモバイル用クラスのspanを返す", () => {
		render(<div>{formatShortageUnitsMobile({ shortage: 5 })}</div>);
		const shortageText = screen.getByText("5単位");
		expect(shortageText).toBeInTheDocument();
		expect(shortageText).toHaveClass("text-red-600", "dark:text-red-400");
		expect(shortageText).not.toHaveClass("font-medium");
	});
});
