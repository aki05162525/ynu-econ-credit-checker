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
			// srcディレクトリのみを対象にする（これが最重要）
			include: ["src/**/*.{ts,tsx,js,jsx}"],
			// 必要最小限の除外
			exclude: [
				...coverageConfigDefaults.exclude,
				"**/*.stories.{ts,tsx,js,jsx}",
				"**/*.test.{ts,tsx,js,jsx}",
				"**/*.spec.{ts,tsx,js,jsx}",
				"**/index.{ts,tsx,js,jsx}",
			],
		},
	},
});
