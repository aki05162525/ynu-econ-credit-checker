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
│       └── _components/         # check機能専用コンポーネント
│           ├── CategoryForm.tsx
│           ├── ResultCard.tsx
│           └── ProgressBar.tsx
│
├── components/                  # 全体共通UIコンポーネント
│   ├── ui/                      # 基本UIコンポーネント
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   └── Input.tsx
│   │
│   ├── layout/                  # レイアウト関連
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Navbar.tsx
│   │
│   └── common/                  # 共通機能コンポーネント
│       ├── LoadingSpinner.tsx
│       └── ErrorBoundary.tsx
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

- **app/**: Next.js App Router によるページ管理
- **components/**: 再利用可能な UI コンポーネント
- **lib/**: ビジネスロジックと純粋関数を機能別に分類
- **types/**: 型安全性の確保
- **[category]**: 動的ルートで柔軟なカテゴリ対応
