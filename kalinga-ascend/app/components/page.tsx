"use client";

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import { hardwareInventory, ComponentCategory } from '@/data/hardware-inventory';
import { ComponentCard } from '@/components/ComponentCard';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter } from 'lucide-react';

type FilterType = 'All' | 'UAV Hardware' | 'Base Station Hardware';

export default function ComponentsPage() {
    const [activeFilter, setActiveFilter] = useState<FilterType>('All');

    const filteredData = hardwareInventory.filter(item => {
        if (activeFilter === 'All') return true;
        if (activeFilter === 'Base Station Hardware') return item.category === 'Base Station';
        // 'UAV Hardware' includes everything else
        return item.category !== 'Base Station';
    });

    return (
        <main className="min-h-screen bg-[#0e100f] text-white pt-20 pb-20 selection:bg-kalinga selection:text-black">
            <Navbar />

            {/* Background Decor */}
            <div className="fixed inset-0 bg-[linear-gradient(rgba(20,20,20,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(20,20,20,0.5)_1px,transparent_1px)] bg-size-[100px_100px] pointer-events-none -z-10" />
            <div className="fixed top-0 left-0 w-full h-32 bg-linear-to-b from-[#0e100f] to-transparent z-10 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-20">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-white/10 pb-8 mt-12">
                    <div>
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-xs font-mono text-regolith mb-2 flex items-center gap-2"
                        >
                            <div className="w-2 h-2 bg-regolith rounded-full animate-pulse" />
                            RESTRICTED ACCESS // LEVEL 4
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-5xl md:text-6xl font-heading text-white tracking-tight"
                        >
                            ENGINEERING <span className="text-transparent bg-clip-text bg-linear-to-r from-gray-200 to-gray-600">SHOWROOM</span>
                        </motion.h1>
                        <p className="text-gray-400 font-mono mt-4 max-w-xl">
                            Comprehensive inventory of ASCEND-Pro mission hardware. Optimized for mass compliance and Martian environmental durability.
                        </p>
                    </div>

                    {/* Filter Bar */}
                    <div className="flex gap-2 mt-8 md:mt-0 bg-black/40 p-1 rounded-lg border border-white/10 backdrop-blur-sm">
                        {['All', 'UAV Hardware', 'Base Station Hardware'].map((filter) => (
                            <button
                                key={filter}
                                onClick={() => setActiveFilter(filter as FilterType)}
                                className={`px-4 py-2 rounded-md text-xs font-mono transition-all duration-300 ${activeFilter === filter
                                    ? 'bg-white/10 text-white shadow-[0_0_15px_rgba(255,255,255,0.1)]'
                                    : 'text-gray-500 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Grid Layout */}
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                >
                    <AnimatePresence mode='popLayout'>
                        {filteredData.map((item, index) => (
                            <ComponentCard key={item.id} data={item} index={index} />
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* Empty State */}
                {filteredData.length === 0 && (
                    <div className="w-full py-32 text-center text-gray-600 font-mono border border-dashed border-white/10 rounded-xl">
                        NO COMPONENTS FOUND MATCHING CRITERIA
                    </div>
                )}
            </div>
        </main>
    );
}
