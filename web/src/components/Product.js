import React from 'react'

function Product({
  brandName,
  name,
  onEdit
}) { 
  return (
    <div onClick={ onEdit }>
      <h3>{ brandName } { name }</h3>
    </div>
  )
}

export default Product