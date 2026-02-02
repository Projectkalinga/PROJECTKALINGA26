"use client";

import { motion } from 'framer-motion';
import { WifiOff, BatteryWarning, Compass, PowerOff, AlertTriangle } from 'lucide-react';

export type EmergencyScenario = 'NOMINAL' | 'LINK_LOSS' | 'LOW_BATTERY' | 'DRIFT' | 'KILL_SWITCH';

interface FailsafeTableProps {
    currentScenario: EmergencyScenario;
    onScenarioSelect: (scenario: EmergencyScenario) => void;
}

const emergencyData = [
    {
        id: 'LINK_LOSS',
        category: 'Communication',
        situation: 'Link Loss > 3s',
        response: 'Autonomous RTB',
        desc: 'Interruption triggers auto-return at current alt.',
        icon: <WifiOff className="text-red-500" />
    },
    {
        id: 'LOW_BATTERY',
        category: 'Power',
        situation: 'Voltage < 3.5V/cell',
        response: 'Immediate Landing',
        desc: 'Critical voltage initiates descent.',
        icon: <BatteryWarning className="text-orange-500" />
    },
    {
        id: 'DRIFT',
        category: 'Navigation',
        situation: 'Drift > 1.0m',
        response: 'Hover & Re-localize',
        desc: 'V-SLAM drift correction sequence.',
        icon: <Compass className="text-yellow-500" />
    },
    {
        id: 'KILL_SWITCH',
        category: 'Safety',
        situation: 'Manual Override',
        response: 'Power Cut',
        desc: 'Physical kill-switch overrides logic.',
        icon: <PowerOff className="text-red-600" />
    }
];

export function FailsafeTable({ currentScenario, onScenarioSelect }: FailsafeTableProps) {
    return (
        <div className="glass-panel p-0 overflow-hidden border border-white/10">
            <div className="p-4 bg-white/5 border-b border-white/10 flex justify-between items-center">
                <h3 className="font-heading text-lg text-white flex items-center gap-2">
                    <AlertTriangle size={18} className="text-regolith" />
                    AUTONOMOUS FAILSAFE MATRIX
                </h3>
                <button
                    onClick={() => onScenarioSelect('NOMINAL')}
                    className="text-xs font-mono text-green-400 hover:text-green-300 transition-colors uppercase"
                >
                    Reset System
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-sm font-mono text-left">
                    <thead>
                        <tr className="bg-black/20 text-gray-500 text-xs uppercase">
                            <th className="p-4">Type</th>
                            <th className="p-4">Situation</th>
                            <th className="p-4">System Response</th>
                            <th className="p-4 hidden md:table-cell">UI Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {emergencyData.map((row) => {
                            const isActive = currentScenario === row.id;
                            return (
                                <motion.tr
                                    key={row.id}
                                    onClick={() => onScenarioSelect(row.id as EmergencyScenario)}
                                    className={`cursor-pointer transition-colors ${isActive ? 'bg-red-900/20' : 'hover:bg-white/5'}`}
                                    whileHover={{ x: 5 }}
                                >
                                    <td className="p-4 flex items-center gap-3">
                                        {row.icon}
                                        <span className={isActive ? 'text-white font-bold' : 'text-gray-300'}>{row.category}</span>
                                    </td>
                                    <td className="p-4 text-white font-bold">{row.situation}</td>
                                    <td className="p-4 text-gray-300">{row.response}</td>
                                    <td className="p-4 hidden md:table-cell text-xs text-gray-500">{row.desc}</td>
                                </motion.tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
