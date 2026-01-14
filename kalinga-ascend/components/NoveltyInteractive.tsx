"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wind, Network, Zap, X, Atom, Microscope, ArrowRight } from 'lucide-react';

const innovations = [
    {
        id: 'biomimicry',
        title: 'DRAGONFLY DYNAMICS',
        icon: <Wind size={32} />,
        color: 'text-blue-400',
        borderColor: 'border-blue-500',
        bgGradient: 'from-blue-900/40',
        shortDesc: "Asymmetric wing flapping for reduced-gravity stability.",
        fullDesc: "By mimicking the Anax junius (Green Darner Dragonfly), the UAV utilizes independent 4-wing pitch control. This allows for 'Vector-Hover' capabilities in the thin Martian atmosphere (0.006 bar), creating lift vortices that standard propellers cannot achieve at this scale.",
        visual: (
            <div className="relative w-full h-48 bg-blue-900/20 rounded-lg overflow-hidden flex items-center justify-center border border-blue-500/30">
                {/* Abstract Wing Animation */}
                <div className="relative w-32 h-32">
                    <motion.div
                        animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-0 left-0 w-16 h-8 bg-blue-400/50 rounded-full blur-sm"
                        style={{ transformOrigin: "bottom right" }}
                    />
                    <motion.div
                        animate={{ rotate: [0, -10, 10, 0], scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                        className="absolute top-0 right-0 w-16 h-8 bg-blue-400/50 rounded-full blur-sm"
                        style={{ transformOrigin: "bottom left" }}
                    />
                    <motion.div
                        animate={{ rotate: [0, 15, -15, 0] }}
                        transition={{ duration: 0.1, repeat: Infinity }}
                        className="absolute top-8 left-2 w-12 h-6 border border-blue-300 rounded-full opacity-60"
                        style={{ transformOrigin: "right center" }}
                    />
                    <motion.div
                        animate={{ rotate: [0, -15, 15, 0] }}
                        transition={{ duration: 0.1, repeat: Infinity }}
                        className="absolute top-8 right-2 w-12 h-6 border border-blue-300 rounded-full opacity-60"
                        style={{ transformOrigin: "left center" }}
                    />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-16 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.8)]" />
                </div>
                <div className="absolute bottom-2 right-2 text-[10px] font-mono text-blue-300">FIG 1.1: VORTEX LIFT</div>
            </div>
        )
    },
    {
        id: 'swarm',
        title: 'SWARM CONSENSUS',
        icon: <Network size={32} />,
        color: 'text-kalinga',
        borderColor: 'border-kalinga',
        bgGradient: 'from-green-900/40',
        shortDesc: "Decentralized SLAM stitching without central servers.",
        fullDesc: "A peer-to-peer mesh network allows individual UAVs to share partial Octomaps. The 'Hive-Mind' algorithm stitches these into a global master map in real-time. If one unit fails, the map integrity remains 100% intact.",
        visual: (
            <div className="relative w-full h-48 bg-green-900/20 rounded-lg overflow-hidden border border-green-500/30 p-4">
                <div className="grid grid-cols-3 gap-2 h-full">
                    {[1, 2, 3].map((i) => (
                        <motion.div
                            key={i}
                            animate={{ opacity: [0.3, 1, 0.3], scale: [0.9, 1, 0.9] }}
                            transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                            className="bg-green-500/10 border border-green-500/30 rounded flex items-center justify-center relative"
                        >
                            <div className="w-2 h-2 bg-green-400 rounded-full" />
                            <div className="absolute inset-0 border border-green-500/20 rounded animate-ping" />
                        </motion.div>
                    ))}
                </div>
                {/* Connection Lines Overlay */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-50">
                    <motion.path
                        d="M 50 100 Q 150 50 250 100"
                        fill="none"
                        stroke="#4ade80"
                        strokeWidth="1"
                        strokeDasharray="5,5"
                        animate={{ strokeDashoffset: [0, 20] }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                </svg>
                <div className="absolute bottom-2 right-2 text-[10px] font-mono text-green-300">FIG 2.3: MESH TOPOLOGY</div>
            </div>
        )
    },
    {
        id: 'sabatier',
        title: 'SABATIER LOOP',
        icon: <Zap size={32} />,
        color: 'text-orange-500',
        borderColor: 'border-orange-500',
        bgGradient: 'from-orange-900/40',
        shortDesc: "In-situ CO2 to Methane conversion for perpetual fuel.",
        fullDesc: "The Z-DBS Base Station uses a miniaturized Sabatier Reactor. It compresses Martian atmospheric CO2 and combines it with stored Hydrogen to produce Methane (CH4) fuel cells and Water (H2O) byproducts, closing the energy loop.",
        visual: (
            <div className="relative w-full h-48 bg-orange-900/20 rounded-lg overflow-hidden border border-orange-500/30 flex items-center justify-center gap-4">
                <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full border-2 border-dashed border-gray-500 flex items-center justify-center text-xs text-gray-400 font-mono">CO2</div>
                    <ArrowRight className="rotate-90 text-gray-600 my-2" size={16} />
                </div>

                <div className="relative w-24 h-24 bg-orange-500/10 rounded-full border border-orange-500 flex items-center justify-center">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 border-t-2 border-orange-400 rounded-full"
                    />
                    <div className="text-center">
                        <div className="text-orange-500 font-bold text-xs">REACTOR</div>
                        <div className="text-[10px] text-orange-300">400°C</div>
                    </div>
                </div>

                <div className="flex flex-col items-center">
                    <ArrowRight className="rotate-90 text-gray-600 my-2" size={16} />
                    <div className="w-12 h-12 rounded-full border-2 border-orange-500 bg-orange-500/20 flex items-center justify-center text-xs text-orange-300 font-bold font-mono">CH4</div>
                </div>
                <div className="absolute bottom-2 right-2 text-[10px] font-mono text-orange-300">FIG 3.0: CHEM-CYCLE</div>
            </div>
        )
    }
];

export function NoveltyInteractive() {
    const [activeId, setActiveId] = useState<string | null>(null);

    return (
        <div className="grid md:grid-cols-3 gap-6">
            {innovations.map((item) => {
                const isActive = activeId === item.id;
                return (
                    <motion.div
                        key={item.id}
                        layout
                        onClick={() => setActiveId(isActive ? null : item.id)}
                        className={`group cursor-pointer relative overflow-hidden rounded-xl border-2 transition-all duration-500 ${isActive ? `${item.borderColor} bg-[#0e100f] col-span-1 md:col-span-3` : 'border-white/10 hover:border-white/30 bg-white/5'}`}
                    >
                        {/* Background Gradient */}
                        <div className={`absolute inset-0 bg-linear-to-br ${item.bgGradient} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

                        <div className={`relative z-10 p-6 ${isActive ? 'grid md:grid-cols-2 gap-8' : 'flex flex-col items-center text-center'}`}>

                            {/* Header / Icon */}
                            <div className={`${isActive ? 'flex flex-col justify-center' : ''}`}>
                                <div className={`mb-4 p-4 rounded-full bg-white/5 w-fit ${isActive ? '' : 'mx-auto'} ${item.color}`}>
                                    {item.icon}
                                </div>
                                <h3 className={`font-heading text-xl md:text-2xl text-white mb-2`}>{item.title}</h3>
                                <p className={`font-mono text-xs text-gray-400 ${isActive ? 'text-lg block mb-4' : 'hidden'}`}>{item.shortDesc}</p>

                                {isActive && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="font-mono text-sm text-gray-300 leading-relaxed max-w-xl"
                                    >
                                        {item.fullDesc}
                                    </motion.div>
                                )}

                                {!isActive && <p className="font-mono text-xs text-gray-500 mt-2">{item.shortDesc}</p>}

                                {!isActive && (
                                    <div className="mt-6 text-[10px] uppercase tracking-widest text-gray-600 group-hover:text-white transition-colors flex items-center gap-2">
                                        <Atom size={12} /> Click to Examine
                                    </div>
                                )}
                            </div>

                            {/* Visual (Only visible when active) */}
                            <AnimatePresence>
                                {isActive && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="flex items-center justify-center p-4 bg-black/40 rounded-xl border border-white/5"
                                    >
                                        {item.visual}
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Close Button */}
                            {isActive && (
                                <button className="absolute top-4 right-4 text-gray-500 hover:text-white">
                                    <X size={24} />
                                </button>
                            )}
                        </div>
                    </motion.div>
                );
            })}
        </div>
    );
}
