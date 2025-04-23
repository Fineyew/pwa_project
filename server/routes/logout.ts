import express, { Request, Response } from 'express'
import { getSession, destroySession } from '../browser'
import path from 'path'

const router = express.Router()

router.post('/', async (req: Request, res: Response): Promise<void> => {
  const { sessionId } = req.body
  console.log('[LOGOUT] Request received with sessionId:', sessionId)

  if (!sessionId) {
    console.warn('[LOGOUT] No sessionId provided.')
    res.status(400).json({ success: false, message: 'Missing sessionId' })
    return
  }

  const session = getSession(sessionId)
  if (!session) {
    console.warn('[LOGOUT] Session not found for:', sessionId)
    res.status(404).json({ success: false, message: 'No session found' })
    return
  }

  try {
    const page = session.page

    // 📸 Screenshot for debug
    const screenshotPath = path.join(__dirname, `../../logout_debug_${sessionId}.png`)
    await page.screenshot({ path: screenshotPath, fullPage: true })
    console.log(`[LOGOUT] Screenshot saved to ${screenshotPath}`)

    // ✅ Use visible text to reliably click Logout
    await page.getByText('Logout').click()

    await destroySession(sessionId)
    console.log('[LOGOUT] Successfully logged out and destroyed session')
    res.json({ success: true })
  } catch (err) {
    console.error('[LOGOUT ERROR]', err)
    res.status(500).json({ success: false, message: 'Logout failed' })
  }
})

export default router
