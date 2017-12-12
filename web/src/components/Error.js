import React from 'react'

function improveMessage(message) {
  if (/ 400/.test(message)) {
    return 'Please check the entered values'
  }
  else if (/ 401/.test(message)) {
    return 'You must be signed in'
  }

  return message
}

function Error({
  error
}) {
  return (
    <p>{ improveMessage(error.message) }</p>
  )
}

export default Error
