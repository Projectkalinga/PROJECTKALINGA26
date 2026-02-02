"use client";

import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import {
    Wifi,
    BatteryCharging,
    Cpu,
    Eye,
    Map as MapIcon,
    Target,
    Activity,
    Anchor,
    Server,
    Zap,
    Radio
} from 'lucide-react';

gsap.registerPlugin(useGSAP, MotionPathPlugin);

export function InteractiveArchitecture() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [hoveredNode, setHoveredNode] = useState<string | null>(null);

    useGSAP(() => {
        // --- Data Packet Animations ---

        // 1. Base Station -> Flight Controller (Telemetry)
        gsap.to("#packet-telemetry", {
            motionPath: {
                path: "#path-telemetry",
                align: "#path-telemetry",
                alignOrigin: [0.5, 0.5],
                autoRotate: true
            },
            duration: 2,
            repeat: -1,
            ease: "linear"
        });

        // 2. Perception Stack Internal Loops
        gsap.to("#packet-vslam", {
            motionPath: {
                path: "#path-vslam",
                align: "#path-vslam",
                alignOrigin: [0.5, 0.5],
                autoRotate: true
            },
            duration: 3,
            repeat: -1,
            ease: "power1.inOut"
        });

        // 3. Jetson -> Cube (Command)
        gsap.to("#packet-command", {
            motionPath: {
                path: "#path-command",
                align: "#path-command",
                alignOrigin: [0.5, 0.5],
                autoRotate: true
            },
            duration: 1.5,
            repeat: -1,
            ease: "linear"
        });

        // 4. Cube -> Motors (Actuation)
        gsap.to(".packet-motor", {
            y: 50,
            opacity: 0,
            duration: 0.5,
            stagger: 0.1,
            repeat: -1,
            ease: "power1.out"
        });

        // 5. Return Loop (Blue)
        gsap.to("#packet-return", {
            motionPath: {
                path: "#path-return",
                align: "#path-return",
                alignOrigin: [0.5, 0.5],
                autoRotate: true
            },
            duration: 4,
            repeat: -1,
            ease: "linear"
        });

    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="w-full relative h-[800px] bg-[#0e100f] rounded-3xl border border-white/5 overflow-hidden shadow-2xl">

            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[40px_40px]"></div>

            {/* SVG Layer */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                <defs>
                    <filter id="neon-glow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                    <marker id="arrow-orange" markerWidth="6" markerHeight="6" refX="6" refY="3" orient="auto">
                        <path d="M0,0 L0,6 L6,3 z" fill="#FF4500" />
                    </marker>
                    <marker id="arrow-blue" markerWidth="8" markerHeight="8" refX="8" refY="4" orient="auto">
                        <path d="M0,0 L0,8 L8,4 z" fill="#00BFFF" />
                    </marker>
                </defs>

                {/* --- PATHS --- */}

                {/* 1. Base (Left) -> Cube (Right Center) */}
                <path id="path-telemetry" d="M180,400 C300,400 350,400 550,400" stroke="#FF4500" strokeWidth="2" strokeDasharray="5,5" fill="none" opacity="0.5" />
                <circle id="packet-telemetry" r="4" fill="#FF4500" filter="url(#neon-glow)" />

                {/* 2. Jetson Internal Loop (V-SLAM) */}
                <path id="path-vslam" d="M600,280 C550,280 550,180 650,180 S750,280 700,280" stroke="#00FFFF" strokeWidth="1" fill="none" opacity="0.3" />
                <circle id="packet-vslam" r="3" fill="#00FFFF" filter="url(#neon-glow)" />

                {/* 3. Jetson (Top) -> Cube (Center) */}
                <path id="path-command" d="M650,320 L650,360" stroke="#FFD700" strokeWidth="2" fill="none" markerEnd="url(#arrow-orange)" />
                <circle id="packet-command" r="3" fill="#FFD700" filter="url(#neon-glow)" />

                {/* 4. Cube -> Motors (Fan out) */}
                <line x1="680" y1="420" x2="800" y2="350" stroke="#FF4500" strokeWidth="1" opacity="0.5" />
                <line x1="680" y1="440" x2="800" y2="480" stroke="#FF4500" strokeWidth="1" opacity="0.5" />

                {/* 5. Return Path (Bottom -> Left) */}
                <path id="path-return" d="M650,600 C650,700 300,700 150,550" stroke="#00BFFF" strokeWidth="3" fill="none" opacity="0.4" markerEnd="url(#arrow-blue)" />
                <rect id="packet-return" width="8" height="4" fill="#00BFFF" filter="url(#neon-glow)" />

            </svg>

            {/* --- NODES --- */}

            {/* CLUSTER 1: BASE STATION INTERFACE (LEFT) */}
            <div className="absolute left-8 top-1/2 -translate-y-1/2 w-48 h-[500px] bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 flex flex-col justify-between z-10">
                <div className="text-center border-b border-white/5 pb-4">
                    <h3 className="font-heading text-gray-400 text-sm">BASE STATION</h3>
                    <p className="font-mono text-[10px] text-gray-600">INTERFACE</p>
                </div>

                <div className="space-y-8">
                    <NodeBlock icon={BatteryCharging} label="WIRELESS CHARGING" color="text-green-400" />
                    <NodeBlock icon={Radio} label="TELEMETRY LINK" sub="915MHz LoRa" color="text-orange-500" />
                    <NodeBlock icon={Server} label="EDGE COMPUTE" sub="DATA OFFLOAD" color="text-blue-400" />
                </div>

                <div className="text-center border-t border-white/5 pt-4">
                    <div className="inline-flex items-center gap-2 text-[10px] font-mono text-green-500">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        ONLINE
                    </div>
                </div>
            </div>

            {/* CLUSTER 2: PERCEPTION STACK (TOP CENTER) */}
            <div className="absolute top-8 left-1/2 -translate-x-1/2 w-[500px] h-[300px] border border-gray-800 bg-[#0a0a0a]/90 rounded-xl p-6 z-10">
                <div className="absolute -top-3 left-8 bg-[#0e100f] px-4 text-xs font-heading text-orange-500 border border-orange-500/30 rounded-full">
                    ASCEND PERCEPTION STACK
                </div>

                {/* Sensors Row */}
                <div className="flex justify-around mb-8 mt-4">
                    <SensorNode icon={Eye} label="OAK-D LITE" active={hoveredNode === 'oak'} onEnter={() => setHoveredNode('oak')} onLeave={() => setHoveredNode(null)} />
                    <SensorNode icon={MapIcon} label="HERE4 GPS" active={hoveredNode === 'gps'} onEnter={() => setHoveredNode('gps')} onLeave={() => setHoveredNode(null)} />
                    <SensorNode icon={Target} label="TF-LUNA LIDAR" active={hoveredNode === 'lidar'} onEnter={() => setHoveredNode('lidar')} onLeave={() => setHoveredNode(null)} />
                </div>

                {/* Jetson Core */}
                <div className="w-full bg-gray-900/50 border border-blue-500/30 rounded-lg p-4 relative">
                    <div className="text-center mb-2">
                        <h4 className="font-heading text-blue-400 text-sm">NVIDIA JETSON ORIN</h4>
                    </div>
                    <div className="flex justify-center gap-4 text-[10px] font-mono text-gray-400">
                        <div className="px-2 py-1 bg-blue-900/20 rounded border border-blue-500/20">V-SLAM LOOP</div>
                        <div className="px-2 py-1 bg-blue-900/20 rounded border border-blue-500/20">OBJ DETECTION</div>
                    </div>
                </div>
            </div>

            {/* CLUSTER 3: FLIGHT CONTROL & ACTUATION */}
            <div className="absolute top-[400px] left-1/2 -translate-x-1/2 flex items-center gap-12 z-10">

                {/* Cube Orange */}
                <motion.div
                    className="w-40 h-40 bg-[#151515] border-2 border-[#FF4500] shadow-[0_0_30px_rgba(255,69,0,0.2)] rounded-lg flex flex-col items-center justify-center relative"
                    whileHover={{ scale: 1.05, boxShadow: "0 0 50px rgba(255,69,0,0.5)" }}
                >
                    <Cpu className="text-[#FF4500] mb-2" size={40} />
                    <h3 className="font-heading text-white text-sm">CUBE ORANGE+</h3>
                    <div className="absolute -bottom-6 w-full text-center text-[10px] font-mono text-gray-500">MAVLINK MASTER</div>
                </motion.div>

                {/* Motors */}
                <div className="grid grid-cols-1 gap-4">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-orange-500 rounded-full packet-motor" />
                            <div className="px-3 py-2 bg-gray-900 border border-gray-700 rounded text-[10px] font-mono text-gray-300 w-32">
                                T-MOTOR 4006 #{i}
                            </div>
                        </div>
                    ))}
                    <div className="px-3 py-2 bg-gray-900 border border-gray-700 rounded text-[10px] font-mono text-gray-300 w-32 mt-2">
                        ESC BLHELI_32
                    </div>
                </div>
            </div>

            {/* CLUSTER 4: RETURN LOOP & LANDING */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-64 bg-gray-900/80 border border-blue-500/50 rounded-lg p-4 text-center z-10 backdrop-blur-sm">
                <Anchor className="mx-auto text-blue-400 mb-2" />
                <h4 className="font-heading text-white text-sm">TPU LANDING GEAR</h4>
                <p className="font-mono text-[10px] text-gray-400">FLEXIFORCE + GOLD CONTACTS</p>
                <div className="mt-2 text-[10px] text-blue-400 animate-pulse">AUTONOMOUS DOCKING READY</div>
            </div>

            {/* Tooltip Overlay */}
            <AnimatePresence>
                {hoveredNode && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="absolute bottom-8 right-8 w-64 bg-black/90 border border-white/20 p-4 rounded-lg backdrop-blur-xl z-50 pointer-events-none"
                    >
                        <h4 className="font-heading text-white mb-2">{getTooltipData(hoveredNode).title}</h4>
                        <p className="font-mono text-xs text-gray-400">{getTooltipData(hoveredNode).desc}</p>
                        <div className="mt-2 h-px w-full bg-white/20" />
                        <p className="mt-2 font-mono text-[10px] text-[#00BFFF]">{getTooltipData(hoveredNode).spec}</p>
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
}

// --- SUB COMPONENTS & HELPERS ---

function NodeBlock({ icon: Icon, label, sub, color }: any) {
    return (
        <div className="flex items-center gap-4 bg-black/20 p-2 rounded-lg border border-white/5 hover:border-white/20 transition-colors cursor-pointer group">
            <div className={`p-2 rounded bg-white/5 ${color} group-hover:scale-110 transition-transform`}>
                <Icon size={18} />
            </div>
            <div className="text-left">
                <div className="text-xs font-bold text-gray-300">{label}</div>
                {sub && <div className="text-[10px] font-mono text-gray-600">{sub}</div>}
            </div>
        </div>
    );
}

function SensorNode({ icon: Icon, label, active, onEnter, onLeave }: any) {
    return (
        <div
            className={`flex flex-col items-center cursor-help transition-all duration-300 ${active ? 'scale-110' : 'opacity-70 hover:opacity-100'}`}
            onMouseEnter={onEnter}
            onMouseLeave={onLeave}
        >
            <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 border ${active ? 'bg-orange-900/20 border-orange-500 text-orange-500 shadow-[0_0_15px_rgba(255,69,0,0.4)]' : 'bg-gray-800 border-gray-700 text-gray-400'}`}>
                <Icon size={20} />
            </div>
            <span className={`text-[10px] font-mono ${active ? 'text-white' : 'text-gray-500'}`}>{label}</span>
        </div>
    );
}

function getTooltipData(id: string) {
    switch (id) {
        case 'oak': return { title: 'OAK-D LITE', desc: 'Stereo depth camera with on-chip AI processing.', spec: '4K @ 30FPS | 4 TOPS' };
        case 'gps': return { title: 'HERE4 GPS', desc: 'High-precision GNSS module with RTK capabilities.', spec: 'U-BLOX F9P | CAN Bus' };
        case 'lidar': return { title: 'TF-LUNA', desc: 'Single-point MiG rangefinder for altitude hold.', spec: '8m Range | 100Hz' };
        default: return { title: 'UNKNOWN', desc: 'No data', spec: 'N/A' };
    }
}
