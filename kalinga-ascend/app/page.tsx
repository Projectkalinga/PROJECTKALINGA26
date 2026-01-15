"use client";

import Navbar from '@/components/Navbar';
import ImageSequence from '@/components/ImageSequence';
import { motion } from 'framer-motion';

export default function Home() {

  return (
    <main className="min-h-screen bg-(--bg-primary) text-(--text-primary) selection:bg-martian-red selection:text-white transition-colors duration-500">
      <div className="splash-watermark fixed inset-0 flex items-center justify-center pointer-events-none opacity-10 z-0">
        <h1 className="text-[20vw] font-black text-(--text-secondary) font-heading transition-colors">KALINGA</h1>
      </div>

      <div className="fixed inset-0 flex items-center justify-center opacity-5 pointer-events-none z-0">
        <h1 className="text-[20vw] font-bold font-heading text-(--text-primary) transition-colors">KALINGA</h1>
      </div>

      <Navbar />

      {/* Hero Section */}
      <section className="h-screen flex items-center justify-center relative overflow-hidden">
        {/* Gradient: Dark in Night, subtle or hidden in Day to keep White clean */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-red-900/10 via-transparent to-transparent opacity-50 dark:via-black dark:to-black" />

        <div className="z-10 text-center px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <h2 className="text-(--accent-glow) text-xl md:text-2xl font-heading tracking-[0.5em] mb-4 transition-colors">
              PROJECT KALINGA ASCEND
            </h2>
            <h1 className="text-5xl md:text-8xl font-heading font-bold tracking-tight text-(--text-primary) mb-6 transition-colors">
              MARS AWAITS
            </h1>
            <p className="mt-6 text-(--text-secondary) max-w-2xl mx-auto font-mono text-sm leading-relaxed font-bold transition-colors">
              Advanced technical exploration of the Red Planet using next-gen micro-UAV swarms.
              <br />
              Proposal ID: K-ASC-2026-X
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="fixed bottom-0 w-full py-2 bg-(--panel-glass) backdrop-blur text-center border-t border-(--border-color) z-40 transition-colors">
        <p className="text-(--text-secondary) font-mono text-[10px] font-bold">
          CLASSIFIED // LEVEL 5 SECURITY CLEARANCE REQUIRED
        </p>
      </footer>
    </main>
  );
}
