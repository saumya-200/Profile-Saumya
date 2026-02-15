import React from 'react'

const projects = [
    {
        title: "EcoSphere",
        desc: "A real-time climate data visualization platform using WebGL globe.",
        tech: ["React", "Three.js", "D3.js"]
    },
    {
        title: "Nebula OS",
        desc: "A web-based desktop environment simulator with functional apps.",
        tech: ["Next.js", "TypeScript", "Framer Motion"]
    },
    {
        title: "AudioAlchemy",
        desc: "Browser-based audio synthesizer and visualizer.",
        tech: ["Web Audio API", "Canvas API", "Vue"]
    }
]

export function Projects() {
    return (
        <div className="space-y-6">
            <h3 className="text-xl font-bold text-amber-900 border-b-2 border-amber-900/20 pb-2">Selected Projects</h3>
            <div className="grid gap-4">
                {projects.map((p, i) => (
                    <div key={i} className="bg-white/40 p-4 rounded-lg border border-amber-900/10 hover:bg-white/60 transition-colors">
                        <h4 className="font-bold text-lg">{p.title}</h4>
                        <p className="text-sm text-amber-900/80 mb-2">{p.desc}</p>
                        <div className="flex gap-2 flex-wrap">
                            {p.tech.map(t => (
                                <span key={t} className="text-xs bg-amber-900/10 px-2 py-0.5 rounded text-amber-900/70 font-medium">
                                    {t}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
