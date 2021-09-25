import axios from 'axios'
import { useStorage } from '@vueuse/core'

export const api = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 10000,
  // headers: { 'X-Custom-Header': 'foobar' },
})

api.interceptors.request.use((config) => {
  const token = useStorage('token', '')

  if (token.value)
    config.headers.Authentication = `Bearer ${token.value}`

  return config
}, (error) => {
  // Do something with request error
  return Promise.reject(error)
})
