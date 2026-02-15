import React from 'react'

export function About() {
    return (
        <div className="space-y-4">
            <h3 className="text-xl font-bold text-amber-900 border-b-2 border-amber-900/20 pb-2">About Me</h3>
            <p>
                Welcome to my digital garden. I am a creative developer passionate about building immersive web experiences that blend art and technology.
            </p>
            <p>
                I specialize in React, Three.js, and interactive design. My goal is to create websites that are not just functional, but also memorable and engaging.
            </p>
            <div className="bg-amber-900/5 p-4 rounded-lg mt-4">
                <h4 className="font-bold mb-2">My Journey</h4>
                <p className="text-sm">
                    Started with simple HTML/CSS, evolved into full-stack development, and now exploring the depths of 3D web graphics.
                </p>
            </div>
        </div>
    )
}
