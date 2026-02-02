"use client";

import { useState } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { motion } from 'framer-motion';
import { AlertTriangle, WifiOff, Activity } from 'lucide-react';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export function ValidationDashboard() {
    const [simState, setSimState] = useState<'NOMINAL' | 'LINK_LOSS' | 'SLOPE_WARNING'>('NOMINAL');

    // Chart Data
    const driftData = {
        labels: ['0m', '10m', '20m', '30m', '40m', '50m'],
        datasets: [
            {
                label: 'V-SLAM Drift (m)',
                data: [0.0, 0.05, 0.12, 0.18, 0.25, 0.42], // Target < 0.5m
                borderColor: '#00FF7F',
                backgroundColor: 'rgba(0, 255, 127, 0.2)',
                tension: 0.4,
            },
        ],
    };

    const confidenceData = {
        labels: ['Seed 1', 'Seed 2', 'Seed 3', 'Seed 4', 'Seed 5'],
        datasets: [
            {
                label: 'Recognition Confidence (%)',
                data: [92, 88, 95, 91, 85], // Target > 90%
                backgroundColor: 'rgba(255, 69, 0, 0.6)',
                borderColor: '#FF4500',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
                labels: { color: 'white', font: { family: 'Space Mono' } }
            },
            title: {
                display: false,
            },
        },
        scales: {
            y: {
                ticks: { color: '#9ca3af' },
                grid: { color: 'rgba(255, 255, 255, 0.1)' }
            },
            x: {
                ticks: { color: '#9ca3af' },
                grid: { color: 'rgba(255, 255, 255, 0.1)' }
            }
        }
    };

    return (
        <div className="grid lg:grid-cols-3 gap-8">
            {/* Charts Section */}
            <div className="lg:col-span-2 space-y-8">
                <div className="glass-panel p-6 border border-white/10">
                    <h3 className="text-white font-heading mb-4 text-sm">CHART A: V-SLAM LOOP CLOSURE ACCURACY</h3>
                    <div className="h-64 w-full">
                        <Line options={options} data={driftData} />
                    </div>
                </div>
                <div className="glass-panel p-6 border border-white/10">
                    <h3 className="text-white font-heading mb-4 text-sm">CHART B: IMAGE RECOGNITION CONFIDENCE</h3>
                    <div className="h-64 w-full">
                        <Bar options={options} data={confidenceData} />
                    </div>
                </div>
            </div>

            {/* Mars-Sim Widget */}
            <div className="glass-panel p-6 border-l-4 border-regolith flex flex-col">
                <h3 className="text-xl font-heading text-white mb-6 flex items-center gap-2">
                    <Activity size={20} className="text-regolith" />
                    MARS-SIM WIDGET
                </h3>

                <div className={`
                    grow rounded-lg border-2 border-dashed p-4 mb-6 flex items-center justify-center flex-col text-center transition-all duration-300
                    ${simState === 'NOMINAL' ? 'border-kalinga/30 bg-kalinga/5' : ''}
                    ${simState === 'LINK_LOSS' ? 'border-regolith bg-regolith/10 animate-pulse' : ''}
                    ${simState === 'SLOPE_WARNING' ? 'border-yellow-500 bg-yellow-500/10' : ''}
                `}>
                    {simState === 'NOMINAL' && (
                        <>
                            <div className="text-kalinga font-bold text-2xl mb-2">SYSTEM NOMINAL</div>
                            <p className="text-xs text-gray-400 font-mono">Telemetry Active. Link Strength 98%.</p>
                        </>
                    )}
                    {simState === 'LINK_LOSS' && (
                        <>
                            <WifiOff size={48} className="text-regolith mb-4" />
                            <div className="text-regolith font-bold text-xl mb-2">RC LINK LOSS</div>
                            <p className="text-xs text-red-300 font-mono">FAILSAFE TRIGGERED: Executing RTH (Return-to-Home) at current altitude.</p>
                        </>
                    )}
                    {simState === 'SLOPE_WARNING' && (
                        <>
                            <AlertTriangle size={48} className="text-yellow-500 mb-4" />
                            <div className="text-yellow-500 font-bold text-xl mb-2">SLOPE {">"} 5&deg; DETECTED</div>
                            <p className="text-xs text-yellow-200 font-mono">ABORT LANDING. Repositioning to alternate LZ.</p>
                        </>
                    )}
                </div>

                <div className="space-y-3">
                    <p className="text-xs font-mono text-gray-500 mb-2 uppercase">Inject Fault:</p>
                    <button
                        onClick={() => setSimState('LINK_LOSS')}
                        className="w-full py-3 bg-white/5 border border-red-500/30 text-red-400 font-mono text-sm hover:bg-red-500/20 transition-colors rounded"
                    >
                        SIMULATE LINK LOSS
                    </button>
                    <button
                        onClick={() => setSimState('SLOPE_WARNING')}
                        className="w-full py-3 bg-white/5 border border-yellow-500/30 text-yellow-400 font-mono text-sm hover:bg-yellow-500/20 transition-colors rounded"
                    >
                        SIMULATE 5&deg; SLOPE
                    </button>
                    <button
                        onClick={() => setSimState('NOMINAL')}
                        className="w-full py-3 bg-kalinga/20 text-kalinga font-mono text-sm hover:bg-kalinga/30 transition-colors rounded"
                    >
                        RESET SIMULATION
                    </button>
                </div>
            </div>
        </div>
    );
}
