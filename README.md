# Next.js + Tailwind + shadcn/ui Starter

A clean, spacious, and ready-to-ship template built with modern web technologies and Apple-inspired design principles.

## ✨ Features

- **Framework**: Next.js 14+ with App Router
- **Styling**: Tailwind CSS v4 with custom Apple/Shopify-inspired design system
- **UI Components**: shadcn/ui with full component library
- **Typography**: Inter font for clean, readable text
- **Icons**: Lucide React for consistent iconography
- **Animations**: Framer Motion ready for smooth interactions
- **Developer Experience**: TypeScript, ESLint, Prettier with Tailwind plugin
- **Path Aliases**: Clean imports with `@/*` aliases

## 🎨 Design Philosophy

- **Apple-inspired aesthetics**: Clean lines, generous whitespace, subtle shadows
- **Shopify-inspired spacing**: Consistent, breathing room throughout the interface
- **Mobile-first responsive design**: Looks great on all devices
- **Dark mode support**: Toggle between light and dark themes

## 🚀 Quick Start

1. **Clone this template**

   ```bash
   git clone <this-repo>
   cd my-app
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Start development server**

   ```bash
   pnpm dev
   ```

4. **Open your browser**
   Visit [http://localhost:3000](http://localhost:3000)

## 📦 Available Scripts

- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm format` - Format code with Prettier

## 🛠 Tech Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety and better DX
- **Tailwind CSS v4** - Utility-first CSS framework
- **shadcn/ui** - Beautiful and accessible UI components
- **Lucide React** - Clean and consistent icons
- **Framer Motion** - Production-ready motion library
- **Inter** - Modern, readable font family

## 📁 Project Structure

```
src/
├── app/                 # Next.js App Router
│   ├── globals.css     # Global styles and theme
│   ├── layout.tsx      # Root layout with font setup
│   └── page.tsx        # Homepage with component previews
├── components/
│   ├── ui/             # shadcn/ui components
│   ├── container.tsx   # Layout container
│   ├── header.tsx      # Navigation header
│   ├── footer.tsx      # Site footer
│   ├── page-shell.tsx  # Page wrapper
│   └── theme-toggle.tsx # Dark mode toggle
└── lib/
    └── utils.ts        # Utility functions
```

## 🎨 Customization

### Colors

The design system includes a custom brand color palette. Modify the color variables in `src/app/globals.css`:

```css
/* Brand colors */
--color-brand-500: oklch(0.5 0.05 240);
/* Add your brand colors here */
```

### Spacing

Extended spacing scale for consistent layouts:

- `p-13` (3.25rem), `p-15` (3.75rem), `p-18` (4.5rem), `p-22` (5.5rem)

### Typography

Clean typography scale with Inter font:

- Headings: Bold/Semibold weights
- Body: Regular weight with proper line-height
- Small text: Muted color for hierarchy

## 🔧 Adding Components

Add new shadcn/ui components:

```bash
pnpm dlx shadcn@latest add [component-name]
```

## 🌙 Dark Mode

Dark mode is included and can be toggled via the theme toggle in the header. The system respects user preferences and provides smooth transitions.

## 📱 Responsive Design

The template is mobile-first with breakpoints:

- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

MIT License - see the [LICENSE](LICENSE) file for details.

## 💡 Tips

- Use the included `Container` component for consistent page margins
- The `card-soft` class provides Apple-inspired subtle shadows
- Leverage the extended spacing scale for consistent layouts
- All components are fully accessible and keyboard navigable

---

**Built with ❤️ for modern web development**
