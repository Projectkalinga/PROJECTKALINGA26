"use client";

import Navbar from '@/components/Navbar';
import { TeamMemberCard } from '@/components/TeamMemberCard';
import { MissionCredits } from '@/components/MissionCredits';
import { motion } from 'framer-motion';

export default function Team() {
    // 10-Member Crew Data
    const team = [
        { name: "Aurosri Arman Panigrahi", role: "Mission Commander / Lead System Architect", contrib: "Orchestrated mission architecture & system integration strategies." },
        { name: "Debasis Nayak", role: "Senior Flight Software Engineer", contrib: "Developed robust flight control algorithms for Martian conditions." },
        { name: "Advik Rai", role: "Autonomous Navigation Specialist", contrib: "Implemented LIDAR-based SLAM for GPS-denied navigation." },
        { name: "Aayush Saha", role: "Computer Vision Engineer", contrib: "Optimized object detection models for scientific targets." },
        { name: "Ayush Pradhan", role: "Embedded Systems Architect", contrib: "Designed flight controller PCBs and power distribution." },
        { name: "Bornak Roy", role: "Telemetry & Communications Lead", contrib: "Established high-bandwidth links between UAV and Base Station." },
        { name: "Boibhav Dey", role: "Propulsion Control Algorithms", contrib: "Fine-tuned ESC protocols for thrust efficiency in low-gravity." },
        { name: "Rudra Pratap Sahu", role: "Mission Planning & Logistics", contrib: "Developed mission timeline and contingency protocols." },
        { name: "Prabhu Krupa Biswal", role: "Safety & Compliance Officer", contrib: "Ensured systems meet safety standards and failure checks." },
        { name: "Arnish Das", role: "Real-time Operations Engineer", contrib: "Optimized kernel for deterministic task scheduling." },
    ];

    return (
        <main className="min-h-screen pt-20 bg-[#0e100f] text-white relative overflow-hidden">
            <Navbar />

            {/* Hero Section */}
            <section className="relative py-20 px-4">
                <div className="max-w-7xl mx-auto text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-block mb-4 px-3 py-1 bg-kalinga/10 border border-kalinga/30 rounded-full"
                    >
                        <span className="text-kalinga font-mono text-xs tracking-[0.2em] uppercase">Authorized Personnel Only</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-heading font-black mb-6 tracking-tight"
                    >
                        THE INTELLECT <br />
                        <span className="text-transparent bg-clip-text bg-linear-to-r from-gray-100 to-gray-500">BEHIND THE MACHINE</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-gray-400 max-w-2xl mx-auto font-mono"
                    >
                        A multidisciplinary task force of 10 engineers, optimizing every gram of the 1655g flight mass for the Martian atmosphere.
                    </motion.p>
                </div>

                {/* Background Elements */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-kalinga/5 blur-[120px] rounded-full pointer-events-none" />
            </section>

            {/* Team Grid */}
            <div className="max-w-7xl mx-auto px-4 pb-24 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {team.map((member, i) => (
                        <div key={i} className="h-[400px]">
                            <TeamMemberCard
                                name={member.name}
                                role={member.role}
                                contribution={member.contrib}
                                delay={i * 0.1}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Foundational Credits */}
            <MissionCredits />
        </main>
    );
}
