import { Suspense, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { Scene } from './components/Scene'
import { Navbar } from './components/Navbar'
import { Loader } from './components/Loader'
import { Attribution } from './components/Attribution'
import { ErrorBoundary } from './components/ErrorBoundary'
import { Overlay } from './components/Overlay'
import { useStore } from './store'

function App() {
    const setActiveSection = useStore((state) => state.setActiveSection)
    const setScrollOpen = useStore((state) => state.setScrollOpen)

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                setActiveSection(null)
                setScrollOpen(false)
            }
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [setActiveSection, setScrollOpen])

    return (
        <div className="w-full h-screen bg-black" style={{ height: '100vh', width: '100vw', background: '#000000', position: 'relative' }}>
            <ErrorBoundary>
                <Overlay />
                <Loader />
                <Navbar />
                <Attribution />
                <Canvas shadows className="w-full h-full" dpr={[1, 2]} style={{ height: '100%', width: '100%' }}>
                    <Suspense fallback={null}>
                        <Scene />
                    </Suspense>
                </Canvas>
            </ErrorBoundary>
        </div>
    )
}

export default App
