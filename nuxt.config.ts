// https://nuxt.com/docs/api/configuration/nuxt-config
import { type RedisOptions } from "unstorage/drivers/redis";
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
    "@nuxt/icon",
  ],
  colorMode: {
    preference: 'system', // default value of $colorMode.preference
    fallback: 'light', // fallback value if not system preference found
    hid: 'nuxt-color-mode-script',
    globalName: '__NUXT_COLOR_MODE__',
    componentName: 'ColorScheme',
    classPrefix: '',
    classSuffix: '-mode',
    storage: 'localStorage', // or 'sessionStorage' or 'cookie'
    storageKey: 'nuxt-color-mode'
  },
  runtimeConfig: {
    redis: { // Default values
      host: process.env.NUXT_REDIS_HOST || "localhost",
      port: process.env.NUXT_REDIS_PORT ? parseInt(process.env.NUXT_REDIS_PORT, 10) : 6379,
      /* other redis connector options */
    },
  },
  kinde: {
    middleware: true,
    handlers: {
    }
  },
});