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
  ],
  nitro: {
  },
  runtimeConfig: {
    redis: { // Default values
      host: process.env.NUXT_REDIS_HOST || "localhost",
      port: process.env.NUXT_REDIS_PORT ? parseInt(process.env.NUXT_REDIS_PORT, 10) : 6379,
      /* other redis connector options */
    },
  },
  kinde: {
    middleware: false,
    handlers: {
      login: "~/server/api/login.ts",
      callback: "~/server/api/callback.ts",
    }
  },
});
