import express from 'express'
import cors from 'cors'
import loginRoute from './routes/login'
import logoutRoute from './routes/logout' // ✅ This should import the default router

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/login', loginRoute)
app.use('/api/logout', logoutRoute) // ✅ Mount it like this

console.log('Routes loaded: /api/login, /api/logout')


app.listen(4000, () => console.log('Server running on http://localhost:4000'))
