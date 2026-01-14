"use client";

import { motion } from 'framer-motion';

const steps = [
    { month: "Month 1-2", phase: "Procurement & Bench-Tests", desc: "Sourcing core electronics (Cube, Jetson). Initial bench-top integration tests for sensor compatibility.", color: "border-blue-500" },
    { month: "Month 3-4", phase: "Fabrication & Integration", desc: "CNC machining of CF frame. 3D printing of TPU mounts. Full hardware assembly and wiring harness creation.", color: "border-kalinga" },
    { month: "Month 5-6", phase: "Tuning & Calibration", desc: "PID tuning for flight dynamics. Comparison of simulated vs. real-world mass models. V-SLAM algorithm calibration.", color: "border-purple-500" },
    { month: "Month 7", phase: "Field Readiness", desc: "Full mission simulation in analog environments. Stress testing failsafes and autonomous return logic.", color: "border-regolith" },
];

export function ProductionTimeline() {
    return (
        <div className="relative border-l-2 border-white/10 ml-4 md:ml-8 my-8 space-y-12">
            {steps.map((step, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2 }}
                    className="relative pl-8 md:pl-12"
                >
                    {/* Dot Indicator */}
                    <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[#0e100f] border-2 ${step.color} shadow-[0_0_10px_currentColor]`} />

                    <h3 className={`text-xl font-heading mb-1 ${step.color.replace('border-', 'text-')}`}>{step.month}</h3>
                    <h4 className="text-lg font-bold text-white mb-2">{step.phase}</h4>
                    <p className="text-gray-400 font-mono text-sm max-w-md">{step.desc}</p>
                </motion.div>
            ))}
        </div>
    );
}
