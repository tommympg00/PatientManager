/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--PRIMARY)",
        "primary-foreground": "var(--PRIMARY_FOREGROUND)",
        secondary: "var(--SECONDARY)",
        "secondary-foreground": "var(--SECONDARY_FOREGROUND)",
        danger: "var(--DANGER)",
        "danger-foreground": "var(--DANGER_FOREGROUND)",
        success: "var(--SUCCESS)",
        "success-foreground": "var(--SUCCESS_FOREGROUND)",
        accent: "var(--ACCENT)",
        background: "var(--BACKGROUND)",
        "background-secondary": "var(--BACKGROUND_SECONDARY)",
      },
    },
  },
  plugins: [],
};
