import * as React from 'react'
import { useState } from 'react'
import { login } from '../api'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await login(username, password)
      alert('Login successful. Session ID: ' + res.data.sessionId)
    } catch (err) {
      setError('Login failed.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Login</h1>
      <input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      /><br /><br />
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      /><br /><br />
      <button onClick={handleLogin} disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  )
}