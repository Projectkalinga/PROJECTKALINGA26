"use client";

import Navbar from '@/components/Navbar';
import ImageSequence from '@/components/ImageSequence';
import { motion } from 'framer-motion';

export default function Home() {

  return (
    <main className="min-h-screen bg-black text-white selection:bg-martian-red selection:text-white">
      <div className="splash-watermark fixed inset-0 flex items-center justify-center pointer-events-none opacity-10 z-0">
        <h1 className="text-[20vw] font-black text-gray-500 font-heading">KALINGA</h1>
      </div>

      <div className="fixed inset-0 flex items-center justify-center opacity-5 pointer-events-none z-0">
        <h1 className="text-[20vw] font-bold font-heading">KALINGA</h1>
      </div>

      <Navbar />

      {/* Hero Section */}
      <section className="h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-red-900/10 via-black to-black opacity-50" />

        <div className="z-10 text-center px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <h2 className="text-accent-secondary text-xl md:text-2xl font-heading tracking-[0.5em] mb-4">
              PROJECT KALINGA ASCEND
            </h2>
            <h1 className="text-5xl md:text-8xl font-heading font-bold tracking-tight text-white mb-6">
              MARS AWAITS
            </h1>
            <p className="mt-6 text-gray-400 max-w-2xl mx-auto font-mono text-sm leading-relaxed">
              Advanced technical exploration of the Red Planet using next-gen micro-UAV swarms.
              <br />
              Proposal ID: K-ASC-2026-X
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="fixed bottom-0 w-full py-2 bg-black/50 backdrop-blur text-center border-t border-white/5 z-40">
        <p className="text-gray-600 font-mono text-[10px]">
          CLASSIFIED // LEVEL 5 SECURITY CLEARANCE REQUIRED
        </p>
      </footer>
    </main>
  );
}
