import React from 'react'
import {compose} from 'redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import {
  Login,
  Register,
  UserHome,
  UserAccount,
  AllProductView,
  AllHoodieView,
  AllLongsleeveView,
  AllTeeView,
  SingleProductView
} from './components'
import {retreiveProducts} from './store/productAbstract'
import ProtectedRoute from './components/shared/ProtectedRoute'
import HasProtectionRoute from './components/shared/HasProtectionRoute'
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
      <ProtectedRoute path="/account" component={UserAccount} />
      <Route exact path="/products" component={AllProductView} />
      <Route exact path="/products/tees" component={AllTeeView} />
      <Route exact path="/products/hoodies" component={AllHoodieView} />
      <Route exact path="/products/longsleeves" component={AllLongsleeveView} />
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
  new LoaderFn('products', retreiveProducts, makeSelectProductsLoaded)
]

const withData = dataLoader(loaders)

export default compose(withRouter, withData)(Routes)
