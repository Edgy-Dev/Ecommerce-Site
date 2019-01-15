import React from 'react'
import {compose} from 'redux'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'

import withTransition from '../shared/transitionWrapper'
import {makeSelectChangePasswordError} from '../../store/selectors/user'
import {changePassword} from '../../store/actions/user'
import ChangePasswordForm from './ChangePasswordForm'

const ChangePassword = props => {
  return (
    <div className="row-horizontal-wrapper info-wrapper">
      <ChangePasswordForm
        changePassword={props.changePassword}
        changePasswordError={props.changePasswordError}
      />
    </div>
  )
}

const mapStateToProps = () =>
  createStructuredSelector({
    changePasswordError: makeSelectChangePasswordError()
  })

const mapDispatchToProps = dispatch => ({
  changePassword: data => dispatch(changePassword(data))
})

const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default compose(withTransition, withConnect)(ChangePassword)
