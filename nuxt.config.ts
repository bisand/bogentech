// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  css: [],
  modules: [
    "nuxt-icon",
    "@nuxt/image",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/color-mode",
    "@nuxtjs/kinde",
  ],
  runtimeConfig: {
    redis: { // Default values
      host: process.env.NUXT_REDIS_HOST || "localhost",
      port: process.env.NUXT_REDIS_PORT ? parseInt(process.env.NUXT_REDIS_PORT, 10) : 6379,
      /* other redis connector options */
    }
  },
  kinde: {
    debug: true,
    handlers: {
      callback: "~/server/api/auth/callback.get.ts",
      login: "~/server/api/auth/login.get.ts",
    }
  },
});
