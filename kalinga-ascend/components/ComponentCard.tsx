"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ComponentData } from '@/data/hardware-inventory';

interface ComponentCardProps {
    data: ComponentData;
    index: number;
}

export function ComponentCard({ data, index }: ComponentCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="group relative bg-[#121413] border border-white/10 rounded-xl overflow-hidden hover:border-kalinga/50 transition-colors duration-300 flex flex-col h-full min-w-[280px] md:min-w-0" // Added min-w for horizontal scroll contexts
        >
            {/* Top Image Section */}
            <div className="relative w-full h-40 md:h-48 bg-black/50 overflow-hidden border-b border-white/5 shrink-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="w-full h-full p-6 relative">
                    <Image
                        src={data.image}
                        alt={data.name}
                        fill
                        className="object-contain group-hover:scale-110 transition-transform duration-500"
                    />
                </div>
                {/* Mass Tag */}
                <div className="absolute top-3 right-3 bg-black/80 backdrop-blur border border-white/20 px-2 py-1 rounded text-[10px] font-mono text-gray-400">
                    MASS: <span className="text-white font-bold">{data.mass}</span>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-4 md:p-5 flex-1 flex flex-col">
                {/* Header */}
                <div className="mb-3 md:mb-4">
                    <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-mono text-regolith uppercase tracking-wider">{data.category}</span>
                        <div className="w-2 h-2 rounded-full bg-gray-800 group-hover:bg-kalinga transition-colors" />
                    </div>
                    <h3 className="text-base md:text-lg font-heading text-white leading-tight">{data.name}</h3>
                </div>

                {/* Role Description */}
                <p className="text-xs md:text-sm text-gray-400 font-mono leading-relaxed mb-4 md:mb-6 border-l-2 border-white/10 pl-3 group-hover:border-kalinga/50 transition-colors line-clamp-3">
                    {data.description}
                </p>

                {/* Specs Table */}
                <div className="mt-auto bg-black/30 rounded border border-white/5 p-2 md:p-3">
                    <table className="w-full text-left border-collapse">
                        <tbody>
                            {Object.entries(data.specs).map(([key, value]) => (
                                <tr key={key} className="border-b border-white/5 last:border-0">
                                    <td className="py-1 text-[9px] md:text-[10px] font-mono text-gray-500 uppercase">{key}</td>
                                    <td className="py-1 text-[9px] md:text-[10px] font-mono text-kalinga text-right whitespace-nowrap">{value}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Neon Glow Hover Effect */}
            <div className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-kalinga to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </motion.div>
    );
}
