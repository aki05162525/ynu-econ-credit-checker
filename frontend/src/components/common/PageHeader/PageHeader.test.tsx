import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { PageHeader } from "./PageHeader";

describe("PageHeader コンポーネント", () => {
	test("タイトルが表示される", () => {
		render(<PageHeader title="タイトル" />);
		expect(
			screen.getByRole("heading", { level: 1, name: "タイトル" }),
		).toBeInTheDocument();
	});

	test("subtitleありの場合に表示される", () => {
		render(<PageHeader title="タイトル" subtitle="説明文" />);
		expect(screen.getByText("説明文")).toBeInTheDocument();
	});

	test("subtitleなしの場合に表示されない", () => {
		render(<PageHeader title="タイトル" />);
		expect(screen.queryByRole("heading", { level: 2 })).not.toBeInTheDocument();
	});

	test("showHomeButton=trueでホームボタンが表示される", () => {
		render(<PageHeader title="タイトル" showHomeButton={true} />);
		expect(screen.getByRole("link", { name: /ホーム/ })).toHaveAttribute(
			"href",
			"/",
		);
	});
});
