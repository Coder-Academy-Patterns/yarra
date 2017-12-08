import React from 'react'

function Product({
  brandName,
  name,
  onEdit,
  onAddToWishlist,
  onRemoveFromWishlist
}) { 
  return (
    <div className='mb-1'>
      <h3 onClick={ onEdit }>{ brandName } { name }</h3>
      { onAddToWishlist &&
        <button
          className='small mr-1'
          onClick={ onAddToWishlist }
        >
          Add to Wishlist
        </button>
      }
      { onRemoveFromWishlist &&
        <button
          className='small'
          onClick={ onRemoveFromWishlist }
        >
          Remove from Wishlist
        </button>
      }
    </div>
  )
}

export default Product