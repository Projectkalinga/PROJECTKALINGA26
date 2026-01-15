"use client";

import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import { TimelineSkeleton, MatrixSkeleton, ChartSkeleton } from '@/components/Skeletons';

// --- Lazy Load Heavy Components ---
// 1. Thrust Calculator (Interactive, Client-Heavy)
const ThrustCalculator = dynamic(
    () => import('@/components/ThrustCalculator').then((mod) => mod.ThrustCalculator),
    {
        ssr: false,
        loading: () => <ChartSkeleton />
    }
);

// 2. Architecture Flow (Heavy SVG/Framer)
const ArchitectureFlow = dynamic(
    () => import('@/components/ArchitectureFlow').then((mod) => mod.ArchitectureFlow),
    {
        ssr: false,
        loading: () => <div className="h-[600px] w-full bg-white/5 rounded-2xl animate-pulse flex items-center justify-center text-gray-500 font-mono">LOADING SCHEMATICS...</div>
    }
);

// 3. Mission Economics (Charts)
const MissionEconomics = dynamic(
    () => import('@/components/MissionEconomics').then((mod) => mod.MissionEconomics),
    {
        loading: () => <MatrixSkeleton />
    }
);

// 4. Production Timeline
const ProductionTimeline = dynamic(
    () => import('@/components/ProductionTimeline').then((mod) => mod.ProductionTimeline),
    {
        loading: () => <TimelineSkeleton />
    }
);

export default function OverviewContent() {
    return (
        <main className="min-h-screen bg-(--bg-primary) text-(--text-primary) selection:bg-kalinga/30 transition-colors duration-500">
            <Navbar />

            {/* Hero Section (Critical Path - Pre-rendered) */}
            <section className="relative pt-32 pb-20 px-4 md:px-8 border-b border-(--border-color)">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-kalinga/10 border border-kalinga/30 text-kalinga text-xs font-mono mb-6">
                            <span className="animate-pulse">●</span> MISSION STATUS: ACTIVE
                        </div>
                        <h1 className="text-5xl md:text-7xl font-heading font-black tracking-tight mb-6 text-(--text-primary)">
                            MISSION <span className="text-transparent bg-clip-text bg-linear-to-r from-(--text-primary) to-(--text-secondary)">OVERVIEW</span>
                        </h1>
                        <p className="text-lg text-(--text-secondary) font-mono leading-relaxed max-w-xl font-bold">
                            Comprehensive tactical breakdown of the ASCEND-Pro Micro-UAV system.
                            Real-time telemetry, economic analysis, and architectural schematics.
                        </p>
                    </div>

                    {/* Hero Metric - Static for instant LCP */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-6 bg-(--panel-glass) rounded-2xl border border-(--border-color) backdrop-blur-sm">
                            <div className="text-(--text-secondary) text-xs font-mono mb-2 font-bold">TARGET ALTITUDE</div>
                            <div className="text-4xl font-heading text-(--text-primary)">120<span className="text-lg text-(--text-secondary)">m</span></div>
                        </div>
                        <div className="p-6 bg-(--panel-glass) rounded-2xl border border-(--border-color) backdrop-blur-sm">
                            <div className="text-(--text-secondary) text-xs font-mono mb-2 font-bold">FLIGHT TIME</div>
                            <div className="text-4xl font-heading text-(--text-primary)">18<span className="text-lg text-(--text-secondary)">min</span></div>
                        </div>
                        <div className="col-span-2 p-6 bg-linear-to-r from-kalinga/20 to-transparent rounded-2xl border border-kalinga/30">
                            <div className="text-kalinga text-xs font-mono mb-2">PAYLOAD CAPACITY</div>
                            <div className="text-4xl font-heading text-(--text-primary)">500<span className="text-lg text-(--text-secondary)">g</span></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. System Architecture (Heavy Lazy Load) */}
            <section className="py-20 px-4 md:px-8 border-b border-(--border-color) bg-(--bg-secondary)">
                <div className="max-w-7xl mx-auto space-y-12">
                    <div className="flex flex-col md:flex-row justify-between items-end gap-4">
                        <div>
                            <h2 className="text-3xl font-heading mb-2 text-(--text-primary)">SYSTEM ARCHITECTURE</h2>
                            <p className="text-(--text-secondary) font-mono text-sm md:font-bold">Interactive Signal Flow & Hardware Stack</p>
                        </div>
                    </div>

                    <Suspense fallback={<div className="h-[600px] w-full bg-(--panel-glass) rounded-2xl animate-pulse flex items-center justify-center text-(--text-secondary) font-mono">LOADING SCHEMATICS...</div>}>
                        <ArchitectureFlow />
                    </Suspense>
                </div>
            </section>

            {/* 3. Flight Dynamics (Heavy Lazy Load) */}
            <section className="py-20 px-4 md:px-8 border-b border-(--border-color)">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-12">
                        <h2 className="text-3xl font-heading mb-2 text-(--text-primary)">FLIGHT DYNAMICS</h2>
                        <p className="text-(--text-secondary) font-mono text-sm md:font-bold">Real-time Thrust-to-Weight Simulation</p>
                    </div>

                    <Suspense fallback={<ChartSkeleton />}>
                        <ThrustCalculator />
                    </Suspense>
                </div>
            </section>

            {/* 4. Economics & Timeline (Data Heavy) */}
            <section className="py-20 px-4 md:px-8 bg-(--bg-secondary)">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16">

                    {/* Economics */}
                    <div>
                        <h2 className="text-2xl font-heading mb-8 text-(--text-primary)">MISSION ECONOMICS</h2>
                        <Suspense fallback={<MatrixSkeleton />}>
                            <MissionEconomics />
                        </Suspense>
                    </div>

                    {/* Timeline */}
                    <div>
                        <h2 className="text-2xl font-heading mb-8 text-(--text-primary)">PRODUCTION TIMELINE</h2>
                        <Suspense fallback={<TimelineSkeleton />}>
                            <ProductionTimeline />
                        </Suspense>
                    </div>

                </div>
            </section>

        </main>
    );
}
