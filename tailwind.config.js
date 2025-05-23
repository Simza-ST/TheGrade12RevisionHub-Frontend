/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/**/*.{js,jsx,ts,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                'primary': '#60a5fa',
                'primary-dark': '#3b82f6',
                'secondary': '#a78bfa',
                'secondary-dark': '#8b5cf6',
                'success': '#22c55e',
                'warning': '#eab308',
                'error': '#ef4444',
                'neutral-base': '#334155',
                'neutral-secondary': '#2d3748',
                'footer-bg': '#1a4543',
                'gradient-start': '#134e4a',
                'gradient-end': '#7f1d1d',
            },
            fontFamily: {
                'inter': ['Inter', 'sans-serif'],
            },
            backgroundImage: {
                'app-gradient': 'linear-gradient(to bottom right, #134e4a, #7f1d1d)',
            },
        },
    },
    plugins: [],
}

/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class', // Enable dark mode with class strategy
    content: [
        './src/**/*.{js,jsx,ts,tsx}',
    ],
    theme: {
        extend: {},
    },
    plugins: [],
}