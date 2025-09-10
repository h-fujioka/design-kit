/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        warning: {
          DEFAULT: "hsl(var(--warning))",
          foreground: "hsl(var(--warning-foreground))",
        },
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
        },
        info: {
          DEFAULT: "hsl(var(--info))",
          foreground: "hsl(var(--info-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Brand colors (Primitive tokens - for design system definition only)
        brand: {
          50: "oklch(0.97 0.005 240)",
          100: "oklch(0.94 0.01 240)",
          200: "oklch(0.87 0.02 240)",
          300: "oklch(0.8 0.03 240)",
          400: "oklch(0.67 0.04 240)",
          500: "oklch(0.5 0.05 240)",
          600: "oklch(0.4 0.06 240)",
          700: "oklch(0.32 0.05 240)",
          800: "oklch(0.25 0.04 240)",
          900: "oklch(0.18 0.03 240)",
        },
        // Semantic Colors - セマンティックカラー（brandカラーをextend）
        // Main Colors - メインカラー
        main: "oklch(0.4 0.06 240)", // brand-600
        mainForeground: "oklch(0.97 0.005 240)", // brand-50
        mainHover: "oklch(0.32 0.05 240)", // brand-700
        mainActive: "oklch(0.25 0.04 240)", // brand-800

        // Text Colors - テキストカラー
        textPrimary: "oklch(0.18 0.03 240)", // brand-900
        textSecondary: "oklch(0.32 0.05 240)", // brand-700
        textMuted: "oklch(0.5 0.05 240)", // brand-500
        textCaption: "oklch(0.67 0.04 240)", // brand-400

        // Link Colors - リンクカラー
        link: "oklch(0.4 0.06 240)", // brand-600
        linkHover: "oklch(0.32 0.05 240)", // brand-700
        linkVisited: "oklch(0.5 0.05 240)", // brand-500
        linkDisabled: "oklch(0.8 0.03 240)", // brand-300

        // Background Colors - 背景カラー
        backgroundPrimary: "oklch(0.97 0.005 240)", // brand-50
        backgroundSecondary: "oklch(0.94 0.01 240)", // brand-100
        backgroundTertiary: "oklch(0.87 0.02 240)", // brand-200
        backgroundElevated: "oklch(1 0 0)", // white

        // Simple elevated color for better usability
        elevated: "oklch(1 0 0)", // white
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}