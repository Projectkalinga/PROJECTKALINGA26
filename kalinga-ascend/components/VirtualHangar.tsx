"use client";

import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Stage, OrbitControls, Html } from '@react-three/drei';
import { useState, useRef, Suspense } from 'react';
import * as THREE from 'three';
import { Box, Layers } from 'lucide-react';

function Model({ url, slope, setHoveredComponent, type }: { url: string; slope: number; setHoveredComponent: (s: string | null) => void, type: 'UAV' | 'BASE_STATION' }) {
    const { scene } = useGLTF(url);
    const ref = useRef<THREE.Group>(null);

    useFrame(() => {
        if (ref.current) {
            // Apply slope rotation ONLY if it's the UAV (Base station might need to stay flat or move differently, but for now we apply to both or conditionally)
            // Ideally base station sits on the slope, so we rotate it too to match the terrain simulation
            ref.current.rotation.x = THREE.MathUtils.degToRad(slope);
        }
    });

    return (
        <group ref={ref}>
            <primitive
                object={scene}
                onPointerOver={(e: any) => {
                    e.stopPropagation();
                    setHoveredComponent(type === 'UAV' ? "SYSTEM_CORE" : "BASE_CHASSIS");
                }}
                onPointerOut={(e: any) => setHoveredComponent(null)}
            />

            {/* UAV Hotspots */}
            {type === 'UAV' && (
                <>
                    <Html position={[0, 0.5, 0]}>
                        <div
                            className="w-4 h-4 bg-accent-primary rounded-full animate-ping cursor-pointer opacity-50 hover:opacity-100"
                            onMouseEnter={() => setHoveredComponent("LiDAR SENSOR")}
                            onMouseLeave={() => setHoveredComponent(null)}
                        ></div>
                    </Html>
                    <Html position={[0.5, 0, 0]}>
                        <div
                            className="w-4 h-4 bg-accent-secondary rounded-full animate-ping cursor-pointer opacity-50 hover:opacity-100"
                            onMouseEnter={() => setHoveredComponent("T-MOTOR MN4006")}
                            onMouseLeave={() => setHoveredComponent(null)}
                        ></div>
                    </Html>
                </>
            )}

            {/* Base Station Hotspots - Adjust positions based on model geometry */}
            {type === 'BASE_STATION' && (
                <>
                    <Html position={[0, 1, 0]}>
                        <div
                            className="w-4 h-4 bg-yellow-500 rounded-full animate-ping cursor-pointer opacity-50 hover:opacity-100"
                            onMouseEnter={() => setHoveredComponent("SOLAR ARRAY")}
                            onMouseLeave={() => setHoveredComponent(null)}
                        ></div>
                    </Html>
                    <Html position={[0.5, 0.2, 0.5]}>
                        <div
                            className="w-4 h-4 bg-green-500 rounded-full animate-ping cursor-pointer opacity-50 hover:opacity-100"
                            onMouseEnter={() => setHoveredComponent("POGO CHARGING INTERFACE")}
                            onMouseLeave={() => setHoveredComponent(null)}
                        ></div>
                    </Html>
                </>
            )}
        </group>
    );
}

export default function VirtualHangar() {
    const [slope, setSlope] = useState(0);
    const [hoveredComponent, setHoveredComponent] = useState<string | null>(null);
    const [activeModel, setActiveModel] = useState<'UAV' | 'BASE_STATION'>('UAV');

    return (
        <div className="w-full h-full relative bg-[#0e100f]">
            {/* Tech Overlay */}
            <div className="absolute top-20 left-8 z-10 pointer-events-none">
                <h2 className="text-4xl font-heading text-white">VIRTUAL HANGAR</h2>
                <div className="flex items-center gap-2 mt-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    <span className="text-xs font-mono text-accent-primary">LIVE RENDERING: {activeModel}</span>
                </div>
            </div>

            {/* Model Selector */}
            <div className="absolute top-20 right-8 z-10 flex flex-col gap-2">
                <label className="text-xs font-mono text-gray-500 text-right">SELECT VIEW</label>
                <div className="flex gap-2">
                    <button
                        onClick={() => setActiveModel('UAV')}
                        className={`px-4 py-2 rounded border flex items-center gap-2 text-xs font-bold font-mono transition-colors ${activeModel === 'UAV' ? 'bg-kalinga text-black border-kalinga' : 'bg-black/50 text-gray-400 border-white/20 hover:border-white/50'}`}
                    >
                        <Box size={14} /> UAV
                    </button>
                    <button
                        onClick={() => setActiveModel('BASE_STATION')}
                        className={`px-4 py-2 rounded border flex items-center gap-2 text-xs font-bold font-mono transition-colors ${activeModel === 'BASE_STATION' ? 'bg-kalinga text-black border-kalinga' : 'bg-black/50 text-gray-400 border-white/20 hover:border-white/50'}`}
                    >
                        <Layers size={14} /> Z-DBS
                    </button>
                </div>
            </div>

            {/* Controls */}
            <div className="absolute bottom-20 right-8 z-10 w-64 glass-panel p-6">
                <label className="text-xs font-mono text-gray-400 block mb-2">TERRAIN SLOPE SIMULATION: {slope}°</label>
                <input
                    type="range"
                    min="0"
                    max="15" // Increased for base station testing
                    step="0.1"
                    value={slope}
                    onChange={(e) => setSlope(parseFloat(e.target.value))}
                    className="w-full accent-[#FF4500]"
                />
            </div>

            <Canvas shadows dpr={[1, 2]} camera={{ fov: 50, position: [5, 5, 5] }}>
                <Suspense fallback={<Html center><div className="text-white font-mono animate-pulse">LOADING 3D ASSETS...</div></Html>}>
                    <Stage environment="city" intensity={0.5} adjustCamera={true}>
                        <Model
                            url={activeModel === 'UAV' ? "/models/quadcopter.glb" : "/models/base-station.glb"}
                            slope={slope}
                            setHoveredComponent={setHoveredComponent}
                            type={activeModel}
                        />
                    </Stage>
                    <OrbitControls makeDefault autoRotate autoRotateSpeed={0.5} />
                </Suspense>
            </Canvas>

            {/* Tooltip Overlay */}
            {hoveredComponent && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20">
                    <div className="glass-panel p-4 border-l-4 border-accent-secondary backdrop-blur-md">
                        <h3 className="font-heading text-lg text-white">{hoveredComponent}</h3>
                        <p className="text-xs font-mono text-gray-400">STATUS: NOMINAL</p>
                    </div>
                </div>
            )}
        </div>
    );
}
