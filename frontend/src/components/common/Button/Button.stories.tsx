import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

const meta = {
	component: Button,
	tags: ["autodocs"],
	argTypes: {
		variant: { control: "select", options: ["solid", "outline"] },
	},
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Solid: Story = {
	args: {
		children: "Solid Button",
		variant: "solid",
	},
};

export const Outline: Story = {
	args: {
		children: "Outline Button",
		variant: "outline",
	},
};
