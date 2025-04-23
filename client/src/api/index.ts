import axios from 'axios'

const api = axios.create({
  baseURL: 'https://448b-67-231-174-252.ngrok-free.app',
})

export const login = (username: string, password: string) =>
  api.post('/login', { username, password })