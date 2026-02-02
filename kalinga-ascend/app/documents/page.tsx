"use client";

import Navbar from '@/components/Navbar';
import { FileText, Download, ShieldAlert } from 'lucide-react';

export default function Documents() {
    const docs = [
        { title: "MISSION PROPOSAL PDF", size: "2.4 MB", type: "PUBLIC" },
        { title: "UAV TECHNICAL MANUAL", size: "15.8 MB", type: "CLASSIFIED" },
        { title: "SENSOR CALIBRATION LOGS", size: "450 KB", type: "INTERNAL" },
        { title: "RISK ASSESSMENT REPORT", size: "1.2 MB", type: "RESTRICTED" },
        { title: "BUDGET ALLOCATION FY26", size: "890 KB", type: "ADMIN" },
    ];

    return (
        <main className="min-h-screen bg-black text-white pt-20">
            <Navbar />

            <div className="max-w-4xl mx-auto px-4 py-12">
                <h1 className="text-4xl font-orbitron text-white mb-8 border-l-4 border-martian-red pl-6">
                    DOCUMENT <span className="text-gray-500">REPOSITORY</span>
                </h1>

                <div className="space-y-4">
                    {docs.map((doc, i) => (
                        <div key={i} className="flex items-center justify-between p-6 bg-panel-bg border border-white/5 hover:border-accent-orange transition-colors group">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-white/5 rounded-lg group-hover:text-accent-orange transition-colors">
                                    <FileText size={24} />
                                </div>
                                <div>
                                    <h3 className="font-rajdhani font-bold text-lg text-white group-hover:text-accent-orange transition-colors">{doc.title}</h3>
                                    <div className="flex gap-2 mt-1">
                                        <span className="text-xs font-mono text-gray-500">{doc.size}</span>
                                        <span className={`text-xs font-mono px-1 rounded ${doc.type === 'PUBLIC' ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'}`}>
                                            {doc.type}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <button className="p-3 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white">
                                <Download size={20} />
                            </button>
                        </div>
                    ))}
                </div>

                <div className="mt-12 p-6 border border-red-900/50 bg-red-900/10 rounded flex gap-4 items-start">
                    <ShieldAlert className="text-red-500 shrink-0" size={32} />
                    <div>
                        <h4 className="text-red-500 font-orbitron mb-2">SECURITY NOTICE</h4>
                        <p className="text-sm text-gray-400 font-mono">
                            Access to classified documents requires Level 5 security clearance. All downloads are monitored and logged.
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}
