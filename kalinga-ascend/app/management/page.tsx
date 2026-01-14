"use client";

import Navbar from '@/components/Navbar';
import { MissionEconomics } from '@/components/MissionEconomics';
import { motion } from 'framer-motion';
import { Calendar, Users, ShieldAlert, CheckCircle, AlertTriangle, ArrowRight } from 'lucide-react';
import Image from 'next/image';

export default function ManagementPage() {
    return (
        <main className="min-h-screen pt-20 pb-12 px-4 md:px-8 bg-[#0e100f] text-white relative overflow-hidden">
            <Navbar />

            {/* Background Logo Watermark - Centered & Cinematic */}
            <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
                <div className="relative w-[150vw] h-[150vw] md:w-[1000px] md:h-[1000px] opacity-[0.03] animate-[spin_120s_linear_infinite]">
                    <Image src="/KALINGA.png" alt="Watermark" fill className="object-contain" />
                </div>
            </div>

            <div className="max-w-7xl mx-auto relative z-10 space-y-20">

                {/* 1. HERO & EXECUTIVE SUMMARY */}
                <header className="space-y-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center md:text-left border-b border-white/10 pb-6 flex flex-col md:flex-row justify-between items-end"
                    >
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-mono text-gray-400 mb-4">
                                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                MISSION CONTROL : ACTIVE
                            </div>
                            <h1 className="text-5xl md:text-6xl font-heading text-white">MISSION <span className="text-regolith">GOVERNANCE</span></h1>
                            <p className="font-mono text-gray-400 mt-2 max-w-xl">Strategic logistics and operational roadmap for Project KALINGA ASCEND.</p>
                        </div>
                        <div className="hidden md:block text-right">
                            <div className="text-xs font-mono text-gray-500 uppercase">Current Phase</div>
                            <div className="text-2xl font-heading text-kalinga">SYSTEM INTEGRATION</div>
                        </div>
                    </motion.div>

                    {/* Executive Metric Table */}
                    <div className="glass-panel p-0 overflow-hidden">
                        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
                            <div className="p-6 text-center">
                                <div className="text-xs font-mono text-gray-500 uppercase mb-2">Total Budget</div>
                                <div className="text-2xl font-bold text-green-400 drop-shadow-[0_0_10px_rgba(74,222,128,0.5)]">₹ 2.0 Lakhs</div>
                            </div>
                            <div className="p-6 text-center">
                                <div className="text-xs font-mono text-gray-500 uppercase mb-2">Mission Timeline</div>
                                <div className="text-2xl font-bold text-white mb-1">4 MONTHS</div>
                                <div className="w-full max-w-[100px] h-1 bg-gray-800 mx-auto rounded-full overflow-hidden">
                                    <div className="w-[75%] h-full bg-blue-500"></div>
                                </div>
                            </div>
                            <div className="p-6 text-center">
                                <div className="text-xs font-mono text-gray-500 uppercase mb-2">Team Size</div>
                                <div className="text-2xl font-bold text-white flex justify-center items-center gap-2">
                                    <Users size={20} className="text-blue-400" /> 10
                                </div>
                            </div>
                            <div className="p-6 text-center">
                                <div className="text-xs font-mono text-gray-500 uppercase mb-2">Risk Level</div>
                                <div className="text-2xl font-bold text-red-500 animate-pulse flex justify-center items-center gap-2">
                                    <AlertTriangle size={20} /> HIGH
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* 2. MISSION ECONOMICS MODULE */}
                <section>
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-1 h-8 bg-green-500" />
                        <h2 className="text-3xl font-heading">MISSION ECONOMICS</h2>
                    </div>
                    <MissionEconomics />
                </section>

                {/* 3. TACTICAL TIMELINE */}
                <section className="grid lg:grid-cols-2 gap-12">
                    <div>
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-1 h-8 bg-blue-500" />
                            <h2 className="text-3xl font-heading">4-MONTH ROADMAP</h2>
                        </div>
                        <div className="space-y-0 border-l-2 border-dashed border-white/10 ml-4 relative">
                            {[
                                { month: "MONTH 1", phase: "Procurement & R&D", details: "Sourcing T-Motor Antigravity & Jetson Orin Nano.", status: "COMPLETED" },
                                { month: "MONTH 2", phase: "Structural Integration", details: "330mm Carbon Fiber Chassis & Z-DBS Assembly.", status: "COMPLETED" },
                                { month: "MONTH 3", phase: "System Validation", details: "Perception Stack Calibration (OAK-D, LiDAR) & V-SLAM.", status: "IN PROGRESS" },
                                { month: "MONTH 4", phase: "Mission Readiness", details: "Solar Wall Stress-Testing & Autonomous Docking Trials.", status: "PENDING" },
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="pl-8 pb-12 relative"
                                >
                                    {/* Timeline Node */}
                                    <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 border-[#0e100f] ${item.status === 'COMPLETED' ? 'bg-green-500' : item.status === 'IN PROGRESS' ? 'bg-blue-500 animate-pulse' : 'bg-gray-800'}`}></div>

                                    <div className="glass-panel p-6 border-l-4 border-white/5 hover:border-l-kalinga transition-colors">
                                        <div className="flex justify-between items-start mb-2">
                                            <span className="text-xs font-mono text-gray-500 tracking-widest">{item.month}</span>
                                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${item.status === 'COMPLETED' ? 'bg-green-900/40 text-green-400' : item.status === 'IN PROGRESS' ? 'bg-blue-900/40 text-blue-400' : 'bg-gray-800 text-gray-500'}`}>
                                                {item.status}
                                            </span>
                                        </div>
                                        <h3 className="text-lg font-bold text-white mb-2">{item.phase}</h3>
                                        <p className="text-sm font-mono text-gray-400">{item.details}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* 4. RISK MITIGATION */}
                    <div className="space-y-8">
                        <div className="flex items-center gap-4">
                            <div className="w-1 h-8 bg-red-500" />
                            <h2 className="text-3xl font-heading">CONTINGENCY MATRIX</h2>
                        </div>
                        {[
                            { title: "Technical Risk", risk: "Sensor Divergence (GPS-Denied)", mitigation: "Redundant Optical Flow (PMW3901) Fallback." },
                            { title: "Logistical Risk", risk: "Component Delivery Delays", mitigation: "Month 1 'Buffer Strategy' for critical avionics." },
                            { title: "Operational Risk", risk: "Impact Damage on Sloped Landing", mitigation: "TPU 95A shock-absorbing landing gear boots." },
                        ].map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                className="glass-panel p-6 border-l-4 border-red-500/50 hover:border-red-500 transition-colors"
                            >
                                <div className="flex items-center gap-2 mb-3">
                                    <ShieldAlert className="text-red-500" size={18} />
                                    <h3 className="font-bold text-white">{item.title}</h3>
                                </div>
                                <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 text-sm font-mono">
                                    <div className="text-gray-400">{item.risk}</div>
                                    <ArrowRight size={14} className="text-gray-600" />
                                    <div className="text-green-400">{item.mitigation}</div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* 5. MISSION CREW */}
                <section>
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-1 h-8 bg-regolith" />
                        <h2 className="text-3xl font-heading">COMMAND STRUCTURE</h2>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        {[
                            "Lead AI Architect",
                            "Propulsion Engineer",
                            "Structural Specialist",
                            "Power Systems Lead",
                            "Safety Officer",
                            "V-SLAM Analyst",
                            "Telemetry Lead",
                            "Hardware Integration",
                            "Base Station Arch.",
                            "Mission Director"
                        ].map((role, idx) => (
                            <div key={idx} className="glass-panel p-4 text-center hover:bg-white/5 transition-colors">
                                <div className="w-12 h-12 bg-gray-800 rounded-full mx-auto mb-3 border border-white/10 flex items-center justify-center">
                                    <span className="font-heading text-xs text-gray-500">K-{idx + 1}</span>
                                </div>
                                <h4 className="text-xs font-bold text-white mb-1">{role}</h4>
                                <p className="text-[10px] font-mono text-gray-500">ACTIVE</p>
                            </div>
                        ))}
                    </div>
                </section>

            </div>
        </main>
    );
}
