import React, { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Sparkles } from '@react-three/drei'
import * as THREE from 'three'

export function HeroMushroom({ node }) {
    const groupRef = useRef()

    // Clone the node/mesh to ensure independence if needed, though mostly for prop safety
    const clone = useMemo(() => node.clone(), [node])

    useFrame((state) => {
        if (!groupRef.current) return
        const t = state.clock.getElapsedTime()
        // Slow, deep breathing animation
        const scale = 2 + Math.sin(t * 0.5) * 0.05
        groupRef.current.scale.set(scale, scale, scale)
        groupRef.current.rotation.y = Math.sin(t * 0.2) * 0.1
    })

    return (
        <group ref={groupRef} position={[0, 0, 0]} dispose={null}>
            <primitive object={clone} />

            {/* Magical Particles around the Hero */}
            <Sparkles
                count={50}
                scale={6}
                size={4}
                speed={0.4}
                opacity={0.5}
                color="#d8b4e2"
                position={[0, 2, 0]}
            />

            {/* Point light for glow */}
            <pointLight position={[0, 3, 0]} intensity={2} color="#a020f0" distance={10} decay={2} />
        </group>
    )
}
