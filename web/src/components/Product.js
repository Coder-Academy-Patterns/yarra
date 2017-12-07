import React from 'react'

function Product({
  brandName,
  name
}) { 
  return (
    <div>
      <h3>{ brandName } { name }</h3>
    </div>
  )
}

export default Product