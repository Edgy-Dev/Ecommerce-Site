import React from 'react'
import {compose} from 'redux'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'

import dataLoader from '../shared/dataLoader'
import withTransition from '../shared/transitionWrapper'

import {makeSelectUser} from '../../store/selectors/user'

const ShippingAddress = props => {}

const ShippingAddresses = props => {
  return <h1>Hello Shipping</h1>
}

const mapStateToProps = () => createStructuredSelector({})
const mapDispatchToProps = dispatch => ({})

const withConnect = connect(mapStateToProps, mapDispatchToProps)

const loaders = []

const withData = dataLoader(loaders)

export default compose(withConnect, withData, withTransition)(ShippingAddresses)
