import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
    },
    extend: {
      colors: {
        primary: "#0073CF",
        secondary: "#093961", 
        addresscard:"#F6FAFE", 
        productcard:"#E7EEF4", 
      },
      keyframes: {
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        scroll: 'scroll 30s linear infinite',
      },
      fontFamily: {
      baloo: ['Baloo', 'sans-serif'],
      roboto: ['Roboto', 'sans-serif'],
      segoeui: ['segoeui', 'sans-serif'], 
      big_noodle_titling: ['big_noodle_titling', 'sans-serif'], 
    },
    },
  },
  plugins: [],
} satisfies Config;
