"use client";

import Navbar from '@/components/Navbar';
import { TestMatrix } from '@/components/TestMatrix';
import { ValidationDashboard } from '@/components/ValidationDashboard';
import { motion } from 'framer-motion';
import { ShieldCheck, FileCheck, ServerCrash } from 'lucide-react';

export default function TestingPlan() {
    return (
        <main className="min-h-screen pt-20 pb-12 px-4 md:px-8 bg-[#0e100f] text-white relative overflow-hidden">
            <Navbar />

            {/* Background Watermark */}
            <div className="fixed inset-0 flex items-center justify-center pointer-events-none opacity-[0.05] z-0">
                <h1 className="text-[20vw] font-black font-heading select-none">TEST</h1>
            </div>

            <div className="max-w-7xl mx-auto relative z-10 space-y-20">

                {/* 1. HERO SECTION */}
                <header className="text-center max-w-4xl mx-auto mt-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-1 border border-kalinga text-kalinga text-xs font-mono mb-6"
                    >
                        <ShieldCheck size={12} />
                        DIGITAL PROVING GROUND
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-heading mb-6"
                    >
                        VALIDATION & <span className="text-transparent bg-clip-text bg-linear-to-r from-kalinga to-cyan-400">RELIABILITY</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-gray-400 font-mono leading-relaxed"
                    >
                        The ASCEND Testing Protocol: From high-fidelity Sim-to-Real simulations in Gazebo to rigorous physical trials.
                    </motion.p>
                </header>

                {/* 2. THE TESTING HIERARCHY */}
                <section>
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-1 h-8 bg-blue-500" />
                        <h2 className="text-3xl font-heading">TESTING HIERARCHY</h2>
                    </div>
                    <TestMatrix />
                </section>

                {/* 3. LIVE PERFORMANCE DASHBOARD */}
                <section>
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-1 h-8 bg-regolith" />
                        <h2 className="text-3xl font-heading">LIVE PERFORMANCE METRICS</h2>
                    </div>
                    <ValidationDashboard />
                </section>

                {/* 4. CFR CERTIFICATION */}
                <section className="glass-panel p-8 border-t-4 border-green-500 max-w-4xl mx-auto">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                        <div>
                            <h2 className="text-2xl font-heading text-white mb-2 flex items-center gap-3">
                                <FileCheck className="text-green-500" size={28} />
                                CERTIFICATION OF FLIGHT READINESS (CFR)
                            </h2>
                            <p className="text-gray-400 font-mono text-sm">Final pre-mission validation check.</p>
                        </div>

                        <div className="bg-white/5 p-4 rounded-lg border border-white/10 text-right min-w-[200px]">
                            <div className="text-xs text-gray-500 font-mono uppercase">Mass Compliance</div>
                            <div className="text-3xl font-bold text-green-400">1,655g</div>
                            <div className="text-xs text-gray-400">LIMIT: 2,000g</div>
                        </div>
                    </div>
                </section>

            </div>
        </main>
    );
}
