import axios from 'axios'

let baseURL = ''

const configPromise = fetch('/config.json')
  .then((res) => res.json())
  .then((config) => {
    baseURL = config.apiBaseUrl
  })

export const login = async (username: string, password: string) => {
  await configPromise
  return axios.post(`${baseURL}/api/login`, { username, password })
}

export const logout = async (sessionId: string) => {
  await configPromise
  return axios.post(`${baseURL}/api/logout`, { sessionId })
}
