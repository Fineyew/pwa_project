"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const browser_1 = require("../browser");
const path_1 = __importDefault(require("path"));
const router = express_1.default.Router();
router.post('/', async (req, res) => {
    const { username, password } = req.body;
    console.log('[LOGIN] Attempting login for user:', username);
    console.log('[DEBUG] Request body:', req.body);
    console.log('[DEBUG] Request headers:', req.headers);
    if (!username || !password) {
        console.warn('[LOGIN FAIL] Missing credentials');
        return res.status(400).json({ success: false, message: 'Missing username or password' });
    }
    try {
        const { sessionId, page } = await (0, browser_1.createSession)();
        await page.goto('https://ews.mip.com/ews/', { waitUntil: 'load', timeout: 30000 });
        console.log('[LOGIN] Page loaded');
        // Screenshot BEFORE filling credentials
        const prePath = path_1.default.join(__dirname, `../../login_pre_${sessionId}.png`);
        await page.screenshot({ path: prePath });
        console.log('[DEBUG] Saved pre-login screenshot:', prePath);
        await page.waitForSelector('#Login_UserName', { timeout: 15000 });
        await page.fill('#Login_UserName', username);
        await page.waitForSelector('#Login_Password', { timeout: 15000 });
        await page.fill('#Login_Password', password);
        await page.waitForSelector('#Login_LoginButton', { timeout: 15000 });
        await page.click('#Login_LoginButton');
        // Screenshot AFTER login attempt
        const postPath = path_1.default.join(__dirname, `../../login_post_${sessionId}.png`);
        await page.screenshot({ path: postPath });
        console.log('[DEBUG] Saved post-login screenshot:', postPath);
        try {
            await page.waitForSelector('div.dxm-content.dxm-hasText >> text=Logout', { timeout: 10000 });
            console.log('[LOGIN SUCCESS] Logout element detected, login confirmed.');
        }
        catch {
            console.warn('[LOGIN FAIL] Could not find logout element.');
            return res.status(401).json({ success: false, message: 'Login failed.' });
        }
        return res.json({ success: true, sessionId });
    }
    catch (err) {
        console.error('[LOGIN ERROR]', err);
        return res.status(500).json({ success: false, message: 'Login failed.' });
    }
});
exports.default = router;
