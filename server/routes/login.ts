import express from 'express'
import { createSession, setSession } from '../browser'

const router = express.Router()

router.post('/', async (req, res) => {
  const { username, password } = req.body
  const sessionId = Date.now().toString()

  try {
    const { page, context } = await createSession(sessionId)

    await page.goto('https://ews.mip.com/ews/', { waitUntil: 'networkidle' })

    await page.waitForSelector('#Login_UserName', { timeout: 10000 })
    await page.fill('#Login_UserName', username)
    await page.fill('#Login_Password', password)
    await page.click('#Login_LoginButton')

    await page.waitForTimeout(2000)

    // ✅ Save session so it can be used for logout
    setSession(sessionId, {
      context,
      page
    })

    const url = page.url()
    const loginSuccess = !url.includes('login')

    if (!loginSuccess) throw new Error('Login failed')

    res.json({ success: true, sessionId })
  } catch (err) {
    console.error('[LOGIN ERROR]', err)
    res.status(401).json({ success: false, message: 'Login error' })
  }
})

export default router
