"use client";

import { motion } from 'framer-motion';
import { User, Rocket, Cpu, Eye, Database, Code, Shield, PenTool, Zap, Activity, Link as LinkIcon } from 'lucide-react';

interface TeamMemberProps {
    name: string;
    role: string;
    contribution: string;
    icon?: any;
    delay?: number;
}

const roleIcons: { [key: string]: any } = {
    "Mission Commander": Rocket,
    "software": Code,
    "Navigation": Activity,
    "Vision": Eye,
    "Embedded": Cpu,
    "Communications": LinkIcon,
    "Propulsion": Zap,
    "Planning": Database,
    "Safety": Shield,
    "Operations": PenTool,
    "Project Lead": Rocket, // Fallback
    "Lead AI": Cpu
};

export function TeamMemberCard({ name, role, contribution, delay = 0 }: TeamMemberProps) {
    // Determine icon based on role mapping or default (case-insensitive check)
    const Icon = roleIcons[Object.keys(roleIcons).find(k => role.toLowerCase().includes(k.toLowerCase())) || ""] || User;

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="group relative h-full"
        >
            {/* Glowing Connection Line (Visual Decoration) */}
            <div className="absolute -top-4 left-1/2 w-px h-4 bg-gradient-to-b from-transparent to-white/20 group-hover:to-kalinga/50 transition-colors" />

            <div className="h-full glass-panel p-6 border border-white/5 hover:border-kalinga/50 transition-colors duration-300 relative overflow-hidden flex flex-col items-center text-center">

                {/* Background Grid Effect */}
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10 pointer-events-none group-hover:opacity-20 transition-opacity" />

                {/* Avatar / Icon Placeholder */}
                <div className="relative mb-4">
                    <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-kalinga/10 group-hover:border-kalinga transition-colors duration-300">
                        <Icon className="text-gray-400 group-hover:text-kalinga transition-colors" size={32} />
                    </div>
                    {/* Orbiting Ring */}
                    <div className="absolute inset-0 border border-dashed border-white/20 rounded-full animate-[spin_10s_linear_infinite] opacity-0 group-hover:opacity-100" />
                </div>

                {/* Info */}
                <h3 className="text-xl font-heading text-white mb-1 group-hover:text-kalinga transition-colors">{name}</h3>
                <div className="text-xs font-mono text-regolith uppercase tracking-widest mb-4 border-b border-white/10 pb-2 w-full">{role}</div>

                {/* Technical Contribution (Reveal on Hover) */}
                <div className="mt-auto">
                    <p className="text-xs font-mono text-gray-500 group-hover:text-white transition-colors duration-300">
                        <span className="text-[10px] text-gray-600 uppercase block mb-1 group-hover:text-kalinga">Primary Contrib.</span>
                        "{contribution}"
                    </p>
                </div>

                {/* Status Indicator */}
                <div className="absolute top-4 right-4 flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-kalinga animate-pulse" />
                </div>
            </div>
        </motion.div>
    );
}
