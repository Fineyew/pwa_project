import express from 'express'
import { createSession } from '../browser'

const router = express.Router()

router.post('/', async (req, res) => {
  const { username, password } = req.body
  const sessionId = Date.now().toString()

  try {
    const { page } = await createSession(sessionId)

    await page.goto('https://ews.mip.com/ews/', { waitUntil: 'networkidle' })

    // Adjust these selectors if needed based on the login page
    await page.fill('input[name="username"]', username)
    await page.fill('input[name="password"]', password)
    await page.click('button[type="submit"]')

    await page.waitForTimeout(2000)

    // Take a screenshot of the page after login attempt
    await page.screenshot({
      path: `login_attempt_${sessionId}.png`,
      fullPage: true
    })

    const url = page.url()
    const loginSuccess = !url.includes('login') // Adjust if URL doesn’t change on login

    if (!loginSuccess) throw new Error('Login failed')

    res.json({ success: true, sessionId })
  } catch (err) {
    console.error('[LOGIN ERROR]', err)
    res.status(401).json({ success: false, message: 'Login error' })
  }
})

export default router