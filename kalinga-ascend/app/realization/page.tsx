"use client";

import Navbar from '@/components/Navbar';
import { HardwareTable } from '@/components/HardwareTable';
import { ProductionTimeline } from '@/components/ProductionTimeline';
import { motion } from 'framer-motion';
import { CheckCircle, AlertTriangle, Cpu, Hammer, Rocket } from 'lucide-react';

export default function RealizationPlan() {
    return (
        <main className="min-h-screen pt-20 pb-12 px-4 md:px-8 bg-[#0e100f] text-white relative overflow-hidden">
            <Navbar />

            {/* Background Watermark */}
            <div className="fixed inset-0 flex items-center justify-center pointer-events-none opacity-[0.05] z-0">
                <h1 className="text-[20vw] font-black font-heading select-none">BUILD</h1>
            </div>

            <div className="max-w-7xl mx-auto relative z-10 space-y-24">

                {/* 1. HERO SECTION */}
                <header className="text-center max-w-4xl mx-auto mt-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-1 border border-regolith text-regolith text-xs font-mono mb-6"
                    >
                        <Hammer size={12} />
                        MISSION REALIZATION STRATEGY
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-heading mb-6"
                    >
                        FROM <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-cyan-400">BLUEPRINT</span> TO <span className="text-transparent bg-clip-text bg-linear-to-r from-regolith to-kalinga">ARENA</span>.
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-gray-400 font-mono leading-relaxed"
                    >
                        Balancing high-end commercial off-the-shelf (COTS) intelligence with indigenous custom fabrication.
                        Targeting a strict <span className="text-white font-bold">&le; 2.0kg</span> mass budget.
                    </motion.p>
                </header>

                {/* 2. HARDWARE REALIZATION MATRIX */}
                <section>
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-1 h-8 bg-kalinga" />
                        <h2 className="text-3xl font-heading">HARDWARE REALIZATION MATRIX</h2>
                    </div>
                    <HardwareTable />
                </section>

                {/* 3. FABRICATION STRATEGY & SOURCING */}
                <section className="grid md:grid-cols-2 gap-12">
                    {/* Indigenous Fabrication */}
                    <div className="glass-panel p-8 border-l-4 border-kalinga">
                        <div className="flex items-center gap-3 mb-6">
                            <Hammer className="text-kalinga" size={32} />
                            <h3 className="text-2xl font-heading text-white">INDIGENOUS FABRICATION</h3>
                        </div>
                        <div className="space-y-6 font-mono text-sm text-gray-300">
                            <div>
                                <h4 className="text-white font-bold mb-2">CNC Carbon Fiber (330mm Frame)</h4>
                                <p>We are machining a custom 3mm 3K twill matte carbon fiber chassis to ensure sub-millimeter precision. This custom geometry optimizes component density, reducing overall wire harness length and mass.</p>
                            </div>
                            <div className="w-full h-px bg-white/10" />
                            <div>
                                <h4 className="text-white font-bold mb-2">3D Printing (TPU 95A)</h4>
                                <p>Bio-mimetic landing gear boots are printed in flexible TPU to absorb shock on uneven Martian terrain impacts (up to 5&deg; slopes). Design allows for quick field replacements.</p>
                            </div>
                        </div>
                    </div>

                    {/* Global Sourcing */}
                    <div className="glass-panel p-8 border-l-4 border-blue-500">
                        <div className="flex items-center gap-3 mb-6">
                            <Cpu className="text-blue-500" size={32} />
                            <h3 className="text-2xl font-heading text-white">GLOBAL SOURCING</h3>
                        </div>
                        <div className="space-y-6 font-mono text-sm text-gray-300">
                            <p>Critical avionics and intelligence compute modules are sourced from industry leaders to ensure TRL-9 reliability.</p>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-4">
                                    <div className="font-bold text-white min-w-[80px]">NVIDIA</div>
                                    <div className="text-gray-400">Jetson Orin Nano for Edge AI Compute.</div>
                                </li>
                                <li className="flex items-start gap-4">
                                    <div className="font-bold text-white min-w-[80px]">LUXONIS</div>
                                    <div className="text-gray-400">OAK-D Lite for Stereo Depth & Vision.</div>
                                </li>
                                <li className="flex items-start gap-4">
                                    <div className="font-bold text-white min-w-[80px]">T-MOTOR</div>
                                    <div className="text-gray-400">High-efficiency propulsion systems.</div>
                                </li>
                                <li className="flex items-start gap-4">
                                    <div className="font-bold text-white min-w-[80px]">CUBEPILOT</div>
                                    <div className="text-gray-400">Industry standard Flight Controllers (Orange+).</div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* 4. PRODUCTION TIMELINE */}
                <section>
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-1 h-8 bg-regolith" />
                        <h2 className="text-3xl font-heading">PRODUCTION TIMELINE (7 MONTHS)</h2>
                    </div>
                    <div className="glass-panel p-8">
                        <ProductionTimeline />
                    </div>
                </section>

                {/* 5. QA CHECKLIST */}
                <section className="max-w-3xl mx-auto">
                    <h2 className="text-2xl font-heading text-center mb-8 flex items-center justify-center gap-3">
                        <CheckCircle className="text-green-500" />
                        QA & VERIFICATION GATES
                    </h2>
                    <div className="grid md:grid-cols-2 gap-4">
                        {[
                            "Mass Verification (< 2.0 kg)",
                            "Propulsion Stress Tests (100% Throttle)",
                            "EMI Shielding Check (Jetson/GPS)",
                            "V-SLAM Loop Closure Test",
                            "Failsafe Trigger Verification",
                            "Autonomous Return Accuracy (< 1m)"
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ scale: 1.02 }}
                                className="bg-white/5 border border-white/10 p-4 rounded flex items-center gap-3"
                            >
                                <div className="w-2 h-2 rounded-full bg-kalinga shadow-[0_0_5px_currentColor]" />
                                <span className="font-mono text-sm">{item}</span>
                            </motion.div>
                        ))}
                    </div>
                </section>

            </div>
        </main>
    );
}
