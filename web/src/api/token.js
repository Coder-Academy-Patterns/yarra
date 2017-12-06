import decodeJWT from 'jwt-decode'

const tokenKey = 'userToken'

export function saveToken(token) {
  if (token) {
    // Save in local storage
    localStorage.setItem(tokenKey, token)
  }
  else {
    // Sign out: forget the token
    localStorage.removeItem(tokenKey)
  }
}

export function getValidToken() {
  // Read from local storage
  const token = localStorage.getItem(tokenKey)
  try {
    const payload = decodeJWT(token)
    const now = Date.now() / 1000
    // Check if token had expired
    if (payload.exp < now) {
      // Expired: invalid token
      return null
    }
    // Valid token!
    return token
  }
  catch (error) {
    // Invalid token
    return null
  }
}

export function getDecodedToken() {
  try {
    return decodeJWT(getValidToken())
  }
  catch (error) {
    return null
  }
}
