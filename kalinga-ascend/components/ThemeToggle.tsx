"use client";

import { motion } from "framer-motion";
import { Sun } from "lucide-react";
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
            className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors relative group focus:outline-hidden"
            aria-label="Toggle Day/Night Mode"
        >
            <div className="relative w-5 h-5 overflow-hidden">
                {/* Sun Icon Logic: Display Sun. Rotate 180 degrees when 'light'. */}
                <motion.div
                    initial={false}
                    animate={{
                        rotate: isLight ? 180 : 0,
                        scale: isLight ? 1.1 : 1 // Slight scale animation as requested
                    }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="flex items-center justify-center text-orange-500 dark:text-yellow-400"
                >
                    <Sun size={20} />
                </motion.div>
            </div>

            {/* Glow Effect - Only in Dark Mode (matches 'shadow-none dark:shadow' logic concept) */}
            <div className={`absolute inset-0 rounded-full transition-opacity duration-500 opacity-0 group-hover:opacity-20 ${!isLight ? 'bg-orange-500' : 'bg-gray-400'}`} />
        </button>
    );
}
