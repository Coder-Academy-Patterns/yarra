import api from './init'
import decodeJWT from 'jwt-decode'

export function signIn({ email, password }) {
  return api.post('/auth', { email, password })
    .then((res) => {
      const token = res.data.token
      const decodedToken = decodeJWT(token)
      return decodedToken
    })
}
