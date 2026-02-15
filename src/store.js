import { create } from 'zustand'

export const useStore = create((set) => ({
    activeSection: null,
    scrollOpen: false,
    introComplete: false,
    cameraTarget: [0, 0, 0],

    setIntroComplete: (isComplete) => set({ introComplete: isComplete }),
    setActiveSection: (section) => set({ activeSection: section }),
    setScrollOpen: (isOpen) => set({ scrollOpen: isOpen }),
    setCameraTarget: (target) => set({ cameraTarget: target }),
}))
