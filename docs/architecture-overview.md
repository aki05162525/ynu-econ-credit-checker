# アーキテクチャ概要

## プロジェクト構成

```
frontend/src/
├── app/                    # Next.js App Router によるページ構成
│   ├── (pages)             # ルーティング用ページファイル
│   ├── _components/        # アプリケーション全体で使用されるコンポーネント
│   └── check/              # 単位チェック機能関連
│       ├── _actions/       # Server Actions（サーバーサイド処理）
│       ├── _schemas/       # バリデーションスキーマ
│       ├── _components/    # 機能固有のコンポーネント
│       └── (routes)/       # ルーティング用ページ
│
├── components/             # 共通UIコンポーネント
│   ├── ui/                 # 基本UIライブラリ
│   ├── common/             # 汎用コンポーネント
│   └── layout/             # レイアウト用コンポーネント
│
├── lib/                    # ビジネスロジック・ユーティリティ
│   ├── calculations/       # 計算処理
│   ├── constants/          # 定数定義
│   └── utils.ts            # 汎用ユーティリティ
│
└── types/                  # TypeScript型定義
```

## 設計原則

### 1. レイヤード・アーキテクチャ

- **プレゼンテーション層**: `app/` - ページとルーティング
- **コンポーネント層**: `components/` - 再利用可能なUI
- **ビジネスロジック層**: `lib/` - 計算処理と業務ルール
- **データ層**: `types/`, `_schemas/` - 型定義とバリデーション

### 2. コンポーネント分離戦略

```
グローバル共通           ローカル専用
components/    ←→    app/xxx/_components/
(再利用性高)          (機能特化)
```

**昇格基準**: 2つ以上のページで使用される場合、`_components/` から `components/` へ移動

### 3. 機能ベース組織化

各機能（例: `check/`）は独立したモジュールとして構成：

- **Pages**: ルーティングとページレイアウト
- **Actions**: サーバーサイド処理
- **Schemas**: データバリデーション
- **Components**: 機能固有のUI

## 技術スタック

- **フレームワーク**: Next.js 15 (App Router)
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS
- **テスト**: Vitest + React Testing Library
- **ドキュメント**: Storybook
- **バリデーション**: Zod
- **コード品質**: Biome

## ルーティング設計

```
/                           # ホーム
/check/
  ├── zengaku/             # 全学教育科目チェック
  │   └── result/          # 判定結果
  └── gakubu/              # 学部教育科目チェック
      └── result/          # 判定結果
```

## 開発方針

1. **型安全性**: 全ての処理でTypeScriptの型チェックを活用
2. **テスタビリティ**: 各コンポーネントと関数の単体テストを実装
3. **再利用性**: コンポーネントの責務を明確にし、適切な抽象化レベルを維持
4. **パフォーマンス**: コンポーネントの分割とServer Actionsによる最適化
5. **開発体験**: Storybook、Hot Reload、TypeScript Intellisenseによる効率的な開発環境