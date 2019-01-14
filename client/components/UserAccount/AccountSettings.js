import React from 'react'
import {compose} from 'redux'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'

import withTransition from '../shared/transitionWrapper'
import {makeSelectUser} from '../../store/selectors/user'
import {withStyles as WithStyles} from '@material-ui/core/styles'
import ChangePassword from '../ChangePassword'
import ShippingAddresses from '../ShippingAddresses'
import PaymentInfos from '../PaymentInfos'
import {Button} from '@material-ui/core'

const styles = {
  root: {
    width: '100%',
    minHeight: '100%',
    backgroundColor: '#ffffff',
    display: 'flex',
    flexDirection: 'column'
  },
  addBtn: {
    margin: '30px auto'
  }
}
const AccountSettings = props => {
  const {classes} = props

  return (
    <div className={classes.root}>
      <h1>Shipping Addresses</h1>
      <ShippingAddresses addresses={props.user.addresses} />
      <Button color="primary" className={classes.addBtn} variant="contained">
        Add Address
      </Button>
      <h1>Payment Information</h1>
      <PaymentInfos paymentInfos={props.user.paymentInfos} />
      <Button color="primary" className={classes.addBtn} variant="contained">
        Add Credit Card
      </Button>
      <h1>Change Password</h1>
      <ChangePassword />
    </div>
  )
}

const mapStateToProps = () =>
  createStructuredSelector({
    user: makeSelectUser()
  })

const withConnect = connect(mapStateToProps)
const withStyles = WithStyles(styles)

export default compose(withTransition, withStyles, withConnect)(AccountSettings)
