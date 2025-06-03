module.exports = {
    darkMode: 'class',
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
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
                'bg-secondary': '#f9fafb',
                'bg-secondary-dark': '#374151',
                'hover-primary': '#e5e7eb',
                'hover-primary-dark': '#4b5563',
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
};