import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: 'class', // Enforce class-based dark mode
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                heading: ['Outfit', 'sans-serif'],
                data: ['Space Mono', 'monospace'],
            },
            colors: {
                'martian-red': '#C1440E',
                'martian-rust': '#8B3209',
                'accent-primary': '#00FF7F',
                'accent-secondary': '#FF4500',
                'regolith': '#FF4500',
                'kalinga': '#00FF7F',
            },
        },
    },
    plugins: [],
};

export default config;
