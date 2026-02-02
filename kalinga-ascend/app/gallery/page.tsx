"use client";

import Navbar from '@/components/Navbar';

export default function Gallery() {
    return (
        <main className="min-h-screen bg-black text-white pt-20">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 py-12">
                <h1 className="text-4xl md:text-5xl font-orbitron text-white mb-2 text-center">MISSION <span className="text-martian-red">GALLERY</span></h1>
                <p className="text-center text-gray-400 font-mono mb-12">VISUAL DATA ARCHIVE // SECTOR 7G</p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Placeholder Images using div blocks for now since we don't have actual assets */}
                    {[...Array(9)].map((_, i) => (
                        <div key={i} className="aspect-video bg-gray-900 border border-white/10 relative group overflow-hidden cursor-pointer hover:border-martian-red transition-all">
                            <div className="absolute inset-0 flex items-center justify-center text-gray-700 font-orbitron text-2xl group-hover:scale-110 transition-transform duration-500">
                                IMG_00{i + 1}
                            </div>

                            <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                                <p className="text-white font-bold font-rajdhani">SURFACE SCAN {i + 1}</p>
                                <p className="text-xs text-martian-red font-mono">SOL {450 + i}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
