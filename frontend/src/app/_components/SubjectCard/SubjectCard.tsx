import { ChevronRight, type LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export type SubjectCardProps = {
	title: string;
	credits: number;
	icon: LucideIcon;
	onClick?: () => void;
	className?: string;
};

export const SubjectCard = ({
	title,
	credits,
	icon: Icon,
	onClick,
	className,
}: SubjectCardProps) => {
	return (
		<Card
			className={cn(
				"group relative overflow-hidden border-2 border-border bg-card hover:border-brand transition-all duration-300 hover:shadow-lg cursor-pointer",
				className,
			)}
			onClick={onClick}
		>
			<div className="p-8">
				<div className="flex items-center justify-between">
					<div className="space-y-2">
						<div className="flex items-center gap-3">
							<div className="w-12 h-12 rounded-full bg-brand-bg flex items-center justify-center">
								<Icon className="w-6 h-6 text-brand" />
							</div>
							<div>
								<h3 className="text-xl font-bold text-card-foreground">
									{title}
								</h3>
								<p className="text-base font-bold text-gray-600">
									{credits}単位
								</p>
							</div>
						</div>
					</div>
					<ChevronRight className="w-6 h-6 text-muted-foreground group-hover:text-brand transition-colors" />
				</div>
			</div>
		</Card>
	);
};
