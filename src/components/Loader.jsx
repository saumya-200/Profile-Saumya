import React from 'react'
import { useProgress } from '@react-three/drei'

export function Loader() {
    const { progress } = useProgress()

    // If progress is 100, we can hide it. But useProgress might flicker. 
    // R3F's Loader from drei handles this well, but let's build a custom one for styling.

    if (progress === 100) return null

    return (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#101010] text-amber-50 transition-opacity duration-500">
            <div className="w-48 h-1 bg-white/20 rounded-full overflow-hidden mb-4">
                <div
                    className="h-full bg-amber-500 transition-all duration-200 ease-out"
                    style={{ width: `${progress}%` }}
                />
            </div>
            <div className="font-serif italic text-lg tracking-wider">
                Loading Experiences... {Math.round(progress)}%
            </div>
        </div>
    )
}
