interface UnitDisplayProps {
	shortage: number;
}

export function formatShortageUnits({ shortage }: UnitDisplayProps) {
	if (shortage === 0) {
		return "-";
	}

	return (
		<span className="text-red-600 dark:text-red-400 font-medium">
			{shortage}単位
		</span>
	);
}

export function formatShortageUnitsMobile({ shortage }: UnitDisplayProps) {
	if (shortage === 0) {
		return "-";
	}

	return <span className="text-red-600 dark:text-red-400">{shortage}単位</span>;
}
