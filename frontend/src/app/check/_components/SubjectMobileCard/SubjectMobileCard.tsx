import { StatusBadge } from "../StatusBadge";
import { formatShortageUnitsMobile } from "../unitUtils";

interface SubjectData {
	have: number;
	need: number;
	ok: boolean;
	surplus: number;
	shortage: number;
}

interface SubjectMobileCardProps {
	name: string;
	data: SubjectData;
}

export function SubjectMobileCard({ name, data }: SubjectMobileCardProps) {
	return (
		<div className="border border-brand/20 rounded-lg p-4 space-y-3 bg-card">
			<div className="flex items-center justify-between">
				<h3 className="font-semibold text-brand">{name}</h3>
				<StatusBadge isOk={data.ok} />
			</div>
			<div className="grid grid-cols-3 gap-2 text-sm">
				<div className="text-center">
					<div className="text-muted-foreground">取得</div>
					<div className="font-medium">{data.have}単位</div>
				</div>
				<div className="text-center">
					<div className="text-muted-foreground">不足</div>
					<div className="font-medium">
						{formatShortageUnitsMobile({
							shortage: data.shortage,
						})}
					</div>
				</div>
				<div className="text-center">
					<div className="text-muted-foreground">余剰</div>
					<div className="font-medium">{data.surplus}単位</div>
				</div>
			</div>
		</div>
	);
}
