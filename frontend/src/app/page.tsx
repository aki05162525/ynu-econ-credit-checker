import { ChevronRight, GraduationCap, Users } from "lucide-react";
import { Card } from "@/components/ui/card";

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
				<Card className="group relative overflow-hidden border-2 border-border bg-card hover:border-primary transition-all duration-300 hover:shadow-lg cursor-pointer">
					<div className="p-8">
						<div className="flex items-center justify-between">
							<div className="space-y-2">
								<div className="flex items-center gap-3">
									<div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
										<Users className="w-6 h-6 text-primary" />
									</div>
									<div>
										<h3 className="text-xl font-bold text-card-foreground">
											全学教育科目
										</h3>
										<p className="text-2xl font-bold text-primary">34単位</p>
									</div>
								</div>
							</div>
							<ChevronRight className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
						</div>
					</div>
				</Card>
				<Card className="group relative overflow-hidden border-2 border-border bg-card hover:border-primary transition-all duration-300 hover:shadow-lg cursor-pointer">
					<div className="p-8">
						<div className="flex items-center justify-between">
							<div className="space-y-2">
								<div className="flex items-center gap-3">
									<div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
										<GraduationCap className="w-6 h-6 text-primary" />
									</div>
									<div>
										<h3 className="text-xl font-bold text-card-foreground">
											学部教育科目
										</h3>
										<p className="text-2xl font-bold text-primary">90単位</p>
									</div>
								</div>
							</div>
							<ChevronRight className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
						</div>
					</div>
				</Card>
			</div>
		</div>
	);
}
