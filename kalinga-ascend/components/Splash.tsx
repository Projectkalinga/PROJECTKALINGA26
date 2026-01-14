"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useMission } from '@/context/MissionContext';

export default function Splash() {
    const { enterMission } = useMission();

    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center text-white pointer-events-auto">
            {/* Left Door */}
            <motion.div
                initial={{ x: 0 }}
                exit={{ x: '-100%', transition: { duration: 1.5, ease: [0.22, 1, 0.36, 1] } }}
                className="absolute left-0 top-0 w-1/2 h-full bg-[#0e100f] border-r border-white/10 z-0"
            >
                {/* Texture */}
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at right center, #1a1d1c 0%, #0e100f 100%)' }} />
                <div className="absolute right-0 top-1/2 -translate-y-1/2 pr-4 md:pr-12 text-right opacity-10 font-black font-heading text-9xl tracking-tighter">
                    KA
                </div>
            </motion.div>

            {/* Right Door */}
            <motion.div
                initial={{ x: 0 }}
                exit={{ x: '100%', transition: { duration: 1.5, ease: [0.22, 1, 0.36, 1] } }}
                className="absolute right-0 top-0 w-1/2 h-full bg-[#0e100f] border-l border-white/10 z-0"
            >
                {/* Texture */}
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at left center, #1a1d1c 0%, #0e100f 100%)' }} />
                <div className="absolute left-0 top-1/2 -translate-y-1/2 pl-4 md:pl-12 text-left opacity-10 font-black font-heading text-9xl tracking-tighter">
                    LINGA
                </div>
            </motion.div>

            {/* Content Container (Above Doors) */}
            <div className="relative z-10 flex flex-col items-center">
                <motion.div
                    layoutId="main-logo"
                    className="relative mb-12"
                    initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                    transition={{ duration: 1.2, ease: "circOut" }}
                >
                    <div className="relative w-32 h-32 md:w-48 md:h-48">
                        <Image
                            src="/KALINGA.png"
                            alt="KALINGA Logo"
                            fill
                            className="object-contain drop-shadow-[0_0_20px_rgba(255,69,0,0.5)]"
                            priority
                        />
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, transition: { duration: 0.3 } }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                    className="text-center"
                >
                    <h1 className="text-4xl md:text-6xl font-heading tracking-[0.2em] mb-8 font-black">
                        PROJECT <span className="text-regolith">KALINGA</span>
                    </h1>

                    <button
                        onClick={enterMission}
                        className="group relative px-8 py-3 overflow-hidden rounded-full bg-white/5 border border-white/10 hover:border-regolith transition-colors duration-300"
                    >
                        <div className="absolute inset-0 w-full h-full bg-regolith opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                        <span className="relative font-mono text-sm tracking-widest text-gray-300 group-hover:text-white transition-colors">
                            ENTER MISSION
                        </span>
                    </button>

                    <p className="mt-6 text-[10px] font-mono text-gray-600 uppercase tracking-widest">
                        Initializing Systems // Please Stand By
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
