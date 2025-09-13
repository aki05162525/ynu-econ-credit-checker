import type { Meta, StoryObj } from "@storybook/react";
import { formatShortageUnits, formatShortageUnitsMobile } from "./unitUtils";

// ラッパーコンポーネントを作成してStorybookで表示しやすくする
function UnitUtilsDemo() {
	return (
		<div className="p-4">
			<h2 className="text-xl font-bold mb-4">Unit Utils Functions</h2>
			<div className="space-y-3">
				<div>
					<h3 className="font-semibold text-lg">formatShortageUnits</h3>
					<p className="text-muted-foreground">
						デスクトップ表示用の不足単位フォーマット関数。不足がない場合は"-"を表示し、不足がある場合は太字で赤色の"数値単位"として表示します。
					</p>
				</div>
				<div>
					<h3 className="font-semibold text-lg">formatShortageUnitsMobile</h3>
					<p className="text-muted-foreground">
						モバイル表示用の不足単位フォーマット関数。デスクトップ版と同様の動作ですが、より軽量な表示スタイルを使用します。
					</p>
				</div>
			</div>
		</div>
	);
}

const meta = {
	title: "Utils/Unit Utils",
	component: UnitUtilsDemo,
	tags: ["autodocs"],
} satisfies Meta<typeof UnitUtilsDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FormatShortageUnits: Story = {
	render: () => (
		<div className="space-y-4">
			<h3 className="text-lg font-semibold">formatShortageUnits</h3>
			<div className="space-y-2">
				<div className="flex items-center gap-4">
					<span className="w-32 text-sm text-muted-foreground">
						不足なし (0):
					</span>
					{formatShortageUnits({ shortage: 0 })}
				</div>
				<div className="flex items-center gap-4">
					<span className="w-32 text-sm text-muted-foreground">2単位不足:</span>
					{formatShortageUnits({ shortage: 2 })}
				</div>
				<div className="flex items-center gap-4">
					<span className="w-32 text-sm text-muted-foreground">
						10単位不足:
					</span>
					{formatShortageUnits({ shortage: 10 })}
				</div>
			</div>
		</div>
	),
};

export const FormatShortageUnitsMobile: Story = {
	render: () => (
		<div className="space-y-4">
			<h3 className="text-lg font-semibold">formatShortageUnitsMobile</h3>
			<div className="space-y-2">
				<div className="flex items-center gap-4">
					<span className="w-32 text-sm text-muted-foreground">
						不足なし (0):
					</span>
					{formatShortageUnitsMobile({ shortage: 0 })}
				</div>
				<div className="flex items-center gap-4">
					<span className="w-32 text-sm text-muted-foreground">2単位不足:</span>
					{formatShortageUnitsMobile({ shortage: 2 })}
				</div>
				<div className="flex items-center gap-4">
					<span className="w-32 text-sm text-muted-foreground">
						10単位不足:
					</span>
					{formatShortageUnitsMobile({ shortage: 10 })}
				</div>
			</div>
		</div>
	),
};

export const Comparison: Story = {
	render: () => (
		<div className="space-y-6">
			<div>
				<h3 className="text-lg font-semibold mb-4">
					Desktop版 vs Mobile版 比較
				</h3>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<div>
						<h4 className="font-medium mb-2">Desktop版 (太字)</h4>
						<div className="space-y-2">
							<div className="flex items-center gap-2">
								<span className="text-sm text-muted-foreground">不足なし:</span>
								{formatShortageUnits({ shortage: 0 })}
							</div>
							<div className="flex items-center gap-2">
								<span className="text-sm text-muted-foreground">
									2単位不足:
								</span>
								{formatShortageUnits({ shortage: 2 })}
							</div>
						</div>
					</div>

					<div>
						<h4 className="font-medium mb-2">Mobile版 (標準)</h4>
						<div className="space-y-2">
							<div className="flex items-center gap-2">
								<span className="text-sm text-muted-foreground">不足なし:</span>
								{formatShortageUnitsMobile({ shortage: 0 })}
							</div>
							<div className="flex items-center gap-2">
								<span className="text-sm text-muted-foreground">
									2単位不足:
								</span>
								{formatShortageUnitsMobile({ shortage: 2 })}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	),
};
