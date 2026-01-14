"use client";

import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

gsap.registerPlugin(MotionPathPlugin);

export function InteractiveFlowchart() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [activePhase, setActivePhase] = useState<number | null>(null);

    // --- GSAP ANIMATIONS ---
    useGSAP(() => {
        // 1. Data Flow: Base Station -> Cube (Orange)
        gsap.to("#packet-uplink", {
            motionPath: {
                path: "#path-uplink",
                align: "#path-uplink",
                alignOrigin: [0.5, 0.5],
                autoRotate: true
            },
            duration: 2,
            repeat: -1,
            ease: "linear"
        });

        // 2. Data Flow: Return Loop (Cyan)
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

        // 3. Perception Loop
        gsap.to("#packet-perception", {
            motionPath: {
                path: "#path-perception",
                align: "#path-perception",
                alignOrigin: [0.5, 0.5],
                autoRotate: true
            },
            duration: 3,
            repeat: -1,
            ease: "power1.inOut"
        });

    }, { scope: containerRef });

    // --- HELPER: Check if node is active based on phase ---
    const isNodeActive = (phases: number[]) => {
        if (activePhase === null) return false;
        return phases.includes(activePhase);
    };

    return (
        <div ref={containerRef} className="w-full bg-[#0e100f] relative overflow-hidden rounded-xl border border-white/10 shadow-2xl">
            {/* Background Grid */}
            <div className="absolute inset-0 z-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[100px_100px]" />

            <div className="relative z-10 w-full aspect-4/3 md:aspect-video">
                <svg
                    viewBox="0 0 1200 900"
                    className="w-full h-full font-mono font-bold tracking-tighter"
                    style={{ fontFamily: "'Space Mono', monospace" }}
                >
                    <defs>
                        <filter id="glow-orange" x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                            <feMerge>
                                <feMergeNode in="coloredBlur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                        <filter id="glow-cyan" x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                            <feMerge>
                                <feMergeNode in="coloredBlur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                        <marker id="arrow-orange" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
                            <path d="M0,0 L10,5 L0,10" fill="#FF4500" />
                        </marker>
                        <marker id="arrow-cyan" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
                            <path d="M0,0 L10,5 L0,10" fill="#00CED1" />
                        </marker>
                    </defs>

                    {/* --- PATHS --- */}

                    {/* Uplink: Base -> Cube */}
                    <path
                        id="path-uplink"
                        d="M 300 250 L 500 500"
                        fill="none"
                        stroke="#FF4500"
                        strokeWidth="2"
                        strokeDasharray="5,5"
                        opacity="0.5"
                    />
                    <circle id="packet-uplink" r="4" fill="#FF4500" filter="url(#glow-orange)" />

                    {/* Return Loop: Landing -> Base */}
                    <path
                        id="path-return"
                        d="M 500 800 C 500 900, 150 900, 150 700 L 150 450"
                        fill="none"
                        stroke="#00CED1"
                        strokeWidth="3"
                        opacity="0.6"
                    />
                    <circle id="packet-return" r="5" fill="#00CED1" filter="url(#glow-cyan)" />

                    {/* Perception Loop (Internal) */}
                    <path
                        id="path-perception"
                        d="M 950 250 Q 1100 250 1100 400 T 950 550 T 800 400 T 950 250"
                        fill="none"
                        stroke="#00CED1"
                        strokeWidth="1"
                        opacity="0.2"
                    />
                    <circle id="packet-perception" r="3" fill="#00CED1" />


                    {/* --- NODES --- */}

                    {/* 1. LEFT COLUMN: BASE STATION (x=50) */}
                    <g transform="translate(50, 100)" className="group">
                        <rect
                            width="250" height="400"
                            fill="rgba(20,20,30,0.8)"
                            stroke="#FF4500"
                            strokeWidth="1"
                            rx="10"
                            className={cn("transition-all duration-300", isNodeActive([1, 5]) ? "stroke-[3px] shadow-[0_0_20px_#FF4500]" : "opacity-80")}
                        />
                        <text x="125" y="40" textAnchor="middle" fill="#FF4500" fontSize="14">BASE STATION INTERFACE</text>

                        {/* Sub-nodes */}
                        <g transform="translate(25, 80)">
                            <rect width="200" height="60" fill="#000" stroke="#333" rx="4" />
                            <text x="100" y="35" textAnchor="middle" fill="white" fontSize="12">WIRELESS CHARGING</text>
                        </g>
                        <g transform="translate(25, 160)">
                            <rect width="200" height="60" fill="#000" stroke="#333" rx="4" />
                            <text x="100" y="35" textAnchor="middle" fill="white" fontSize="12">TELEMETRY (915MHz)</text>
                        </g>
                        <g transform="translate(25, 240)">
                            <rect width="200" height="60" fill="#000" stroke="#333" rx="4" />
                            <text x="100" y="35" textAnchor="middle" fill="white" fontSize="12">EDGE COMPUTE</text>
                        </g>
                    </g>


                    {/* 2. CENTRAL CORE: CUBE ORANGE+ (x=500, y=500) */}
                    <g
                        transform="translate(500, 500)"
                        className="cursor-pointer"
                    >
                        {/* Center Point wrapper for centering */}
                        <g transform="translate(-75, -75)">
                            <rect
                                width="150" height="150"
                                fill="#1a1a1a"
                                stroke="#FF4500"
                                strokeWidth="4"
                                filter="url(#glow-orange)"
                                className={cn("transition-all duration-300", isNodeActive([2, 3, 4]) ? "scale-110" : "")}
                            />
                            <text x="75" y="-20" textAnchor="middle" fill="#FF4500" fontSize="16" letterSpacing="2">FLIGHT CONTROLLER</text>
                            <text x="75" y="75" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">CUBE ORANGE+</text>
                            <text x="75" y="100" textAnchor="middle" fill="#666" fontSize="10">REDUNDANT IMU</text>
                        </g>
                    </g>

                    {/* MOTORS (Stacked Right of Cube) */}
                    {[1, 2, 3, 4].map((i) => (
                        <g key={i} transform={`translate(700, ${350 + (i * 80)})`}>
                            <line x1="-50" y1="15" x2="-125" y2="15" stroke="#FF4500" strokeWidth="1" /> {/* Connection to Cube area */}
                            <rect width="120" height="30" fill="#111" stroke="#00FF7F" strokeWidth="1" rx="15" />
                            <text x="60" y="20" textAnchor="middle" fill="#00FF7F" fontSize="10">M{i}: T-MOTOR 4006</text>
                        </g>
                    ))}

                    {/* LANDING GEAR (y=800) */}
                    <g transform="translate(500, 800)">
                        <g transform="translate(-80, -30)">
                            <path d="M 80 0 L 80 -150" stroke="#FF4500" strokeWidth="2" strokeDasharray="5,5" /> {/* Down from Cube */}
                            <rect
                                width="160" height="60"
                                fill="#0a1a2a"
                                stroke="#00CED1"
                                strokeWidth="2"
                                className={cn("transition-all duration-300", isNodeActive([5]) ? "shadow-[0_0_15px_#00CED1]" : "")}
                            />
                            <text x="80" y="35" textAnchor="middle" fill="#00CED1" fontSize="12">TPU LANDING GEAR</text>
                        </g>
                    </g>


                    {/* 3. RIGHT COLUMN: PERCEPTION STACK (x=850) */}
                    <g transform="translate(850, 100)">
                        <rect
                            width="300" height="500"
                            fill="rgba(10,10,15,0.9)"
                            stroke="#FF4500"
                            strokeWidth="2"
                            rx="20"
                            filter="url(#glow-orange)"
                            className={cn("transition-all duration-300", isNodeActive([3]) ? "stroke-[4px]" : "")}
                        />
                        <text x="150" y="40" textAnchor="middle" fill="white" fontSize="16" letterSpacing="1">ASCEND PERCEPTION STACK</text>

                        {/* Top Sensors */}
                        <g transform="translate(30, 80)">
                            <circle cx="40" cy="40" r="30" fill="#222" stroke="#00FF7F" />
                            <text x="40" y="45" textAnchor="middle" fill="white" fontSize="8">OAK-D</text>
                            <circle cx="120" cy="40" r="30" fill="#222" stroke="#00FF7F" />
                            <text x="120" y="45" textAnchor="middle" fill="white" fontSize="8">GPS</text>
                            <circle cx="200" cy="40" r="30" fill="#222" stroke="#00FF7F" />
                            <text x="200" y="45" textAnchor="middle" fill="white" fontSize="8">LiDAR</text>
                        </g>

                        {/* Jetson Orin Block */}
                        <g transform="translate(25, 200)">
                            <rect width="250" height="250" fill="#111" stroke="#333" />
                            <text x="125" y="30" textAnchor="middle" fill="#00CED1" fontSize="14" fontWeight="bold">NVIDIA JETSON ORIN</text>

                            <rect x="25" y="60" width="200" height="40" fill="#002" stroke="#00CED1" rx="5" />
                            <text x="125" y="85" textAnchor="middle" fill="#00CED1" fontSize="10">V-SLAM LOOP</text>

                            <rect x="25" y="120" width="200" height="40" fill="#002" stroke="#00CED1" rx="5" />
                            <text x="125" y="145" textAnchor="middle" fill="#00CED1" fontSize="10">OBJ DETECTION</text>
                        </g>
                    </g>

                </svg>

                {/* --- INTERFACE OVERLAY --- */}
                <div className="absolute bottom-4 left-0 w-full flex justify-center gap-2 px-4">
                    {[
                        { id: 1, label: "PRE-ARM" },
                        { id: 2, label: "TAKEOFF" },
                        { id: 3, label: "MAPPING" },
                        { id: 4, label: "RETURN" },
                        { id: 5, label: "LANDING" }
                    ].map((phase) => (
                        <button
                            key={phase.id}
                            onMouseEnter={() => setActivePhase(phase.id)}
                            onMouseLeave={() => setActivePhase(null)}
                            className="bg-black/80 backdrop-blur border border-white/20 px-4 py-2 rounded text-[10px] text-white hover:bg-white/10 hover:border-kalinga transition-all font-mono"
                        >
                            {phase.id}. {phase.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
