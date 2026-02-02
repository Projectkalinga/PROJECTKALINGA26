"use client";

import Navbar from '@/components/Navbar';
import { motion } from 'framer-motion';

export default function BaseStation() {
    return (
        <main className="min-h-screen bg-(--bg-primary) text-(--text-primary) pt-20 transition-colors duration-500">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="text-center mb-16">
                    <motion.h1
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="text-4xl md:text-6xl font-orbitron text-white"
                    >
                        BASE STATION <span className="text-accent-orange">ALPHA</span>
                    </motion.h1>
                    <p className="text-martian-rust font-mono mt-2 uppercase tracking-widest">Central Command Hub & Charging Array</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-12">
                    <div className="bg-panel-bg p-8 border-l-4 border-martian-red">
                        <h2 className="text-2xl font-orbitron text-white mb-4">POWER GENERATION</h2>
                        <p className="text-gray-400 font-rajdhani mb-6">
                            Equipped with high-efficiency multi-junction solar cells and RTG backup for continuous operation during Martian winters.
                        </p>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-black/50 p-4">
                                <h4 className="text-xs text-gray-500 font-mono">OUTPUT</h4>
                                <p className="text-xl text-accent-orange font-bold">4.5 kW</p>
                            </div>
                            <div className="bg-black/50 p-4">
                                <h4 className="text-xs text-gray-500 font-mono">BATTERY</h4>
                                <p className="text-xl text-accent-orange font-bold">120 kWh</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-panel-bg p-8 border-l-4 border-accent-orange">
                        <h2 className="text-2xl font-orbitron text-white mb-4">COMMUNICATIONS</h2>
                        <p className="text-gray-400 font-rajdhani mb-6">
                            High-gain antenna array provides seamless link to Orbiter relays and direct-to-earth capabilities in emergency modes.
                        </p>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-black/50 p-4">
                                <h4 className="text-xs text-gray-500 font-mono">UPLINK</h4>
                                <p className="text-xl text-martian-red font-bold">X-BAND</p>
                            </div>
                            <div className="bg-black/50 p-4">
                                <h4 className="text-xs text-gray-500 font-mono">LATENCY</h4>
                                <p className="text-xl text-martian-red font-bold">~14 MIN</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Feature List */}
                <div className="grid md:grid-cols-4 gap-4">
                    {['AUTONOMOUS DOCKING', 'DUST REMOVAL SYSTEM', 'THERMAL REGULATION', 'LABORATORY MODULE'].map((feature, i) => (
                        <div key={i} className="border border-white/10 p-4 text-center hover:bg-white/5 transition-colors">
                            <div className="w-10 h-10 mx-auto bg-martian-red/20 rounded-full flex items-center justify-center mb-3">
                                <span className="font-bold text-martian-red">{i + 1}</span>
                            </div>
                            <h3 className="font-orbitron text-sm">{feature}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
