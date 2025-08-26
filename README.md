# Design Kit - モダンなデザインシステム

Apple/Shopify風のデザイン原則に基づいた、洗練されたデザインシステムとUIコンポーネントライブラリです。

## ✨ 主な特徴

- **フレームワーク**: Next.js 15+ with App Router
- **スタイリング**: Tailwind CSS v4 + カスタムブランドカラーシステム
- **UIコンポーネント**: shadcn/ui + ブランドカラーバリアント
- **タイポグラフィ**: システムフォントスタックによる読みやすいテキスト
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
- **システムフォントスタック** - 各OSに最適化されたフォントファミリー

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

16px基準のクリーンなタイポグラフィスケール（システムフォントスタック）:

```css
/* システムフォントスタック */
--font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;

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

## 🚀 プロトタイプ作成ルール

### ディレクトリ構造
```
src/app/
├── page.tsx                    # プロトタイプ一覧（ホーム）
├── styleguide/
│   └── page.tsx               # デザインシステム展示
├── prototypes/                # プロトタイプ専用ディレクトリ
│   ├── admin-dashboard/
│   │   └── page.tsx
│   ├── e-commerce/
│   │   └── page.tsx
│   └── user-profile/
│       └── page.tsx
```

### ファイル命名ルール
- **ディレクトリ名**: kebab-case（例: `admin-dashboard`, `user-profile`）
- **コンポーネント名**: PascalCase（例: `AdminDashboard`, `UserProfile`）
- **ページファイル**: `page.tsx`（Next.js App Router規約）

### コンポーネント使用ルール
```typescript
// ✅ 推奨: ブランドバリアントを優先使用
<Button variant="brand">Primary Action</Button>
<Card variant="brand">Content</Card>
<Badge variant="brand">Status</Badge>

// ❌ 避ける: デフォルトバリアントの多用
<Button>Primary Action</Button>
<Card>Content</Card>
```

### レイアウトルール
```typescript
// ✅ 推奨: PageShellとHeader/Footerの使用
export default function PrototypePage() {
  return (
    <>
      <Header />
      <PageShell>
        {/* プロトタイプコンテンツ */}
      </PageShell>
      <Footer />
    </>
  );
}
```

### スタイリングルール
- **4pxグリッドスペーシング**: `space-4`, `gap-4`, `p-4`などを使用
- **ブランドカラー優先**: `brand-*`クラスを積極的に使用
- **レスポンシブデザイン**: `md:`, `lg:`プレフィックスを使用
- **ダークモード対応**: すべてのコンポーネントでダークモードを考慮

### プロトタイプ追加手順
1. **ディレクトリ作成**: `src/app/prototypes/[prototype-name]/`
2. **ページ作成**: `page.tsx`ファイルを作成
3. **ルート画面更新**: プロトタイプ一覧に追加
4. **README更新**: プロトタイプの説明を追加

### アクセシビリティルール
- **ARIA属性**: 適切な`aria-*`属性を使用
- **キーボードナビゲーション**: フォーカス管理を考慮
- **セマンティックHTML**: 適切なHTML要素を使用
- **コントラスト比**: ブランドカラーでも十分なコントラストを確保

### Git管理ルール
```bash
# プロトタイプ追加時
git add src/app/prototypes/[prototype-name]/
git commit -m "feat: [PrototypeName]プロトタイプを追加"

# スタイル更新時
git commit -m "style: [PrototypeName]のスタイルを改善"
```

---

**モダンなWeb開発のために ❤️ で構築**
