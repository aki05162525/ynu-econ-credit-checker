import { GraduationCap, University } from "lucide-react";
import { SubjectCard } from "@/components/SubjectCard";

export default function Home() {
	return (
		<div className="min-h-screen p-8 space-y-8">
			<div className="space-y-4">
				<h1 className="text-2xl font-bold">単位を確認する</h1>
				<h2 className="text-base text-gray-600">
					確認したい科目の種類を選択してください。
				</h2>
			</div>
			<div className="grid gap-4 md:grid-cols-2">
				<SubjectCard title="全学教育科目" credits={34} icon={University} />
				<SubjectCard title="学部教育科目" credits={90} icon={GraduationCap} />
			</div>
		</div>
	);
}
