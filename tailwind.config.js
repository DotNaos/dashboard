import { nextui } from "@nextui-org/theme";

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ["Inter", "sans-serif"],
            },
            colors: {
                dust: "#313131",
                dark: "#141414",
                light: "#FFFFFF",
                overlay: "rgba(51, 51, 51, 0.35)",
            },
            spacing: {
                default: "1rem",
                overlay: "1.5rem",
            },
            borderRadius: {
                default: "1rem",
                overlay: "1.5rem",
            },
        },
    },
    darkMode: "class",
    plugins: [nextui()],
};
