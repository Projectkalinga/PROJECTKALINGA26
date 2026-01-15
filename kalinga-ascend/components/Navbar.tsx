"use client";

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { clsx } from 'clsx';
// import { Sun, Moon } from 'lucide-react'; // Moved to ThemeToggle
import { useTheme } from '@/components/ThemeProvider';
import { useMission } from '@/context/MissionContext';
import { motion } from 'framer-motion';
import MobileNav from './MobileNav';
import ThemeToggle from './ThemeToggle';

const navItems = [
    { name: 'MISSION OVERVIEW', href: '/mission' },
    { name: 'ARCHITECTURE', href: '/architecture' },
    { name: 'COMPONENTS', href: '/components' },
    { name: 'REALIZATION', href: '/realization' },
    { name: 'TESTING', href: '/testing' },
    { name: 'SPECS', href: '/specs' },
    { name: 'EMERGENCY', href: '/emergency' },
    { name: 'MANAGEMENT', href: '/management' },
    { name: 'NOVELTY', href: '/novelty' },
    { name: '3D DIAGRAM', href: '/3d-diagram' },
    { name: 'TEAM', href: '/team' },
];

export default function Navbar() {
    const pathname = usePathname();
    const { theme } = useTheme(); // Use new hook
    const { hasEntered } = useMission();

    const isDark = theme === 'dark';
    // Logo Logic: Switch assets if available, or use invert for simple black/white switch if asset logic undefined.
    // User requested: White SVG (Night/Dark) and Black SVG (Day/Light).
    // Assuming /KALINGA.png is White (Night Default). 
    // I will dynamically set the class to invert it for Day mode if a specific black asset isn't confirmed, 
    // OR swap src if I had the filename. Prompt said "switch... to a black SVG". 
    // I'll stick to a CSS filter 'invert' on the container for the Day mode if the image is transparent white.
    // White logo + invert(1) = Black logo.

    return (
        <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-(--panel-glass) border-b border-(--border-color) transition-all duration-300">
            <div className="w-full px-4 h-20 flex items-center justify-between xl:justify-start">

                {/* Mobile: Logo Centered / Desktop: Logo Left */}
                <div className="absolute left-1/2 -translate-x-1/2 xl:static xl:translate-x-0 xl:mr-8 flex items-center gap-4">
                    {/* Persistent Logo Container */}
                    <div className="w-10 h-10 xl:w-12 xl:h-12 relative shrink-0">
                        {hasEntered && (
                            <motion.div
                                layoutId="main-logo"
                                className={`w-full h-full relative ${!isDark ? 'brightness-0 invert' : ''}`}
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
                <Link href="/" className="hidden md:block xl:hidden pl-16 font-heading text-2xl tracking-widest text-(--text-primary) hover:opacity-80 transition-opacity">
                    KALINGA
                </Link>
                <Link href="/" className="hidden xl:block font-heading text-2xl tracking-widest text-(--text-primary) hover:opacity-80 transition-colors">
                    KALINGA
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden xl:block ml-8">
                    <div className="flex items-baseline space-x-2">
                        {navItems.map((item) => (
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

                {/* Right Side Controls */}
                <div className="flex items-center gap-4 ml-auto">
                    {/* Theme Toggle */}
                    <ThemeToggle />

                    {/* Mobile Menu Toggle */}
                    <div className="xl:hidden text-(--text-primary)">
                        <MobileNav />
                    </div>
                </div>
            </div>
        </nav>
    );
}
