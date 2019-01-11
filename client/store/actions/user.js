import * as types from '../constants/user'
import {request} from './utils'
import history from '../../history'

/* action creators */
export const addUser = user => ({
  type: types.ADD_USER,
  user
})

export const removeUser = () => ({type: types.REMOVE_USER})

export const loginError = error => ({type: types.LOGIN_ERROR, error})

export const registerError = error => ({type: types.REGISTER_ERROR, error})

export const resolveLoginError = () => ({
  type: types.RESOLVE_LOGIN_ERROR
})

export const resolveRegisterError = () => ({
  type: types.RESOLVE_REGISTER_ERROR
})

/* thunk creators */
export const me = () => async dispatch => {
  request('/auth/me', {}, dispatch, data => {
    console.log(data)
    dispatch(addUser(data))
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
      console.log(user, 'user was return?')
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
