"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const browser_1 = require("../browser");
const router = express_1.default.Router();
router.post('/', async (req, res) => {
    const { sessionId } = req.body;
    console.log('[LOGOUT] Request received with sessionId:', sessionId);
    if (!sessionId) {
        console.warn('[LOGOUT] No sessionId provided.');
        return res.status(400).json({ success: false, message: 'Missing sessionId' });
    }
    const session = (0, browser_1.getSession)(sessionId);
    if (!session) {
        console.warn('[LOGOUT] Session not found for:', sessionId);
        return res.status(200).json({ success: false, message: 'Session already expired or logged out.' });
    }
    try {
        const page = session.page;
        // uncomment if you need debug for logout
        // const screenshotPath = path.join(__dirname, `../../logout_debug_${sessionId}.png`)
        // await page.screenshot({ path: screenshotPath, fullPage: true })
        // console.log(`[LOGOUT] Screenshot saved to ${screenshotPath}`)
        await page.getByText('Logout').click();
        await (0, browser_1.destroySession)(sessionId);
        console.log('[LOGOUT] Successfully logged out and destroyed session');
        return res.json({ success: true });
    }
    catch (err) {
        console.error('[LOGOUT ERROR]', err);
        await (0, browser_1.destroySession)(sessionId);
        return res.status(200).json({ success: false, message: 'Session expired. Forced logout.' });
    }
});
exports.default = router;
