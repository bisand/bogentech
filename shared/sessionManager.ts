import { H3Event } from 'h3'

export async function createSessionManager(event: H3Event): Promise<any> {
    // TODO: improve memory session in future
    const keysInCookie = ['refresh_token', 'access_token', 'id_token', 'ac-state-key', 'post-login-redirect-url']
    const memorySession: Record<(typeof keysInCookie)[number], unknown> = {}
  
    const config = useRuntimeConfig(event)
    const sessionConfig = {
      name: 'kinde',
      cookie: config.kinde.cookie ,
      password: config.kinde.password,
    } as any
  
    return {
      async getSessionItem(itemKey: string | number) {
        const session = await getSession(event, sessionConfig)
        return session.data[itemKey] || memorySession[itemKey]
      },
      async setSessionItem(itemKey: string, itemValue: unknown) {
        if (keysInCookie.includes(itemKey)) {
          await updateSession(event, sessionConfig, {
            [itemKey]: itemValue,
          })
        }
        else {
          memorySession[itemKey] = itemValue
        }
      },
      async removeSessionItem(itemKey: string) {
        if (keysInCookie.includes(itemKey)) {
          await updateSession(event, sessionConfig, {
            [itemKey]: undefined,
          })
        }
        else {
          // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
          delete memorySession[itemKey]
        }
      },
      async destroySession() {
        for (const key in memorySession) {
          // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
          delete memorySession[key]
        }
        await clearSession(event, sessionConfig)
      },
    }
  }
  