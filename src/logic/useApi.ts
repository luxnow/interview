import axios from 'axios'
import { useStorage } from '@vueuse/core'

export const api = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 10000,
})

export const isLoading = ref(false)

api.interceptors.request.use((config) => {
  isLoading.value = true
  const token = useStorage('token', '')

  if (token.value)
    config.headers.Authentication = `Bearer ${token.value}`

  return config
}, (error) => {
  isLoading.value = false
  return Promise.reject(error)
})

api.interceptors.response.use((response) => {
  isLoading.value = false
  return response
}, (error) => {
  isLoading.value = false
  return Promise.reject(error)
})
