"use client";

import { useEffect, useRef, useState } from 'react';
import { useScroll, useTransform, motion, MotionValue } from 'framer-motion';
import { useTheme } from '@/components/ThemeProvider';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface StorySection {
    start: number; // 0-1
    end: number;   // 0-1
    title: string;
    subtext: string;
    align: 'left' | 'center' | 'right';
}

const sections: StorySection[] = [
    {
        start: 0,
        end: 0.2,
        title: "ASCEND-Pro Surveyor: Redefining Autonomous Exploration.",
        subtext: "Navigating the GPS-denied Martian landscape through indigenous V-SLAM logic.",
        align: 'center'
    },
    {
        start: 0.25,
        end: 0.5,
        title: "Engineered for Resilience.",
        subtext: "T-Motor Antigravity 4006 propulsion meets 4500mAh 6S efficiency.",
        align: 'left'
    },
    {
        start: 0.55,
        end: 0.8,
        title: "Zero-Downtime Infrastructure.",
        subtext: "Automated solar harvesting and data validation at the Martian edge.",
        align: 'right'
    },
    {
        start: 0.85,
        end: 1.0,
        title: "Mission KALINGA: Ready for Sortie.",
        subtext: "System Green. All parameters nominal.",
        align: 'center'
    }
];

// Inner Component: Only rendered when data is loaded, safe to use hooks that depend on ref
function ScrollytellerContent({
    imagesUAV,
    imagesBase
}: {
    imagesUAV: HTMLImageElement[],
    imagesBase: HTMLImageElement[]
}) {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { theme } = useTheme();

    // Scroll Progress
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Render Loop
    useEffect(() => {
        if (!canvasRef.current) return;

        const ctx = canvasRef.current.getContext('2d');
        if (!ctx) return;

        // High-DPI scaling
        const resizeCanvas = () => {
            const canvas = canvasRef.current!;
            const dpr = window.devicePixelRatio || 1;
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            ctx.scale(dpr, dpr);
            canvas.style.width = '100%';
            canvas.style.height = '100vh';
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        const render = (progress: number) => {
            if (!ctx || !canvasRef.current) return;

            // Clear
            ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

            // Logic: 0-0.5 UAV, 0.5-1.0 Base
            let img: HTMLImageElement | undefined;

            if (progress < 0.5) {
                const localProgress = progress * 2;
                const frameIndex = Math.min(
                    imagesUAV.length - 1,
                    Math.floor(localProgress * imagesUAV.length)
                );
                img = imagesUAV[frameIndex];
            } else {
                const localProgress = (progress - 0.5) * 2;
                const frameIndex = Math.min(
                    imagesBase.length - 1,
                    Math.floor(localProgress * imagesBase.length)
                );
                img = imagesBase[frameIndex];
            }

            if (img && img.complete) {
                const canvas = canvasRef.current;
                const cw = window.innerWidth;
                const ch = window.innerHeight;

                const ratio = img.width / img.height;
                let nw = cw;
                let nh = cw / ratio;

                if (nh > ch) {
                    nh = ch;
                    nw = ch * ratio;
                }

                const x = (cw - nw) / 2;
                const y = (ch - nh) / 2;

                ctx.drawImage(img, x, y, nw, nh);

                // Color grading
                ctx.fillStyle = theme === 'light'
                    ? 'rgba(193, 68, 14, 0.1)'
                    : 'rgba(0, 0, 0, 0.4)';
                ctx.fillRect(0, 0, cw, ch);
            }
        };

        const unsubscribe = scrollYProgress.on('change', (v) => {
            requestAnimationFrame(() => render(v));
        });

        // Initial paint
        render(scrollYProgress.get());

        return () => {
            unsubscribe();
            window.removeEventListener('resize', resizeCanvas);
        };
    }, [imagesUAV, imagesBase, scrollYProgress, theme]);

    return (
        <div ref={containerRef} className="relative h-[600vh] bg-[#0e100f]">
            <div className="fixed inset-0 flex items-center justify-center pointer-events-none opacity-10 z-0 select-none">
                <h1 className="text-[20vw] font-black text-gray-500 font-heading">KALINGA</h1>
            </div>

            <canvas
                ref={canvasRef}
                className="sticky top-0 w-full h-screen object-contain z-10"
            />

            <div className="absolute inset-0 z-20 pointer-events-none">
                {sections.map((section, i) => (
                    <TextSection
                        key={i}
                        section={section}
                        scrollYProgress={scrollYProgress}
                    />
                ))}
            </div>
        </div>
    );
}

function TextSection({ section, scrollYProgress }: { section: StorySection; scrollYProgress: MotionValue<number> }) {
    const opacity = useTransform(
        scrollYProgress,
        [section.start, section.start + 0.05, section.end - 0.05, section.end],
        [0, 1, 1, 0]
    );

    const y = useTransform(
        scrollYProgress,
        [section.start, section.end],
        [50, -50]
    );

    const alignClass = {
        'left': 'items-start text-left pl-12 md:pl-24',
        'center': 'items-center text-center px-4',
        'right': 'items-end text-right pr-12 md:pr-24',
    }[section.align];

    return (
        <motion.div
            style={{ opacity, y }}
            className={`fixed top-0 left-0 w-full h-screen flex flex-col justify-center ${alignClass}`}
        >
            <div className="max-w-4xl glass-panel p-8 backdrop-blur-md bg-black/30 border-l-4 border-regolith">
                <h2 className="text-4xl md:text-6xl font-heading text-white/90 mb-4 leading-tight">
                    {section.title}
                </h2>
                <p className="font-mono text-lg md:text-xl text-white/60 mb-6">
                    {section.subtext}
                </p>

                {section.align === 'center' && section.title.includes("Ready for Sortie") && (
                    <Link href="/3d-diagram" className="pointer-events-auto inline-block px-8 py-3 bg-regolith text-black font-heading tracking-widest hover:bg-white transition-colors">
                        VIEW 3D DIAGRAM
                    </Link>
                )}
            </div>
        </motion.div>
    );
}

export default function MissionScrollyteller() {
    const [imagesUAV, setImagesUAV] = useState<HTMLImageElement[]>([]);
    const [imagesBase, setImagesBase] = useState<HTMLImageElement[]>([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const loadSequence = async (folder: string, count: number) => {
            const imgs: HTMLImageElement[] = [];
            const promises = [];

            for (let i = 1; i <= count; i++) {
                const img = new Image();
                const frameStr = i.toString().padStart(3, '0');
                const src = `/sequences/${folder}/ezgif-frame-${frameStr}.jpg`;

                const p = new Promise((resolve) => {
                    img.onload = () => resolve(img);
                    img.onerror = () => resolve(null);
                });
                img.src = src;
                imgs.push(img);
                promises.push(p);
            }

            await Promise.all(promises);
            return imgs;
        };

        const init = async () => {
            const uav = await loadSequence('uav', 48);
            const base = await loadSequence('basestation', 48);
            setImagesUAV(uav);
            setImagesBase(base);
            setLoaded(true);
        };

        init();
    }, []);

    if (!loaded) {
        return (
            <div className="h-screen w-full flex items-center justify-center bg-[#0e100f] text-white">
                <div className="text-center">
                    <p className="font-mono text-regolith animate-pulse">LOADING SEQUENCE ASSETS...</p>
                    <div className="w-48 h-1 bg-gray-800 mt-2 mx-auto overflow-hidden rounded-full">
                        <div className="h-full bg-kalinga w-1/2 animate-spin" />
                    </div>
                </div>
            </div>
        );
    }

    return <ScrollytellerContent imagesUAV={imagesUAV} imagesBase={imagesBase} />;
}
