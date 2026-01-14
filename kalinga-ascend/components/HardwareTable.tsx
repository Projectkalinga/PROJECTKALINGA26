"use client";

import { motion } from 'framer-motion';

const hardwareData = [
    { name: "T-Motor MN4006 Motors", category: "Propulsion", source: "T-Motor (Procured)", qty: 4, type: "procured" },
    { name: "Cube Orange+ FC", category: "Flight Control", source: "CubePilot (Procured)", qty: 1, type: "procured" },
    { name: "NVIDIA Jetson Orin Nano", category: "Intelligence", source: "NVIDIA (Procured)", qty: 1, type: "procured" },
    { name: "OAK-D Lite Camera", category: "Perception", source: "Luxonis (Procured)", qty: 1, type: "procured" },
    { name: "Here4 GPS", category: "Navigation", source: "CubePilot (Procured)", qty: 1, type: "procured" },
    { name: "330mm CF Main Frame", category: "Structural", source: "In-House (CNC Machined)", qty: 1, type: "custom" },
    { name: "4-Bladed Scimitar Props", category: "Propulsion", source: "In-House (Molded)", qty: 4, type: "custom" },
    { name: "TPU Landing Gear Boots", category: "Structural", source: "In-House (3D Printed)", qty: 4, type: "printed" },
    { name: "Camera Tilt-Mounts", category: "Structural", source: "In-House (3D Printed)", qty: 1, type: "printed" },
    { name: "Antenna Stalks", category: "Comms", source: "In-House (3D Printed)", qty: 2, type: "printed" },
    { name: "Passive Alignment Funnel", category: "Base Station", source: "In-House (3D Printed)", qty: 1, type: "printed" },
    { name: "Pogo Pin Interface", category: "Base Station", source: "DigiKey / In-House", qty: 4, type: "hybrid" },
    { name: "Solar Panel Walls", category: "Base Station", source: "Procured Panels / Custom Frame", qty: 4, type: "hybrid" },
];

export function HardwareTable() {
    return (
        <div className="overflow-x-auto glass-panel border border-white/10 rounded-lg">
            <table className="w-full text-sm md:text-base font-mono">
                <thead>
                    <tr className="bg-white/5 text-regolith border-b border-white/10">
                        <th className="p-4 text-left">COMPONENT NAME</th>
                        <th className="p-4 text-left">CATEGORY</th>
                        <th className="p-4 text-left">SOURCE</th>
                        <th className="p-4 text-center">QTY</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                    {hardwareData.map((item, index) => (
                        <motion.tr
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="hover:bg-white/5 transition-colors"
                        >
                            <td className="p-4 font-bold text-white">{item.name}</td>
                            <td className="p-4 text-gray-400">{item.category}</td>
                            <td className="p-4 relative">
                                <span className={`
                                    py-1 px-2 rounded text-xs font-bold uppercase
                                    ${item.type === 'procured' ? 'bg-blue-500/20 text-blue-400' : ''}
                                    ${item.type === 'custom' ? 'bg-kalinga/20 text-kalinga' : ''}
                                    ${item.type === 'printed' ? 'bg-purple-500/20 text-purple-400' : ''}
                                    ${item.type === 'hybrid' ? 'bg-yellow-500/20 text-yellow-400' : ''}
                                `}>
                                    {item.source}
                                </span>
                            </td>
                            <td className="p-4 text-center text-gray-300">{item.qty}</td>
                        </motion.tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
