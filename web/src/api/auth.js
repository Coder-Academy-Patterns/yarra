import api, { setToken } from './init'
import { getDecodedToken } from './token'

export function signIn({ email, password }) {
  return api.post('/auth', { email, password })
    .then((res) => {
      const token = res.data.token
      setToken(token)
      return getDecodedToken()
    })
}
