import { useEffect, useRef } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import { useStore } from '../store'
import gsap from 'gsap'
import * as THREE from 'three'

const presets = {
    // Default: Low angle, looking up
    default: { position: [0, 2, 35], target: [0, 6, 0] },

    // Active Sections: Significantly WIDER shot to avoid cutoff
    // Moving camera further back/out (e.g., radius ~25 instead of 14)
    // Keeping Y low (3-5) to maintain the "looking up" perspective but seeing more context

    about: { position: [-20, 4, 20], target: [-2, 5, 2] },     // Front Left
    projects: { position: [20, 4, 20], target: [2, 5, 2] },     // Front Right
    skills: { position: [-20, 4, -20], target: [-2, 5, -2] },   // Back Left
    contact: { position: [20, 4, -20], target: [2, 5, -2] },     // Back Right
}

export function CameraController() {
    const { camera } = useThree()
    const activeSection = useStore((state) => state.activeSection)
    const introComplete = useStore((state) => state.introComplete)
    const setIntroComplete = useStore((state) => state.setIntroComplete)
    const targetRef = useRef(new THREE.Vector3(0, 5, 0))
    const introProgress = useRef({ val: 0 })

    useEffect(() => {
        if (!introComplete) {
            const radius = 35
            gsap.fromTo(introProgress.current,
                { val: 0 },
                {
                    val: Math.PI * 2,
                    duration: 8,
                    ease: 'power2.inOut',
                    onUpdate: () => {
                        const angle = introProgress.current.val
                        const x = Math.sin(angle) * radius
                        const z = Math.cos(angle) * radius
                        const p = angle / (Math.PI * 2)
                        const y = 20 - (18 * p)
                        camera.position.set(x, y, z)
                        camera.lookAt(0, 5, 0)
                    },
                    onComplete: () => {
                        setIntroComplete(true)
                        gsap.to(camera.position, {
                            x: presets.default.position[0],
                            y: presets.default.position[1],
                            z: presets.default.position[2],
                            duration: 2,
                            ease: 'power2.inOut'
                        })
                    }
                }
            )
        }
    }, [introComplete, setIntroComplete, camera])

    useEffect(() => {
        if (!introComplete) return
        const preset = presets[activeSection] || presets.default

        gsap.to(camera.position, {
            x: preset.position[0],
            y: preset.position[1],
            z: preset.position[2],
            duration: 2.0, // Standard speed
            ease: 'power3.inOut',
        })

        gsap.to(targetRef.current, {
            x: preset.target[0],
            y: preset.target[1],
            z: preset.target[2],
            duration: 2.0,
            ease: 'power3.inOut',
        })
    }, [activeSection, camera, introComplete])

    useFrame(() => {
        if (activeSection || !introComplete) {
            camera.lookAt(targetRef.current)
        }
    })

    return null
}
