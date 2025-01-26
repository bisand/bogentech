import { defineEventHandler, getRequestURL, sendRedirect } from 'h3'
import { useRuntimeConfig } from '#imports'

const config = useRuntimeConfig()

export default defineEventHandler(async (event) => {
  const sessionManager = await createSessionManager(event)

  await getKindeClient().handleRedirectToApp(
    sessionManager,
    getRequestURL(event),
  )

  const postLoginRedirectURL = await sessionManager.getSessionItem('post-login-redirect-url') as string

  if (postLoginRedirectURL) {
    await sessionManager.removeSessionItem('post-login-redirect-url')
    await sendRedirect(event, postLoginRedirectURL)
    return
  }

  await sendRedirect(event, config.kinde.postLoginRedirectURL || '/')
})
