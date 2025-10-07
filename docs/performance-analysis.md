# パフォーマンス分析レポート

## 調査概要

- **調査日時**: 2025-10-07
- **対象機能**: 全学教育科目フォーム送信および結果表示
- **調査方法**: Chrome DevTools Performance Trace、JavaScript計測

## 実測データ

### LCP (Largest Contentful Paint)
- **トップページ (http://localhost:3000/)**: 199ms ✓ 良好
  - TTFB: 75ms
  - レンダー遅延: 124ms
  - CLS: 0.00 (完璧)

### フォーム送信処理
- **ボタンクリックから画面遷移まで**: 147.20ms
  - 技術的には高速
  - ネットワークリクエスト: エラーなし
  - コンソールエラー: なし

## 問題点の分析

### 1. 体感速度の問題

#### 現象
ユーザーが「次へ」ボタンをクリックしても、処理が遅く感じられる

#### 原因
**視覚的フィードバックの欠如**

- ボタンクリック時の状態変化がない
- ローディングインジケーターがない
- Server Action実行中もUIが静的なまま

関連ファイル:
- `frontend/src/app/check/zengaku/page.tsx:76-81` - ボタン実装
- `frontend/src/app/check/_actions/zengaku.ts:7-23` - Server Action

#### 影響
実際の処理時間は147msと高速だが、ユーザーは「何も起きていない」と感じる

### 2. 計算処理のボトルネック

#### 現在のアーキテクチャ

```
[フォーム送信]
  ↓
[Server Action: バリデーションのみ]
  ↓
[redirect('/check/zengaku/result')]
  ↓
[結果ページ読み込み]
  ↓
[useEffect実行]
  ↓
[localStorage読み込み]
  ↓
[計算実行: judgeZengaku()]
  ↓
[結果表示]
```

#### 問題点

**a) クライアントサイドでの計算実行**
- 場所: `frontend/src/app/check/zengaku/result/page.tsx:26-41`
- `useEffect`内で計算が実行される
- ページロード後に追加の処理時間が発生

**b) localStorage経由のデータ受け渡し**
- フォームページ: `frontend/src/app/check/zengaku/page.tsx:24-27`
- 結果ページ: `frontend/src/app/check/zengaku/result/page.tsx:28-32`
- データの往復が発生

**c) 2段階の状態管理**
```javascript
const [result, setResult] = useState<ZengakuResultV1 | null>(null);
```
- 初期状態: `null` → "読み込み中..."表示
- useEffect実行後: 計算結果 → 実際の結果表示

#### 計算ロジックの分析

`frontend/src/lib/calculations/zengaku.ts:46-129`

計算自体は軽量:
- 単純な算術演算のみ
- ループなし
- 非同期処理なし
- O(1)の時間計算量

**問題は実行タイミング**であり、計算の複雑さではない

### 3. パフォーマンスの測定

#### Critical Rendering Path

```
ページリクエスト
  ↓ (サーバー処理)
HTML受信 ← TTFB: 75ms
  ↓ (パース・レンダリング)
初回レンダリング ← Render delay: 124ms
  ↓
useEffect実行
  ↓
localStorage読み込み + 計算
  ↓
再レンダリング ← ここで実際の結果が表示される
```

ユーザーは初回レンダリング後も「読み込み中...」を見ることになる

## 改善提案

### 提案1: Server Actionで計算 + URLパラメータで結果を渡す (推奨) 🚀

#### 実装概要

**変更ファイル: `frontend/src/app/check/_actions/zengaku.ts`**

```typescript
"use server";

import { parseWithZod } from "@conform-to/zod";
import { redirect } from "next/navigation";
import { judgeZengaku } from "@/lib/calculations/zengaku";
import { zengakuSchema } from "../_schemas/zengaku";

export async function submitZengakuForm(
  _prevState: unknown,
  formData: FormData,
) {
  const submission = parseWithZod(formData, {
    schema: zengakuSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  // サーバー側で計算を実行
  const result = judgeZengaku(submission.value);

  // 結果をBase64エンコードしてURLに含める
  const encodedResult = Buffer.from(JSON.stringify(result)).toString('base64');

  redirect(`/check/zengaku/result?data=${encodedResult}`);
}
```

**変更ファイル: `frontend/src/app/check/zengaku/result/page.tsx`**

```typescript
type PageProps = {
  searchParams: { data?: string };
};

export default function ZengakuResultPage({ searchParams }: PageProps) {
  let result: ZengakuResultV1 | null = null;
  let error: string | null = null;

  try {
    if (searchParams.data) {
      // URLパラメータから結果を取得
      const decoded = Buffer.from(searchParams.data, 'base64').toString();
      result = JSON.parse(decoded);
    } else {
      // フォールバック: localStorage
      const storedData = localStorage.getItem("zengaku-credits");
      if (storedData) {
        const formData = JSON.parse(storedData);
        result = judgeZengaku(formData);
      } else {
        error = "データが見つかりません";
      }
    }
  } catch (err) {
    error = "データの読み込みに失敗しました";
    console.error("Error loading data:", err);
  }

  // useEffectなし、即座にレンダリング
  // ...
}
```

#### メリット

- ✅ **最速**: サーバーで計算完了後に遷移
- ✅ **初回レンダリングで完全な結果**: useEffectの待機なし
- ✅ **SSR対応**: Server Componentとして実装可能
- ✅ **ブラウザバック対応**: URLに結果が含まれる
- ✅ **localStorage依存排除**: より堅牢

#### デメリット

- ⚠️ URL長が増加（ただし結果データは小さいため問題なし）
- ⚠️ URLに結果が含まれる（機密性は低いため問題なし）

#### 期待される効果

**Before:**
```
ページ遷移 → HTML受信 → 初回レンダリング("読み込み中")
  → useEffect → 計算 → 再レンダリング(結果)
```

**After:**
```
計算完了 → ページ遷移 → HTML受信(結果含む) → 初回レンダリング(結果)
```

**削減できる時間**: useEffect実行 + 再レンダリングの時間（推定: 50-100ms）

### 提案2: Server Componentで計算 ⚡

#### 実装概要

結果ページを完全なServer Componentとして実装

```typescript
// app/check/zengaku/result/page.tsx
import { judgeZengaku } from "@/lib/calculations/zengaku";

type PageProps = {
  searchParams: { data: string };
};

export default async function ZengakuResultPage({ searchParams }: PageProps) {
  const formData = JSON.parse(
    Buffer.from(searchParams.data, 'base64').toString()
  );
  const result = judgeZengaku(formData);

  return <ResultView result={result} />;
}
```

#### メリット

- ✅ サーバーサイドレンダリング
- ✅ 完全なHTMLが初回から提供される
- ✅ JavaScript無効でも動作

#### デメリット

- ⚠️ 結果ページのインタラクティブな要素に制約
- ⚠️ Client Componentとの分離が必要

### 提案3: 計算結果のメモ化（簡易版）💡

#### 実装概要

現在のアーキテクチャを維持しつつ、キャッシュを追加

```typescript
useEffect(() => {
  try {
    const storedData = localStorage.getItem("zengaku-credits");
    if (!storedData) {
      setError("データが見つかりません");
      return;
    }

    const formData: ZengakuFormData = JSON.parse(storedData);

    // キャッシュキーを生成
    const cacheKey = `zengaku-result-${JSON.stringify(formData)}`;
    const cached = localStorage.getItem(cacheKey);

    if (cached) {
      // キャッシュから取得
      setResult(JSON.parse(cached));
    } else {
      // 計算してキャッシュ
      const judgmentResult = judgeZengaku(formData);
      localStorage.setItem(cacheKey, JSON.stringify(judgmentResult));
      setResult(judgmentResult);
    }
  } catch (err) {
    setError("データの読み込みに失敗しました");
    console.error("Error loading data:", err);
  }
}, []);
```

#### メリット

- ✅ 最小限の変更
- ✅ 2回目以降のアクセスが高速化

#### デメリット

- ⚠️ 初回アクセスは改善されない
- ⚠️ useEffectの遅延は残る
- ⚠️ localStorage容量を追加消費

### 提案4: UIフィードバックの改善 🎨

#### 実装概要

計算速度を改善できない場合でも、体感速度を向上

**ボタンコンポーネントの作成**

```typescript
// components/SubmitButton.tsx
"use client";

import { useFormStatus } from "react-dom";

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-brand text-white py-2 px-4 rounded-md hover:bg-brand-sec focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
    >
      {pending ? (
        <span className="flex items-center justify-center gap-2">
          <LoadingSpinner />
          処理中...
        </span>
      ) : (
        "次へ"
      )}
    </button>
  );
}
```

**フォームページで使用**

```typescript
// app/check/zengaku/page.tsx
import { SubmitButton } from "@/components/SubmitButton";

export default function ZengakuPage() {
  // ...
  return (
    <form id={form.id} onSubmit={form.onSubmit} action={action}>
      {/* ... */}
      <SubmitButton />
    </form>
  );
}
```

#### メリット

- ✅ 即座にフィードバックを提供
- ✅ 実装が簡単
- ✅ 他の提案と併用可能

#### デメリット

- ⚠️ 実際の処理時間は変わらない

## 推奨される実装順序

### Phase 1: UIフィードバック（即座に実装可能）
1. `SubmitButton`コンポーネントの作成
2. ローディング状態の表示

**所要時間**: 30分
**効果**: 体感速度の改善

### Phase 2: サーバー側計算（根本的な改善）
1. Server Actionで`judgeZengaku()`を実行
2. 結果をURLパラメータで渡す
3. 結果ページから`useEffect`を削除

**所要時間**: 1-2時間
**効果**: 実際の処理速度の改善（50-100ms短縮）

### Phase 3: Server Component化（オプション）
1. 結果ページを完全なServer Componentに変換
2. インタラクティブな部分を別コンポーネント化

**所要時間**: 2-3時間
**効果**: さらなる最適化、SEO向上

## 期待される効果まとめ

| 項目 | 現在 | Phase 1後 | Phase 2後 | Phase 3後 |
|------|------|-----------|-----------|-----------|
| フォーム送信時間 | 147ms | 147ms | 147ms | 147ms |
| 体感速度 | 遅い | 改善 | 大幅改善 | 最良 |
| 結果表示までの時間 | useEffect + 計算 | useEffect + 計算 | 即座 | 即座（SSR） |
| ユーザー満足度 | 低 | 中 | 高 | 最高 |
| 実装難易度 | - | 低 | 中 | 高 |

## 結論

**推奨アプローチ**: Phase 1（UIフィードバック）と Phase 2（サーバー側計算）の組み合わせ

この組み合わせにより:
- 即座にユーザー体験が改善される（Phase 1）
- 根本的なパフォーマンス向上が達成される（Phase 2）
- 実装コストが適切（合計2-3時間）

Phase 3は必要に応じて将来的に実装することを推奨します。
