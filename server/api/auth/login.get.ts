import { createSessionManager } from '~/shared/sessionManager'

export default defineEventHandler(async (event) => {
  const sessionManager = await createSessionManager(event)
  const kindeClient = event.context.kinde

  const loginUrl = await kindeClient.login(sessionManager);
  await sendRedirect(event, loginUrl.href)
})
