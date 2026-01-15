"use client";

import Image from 'next/image';
import Navbar from '@/components/Navbar';
import MissionScrollyteller from '@/components/MissionScrollyteller';

export default function Mission() {
    return (
        <main className="bg-(--bg-primary) min-h-screen transition-colors duration-500">
            <Navbar />

            {/* Header / Hero Section with Cropped Image Showcase */}
            <div className="pt-24 pb-12 px-4 max-w-7xl mx-auto space-y-24">

                {/* 1. Drone Image (Watermark Removed via Cropping) */}
                <section className="flex flex-col md:flex-row items-center gap-12">
                    <div className="w-full md:w-1/2 space-y-6">
                        <h1 className="text-5xl font-heading text-(--text-primary)">ASCEND-PRO <span className="text-(--accent-glow)">UAV</span></h1>
                        <p className="font-mono text-(--text-secondary) font-bold text-lg leading-relaxed">
                            The definitive autonomous surveyor. Engineered with carbon-fiber architecture and indigenous V-SLAM navigation.
                        </p>
                    </div>

                    {/* Image 1 Container: Cropping 'Veo' Watermark */}
                    <div className="w-full md:w-1/2 relative">
                        <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden rounded-xl border border-(--border-color) shadow-2xl">
                            <Image
                                src="/images/drone_image_1.png"
                                alt="ASCEND-Pro UAV"
                                fill
                                style={{ objectFit: 'cover', objectPosition: 'center' }} // Crucial: Shifts Veo out if at bottom/right
                                sizes="(max-width: 768px) 100vw, 50vw"
                                priority
                                className="hover:scale-105 transition-transform duration-700"
                            />
                        </div>
                        <p className="text-xs font-mono text-center mt-2 text-(--text-secondary) opacity-50">FIG 1.0: FLIGHT CONFIGURATION</p>
                    </div>
                </section>

                {/* 2. Exploded View (Watermark Removed via Cropping) */}
                <section className="flex flex-col md:flex-row-reverse items-center gap-12">
                    <div className="w-full md:w-1/2 space-y-6 text-right">
                        <h2 className="text-4xl font-heading text-(--text-primary)">SYSTEM <span className="text-blue-500">INTERNALS</span></h2>
                        <p className="font-mono text-(--text-secondary) font-bold text-lg leading-relaxed">
                            Modular redundancy. Every sub-component is isolated for maximum fault tolerance in the Martian atmosphere.
                        </p>
                    </div>

                    {/* Image 2 Container: Cropping 'Veo' Watermark */}
                    <div className="w-full md:w-1/2 relative">
                        <div className="relative w-full h-[500px] overflow-hidden rounded-xl border border-(--border-color) shadow-2xl">
                            <Image
                                src="/images/exploded_view_image_2.png"
                                alt="ASCEND-Pro Exploded View"
                                fill
                                style={{ objectFit: 'cover', objectPosition: '50% 30%' }} // Adjusted to crop bottom (Veo) more aggressively if needed
                                sizes="(max-width: 768px) 100vw, 50vw"
                                className="hover:scale-105 transition-transform duration-700"
                            />
                        </div>
                        <p className="text-xs font-mono text-center mt-2 text-(--text-secondary) opacity-50">FIG 2.0: MODULAR EXPLODED VIEW</p>
                    </div>
                </section>

            </div>

            {/* Interactive Scrollyteller */}
            <MissionScrollyteller />
        </main>
    );
}
