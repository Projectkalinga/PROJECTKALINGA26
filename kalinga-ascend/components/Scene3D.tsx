"use client";

import { Canvas } from '@react-three/fiber';
import { Html, useProgress, Preload } from '@react-three/drei';
import { Suspense, useEffect, useState, useRef } from 'react';
import { useTheme } from './ThemeProvider';
import { motion, AnimatePresence } from 'framer-motion';

// Progressive Loader Component
function Loader() {
    const { progress } = useProgress();
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    return (
        <Html center>
            <div className={`flex flex-col items-center justify-center w-64 p-4 rounded-lg 
                ${isDark ? 'bg-black/80 border border-white/10' : 'bg-white/80 border border-black/10'}`}>
                <div className={`text-xs font-mono tracking-widest mb-2 
                    ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                    INITIALIZING SYSTEMS
                </div>
                <div className="w-full h-1 bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-blue-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.2 }}
                    />
                </div>
                <div className={`mt-2 text-[10px] font-mono 
                    ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {progress.toFixed(0)}% COMPLETE
                </div>
            </div>
        </Html>
    );
}

interface Scene3DProps {
    children: React.ReactNode;
    className?: string;
    cameraPosition?: [number, number, number];
    environmentPreset?: "city" | "studio" | "apartment" | "forest" | "sunset" | "night" | "park" | "lobby" | "warehouse";
}

export default function Scene3D({ children, className, cameraPosition = [5, 5, 5], environmentPreset = "city" }: Scene3DProps) {
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    const [inView, setInView] = useState(true);
    const containerRef = useRef<HTMLDivElement>(null);

    // Auto-sleep logic: Pause rendering when off-screen
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setInView(entry.isIntersecting);
            },
            { threshold: 0.1 }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, []);

    // Theme-based variables passed to children via Context if needed, 
    // but here handled by R3F environment and Html components reading generic CSS vars or Theme hook.

    return (
        <div ref={containerRef} className={`relative w-full h-full ${className}`}>

            {/* Fallback / Offline Indicator if needed, usually handled by Loader */}

            {inView && (
                <Canvas
                    shadows
                    // Mobile Optimization: Cap pixel ratio at 2
                    dpr={[1, 2]}
                    gl={{ preserveDrawingBuffer: true, antialias: true }}
                    camera={{ position: cameraPosition, fov: 45 }}
                    className="touch-none" // Prevent scroll hijacking on mobile interactions if manual orbit is needed
                >
                    {/* Main Scene Content */}
                    <Suspense fallback={<Loader />}>
                        {children}
                        <Preload all />
                    </Suspense>
                </Canvas>
            )}

            {!inView && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/5 backdrop-blur-sm">
                    <span className="text-xs font-mono text-gray-500">RENDERING PAUSED</span>
                </div>
            )}
        </div>
    );
}
