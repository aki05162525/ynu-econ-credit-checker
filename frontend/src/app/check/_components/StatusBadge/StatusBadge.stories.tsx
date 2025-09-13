import type { Meta, StoryObj } from "@storybook/react";
import { StatusBadge } from "./StatusBadge";

const meta = {
	title: "Components/StatusBadge",
	component: StatusBadge,
	tags: ["autodocs"],
	argTypes: {
		isOk: { control: "boolean" },
	},
} satisfies Meta<typeof StatusBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {
	args: {
		isOk: true,
	},
};

export const Failed: Story = {
	args: {
		isOk: false,
	},
};

export const InTable: Story = {
	args: {
		isOk: true,
	},
	decorators: [
		(Story) => (
			<div className="p-4 border rounded-lg">
				<table className="w-full">
					<thead>
						<tr className="border-b">
							<th className="text-left p-2">科目</th>
							<th className="text-left p-2">判定</th>
							<th className="text-left p-2">取得単位</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td className="p-2">人文・社会科学系</td>
							<td className="p-2">
								<Story />
							</td>
							<td className="p-2">8単位</td>
						</tr>
					</tbody>
				</table>
			</div>
		),
	],
};
