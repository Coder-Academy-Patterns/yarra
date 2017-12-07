import React from 'react'

function Product({
  brandName,
  name
}) { 
  return (
    <div>
      <h2>{ brandName } { name }</h2>
    </div>
  )
}

export default Product