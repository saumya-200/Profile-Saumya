import React, { useEffect, useMemo, useState } from 'react'
import { Environment, PerspectiveCamera, Stars, useGLTF, Sparkles, Html, OrbitControls, Float } from '@react-three/drei'
import { useStore } from '../store'
import { CameraController } from './CameraController'
// Scroll import removed
import * as THREE from 'three'

export function Scene() {
    const setActiveSection = useStore((state) => state.setActiveSection)
    const setScrollOpen = useStore((state) => state.setScrollOpen)
    const activeSection = useStore((state) => state.activeSection)
    const introComplete = useStore((state) => state.introComplete)

    const gltf = useGLTF('/models/mushrooms.glb')
    const [hoveredNode, setHoveredNode] = useState(null)

    // Advanced Mesh Processing: Grouping by Quadrant
    const { heroRef, sectionData } = useMemo(() => {
        const meshes = []

        // 1. Collect all meshes
        gltf.scene.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true
                child.receiveShadow = true
                if (!child.userData.originalMaterial) {
                    child.userData.originalMaterial = child.material.clone()
                }
                child.userData.section = null
                meshes.push(child)
            }
        })

        // 2. Identify Hero (Largest Volume)
        meshes.forEach(m => {
            m.geometry.computeBoundingBox()
            const box = m.geometry.boundingBox
            const size = new THREE.Vector3()
            box.getSize(size)
            m.userData.volume = size.x * size.y * size.z
        })
        meshes.sort((a, b) => b.userData.volume - a.userData.volume)
        const hero = meshes[0]

        // 3. Group remaining meshes into Sections
        const sections = {
            about: { count: 0, center: new THREE.Vector3(), meshes: [] },
            projects: { count: 0, center: new THREE.Vector3(), meshes: [] },
            skills: { count: 0, center: new THREE.Vector3(), meshes: [] },
            contact: { count: 0, center: new THREE.Vector3(), meshes: [] },
        }

        meshes.slice(1).forEach(m => {
            const center = new THREE.Vector3()
            m.geometry.boundingBox.getCenter(center)
            center.applyMatrix4(m.matrix)

            const { x, z } = center

            // Distance & Volume Filters
            const dist = Math.sqrt(x * x + z * z)
            if (dist < 2.5) return
            if (m.userData.volume < 0.05) return

            let secName = ''
            if (x < 0 && z > 0) secName = 'about'
            else if (x > 0 && z > 0) secName = 'projects'
            else if (x < 0 && z < 0) secName = 'skills'
            else if (x > 0 && z < 0) secName = 'contact'

            if (secName) {
                m.userData.section = secName
                sections[secName].meshes.push(m)
                sections[secName].center.add(center)
                sections[secName].count++
            }
        })

        // 4. Centroids
        Object.keys(sections).forEach(key => {
            if (sections[key].count > 0) {
                sections[key].center.divideScalar(sections[key].count)
            }
        })

        return { heroRef: hero, sectionData: sections }
    }, [gltf])

    const handleClick = (e) => {
        e.stopPropagation()
        const section = e.object.userData.section
        console.log('Clicked:', e.object.name, 'Section:', section)

        if (introComplete) {
            if (section) {
                setActiveSection(section)
                setScrollOpen(true)
            } else {
                setActiveSection(null)
                setScrollOpen(false)
            }
        }
    }

    const handlePointerOver = (e) => {
        e.stopPropagation()
        const section = e.object.userData.section
        if (section) {
            document.body.style.cursor = 'pointer'
            setHoveredNode(section)
        }
    }

    const handlePointerOut = (e) => {
        e.stopPropagation()
        document.body.style.cursor = 'auto'
        setHoveredNode(null)
    }

    return (
        <>
            <PerspectiveCamera makeDefault position={[0, 15, 35]} fov={50} />
            <CameraController />

            {/* Atmosphere */}
            <color attach="background" args={['#050510']} />
            <Sparkles
                count={7000}
                scale={[100, 100, 100]}
                size={15}
                speed={2}
                opacity={1}
                color="#ffaa33"
            />
            <fog attach="fog" args={['#050510', 25, 60]} />

            <ambientLight intensity={0.8} color="#b0b0ff" />
            <directionalLight position={[10, 20, 10]} intensity={1.5} color="#ffd0a0" castShadow shadow-mapSize={[2048, 2048]}>
                <orthographicCamera attach="shadow-camera" args={[-20, 20, 20, -20]} />
            </directionalLight>
            <spotLight position={[0, 10, -20]} intensity={3} color="#a0c0ff" angle={0.8} penumbra={0.5} distance={50} />
            <pointLight position={[-10, 5, 0]} intensity={0.8} color="#ffaa00" distance={20} />
            <pointLight position={[10, 5, 0]} intensity={0.8} color="#ffaa00" distance={20} />

            <Float
                speed={1}
                rotationIntensity={0.2}
                floatIntensity={0.5}
                floatingRange={[-0.5, 0.5]}
            >
                <group
                    position={[0, -5, 0]}
                    scale={[6, 6, 6]}
                    onClick={handleClick}
                    onPointerOver={handlePointerOver}
                    onPointerOut={handlePointerOut}
                >
                    <primitive object={gltf.scene} />

                    {/* Unified Hover Labels */}
                    {Object.entries(sectionData).map(([key, data]) => (
                        data.count > 0 && (
                            <Html
                                key={key}
                                position={[data.center.x, data.center.y + 1.5, data.center.z]}
                                center
                                distanceFactor={30}
                                style={{ pointerEvents: 'none' }}
                            >
                                <div className={`
                                  px-4 py-2 rounded-full backdrop-blur-md border border-white/30 
                                  bg-black/50 text-white font-bold tracking-widest uppercase shadow-lg
                                  transform transition-all duration-300 ease-out
                                  ${(hoveredNode === key) ? 'opacity-100 translate-y-0 scale-110' : 'opacity-0 translate-y-4 scale-90'}
                                `}>
                                    {key}
                                </div>
                            </Html>
                        )
                    ))}
                </group>
            </Float>

            {/* Scroll Component Removed */}

            <OrbitControls
                makeDefault
                enabled={introComplete && !activeSection}
                enablePan={false}
                minPolarAngle={0}
                maxPolarAngle={Math.PI / 1.8}
                minDistance={10}
                maxDistance={50}
                target={[0, 5, 0]}
            />
        </>
    )
}

useGLTF.preload('/models/mushrooms.glb')
