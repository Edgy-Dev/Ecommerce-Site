import React from 'react'
import {connect} from 'react-redux'
import {compose} from 'redux'
import {Link} from 'react-router-dom'
import {createStructuredSelector} from 'reselect'

import RegisterForm from './RegisterForm'
import {register} from '../../store/actions/user'
import {makeSelectRegisterError} from '../../store/selectors/user'

import withTransition from '../shared/transitionWrapper'

const Register = props => {
  return (
    <div className="auth-page">
      <div className="auth-form-wrapper">
        <div className="auth-logo">
          <img src="/images/logo.svg" alt="EdgyDev" />
        </div>
        <h3 className="auth-title">Register</h3>
        <RegisterForm
          register={props.registerUser}
          registerError={props.registerError}
        />

        <div className="auth-alt-option">
          <span>Already have an account?</span>
          <span>Want to log in with Google, Facebook Github?</span>
          <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = () =>
  createStructuredSelector({
    registerError: makeSelectRegisterError()
  })

const mapDispatchToProps = dispatch => ({
  registerUser: data => dispatch(register(data))
})

const withConnect = connect(mapStateToProps, mapDispatchToProps)
export default compose(withConnect, withTransition)(Register)
