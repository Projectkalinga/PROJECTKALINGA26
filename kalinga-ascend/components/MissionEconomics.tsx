"use client";

import { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { motion } from 'framer-motion';
import { TrendingUp, Battery, Zap, DollarSign } from 'lucide-react';

ChartJS.register(ArcElement, Tooltip, Legend);

export function MissionEconomics() {
    const [thrust, setThrust] = useState(19); // Default hover throttle

    // Budget Data
    const budgetData = {
        labels: ['Intelligence Stack', 'Propulsion & Power', 'Structural & Base', 'Contingency'],
        datasets: [
            {
                data: [90000, 60000, 30000, 20000],
                backgroundColor: [
                    'rgba(0, 255, 127, 0.6)',  // Kalinga Green
                    'rgba(59, 130, 246, 0.6)', // Blue
                    'rgba(255, 69, 0, 0.6)',   // Martian Red
                    'rgba(255, 215, 0, 0.6)',  // Gold
                ],
                borderColor: [
                    'rgba(0, 255, 127, 1)',
                    'rgba(59, 130, 246, 1)',
                    'rgba(255, 69, 0, 1)',
                    'rgba(255, 215, 0, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const budgetOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'right' as const,
                labels: {
                    color: '#fff',
                    font: { family: 'Space Mono' }
                }
            }
        },
        cutout: '70%',
    };

    // Thrust Logic
    const DRONE_WEIGHT = 1655;
    const MAX_THRUST = 8800; // 4x 2200g
    const currentThrust = (thrust / 100) * MAX_THRUST;
    const twr = (currentThrust / DRONE_WEIGHT).toFixed(2);
    // Rough estimate: High throttle = faster drain. Base drain + (throttle * factor)
    const batteryDrain = Math.round(5 + (thrust * 0.8)); // Amps approx

    return (
        <div className="grid lg:grid-cols-2 gap-8">

            {/* 1. Budget Allocation Chart */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="glass-panel p-6 backdrop-blur-xl border-t-4 border-kalinga"
            >
                <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
                    <div className="p-2 bg-kalinga/20 rounded-lg text-kalinga">
                        <DollarSign size={20} />
                    </div>
                    <div>
                        <h3 className="text-xl font-heading text-white">CAPITAL ALLOCATION MATRIX</h3>
                        <p className="text-xs font-mono text-gray-400">TOTAL FUNDING: ₹ 2,00,000</p>
                    </div>
                </div>
                <div className="h-64 flex items-center justify-center">
                    <Doughnut data={budgetData} options={budgetOptions} />
                </div>
                <div className="mt-4 text-center">
                    <p className="text-xs font-mono text-gray-500">
                        BURN RATE: <span className="text-kalinga">NOMINAL</span> (Within 2% Variance)
                    </p>
                </div>
            </motion.div>

            {/* 2. LIVE PROPULSION SIMULATOR */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="glass-panel p-6 backdrop-blur-xl border-t-4 border-blue-500 flex flex-col justify-between"
            >
                <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
                    <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400">
                        <TrendingUp size={20} />
                    </div>
                    <div>
                        <h3 className="text-xl font-heading text-white">PROPULSION EFFICIENCY</h3>
                        <p className="text-xs font-mono text-gray-400">LIVE SYSTEM CHECK</p>
                    </div>
                </div>

                {/* Slider */}
                <div className="space-y-6">
                    <div>
                        <div className="flex justify-between text-xs font-mono text-gray-400 mb-2">
                            <span>IDLE</span>
                            <span className="text-white">THROTTLE: {thrust}%</span>
                            <span>MAX</span>
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={thrust}
                            onChange={(e) => setThrust(parseInt(e.target.value))}
                            className="w-full appearance-none bg-black/50 h-3 rounded-full outline-hidden cursor-pointer accent-blue-500 border border-white/20"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white/5 p-4 rounded border border-white/10">
                            <div className="flex items-center gap-2 mb-1">
                                <Zap size={14} className="text-yellow-400" />
                                <span className="text-xs text-gray-400 font-mono">TWR RATIO</span>
                            </div>
                            <div className={`text-2xl font-bold ${parseFloat(twr) > 2 ? 'text-green-400' : 'text-white'}`}>
                                {twr}:1
                            </div>
                        </div>
                        <div className="bg-white/5 p-4 rounded border border-white/10">
                            <div className="flex items-center gap-2 mb-1">
                                <Battery size={14} className="text-red-400" />
                                <span className="text-xs text-gray-400 font-mono">DRAIN EST.</span>
                            </div>
                            <div className="text-2xl font-bold text-white">
                                {batteryDrain}A
                            </div>
                        </div>
                    </div>

                    <div className="p-3 bg-blue-900/20 border border-blue-500/30 rounded text-xs font-mono text-blue-300">
                        {parseFloat(twr) < 1
                            ? "> WARNING: INSUFFICIENT LIFT GENERATED."
                            : "> SYSTEM OPTIMAL. POSITIVE CLIMB RATE ENABLED."}
                    </div>
                </div>
            </motion.div>

            {/* Scrolling Mission Status */}
            <div className="lg:col-span-2 bg-black border border-white/20 rounded p-2 overflow-hidden font-mono text-xs text-green-500 flex items-center gap-4">
                <span className="animate-pulse">●</span>
                <div className="whitespace-nowrap animate-marquee">
                    [MONITORING] Budget within 2% variance... [MONITORING] TWR optimal at {twr}:1... [MONITORING] Solar Harvesting Nominal... [SYSTEM] All Systems Green...
                </div>
            </div>

            <style jsx>{`
                .animate-marquee {
                    animation: marquee 20s linear infinite;
                }
                @keyframes marquee {
                    0% { transform: translateX(100%); }
                    100% { transform: translateX(-100%); }
                }
            `}</style>
        </div>
    );
}
