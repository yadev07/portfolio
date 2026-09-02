import type { Config } from "tailwindcss";

/**
 * Design tokens — "Ink & Saffron"
 *
 * A deep indigo-ink base with warm paper-white text and a single saffron accent.
 * The warm/cool tension between `paper` and `ink` is the signature of the page;
 * saffron is reserved for interaction, emphasis and state — never for decoration.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#090D16",
          900: "#0E1320",
          850: "#121829",
          800: "#151C2E",
          700: "#1E2740",
          600: "#2A3550",
        },
        paper: {
          DEFAULT: "#E8E4DA",
          dim: "#C6C2B9",
        },
        haze: {
          DEFAULT: "#8A93A8",
          dim: "#6B7488",
        },
        saffron: {
          DEFAULT: "#E0A458",
          soft: "#F0C48C",
          deep: "#B9793A",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Newsreader", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Manrope", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "ui-monospace", "monospace"],
      },
      fontSize: {
        "display-xl": ["clamp(2.5rem, 8.5vw, 6.5rem)", { lineHeight: "0.95", letterSpacing: "-0.03em" }],
        "display-lg": ["clamp(2rem, 5vw, 3.5rem)", { lineHeight: "1.04", letterSpacing: "-0.02em" }],
        "display-md": ["clamp(1.625rem, 3.2vw, 2.375rem)", { lineHeight: "1.12", letterSpacing: "-0.015em" }],
        "display-sm": ["clamp(1.25rem, 2vw, 1.5rem)", { lineHeight: "1.25", letterSpacing: "-0.01em" }],
      },
      maxWidth: {
        prose: "62ch",
        shell: "76rem",
      },
      borderRadius: {
        card: "14px",
      },
      boxShadow: {
        panel: "0 1px 0 0 rgba(255,255,255,0.04) inset, 0 24px 60px -30px rgba(0,0,0,0.9)",
        lift: "0 32px 70px -40px rgba(0,0,0,0.95)",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        "caret-blink": {
          "0%, 45%": { opacity: "1" },
          "50%, 95%": { opacity: "0" },
        },
        drift: {
          "0%": { transform: "translate3d(-2%, -1%, 0) scale(1)" },
          "50%": { transform: "translate3d(2%, 1%, 0) scale(1.06)" },
          "100%": { transform: "translate3d(-2%, -1%, 0) scale(1)" },
        },
      },
      animation: {
        "caret-blink": "caret-blink 1.1s steps(1) infinite",
        drift: "drift 26s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
