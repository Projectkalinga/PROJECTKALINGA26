"use client";

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ImageSequenceProps {
    folder: string; // e.g., "/sequences/uav/"
    frameCount: number; // e.g., 48
    fileNamePrefix: string; // e.g., "ezgif-frame-"
    fileNameSuffix?: string; // e.g., ".jpg"
    className?: string;
    triggerStart?: string;
    triggerEnd?: string;
}

export default function ImageSequence({
    folder,
    frameCount,
    fileNamePrefix,
    fileNameSuffix = ".jpg",
    className,
    triggerStart = "top top",
    triggerEnd = "bottom bottom",
}: ImageSequenceProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [loaded, setLoaded] = useState(false);

    // Preload images
    useEffect(() => {
        const loadedImages: HTMLImageElement[] = [];
        let loadCount = 0;

        for (let i = 1; i <= frameCount; i++) {
            const img = new Image();
            const numStr = i.toString().padStart(3, '0');
            img.src = `${folder}${fileNamePrefix}${numStr}${fileNameSuffix}`;
            img.onload = () => {
                loadCount++;
                if (loadCount === frameCount) {
                    setLoaded(true);
                }
            };
            loadedImages.push(img);
        }
        setImages(loadedImages);
    }, [folder, frameCount, fileNamePrefix, fileNameSuffix]);

    // Animation
    useEffect(() => {
        if (!loaded || !canvasRef.current || !containerRef.current) return;

        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        if (!context) return;

        // Set canvas dimensions to match the first image (assuming all are same size)
        // Or set to window size and contain/cover. Let's do responsive contain.
        const firstImg = images[0];

        const updateImage = (index: number) => {
            if (images[index]) {
                // Draw logic: maintain aspect ratio, cover or contain
                const cw = canvas.width;
                const ch = canvas.height;
                const iw = firstImg.width;
                const ih = firstImg.height;

                // "Contain" logic
                const scale = Math.min(cw / iw, ch / ih);
                const x = (cw / 2) - (iw * scale / 2);
                const y = (ch / 2) - (ih * scale / 2);

                context.clearRect(0, 0, cw, ch);
                context.drawImage(images[index], x, y, iw * scale, ih * scale);
            }
        };

        // Initial draw
        updateImage(0);

        // Resize handler
        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            updateImage(0); // Ideally we need to keep track of current index, but 0 is safe for reset
        };
        window.addEventListener('resize', handleResize);
        handleResize();

        const sequence = { frame: 0 };

        const trigger = ScrollTrigger.create({
            trigger: containerRef.current,
            start: triggerStart,
            end: triggerEnd,
            scrub: 1, // Smooth scrubbing
            pin: true, // Pin the canvas section
            onUpdate: (self) => {
                const frameIndex = Math.min(
                    frameCount - 1,
                    Math.ceil(self.progress * (frameCount - 1))
                );
                updateImage(frameIndex);
            },
        });

        return () => {
            trigger.kill();
            window.removeEventListener('resize', handleResize);
        };
    }, [loaded, images, frameCount, triggerStart, triggerEnd]);

    return (
        <div ref={containerRef} className={`relative h-screen w-full bg-black ${className}`}>
            {!loaded && (
                <div className="absolute inset-0 flex items-center justify-center text-martian-red font-orbitron">
                    LOADING DATA STREAMS...
                </div>
            )}
            <canvas ref={canvasRef} className="block w-full h-full object-contain" />
        </div>
    );
}
