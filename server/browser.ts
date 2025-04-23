import { chromium, Browser, BrowserContext, Page } from 'playwright'

type Session = {
  context: BrowserContext
  page: Page
}

const sessions = new Map<string, Session>()

export const createSession = async (sessionId: string): Promise<{ page: Page; context: BrowserContext }> => {
  const browser = await chromium.launch({ headless: true })
  const context = await browser.newContext()
  const page = await context.newPage()

  // Store the browser in context metadata so we can close later
  ;(context as any)._browser = browser

  return { page, context }
}

export const setSession = (sessionId: string, session: Session) => {
  sessions.set(sessionId, session)
}

export const getSession = (sessionId: string): Session | undefined => {
  return sessions.get(sessionId)
}

export const destroySession = async (sessionId: string) => {
  const session = sessions.get(sessionId)
  if (session) {
    await session.context.close()

    const browser = (session.context as any)._browser as Browser
    if (browser) await browser.close()

    sessions.delete(sessionId)
  }
}
