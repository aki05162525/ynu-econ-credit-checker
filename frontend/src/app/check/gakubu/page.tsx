import { PageHeader } from "@/components/common/PageHeader";

export default function GakubuPage() {
	return (
		<div className="min-h-screen p-8 space-y-8">
			<PageHeader
				title="履修単位（学部教育科目）"
				subtitle="取得済みの単位を入力してください。"
			/>
		</div>
	);
}
