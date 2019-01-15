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

export const checkoutError = error => ({
  type: types.CHECKOUT_ERROR,
  error
})

export const resolveCheckout = () => ({
  type: types.RESOLVE_CHECKOUT_ERROR
})

export const initOrders = orders => ({
  type: types.INIT_ORDERS,
  orders
})

export const addOdder = order => ({
  type: types.ADD_ORDER,
  order
})

/* thunk creators */
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

  return request(
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

  return request(
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

  return request(
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
  return request('/auth/logout', {method: 'POST'}, dispatch, () => {
    dispatch(removeUser())
    history.push('/login')
  })
}

export const checkout = (loggedInUser, cart) => dispatch => {
  return request(
    '/api/checkout',
    {
      method: 'POST',
      body: JSON.stringify(cart)
    },
    dispatch,
    data => {
      if (loggedInUser) {
        history.push('/account/orders/' + data.orderId)
      } else {
        history.push('/order-success')
      }
    },
    error => {
      dispatch(checkoutError(error.message))
    }
  )
}

export const retrieveOrders = () => dispatch => {
  return request('/api/users/orders', {}, dispatch, orders => {
    dispatch(initOrders(orders))
  })
}
