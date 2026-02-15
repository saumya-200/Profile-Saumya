import React from 'react'
import { Cylinder, MeshDistortMaterial } from '@react-three/drei'

export function Island() {
    return (
        <group position={[0, -1, 0]}>
            {/* Main Mound - Diameter 12 */}
            <Cylinder args={[6, 6, 2, 64]} position={[0, -1, 0]} receiveShadow>
                <meshStandardMaterial color="#1a332a" roughness={0.8} />
            </Cylinder>
            {/* Top Surface */}
            <mesh position={[0, 0.1, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                <circleGeometry args={[6, 64]} />
                <MeshDistortMaterial
                    color="#2d4c2d"
                    speed={1}
                    distort={0.4}
                    radius={1}
                    roughness={0.9}
                />
            </mesh>
        </group>
    )
}
