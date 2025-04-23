import { chromium, Browser, Page } from 'playwright'

type Session = {
  browser: Browser
  page: Page
}

const sessions: Record<string, Session> = {}

export const createSession = async (sessionId: string) => {
  const browser = await chromium.launch({ headless: true })
  const page = await browser.newPage()
  sessions[sessionId] = { browser, page }
  return sessions[sessionId]
}

export const getSession = (id: string) => sessions[id]

export const destroySession = async (id: string) => {
  const session = sessions[id]
  if (session) {
    await session.browser.close()
    delete sessions[id]
  }
}