/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                'color-primary': '#098DFF',
                'color-primary-light': '#CAE6FF',
                'color-white': '#fff',
                'color-black': '#0D0E0F',
                'color-dark': ' #666869',
                'color-dark-1': '#404243',
                'color-grey': '#ededed',
                'color-grey-1': '#D9D9D9',
                'color-blue': '#0660FE',
                'color-blue-1': '#0556E5',
                'color-blue-light': '#098DFF2B',
                'border-radius': '8px',
                'border-radius-lg': '20px',
            }
        },
    },
    plugins: [],
}
