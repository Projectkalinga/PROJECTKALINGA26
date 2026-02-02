"use client";

import Navbar from '@/components/Navbar';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, ShieldCheck, Power } from 'lucide-react';
import { FailsafeTable, type EmergencyScenario } from '@/components/FailsafeTable';
import { LiveStatusMonitor } from '@/components/LiveStatusMonitor';
import { EmergencyResolutionMatrix } from '@/components/EmergencyResolutionMatrix';

export default function EmergencyPage() {
    const [scenario, setScenario] = useState<EmergencyScenario>('NOMINAL');

    return (
        <main className="min-h-screen pt-20 pb-12 px-4 md:px-8 bg-[#0e100f] text-white overflow-hidden relative">
            <Navbar />

            {/* Persistent Logo Background */}
            <div className="fixed inset-0 flex items-center justify-center pointer-events-none opacity-[0.05] z-0">
                <h1 className="text-[20vw] font-black font-heading select-none">SAFE</h1>
            </div>

            {/* Red Alert Overlay - Triggered on Critical States */}
            <div className={`fixed inset-0 pointer-events-none transition-opacity duration-1000 z-0 bg-red-900/20 
                ${scenario === 'KILL_SWITCH' || scenario === 'LINK_LOSS' ? 'opacity-100 animate-pulse' : 'opacity-0'}`}
            />

            <div className="relative z-10 max-w-7xl mx-auto space-y-12">

                {/* 1. HERO SECTION */}
                <header className="flex flex-col md:flex-row justify-between items-end border-b border-white/10 pb-8 mt-8">
                    <div>
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="inline-flex items-center gap-2 text-red-500 font-mono text-xs border border-red-500/50 px-3 py-1 mb-4 rounded-full"
                        >
                            <AlertTriangle size={12} />
                            CRITICAL SYSTEMS MONITOR
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-6xl font-heading mb-4"
                        >
                            EMERGENCY <span className="text-regolith">RESPONSE</span>
                        </motion.h1>
                        <p className="text-gray-400 max-w-2xl font-mono">
                            Ensuring Mission Integrity: Autonomous SAFE Mode protocols prioritizing hardware preservation and mass compliance.
                        </p>
                    </div>
                    <div className="text-right hidden md:block">
                        <div className="text-xs text-gray-500 font-mono mb-1">CURRENT STATUS</div>
                        <div className={`text-2xl font-bold font-heading ${scenario === 'NOMINAL' ? 'text-green-500' : 'text-red-500'}`}>
                            {scenario.replace('_', ' ')}
                        </div>
                    </div>
                </header>

                {/* 2. INTERACTIVE DASHBOARD */}
                <section className="grid lg:grid-cols-2 gap-8 h-[600px]">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="h-full"
                    >
                        <FailsafeTable currentScenario={scenario} onScenarioSelect={setScenario} />
                        <div className="mt-4 p-4 bg-white/5 border border-white/10 rounded">
                            <h4 className="text-white font-bold text-sm mb-2 flex items-center gap-2">
                                <ShieldCheck size={16} className="text-blue-400" />
                                GRACEFUL DEGRADATION STRATEGY
                            </h4>
                            <p className="text-xs text-gray-400 font-mono leading-relaxed">
                                The ASCEND UAV is designed with a strict 2.0kg mass limit. To prevent kinetic impact damage, all failsafes prioritize "Soft Landing" or "Position Hold" over aggressive maneuvers.
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="h-full"
                    >
                        <LiveStatusMonitor scenario={scenario} />
                    </motion.div>
                </section>

                {/* 3. BASE STATION SAFETY (Replaced with new Matrix) */}
                <section>
                    <EmergencyResolutionMatrix
                        onSimulate={(sim: EmergencyScenario) => setScenario(sim)}
                        onKillSwitch={() => setScenario('KILL_SWITCH')}
                    />
                </section>

            </div>
        </main>
    );
}
