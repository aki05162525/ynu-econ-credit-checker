import type { Meta, StoryObj } from "@storybook/react";
import { SubjectMobileCard } from "./SubjectMobileCard";

const meta = {
	component: SubjectMobileCard,
	tags: ["autodocs"],
	argTypes: {
		name: { control: "text" },
		data: { control: "object" },
	},
} satisfies Meta<typeof SubjectMobileCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {
	args: {
		name: "人文・社会科学系",
		data: {
			have: 8,
			need: 4,
			ok: true,
			surplus: 4,
			shortage: 0,
		},
	},
};

export const Failed: Story = {
	args: {
		name: "自然科学系",
		data: {
			have: 2,
			need: 4,
			ok: false,
			surplus: 0,
			shortage: 2,
		},
	},
};

export const ExactMatch: Story = {
	args: {
		name: "英語",
		data: {
			have: 8,
			need: 8,
			ok: true,
			surplus: 0,
			shortage: 0,
		},
	},
};

export const LargeNumbers: Story = {
	args: {
		name: "その他（全学教育）",
		data: {
			have: 20,
			need: 16,
			ok: true,
			surplus: 4,
			shortage: 0,
		},
	},
};

export const ZeroCredits: Story = {
	args: {
		name: "初修外国語",
		data: {
			have: 0,
			need: 2,
			ok: false,
			surplus: 0,
			shortage: 2,
		},
	},
};
