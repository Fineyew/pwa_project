import React, { useState } from 'react'
import axios from 'axios'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e?: React.FormEvent) => {
    e?.preventDefault()
    if (!username || !password) return

    setLoading(true)
    setError('')

    try {
      const res = await axios.post('http://localhost:4000/api/login', {
        username,
        password
      })

      if (res.data.success) {
        localStorage.setItem('sessionId', res.data.sessionId)

        if (import.meta.env.DEV) {
          console.log('[LOGIN SUCCESS]', `Session ID: ${res.data.sessionId}`)
        }

        window.location.reload()
      } else {
        setError('Login failed. Please check credentials.')
      }
    } catch (err) {
      setError('Login failed. Please check credentials or try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleLogin}
      className="login-form"
      style={{
        display: 'flex',
        flexDirection: 'column',
        maxWidth: 300,
        margin: '100px auto',
        gap: '0.75rem'
      }}
    >
      <h1 style={{ textAlign: 'center' }}>Login</h1>

      <input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ padding: 8 }}
      />
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ padding: 8 }}
      />

      <button
        type="submit"
        disabled={loading}
        style={{
          padding: 10,
          background: '#0277bd',
          color: 'white',
          border: 'none',
          cursor: 'pointer'
        }}
      >
        {loading ? 'Logging in...' : 'Login'}
      </button>

      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
    </form>
  )
}
