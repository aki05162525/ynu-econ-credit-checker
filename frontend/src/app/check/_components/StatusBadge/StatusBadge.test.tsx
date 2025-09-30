import { render } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { StatusBadge } from "./StatusBadge";

describe("StatusBadge コンポーネント", () => {
	test("isOk=trueの場合、チェックアイコンが表示される", () => {
		const { container } = render(<StatusBadge isOk={true} />);
		const svg = container.querySelector("svg");
		expect(svg).toBeInTheDocument();
	});

	test("isOk=falseの場合、バツアイコンが表示される", () => {
		const { container } = render(<StatusBadge isOk={false} />);
		const svg = container.querySelector("svg");
		expect(svg).toBeInTheDocument();
	});

	test("isOk=trueの場合、緑色のスタイルが適用される", () => {
		const { container } = render(<StatusBadge isOk={true} />);
		const badge = container.querySelector("span");
		expect(badge).toHaveClass("bg-green-100", "text-green-800");
	});

	test("isOk=falseの場合、赤色のスタイルが適用される", () => {
		const { container } = render(<StatusBadge isOk={false} />);
		const badge = container.querySelector("span");
		expect(badge).toHaveClass("bg-red-100", "text-red-800");
	});

	test("丸いバッジとして表示される", () => {
		const { container } = render(<StatusBadge isOk={true} />);
		const badge = container.querySelector("span");
		expect(badge).toHaveClass("rounded-full");
	});
});
