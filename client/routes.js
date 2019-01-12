import React, {Component} from 'react'
import {compose} from 'redux'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Login,
  Register,
  UserHome,
  UserProfile,
  AllProductView,
  SingleProductView
} from './components'
import {me} from './store/actions/user'
import {retreiveProducts} from './store/productAbstract'
import ProtectedRoute from './components/shared/ProtectedRoute'
import HasProtectionRoute from './components/shared/HasProtectionRoute'
import {makeSelectUserExists} from './store/selectors/user'
import dataLoader, {LoaderFn} from './components/shared/dataLoader'
import {makeSelectProductsLoaded} from './store/selectors/product'

/**
 * COMPONENT
 */
const Routes = props => {
  return (
    <Switch>
      {/* Routes placed here are only available after logging in */}
      <HasProtectionRoute path="/login" component={Login} />
      <HasProtectionRoute path="/register" component={Register} />
      <ProtectedRoute path="/user-profile" component={UserProfile} />
      <Route exact path="/products" component={AllProductView} />
      <Route exact path="/products/:id" component={SingleProductView} />
      <Route path="/" component={UserHome} />
    </Switch>
  )
}

/**
 * CONTAINER
 */

// Load data using a HoC
const loaders = [
  new LoaderFn('user', me, makeSelectUserExists),
  new LoaderFn('products', retreiveProducts, makeSelectProductsLoaded)
]

const withData = dataLoader(loaders)

export default compose(withRouter, withData)(Routes)
