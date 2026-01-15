"use client";

import { motion, AnimatePresence } from "framer-motion";
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

    const isLight = theme === 'light';

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors relative group focus:outline-none"
            aria-label={`Switch to ${isLight ? 'Night' : 'Day'} Mode`}
        >
            <div className="relative w-5 h-5 flex items-center justify-center">
                <AnimatePresence mode="wait" initial={false}>
                    {isLight ? (
                        <motion.div
                            key="sun"
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            exit={{ scale: 0, rotate: 180 }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                            className="absolute text-orange-600"
                        >
                            <Sun size={20} />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="moon"
                            initial={{ scale: 0, rotate: 180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            exit={{ scale: 0, rotate: -180 }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                            className="absolute text-yellow-400"
                        >
                            <Moon size={20} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Glow Effect on Hover */}
            <div className={`absolute inset-0 rounded-full transition-opacity duration-500 opacity-0 group-hover:opacity-20 ${!isLight ? 'bg-yellow-400' : 'bg-orange-600'}`} />
        </button>
    );
}
