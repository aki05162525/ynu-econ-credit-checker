import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import type { Meta, StoryObj } from "@storybook/react";
import { z } from "zod";
import { RadioField } from "./RadioField";

const testSchema = z.object({
	testField: z.enum(["unfinished", "completed"], {
		required_error: "履修状況を選択してください",
	}),
});

type RadioFieldWrapperProps = {
	label: string;
	options: Array<{ value: string; label: string }>;
	defaultValue?: string;
	hasError?: boolean;
};

const RadioFieldWrapper = ({
	label,
	options,
	defaultValue,
	hasError,
}: RadioFieldWrapperProps) => {
	const [_form, fields] = useForm({
		onValidate({ formData }) {
			return parseWithZod(formData, { schema: testSchema });
		},
		defaultValue: {
			testField: defaultValue,
		},
		...(hasError && {
			lastResult: {
				status: "error" as const,
				error: {
					testField: ["履修状況を選択してください"],
				},
			},
		}),
	});

	return (
		<RadioField field={fields.testField} label={label} options={options} />
	);
};

const meta = {
	component: RadioFieldWrapper,
	tags: ["autodocs"],
	argTypes: {
		defaultValue: { control: "text" },
		hasError: { control: "boolean" },
	},
} satisfies Meta<typeof RadioFieldWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

const advancedEducationOptions = [
	{ value: "unfinished", label: "未修了" },
	{ value: "completed", label: "修了済み" },
];

export const Default: Story = {
	args: {
		label: "履修状況",
		options: advancedEducationOptions,
	},
};

export const WithSelectedValue: Story = {
	args: {
		label: "履修状況",
		options: advancedEducationOptions,
		defaultValue: "completed",
	},
};

export const WithError: Story = {
	args: {
		label: "履修状況",
		options: advancedEducationOptions,
		hasError: true,
	},
};
