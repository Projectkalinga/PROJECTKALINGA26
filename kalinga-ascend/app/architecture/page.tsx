"use client";

import Navbar from '@/components/Navbar';
import { InteractiveFlowchart } from '@/components/InteractiveFlowchart';
import { MissionLoopDiagram, FailsafeLogic } from '@/components/ArchitectureDiagrams';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Architecture() {
    return (
        <main className="min-h-screen pt-20 pb-12 px-4 md:px-8 bg-(--bg-primary) text-(--text-primary) transition-colors duration-500">
            <Navbar />

            {/* Background Watermark */}
            <div className="fixed inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] z-0">
                <h1 className="text-[30vw] font-black font-heading text-(--text-primary)">ARCH</h1>
            </div>

            <div className="max-w-7xl mx-auto relative z-10 space-y-16">
                {/* 1. Hero: Dual Processor */}
                <header className="text-center max-w-5xl mx-auto mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-block px-4 py-1 border border-(--accent-glow) text-(--accent-glow) text-xs font-mono mb-4"
                    >
                        OFF-WORLD INTELLIGENCE ARCHITECTURE
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-heading mb-6 text-(--text-primary)"
                    >
                        THE <span className="text-transparent bg-clip-text bg-linear-to-r from-regolith to-kalinga">DUAL-BRAIN</span> SYSTEM
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-(--text-secondary) font-mono mb-12"
                    >
                        Separation of Concerns: <span className="text-(--text-primary) font-bold">High-Level AI</span> (Jetson) vs <span className="text-(--text-primary) font-bold">Real-Time Control</span> (Cube Orange+)
                    </motion.p>

                    {/* Dual Brain Visuals */}
                    <div className="grid md:grid-cols-2 gap-8">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                            className="glass-panel p-6 flex flex-col items-center group hover:border-kalinga transition-colors bg-(--panel-glass) border-(--border-color)"
                        >
                            <div className="relative w-64 h-64 mb-6 rounded-lg overflow-hidden border border-(--border-color) group-hover:shadow-[0_0_30px_rgba(0,255,127,0.3)] transition-all">
                                <Image
                                    src="/images/jetson_orin.png"
                                    alt="NVIDIA Jetson Orin Nano"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <h3 className="text-2xl font-heading text-kalinga">THE BRAIN</h3>
                            <p className="text-sm font-mono text-(--text-secondary) mt-2 font-bold">NVIDIA JETSON ORIN NANO</p>
                            <ul className="text-xs text-left mt-4 space-y-2 text-(--text-secondary) font-mono">
                                <li>&bull; V-SLAM Mapping (Octomap)</li>
                                <li>&bull; YOLOv8 Object Detection</li>
                                <li>&bull; Mission Planning</li>
                            </ul>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                            className="glass-panel p-6 flex flex-col items-center group hover:border-regolith transition-colors bg-(--panel-glass) border-(--border-color)"
                        >
                            <div className="relative w-64 h-64 mb-6 rounded-lg overflow-hidden border border-(--border-color) group-hover:shadow-[0_0_30px_rgba(255,69,0,0.3)] transition-all">
                                <Image
                                    src="/images/cube_orange.png"
                                    alt="Cube Orange Flight Controller"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <h3 className="text-2xl font-heading text-regolith">THE BODY</h3>
                            <p className="text-sm font-mono text-(--text-secondary) mt-2 font-bold">CUBE ORANGE+ (ADS-B)</p>
                            <ul className="text-xs text-left mt-4 space-y-2 text-(--text-secondary) font-mono">
                                <li>&bull; Triple-Redundant IMU</li>
                                <li>&bull; Motor Mixing (Coaxial)</li>
                                <li>&bull; EKF3 State Estimation</li>
                            </ul>
                        </motion.div>
                    </div>
                </header>

                {/* 2. Interactive System Flow */}
                <section>
                    <div className="flex items-center justify-between mb-8 border-b border-(--border-color) pb-4 transition-colors">
                        <h2 className="text-3xl font-heading text-(--text-primary)">SYSTEM DATA FLOW</h2>
                        <span className="text-xs font-mono text-(--text-secondary)">LIVE VIEW // MISSION PHASES</span>
                    </div>
                    {/* New Interactive Flowchart */}
                    <InteractiveFlowchart />
                </section>

                {/* 2.1 Static Architecture Diagrams (User Requested) */}
                <section className="flex flex-col gap-12">
                    <div className="glass-panel p-6 bg-(--panel-glass) border-(--border-color)">
                        <h3 className="text-2xl font-heading text-(--text-primary) mb-6 border-l-4 border-regolith pl-4">DETAILED ARCHITECTURE</h3>
                        <div className="relative w-full aspect-video border border-(--border-color) rounded overflow-hidden group bg-black/50">
                            <Image
                                src="/images/detailed architect.jpg"
                                alt="Detailed Architecture Diagram"
                                fill
                                className="object-contain"
                            />
                        </div>
                    </div>
                    <div className="glass-panel p-6 bg-(--panel-glass) border-(--border-color)">
                        <h3 className="text-2xl font-heading text-(--text-primary) mb-6 border-l-4 border-kalinga pl-4">SYSTEM ARCHITECTURE FLOW</h3>
                        <div className="relative w-full aspect-video border border-(--border-color) rounded overflow-hidden group bg-black/50">
                            <Image
                                src="/images/system architect flow.jpeg"
                                alt="System Architecture Flow"
                                fill
                                className="object-contain"
                            />
                        </div>
                    </div>
                </section>

                <div className="grid md:grid-cols-2 gap-12">
                    {/* 3. Mission Loop */}
                    <section>
                        <h2 className="text-2xl font-heading text-(--text-primary) mb-6">MISSION LIFECYCLE LOOP</h2>
                        <div className="mb-4 space-y-2 font-mono text-xs text-(--text-secondary)">
                            <div className="flex gap-2">
                                <span className="text-regolith font-bold">[PHASE A]</span>
                                <span className="md:font-bold">SEEDING: Base Station initializes map & charges UAV.</span>
                            </div>
                            <div className="flex gap-2">
                                <span className="text-kalinga font-bold">[PHASE B]</span>
                                <span className="md:font-bold">SEARCH: UAV executes localized V-SLAM sortie.</span>
                            </div>
                            <div className="flex gap-2">
                                <span className="text-(--text-primary) font-bold">[PHASE C]</span>
                                <span className="md:font-bold">INTERFACE: Docking, Data Offload, Recharge.</span>
                            </div>
                        </div>
                        <MissionLoopDiagram />
                    </section>

                    {/* 4. Interface Table & Failsafe */}
                    <section className="space-y-8">
                        <div>
                            <h2 className="text-2xl font-heading text-(--text-primary) mb-6">INTERFACE DEFINITION</h2>
                            <div className="glass-panel overflow-hidden bg-(--panel-glass) border-(--border-color)">
                                <table className="w-full text-left font-mono text-xs md:text-sm text-(--text-primary)">
                                    <thead className="bg-(--bg-secondary) text-regolith">
                                        <tr>
                                            <th className="p-4">INTERFACE</th>
                                            <th className="p-4">TYPE</th>
                                            <th className="p-4">PROTOCOL</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-(--border-color)">
                                        <tr>
                                            <td className="p-4">UAV &harr; Base</td>
                                            <td className="p-4">Telemetry</td>
                                            <td className="p-4 text-green-500 font-bold">MAVLink / 915MHz LoRa</td>
                                        </tr>
                                        <tr>
                                            <td className="p-4">Imager &rarr; Jetson</td>
                                            <td className="p-4">Data Stream</td>
                                            <td className="p-4 text-green-500 font-bold">MIPI CSI-2</td>
                                        </tr>
                                        <tr>
                                            <td className="p-4">Jetson &rarr; FCU</td>
                                            <td className="p-4">Control</td>
                                            <td className="p-4 text-green-500 font-bold">UART / ROS 2</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-2xl font-heading text-(--text-primary) mb-6 flex items-center gap-2">
                                <span className="w-3 h-3 bg-red-600 rounded-full animate-pulse"></span>
                                EMERGENCY FAILSAFE
                            </h2>
                            <FailsafeLogic />
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
}
