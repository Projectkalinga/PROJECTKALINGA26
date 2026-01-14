"use client";

import { motion } from 'framer-motion';
import { Building2, GraduationCap, ArrowRight, Star } from 'lucide-react';

export function MissionCredits() {
    return (
        <div className="py-24 border-t border-white/10 relative overflow-hidden">
            {/* Background Rolling Text Effect */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none select-none overflow-hidden">
                <div className="text-[15vw] font-black font-heading text-white whitespace-nowrap animate-marquee">
                    KIIT UNIVERSITY • DEPARTMENT OF MECHATRONICS • INNOVATION LAB • ASCEND-PRO
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-3xl md:text-5xl font-heading text-white mb-4"
                    >
                        MISSION SUPPORT & <span className="text-kalinga">FOUNDATIONS</span>
                    </motion.h2>
                    <p className="text-gray-400 font-mono max-w-2xl mx-auto">
                        Acknowledging the institutional pillars that enabled the 4-month rapid development cycle of Project KALINGA.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 mb-20">
                    {/* 1. Academic Mentorship */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 mb-6">
                            <GraduationCap className="text-kalinga" size={24} />
                            <h3 className="text-xl font-heading text-white">PRINCIPAL INVESTIGATORS</h3>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="bg-black/40 border border-martian-regolith/30 p-6 rounded-lg backdrop-blur-sm hover:border-kalinga transition-colors"
                        >
                            <div className="flex justify-between items-start mb-2">
                                <h4 className="text-2xl font-bold text-white">Dr. Anish Pandey</h4>
                                <Star className="text-kalinga animate-pulse" size={20} />
                            </div>
                            <div className="text-martian-regolith font-mono text-sm mb-4">
                                ASSOCIATE PROFESSOR, SCHOOL OF MECHANICAL ENGINEERING
                            </div>
                            <p className="text-gray-400 italic text-sm">
                                "Provided critical guidance on electromechanical system integration and structural optimization for the Martian environment."
                            </p>
                        </motion.div>
                    </div>

                    {/* 2. Institutional Matrix */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 mb-6">
                            <Building2 className="text-kalinga" size={24} />
                            <h3 className="text-xl font-heading text-white">PROJECT SUPPORT MATRIX</h3>
                        </div>
                        <div className="glass-panel p-0 overflow-hidden">
                            <table className="w-full text-left">
                                <thead className="bg-white/5 text-xs text-gray-500 uppercase font-mono">
                                    <tr>
                                        <th className="p-4">Entity</th>
                                        <th className="p-4">Contribution</th>
                                        <th className="p-4 text-right">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5 text-sm font-mono">
                                    {[
                                        { ent: "KIIT Innovation Lab", con: "Workspace & Testing Arena", stat: "PROVIDED" },
                                        { ent: "Dept. of Mechatronics", con: "CNC Fabrication Tools", stat: "GRANTED" },
                                        { ent: "Univ. Research Fund", con: "Financial Mgmt (₹ 2L)", stat: "APPROVED" }
                                    ].map((row, i) => (
                                        <tr key={i} className="hover:bg-white/5 transition-colors">
                                            <td className="p-4 font-bold text-white">{row.ent}</td>
                                            <td className="p-4 text-gray-400">{row.con}</td>
                                            <td className="p-4 text-right text-kalinga font-bold">{row.stat}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Final CTA */}
                <div className="text-center pt-12 border-t border-white/10">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="group relative inline-flex items-center gap-3 px-8 py-4 bg-kalinga text-black font-bold font-mono tracking-wider rounded-none overflow-hidden"
                    >
                        <span className="relative z-10">INITIATE FULL SYSTEM DEPLOYMENT</span>
                        <ArrowRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    </motion.button>
                    <p className="mt-4 text-[10px] font-mono text-gray-600 uppercase">
                        Authorized by Mission Control • KIIT University • Bhubaneswar
                    </p>
                </div>
            </div>
            <style jsx>{`
                .animate-marquee {
                    animation: marquee 30s linear infinite;
                }
                @keyframes marquee {
                    0% { transform: translateX(100%); }
                    100% { transform: translateX(-100%); }
                }
            `}</style>
        </div>
    );
}
