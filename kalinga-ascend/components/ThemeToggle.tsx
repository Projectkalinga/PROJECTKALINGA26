"use client";

import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // Prevent hydration mismatch
    useEffect(() => setMounted(true), []);

    if (!mounted) {
        return <div className="w-9 h-9" />; // Placeholder
    }

    const isDark = theme === 'dark';

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-white/10 transition-colors relative group focus:outline-hidden"
            aria-label="Toggle Day/Night Mode"
        >
            <div className="relative w-5 h-5 overflow-hidden">
                {/* Sun Icon (Show in Dark Mode -> Switch to Light) ? No, show current state or action? usually Shows current state icon or target. Standard: Show Moon when Day (to go Dark), Sun when Dark (to go Light). Or the reverse. Let's strictly follow User Request: "On click, rotate icon... Sun/Moon" */}

                {/* Current State Icon */}
                <motion.div
                    initial={false}
                    animate={{
                        rotate: isDark ? 0 : 180,
                        opacity: isDark ? 1 : 0,
                        scale: isDark ? 1 : 0.5
                    }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="absolute inset-0 flex items-center justify-center text-yellow-400"
                >
                    <Sun size={20} />
                </motion.div>

                <motion.div
                    initial={false}
                    animate={{
                        rotate: isDark ? -180 : 0,
                        opacity: isDark ? 0 : 1,
                        scale: isDark ? 0.5 : 1
                    }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="absolute inset-0 flex items-center justify-center text-slate-800 dark:text-gray-200"
                >
                    <Moon size={20} className="fill-current" />
                </motion.div>
            </div>

            {/* Glow Effect */}
            <div className={`absolute inset-0 rounded-full transition-opacity duration-500 opacity-0 group-hover:opacity-20 ${isDark ? 'bg-orange-500' : 'bg-blue-500'}`} />
        </button>
    );
}
