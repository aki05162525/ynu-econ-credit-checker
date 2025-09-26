import { render } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { Header } from "../Header";

describe("Header コンポーネント", () => {
	test("デフォルトのタイトルで表示される", () => {
		const { container } = render(<Header />);
		expect(container).toMatchSnapshot();
	});

	test("カスタムタイトルで表示される", () => {
		const { container } = render(<Header title="単位チェックアプリ" />);
		expect(container).toMatchSnapshot();
	});
});
