"use client";

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { Box, Layers } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';
import Navbar from '@/components/Navbar';
import Scene3D from '@/components/Scene3D';
import { Stage, OrbitControls, Html } from '@react-three/drei';

// Dynamic Imports for 3D Models (View-on-Demand)
const DroneModel = dynamic(() => import('@/components/DroneModel'), {
    ssr: false,
    loading: () => <Html center><div className="text-blue-500 font-mono animate-pulse">LOADING UAV...</div></Html>
});

const BaseStationModel = dynamic(() => import('@/components/BaseStationModel'), {
    ssr: false,
    loading: () => <Html center><div className="text-green-500 font-mono animate-pulse">LOADING Z-DBS...</div></Html>
});

export default function VirtualHangarPage() {
    const [slope, setSlope] = useState(0);
    const [hoveredComponent, setHoveredComponent] = useState<string | null>(null);
    const [activeModel, setActiveModel] = useState<'UAV' | 'BASE_STATION'>('UAV');
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    return (
        <main className="w-full h-screen overflow-hidden bg-(--bg-primary) transition-colors duration-500">
            <Navbar />

            <div className="relative w-full h-full pt-20">
                {/* Tech Overlay Header */}
                <div className="absolute top-24 left-8 z-10 pointer-events-none">
                    <h2 className="text-4xl font-heading text-(--text-primary) transition-colors">VIRTUAL HANGAR</h2>
                    <div className="flex items-center gap-2 mt-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                        <span className="text-xs font-mono text-(--accent-glow)">LIVE RENDERING: {activeModel}</span>
                    </div>
                </div>

                {/* Model Selector */}
                <div className="absolute top-24 right-8 z-10 flex flex-col gap-2">
                    <label className="text-xs font-mono text-right text-(--text-secondary) transition-colors">SELECT VIEW</label>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setActiveModel('UAV')}
                            className={`px-4 py-2 rounded border flex items-center gap-2 text-xs font-bold font-mono transition-colors 
                                        ${activeModel === 'UAV'
                                    ? 'bg-(--accent-glow) text-(--bg-primary) border-(--accent-glow)'
                                    : 'bg-(--panel-glass) text-(--text-secondary) border-(--border-color) hover:border-(--text-primary)'}`}
                        >
                            <Box size={14} /> UAV
                        </button>
                        <button
                            onClick={() => setActiveModel('BASE_STATION')}
                            className={`px-4 py-2 rounded border flex items-center gap-2 text-xs font-bold font-mono transition-colors 
                                        ${activeModel === 'BASE_STATION'
                                    ? 'bg-(--accent-glow) text-(--bg-primary) border-(--accent-glow)'
                                    : 'bg-(--panel-glass) text-(--text-secondary) border-(--border-color) hover:border-(--text-primary)'}`}
                        >
                            <Layers size={14} /> Z-DBS
                        </button>
                    </div>
                </div>

                {/* Simulation Controls */}
                <div className="absolute bottom-20 right-8 z-10 w-64 glass-panel p-6 bg-(--panel-glass) border-(--border-color)">
                    <label className="text-xs font-mono block mb-2 text-(--text-primary)">TERRAIN SLOPE SIMULATION: {slope}°</label>
                    <input
                        type="range"
                        min="0"
                        max="15"
                        step="0.1"
                        value={slope}
                        onChange={(e) => setSlope(parseFloat(e.target.value))}
                        className="w-full accent-(--accent-glow)"
                    />
                </div>

                {/* 3D Scene */}
                <Scene3D>
                    <Stage
                        environment={isDark ? "city" : "studio"} // Contrast vs Soft
                        intensity={isDark ? 0.5 : 1.2} // Brighter for Day Mode visibility
                        adjustCamera={true}
                        shadows={{ type: 'contact', opacity: 0.4, blur: 2 }}
                    >
                        {activeModel === 'UAV' ? (
                            <DroneModel slope={slope} setHoveredComponent={setHoveredComponent} />
                        ) : (
                            <BaseStationModel setHoveredComponent={setHoveredComponent} />
                        )}
                    </Stage>
                    <OrbitControls makeDefault autoRotate autoRotateSpeed={0.5} />
                </Scene3D>

                {/* Info Tooltip */}
                {hoveredComponent && (
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20">
                        <div className="glass-panel p-4 border-l-4 border-(--accent-glow) backdrop-blur-md bg-(--panel-glass)">
                            <h3 className="font-heading text-lg text-(--text-primary)">{hoveredComponent}</h3>
                            <p className="text-xs font-mono text-(--text-secondary)">STATUS: NOMINAL</p>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
