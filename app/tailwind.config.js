/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                mainBrightBlue: 'rgb(var(--main-bright-blue))',
                mainLightBlue: 'rgb(var(--main-light-blue))',
                mainDarkBlue: 'rgb(var(--main-dark-blue))'
            }
        },
    },
    plugins: [],
}

