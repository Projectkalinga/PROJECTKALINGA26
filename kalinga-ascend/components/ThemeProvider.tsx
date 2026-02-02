"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light";

interface ThemeContextType {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setThemeState] = useState<Theme>("dark");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // 1. Check local storage
        const stored = localStorage.getItem("theme") as Theme | null;
        if (stored) {
            setThemeState(stored);
        } else {
            // 2. Default to dark if no preference (Obsidian Night Mode default)
            setThemeState("dark");
        }
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return;

        const root = document.documentElement;
        // Remove potential conflict classes
        root.classList.remove("light", "dark");

        // Add current theme class
        root.classList.add(theme);

        // Persist
        localStorage.setItem("theme", theme);
    }, [theme, mounted]);

    const setTheme = (t: Theme) => {
        setThemeState(t);
    };

    const toggleTheme = () => {
        setThemeState(prev => (prev === "dark" ? "light" : "dark"));
    };

    // Prevent hydration mismatch by rendering children only after mount
    return (
        <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
}
