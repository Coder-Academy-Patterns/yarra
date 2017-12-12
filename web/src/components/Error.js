import React from 'react'

function Error({
  error
}) {
  return (
    <p>{ error.message }</p>
  )
}

export default Error
