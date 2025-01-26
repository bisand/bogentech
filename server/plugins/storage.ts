import redisDriver from 'unstorage/drivers/redis'

export default defineNitroPlugin(() => {
  const storage = useStorage()

  // Dynamically pass in credentials from runtime configuration, or other sources
  const driver = redisDriver({
      base: 'redis',
      host: useRuntimeConfig().redis.host,
      port: useRuntimeConfig().redis.port,
      ttl: 60 * 60 * 24, // 24 hours
      /* other redis connector options */
    })

  // Mount driver
  storage.mount('redis', driver)
})
