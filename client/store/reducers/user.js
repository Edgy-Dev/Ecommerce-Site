import * as types from '../constants/user'
import {isEmpty} from 'lodash'

const initialState = {
  currentUser: {},
  anonUser: {},
  loginError: '',
  registerError: '',
  changePasswordError: '',
  checkoutError: '',
  orders: ''
}

/*eslint-disable complexity*/
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_USER:
      return {...state, currentUser: action.user}
    case types.REMOVE_USER:
      return {...state, currentUser: {}}

    case types.ADD_ANON_USER:
      return addAnonUser()
    case types.REMOVE_ANON_USER:
      return removeAnonUser()
    case types.RESET_ANON_USER_CART:
      return resetAnonUserCart()

    case types.LOGIN_ERROR:
      return {...state, loginError: action.error}
    case types.RESOLVE_LOGIN_ERROR:
      return {...state, loginError: ''}

    case types.REGISTER_ERROR:
      return {...state, registerError: action.error}
    case types.RESOLVE_REGISTER_ERROR:
      return {...state, registerError: ''}

    case types.CHANGE_PASSWORD_ERROR:
      return {...state, changePasswordError: action.error}
    case types.RESOLVE_CHANGE_PASSWORD_ERROR:
      return {...state, changePasswordError: ''}

    case types.CHECKOUT_ERROR:
      return {...state, checkoutError: action.error}
    case types.RESOLVE_CHECKOUT_ERROR:
      return {...state, checkoutError: ''}

    case types.INIT_ORDERS:
      return {...state, orders: action.orders}
    case types.ADD_ORDER:
      return {...state, orders: [action.order, ...state.orders]}

    case types.ADD_ADDRESS:
      if (isEmpty(state.currentUser)) {
        return {
          ...state,
          anonUser: {
            ...state.anonUser,
            addresses: [action.address, ...state.anonUser.addresses]
          }
        }
      } else {
        return {
          ...state,
          currentUser: {
            ...state.currentUser,
            addresses: [action.address, ...state.currentUser.addresses]
          }
        }
      }

    case types.ADD_TO_STATE_CART:
      if (isEmpty(state.currentUser)) {
        return {
          ...state,
          anonUser: {
            ...state.anonUser,
            cart: [action.product, ...state.anonUser.cart]
          }
        }
      } else {
        return {
          ...state,
          currentUser: {
            ...state.currentUser,
            cart: [action.product, ...state.currentUser.cart]
          }
        }
      }
    case types.CLEAR_CART_STATE:
      return {
        ...state,
        currentUser: {...state.currentUser, cart: []},
        anonUser: {...state.currentUser, cart: []}
      }
    default:
      return state
  }
}
function addAnonUser(state) {
  let user = JSON.parse(localStorage.getItem('anonUser'))
  if (!user) {
    user = {
      cart: [],
      addresses: []
    }
    localStorage.setItem('anonUser', JSON.stringify(user))
  }
  return {...state, anonUser: user}
}

function removeAnonUser(state) {
  localStorage.removeItem('anonUser')
  return {...state, anonUser: {}}
}

function resetAnonUserCart(state) {
  let user = JSON.parse(localStorage.getItem('anonUser'))
  if (user) {
    user.cart = []
    localStorage.setItem('anonUser', JSON.stringify(user))
    return {...state, anonUser: user}
  } else if (state.anonUser.cart) {
    return {...state, anonUser: {...state.anonUser, cart: []}}
  } else {
    return state
  }
}

export default userReducer
