import React from 'react'
import {compose} from 'redux'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'

import dataLoader from '../shared/dataLoader'
import withTransition from '../shared/transitionWrapper'

const Orders = props => {
  return <h1>Hello Orders</h1>
}

const mapStateToProps = () => createStructuredSelector({})

const mapDispatchToProps = dispatch => ({})

const withConnect = connect(mapStateToProps, mapDispatchToProps)

const loaders = []

const withData = dataLoader(loaders)

export default compose(withConnect, withData, withTransition)(Orders)
