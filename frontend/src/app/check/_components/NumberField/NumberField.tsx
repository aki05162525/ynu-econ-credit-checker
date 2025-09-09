import type { FieldMetadata } from "@conform-to/react";

export type NumberFieldProps = {
	field: FieldMetadata<number>;
	label: string;
};

export const NumberField = ({ field, label }: NumberFieldProps) => {
	return (
		<div>
			<label className="block text-sm font-bold mb-2">
				{label}
				<input
					type="number"
					key={field.key}
					name={field.name}
					defaultValue={field.initialValue}
					className="mt-1 block w-full px-3 py-2 border border-border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
					min="0"
				/>
			</label>
			<div className="text-error text-sm mt-1">{field.errors}</div>
		</div>
	);
};
