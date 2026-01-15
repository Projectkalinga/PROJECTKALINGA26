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
        <div className="relative my-8">

            {/* Desktop: Vertical Timeline */}
            <div className="hidden md:block border-l-2 border-white/10 ml-8 space-y-12">
                {steps.map((step, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.2 }}
                        className="relative pl-12"
                    >
                        {/* Dot Indicator */}
                        <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[#0e100f] border-2 ${step.color} shadow-[0_0_10px_currentColor]`} />

                        <h3 className={`text-xl font-heading mb-1 ${step.color.replace('border-', 'text-')}`}>{step.month}</h3>
                        <h4 className="text-lg font-bold text-white mb-2">{step.phase}</h4>
                        <p className="text-gray-400 font-mono text-sm max-w-md">{step.desc}</p>
                    </motion.div>
                ))}
            </div>

            {/* Mobile: Horizontal Swiper */}
            <div className="md:hidden flex overflow-x-auto snap-x snap-mandatory gap-4 pb-8 hide-scrollbar px-4">
                {steps.map((step, index) => (
                    <div
                        key={index}
                        className="snap-center shrink-0 w-[85vw] bg-white/5 border border-white/10 rounded-xl p-6 relative overflow-hidden"
                    >
                        <div className={`absolute top-0 left-0 w-1 h-full ${step.color.replace('border-', 'bg-')}`} />
                        <div className="flex justify-between items-start mb-4">
                            <h3 className={`text-lg font-heading ${step.color.replace('border-', 'text-')}`}>{step.month}</h3>
                            <div className={`w-3 h-3 rounded-full ${step.color.replace('border-', 'bg-')} shadow-[0_0_10px_currentColor]`} />
                        </div>
                        <h4 className="text-base font-bold text-white mb-2">{step.phase}</h4>
                        <p className="text-gray-400 font-mono text-sm leading-relaxed">{step.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
