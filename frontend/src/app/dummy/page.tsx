"use client";

import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { useActionState } from "react";
import { login } from "./action";
import { loginSchema } from "./shema";

export default function LoginForm() {
	const [lastResult, action] = useActionState(login, undefined);
	const [form, fields] = useForm({
		lastResult,
		onValidate({ formData }) {
			return parseWithZod(formData, { schema: loginSchema });
		},

		// blurイベント発生時にフォームを検証する
		shouldValidate: "onBlur",
		shouldRevalidate: "onInput",
	});

	return (
		<form id={form.id} onSubmit={form.onSubmit} action={action} noValidate>
			<div>
				<label>
					Email
					<input
						type="email"
						key={fields.email.key}
						name={fields.email.name}
						defaultValue={fields.email.initialValue}
					/>
				</label>

				<div>{fields.email.errors}</div>
			</div>
			<div>
				<label>
					Password
					<input
						type="password"
						key={fields.password.key}
						name={fields.password.name}
						defaultValue={fields.password.initialValue}
					/>
				</label>

				<div>{fields.password.errors}</div>
			</div>
			<label>
				<div>
					<span>Remember me</span>
					<input
						type="checkbox"
						key={fields.remember.key}
						name={fields.remember.name}
						defaultChecked={fields.remember.initialValue === "on"}
					/>
				</div>
			</label>
			<button type="submit">Login</button>
		</form>
	);
}
