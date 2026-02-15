import React from 'react'

export function Contact() {
    return (
        <div className="space-y-6">
            <h3 className="text-xl font-bold text-amber-900 border-b-2 border-amber-900/20 pb-2">Get in Touch</h3>
            <div className="bg-amber-900/5 p-6 rounded-lg text-center space-y-4">
                <p>I'm always open to new opportunities and interesting projects.</p>
                <a
                    href="mailto:hello@example.com"
                    className="inline-block bg-amber-900 text-amber-50 px-6 py-2 rounded-full font-bold hover:bg-amber-800 transition-colors"
                >
                    Say Hello
                </a>
            </div>

            <div className="grid grid-cols-2 gap-4 text-center text-sm font-medium text-amber-900/70">
                <a href="#" className="hover:text-amber-900">GitHub</a>
                <a href="#" className="hover:text-amber-900">Twitter</a>
                <a href="#" className="hover:text-amber-900">LinkedIn</a>
                <a href="#" className="hover:text-amber-900">Dribbble</a>
            </div>
        </div>
    )
}
