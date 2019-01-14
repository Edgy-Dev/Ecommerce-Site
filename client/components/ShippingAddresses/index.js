import React from 'react'
import {compose} from 'redux'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'

import dataLoader from '../shared/dataLoader'
import withTransition from '../shared/transitionWrapper'

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
    <div>
      {props.addresses.map((address, i) => (
        <ShippingAddress key={address.id} number={i} address={address} />
      ))}
    </div>
  )
}

const mapStateToProps = () => createStructuredSelector({})
const mapDispatchToProps = dispatch => ({})

const withConnect = connect(mapStateToProps, mapDispatchToProps)

const loaders = []

const withData = dataLoader(loaders)

export default compose(withConnect, withData, withTransition)(ShippingAddresses)
