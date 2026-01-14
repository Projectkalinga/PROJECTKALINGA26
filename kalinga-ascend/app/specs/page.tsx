"use client";

import Navbar from '@/components/Navbar';
import { SpecsTable } from '@/components/SpecsTable';
import { MassMatrix } from '@/components/MassMatrix';
import { ThrustCalculator } from '@/components/ThrustCalculator';
import { motion } from 'framer-motion';
import { Database } from 'lucide-react';

export default function SpecsPage() {
    return (
        <main className="min-h-screen pt-20 pb-12 px-4 md:px-8 bg-[#0e100f] text-white relative overflow-hidden">
            <Navbar />

            {/* Background Watermark */}
            <div className="fixed inset-0 flex items-center justify-center pointer-events-none opacity-[0.05] z-0">
                <h1 className="text-[20vw] font-black font-heading select-none">SPECS</h1>
            </div>

            <div className="max-w-7xl mx-auto relative z-10 space-y-20">

                {/* 1. HERO SECTION */}
                <header className="text-center max-w-4xl mx-auto mt-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-1 border border-blue-500 text-blue-500 text-xs font-mono mb-6"
                    >
                        <Database size={12} />
                        TECHNICAL DATASHEET
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-heading mb-6"
                    >
                        SYSTEM <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-purple-400">SPECIFICATIONS</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-gray-400 font-mono leading-relaxed"
                    >
                        Engineering for the Martian Arena: Autonomous navigation without GNSS, strictly optimized for the 2.0kg mass limit.
                    </motion.p>
                </header>

                {/* 2. UAV TECHNICAL SPECS */}
                <section>
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-1 h-8 bg-blue-500" />
                        <h2 className="text-3xl font-heading">UAV SYSTEMS CONFIGURATION</h2>
                    </div>
                    <SpecsTable />
                </section>

                {/* 3. PROPULSION & EFFICIENCY (New) */}
                <section>
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-1 h-8 bg-kalinga" />
                        <h2 className="text-3xl font-heading">FLIGHT DYNAMICS ENGINE</h2>
                    </div>
                    <ThrustCalculator />
                </section>

                {/* 4. MASS COMPLIANCE MATRIX (Updated) */}
                <section className="">
                    <MassMatrix />
                </section>

            </div>
        </main>
    );
}
