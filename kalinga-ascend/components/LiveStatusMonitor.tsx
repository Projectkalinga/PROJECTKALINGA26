"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { Wifi, Activity, Navigation, Radio, ShieldAlert } from 'lucide-react';
import type { EmergencyScenario } from './FailsafeTable';

interface LiveStatusMonitorProps {
    scenario: EmergencyScenario;
}

export function LiveStatusMonitor({ scenario }: LiveStatusMonitorProps) {
    const isNominal = scenario === 'NOMINAL';
    const isCritical = scenario === 'KILL_SWITCH' || scenario === 'LOW_BATTERY';

    return (
        <div className={`
            glass-panel p-6 border-l-4 transition-colors duration-500 relative overflow-hidden h-full flex flex-col
            ${isNominal ? 'border-kalinga' : 'border-regolith'}
            ${isCritical ? 'bg-red-950/30' : ''}
        `}>
            {/* Scanline Effect */}
            <div className="absolute inset-0 bg-repeat-y opacity-10 pointer-events-none" style={{ backgroundImage: 'linear-gradient(to bottom, transparent 50%, rgba(0, 0, 0, 0.5) 50%)', backgroundSize: '100% 4px' }} />
            <div className="absolute top-0 left-0 w-full h-1 bg-white/20 animate-[scan_2s_linear_infinite]" />

            <div className="flex justify-between items-start mb-8 relative z-10">
                <div>
                    <h3 className="text-xl font-heading text-white">SYSTEM MONITOR</h3>
                    <p className="text-xs font-mono text-gray-400">STATUS: {scenario.replace('_', ' ')}</p>
                </div>
                <div className={`px-3 py-1 rounded border text-xs font-bold animate-pulse ${isNominal ? 'border-green-500 text-green-500' : 'border-red-500 text-red-500'}`}>
                    {isNominal ? 'ACTIVE' : 'ALERT'}
                </div>
            </div>

            {/* Central Graphic */}
            <div className="grow flex items-center justify-center relative z-10 my-8">
                <div className="relative w-64 h-64">
                    {/* Concentric Circles */}
                    <div className={`absolute inset-0 border-2 rounded-full opacity-30 ${isNominal ? 'border-green-500' : 'border-red-500 animate-ping'}`} />
                    <div className={`absolute inset-4 border border-dashed rounded-full opacity-50 ${isNominal ? 'border-green-500' : 'border-red-500 spin-slow'}`} />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <AnimatePresence mode='wait'>
                            {scenario === 'NOMINAL' && (
                                <motion.div key="nominal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center">
                                    <Activity size={48} className="text-green-500 mx-auto mb-2" />
                                    <div className="text-green-500 font-bold text-lg">SYSTEM OK</div>
                                    <div className="text-xs text-gray-400">Holding Position</div>
                                </motion.div>
                            )}
                            {scenario === 'LINK_LOSS' && (
                                <motion.div key="link" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center">
                                    <Wifi size={48} className="text-regolith mx-auto mb-2 animate-pulse" />
                                    <div className="text-regolith font-bold text-lg">WAITING FOR RE-LINK</div>
                                    <div className="text-xs text-red-400">RTH Timer: 2.4s</div>
                                </motion.div>
                            )}
                            {scenario === 'LOW_BATTERY' && (
                                <motion.div key="batt" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center">
                                    <Radio size={48} className="text-orange-500 mx-auto mb-2" />
                                    <div className="text-orange-500 font-bold text-lg">LOW VOLTAGE</div>
                                    <div className="text-xs text-orange-300">Descending...</div>
                                </motion.div>
                            )}
                            {scenario === 'DRIFT' && (
                                <motion.div key="drift" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center">
                                    <Navigation size={48} className="text-yellow-500 mx-auto mb-2 animate-spin" />
                                    <div className="text-yellow-500 font-bold text-lg">RE-LOCALIZING</div>
                                    <div className="text-xs text-yellow-300">Drift Correction Active</div>
                                </motion.div>
                            )}
                            {scenario === 'KILL_SWITCH' && (
                                <motion.div key="kill" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center">
                                    <ShieldAlert size={64} className="text-red-600 mx-auto mb-2" />
                                    <div className="text-red-600 font-bold text-2xl">SAFE MODE</div>
                                    <div className="text-xs text-red-500">MOTORS DISARMED</div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            {/* Readouts */}
            <div className="grid grid-cols-2 gap-4 relative z-10 bg-black/40 p-4 rounded text-xs font-mono">
                <div>
                    <div className="text-gray-500 mb-1">IMU STATE</div>
                    <div className={scenario === 'DRIFT' ? 'text-yellow-500' : 'text-green-500'}>
                        {scenario === 'DRIFT' ? 'CALIBRATING...' : 'LOCKED'}
                    </div>
                </div>
                <div className="text-right">
                    <div className="text-gray-500 mb-1">MASS LIMIT</div>
                    <div className="text-blue-400">2.0 KG (COMPLIANT)</div>
                </div>
            </div>

            <style jsx>{`
                @keyframes scan {
                    0% { top: 0%; }
                    100% { top: 100%; }
                }
            `}</style>
        </div>
    );
}
