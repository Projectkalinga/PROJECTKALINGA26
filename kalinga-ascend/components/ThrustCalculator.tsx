"use client";

import { useState } from 'react';
import { motion, animate } from 'framer-motion';
import { Gauge, ArrowUp, Activity } from 'lucide-react';

export function ThrustCalculator() {
    const [throttle, setThrottle] = useState(19); // Default to hover ~19%

    // Constants
    const MASS_GRAMS = 1655;
    const MAX_THRUST_PER_MOTOR = 2200;
    const MOTOR_COUNT = 4;
    const TOTAL_POSSIBLE_THRUST = MAX_THRUST_PER_MOTOR * MOTOR_COUNT;

    // Derived Values
    const currentThrust = Math.round((throttle / 100) * TOTAL_POSSIBLE_THRUST);
    const twr = (TOTAL_POSSIBLE_THRUST / MASS_GRAMS).toFixed(1);
    const liveTwr = (currentThrust / MASS_GRAMS).toFixed(2);

    // Industrial Standard > 2:1 is high performance
    const isHighPerformance = parseFloat(twr) > 2.0;

    return (
        <div className="glass-panel p-8 border-t-4 border-blue-500">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400">
                        <Activity size={24} />
                    </div>
                    <div>
                        <h3 className="text-xl font-heading text-white">PROPULSION & EFFICIENCY DASHBOARD</h3>
                        <p className="text-xs font-mono text-gray-400">FLIGHT DYNAMICS SIMULATOR</p>
                    </div>
                </div>
                {isHighPerformance && (
                    <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-blue-900/30 border border-blue-500/30 rounded text-blue-400 text-xs font-bold font-mono">
                        <ArrowUp size={14} />
                        HIGH PERFORMANCE
                    </div>
                )}
            </div>

            <div className="grid md:grid-cols-2 gap-12">
                {/* Visualizer */}
                <div className="relative h-64 border border-white/10 bg-black/40 rounded-lg overflow-hidden flex items-end justify-center pb-8">
                    {/* Background Grid */}
                    <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 opacity-20 pointer-events-none">
                        {[...Array(36)].map((_, i) => (
                            <div key={i} className="border border-white/10"></div>
                        ))}
                    </div>

                    {/* Drone Mass Line */}
                    <div className="absolute w-full border-t border-dashed border-red-500 bottom-[20%] text-right pr-2">
                        <span className="text-xs text-red-500 font-mono bg-black/50 px-1">MTOW: {MASS_GRAMS}g</span>
                    </div>

                    {/* Thrust Column */}
                    <div className="relative z-10 w-24 flex flex-col items-center justify-end h-full">
                        <motion.div
                            className="w-full bg-linear-to-t from-blue-900/50 to-kalinga/80 rounded-t-lg relative"
                            initial={{ height: "20%" }}
                            animate={{ height: `${Math.max(5, throttle)}%` }}
                            transition={{ type: "spring", stiffness: 100, damping: 15 }}
                        >
                            <div className="absolute -top-8 w-full text-center font-bold text-kalinga font-mono text-lg">
                                {currentThrust}g
                            </div>
                        </motion.div>
                        <div className="text-xs text-gray-500 font-mono mt-2">TOTAL THRUST</div>
                    </div>
                </div>

                {/* Controls & Metrics */}
                <div className="space-y-8">

                    {/* Throttle Control */}
                    <div>
                        <div className="flex justify-between text-xs font-mono text-gray-400 mb-2">
                            <span>IDLE (0%)</span>
                            <span className="text-white font-bold">THROTTLE: {throttle}%</span>
                            <span>MAX (100%)</span>
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={throttle}
                            onChange={(e) => setThrottle(parseInt(e.target.value))}
                            className="w-full appearance-none bg-white/10 h-2 rounded-full outline-hidden cursor-pointer accent-kalinga"
                        />
                        <div className="flex justify-between text-[10px] uppercase font-mono text-gray-600 mt-1">
                            <span className="cursor-pointer hover:text-white" onClick={() => setThrottle(0)}>Cutoff</span>
                            <span className="cursor-pointer text-kalinga font-bold hover:text-white" onClick={() => setThrottle(19)}>Hover (~19%)</span>
                            <span className="cursor-pointer hover:text-white" onClick={() => setThrottle(100)}>Punch Out</span>
                        </div>
                    </div>

                    {/* Data Grid */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-white/5 rounded border border-white/10">
                            <div className="text-xs text-gray-500 font-mono mb-1">MAX TWR</div>
                            <div className="text-2xl font-bold text-white">{twr}:1</div>
                        </div>
                        <div className="p-4 bg-white/5 rounded border border-white/10">
                            <div className="text-xs text-gray-500 font-mono mb-1">LIVE TWR</div>
                            <div className={`text-2xl font-bold ${parseFloat(liveTwr) >= 1 ? 'text-white' : 'text-red-500'}`}>
                                {liveTwr}:1
                            </div>
                        </div>
                    </div>

                    <div className="p-4 border-l-2 border-kalinga bg-kalinga/5 text-sm font-mono text-gray-300 leading-relaxed">
                        <p>
                            <span className="text-kalinga font-bold">DIAGNOSTIC:</span> Calculations confirm a
                            <span className="text-white font-bold"> {twr}:1 TWR</span>.
                            This surplus ensures rapid ascent capability and stable positioning even in simulated high-wind Martian conditions.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
