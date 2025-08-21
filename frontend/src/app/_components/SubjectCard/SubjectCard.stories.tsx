import type { Meta, StoryObj } from "@storybook/react";
import { GraduationCap, University } from "lucide-react";
import { SubjectCard } from "./SubjectCard";

const meta = {
	component: SubjectCard,
	tags: ["autodocs"],
	argTypes: {
		icon: { control: false },
		onClick: { action: "clicked" },
	},
} satisfies Meta<typeof SubjectCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const GeneralEducation: Story = {
	args: {
		title: "全学教育科目",
		credits: 34,
		icon: University,
	},
};

export const FacultyEducation: Story = {
	args: {
		title: "学部教育科目",
		credits: 90,
		icon: GraduationCap,
	},
};
