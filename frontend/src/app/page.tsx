import { GraduationCap, University } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { SUBJECT_CATEGORIES } from "@/lib/constants/creditRequirements";
import { SubjectCard } from "./_components/SubjectCard";

export default function Home() {
	return (
		<div className="min-h-screen p-8 space-y-8">
			<PageHeader
				title="単位を確認する"
				subtitle="確認したい科目の種類を選択してください。"
			/>
			<div className="grid gap-4 md:grid-cols-2">
				<SubjectCard
					title={SUBJECT_CATEGORIES.GENERAL_EDUCATION.title}
					credits={SUBJECT_CATEGORIES.GENERAL_EDUCATION.credits}
					icon={University}
				/>
				<SubjectCard
					title={SUBJECT_CATEGORIES.FACULTY_EDUCATION.title}
					credits={SUBJECT_CATEGORIES.FACULTY_EDUCATION.credits}
					icon={GraduationCap}
				/>
			</div>
		</div>
	);
}
