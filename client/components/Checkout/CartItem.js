import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'

const CartItem = ({cartItem}) => {
  const price = (cartItem.product.price * cartItem.quantity / 100).toFixed(2)

  return (
    <div className="row-horizontal">
      <div
        className="row-content"
        style={{display: 'flex', alignItems: 'center'}}
      >
        <span style={{flexGrow: 1}}>
          {cartItem.product.name} X {cartItem.quantity}
        </span>
        <span className="vertical-divider" />
        <span style={{width: '60px'}}>${price}</span>
        <span className="vertical-divider" />
      </div>
      <div className="row-actions">
        <IconButton>
          <DeleteIcon />
        </IconButton>
      </div>
    </div>
  )
}

export default CartItem
