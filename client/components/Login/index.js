import React from 'react'
import {connect} from 'react-redux'
import {compose} from 'redux'
import {Link} from 'react-router-dom'
import {createStructuredSelector} from 'reselect'
import Button from '@material-ui/core/Button'

import LoginForm from './LoginForm'
import {auth} from '../../store/actions/user'
import {makeSelectLoginError} from '../../store/selectors/user'
import withTransition from '../shared/transitionWrapper'

const Login = props => {
  return (
    <div className="auth-page">
      <div className="auth-form-wrapper">
        <div className="auth-logo">
          <img src="/images/logo.svg" alt="EdgyDev" />
        </div>
        <h3 className="auth-title">Login</h3>
        <LoginForm login={props.loginUser} loginError={props.loginError} />
        <span className="text">OR</span>
        <div style={{marginTop: 35}}>
          <Button
            variant="contained"
            label="Submit"
            type="submit"
            className="auth-submit-button"
          >
            Login with Github
          </Button>
          <Button
            variant="contained"
            color="secondary"
            label="Submit"
            type="submit"
            className="auth-submit-button"
          >
            Login with Facebook
          </Button>
          <Button
            variant="contained"
            color="primary"
            label="Submit"
            type="submit"
            className="auth-submit-button"
          >
            Login with Google
          </Button>
        </div>
        <div className="auth-alt-option">
          <span className="text">CREATE AN ACCOUNT</span>
          <Link to="/register">Register</Link>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = () =>
  createStructuredSelector({
    loginError: makeSelectLoginError()
  })

const mapDispatchToProps = dispatch => ({
  loginUser: data => dispatch(auth({...data, method: 'login'}))
})

const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default compose(withConnect, withTransition)(Login)
