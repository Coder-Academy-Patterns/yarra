import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:7000'
})

export function setToken(token) {
  // Set the Authorization header for all requests in the future
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

export default api
