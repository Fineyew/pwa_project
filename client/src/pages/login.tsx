import React, { useState } from 'react'
import axios from 'axios'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    setLoading(true)
    setError('')

    try {
      const res = await axios.post('http://localhost:4000/api/login', {
        username,
        password
      })

      // ✅ Save sessionId to localStorage so we can use it in Dashboard
      localStorage.setItem('sessionId', res.data.sessionId)

      alert('Login successful. Session ID: ' + res.data.sessionId)
      window.location.reload() // refresh to load Dashboard
    } catch (err) {
      setError('Login failed.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-form">
      <h1 style={{ textAlign: 'center' }}>Login</h1>
      <input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ width: '100%', padding: 8, marginBottom: 12 }}
      />
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ width: '100%', padding: 8, marginBottom: 12 }}
      />
      <button
        onClick={handleLogin}
        disabled={loading}
        style={{
          width: '100%',
          padding: 10,
          background: '#0277bd',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        {loading ? 'Logging in...' : 'Login'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  )  
}
