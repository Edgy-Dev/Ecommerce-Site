import React from 'react'
import {compose} from 'redux'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import dataLoader, {LoaderFn} from '../shared/dataLoader'
import withTransition from '../shared/transitionWrapper'
import {withStyles as WithStyles} from '@material-ui/core/styles'
import styles from './orderStyles'

import {retrieveOrders} from '../../store/actions/user'
import {
  makeSelectOrders,
  makeSelectOrdersLoaded
} from '../../store/selectors/user'

import Order from './Order'

const Orders = props => {
  const {classes} = props

  if (props.orders.length === 0) {
    return <h1>No orders</h1>
  } else {
    return (
      <div className={classes.orderWrapper}>
        <h1> Orders </h1>
        <div className={classes.orders}>
          {props.orders.map(order => <Order order={order} key={order.id} />)}
        </div>
      </div>
    )
  }
}

const mapStateToProps = () =>
  createStructuredSelector({
    orders: makeSelectOrders()
  })

const mapDispatchToProps = dispatch => ({})

const withConnect = connect(mapStateToProps, mapDispatchToProps)

const ordersLoaded = () => () => false // Reloads data every time
const loaders = [new LoaderFn('orders', retrieveOrders, ordersLoaded)]

const withData = dataLoader(loaders)

const withStyles = WithStyles(styles)

export default compose(withConnect, withData, withTransition, withStyles)(
  Orders
)
