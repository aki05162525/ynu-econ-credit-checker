import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { Header } from "../Header";

//todo スナップショットテストはこのコンポーネントでは不要だが練習のため取っておく
describe("Header コンポーネントスナップショットテスト", () => {
	test("デフォルトのタイトルで表示される", () => {
		const { container } = render(<Header />);
		expect(container).toMatchSnapshot();
	});

	test("カスタムタイトルで表示される", () => {
		const { container } = render(<Header title="単位チェックアプリ" />);
		expect(container).toMatchSnapshot();
	});
});

describe("Header コンポーネント", () => {
	test("カスタムタイトルを表示する", () => {
		const title = "単位チェックアプリ";
		render(<Header title={title} />);
		expect(
			screen.getByRole("heading", { level: 1, name: title }),
		).toBeInTheDocument();
	});

	test("デフォルトタイトルを表示する", () => {
		render(<Header />);
		expect(
			screen.getByRole("heading", {
				level: 1,
				name: "YNU-econ 単位チェッカー",
			}),
		).toBeInTheDocument();
	});

	test("タイトルのリンク先は / である", () => {
		render(<Header />);
		const link = screen.getByRole("link");
		expect(link).toHaveAttribute("href", "/");
	});
});
