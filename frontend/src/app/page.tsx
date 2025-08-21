import { Button } from "@/components/Button/Button";

export default function Home() {
	return (
		<div className="min-h-screen p-8 space-y-6">
			<h1 className="text-3xl font-bold text-brand-ter mb-8">
				Tailwind カラーテスト
			</h1>
			<Button>実験</Button>
			{/* ブランドカラーボタン */}
			<div className="space-y-4">
				<button
					type="button"
					className="bg-brand text-white px-6 py-3 rounded-lg hover:bg-brand-sec transition-colors"
				>
					プライマリボタン (brand)
				</button>

				<button
					type="button"
					className="bg-brand-sec text-white px-6 py-3 rounded-lg hover:bg-brand transition-colors"
				>
					セカンダリボタン (brand-sec)
				</button>

				<button
					type="button"
					className="bg-brand-ter text-white px-6 py-3 rounded-lg hover:opacity-80 transition-opacity"
				>
					ターシャリボタン (brand-ter)
				</button>
			</div>

			{/* ステータスメッセージ */}
			<div className="space-y-3">
				<p className="text-success bg-white px-4 py-2 rounded border-l-4 border-success">
					✓ 登録に成功しました
				</p>
				<p className="text-error bg-white px-4 py-2 rounded border-l-4 border-error">
					✗ エラーが発生しました
				</p>
				<p className="text-warning bg-white px-4 py-2 rounded border-l-4 border-warning">
					⚠ 入力が不完全です
				</p>
			</div>

			{/* カラーパレット表示 */}
			<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
				<div className="bg-brand p-4 rounded text-white text-center">brand</div>
				<div className="bg-brand-sec p-4 rounded text-white text-center">
					brand-sec
				</div>
				<div className="bg-brand-ter p-4 rounded text-white text-center">
					brand-ter
				</div>
				<div className="bg-brand-bg p-4 rounded border text-brand-ter text-center">
					brand-bg
				</div>
			</div>
		</div>
	);
}
