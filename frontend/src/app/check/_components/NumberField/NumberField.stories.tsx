import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import type { Meta, StoryObj } from "@storybook/react";
import { z } from "zod";
import { NumberField } from "./NumberField";

const testSchema = z.object({
	testField: z.number().min(0, "0以上で入力"),
});

const NumberFieldWrapper = ({
	label,
	defaultValue,
	hasError,
}: {
	label: string;
	defaultValue?: string;
	hasError?: boolean;
}) => {
	const [form, fields] = useForm({
		onValidate({ formData }) {
			return parseWithZod(formData, { schema: testSchema });
		},
		defaultValue: {
			testField: defaultValue,
		},
		...(hasError && {
			lastResult: {
				status: "error",
				error: {
					testField: ["0以上で入力"],
				},
			} as any,
		}),
	});

	return <NumberField field={fields.testField} label={label} />;
};

const meta = {
	component: NumberFieldWrapper,
	tags: ["autodocs"],
	argTypes: {
		defaultValue: { control: "text" },
		hasError: { control: "boolean" },
	},
} satisfies Meta<typeof NumberFieldWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		label: "人文科学系",
	},
};

export const WithValue: Story = {
	args: {
		label: "自然科学系",
		defaultValue: "8",
	},
};

export const WithError: Story = {
	args: {
		label: "英語",
		hasError: true,
	},
};
