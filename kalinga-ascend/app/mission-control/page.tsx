"use client";

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import ModelViewer from '@/components/ModelViewer';
import { motion } from 'framer-motion';

export default function MissionControl() {
    const [activeModel, setActiveModel] = useState<'uav' | 'station'>('uav');

    return (
        <main className="min-h-screen bg-black text-white pt-20">
            <Navbar />

            <div className="flex flex-col h-[calc(100vh-80px)]">
                {/* Header */}
                <header className="px-8 py-4 border-b border-white/10 flex justify-between items-center bg-panel-bg">
                    <div>
                        <h1 className="text-2xl font-orbitron text-white">MISSION CONTROL // VISUALIZER</h1>
                        <p className="text-xs text-martian-red font-mono">REAL-TIME TELEMETRY LINK ESTABLISHED</p>
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={() => setActiveModel('uav')}
                            className={`px-4 py-2 text-sm font-bold font-rajdhani border transition-all ${activeModel === 'uav'
                                ? 'bg-martian-red text-white border-martian-red'
                                : 'bg-transparent text-gray-400 border-gray-700 hover:border-gray-500'
                                }`}
                        >
                            UAV M-14
                        </button>
                        <button
                            onClick={() => setActiveModel('station')}
                            className={`px-4 py-2 text-sm font-bold font-rajdhani border transition-all ${activeModel === 'station'
                                ? 'bg-martian-red text-white border-martian-red'
                                : 'bg-transparent text-gray-400 border-gray-700 hover:border-gray-500'
                                }`}
                        >
                            BASE STATION
                        </button>
                    </div>
                </header>

                {/* 3D Viewport */}
                <div className="flex-1 relative bg-linear-to-b from-gray-900 to-black overflow-hidden">

                    <motion.div
                        key={activeModel}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="w-full h-full"
                    >
                        {activeModel === 'uav' ? (
                            <ModelViewer modelUrl="/models/quadcopter.glb" />
                        ) : (
                            <ModelViewer modelUrl="/models/base-station.glb" />
                        )}
                    </motion.div>

                    {/* HUD Overlay */}
                    <div className="absolute top-4 left-4 p-4 border-l-2 border-martian-red bg-black/50 backdrop-blur-sm pointer-events-none">
                        <h3 className="font-orbitron text-lg">{activeModel === 'uav' ? 'QUADCOPTER PROTOOTYPE' : 'BASE STATION MARK I'}</h3>
                        <div className="mt-2 text-xs font-mono text-accent-orange">
                            <p>STATUS: ONLINE</p>
                            <p>BATTERY: 100%</p>
                            <p>SIGNAL: STRONG</p>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}
