"use client";

import Navbar from '@/components/Navbar';
import { motion } from 'framer-motion';

export default function UAV() {
    return (
        <main className="min-h-screen bg-black text-white pt-20">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 py-12">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col md:flex-row items-end justify-between mb-16 border-b border-white/10 pb-8"
                >
                    <div>
                        <h1 className="text-5xl md:text-7xl font-orbitron text-white">M-14 <span className="text-martian-red">DRONE</span></h1>
                        <p className="font-mono text-accent-orange mt-2">TECHNICAL SPECIFICATIONS SHEET // CLASSIFIED</p>
                    </div>
                    <div className="text-right hidden md:block">
                        <p className="text-4xl font-rajdhani font-bold text-gray-500">MK-IV</p>
                        <p className="text-xs text-martian-red">GENERATION</p>
                    </div>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Left Column - Specs */}
                    <div className="space-y-4">
                        <h3 className="font-orbitron text-xl text-martian-red mb-6">PHYSICAL DIMENSIONS</h3>
                        {[
                            { label: "ROTOR SPAN", value: "320 MM" },
                            { label: "WEIGHT", value: "1.2 KG" },
                            { label: "PAYLOAD", value: "450 G" },
                            { label: "BATTERY", value: "LI-S 4500MAH" },
                            { label: "FLIGHT TIME", value: "28 MIN" },
                        ].map((spec, i) => (
                            <div key={i} className="flex justify-between items-center border-b border-white/10 py-3">
                                <span className="font-mono text-gray-400 text-sm">{spec.label}</span>
                                <span className="font-rajdhani font-bold text-lg">{spec.value}</span>
                            </div>
                        ))}
                    </div>

                    {/* Center Column - Visual representation (Simulated) */}
                    <div className="relative h-96 md:h-auto border border-white/20 flex items-center justify-center bg-white/5">
                        <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 opacity-20">
                            {[...Array(36)].map((_, i) => (
                                <div key={i} className="border border-white/20"></div>
                            ))}
                        </div>
                        {/* Simulated Wireframe */}
                        <div className="w-48 h-48 border-2 border-accent-orange rounded-full relative animate-pulse flex items-center justify-center">
                            <div className="w-2 h-2 bg-martian-red rounded-full"></div>
                            <div className="absolute top-0 left-1/2 -translate-y-1/2 w-32 h-1 bg-accent-orange/50"></div>
                            <div className="absolute bottom-0 left-1/2 translate-y-1/2 w-32 h-1 bg-accent-orange/50"></div>
                            <div className="absolute left-0 top-1/2 -translate-x-1/2 w-1 h-32 bg-accent-orange/50"></div>
                            <div className="absolute right-0 top-1/2 translate-x-1/2 w-1 h-32 bg-accent-orange/50"></div>
                            <p className="absolute -bottom-8 text-xs font-mono text-accent-orange">TOP-DOWN SCHEMATIC</p>
                        </div>
                    </div>

                    {/* Right Column - Performance */}
                    <div className="space-y-4">
                        <h3 className="font-orbitron text-xl text-martian-red mb-6">PERFORMANCE METRICS</h3>
                        {[
                            { label: "MAX ALTITUDE", value: "250 M" },
                            { label: "MAX SPEED", value: "14 M/S" },
                            { label: "TEMP RANGE", value: "-120°C TO 20°C" },
                            { label: "WIND RESIST", value: "45 KM/H" },
                            { label: "COMMS RANGE", value: "5 KM" },
                        ].map((spec, i) => (
                            <div key={i} className="flex justify-between items-center border-b border-white/10 py-3">
                                <span className="font-mono text-gray-400 text-sm">{spec.label}</span>
                                <span className="font-rajdhani font-bold text-lg">{spec.value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}
