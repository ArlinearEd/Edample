// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    vite: {
        server: {
            fs: {
                allow: ["C:/Users/lmacl/Documents/Arlinear/ArlinearComponentLib/"]
            }
        }
    },
    css: ['~/assets/css/main.css'],
    postcss: {
        plugins: {
          tailwindcss: {},
          autoprefixer: {},
        },
    },
    ssr : false,
})
