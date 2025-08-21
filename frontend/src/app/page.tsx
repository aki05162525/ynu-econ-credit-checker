import { GraduationCap, University } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { SubjectCard } from "@/components/SubjectCard";

export default function Home() {
	return (
		<div className="min-h-screen p-8 space-y-8">
			<PageHeader
				title="単位を確認する"
				subtitle="確認したい科目の種類を選択してください。"
			/>
			<div className="grid gap-4 md:grid-cols-2">
				<SubjectCard title="全学教育科目" credits={34} icon={University} />
				<SubjectCard title="学部教育科目" credits={90} icon={GraduationCap} />
			</div>
		</div>
	);
}
