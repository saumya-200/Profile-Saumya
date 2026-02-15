import React, { useRef, useState, useMemo } from 'react'
import { useGLTF, Html } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useStore } from '../store'
import * as THREE from 'three'

export function Mushrooms({ label, section, id, ...props }) {
    const { scene } = useGLTF('/models/mushrooms.glb')

    // Clone the scene for each instance so they are independent objects
    const clone = useMemo(() => scene.clone(), [scene])

    const groupRef = useRef()
    const [hovered, setHovered] = useState(false)
    const setActiveSection = useStore((state) => state.setActiveSection)
    const setScrollOpen = useStore((state) => state.setScrollOpen)

    // Random offset for bobbing animation so they don't all move in sync
    const randomOffset = useMemo(() => Math.random() * 100, [])
    const initialY = props.position ? props.position[1] : 0

    useFrame((state) => {
        if (!groupRef.current) return

        // Idle bobbing animation
        const t = state.clock.getElapsedTime()
        groupRef.current.position.y = initialY + Math.sin(t * 2 + randomOffset) * 0.1

        // Smooth scaling on hover
        const targetScale = hovered ? 1.2 : 1
        const currentScale = groupRef.current.scale
        currentScale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1)
    })

    // Ensure shadows are enabled on the clone
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
        console.log(`Clicked section: ${section}`)
        setActiveSection(section)
        setScrollOpen(true)
    }

    return (
        <group
            ref={groupRef}
            {...props}
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
            <Html position={[0, 2.5, 0]} center distanceFactor={10} style={{ pointerEvents: 'none' }}>
                <div className={`
          px-4 py-1.5 rounded-full backdrop-blur-md border border-white/10 transition-all duration-300
          text-sm font-medium tracking-wide
          ${hovered ? 'bg-white/20 text-white scale-110 shadow-[0_0_15px_rgba(255,255,255,0.3)]' : 'bg-black/30 text-gray-300 shadow-lg'}
        `}>
                    {label}
                </div>
            </Html>
        </group>
    )
}

useGLTF.preload('/models/mushrooms.glb')
