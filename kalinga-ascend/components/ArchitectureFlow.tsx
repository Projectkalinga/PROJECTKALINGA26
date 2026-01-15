"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import {
    Cpu,
    Wifi,
    BatteryCharging,
    Zap,
    Eye,
    Map as MapIcon,
    Target,
    Anchor,
    ArrowRightLeft,
    Activity
} from 'lucide-react';

gsap.registerPlugin(useGSAP);

// Mission Phases for Stepper
const MISSION_PHASES = [
    { id: 'seeding', label: 'SEEDING & SEARCH', color: '#FF4500' }, // Regolith
    { id: 'nav', label: 'AUTONOMOUS NAV (V-SLAM)', color: '#00BFFF' }, // Blue
    { id: 'target', label: 'TARGET ID (AI)', color: '#FFD700' }, // Gold
    { id: 'docking', label: 'PRECISION DOCKING', color: '#00FF7F' }, // Kalinga Green
    { id: 'transfer', label: 'DATA/POWER TRANSFER', color: '#9370DB' }, // Purple
];

export function ArchitectureFlow() {
    const [activePhase, setActivePhase] = useState<string>('seeding');
    const [hoveredNode, setHoveredNode] = useState<string | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // GSAP Animation for Paths
    useGSAP(() => {
        // Reset all paths
        gsap.to('.flow-path', { strokeDashoffset: 0, opacity: 0.2 });
        gsap.killTweensOf('.flow-path');

        // Animate based on active activePhase
        let selector = '';
        switch (activePhase) {
            case 'seeding':
                selector = '#path-base-fcu, #path-fcu-motor, #path-fcu-comps';
                break;
            case 'nav':
                selector = '#path-gps-fcu, #path-lidar-jetson, #path-jetson-fcu';
                break;
            case 'target':
                selector = '#path-cam-jetson, #path-jetson-fcu';
                break;
            case 'docking':
                selector = '#path-lidar-jetson, #path-jetson-fcu, #path-fcu-motor';
                break;
            case 'transfer':
                selector = '#path-landing-base, #path-base-charging';
                break;
            default:
                selector = '.flow-path';
        }

        if (selector) {
            gsap.to(selector, {
                opacity: 1,
                duration: 0.5
            });
            gsap.fromTo(selector,
                { strokeDasharray: '10, 10', strokeDashoffset: 100 },
                { strokeDashoffset: 0, duration: activePhase === 'transfer' ? 1 : 2, repeat: -1, ease: 'linear' }
            );
        }

    }, { dependencies: [activePhase], scope: containerRef });

    return (
        <div className="w-full space-y-8" ref={containerRef}>

            {/* Phase Stepper - Scrollable on Mobile */}
            <div className="overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0 md:pb-0 hide-scrollbar">
                <div className="flex justify-start md:justify-center gap-2 md:gap-4 p-4 glass-panel rounded-xl border border-white/10 relative z-20 min-w-max">
                    {MISSION_PHASES.map((phase) => (
                        <button
                            key={phase.id}
                            onClick={() => setActivePhase(phase.id)}
                            className={`
                                px-4 py-2 rounded-full text-xs md:text-sm font-mono transition-all duration-300 border
                                ${activePhase === phase.id
                                    ? `bg-[${phase.color}]/10 border-[${phase.color}] text-white shadow-[0_0_15px_${phase.color}40]`
                                    : 'bg-transparent border-white/10 text-gray-400 hover:border-white/30'}
                            `}
                            style={{
                                borderColor: activePhase === phase.id ? phase.color : undefined,
                                color: activePhase === phase.id ? phase.color : undefined
                            }}
                        >
                            {phase.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Mobile: Vertical Flow Stack (< 768px) */}
            <div className="md:hidden flex flex-col gap-6 p-4 bg-[#050505] rounded-xl border border-white/10 relative overflow-hidden">
                {/* Background Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[50px_50px]"></div>

                {/* 1. Base Station (Top) */}
                <div className="relative z-10 w-full p-4 border border-white/10 rounded-xl bg-white/5 backdrop-blur-sm flex flex-col items-center">
                    <div className="text-xs font-heading text-gray-500 mb-2 w-full text-center border-b border-white/5 pb-2">BASE STATION INTERFACE</div>
                    <div className="flex justify-between w-full gap-2">
                        <Node icon={BatteryCharging} label="WIRELESS CHARGING" color="text-[#00FF7F]" bg="bg-green-900/20" border="border-[#00FF7F]/30" />
                        <ArrowRightLeft className="text-gray-600 self-center" size={16} />
                        <Node icon={Wifi} label="TELEMETRY LINK" sub="915MHz" color="text-orange-500" bg="bg-orange-900/20" border="border-orange-500/30" />
                    </div>
                    {/* Connection Line Down */}
                    <div className="absolute -bottom-6 w-0.5 h-6 bg-linear-to-b from-orange-500/50 to-orange-500/20"></div>
                </div>

                {/* 2. Flight Controller (Center) */}
                <div className="relative z-10 w-full flex justify-center py-2">
                    <motion.div
                        className="w-full max-w-[200px] bg-[#1a1a1a] border-2 border-[#FF4500] rounded-lg shadow-[0_0_30px_rgba(255,69,0,0.3)] flex flex-col items-center p-4 relative overflow-hidden"
                        whileHover={{ scale: 1.05 }}
                    >
                        <div className="absolute inset-0 bg-linear-to-br from-[#FF4500]/10 to-transparent"></div>
                        <Cpu className="text-[#FF4500] mb-2" size={32} />
                        <h3 className="font-heading text-white text-sm">CUBE ORANGE+</h3>
                        <p className="font-mono text-[10px] text-gray-400">FLIGHT CONTROLLER</p>
                    </motion.div>
                </div>

                {/* 3. Perception Stack */}
                <div className="relative z-10 w-full p-4 border border-blue-500/20 rounded-xl bg-blue-900/5 backdrop-blur-sm">
                    <div className="text-xs font-heading text-blue-400 mb-4 w-full text-center border-b border-blue-500/20 pb-2">PERCEPTION STACK</div>
                    <div className="flex flex-col gap-4 items-center">
                        <div className="flex justify-center gap-4">
                            <Node icon={Eye} label="OAK-D LITE" color="text-yellow-400" bg="bg-yellow-900/20" border="border-yellow-500/30" onHover={() => setHoveredNode('oak')} onLeave={() => setHoveredNode(null)} />
                            <Node icon={Target} label="TF-LUNA" color="text-green-400" bg="bg-green-900/20" border="border-green-500/30" onHover={() => setHoveredNode('lidar')} onLeave={() => setHoveredNode(null)} />
                        </div>
                        <div className="w-0.5 h-4 bg-blue-500/30"></div>
                        <motion.div
                            className="w-full p-3 bg-gray-900 border border-blue-500 rounded-lg flex flex-col items-center cursor-pointer"
                            onClick={() => setHoveredNode(hoveredNode === 'jetson' ? null : 'jetson')}
                            whileTap={{ scale: 0.98 }}
                        >
                            <Cpu className="text-blue-400 mb-2" size={24} />
                            <h3 className="font-heading text-white text-xs">JETSON ORIN NANO</h3>
                            <div className="text-[9px] font-mono text-gray-500 mt-2 text-center w-full">V-SLAM • OBJECT MATCHING</div>
                            {/* Mobile Tooltip Inline */}
                            <AnimatePresence>
                                {hoveredNode === 'jetson' && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                                        className="mt-2 text-[10px] font-mono text-blue-300 text-center overflow-hidden"
                                    >
                                        UART | ETHERNET | MIPI CSI-2
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </div>
                </div>

                {/* 4. Actuation */}
                <div className="relative z-10 w-full p-2 border-t border-white/10 pt-4 flex justify-between items-start">
                    <Node icon={Activity} label="MOTORS" sub="T-MOTOR" color="text-red-500" bg="bg-red-900/20" border="border-red-500/30" />
                    <Node icon={Anchor} label="LANDING" sub="TPU" color="text-purple-500" bg="bg-purple-900/20" border="border-purple-500/30" />
                    <Node icon={Activity} label="ESC" sub="BLHELI_32" color="text-red-500" bg="bg-red-900/20" border="border-red-500/30" />
                </div>
            </div>


            {/* Desktop: Interactive Diagram (> 768px) */}
            <div className="hidden md:block relative w-full h-[600px] md:h-[700px] bg-[#050505] rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
                {/* Background Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[50px_50px]"></div>

                {/* SVG Layer for Connections */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                    <defs>
                        <marker id="arrow" markerWidth="8" markerHeight="8" refX="8" refY="4" orient="auto">
                            <path d="M0,0 L0,8 L8,4 z" fill="var(--text-secondary)" />
                        </marker>
                        <marker id="arrow-active" markerWidth="8" markerHeight="8" refX="8" refY="4" orient="auto">
                            <path d="M0,0 L0,8 L8,4 z" fill="var(--accent-glow)" />
                        </marker>
                    </defs>

                    {/* --- SVG PATHS --- */}
                    {/* Cluster 1 (Base) -> Cluster 3 (FCU) */}
                    <path id="path-base-fcu" className="flow-path" d="M150,350 C250,350 300,350 400,350" stroke="var(--accent-glow)" strokeWidth="2" fill="none" />

                    {/* Cluster 2 (Perception) -> Cluster 3 (FCU) */}
                    <path id="path-jetson-fcu" className="flow-path" d="M600,200 C600,300 550,350 500,350" stroke="#00BFFF" strokeWidth="3" fill="none" />

                    {/* Sensors -> Jetson */}
                    <path id="path-cam-jetson" className="flow-path" d="M450,100 L550,150" stroke="#FFD700" strokeWidth="2" fill="none" />
                    <path id="path-lidar-jetson" className="flow-path" d="M750,100 L650,150" stroke="#00FF7F" strokeWidth="2" fill="none" />

                    {/* FCU -> Actuation */}
                    <path id="path-fcu-motor" className="flow-path" d="M500,400 L500,500" stroke="#FF4500" strokeWidth="2" fill="none" />

                    {/* Landing Gear -> Base (Return Loop) */}
                    <path id="path-landing-base" className="flow-path" d="M400,550 C200,550 150,450 150,400" stroke="#9370DB" strokeWidth="2" fill="none" strokeDasharray="5,5" />

                    {/* Base Internal */}
                    <path id="path-base-charging" className="flow-path" d="M150,300 L150,250" stroke="#00FF7F" strokeWidth="2" fill="none" />

                </svg>

                {/* --- DOM NODES --- */}

                {/* CLUSTER 1: BASE STATION */}
                <div className="absolute left-[50px] top-[250px] w-[200px] h-[300px] border border-white/10 rounded-xl bg-white/5 backdrop-blur-sm p-4 flex flex-col items-center justify-between z-10">
                    <div className="text-xs font-heading text-gray-500 mb-2 w-full text-center border-b border-white/5 pb-2">BASE STATION INTERFACE</div>

                    <Node
                        icon={BatteryCharging} label="WIRELESS CHARGING"
                        color="text-[#00FF7F]" bg="bg-green-900/20" border="border-[#00FF7F]/30"
                    />
                    <ArrowRightLeft className="text-gray-600 my-2" size={16} />
                    <Node
                        icon={Wifi} label="TELEMETRY LINK" sub="915MHz LoRa"
                        color="text-orange-500" bg="bg-orange-900/20" border="border-orange-500/30"
                    />
                </div>

                {/* CLUSTER 3: FLIGHT CONTROLLER (CENTER) */}
                <div className="absolute left-[400px] top-[300px] -translate-x-1/2 w-[180px] h-[100px] z-10">
                    <motion.div
                        className="w-full h-full bg-[#1a1a1a] border-2 border-[#FF4500] rounded-lg shadow-[0_0_30px_rgba(255,69,0,0.3)] flex flex-col items-center justify-center relative overflow-hidden group"
                        whileHover={{ scale: 1.05 }}
                    >
                        <div className="absolute inset-0 bg-linear-to-br from-[#FF4500]/10 to-transparent"></div>
                        <Cpu className="text-[#FF4500] mb-2" size={32} />
                        <h3 className="font-heading text-white text-sm">CUBE ORANGE+</h3>
                        <p className="font-mono text-[10px] text-gray-400">FLIGHT CONTROLLER</p>
                    </motion.div>
                </div>

                {/* CLUSTER 2: PERCEPTION STACK (TOP RIGHT) */}
                <div className="absolute right-[50px] top-[50px] w-[350px] h-[300px] border border-blue-500/20 rounded-xl bg-blue-900/5 backdrop-blur-sm p-4 z-10">
                    <div className="text-xs font-heading text-blue-400 mb-4 w-full text-center border-b border-blue-500/20 pb-2">ASCEND PERCEPTION STACK</div>

                    {/* Sensors Row */}
                    <div className="flex justify-between mb-8">
                        <Node
                            icon={Eye} label="OAK-D LITE"
                            color="text-yellow-400" bg="bg-yellow-900/20" border="border-yellow-500/30"
                            onHover={() => setHoveredNode('oak')} onLeave={() => setHoveredNode(null)}
                        />
                        <Node
                            icon={Target} label="TF-LUNA"
                            color="text-green-400" bg="bg-green-900/20" border="border-green-500/30"
                            onHover={() => setHoveredNode('lidar')} onLeave={() => setHoveredNode(null)}
                        />
                    </div>

                    {/* The Brain */}
                    <div className="relative w-full flex justify-center">
                        <motion.div
                            className="w-[200px] p-4 bg-gray-900 border border-blue-500 rounded-lg flex flex-col items-center z-20 cursor-help"
                            onMouseEnter={() => setHoveredNode('jetson')}
                            onMouseLeave={() => setHoveredNode(null)}
                            whileHover={{ borderColor: '#00BFFF', boxShadow: '0 0 20px rgba(0,191,255,0.3)' }}
                        >
                            <Cpu className="text-blue-400 mb-2" size={24} />
                            <h3 className="font-heading text-white text-xs">JETSON ORIN NANO</h3>
                            <div className="text-[9px] font-mono text-gray-500 mt-2 text-center w-full">
                                <div className="border-b border-gray-800 pb-1 mb-1">V-SLAM LOOP</div>
                                <div>OBJECT MATCHING</div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Tooltip Overlay */}
                    <AnimatePresence>
                        {hoveredNode === 'jetson' && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                                className="absolute bottom-4 left-0 right-0 mx-auto w-[90%] bg-black/90 border border-blue-500 p-2 rounded text-center pointer-events-none"
                            >
                                <p className="text-[10px] font-mono text-blue-300">INTERFACES: UART (MavLink) | ETHERNET | MIPI CSI-2</p>
                            </motion.div>
                        )}
                        {hoveredNode === 'oak' && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                                className="absolute top-16 left-0 bg-black/90 border border-yellow-500 p-2 rounded pointer-events-none z-30"
                            >
                                <p className="text-[10px] font-mono text-yellow-300">4K STEREO DEPTH @ 30FPS</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* CLUSTER 3: ACTUATION (BOTTOM) */}
                <div className="absolute bottom-[50px] left-0 right-0 mx-auto w-[400px] h-[150px] flex justify-center gap-8 items-end z-10">
                    <Node
                        icon={Activity} label="T-MOTOR 4006" sub="ANTIGRAVITY"
                        color="text-red-500" bg="bg-red-900/20" border="border-red-500/30"
                    />
                    <div className="flex flex-col items-center">
                        <div className="w-[2px] h-[40px] bg-linear-to-b from-[#FF4500] to-transparent mb-2"></div>
                        <Node
                            icon={Anchor} label="TPU LANDING GEAR" sub="FLEXIFORCE + CONTACTS"
                            color="text-purple-500" bg="bg-purple-900/20" border="border-purple-500/30"
                        />
                    </div>
                    <Node
                        icon={Activity} label="ESC BLHELI_32"
                        color="text-red-500" bg="bg-red-900/20" border="border-red-500/30"
                    />
                </div>

            </div>
        </div>
    );
}

// Sub-component for simple Nodes
function Node({ icon: Icon, label, sub, color, bg, border, onHover, onLeave }: any) {
    return (
        <motion.div
            className={`flex flex-col items-center justify-center p-3 rounded-lg backdrop-blur-sm border ${bg} ${border} min-w-[100px]`}
            whileHover={{ scale: 1.05 }}
            onMouseEnter={onHover}
            onMouseLeave={onLeave}
        >
            <Icon className={`${color} mb-2`} size={20} />
            <span className="text-[10px] font-heading text-white text-center leading-tight">{label}</span>
            {sub && <span className="text-[8px] font-mono text-gray-500 mt-1">{sub}</span>}
        </motion.div>
    );
}
