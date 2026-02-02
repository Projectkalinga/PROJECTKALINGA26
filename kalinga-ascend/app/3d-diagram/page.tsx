"use client";

import Navbar from '@/components/Navbar';
import VirtualHangar from '@/components/VirtualHangar';

export default function DiagramPage() {
    return (
        <main className="h-screen w-full overflow-hidden">
            <Navbar />
            <div className="h-full pt-16">
                <VirtualHangar />
            </div>
        </main>
    );
}
