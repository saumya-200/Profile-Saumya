import React, { useRef, useState, useMemo } from 'react'
import { Html } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useStore } from '../store'
import * as THREE from 'three'

export function NavMushroom({ label, section, node, id, position, rotation }) {
    const clone = useMemo(() => node.clone(), [node])

    const groupRef = useRef()
    const [hovered, setHovered] = useState(false)
    const setActiveSection = useStore((state) => state.setActiveSection)
    const setScrollOpen = useStore((state) => state.setScrollOpen)

    // Unique random offset
    const randomOffset = useMemo(() => Math.random() * 100, [])
    const initialY = position[1]

    useFrame((state) => {
        if (!groupRef.current) return

        const t = state.clock.getElapsedTime()
        // Faster, lighter bobbing
        groupRef.current.position.y = initialY + Math.sin(t * 3 + randomOffset) * 0.08

        // Hover scale
        // Base scale 0.7 (was 0.6), Hover 0.8
        const targetScale = hovered ? 0.8 : 0.7
        const currentScale = groupRef.current.scale
        currentScale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1)
    })

    // Enable shadows
    useMemo(() => {
        clone.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true
                child.receiveShadow = true
            }
        })
    }, [clone])

    const handleClick = (e) => {
        e.stopPropagation()
        setActiveSection(section)
        setScrollOpen(true)
    }

    return (
        <group
            ref={groupRef}
            position={position}
            rotation={rotation}
            onPointerOver={(e) => {
                e.stopPropagation()
                document.body.style.cursor = 'pointer'
                setHovered(true)
            }}
            onPointerOut={(e) => {
                document.body.style.cursor = 'auto'
                setHovered(false)
            }}
            onClick={handleClick}
        >
            <primitive object={clone} />

            {/* Label */}
            <Html position={[0, 1.5, 0]} center distanceFactor={12} style={{ pointerEvents: 'none' }}>
                <div className={`
          px-3 py-1 rounded-full backdrop-blur-sm border border-white/20 transition-all duration-300
          text-xs font-bold tracking-wider uppercase
          ${hovered ? 'bg-white/30 text-white scale-110 shadow-[0_0_10px_rgba(255,255,255,0.4)]' : 'bg-black/40 text-gray-300 opacity-80'}
          whitespace-nowrap
        `}>
                    {label}
                </div>
            </Html>
        </group>
    )
}
