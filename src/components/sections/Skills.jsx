import React from 'react'

const skills = {
    "Frontend": ["React", "TypeScript", "Tailwind CSS", "Next.js"],
    "3D & Graphics": ["Three.js", "React Three Fiber", "GSAP", "WebGL"],
    "Backend": ["Node.js", "PostgreSQL", "GraphQL", "Python"],
    "Tools": ["Git", "Vite", "Figma", "Blender"]
}

export function Skills() {
    return (
        <div className="space-y-6">
            <h3 className="text-xl font-bold text-amber-900 border-b-2 border-amber-900/20 pb-2">Technical Skills</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(skills).map(([category, items]) => (
                    <div key={category}>
                        <h4 className="font-bold text-amber-800 mb-2">{category}</h4>
                        <ul className="space-y-1">
                            {items.map(skill => (
                                <li key={skill} className="flex items-center gap-2 text-sm">
                                    <span className="w-1.5 h-1.5 rounded-full bg-amber-600/50"></span>
                                    {skill}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    )
}
