import { defineEventHandler, sendRedirect, getQuery } from 'h3'
import type { SessionManager } from '@kinde-oss/kinde-typescript-sdk'
import { useRuntimeConfig } from '#imports'

export default defineEventHandler(async (event) => {
  const { kinde: kindeSettings } = useRuntimeConfig()
  const query: Record<string, string> = getQuery(event)

  const sessionManager = await createSessionManager(event)

  if (query.postLoginRedirectURL) {
    sessionManager.setSessionItem('post-login-redirect-url', query.postLoginRedirectURL)
  }

  const loginURL = await getKindeClient().login(sessionManager, {
    authUrlParams: {
      audience: kindeSettings.audience,
      ...query,
    },
  })
  await sendRedirect(event, loginURL.href)
})
