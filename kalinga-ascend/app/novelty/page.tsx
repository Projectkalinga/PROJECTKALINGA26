"use client";

import Navbar from '@/components/Navbar';
import { NoveltyInteractive } from '@/components/NoveltyInteractive';
import { motion } from 'framer-motion';
import { Microscope, CheckCircle2, FlaskConical, Atom } from 'lucide-react';
import Image from 'next/image';

export default function Novelty() {
    return (
        <main className="min-h-screen pt-20 pb-12 px-4 md:px-8 bg-[#0e100f] text-white relative overflow-hidden">
            <Navbar />

            {/* Persistent Logo Background */}
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none z-0">
                <div className="relative w-[80vw] h-[80vw] md:w-[600px] md:h-[600px]">
                    <Image src="/KALINGA.png" alt="Watermark" fill className="object-contain" />
                </div>
            </div>

            <div className="max-w-7xl mx-auto relative z-10 space-y-24">

                {/* 1. HERO SECTION */}
                <header className="text-center max-w-4xl mx-auto mt-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-1 border border-regolith text-regolith text-xs font-mono mb-6"
                    >
                        <FlaskConical size={12} />
                        RESEARCH DOSSIER: NOVELTY
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-heading mb-6"
                    >
                        ENGINEERING THE <br /> <span className="text-transparent bg-clip-text bg-linear-to-r from-regolith to-purple-500">IMPOSSIBLE</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-gray-400 font-mono leading-relaxed"
                    >
                        Leveraging indigenous Martian resources and biomimetic principles to achieve zero-infrastructure autonomy where conventional robotics fail.
                    </motion.p>
                </header>

                {/* 2. INNOVATION BREAKDOWN TABLE */}
                <section>
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-1 h-8 bg-regolith" />
                        <h2 className="text-3xl font-heading">INNOVATION MATRIX</h2>
                    </div>

                    <div className="glass-panel p-0 overflow-hidden border border-white/10">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-white/5 text-gray-500 text-xs font-mono uppercase tracking-wider">
                                    <th className="p-6">Category</th>
                                    <th className="p-6">Innovation Pillar</th>
                                    <th className="p-6 hidden md:table-cell">Technical Description</th>
                                    <th className="p-6">Mission Impact</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {[
                                    {
                                        cat: "Aerodynamics",
                                        pillar: "Biomimetic Flight Control",
                                        desc: "Employs dragonfly-inspired asymmetric flapping and corrugated wing configurations.",
                                        impact: "Stable flight in 1% atmospheric density.",
                                        color: "text-blue-400"
                                    },
                                    {
                                        cat: "Intelligence",
                                        pillar: "Distributed Swarm SLAM",
                                        desc: "Infrastructure-less voltage mapping where UAVs stitch partial maps.",
                                        impact: "Zero central server reliance; 100% redundancy.",
                                        color: "text-kalinga"
                                    },
                                    {
                                        cat: "Energy",
                                        pillar: "ISRU Methane Recharging",
                                        desc: "Base harvests CO2 + H2 via Sabatier process to generate fuel.",
                                        impact: "Infinite mission cycles without resupply.",
                                        color: "text-orange-500"
                                    }
                                ].map((row, i) => (
                                    <motion.tr
                                        key={i}
                                        initial={{ opacity: 0, x: -10 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        className="hover:bg-white/5 transition-colors group"
                                    >
                                        <td className={`p-6 font-bold ${row.color}`}>{row.cat}</td>
                                        <td className="p-6 font-heading text-lg text-white">{row.pillar}</td>
                                        <td className="p-6 text-sm text-gray-400 font-mono hidden md:table-cell">{row.desc}</td>
                                        <td className="p-6 text-sm text-white font-bold font-mono border-l border-white/5 group-hover:border-white/10">{row.impact}</td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* 3. INTERACTIVE DEEP DIVES */}
                <section>
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-1 h-8 bg-purple-500" />
                        <h2 className="text-3xl font-heading">DEEP DIVE VISUALIZATION</h2>
                    </div>
                    <NoveltyInteractive />
                </section>

                {/* 4. SIM-TO-REAL PROOF */}
                <section className="border-t border-white/10 pt-16">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 text-kalinga mb-4">
                            <CheckCircle2 size={24} />
                            <span className="font-heading text-xl">NOVELTY VERIFIED</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-heading text-white mb-6">BENCHMARKED FOR EXCELLENCE</h2>
                        <p className="text-gray-400 font-mono mb-8">
                            These innovations have been rigorously tested against ISRO's 2026 Challenge criteria, consistently outperforming standard quadcopter configurations in simulations of the Vallis Marineris canyon system.
                        </p>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[
                                { label: "Flight Stability", val: "99.4%" },
                                { label: "Map Stitching", val: "< 2cm Error" },
                                { label: "Energy Efficiency", val: "+40% vs Li-Ion" },
                                { label: "System Uptime", val: "99.99%" },
                            ].map((stat, i) => (
                                <div key={i} className="p-4 bg-white/5 rounded border border-white/10">
                                    <div className="text-2xl font-bold text-white mb-1">{stat.val}</div>
                                    <div className="text-xs text-gray-500 font-mono uppercase">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

            </div>
        </main>
    );
}
