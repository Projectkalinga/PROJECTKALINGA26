"use client";

import Navbar from '@/components/Navbar';

export default function Contact() {
    return (
        <main className="min-h-screen bg-black text-white pt-20">
            <Navbar />

            <div className="max-w-3xl mx-auto px-4 py-12">
                <h1 className="text-4xl md:text-5xl font-orbitron text-white mb-2 text-center">SECURE <span className="text-martian-red">TRANSMISSION</span></h1>
                <p className="text-center text-gray-400 font-mono mb-12">ESTABLISH UPLINK WITH MISSION CONTROL</p>

                <form className="space-y-6 bg-panel-bg p-8 border border-white/10 shadow-2xl relative overflow-hidden">
                    {/* Decorative corner accents */}
                    <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-martian-red"></div>
                    <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-martian-red"></div>
                    <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-martian-red"></div>
                    <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-martian-red"></div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-mono text-gray-500">OPERATOR ID (NAME)</label>
                            <input type="text" className="w-full bg-black border border-white/20 p-3 text-white focus:outline-none focus:border-accent-orange transition-colors font-rajdhani" placeholder="ENTER IDENTIFIER" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-mono text-gray-500">FREQUENCY (EMAIL)</label>
                            <input type="email" className="w-full bg-black border border-white/20 p-3 text-white focus:outline-none focus:border-accent-orange transition-colors font-rajdhani" placeholder="ENTER FREQUENCY" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-mono text-gray-500">TRANSMISSION TYPE (SUBJECT)</label>
                        <select className="w-full bg-black border border-white/20 p-3 text-white focus:outline-none focus:border-accent-orange transition-colors font-rajdhani">
                            <option>GENERAL INQUIRY</option>
                            <option>TECHNICAL SUPPORT</option>
                            <option>SECURITY BREACH REPORT</option>
                            <option>COLLABORATION REQUEST</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-mono text-gray-500">MESSAGE PACKET</label>
                        <textarea rows={5} className="w-full bg-black border border-white/20 p-3 text-white focus:outline-none focus:border-accent-orange transition-colors font-rajdhani" placeholder="ENCRYPTED MESSAGE CONTENT..."></textarea>
                    </div>

                    <button type="button" className="w-full bg-martian-red text-white font-orbitron py-4 hover:bg-red-700 transition-colors tracking-widest border border-transparent hover:border-white/20">
                        INITIATE UPLOAD
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-xs text-gray-600 font-mono">
                        ENCRYPTION: AES-256 // LATENCY: 14 MIN // SERVER: MARS-01
                    </p>
                </div>
            </div>
        </main>
    );
}
