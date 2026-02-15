import { useStore } from '../store'

const sectionImages = {
    about: '/images/About.png',
    projects: '/images/Project.png',
    skills: '/images/techstack.png',
    contact: '/images/getintouch.png',
}

export function Overlay() {
    const activeSection = useStore((state) => state.activeSection)
    const setScrollOpen = useStore((state) => state.setScrollOpen)
    const setActiveSection = useStore((state) => state.setActiveSection)

    if (!activeSection) return null

    const bgImage = sectionImages[activeSection]

    const handleClose = (e) => {
        if (e && e.stopPropagation) e.stopPropagation();
        setActiveSection(null)
        setScrollOpen(false)
    }

    const handleChildClick = (e) => {
        e.stopPropagation()
    }

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity duration-500 animate-in fade-in cursor-pointer"
            onClick={handleClose}
            style={{ pointerEvents: 'auto' }}
        >
            {/* Inner Container: inline-flex ensures it shrinks to fit the image dimensions exactly */}
            <div
                className="relative inline-flex items-center justify-center animate-in zoom-in duration-300 cursor-default"
                onClick={handleChildClick}
            >
                <img
                    src={bgImage}
                    alt={`${activeSection} content`}
                    className="max-h-[85vh] max-w-[90vw] object-contain drop-shadow-2xl rounded-sm"
                />

                {/* Close Button: Positioned 18% inwards from the edge of the IMAGE bounds */}
                <button
                    onClick={handleClose}
                    className="
                absolute 
                top-[18%] right-[18%]
                md:top-[15%] md:right-[15%]
                w-10 h-10 
                bg-black/30 text-white/90 
                rounded-full 
                flex items-center justify-center 
                hover:bg-black/60 hover:scale-110 
                transition-all 
                backdrop-blur-md 
                border border-white/20 
                shadow-lg 
                cursor-pointer 
                z-50 
                text-xl font-bold
            "
                    title="Close"
                >
                    ✕
                </button>
            </div>
        </div>
    )
}
