import React from 'react'
import { useStore } from '../store'
import { mushrooms } from '../config'

export function Navbar() {
    const activeSection = useStore((state) => state.activeSection)
    const setActiveSection = useStore((state) => state.setActiveSection)
    const setScrollOpen = useStore((state) => state.setScrollOpen)

    const handleNavClick = (id) => {
        if (activeSection === id) return
        setActiveSection(id)
        setScrollOpen(true)
    }

    const handleLogoClick = () => {
        setActiveSection(null)
        setScrollOpen(false)
    }

    return (
        <nav className="fixed top-0 left-0 w-full z-50 px-8 py-6 flex justify-between items-center bg-gradient-to-b from-black/60 to-transparent backdrop-blur-[2px] pointer-events-none transition-all duration-500">
            {/* Logo / Home */}
            <button
                onClick={handleLogoClick}
                className="pointer-events-auto group px-4 py-2"
            >
                <span className="font-serif text-2xl tracking-[0.2em] text-amber-100/90 group-hover:text-amber-300 transition-all duration-500 group-hover:drop-shadow-[0_0_10px_rgba(251,191,36,0.6)] uppercase border-b border-transparent group-hover:border-amber-500/50">
                    Portfolio
                </span>
            </button>

            {/* Navigation Links */}
            <div className="flex gap-8 pointer-events-auto">
                {mushrooms.map((mushroom) => {
                    const isActive = activeSection === mushroom.id
                    return (
                        <button
                            key={mushroom.id}
                            onClick={() => handleNavClick(mushroom.id)}
                            className={`
                                font-serif text-sm uppercase tracking-[0.15em] transition-all duration-500 relative px-2 py-1
                                ${isActive
                                    ? 'text-amber-300 drop-shadow-[0_0_8px_rgba(251,191,36,0.8)] scale-110'
                                    : 'text-amber-100/60 hover:text-amber-200 hover:drop-shadow-[0_0_5px_rgba(251,191,36,0.4)]'
                                }
                            `}
                        >
                            {mushroom.label}
                            {/* Mystical Underline effect */}
                            <span
                                className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[1px] bg-amber-400/50 transition-all duration-500 
                                ${isActive ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-1/2'}`}
                            />
                        </button>
                    )
                })}
            </div>
        </nav>
    )
}
