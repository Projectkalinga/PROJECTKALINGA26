"use client";

import { motion } from 'framer-motion';
import { Activity, ShieldCheck, Zap, ChevronDown } from 'lucide-react';
import { useState } from 'react';

const testCategories = [
    {
        title: "SUB-SYSTEM CALIBRATION",
        icon: <Zap className="text-yellow-400" />,
        border: "border-yellow-500/50",
        tests: [
            {
                name: "IMU & Vibration Analysis",
                desc: "Verification of the Cube Orange+ triple-redundant IMU stability under peak RPM of 4006 Antigravity motors.",
                procedure: "Ramp motors to 100% throttle in a static jig; monitor vibration telemetry for noise ≤ 0.05 m/s².",
                status: "PASSED"
            },
            {
                name: "Sensor Noise Benchmarking",
                desc: "Accuracy check of TF-Luna LiDAR and OAK-D Lite depth mapping in low-visibility 'Dust Storm' simulations.",
                procedure: "Expose sensors to high-particulate air; verify distance accuracy within ± 2 cm at a 10m range.",
                status: "PASSED"
            }
        ]
    },
    {
        title: "SYSTEM INTEGRATION",
        icon: <Activity className="text-blue-400" />,
        border: "border-blue-500/50",
        tests: [
            {
                name: "V-SLAM Stability & Drift",
                desc: "Quantification of Visual-Inertial Odometry drift during a 50m autonomous sortie in a GNSS-denied arena.",
                procedure: "Execute a square path trajectory using Jetson-processed V-SLAM; check loop closure error. Result: <0.5m drift.",
                status: "PASSED"
            },
            {
                name: "Failsafe Loop Testing",
                desc: "End-to-end verification of the Emergency Response System for link loss and sensor failures.",
                procedure: "Manually disconnect Wi-Fi link during hover; verify autonomous RTB (Return-To-Base) within 3 seconds.",
                status: "PASSED"
            }
        ]
    },
    {
        title: "MISSION VALIDATION",
        icon: <ShieldCheck className="text-green-500" />,
        border: "border-green-500/50",
        tests: [
            {
                name: "Seeding & Search Logic",
                desc: "Jetson Orin Nano's capability to match 3-5 'Seed' images provided by the base station against arena targets.",
                procedure: "Transfer seed-file via NFC; verify UAV identifies 100% of target rock formations in the 10m x 10m arena.",
                status: "PASSED"
            },
            {
                name: "Autonomous Docking",
                desc: "Precision landing on a 5-degree sloped base station with FlexiForce contact validation.",
                procedure: "Initialize landing from 3m altitude; verify gold-plated power contacts engage base station pins with 100% success rate.",
                status: "PASSED"
            }
        ]
    }
];

export function TestMatrix() {
    const [openCard, setOpenCard] = useState<string | null>(null);

    return (
        <div className="grid lg:grid-cols-3 gap-6">
            {testCategories.map((cat, idx) => (
                <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
                    whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ duration: 0.8, delay: idx * 0.2 }}
                    className={`glass-panel p-0 border-t-4 ${cat.border} flex flex-col h-full overflow-hidden`}
                >
                    <div className="p-6 pb-2 flex items-center gap-3">
                        <div className="p-2 bg-white/5 rounded-full">{cat.icon}</div>
                        <h3 className="font-heading text-lg leading-tight tracking-wider">{cat.title}</h3>
                    </div>

                    <div className="p-4 space-y-4 grow">
                        {cat.tests.map((test, tIdx) => {
                            const isOpen = openCard === `${idx}-${tIdx}`;
                            return (
                                <motion.div
                                    key={tIdx}
                                    className="bg-white/5 rounded border border-white/10 overflow-hidden"
                                    initial={{ x: -20, opacity: 0 }}
                                    whileInView={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.5 + (idx * 0.2) + (tIdx * 0.1) }}
                                >
                                    <button
                                        onClick={() => setOpenCard(isOpen ? null : `${idx}-${tIdx}`)}
                                        className="w-full text-left p-4 flex items-start justify-between gap-4 hover:bg-white/5 transition-colors"
                                    >
                                        <div>
                                            <h4 className="font-bold text-sm text-white mb-1">{test.name}</h4>
                                            <div className="inline-flex items-center gap-2 px-2 py-0.5 rounded bg-green-900/30 border border-green-500/50">
                                                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_#22c55e]" />
                                                <span className="text-[10px] font-bold text-green-400 tracking-wider">PASSED</span>
                                            </div>
                                        </div>
                                        <ChevronDown size={16} className={`text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                                    </button>

                                    {/* Expanded Details */}
                                    <motion.div
                                        initial={false}
                                        animate={{ height: isOpen ? 'auto' : 0 }}
                                        className="overflow-hidden bg-black/20"
                                    >
                                        <div className="p-4 pt-0 border-t border-white/5 space-y-3">
                                            <div>
                                                <div className="text-[10px] font-mono text-gray-500 uppercase mb-1">Description</div>
                                                <p className="text-xs text-gray-300 font-mono leading-relaxed">{test.desc}</p>
                                            </div>
                                            <div>
                                                <div className="text-[10px] font-mono text-gray-500 uppercase mb-1">Procedure</div>
                                                <p className="text-xs text-regolith font-mono leading-relaxed">{test.procedure}</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                </motion.div>
                            );
                        })}
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
