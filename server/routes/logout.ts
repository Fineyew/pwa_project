import express, { Request, Response } from 'express'
import { getSession, destroySession } from '../browser'
import path from 'path'

const router = express.Router()

router.post('/', async (req: Request, res: Response): Promise<any> => {
  const { sessionId } = req.body
  console.log('[LOGOUT] Request received with sessionId:', sessionId)

  if (!sessionId) {
    console.warn('[LOGOUT] No sessionId provided.')
    return res.status(400).json({ success: false, message: 'Missing sessionId' })
  }

  const session = getSession(sessionId)
  if (!session) {
    console.warn('[LOGOUT] Session not found for:', sessionId)
    return res.status(200).json({ success: false, message: 'Session already expired or logged out.' })
  }

  try {
    const page = session.page

// uncomment if you need debug for logout
    // const screenshotPath = path.join(__dirname, `../../logout_debug_${sessionId}.png`)
    // await page.screenshot({ path: screenshotPath, fullPage: true })
    // console.log(`[LOGOUT] Screenshot saved to ${screenshotPath}`)

    await page.getByText('Logout').click()
    await destroySession(sessionId)

    console.log('[LOGOUT] Successfully logged out and destroyed session')
    return res.json({ success: true })
  } catch (err) {
    console.error('[LOGOUT ERROR]', err)
    await destroySession(sessionId)
    return res.status(200).json({ success: false, message: 'Session expired. Forced logout.' })
  }
})

export default router
