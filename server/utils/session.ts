import type { H3Event, SessionConfig } from 'h3'
import type { SessionManager } from '@kinde-oss/kinde-typescript-sdk'
import crypto from 'crypto'

export async function createSessionManager(event: H3Event): Promise<SessionManager> {
  // TODO: improve memory session in future
  const keysInCookie = ['refresh_token', 'access_token', 'id_token', 'ac-state-key', 'post-login-redirect-url']
  // const memorySession: Record<(typeof keysInCookie)[number], unknown> = {}

  const config = useRuntimeConfig(event)
  const sessionConfig = {
    name: 'kinde',
    cookie: {
      ...config.kinde.cookie,
      sameSite: config.kinde.cookie.sameSite as 'lax' | 'strict' | 'none' | undefined,
    },
    password: config.kinde.password,
  } satisfies SessionConfig

  const storage = useStorage('redis')
  const sessionId = getSessionId(event)

  return {
    async getSessionItem(itemKey) {
      // const session = await getSession(event, sessionConfig)
      // console.log('cookie:', cookie)
      // return session.data[itemKey] || storage.getItem(itemKey)
      return storage.getItem(`${sessionId}-${itemKey}`)
    },
    async setSessionItem(itemKey, itemValue) {
      // if (keysInCookie.includes(itemKey)) {
      //   await updateSession(event, sessionConfig, {
      //     [itemKey]: itemValue,
      //   })
      // }
      // else {
      storage.setItem(`${sessionId}-${itemKey}`, itemValue as string, { ttl: 60 * 60 * 12 })
      // memorySession[itemKey] = itemValue
      // }
    },
    async removeSessionItem(itemKey) {
      // if (keysInCookie.includes(itemKey)) {
      //   await updateSession(event, sessionConfig, {
      //     [itemKey]: undefined,
      //   })
      // }
      // else {
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      // delete memorySession[itemKey]
      storage.removeItem(`${sessionId}-${itemKey}`)
      // }
    },
    async destroySession() {
      await clearSession(event, sessionConfig)
    },
  }
}

function getSessionId(event: H3Event) {
  const sessionId = hash(getCookie(event, 'kinde'))
  if (!sessionId) {
    throw new Error('Session ID not found')
  }
  return sessionId
}

function hash(value: string | undefined): string {
  if (!value) {
    throw new Error('Value to hash is undefined')
  }
  return crypto.createHash('sha256').update(value).digest('hex')
}
