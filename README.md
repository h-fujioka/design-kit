# Design Kit - モダンなデザインシステム

Apple/Shopify風のデザイン原則に基づいた、洗練されたデザインシステムとUIコンポーネントライブラリです。

## ✨ 主な特徴

- **フレームワーク**: Next.js 15+ with App Router
- **スタイリング**: Tailwind CSS v4 + カスタムブランドカラーシステム
- **UIコンポーネント**: shadcn/ui + ブランドカラーバリアント
- **タイポグラフィ**: Inter フォントによる読みやすいテキスト
- **アイコン**: Lucide React による一貫したアイコン
- **アニメーション**: Framer Motion 対応のスムーズなインタラクション
- **開発者体験**: TypeScript, ESLint, Prettier with Tailwind plugin
- **パスエイリアス**: `@/*` によるクリーンなインポート

## 🎨 デザイン哲学

- **Apple風の美学**: クリーンなライン、豊富な余白、繊細なシャドウ
- **Shopify風のスペーシング**: 4pxベースの一貫したレイアウトシステム
- **モバイルファースト**: すべてのデバイスで美しく表示
- **ダークモード対応**: ライト/ダークテーマの切り替え

## 🚀 クイックスタート

1. **テンプレートをクローン**

   ```bash
   git clone <this-repo>
   cd my-app
   ```

2. **依存関係をインストール**

   ```bash
   pnpm install
   ```

3. **開発サーバーを起動**

   ```bash
   pnpm dev
   ```

4. **ブラウザで確認**
   [http://localhost:3000](http://localhost:3000) にアクセス

## 📦 利用可能なスクリプト

- `pnpm dev` - Turbopackを使用した開発サーバー起動
- `pnpm build` - 本番用ビルド
- `pnpm start` - 本番サーバー起動
- `pnpm lint` - ESLint実行
- `pnpm format` - Prettierによるコードフォーマット

## 🛠 技術スタック

- **Next.js 15** - App Router対応のReactフレームワーク
- **TypeScript** - 型安全性と開発者体験の向上
- **Tailwind CSS v4** - ユーティリティファーストCSSフレームワーク
- **shadcn/ui** - 美しくアクセシブルなUIコンポーネント
- **Lucide React** - クリーンで一貫したアイコン
- **Framer Motion** - 本番対応のモーションライブラリ
- **Inter** - モダンで読みやすいフォントファミリー

## 📁 プロジェクト構造

```
src/
├── app/                 # Next.js App Router
│   ├── globals.css     # グローバルスタイルとテーマ
│   ├── layout.tsx      # フォント設定を含むルートレイアウト
│   ├── page.tsx        # コンポーネントプレビュー付きホームページ
│   └── styleguide/     # スタイルガイドページ
│       └── page.tsx    # デザインシステムのデモ
├── components/
│   ├── ui/             # shadcn/uiコンポーネント
│   │   ├── button.tsx  # ブランドカラーバリアント対応
│   │   ├── card.tsx    # ブランドカラーバリアント対応
│   │   ├── badge.tsx   # ブランドカラーバリアント対応
│   │   ├── input.tsx   # ブランドカラーバリアント対応
│   │   ├── label.tsx   # ブランドカラーバリアント対応
│   │   ├── tabs.tsx    # ブランドカラーバリアント対応
│   │   ├── separator.tsx # ブランドカラーバリアント対応
│   │   ├── skeleton.tsx # ブランドカラーバリアント対応
│   │   └── dialog.tsx  # ブランドカラーバリアント対応
│   ├── container.tsx   # レイアウトコンテナ
│   ├── header.tsx      # ナビゲーションヘッダー
│   ├── footer.tsx      # サイトフッター
│   ├── page-shell.tsx  # ページラッパー
│   └── theme-toggle.tsx # ダークモード切り替え
└── lib/
    └── utils.ts        # ユーティリティ関数
```

## 🎨 ブランドカラーシステム

### カラーパレット

OKLCH色空間を使用した洗練されたブランドカラーパレット:

```css
/* ブランドカラー - Apple/Shopify風 */
--color-brand-50: oklch(0.97 0.005 240);   /* 最も明るい */
--color-brand-100: oklch(0.94 0.01 240);
--color-brand-200: oklch(0.87 0.02 240);
--color-brand-300: oklch(0.8 0.03 240);
--color-brand-400: oklch(0.67 0.04 240);
--color-brand-500: oklch(0.5 0.05 240);    /* メインカラー */
--color-brand-600: oklch(0.4 0.06 240);
--color-brand-700: oklch(0.32 0.05 240);
--color-brand-800: oklch(0.25 0.04 240);
--color-brand-900: oklch(0.18 0.03 240);   /* 最も暗い */
```

### コンポーネントバリアント

各UIコンポーネントにブランドカラーバリアントを追加:

- **Button**: `brand`, `brandOutline`, `brandGhost`, `brandLink`
- **Badge**: `brand`, `brandSecondary`, `brandOutline`
- **Card**: `brand`, `brandAccent`
- **Input**: `brand`, `error`
- **Label**: `brand`, `muted`, `required`
- **Tabs**: `brand`, `outline`
- **Separator**: `brand`, `muted`, `strong`
- **Skeleton**: `brand`, `muted`, `subtle`
- **Dialog**: `brand`, `elevated`

## 📏 スペーシングシステム

Shopify Polaris風の4pxベーススペーシング:

```css
/* 4pxベースのスペーシングスケール */
--spacing-100: 0.25rem;  /* 4px */
--spacing-200: 0.5rem;   /* 8px */
--spacing-300: 0.75rem;  /* 12px */
--spacing-400: 1rem;     /* 16px */
--spacing-600: 1.5rem;   /* 24px */
--spacing-800: 2rem;     /* 32px */
--spacing-1000: 2.5rem;  /* 40px */
--spacing-1600: 4rem;    /* 64px */
```

## 📝 タイポグラフィ

16px基準のクリーンなタイポグラフィスケール:

```css
/* タイポグラフィスケール - 16px基準 */
--text-xs: 0.75rem;    /* 12px */
--text-sm: 0.875rem;   /* 14px */
--text-base: 1rem;     /* 16px */
--text-lg: 1.125rem;   /* 18px */
--text-xl: 1.25rem;    /* 20px */
--text-2xl: 1.5rem;    /* 24px */
--text-3xl: 1.875rem;  /* 30px */
--text-4xl: 2.25rem;   /* 36px */
```

## 🔧 コンポーネントの追加

新しいshadcn/uiコンポーネントを追加:

```bash
pnpm dlx shadcn@latest add [component-name]
```

## 🌙 ダークモード

ダークモードが含まれており、ヘッダーのテーマ切り替えで切り替え可能です。システムはユーザーの設定を尊重し、スムーズな遷移を提供します。

## 📱 レスポンシブデザイン

モバイルファーストのブレークポイント:

- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

## 🎨 スタイルガイド

`/styleguide` ページでデザインシステムの全機能を確認できます:

- ブランドカラーパレット
- コンポーネントバリアント
- タイポグラフィスケール
- スペーシングシステム
- レイアウト例

## 🤝 コントリビューション

1. リポジトリをフォーク
2. 機能ブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add some amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

## 📄 ライセンス

MIT License - 詳細は [LICENSE](LICENSE) ファイルを参照してください。

## 💡 ヒント

- 一貫したページマージンには `Container` コンポーネントを使用
- `card-soft` クラスでApple風の繊細なシャドウを実現
- 一貫したレイアウトには拡張スペーシングスケールを活用
- すべてのコンポーネントは完全にアクセシブルでキーボードナビゲーション対応

---

**モダンなWeb開発のために ❤️ で構築**
