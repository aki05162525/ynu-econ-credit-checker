import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";
import { Button } from "./Button";

describe("Button コンポーネント", () => {
	test("子要素を表示する", () => {
		render(<Button>送信</Button>);
		expect(screen.getByRole("button", { name: "送信" })).toBeInTheDocument();
	});

	test("クリックで onClickが呼ばれる", async () => {
		const onClick = vi.fn();
		render(<Button onClick={onClick}>クリック</Button>);
		await userEvent.click(screen.getByRole("button", { name: "クリック" }));
		expect(onClick).toHaveBeenCalledTimes(1);
	});

	test("デフォルトで outline スタイルが適用される", () => {
		render(<Button>Default</Button>);
		const button = screen.getByRole("button", { name: "Default" });
		expect(button).toHaveClass("border", "border-brand");
	});

	test("variant=solid で solid スタイルが適用される", () => {
		render(<Button variant="solid">Solid</Button>);
		const button = screen.getByRole("button", { name: "Solid" });
		expect(button).toHaveClass("bg-brand", "text-white");
	});
});
