import * as types from '../constants/user'
const initialState = {
  currentUser: {},
  loginError: '',
  registerError: ''
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_USER:
      return {...state, currentUser: action.user}
    case types.REMOVE_USER:
      return {...state, currentUser: {}}
    case types.LOGIN_ERROR:
      return {...state, loginError: action.error}
    case types.RESOLVE_LOGIN_ERROR:
      return {...state, loginError: ''}
    case types.REGISTER_ERROR:
      return {...state, registerError: action.error}
    case types.RESOLVE_REGISTER_ERROR:
      return {...state, registerError: ''}
    default:
      return state
  }
}

export default userReducer
