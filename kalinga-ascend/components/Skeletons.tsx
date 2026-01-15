"use client";

import { motion, Variants } from "framer-motion";

// Shimmer Effect
const shimmer: Variants = {
    hidden: { backgroundPosition: "-200% 0" },
    show: {
        backgroundPosition: "200% 0",
        transition: {
            repeat: Infinity,
            duration: 1.5,
            ease: "linear",
        },
    },
};

const ShimmerBlock = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
    <motion.div
        variants={shimmer}
        initial="hidden"
        animate="show"
        className={`bg-linear-to-r from-transparent via-white/5 to-transparent bg-size-[200%_100%] rounded ${className}`}
        style={style}
    />
);

export function TimelineSkeleton() {
    return (
        <div className="w-full space-y-8 p-4">
            {[1, 2, 3].map((i) => (
                <div key={i} className="flex gap-4">
                    <div className="w-1 bg-white/10 rounded-full h-24 my-auto relative">
                        <div className="absolute w-3 h-3 bg-white/20 rounded-full -left-1 top-0"></div>
                    </div>
                    <div className="flex-1 space-y-3">
                        <ShimmerBlock className="h-6 w-32 bg-white/10" />
                        <ShimmerBlock className="h-4 w-48 bg-white/5" />
                        <ShimmerBlock className="h-20 w-full bg-white/5 rounded-lg" />
                    </div>
                </div>
            ))}
        </div>
    );
}

export function MatrixSkeleton() {
    return (
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
                <div key={i} className="h-32 bg-white/5 border border-white/10 rounded-xl p-4 space-y-3">
                    <ShimmerBlock className="h-4 w-24 bg-white/10" />
                    <div className="flex justify-between items-end h-full pb-2">
                        <ShimmerBlock className="h-6 w-16" />
                        <ShimmerBlock className="h-8 w-12 rounded" />
                    </div>
                </div>
            ))}
        </div>
    );
}

export function ChartSkeleton() {
    return (
        <div className="w-full h-64 bg-white/5 border border-white/10 rounded-xl p-6 relative overflow-hidden">
            <div className="flex justify-between mb-8">
                <ShimmerBlock className="h-6 w-32 bg-white/10" />
                <ShimmerBlock className="h-6 w-16 bg-white/10" />
            </div>
            <div className="flex items-end gap-2 h-32">
                {[...Array(10)].map((_, i) => (
                    <ShimmerBlock key={i} className={`flex-1 rounded-t bg-white/5`} style={{ height: `${Math.random() * 80 + 20}%` }} />
                ))}
            </div>
        </div>
    )
}
