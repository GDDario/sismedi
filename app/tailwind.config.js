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
                mainDarkBlue: 'rgb(var(--main-dark-blue))',
                mainBackgroundBlue: 'rgb(var(--main-background-blue))',
                mainWhite: 'rgb(var(--main-white))',
                mainRed: 'rgb(var(--main-red))'
            }
        },
    },
    plugins: [],
}

