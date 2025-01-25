import { createSessionManager } from '~/shared/sessionManager'

const config = useRuntimeConfig()

export default defineEventHandler(async (event) => {
  const sessionManager = await createSessionManager(event)
  const client = event.context.kinde

  await client.handleRedirectToApp(
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
