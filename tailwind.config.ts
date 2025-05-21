import { type Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        sm: "calc(var(--radius) - 4px)",
        md: "calc(var(--radius) - 2px)",
        lg: "var(--radius)",
        xl: "calc(var(--radius) + 4px)",
      },
      colors: {
        background: "oklch(var(--background))",
        foreground: "oklch(var(--foreground))",
        muted: "oklch(var(--muted))",
        "muted-foreground": "oklch(var(--muted-foreground))",
        popover: "oklch(var(--popover))",
        "popover-foreground": "oklch(var(--popover-foreground))",
        card: "oklch(var(--card))",
        "card-foreground": "oklch(var(--card-foreground))",
        border: "oklch(var(--border))",
        input: "oklch(var(--input))",
        primary: "oklch(var(--primary))",
        "primary-foreground": "oklch(var(--primary-foreground))",
        secondary: "oklch(var(--secondary))",
        "secondary-foreground": "oklch(var(--secondary-foreground))",
        accent: "oklch(var(--accent))",
        "accent-foreground": "oklch(var(--accent-foreground))",
        destructive: "oklch(var(--destructive))",
        "destructive-foreground": "oklch(var(--destructive-foreground))",
        ring: "oklch(var(--ring))",
        mainbg: "var(--mainbg)",
        scndbg: "var(--scndbg)",
      },
    },
  },
  plugins: [],
};

export default config;
