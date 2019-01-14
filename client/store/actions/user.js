import {isEmpty} from 'lodash'
import * as types from '../constants/user'
import {request} from './utils'
import history from '../../history'

/* action creators */
export const addUser = user => ({
  type: types.ADD_USER,
  user
})

export const removeUser = () => ({type: types.REMOVE_USER})

export const addAnonUser = () => ({
  type: types.ADD_ANON_USER
})

export const removeAnonUser = () => ({type: types.REMOVE_ANON_USER})

export const loginError = error => ({type: types.LOGIN_ERROR, error})

export const registerError = error => ({type: types.REGISTER_ERROR, error})

export const changePasswordError = error => ({
  type: types.CHANGE_PASSWORD_ERROR,
  error
})

export const resolveChangePasswordError = () => ({
  type: types.RESOLVE_CHANGE_PASSWORD_ERROR
})

export const resolveLoginError = () => ({
  type: types.RESOLVE_LOGIN_ERROR
})

export const resolveRegisterError = () => ({
  type: types.RESOLVE_REGISTER_ERROR
})

/* thunk creators */
// OB/JD: array ("iterable") and promise redux middleware, where if you dispatch an array it loops down and dispatches all the actions, or if it is a promise it waits for that promise to resolve then dispatches that
export const me = () => dispatch => {
  return request('/auth/me', {}, dispatch, data => {
    if (isEmpty(data)) {
      dispatch(addAnonUser())
    } else {
      dispatch(addUser(data))
    }
  })
}

export const auth = ({email, password, method}) => dispatch => {
  dispatch(resolveLoginError())

  request(
    `/auth/${method}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email, password})
    },
    dispatch,
    user => {
      dispatch(addUser(user))
      history.push('/')
    },
    error => {
      dispatch(loginError(error.message))
    }
  )
}

export const changePassword = data => dispatch => {
  dispatch(resolveChangePasswordError())

  request(
    '/auth/change-password',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    },
    dispatch,
    () => {
      Promise.resolve('Success')
    },
    error => {
      dispatch(changePasswordError(error.message))
    }
  )
}
export const register = data => dispatch => {
  dispatch(resolveRegisterError())

  request(
    '/auth/register',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    },
    dispatch,
    user => {
      dispatch(addUser(user))
      history.push('/')
    },
    error => {
      dispatch(registerError(error.message))
    }
  )
}

export const logout = () => dispatch => {
  request('/auth/logout', {method: 'POST'}, dispatch, () => {
    dispatch(removeUser())
    history.push('/login')
  })
}
