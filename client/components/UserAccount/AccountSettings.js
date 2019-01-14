import React from 'react'
import {compose} from 'redux'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'

import withTransition from '../shared/transitionWrapper'
import {makeSelectUser} from '../../store/selectors/user'

import ChangePassword from '../ChangePassword'
import ShippingAddresses from '../ShippingAddresses'
import PaymentInfos from '../PaymentInfos'

const AccountSettings = props => {
  console.log(props)
  return (
    <div>
      <h3 className="auth-title">Account Settings</h3>
      <ShippingAddresses user={props.user} />
      <PaymentInfos user={props.user} />
      <ChangePassword />
    </div>
  )
}

const mapStateToProps = () =>
  createStructuredSelector({
    user: makeSelectUser()
  })

const withConnect = connect(mapStateToProps)

export default compose(withTransition, withConnect)(AccountSettings)
