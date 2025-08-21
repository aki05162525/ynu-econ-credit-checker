# ディレクトリ構成

## 基本構成

```
frontend/src/
├── app/
│   ├── layout.tsx               # 全ページ共通レイアウト
│   ├── page.tsx                 # ホーム画面 (/)
│   ├── globals.css              # Tailwind・ブランドカラー
│   │
│   │
│   └── check/
│       ├── [category]/          # /check/zengaku, /check/gakubu など
│       │   ├── page.tsx         # 単位入力画面
│       │   └── result/
│       │       └── page.tsx     # 判定結果画面
│       │
│       └── _components/         # checkページ専用コンポーネント
│           └── [ComponentName]/     # 各ページ固有コンポーネント
│               ├── Component.tsx
│               ├── Component.stories.tsx
│               └── index.ts
│
├── components/                  # 全ページ横断で再利用される共通UIコンポーネント
│   ├── ui/                      # 基本UIコンポーネント（shadcn/ui準拠）
│   ├── [ComponentName]/         # 各コンポーネント
│   │   ├── Component.tsx
│   │   ├── Component.stories.tsx
│   │   └── index.ts
│   └── common/                  # 共通機能コンポーネント
│
├── lib/                         # 共通関数・ビジネスロジック
│   ├── calculations/            # 計算ロジック
│   │   ├── credits.ts           # 単位計算メイン
│   │   ├── graduation.ts        # 卒業要件チェック
│   │   └── gpa.ts               # GPA計算
│   │
│   ├── utils/                   # ユーティリティ関数
│   │   ├── format.ts            # 判定結果の整形
│   │   ├── validation.ts        # 入力値バリデーション
│   │   └── storage.ts           # ローカルストレージ操作
│   │
│   └── constants/               # 定数定義
│       ├── creditRequirements.ts # 卒業要件定数
│       ├── categories.ts        # カテゴリ定義
│       └── messages.ts          # エラー・成功メッセージ
│
├── types/                       # TypeScript型定義
│   ├── check.ts                 # 単位チェック関連型
│   ├── calculation.ts           # 計算関連型
│   ├── api.ts                   # API関連型
│   └── common.ts                # 共通型定義
│
└── hooks/                       # カスタムフック（将来用）
    ├── useCalculation.ts        # 計算ロジック用フック
    ├── useLocalStorage.ts       # ローカルストレージ用フック
    └── useForm.ts               # フォーム管理用フック
```

## ルーティング

```
/                    # ホーム画面
/check/zengaku       # 全学共通科目の単位入力
/check/zengaku/result # 判定結果
/check/gakubu        # 学部専門科目の単位入力
/check/gakubu/result  # 判定結果
```

## 設計方針

### コンポーネント組織戦略

#### 1. 責務による分離
- **`components/`**: 全ページ横断で再利用される共通UIコンポーネント
- **`app/xxx/_components/`**: 特定のページ・機能でのみ使用されるコンポーネント

#### 2. メリット
- **再利用性の明確化**: どのコンポーネントが共通か一目瞭然
- **責務の分離**: ページ固有の変更が他ページに影響しない
- **依存関係の明確化**: コンポーネント間の関係が整理される
- **メンテナンス性**: 修正範囲が特定しやすい

#### 3. 昇格ルール
`_components/` → `components/` への移行基準：
- 2つ以上のページで同じコンポーネントが必要になった場合
- 将来的な再利用の可能性が高い場合
- UIデザインシステムの一部として位置づけられる場合

#### 4. コンポーネント構成
各コンポーネントは以下の構成：
```
ComponentName/
├── ComponentName.tsx        # メインコンポーネント
├── ComponentName.stories.tsx # Storybook用ストーリー
└── index.ts                 # re-export
```

### その他の設計方針

- **app/**: Next.js App Router によるページ管理
- **lib/**: ビジネスロジックと純粋関数を機能別に分類
- **types/**: 型安全性の確保
- **[category]**: 動的ルートで柔軟なカテゴリ対応
