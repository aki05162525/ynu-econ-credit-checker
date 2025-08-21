import type { Preview } from "@storybook/nextjs";
import React from "react";
import "../src/app/globals.css";

const preview: Preview = {
	parameters: {
		layout: "centered",
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
	},
	decorators: [
		(Story) =>
			React.createElement(
				"div",
				{ className: "max-w-2xl mx-auto" },
				React.createElement(Story),
			),
	],
};

export default preview;
