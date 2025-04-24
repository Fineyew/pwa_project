import axios from 'axios'

let api = axios.create({ baseURL: '' })

// Load config.json once and configure axios instance
const configPromise = fetch('/config.json')
  .then(res => res.json())
  .then(config => {
    console.log('[CONFIG] Loaded baseURL:', config.apiBaseUrl)
    api = axios.create({
      baseURL: config.apiBaseUrl,
      headers: { 'Content-Type': 'application/json' }
    })
  })
  .catch(err => {
    console.error('[CONFIG] Failed to load /config.json:', err)
  })

// All exported requests wait for config to load
export const login = async (username: string, password: string) => {
  await configPromise
  return api.post('/api/login', { username, password })
}

export const logout = async (sessionId: string) => {
  await configPromise
  return api.post('/api/logout', { sessionId })
}
