import React, { useState } from 'react'
import Login from './pages/login'
import Dashboard from './pages/Dashboard'

function App() {
  const [sessionId] = useState(() => {
    const id = localStorage.getItem('sessionId')
    return id && id.trim().length > 0 ? id : null
  })

  return sessionId ? <Dashboard /> : <Login />
}

export default App
