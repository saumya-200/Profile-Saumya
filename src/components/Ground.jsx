import React from 'react'

export function Ground(props) {
    return (
        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow {...props}>
            <planeGeometry args={[100, 100]} />
            <meshStandardMaterial color="#2f3e2f" />
        </mesh>
    )
}
