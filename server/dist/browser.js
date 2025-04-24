"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.destroySession = exports.getSession = exports.createSession = void 0;
const playwright_1 = require("playwright");
const sessions = new Map();
const createSession = async () => {
    const browser = await playwright_1.chromium.launch({
        headless: true,
        args: ['--disable-blink-features=AutomationControlled'],
    });
    const context = await browser.newContext();
    const page = await context.newPage();
    const sessionId = Date.now().toString();
    context._browser = browser;
    // Save the session
    sessions.set(sessionId, { context, page });
    return { sessionId, page, context };
};
exports.createSession = createSession;
const getSession = (sessionId) => {
    return sessions.get(sessionId);
};
exports.getSession = getSession;
const destroySession = async (sessionId) => {
    const session = sessions.get(sessionId);
    if (session) {
        await session.context.close();
        const browser = session.context._browser;
        if (browser)
            await browser.close();
        sessions.delete(sessionId);
    }
};
exports.destroySession = destroySession;
