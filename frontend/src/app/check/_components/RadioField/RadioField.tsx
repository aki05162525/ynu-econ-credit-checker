import type { FieldMetadata } from "@conform-to/react";

export type RadioFieldProps = {
	field: FieldMetadata<string>;
	label: string;
	options: Array<{
		value: string;
		label: string;
	}>;
};

export const RadioField = ({ field, label, options }: RadioFieldProps) => {
	return (
		<div>
			<div className="block text-sm font-bold mb-2">{label}</div>
			<div className="space-y-2">
				{options.map((option) => (
					<label key={option.value} className="flex items-center">
						<input
							type="radio"
							key={field.key}
							name={field.name}
							value={option.value}
							defaultChecked={field.initialValue === option.value}
							className="mr-2"
						/>
						{option.label}
					</label>
				))}
			</div>
			<div className="text-error text-sm mt-1">{field.errors}</div>
		</div>
	);
};
