import axios from 'axios'
import { getValidToken, saveToken } from './token'

const api = axios.create({
  baseURL: 'http://localhost:7000'
})

export function setToken(token) {
  saveToken(token)

  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }
  else {
    delete api.defaults.headers.common['Authorization']
  }
}

// Set initial token, if there is one
setToken(getValidToken())

export default api
