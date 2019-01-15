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

const ShippingAddress = ({address, number}) => {
  const fullAddress = `${address.firstLine}, ${address.secondLine}`
  return (
    <div className="row-horizontal">
      <div className="row-content">
        <span>{number + 1}</span>
        <span className="vertical-divider" />
        <span>{fullAddress}</span>
      </div>
      <div className="row-actions">
        <IconButton>
          <DeleteIcon />
        </IconButton>
      </div>
    </div>
  )
}

const ShippingAddresses = props => {
  return (
    <div className="info-wrapper">
      {props.addresses.map((address, i) => (
        <ShippingAddress key={address.id} number={i} address={address} />
      ))}
    </div>
  )
}

export const SelectShippingAddress = props => {
  if (props.addresses.length === 0) {
    return null
  } else {
    const value =
      (props.selectedAddress && props.selectedAddress.id.toString()) || null
    return (
      <FormControl component="fieldset">
        <FormLabel component="legend">Address</FormLabel>
        <RadioGroup value={value} onChange={props.handleChange}>
          {props.addresses.map(address => (
            <FormControlLabel
              key={address.id}
              value={address.id.toString()}
              label={`${address.firstLine}, ${address.secondLine}`}
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

export default compose(withConnect)(ShippingAddresses)
