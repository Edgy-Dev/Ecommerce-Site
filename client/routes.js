import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Login,
  Register,
  UserHome,
  AllProductView,
  SingleProductView
} from './components'
import {retreiveProducts} from './store/productAbstract'
import ProtectedRoute from './components/shared/ProtectedRoute'
import HasProtectionRoute from './components/shared/HasProtectionRoute'
import {createStructuredSelector} from 'reselect'
import {makeSelectUser} from './store/selectors/user'
/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    return (
      <Switch>
        {/* Routes placed here are only available after logging in */}
        <HasProtectionRoute path="/login" component={Login} />
        <HasProtectionRoute path="/register" component={Register} />
        <Route exact path="/products" component={AllProductView} />
        <Route exact path="/products/:id" component={SingleProductView} />
        <Route path="/" component={UserHome} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */

const mapState = () =>
  createStructuredSelector({
    currentUser: makeSelectUser()
  })

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me()).then(dispatch(retreiveProducts()))
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired
}
