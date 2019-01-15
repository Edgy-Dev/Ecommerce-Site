import React from 'react'
import {compose} from 'redux'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'

import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'

const PaymentInfo = ({paymentInfo, number}) => {
  return (
    <div className="row-horizontal">
      <div className="row-content">
        <span>{number + 1}</span>
        <span className="vertical-divider" />
        <span>Card ending in: XXXXXXXXXX{paymentInfo.lastFourDigits}</span>
      </div>
      <div className="row-actions">
        <IconButton>
          <DeleteIcon />
        </IconButton>
      </div>
    </div>
  )
}
const PaymentInfos = props => {
  return (
    <div className="info-wrapper">
      {props.paymentInfos.map((paymentInfo, i) => (
        <PaymentInfo
          key={paymentInfo.id}
          number={i}
          paymentInfo={paymentInfo}
        />
      ))}
    </div>
  )
}

export const SelectPaymentInfo = props => {
  if (props.paymentInfos.length === 0) {
    return null
  } else {
    const value =
      (props.selectedPayment && props.selectedPayment.id.toString()) || null
    return (
      <FormControl component="fieldset">
        <FormLabel component="legend">Payment Options</FormLabel>
        <RadioGroup value={value} onChange={props.handleChange}>
          {props.paymentInfos.map(option => (
            <FormControlLabel
              key={option.id}
              value={option.id.toString()}
              label={`XXXXXXXXXXXXX${option.lastFourDigits}`}
              control={<Radio color="primary" />}
            />
          ))}
        </RadioGroup>
      </FormControl>
    )
  }
}
const mapStateToProps = () => createStructuredSelector({})

const mapDispatchToProps = dispatch => ({})

const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default compose(withConnect)(PaymentInfos)
