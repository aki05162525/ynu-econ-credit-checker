import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { SubjectMobileCard } from "./SubjectMobileCard";

describe("SubjectMobileCard コンポーネント", () => {
	test("科目名が表示される", () => {
		const data = {
			have: 10,
			need: 8,
			ok: true,
			surplus: 2,
			shortage: 0,
		};
		render(<SubjectMobileCard name="データサイエンス" data={data} />);
		expect(
			screen.getByRole("heading", { level: 3, name: "データサイエンス" }),
		).toBeInTheDocument();
	});

	test("取得単位数が表示される", () => {
		const data = {
			have: 10,
			need: 8,
			ok: true,
			surplus: 2,
			shortage: 0,
		};
		render(<SubjectMobileCard name="科目名" data={data} />);
		expect(screen.getByText("10単位")).toBeInTheDocument();
	});

	test("余剰単位数が表示される", () => {
		const data = {
			have: 10,
			need: 8,
			ok: true,
			surplus: 2,
			shortage: 0,
		};
		render(<SubjectMobileCard name="科目名" data={data} />);
		expect(screen.getByText("2単位")).toBeInTheDocument();
	});

	test("不足が0の場合、ハイフンが表示される", () => {
		const data = {
			have: 10,
			need: 8,
			ok: true,
			surplus: 2,
			shortage: 0,
		};
		render(<SubjectMobileCard name="科目名" data={data} />);
		expect(screen.getByText("-")).toBeInTheDocument();
	});

	test("不足がある場合、不足単位数が表示される", () => {
		const data = {
			have: 5,
			need: 8,
			ok: false,
			surplus: 0,
			shortage: 3,
		};
		render(<SubjectMobileCard name="科目名" data={data} />);
		expect(screen.getByText("3単位")).toBeInTheDocument();
	});

	test("ok=trueの場合、StatusBadgeが表示される", () => {
		const data = {
			have: 10,
			need: 8,
			ok: true,
			surplus: 2,
			shortage: 0,
		};
		const { container } = render(
			<SubjectMobileCard name="科目名" data={data} />,
		);
		const badge = container.querySelector(".bg-green-100");
		expect(badge).toBeInTheDocument();
	});

	test("ok=falseの場合、StatusBadgeが表示される", () => {
		const data = {
			have: 5,
			need: 8,
			ok: false,
			surplus: 0,
			shortage: 3,
		};
		const { container } = render(
			<SubjectMobileCard name="科目名" data={data} />,
		);
		const badge = container.querySelector(".bg-red-100");
		expect(badge).toBeInTheDocument();
	});
});
