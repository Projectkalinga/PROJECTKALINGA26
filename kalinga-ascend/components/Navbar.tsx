"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { clsx } from 'clsx';
import { useTheme } from '@/components/ThemeProvider';
import { useMission } from '@/context/MissionContext';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle';

// Full Project Page List (14 Pages)
const NAV_LINKS = [
    { name: 'MISSION OVERVIEW', href: '/mission' },
    { name: 'SYSTEM ARCHITECTURE', href: '/architecture' },
    { name: 'TESTING HIERARCHY', href: '/testing' },
    { name: 'SPECIFICATIONS', href: '/specs' },
    { name: 'MANAGEMENT', href: '/management' },
    { name: 'NOVELTY & IMPACT', href: '/novelty' },
    { name: 'COMPONENTS', href: '/components' },
    { name: 'REALIZATION', href: '/realization' },
    { name: '3D DIAGRAM', href: '/3d-diagram' },
    { name: 'MEET THE CREW', href: '/team' },
    { name: 'EMERGENCY', href: '/emergency' },
    { name: 'ANALYSIS', href: '/analysis' },
    { name: 'BASE STATION', href: '/basestation' },
    { name: 'UAV SENSORS', href: '/sensors' },
];

export default function Navbar() {
    const pathname = usePathname();
    const { theme } = useTheme();
    const { hasEntered } = useMission();
    const [isOpen, setIsOpen] = useState(false);

    const isDark = theme === 'dark';

    // Desktop Nav Items (Subset for visual clarity on bar, or all? 
    // Usually navbar has a limited set. I'll keep the top key ones for Desktop 'bar' 
    // and full list in Mobile, OR just use the main ones. 
    // Prompt says "Map through navLinks array to generate buttons for all pages" 
    // specifically for the "Dropdown Navigation List" (Mobile/Sidebar). 
    // I will retain the previous subset for Desktop to avoid overcrowding 
    // but ensure Mobile/Hamburger has ALL 14).
    const desktopItems = NAV_LINKS.slice(0, 10); // Show top 10 on desktop (includes Team)

    return (
        <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-(--panel-glass) border-b border-(--border-color) transition-all duration-300">
            <div className="w-full px-4 h-20 flex items-center justify-between xl:justify-start">

                {/* Logo Section */}
                <div className="absolute left-1/2 -translate-x-1/2 xl:static xl:translate-x-0 xl:mr-8 flex items-center gap-4">
                    <div className="w-10 h-10 xl:w-12 xl:h-12 relative shrink-0">
                        {hasEntered && (
                            <motion.div
                                layoutId="main-logo"
                                className={`w-full h-full relative ${!isDark ? 'invert' : ''}`}
                                transition={{ duration: 1.2, ease: "circOut" }}
                            >
                                <Image
                                    src="/KALINGA.png"
                                    alt="KALINGA Logo"
                                    fill
                                    className="object-contain"
                                    priority
                                />
                            </motion.div>
                        )}
                    </div>
                </div>

                {/* Brand Name */}
                <Link href="/" className="hidden xl:block font-heading text-2xl tracking-widest text-(--text-primary) hover:opacity-80 transition-colors">
                    KALINGA
                </Link>

                {/* Desktop Navigation (Hidden on Mobile) */}
                <div className="hidden xl:block ml-8">
                    <div className="flex items-baseline space-x-1">
                        {desktopItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={clsx(
                                    'px-3 py-2 rounded text-[10px] 2xl:text-xs font-bold transition-all duration-200 tracking-wider whitespace-nowrap',
                                    pathname === item.href
                                        ? 'text-(--bg-primary) bg-(--accent-glow) shadow-[0_0_10px_var(--accent-glow)]'
                                        : 'text-(--text-secondary) hover:text-(--text-primary) hover:bg-white/5'
                                )}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Controls (Theme + Hamburger) */}
                <div className="flex items-center gap-4 ml-auto">
                    <ThemeToggle />

                    {/* Hamburger Button (Visible on Mobile/Tablet) */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="xl:hidden group relative z-50 p-2 focus:outline-hidden"
                        aria-label="Toggle Menu"
                    >
                        <div className="flex flex-col justify-between w-6 h-5">
                            {/* Top Line */}
                            <span className={clsx(
                                "block h-0.5 w-full bg-current transform transition-all duration-300 ease-in-out",
                                isOpen ? "rotate-45 translate-y-2" : ""
                            )} />

                            {/* Middle Line */}
                            <span className={clsx(
                                "block h-0.5 w-full bg-current transition-opacity duration-300 ease-in-out",
                                isOpen ? "opacity-0" : "opacity-100"
                            )} />

                            {/* Bottom Line */}
                            <span className={clsx(
                                "block h-0.5 w-full bg-current transform transition-all duration-300 ease-in-out",
                                isOpen ? "-rotate-45 -translate-y-2.5" : "" // Adjusted slightly to -2.5 (10px) to match height of 5 (20px) roughly
                            )} />
                        </div>
                    </button>
                </div>
            </div>

            {/* Mobile / Full-Screen Overlay Dropdown */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                        animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
                        exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 top-0 left-0 w-full h-screen z-40 bg-[#0e100f]/95 text-white overflow-y-auto"
                    >
                        <div className="flex flex-col items-center justify-center min-h-screen py-20 px-6 space-y-6">
                            {NAV_LINKS.map((item, idx) => (
                                <motion.div
                                    key={item.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.05, duration: 0.3 }}
                                    className="w-full max-w-md text-center"
                                >
                                    <Link
                                        href={item.href}
                                        onClick={() => setIsOpen(false)} // Critical: Auto-close
                                        className={clsx(
                                            "block text-2xl md:text-3xl font-heading tracking-widest transition-all duration-300",
                                            pathname === item.href
                                                ? "text-[#00FF7F] drop-shadow-[0_0_10px_rgba(0,255,127,0.5)]" // Active: Kalinga Green
                                                : "text-gray-400 hover:text-[#FF4500] hover:scale-105" // Hover: Regolith Orange
                                        )}
                                    >
                                        {item.name}
                                    </Link>
                                </motion.div>
                            ))}

                            <div className="mt-12 w-full max-w-[200px] h-px bg-white/10" />
                            <div className="text-[10px] font-mono text-gray-500 tracking-[0.2em] pt-4">
                                PROJECT KALINGA • SYSTEM READY
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
