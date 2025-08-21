import { Button } from "@/components/Button";

export default function Home() {
	return (
		<div className="min-h-screen p-8 space-y-8">
			<div className="space-y-4">
				<h1 className="text-2xl font-bold">単位を確認する</h1>
				<h2 className="text-base text-gray-600">
					確認したい科目の種類を選択してください。
				</h2>
			</div>
			<Button>実験</Button>
		</div>
	);
}
