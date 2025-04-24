"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const login_1 = __importDefault(require("./routes/login"));
const logout_1 = __importDefault(require("./routes/logout")); // ✅ This should import the default router
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api/login', login_1.default);
app.use('/api/logout', logout_1.default); // ✅ Mount it like this
console.log('Routes loaded: /api/login, /api/logout');
app.listen(4000, () => console.log('Server running on http://localhost:4000'));
