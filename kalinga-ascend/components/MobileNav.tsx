"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronRight, Activity, Database, ShieldCheck, Users } from 'lucide-react';

const MENU_CLUSTERS = [
    {
        title: "ENGINEERING",
        icon: Activity,
        items: [
            { name: 'MISSION OVERVIEW', href: '/mission' },
            { name: 'SYSTEM ARCHITECTURE', href: '/architecture' },
            { name: 'COMPONENTS & SPECS', href: '/components' },
            { name: 'REALIZATION', href: '/realization' },
            { name: '3D DIAGRAM', href: '/3d-diagram' },
        ]
    },
    {
        title: "VALIDATION",
        icon: ShieldCheck,
        items: [
            { name: 'TESTING & QA', href: '/testing' },
            { name: 'TECHNICAL SPECS', href: '/specs' },
            { name: 'EMERGENCY PROTOCOLS', href: '/emergency' },
        ]
    },
    {
        title: "MANAGEMENT",
        icon: Database,
        items: [
            { name: 'MISSION MANAGEMENT', href: '/management' },
            { name: 'NOVELTY & IMPACT', href: '/novelty' },
            { name: 'MEET THE CREW', href: '/team' },
        ]
    }
];

export default function MobileNav() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <div className="md:hidden">
            {/* Toggle Button */}
            <button
                onClick={toggleMenu}
                className="relative z-50 p-2 text-white hover:text-regolith transition-colors"
                aria-label="Toggle Menu"
            >
                {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>

            {/* Full Screen Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                        animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
                        exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-40 bg-[#0e100f]/95 text-white overflow-y-auto"
                    >
                        <div className="min-h-screen flex flex-col p-6 pt-24">

                            {/* Menu Clusters */}
                            <div className="space-y-8 pb-12">
                                {MENU_CLUSTERS.map((cluster, idx) => (
                                    <motion.div
                                        key={cluster.title}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.1, duration: 0.5 }}
                                    >
                                        <div className="flex items-center gap-2 mb-4 pb-2 border-b border-white/10 text-regolith">
                                            <cluster.icon size={16} />
                                            <span className="text-xs font-mono font-bold tracking-widest">{cluster.title}</span>
                                        </div>

                                        <div className="grid gap-3">
                                            {cluster.items.map((item) => (
                                                <Link
                                                    key={item.href}
                                                    href={item.href}
                                                    onClick={() => setIsOpen(false)}
                                                    className="group flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5 hover:border-regolith/50 hover:bg-white/10 transition-all duration-300"
                                                >
                                                    <span className={`text-sm font-heading tracking-wide ${pathname === item.href ? 'text-regolith' : 'text-gray-300 group-hover:text-white'}`}>
                                                        {item.name}
                                                    </span>
                                                    <ChevronRight size={14} className="text-gray-600 group-hover:text-regolith transition-colors" />
                                                </Link>
                                            ))}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Footer Info */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="mt-auto pt-8 border-t border-white/10 text-center"
                            >
                                <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-2">
                                    Project Kalinga
                                </div>
                                <div className="text-[10px] text-gray-600">
                                    System Status: ONLINE
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
