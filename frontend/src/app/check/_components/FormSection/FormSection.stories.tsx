import type { Meta, StoryObj } from "@storybook/react";
import { FormSection } from "./FormSection";

const meta = {
	component: FormSection,
	tags: ["autodocs"],
} satisfies Meta<typeof FormSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		title: "基礎科目",
		children: (
			<div className="space-y-2">
				<div>人文科学系: 8単位</div>
				<div>自然科学系: 6単位</div>
				<div>全学教育その他: 4単位</div>
			</div>
		),
	},
};

export const WithForm: Story = {
	args: {
		title: "外国語科目",
		children: (
			<div className="space-y-4">
				<div>
					<label className="block text-sm font-bold mb-2">
						英語
						<input
							type="number"
							className="mt-1 block w-full px-3 py-2 border border-border rounded-md"
							defaultValue="4"
						/>
					</label>
				</div>
				<div>
					<label className="block text-sm font-bold mb-2">
						初修外国語
						<input
							type="number"
							className="mt-1 block w-full px-3 py-2 border border-border rounded-md"
							defaultValue="2"
						/>
					</label>
				</div>
			</div>
		),
	},
};

export const Empty: Story = {
	args: {
		title: "高度全学教育指定科目",
		children: <div className="text-muted-foreground">項目がありません</div>,
	},
};
