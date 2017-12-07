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

export function signUp({ email, password, firstName, lastName }) {
  return api.post('/auth/register', { email, password, firstName, lastName })
    .then((res) => {
      const token = res.data.token
      setToken(token)
      return getDecodedToken()
    })
}

export function signOutNow() {
  // Forget the token
  setToken(null)
}
