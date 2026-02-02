"use client";

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Cpu, Eye, Activity, Database, Radio, Battery, Anchor } from 'lucide-react';

// --- Diagram 1: System Flow (Interactive) ---
export function SystemFlowDiagram() {
    const [activeNode, setActiveNode] = useState<string | null>(null);

    const nodes = [
        { id: 'cam', label: 'OAK-D Lite', icon: Eye, x: 100, y: 100, spec: '4K Stereo Vision @ 30fps' },
        { id: 'lidar', label: 'TF-Luna', icon: Activity, x: 100, y: 250, spec: 'Range: 0.2m-8m @ 100Hz' },
        { id: 'imu', label: 'BNO085', icon: Anchor, x: 100, y: 400, spec: '9-DOF Fusion @ 1kHz' },
        { id: 'brain', label: 'NVIDIA JETSON', sub: 'Orin Nano', icon: Cpu, x: 400, y: 250, spec: '40 TOPS AI Compute', type: 'processor' },
        { id: 'fcu', label: 'CUBE ORANGE+', icon: Cpu, x: 700, y: 250, spec: 'H7 Processor, Redundant IMU', type: 'processor' },
        { id: 'esc', label: '60A ESC', icon: Activity, x: 950, y: 150, spec: 'BLHeli_32 DShot1200' },
        { id: 'motor', label: 'MN4006', icon: Activity, x: 950, y: 350, spec: 'KV380 High-Efficiency' },
    ];

    return (
        <div className="relative w-full h-[500px] bg-black/40 rounded-xl border border-white/10 overflow-hidden">
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <defs>
                    <marker id="arrow" markerWidth="10" markerHeight="10" refX="10" refY="3" orient="auto" markerUnits="strokeWidth">
                        <path d="M0,0 L0,6 L9,3 z" fill="#FF4500" />
                    </marker>
                </defs>
                {/* Connections */}
                <path d="M150,100 C250,100 250,220 350,230" stroke="#FF4500" strokeWidth="2" fill="none" markerEnd="url(#arrow)" strokeDasharray="5,5" className="animate-[pulse_2s_infinite]" />
                <path d="M150,250 L350,250" stroke="#FF4500" strokeWidth="2" fill="none" markerEnd="url(#arrow)" />
                <path d="M150,400 C250,400 250,270 350,250" stroke="#FF4500" strokeWidth="2" fill="none" markerEnd="url(#arrow)" />

                <path d="M480,250 L620,250" stroke="#00FF7F" strokeWidth="4" fill="none" markerEnd="url(#arrow)" className="opacity-50" />

                <path d="M780,250 C850,250 850,150 900,150" stroke="#FF4500" strokeWidth="2" fill="none" markerEnd="url(#arrow)" />
                <path d="M780,250 C850,250 850,350 900,350" stroke="#FF4500" strokeWidth="2" fill="none" markerEnd="url(#arrow)" />
            </svg>

            {nodes.map((node) => (
                <motion.div
                    key={node.id}
                    className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 ${activeNode === node.id ? 'z-20 scale-110' : 'z-10 hover:scale-105'}`}
                    style={{ left: node.x, top: node.y }}
                    onClick={() => setActiveNode(node.id)}
                >
                    <div className={`
                        flex flex-col items-center justify-center p-4 rounded-lg backdrop-blur-md border hover:shadow-[0_0_20px_rgba(255,69,0,0.4)]
                        ${node.type === 'processor' ? 'w-40 h-32 bg-gray-900/80 border-regolith' : 'w-24 h-24 bg-black/60 border-white/20'}
                        ${activeNode === node.id ? 'border-kalinga shadow-[0_0_30px_rgba(0,255,127,0.4)]' : ''}
                    `}>
                        <node.icon className={node.type === 'processor' ? 'text-regolith mb-2' : 'text-gray-400 mb-2'} size={24} />
                        <span className="text-xs font-heading text-center leading-tight">{node.label}</span>
                        {node.sub && <span className="text-[10px] font-mono text-gray-500">{node.sub}</span>}
                    </div>

                    {/* Tooltip */}
                    {activeNode === node.id && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-48 bg-black border border-[#00FF7F] p-2 text-center rounded pointer-events-none"
                        >
                            <p className="text-xs font-mono text-[#00FF7F]">{node.spec}</p>
                        </motion.div>
                    )}
                </motion.div>
            ))}
        </div>
    );
}

// --- Diagram 2: Mission Lifecycle (Animated) ---
export function MissionLoopDiagram() {
    return (
        <div className="relative w-full h-[400px] bg-black/40 rounded-xl border border-white/10 overflow-hidden">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[40px_40px]"></div>

            <svg className="absolute inset-0 w-full h-full">
                {/* Loop Path */}
                <path
                    d="M150,200 C150,100 400,100 650,200 C650,300 400,300 150,200"
                    fill="none"
                    stroke="#333"
                    strokeWidth="2"
                    strokeDasharray="10,10"
                />

                {/* Animated Particles */}
                <circle r="4" fill="#FF4500">
                    <animateMotion
                        dur="6s"
                        repeatCount="indefinite"
                        path="M150,200 C150,100 400,100 650,200 C650,300 400,300 150,200"
                    />
                </circle>
                <circle r="4" fill="#00FF7F">
                    <animateMotion
                        dur="6s"
                        begin="3s"
                        repeatCount="indefinite"
                        path="M150,200 C150,100 400,100 650,200 C650,300 400,300 150,200"
                    />
                </circle>

                {/* Nodes */}
                <g transform="translate(150,200)">
                    <circle r="30" fill="#0e100f" stroke="#FF4500" strokeWidth="2" />
                    <text x="0" y="45" textAnchor="middle" fill="#fff" className="text-xs font-heading">BASE STATION</text>
                    <text x="0" y="5" textAnchor="middle" fill="#FF4500" style={{ fontSize: '10px' }}>START/END</text>
                </g>

                <g transform="translate(400,100)">
                    <rect x="-40" y="-20" width="80" height="40" rx="4" fill="#0e100f" stroke="#fff" />
                    <text x="0" y="5" textAnchor="middle" fill="#fff" className="text-[10px] font-mono">SEEDING</text>
                </g>

                <g transform="translate(650,200)">
                    <circle r="30" fill="#0e100f" stroke="#00FF7F" strokeWidth="2" />
                    <text x="0" y="45" textAnchor="middle" fill="#fff" className="text-xs font-heading">UAV SORTIE</text>
                    <text x="0" y="5" textAnchor="middle" fill="#00FF7F" style={{ fontSize: '10px' }}>ACTIVE</text>
                </g>

                <g transform="translate(400,300)">
                    <rect x="-40" y="-20" width="80" height="40" rx="4" fill="#0e100f" stroke="#fff" />
                    <text x="0" y="5" textAnchor="middle" fill="#fff" className="text-[10px] font-mono">INTERFACE</text>
                </g>
            </svg>
        </div>
    );
}

// --- Failsafe Component ---
export function FailsafeLogic() {
    return (
        <div className="grid md:grid-cols-2 gap-4 text-sm font-mono">
            <div className="p-4 border border-red-500/30 bg-red-900/10 rounded">
                <h4 className="text-red-500 font-bold mb-2">TRIGGER: V-SLAM LOST</h4>
                <p className="text-gray-400">Degrade to Optical Flow (330Hz) + Barometer hold.</p>
                <div className="mt-2 text-xs text-red-400 animate-pulse">ACTION: EXECUTE RETURN_TO_HOME</div>
            </div>
            <div className="p-4 border border-red-500/30 bg-red-900/10 rounded">
                <h4 className="text-red-500 font-bold mb-2">TRIGGER: LINK TIMEOUT</h4>
                <p className="text-gray-400">If heartbeat &lt; 0.5Hz for 5000ms.</p>
                <div className="mt-2 text-xs text-red-400 animate-pulse">ACTION: ASCEND TO 50M (RELAY MODE)</div>
            </div>
        </div>
    );
}
