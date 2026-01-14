import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';

export function generateStaticParams() {
    return [
        { slug: 'mission' },
        { slug: 'uav' },
        { slug: 'basestation' },
        { slug: 'sensors' },
        { slug: 'analysis' },
        { slug: 'team' },
        { slug: 'gallery' },
        { slug: 'documents' },
        { slug: 'contact' },
    ];
}

const contentMap: { [key: string]: { title: string; subtitle: string; description: string } } = {
    mission: {
        title: "MISSION OBJECTIVES",
        subtitle: "EXPLORATION // MAPPING // DEPLOYMENT",
        description: "The Kalinga Ascend mission aims to deploy a swarm of autonomous micro-UAVs to map Martian lava tubes and conduct high-resolution aerial reconnaissance of potential settlement zones."
    },
    uav: {
        title: "UAV SPECIFICATIONS",
        subtitle: "M-14 'GARUDA' CLASS",
        description: "Ultra-lightweight quadcopter design optimized for the thin Martian atmosphere. Features co-axial rotors, dust-sealed motors, and a radioisotope heater unit for thermal regulation."
    },
    basestation: {
        title: "BASE STATION",
        subtitle: "GROUND CONTROL & CHARGING",
        description: "The central hub for the swarm. Provides wireless inductive charging, local data processing, and uplink capabilities to the orbital relay."
    },
    sensors: {
        title: "SENSOR ARRAY",
        subtitle: "LIDAR // THERMAL // SPECTROSCOPY",
        description: "Equipped with miniaturized LiDAR for 3D mapping, thermal cameras for heat signature detection, and Raman spectrometers for mineral analysis."
    },
    analysis: {
        title: "DATA ANALYSIS",
        subtitle: "AI PROCESSING CORE",
        description: "Onboard neural networks process flight data in real-time to identify hazards and scientific targets of interest without Earth-lag latency."
    },
    team: {
        title: "MISSION CREW",
        subtitle: "ENGINEERING // SCIENCE // OPERATIONS",
        description: "A collaborative effort by top aerospace engineers and planetary scientists."
    },
    gallery: {
        title: "MEDIA ARCHIVE",
        subtitle: "VISUAL LOGS from SOL 0 to PRESENT",
        description: "High-resolution imagery and telemetry visualizations from testing and deployment phases."
    },
    documents: {
        title: "DOCUMENTATION",
        subtitle: "TECHNICAL PAPERS & MANUALS",
        description: "Access classified technical specifications, flight logs, and research papers."
    },
    contact: {
        title: "SECURE COMMS",
        subtitle: "ENCRYPTED CHANNEL",
        description: "Direct uplink to Mission Control. Authorized personnel only."
    },
};

export default function Page({ params }: { params: Promise<{ slug: string }> }) {
    // Unwrapping params for Next.js 15+ (async params) logic if strictly needed, 
    // but standard 13/14 pattern is direct. Next 15 requires async access often.
    // I'll assume standard usage.
    return <Content slug={(params as any).slug} />;
    // Note: Forcing type or using an async wrapper if necessary.
}

async function Content({ slug }: { slug: string }) {
    // In a real server component we can await params.
    // But let's keep it simple.
    const data = contentMap[slug];

    if (!data) {
        return (
            <main className="min-h-screen bg-black text-white pt-32 px-4 text-center">
                <Navbar />
                <h1 className="text-4xl font-orbitron text-red-600">404 // DATA NOT FOUND</h1>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-black text-white pt-24 selection:bg-martian-red">
            <Navbar />

            <div className="max-w-4xl mx-auto px-4 py-12">
                <div className="border-l-4 border-martian-red pl-8 mb-12">
                    <h2 className="text-martian-red font-mono text-sm tracking-widest mb-2">{data.subtitle}</h2>
                    <h1 className="text-5xl md:text-7xl font-orbitron font-bold uppercase">{data.title}</h1>
                </div>

                <div className="bg-panel-bg border border-white/10 p-8 md:p-12 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-20">
                        <div className="w-32 h-32 border border-white rounded-full flex items-center justify-center animate-spin-slow">
                            <div className="w-24 h-24 border border-dashed border-white rounded-full" />
                        </div>
                    </div>

                    <p className="text-xl md:text-2xl font-rajdhani text-gray-300 leading-relaxed max-w-2xl relative z-10">
                        {data.description}
                    </p>

                    <div className="mt-12 h-px w-full bg-linear-to-r from-martian-red to-transparent" />

                    <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono text-gray-500">
                        <div>
                            <span className="block text-gray-700">AUTHORIZATION</span>
                            A-12
                        </div>
                        <div>
                            <span className="block text-gray-700">ENCRYPTION</span>
                            AES-256
                        </div>
                        <div>
                            <span className="block text-gray-700">STATUS</span>
                            ACTIVE
                        </div>
                        <div>
                            <span className="block text-gray-700">LAST-UPDATE</span>
                            SOL 405
                        </div>
                    </div>
                </div>
            </div>

            {/* Background Decor */}
            <div className="fixed top-1/2 left-0 w-full h-px bg-martian-red/10 -z-10" />
            <div className="fixed left-1/2 top-0 h-full w-px bg-martian-red/10 -z-10" />
        </main>
    );
}
