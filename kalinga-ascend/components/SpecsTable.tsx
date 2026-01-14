"use client";

import { motion } from 'framer-motion';
import { Cpu, Wind, Eye, Anchor, Zap } from 'lucide-react';

const specsCategories = [
    {
        title: "PROPULSION STACK",
        icon: <Wind className="text-blue-400" />,
        items: [
            { label: "Motors", value: "T-Motor Antigravity 4006", detail: "380KV / 68g" },
            { label: "Propellers", value: "1245 Carbon Fiber", detail: "4-Bladed / 15 inch" },
            { label: "ESC", value: "T-Motor F55A Pro II", detail: "4-in-1 / 55A" },
            { label: "Max Thrust", value: "11.2 kg", detail: "2.8kg x 4" }
        ]
    },
    {
        title: "INTELLIGENCE STACK",
        icon: <Cpu className="text-regolith" />,
        items: [
            { label: "AI Computer", value: "NVIDIA Jetson Orin Nano", detail: "40 TOPS / 1024 CUDA Cores" },
            { label: "Flight Controller", value: "Cube Orange+", detail: "Triple Redundant H7" },
            { label: "Storage", value: "1TB NVMe SSD", detail: "PCIe Gen4 High-Speed Logging" }
        ]
    },
    {
        title: "PERCEPTION STACK",
        icon: <Eye className="text-purple-400" />,
        items: [
            { label: "Stereo Vision", value: "Luxonis OAK-D Lite", detail: "4K Color / Depth" },
            { label: "LiDAR", value: "TF-Luna", detail: "8m Range / 100Hz" },
            { label: "Optical Flow", value: "PMW3901", detail: "Low-Light Positioning" }
        ]
    }
];

export function SpecsTable() {
    return (
        <div className="grid md:grid-cols-3 gap-6">
            {specsCategories.map((cat, idx) => (
                <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="glass-panel p-6 border-t-4 border-white/10 hover:border-white/30 transition-colors"
                >
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
                        <div className="p-2 bg-white/5 rounded-full">{cat.icon}</div>
                        <h3 className="font-heading text-lg">{cat.title}</h3>
                    </div>
                    <div className="space-y-4">
                        {cat.items.map((item, i) => (
                            <div key={i} className="flex flex-col">
                                <span className="text-xs text-gray-500 font-mono uppercase mb-1">{item.label}</span>
                                <div className="flex justify-between items-baseline">
                                    <span className="text-white font-bold text-sm">{item.value}</span>
                                    <span className="text-xs text-kalinga">{item.detail}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
