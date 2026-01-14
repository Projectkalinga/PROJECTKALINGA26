"use client";

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Plane, Zap, Server, ShieldAlert, Radio } from 'lucide-react';

// UAV Data Hierarchy
const uavData = [
    {
        category: "Propulsion",
        items: [
            { sub: "Motors", component: "T-Motor 4006 Antigravity (x4)", mass: 268, status: "OPTIMAL" },
            { sub: "Propellers", component: "1245 Carbon Fiber 4-Blade (x4)", mass: 88, status: "OPTIMAL" }
        ]
    },
    {
        category: "Intelligence",
        items: [
            { sub: "AI Brain", component: "NVIDIA Jetson Orin Nano", mass: 240, status: "ACTIVE" },
            { sub: "Controller", component: "Cube Orange+ FC", mass: 73, status: "REDUNDANT" }
        ]
    },
    {
        category: "Perception",
        items: [
            { sub: "Vision", component: "Luxonis OAK-D Lite", mass: 61, status: "CALIBRATED" },
            { sub: "Altimetry", component: "TF-Luna LiDAR", mass: 5, status: "READY" }
        ]
    },
    {
        category: "Power",
        items: [
            { sub: "Battery", component: "4500mAh 6S LiPo", mass: 540, status: "CHARGED" }
        ]
    },
    {
        category: "Structure",
        items: [
            { sub: "Airframe", component: "330mm 3K Carbon Fiber", mass: 380, status: "RIGID" }
        ]
    }
];

// Z-DBS Data
const zdbsData = [
    {
        layer: "Computing Layer",
        component: "Integrated Jetson PC",
        desc: "Edge-data offloading & landing validation",
        icon: <Server className="text-blue-400" />
    },
    {
        layer: "Power Delivery",
        component: "24V 15A Smart Supply",
        desc: "Gold-Plated Pogo Pin Array",
        icon: <Zap className="text-yellow-400" />
    },
    {
        layer: "Energy Harvesting",
        component: "Quad-panel Solar Walls",
        desc: "Monocrystalline autonomous cycling",
        icon: <Zap className="text-green-400" />
    },
    {
        layer: "Safety Layer",
        component: "Physical E-Stop",
        desc: "Red Mushroom Button & LCD Status",
        icon: <ShieldAlert className="text-red-500" />
    },
    {
        layer: "Navigation Aids",
        component: "Passive Alignment Funnel",
        desc: "Dual high-contrast ArUco Markers (15°)",
        icon: <Radio className="text-purple-400" />
    }
];

// Calculate Total Mass
const totalMass = uavData.reduce((acc, cat) => {
    return acc + cat.items.reduce((sum, item) => sum + item.mass, 0);
}, 0);

export function MassMatrix() {
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);

    return (
        <div className="space-y-12">
            {/* 1. UAV Compliance Matrix */}
            <div className="glass-panel p-0 overflow-hidden border border-white/10">
                <div className="p-4 bg-white/5 border-b border-white/10 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <Plane className="text-regolith" />
                        <h3 className="font-heading text-lg text-white">UAV FLIGHT MASS COMPLIANCE MATRIX</h3>
                    </div>
                    <div className="text-xs font-mono text-gray-500">LIMIT: 2000g</div>
                </div>

                <div className="grid lg:grid-cols-3">
                    {/* Table Column */}
                    <div className="lg:col-span-2 overflow-x-auto">
                        <table className="w-full text-sm font-mono text-left">
                            <thead>
                                <tr className="bg-black/20 text-gray-500 text-xs uppercase tracking-wider">
                                    <th className="p-4">Category</th>
                                    <th className="p-4">Sub-System</th>
                                    <th className="p-4">Component</th>
                                    <th className="p-4 text-right">Mass (g)</th>
                                    <th className="p-4 text-center">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {uavData.map((cat, catIdx) => (
                                    cat.items.map((item, itemIdx) => (
                                        <motion.tr
                                            key={`${cat.category}-${item.sub}`}
                                            initial={{ opacity: 0, x: -10 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{ delay: (catIdx * 0.1) + (itemIdx * 0.05) }}
                                            className="hover:bg-white/5 transition-colors cursor-default group"
                                            onMouseEnter={() => setHoveredItem(item.sub)}
                                            onMouseLeave={() => setHoveredItem(null)}
                                        >
                                            {itemIdx === 0 && (
                                                <td className="p-4 text-gray-400 font-bold border-r border-white/5" rowSpan={cat.items.length}>
                                                    {cat.category}
                                                </td>
                                            )}
                                            <td className="p-4 text-gray-300 group-hover:text-white transition-colors">{item.sub}</td>
                                            <td className="p-4 text-gray-400 group-hover:text-white transition-colors">{item.component}</td>
                                            <td className="p-4 text-right font-mono text-kalinga group-hover:text-green-400 font-bold transition-colors">
                                                {item.mass}g
                                            </td>
                                            <td className="p-4 text-center">
                                                <span className="text-[10px] bg-white/5 px-2 py-0.5 rounded text-gray-400 border border-white/10 group-hover:border-kalinga group-hover:text-kalinga transition-all">
                                                    {item.status}
                                                </span>
                                            </td>
                                        </motion.tr>
                                    ))
                                ))}
                            </tbody>
                            <tfoot className="bg-white/5 font-bold">
                                <tr>
                                    <td colSpan={3} className="p-4 text-right text-gray-400 uppercase tracking-widest">Current MTOW</td>
                                    <td className={`p-4 text-right text-xl ${totalMass < 2000 ? 'text-kalinga' : 'text-red-500'}`}>
                                        {totalMass}g
                                    </td>
                                    <td className="p-4 text-center">
                                        {totalMass < 2000 && (
                                            <span className="px-2 py-1 bg-green-900/40 text-green-400 text-xs rounded border border-green-500/30">
                                                PASSED
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>

                    {/* Interactive Silhouette Column (Visual Feedback) */}
                    <div className="hidden lg:flex flex-col items-center justify-center p-8 bg-black/20 border-l border-white/10 relative">
                        {/* Placeholder 2D UAV Schematic */}
                        <div className="relative w-48 h-48 border-2 border-dashed border-white/10 rounded-full flex items-center justify-center">
                            {/* Central Core */}
                            <div className={`w-12 h-12 border border-kalinga rounded transition-all duration-300 absolute ${hoveredItem === 'AI Brain' || hoveredItem === 'Controller' ? 'bg-kalinga shadow-[0_0_20px_rgba(0,255,127,0.5)]' : 'bg-transparent'}`} />

                            {/* Arms */}
                            <div className={`absolute w-full h-1 bg-gray-700 transition-colors ${hoveredItem === 'Airframe' ? 'bg-regolith shadow-[0_0_15px_rgba(255,69,0,0.5)]' : ''}`} style={{ transform: 'rotate(45deg)' }} />
                            <div className={`absolute w-full h-1 bg-gray-700 transition-colors ${hoveredItem === 'Airframe' ? 'bg-regolith shadow-[0_0_15px_rgba(255,69,0,0.5)]' : ''}`} style={{ transform: 'rotate(-45deg)' }} />

                            {/* Motors */}
                            <div className={`absolute top-0 right-0 w-8 h-8 rounded-full border border-blue-500 transition-all ${hoveredItem === 'Motors' || hoveredItem === 'Propellers' ? 'bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.6)]' : ''}`} style={{ transform: 'translate(-10%, 10%)' }} />
                            <div className={`absolute top-0 left-0 w-8 h-8 rounded-full border border-blue-500 transition-all ${hoveredItem === 'Motors' || hoveredItem === 'Propellers' ? 'bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.6)]' : ''}`} style={{ transform: 'translate(10%, 10%)' }} />
                            <div className={`absolute bottom-0 right-0 w-8 h-8 rounded-full border border-blue-500 transition-all ${hoveredItem === 'Motors' || hoveredItem === 'Propellers' ? 'bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.6)]' : ''}`} style={{ transform: 'translate(-10%, -10%)' }} />
                            <div className={`absolute bottom-0 left-0 w-8 h-8 rounded-full border border-blue-500 transition-all ${hoveredItem === 'Motors' || hoveredItem === 'Propellers' ? 'bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.6)]' : ''}`} style={{ transform: 'translate(10%, -10%)' }} />

                            {/* Battery */}
                            <div className={`absolute bottom-8 w-16 h-8 border border-yellow-500 rounded transition-all ${hoveredItem === 'Battery' ? 'bg-yellow-500 shadow-[0_0_20px_rgba(234,179,8,0.5)]' : ''}`} />

                            {/* Cameras */}
                            <div className={`absolute top-8 w-12 h-4 border border-purple-500 rounded transition-all ${hoveredItem === 'Vision' || hoveredItem === 'Altimetry' ? 'bg-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.5)]' : ''}`} />

                            <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
                                <span className="text-[100px] font-black text-white">+</span>
                            </div>
                        </div>
                        <div className="mt-8 text-xs font-mono text-gray-500 text-center">
                            {hoveredItem ? `HIGHLIGHTING: ${hoveredItem.toUpperCase()}` : "HOVER OVER TABLE TO IDENTIFY"}
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. Z-DBS Infrastructure */}
            <div className="space-y-6">
                <div className="flex items-center gap-3">
                    <Server className="text-regolith" />
                    <h3 className="font-heading text-lg text-white">Z-DBS GROUND INFRASTRUCTURE CONFIGURATION</h3>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
                    {zdbsData.map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="glass-panel p-4 flex flex-col items-center text-center hover:border-regolith transition-colors group"
                        >
                            <div className="p-3 bg-white/5 rounded-full mb-3 group-hover:scale-110 transition-transform">
                                {item.icon}
                            </div>
                            <h4 className="font-bold text-white text-sm mb-1">{item.layer}</h4>
                            <div className="text-kalinga text-xs font-bold mb-2">{item.component}</div>
                            <p className="text-[10px] text-gray-400 font-mono leading-tight">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
