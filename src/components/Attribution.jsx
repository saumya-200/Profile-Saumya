import React from 'react'

export function Attribution() {
    return (
        <div className="absolute bottom-4 right-4 text-xs text-white/30 hover:text-white/80 transition-colors z-40 text-right pointer-events-none">
            <p className="pointer-events-auto">
                3D Model: <a href="https://sketchfab.com/3d-models/mushrooms-5b48e36465364115984021200e625501" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">Mushrooms</a> by <a href="https://sketchfab.com/kurtk84" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">KurtK</a> on Sketchfab
            </p>
            <p className="mt-1">
                Built with React Three Fiber
            </p>
        </div>
    )
}
