import react from "@vitejs/plugin-react";
import { coverageConfigDefaults, defineConfig } from "vitest/config";

export default defineConfig({
	plugins: [react()],
	test: {
		environment: "jsdom",
		setupFiles: "./vitest.setup.ts",
		globals: true,
		coverage: {
			provider: "v8",
			reporter: ["text", "json", "html"],
			include: ["src/**/*.{ts,tsx,js,jsx}"],
			exclude: [
				...coverageConfigDefaults.exclude,
				"**/*.stories.{ts,tsx,js,jsx}",
				"**/*.test.{ts,tsx,js,jsx}",
				"**/index.{ts,tsx,js,jsx}",
				"src/components/ui/**", // shadcn/ui コンポーネントを除外
			],
		},
	},
});
