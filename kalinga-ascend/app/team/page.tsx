"use client";

import Navbar from '@/components/Navbar';
import { TeamMemberCard } from '@/components/TeamMemberCard';
import { MissionCredits } from '@/components/MissionCredits';
import { motion } from 'framer-motion';
import { TEAM_ROSTER } from '@/constants/teamData';

export default function Team() {
    return (
        <main className="min-h-screen pt-20 bg-(--bg-primary) text-(--text-primary) relative overflow-hidden transition-colors duration-500">
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
                        className="text-5xl md:text-7xl font-heading font-black mb-6 tracking-tight text-(--text-primary)"
                    >
                        THE INTELLECT <br />
                        <span className="text-transparent bg-clip-text bg-linear-to-r from-(--text-primary) to-(--text-secondary)">BEHIND THE MACHINE</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-(--text-secondary) max-w-2xl mx-auto font-mono font-bold"
                    >
                        A multidisciplinary task force of 10 domain specialists, orchestrating every subsystem of the 1655g ASCEND-Pro UAV for autonomous Martian reconnaissance.
                    </motion.p>
                </div>

                {/* Background Elements */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-kalinga/5 blur-[120px] rounded-full pointer-events-none" />
            </section>

            {/* Team Grid */}
            <div className="max-w-7xl mx-auto px-4 pb-24 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {TEAM_ROSTER.map((member, i) => (
                        <div key={i} className="h-[450px]">
                            <TeamMemberCard
                                name={member.name}
                                domainDesignation={member.domainDesignation}
                                primaryContribution={member.primaryContribution}
                                keyHardware={member.keyHardware}
                                impactTooltip={member.impactTooltip}
                                icon={member.icon}
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
