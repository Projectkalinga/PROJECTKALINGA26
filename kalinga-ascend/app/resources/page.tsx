"use client";

import { motion } from 'framer-motion';
import { Download, ExternalLink, Play, FileText, Globe, Video, FolderOpen } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { clsx } from 'clsx';

const resources = [
    {
        id: '9.3.1',
        title: "1. Functionality Demo Video (Tasks 9.3.1 to 9.3.7)",
        description: "This video demonstrates the full operational capability of the ASCEND UAV across all seven required tasks.",
        type: 'youtube',
        link: 'https://youtu.be/mkqfa56_Kqw',
        embed: 'https://www.youtube.com/embed/mkqfa56_Kqw'
    },
    {
        id: 'config',
        title: "2. Configuration & Features Video",
        description: "A detailed breakdown of the technical specifications, hardware configuration, and the base station architecture of the ASCEND system.",
        type: 'youtube',
        link: 'https://youtu.be/8fdEqHFPiis',
        embed: 'https://www.youtube.com/embed/8fdEqHFPiis'
    },
    {
        id: 'drive',
        title: "3. Project Drive Folder",
        description: "This folder contains the high-resolution design write-ups, CAD models, and additional technical documentation.",
        type: 'link',
        link: 'https://drive.google.com/file/d/1PaWHwIbDw_O7TeRT1yCbC7PtMFT7a8dv/view?usp=drive_link',
        label: "Project Kalinga Drive Folder",
        icon: FolderOpen
    },
    {
        id: 'website',
        title: "4. Project Website",
        description: "For a comprehensive overview of our team’s approach and the \"Kalinga Space\" ecosystem.",
        type: 'link',
        link: 'https://kalinga.space',
        label: "kalinga.space",
        icon: Globe
    }
];

const localFiles = [
    {
        name: "KALINGA1 (1).pdf",
        label: "Proposal Report Dossier",
        type: "document",
        path: "/resources/KALINGA1 (1).pdf"
    },
    {
        name: "Kalinga .mp4",
        label: "Mission Overview Flight",
        type: "video",
        path: "/resources/Kalinga .mp4"
    },
    {
        name: "kalinga 2.mp4",
        label: "Technical Hardware Demo",
        type: "video",
        path: "/resources/kalinga 2.mp4"
    }
];

export default function ResourcesPage() {

    const handleDownloadAll = () => {
        localFiles.forEach((file, index) => {
            setTimeout(() => {
                const link = document.createElement('a');
                link.href = file.path;
                link.download = file.name;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }, index * 500); // Staggering to avoid browser blocks
        });
    };

    return (
        <main className="min-h-screen bg-(--bg-primary) text-(--text-primary) selection:bg-red-500 selection:text-white transition-colors duration-500">
            <Navbar />

            {/* Background Effects */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-red-900/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-green-900/10 rounded-full blur-[120px]" />
            </div>

            <div className="relative z-10 pt-32 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-(--accent-glow) text-sm font-heading tracking-[0.4em] uppercase mb-4 opacity-80">
                        Mission Intelligence
                    </h2>
                    <h1 className="text-4xl md:text-6xl font-heading font-black tracking-tight mb-6">
                        QUALIFICATION <span className="text-transparent bg-clip-text bg-linear-to-r from-(--accent-glow) to-red-500">RESOURCES</span>
                    </h1>
                    <p className="text-(--text-secondary) max-w-2xl mx-auto font-mono text-sm leading-relaxed font-bold">
                        Access official technical documentation, mission overview videos, and structural design assets 
                        for the upcoming qualification phase.
                    </p>
                </motion.div>

                {/* External Videos Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
                    {resources.filter(r => r.type === 'youtube').map((res, idx) => (
                        <motion.div
                            key={res.id}
                            initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 + idx * 0.1 }}
                            className="glass-panel p-6 group hover:border-(--accent-glow)/30 transition-all duration-500"
                        >
                            <div className="aspect-video mb-6 rounded-lg overflow-hidden border border-white/5 bg-black/40 relative">
                                <iframe 
                                    src={res.embed}
                                    className="w-full h-full"
                                    title={res.title}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            </div>
                            <h3 className="text-xl font-heading font-bold mb-3 flex items-center gap-3">
                                <Video className="w-5 h-5 text-(--accent-glow)" />
                                {res.title}
                            </h3>
                            <p className="text-sm text-(--text-secondary) font-mono leading-relaxed mb-6 opacity-80">
                                {res.description}
                            </p>
                            <a 
                                href={res.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-(--accent-glow) hover:underline"
                            >
                                VIEW ON YOUTUBE <ExternalLink className="w-3 h-3" />
                            </a>
                        </motion.div>
                    ))}
                </div>

                {/* Local Downloads & Links Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
                    {/* Drive & Website Links */}
                    {resources.filter(r => r.type === 'link').map((res, idx) => {
                        const Icon = res.icon || Globe;
                        return (
                            <motion.a
                                key={res.id}
                                href={res.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 + idx * 0.1 }}
                                className="glass-panel p-8 flex flex-col justify-between group hover:scale-[1.02] transition-all duration-300"
                            >
                                <div>
                                    <div className="w-12 h-12 rounded-full bg-(--accent-glow)/10 flex items-center justify-center mb-6 group-hover:bg-(--accent-glow)/20 transition-colors">
                                        <Icon className="w-6 h-6 text-(--accent-glow)" />
                                    </div>
                                    <h3 className="text-lg font-heading font-bold mb-4">{res.title}</h3>
                                    <p className="text-xs text-(--text-secondary) font-mono leading-relaxed mb-6 opacity-70">
                                        {res.description}
                                    </p>
                                </div>
                                <div className="text-xs font-black tracking-widest flex items-center justify-between">
                                    <span>{res.label}</span>
                                    <ExternalLink className="w-3 h-3 text-(--accent-glow)" />
                                </div>
                            </motion.a>
                        );
                    })}

                    {/* Download Hub Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="glass-panel p-8 bg-linear-to-br from-red-600/5 to-transparent border-red-500/20 md:col-span-1"
                    >
                        <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mb-6">
                            <Download className="w-6 h-6 text-red-500" />
                        </div>
                        <h3 className="text-lg font-heading font-bold mb-4">Batch Download Portal</h3>
                        <p className="text-xs text-(--text-secondary) font-mono leading-relaxed mb-8 opacity-70">
                            Synchronize all offline resources including high-resolution video logs and the full technical dossier.
                        </p>
                        <button 
                            onClick={handleDownloadAll}
                            className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-black text-xs tracking-[0.2em] rounded-md transition-all active:scale-95 shadow-[0_0_20px_rgba(220,38,38,0.2)]"
                        >
                            DOWNLOAD ALL ASSETS
                        </button>
                    </motion.div>
                </div>

                {/* Local Files Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
                    {localFiles.map((file, idx) => (
                        <motion.div
                            key={file.name}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5 + idx * 0.1 }}
                            className="p-1 rounded-sm bg-white/5 hover:bg-white/10 transition-colors border border-white/5 flex items-center gap-4 group"
                        >
                            <div className="w-12 h-12 flex items-center justify-center bg-black/40 rounded-sm">
                                {file.type === 'document' ? <FileText className="w-5 h-5 text-blue-400" /> : <Play className="w-5 h-5 text-green-400" />}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-[10px] text-(--text-secondary) font-mono font-bold truncate opacity-60">{file.name}</p>
                                <p className="text-xs font-bold truncate tracking-tight">{file.label}</p>
                            </div>
                            <a 
                                href={file.path} 
                                download={file.name}
                                className="p-3 hover:text-(--accent-glow) transition-colors"
                            >
                                <Download className="w-4 h-4" />
                            </a>
                        </motion.div>
                    ))}
                </div>

                {/* Technical Description (Writeup Inspiration) */}
                <motion.section
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="border-t border-white/10 pt-16"
                >
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-2xl font-heading font-black mb-8 text-center tracking-widest uppercase">
                            Technical Dossier Overview
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 font-mono text-sm text-(--text-secondary) leading-relaxed">
                            <div className="space-y-6">
                                <p>
                                    <span className="text-white font-bold block mb-2 underline decoration-(--accent-glow)">MISSION ARCHITECTURE</span>
                                    Project Kalinga represents a paradigm shift in planetary exploration, moving from traditional remote-controlled systems to high-level cognitive autonomy. By fusing the low-level reflexive stability of ArduPilot with the high-level reasoning of the NVIDIA Jetson Orin Nano, we have engineered a resilient swarm-capable ecosystem.
                                </p>
                                <p>
                                    <span className="text-white font-bold block mb-2 underline decoration-(--accent-glow)">AI-DRIVEN LOCALIZATION</span>
                                    Our proprietary "Small Square" coordinate logic replaces the reliability of GPS with real-time Voxel Mapping. The system abstracts the Martian regolith as a recognizable geometric fingerprint, ensuring centimeter-level precision even in visually monotonous environments.
                                </p>
                            </div>
                            <div className="space-y-6">
                                <p>
                                    <span className="text-white font-bold block mb-2 underline decoration-(--accent-glow)">ENERGY SUSTAINABILITY</span>
                                    To ensure "human-free" operations, the mission utilizes Resonant Electromagnetic Induction for power transfer. Our high-Q factor resonators enable efficient energy exchange across a 10cm air gap, fortified by Tantalum shielding to survive the intense EM background of the Mars surface.
                                </p>
                                <p>
                                    <span className="text-white font-bold block mb-2 underline decoration-(--accent-glow)">HARDENING & REDUNDANCY</span>
                                    The entire flight stack is environmentally hardened, featuring Aerogel thermal jackets and a triple-layer communication architecture (LoRa, ESP-NOW, WiFi 6). This multi-tiered failsafe matrix guarantees data sovereignty and mission continuity in the face of solar flares or atmospheric anomalies.
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.section>
            </div>

            {/* Footer */}
            <footer className="py-8 bg-(--panel-glass) backdrop-blur text-center border-t border-(--border-color) z-40 transition-colors">
                <p className="text-(--text-secondary) font-mono text-[10px] font-bold tracking-[0.3em]">
                    AUTHORIZED BY MISSION CONTROL • KIIT UNIVERSITY • ROVER-2026-X
                </p>
            </footer>
        </main>
    );
}
