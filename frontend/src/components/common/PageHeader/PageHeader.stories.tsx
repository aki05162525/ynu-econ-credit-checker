import type { Meta, StoryObj } from "@storybook/react";
import { PageHeader } from "./PageHeader";

const meta = {
	component: PageHeader,
	tags: ["autodocs"],
} satisfies Meta<typeof PageHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		title: "単位を確認する",
		subtitle: "確認したい科目の種類を選択してください。",
	},
};

export const TitleOnly: Story = {
	args: {
		title: "単位を確認する",
	},
};

export const LongTitle: Story = {
	args: {
		title: "履修単位（学部教育科目）",
		subtitle: "取得済みの単位を入力してください。",
	},
};
