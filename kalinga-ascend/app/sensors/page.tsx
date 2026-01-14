"use client";

import Navbar from '@/components/Navbar';
import { motion } from 'framer-motion';

export default function Sensors() {
    const sensors = [
        {
            name: "LiDAR MODULE",
            type: "OPTICAL",
            specs: "300m RANGE / ±2cm ACCURACY",
            desc: "High-resolution 3D mapping of terrain and obstacle avoidance."
        },
        {
            name: "MULTISPECTRAL CAM",
            type: "IMAGING",
            specs: "4K RESOLUTION / 6 BANDS",
            desc: "Analysis of surface mineralogy and atmospheric composition."
        },
        {
            name: "THERMAL IMAGER",
            type: "INFRARED",
            specs: "640x512 / <30mK NETD",
            desc: "Detection of thermal anomalies and equipment heat signatures."
        },
        {
            name: "MAGNETOMETER",
            type: "GEOPHYSICS",
            specs: "0.1nT SENSITIVITY",
            desc: "Measurement of local magnetic fields to identify geological structures."
        },
        {
            name: "ENVIRONMENTAL SUITE",
            type: "ATMOSPHERIC",
            specs: "TEMP / PRESS / HUMIDITY / WIND",
            desc: "Comprehensive monitoring of Martian weather patterns."
        },
        {
            name: "RADIATION DOSIMETER",
            type: "SAFETY",
            specs: "0.1µSv/h - 10Sv/h",
            desc: "Tracking ionizing radiation levels for future human missions."
        },
    ];

    return (
        <main className="min-h-screen bg-black text-white pt-20">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="mb-12 border-b border-white/10 pb-6">
                    <h1 className="text-4xl md:text-5xl font-orbitron text-white">INSTRUMENTATION & <span className="text-martian-red">SENSORS</span></h1>
                    <p className="text-gray-400 font-mono mt-2">SCIENTIFIC PAYLOAD CONFIGURATION</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sensors.map((sensor, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.05 }}
                            className="p-6 bg-panel-bg border border-white/5 hover:border-martian-red transition-all group"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-xl font-orbitron text-white group-hover:text-accent-orange transition-colors">{sensor.name}</h3>
                                <span className="text-xs font-mono border border-gray-600 px-2 py-1 rounded text-gray-400">{sensor.type}</span>
                            </div>

                            <div className="mb-4">
                                <p className="text-martian-red font-mono text-sm font-bold">{sensor.specs}</p>
                            </div>

                            <p className="text-gray-400 font-rajdhani text-sm leading-relaxed">
                                {sensor.desc}
                            </p>

                            <div className="mt-6 flex gap-2">
                                <div className="h-1 w-full bg-gray-800 rounded overflow-hidden">
                                    <div className="h-full bg-martian-red w-[75%]"></div>
                                </div>
                                <span className="text-xs font-mono text-gray-500">PWR</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </main>
    );
}
