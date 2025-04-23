import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:4000/api',
})

export const login = (username: string, password: string) =>
  api.post('/login', { username, password })