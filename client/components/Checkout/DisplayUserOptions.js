import React from 'react'
import Typography from '@material-ui/core/Typography'

export const DisplaySelectedAddress = ({address}) => {
  return (
    <div className="row-horizontal-wrapper-no-width">
      <h4>Selected Address</h4>
      <Typography variant="h6" color="textSecondary">
        {address.streetAddress}
      </Typography>
      <Typography variant="h6" color="textSecondary">
        {address.city}, {address.state}, {address.zipCode}{' '}
      </Typography>
    </div>
  )
}

export const DisplaySelectedPaymentOption = ({paymentOption}) => {
  return (
    <div className="row-horizontal-wrapper-no-width">
      <h4>Selected Payment Option</h4>
      <Typography variant="h6" color="textSecondary">
        Visa: <small>XXXXXXXXXXXXX{paymentOption.lastFourDigits}</small>
      </Typography>
    </div>
  )
}
