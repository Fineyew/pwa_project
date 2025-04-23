import express, { Request, Response } from 'express'
import { createSession } from '../browser'
import path from 'path'

const router = express.Router()

router.post('/', async (req: Request, res: Response): Promise<any> => {
  const { username, password } = req.body
  console.log('[LOGIN] Attempting login for user:', username)

  try {
    const { sessionId, page } = await createSession()

    await page.goto('https://ews.mip.com/ews/', { waitUntil: 'load', timeout: 30000 })
    console.log('[LOGIN] Page loaded')

    await page.waitForSelector('#Login_UserName', { timeout: 15000 })
    await page.fill('#Login_UserName', username)

    await page.waitForSelector('#Login_Password', { timeout: 15000 })
    await page.fill('#Login_Password', password)

    await page.waitForSelector('#Login_LoginButton', { timeout: 15000 })
    await page.click('#Login_LoginButton')

    // ✅ Final logout verification
    try {
      await page.waitForSelector('div.dxm-content.dxm-hasText >> text=Logout', { timeout: 10000 })
      console.log('[LOGIN SUCCESS] Logout element detected, login confirmed.')
    } catch {
      console.warn('[LOGIN FAIL] Could not find logout element.')
      return res.status(401).json({ success: false, message: 'Login failed.' })
    }

    return res.json({ success: true, sessionId })
  } catch (err) {
    console.error('[LOGIN ERROR]', err)
    return res.status(500).json({ success: false, message: 'Login failed.' })
  }
})

export default router
