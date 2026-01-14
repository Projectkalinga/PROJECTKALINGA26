"use client";

import Navbar from '@/components/Navbar';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Analysis() {
    const [dataPoints, setDataPoints] = useState<number[]>([]);

    useEffect(() => {
        // Simulate live data stream
        const interval = setInterval(() => {
            setDataPoints(prev => {
                const next = [...prev, Math.random() * 100];
                if (next.length > 20) next.shift();
                return next;
            });
        }, 500);
        return () => clearInterval(interval);
    }, []);

    return (
        <main className="min-h-screen bg-black text-white pt-20">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="flex justify-between items-end mb-8">
                    <div>
                        <h1 className="text-4xl font-orbitron text-white">DATA <span className="text-accent-orange">ANALYSIS</span></h1>
                        <p className="text-xs text-martian-red font-mono animate-pulse">LIVE TELEMETRY STREAM ACQUIRING...</p>
                    </div>
                    <div className="text-right font-mono text-gray-500 text-xs hidden md:block">
                        SERVER TIME: {new Date().toLocaleTimeString()} <br />
                        CONNECTION: SECURE (BIT-256)
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6 h-[600px]">
                    {/* Main Graph Area */}
                    <div className="md:col-span-2 bg-panel-bg border border-white/10 p-4 relative overflow-hidden flex flex-col">
                        <div className="absolute top-2 right-2 flex gap-2">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                            <span className="text-xs font-mono text-green-500">RX ACTIVE</span>
                        </div>

                        <h3 className="font-orbitron text-lg mb-4 text-gray-300">ATMOSPHERIC DENSITY</h3>

                        <div className="flex-1 flex items-end gap-1 relative z-10 border-b border-l border-gray-700 p-2">
                            {dataPoints.map((val, i) => (
                                <div
                                    key={i}
                                    style={{ height: `${val}%` }}
                                    className="flex-1 bg-martian-red/50 hover:bg-martian-red transition-all"
                                ></div>
                            ))}
                        </div>

                        {/* Grid Overlay */}
                        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '40px 40px', opacity: 0.1 }}></div>
                    </div>

                    {/* Side Panel - Logs */}
                    <div className="bg-black border border-white/10 p-4 font-mono text-xs overflow-hidden flex flex-col">
                        <h3 className="font-orbitron text-lg mb-4 text-white border-b border-white/20 pb-2">SYSTEM LOGS</h3>
                        <div className="flex-1 overflow-y-auto space-y-2 text-green-500/80">
                            <p>[SYS] INITIALIZING SUBSYSTEMS...</p>
                            <p>[SYS] CHECKING INTEGRITY... OK</p>
                            <p>[NET] CONNECTING TO SAT-LINK... SUCCESS</p>
                            {dataPoints.map((val, i) => (
                                <p key={i} className="opacity-80">
                                    <span className="text-gray-500">[{new Date().toLocaleTimeString()}]</span> DATA PACKET RX: {val.toFixed(2)}
                                </p>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
