"use client";

import { motion } from 'framer-motion';
import { WifiOff, Compass, BatteryWarning, AlertOctagon, Anchor, Thermometer, Play, Power, CheckCircle2 } from 'lucide-react';
import type { EmergencyScenario } from './FailsafeTable';

interface EmergencyResolutionMatrixProps {
    onSimulate: (scenario: EmergencyScenario) => void;
    onKillSwitch: () => void;
}

const protocols = [
    {
        category: "Connectivity",
        scenario: "Complete Link Loss",
        color: "border-red-500",
        icon: <WifiOff className="text-red-500" />,
        procedure: "Detection of RC/GCS signal loss > 3s.",
        solution: "Immediate transition to 'Return-To-Base' (RTB) at a pre-set altitude of 10m to clear obstacles.",
        simId: 'LINK_LOSS'
    },
    {
        category: "Navigation",
        scenario: "V-SLAM Divergence",
        color: "border-yellow-500",
        icon: <Compass className="text-yellow-500" />,
        procedure: "Real-time drift detection > 0.5m via Jetson Orin Nano.",
        solution: "UAV enters 'Station-Keep' (Hover); TF-Luna LiDAR re-calibrates altitude while OAK-D Lite re-identifies visual anchors.",
        simId: 'DRIFT'
    },
    {
        category: "Power",
        scenario: "Critical Low Battery",
        color: "border-orange-500",
        icon: <BatteryWarning className="text-orange-500" />,
        procedure: "Voltage drops below 3.5V per cell (Matek PDB-HEX monitoring).",
        solution: "Abort current task; execute high-priority autonomous landing at the nearest safe coordinates or dock.",
        simId: 'LOW_BATTERY'
    },
    {
        category: "Mechanical",
        scenario: "Propeller/Motor Failure",
        color: "border-red-600",
        icon: <AlertOctagon className="text-red-600" />,
        procedure: "Sudden angular momentum shift detected by Cube Orange+ IMUs.",
        solution: "Dynamic reconfiguration of remaining 3 motors to maintain Attitude Stabilization while performing a controlled descent.",
        simId: 'KILL_SWITCH' // Using Kill Switch visual for Mechanical Failure representation in this simplified model
    },
    {
        category: "Docking",
        scenario: "Alignment Failure",
        color: "border-blue-500",
        icon: <Anchor className="text-blue-500" />,
        procedure: "ArUco markers not found during terminal descent phase.",
        solution: "Abort landing at 1m; ascend to 3m; re-scan for Base Station IR Beacon before attempting secondary alignment.",
        simId: 'NOMINAL' // Reset/Nominal behavior for visual, unique sim state might need expansion
    },
    {
        category: "Environmental",
        scenario: "Thermal/Dust Interference",
        color: "border-amber-600",
        icon: <Thermometer className="text-amber-600" />,
        procedure: "Jetson thermal throttle or LiDAR signal attenuation > 40%.",
        solution: "Activate 'SAFE Mode'; reduce processing load; initiate slow-speed descent using Optical Flow for stabilization.",
        simId: 'DRIFT' // Similar visual to Drift
    }
];

export function EmergencyResolutionMatrix({ onSimulate, onKillSwitch }: EmergencyResolutionMatrixProps) {
    return (
        <div className="space-y-8">
            <div className="flex items-center gap-4">
                <div className="w-1 h-8 bg-kalinga" />
                <h2 className="text-3xl font-heading text-white">MISSION INTEGRITY PROTOCOLS</h2>
            </div>

            <div className="glass-panel p-0 overflow-hidden border border-white/10">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-white/5 text-gray-400 text-xs font-mono uppercase tracking-wider">
                                <th className="p-6">Category / Scenario</th>
                                <th className="p-6">Detailed Procedure & Solution</th>
                                <th className="p-6 text-center">Failsafe Status</th>
                                <th className="p-6 text-right">Simulation</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {protocols.map((item, idx) => (
                                <motion.tr
                                    key={idx}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className={`group hover:bg-white/5 transition-colors border-l-4 ${item.color}`}
                                >
                                    <td className="p-6 align-top">
                                        <div className="flex items-center gap-3 mb-2">
                                            {item.icon}
                                            <span className="font-bold text-white text-sm">{item.category}</span>
                                        </div>
                                        <div className="text-xs font-mono text-gray-400 pl-9">{item.scenario}</div>
                                    </td>

                                    <td className="p-6 align-top max-w-xl">
                                        <div className="mb-3">
                                            <span className="text-[10px] text-gray-500 uppercase font-mono block mb-1">Protocol</span>
                                            <p className="text-sm text-gray-300 leading-relaxed font-mono">{item.procedure}</p>
                                        </div>
                                        <div>
                                            <span className="text-[10px] text-gray-500 uppercase font-mono block mb-1">Autonomous Solution</span>
                                            <p className="text-sm text-white leading-relaxed font-mono">{item.solution}</p>
                                        </div>
                                    </td>

                                    <td className="p-6 align-top text-center">
                                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-green-900/20 border border-green-500/30">
                                            <CheckCircle2 size={14} className="text-green-500" />
                                            <span className="text-[10px] font-bold text-green-400 tracking-wider">VERIFIED FAILSAFE</span>
                                        </div>
                                    </td>

                                    <td className="p-6 align-top text-right">
                                        <button
                                            onClick={() => onSimulate(item.simId as EmergencyScenario)}
                                            className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded transition-all group-hover:border-white/30 text-xs font-mono text-gray-300"
                                        >
                                            <Play size={12} />
                                            SIMULATE
                                        </button>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Station Master Kill Switch */}
            <div className="mt-12 flex justify-center">
                <button
                    onClick={onKillSwitch}
                    className="group relative w-full max-w-2xl overflow-hidden rounded-xl bg-red-950/30 border-2 border-red-900 px-8 py-6 transition-all hover:bg-red-900/40 hover:border-red-600 hover:shadow-[0_0_40px_rgba(220,38,38,0.4)]"
                >
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                        <div className="w-[120%] h-[200%] bg-red-600/10 rotate-12 blur-xl -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    </div>

                    <div className="relative z-10 flex flex-col items-center gap-3">
                        <Power size={48} className="text-red-600 group-hover:scale-110 transition-transform duration-300 group-hover:text-red-500" />
                        <span className="text-2xl font-black font-heading text-red-600 group-hover:text-red-500 tracking-widest">STATION MASTER KILL-SWITCH</span>
                        <span className="text-xs font-mono text-red-800 group-hover:text-red-400 tracking-[0.2em] uppercase">Emergency Global System Shutdown</span>
                    </div>
                </button>
            </div>
        </div>
    );
}
