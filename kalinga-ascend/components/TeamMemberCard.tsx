"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { useState } from 'react';

interface TeamMemberProps {
    name: string;
    domainDesignation: string;
    primaryContribution: string;
    keyHardware: string;
    impactTooltip: string;
    icon: LucideIcon;
    delay?: number;
}

export function TeamMemberCard({
    name,
    domainDesignation,
    primaryContribution,
    keyHardware,
    impactTooltip,
    icon: Icon,
    delay = 0
}: TeamMemberProps) {
    const [showTooltip, setShowTooltip] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
            whileHover={{ y: -5, scale: 1.02 }}
            onHoverStart={() => setShowTooltip(true)}
            onHoverEnd={() => setShowTooltip(false)}
            className="group relative h-full"
        >
            {/* Glowing Connection Line */}
            <div className="absolute -top-4 left-1/2 w-px h-4 bg-linear-to-b from-transparent to-white/20 dark:to-white/20 group-hover:to-kalinga/50 transition-colors" />

            <div className="h-full glass-panel p-6 border border-(--border-color) hover:border-kalinga/50 transition-colors duration-300 relative overflow-hidden flex flex-col items-center text-center bg-(--panel-glass)">

                {/* Background Grid Effect */}
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10 pointer-events-none group-hover:opacity-20 transition-opacity" />

                {/* Avatar / Icon */}
                <div className="relative mb-4">
                    <div className="w-16 h-16 rounded-full bg-(--panel-glass) border border-(--border-color) flex items-center justify-center group-hover:bg-kalinga/10 group-hover:border-kalinga transition-colors duration-300">
                        <Icon className="text-(--text-secondary) group-hover:text-kalinga transition-colors" size={32} />
                    </div>
                    {/* Orbiting Ring */}
                    <div className="absolute inset-0 border border-dashed border-(--border-color) rounded-full animate-[spin_10s_linear_infinite] opacity-0 group-hover:opacity-100" />
                </div>

                {/* Name */}
                <h3 className="text-xl font-heading text-(--text-primary) mb-3 group-hover:text-kalinga transition-colors">{name}</h3>

                {/* Domain Designation - NEON GLOW BADGE */}
                <div className="relative mb-4 w-full">
                    <div className="px-3 py-2 bg-kalinga/10 dark:bg-kalinga/10 border border-kalinga/30 rounded font-mono text-xs text-kalinga uppercase tracking-widest shadow-[0_0_10px_rgba(0,255,127,0.5)] group-hover:shadow-[0_0_20px_rgba(0,255,127,0.7)] transition-all duration-300">
                        {domainDesignation}
                    </div>
                </div>

                {/* Primary Contribution */}
                <div className="mb-2 pb-2 border-b border-(--border-color) w-full">
                    <span className="text-[10px] text-(--text-secondary) uppercase block mb-1 font-bold">Primary Stack</span>
                    <p className="text-xs font-mono text-(--text-primary) font-semibold">{primaryContribution}</p>
                </div>

                {/* Key Hardware */}
                <div className="mt-auto">
                    <span className="text-[10px] text-(--accent-glow) uppercase block mb-1 font-bold">Hardware Owned</span>
                    <p className="text-xs font-mono text-(--text-secondary) group-hover:text-(--text-primary) transition-colors duration-300">
                        {keyHardware}
                    </p>
                </div>

                {/* Impact Tooltip */}
                <AnimatePresence>
                    {showTooltip && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="absolute -bottom-16 left-1/2 -translate-x-1/2 z-50 w-64 p-3 bg-(--bg-primary) border border-kalinga rounded-lg shadow-[0_0_20px_rgba(0,255,127,0.3)]"
                        >
                            <div className="text-[10px] font-mono text-kalinga uppercase mb-1">Mission Impact</div>
                            <p className="text-xs font-mono text-(--text-primary)">{impactTooltip}</p>
                            {/* Tooltip Arrow */}
                            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-(--bg-primary) border-t border-l border-kalinga rotate-45" />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Status Indicator */}
                <div className="absolute top-4 right-4 flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-kalinga animate-pulse" />
                </div>
            </div>
        </motion.div>
    );
}
