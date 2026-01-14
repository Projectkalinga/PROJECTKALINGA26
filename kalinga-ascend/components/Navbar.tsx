"use client";

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { clsx } from 'clsx';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from './ClientLayout';
import { useMission } from '@/context/MissionContext';
import { motion, AnimatePresence } from 'framer-motion';

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
    const { theme, toggleTheme } = useTheme();
    const { hasEntered } = useMission();

    return (
        <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-[#0e100f]/80 border-b border-white/10">
            <div className="w-full px-4 h-20 flex items-center">
                <div className="flex items-center shrink-0 gap-4">
                    {/* Persistent Logo Container */}
                    <div className="w-10 h-10 relative">
                        {hasEntered && (
                            <motion.div
                                layoutId="main-logo"
                                className="w-full h-full relative"
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

                    <Link href="/" className="font-heading text-2xl tracking-widest hover:text-white/80 transition-colors hidden md:block">
                        KALINGA
                    </Link>

                    <div className="hidden xl:block ml-8">
                        <div className="flex items-baseline space-x-2">
                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={clsx(
                                        'px-3 py-2 rounded text-[10px] 2xl:text-xs font-bold transition-all duration-200 tracking-wider',
                                        pathname === item.href
                                            ? 'text-black bg-regolith shadow-[0_0_10px_var(--accent-secondary)]'
                                            : 'text-gray-400 hover:text-white hover:bg-white/5'
                                    )}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center gap-4 ml-auto lg:ml-0">
                        {/* Mobile Menu Button would go here */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full hover:bg-white/10 transition-colors text-white"
                        >
                            {theme === 'day' ? <Moon size={20} /> : <Sun size={20} />}
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}
