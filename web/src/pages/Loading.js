import React from 'react'

function Loading({
  error,
  timedOut,
}) {
  if (error) {
    return <p>Error loading</p>
  }
  else {
    return <p>Loading…</p>
  }
}

export default Loading