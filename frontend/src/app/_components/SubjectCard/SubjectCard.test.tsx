import { render, screen } from "@testing-library/react";
import { GraduationCap } from "lucide-react";
import { describe, expect, test } from "vitest";
import { SubjectCard } from "./SubjectCard";

describe("SubjectCard", () => {
	test("タイトルと単位数を表示する", () => {
		render(<SubjectCard title="タイトル" credits={2} icon={GraduationCap} />);
		expect(screen.getByText("タイトル")).toBeInTheDocument();
		expect(screen.getByText("2単位")).toBeInTheDocument();
	});
});
