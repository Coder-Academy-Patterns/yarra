import decodeJWT from 'jwt-decode'
import api from './init'

function setToken(token) {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

export function signIn({ email, password }) {
  return api.post('/auth', { email, password })
    .then((res) => {
      const token = res.data.token
      setToken(token)
      return decodeJWT(token)
    })
}
