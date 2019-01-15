import {createSelector} from 'reselect'
import {isEmpty} from 'lodash'

export const selectUser = state => state.user

export const makeSelectUser = () =>
  createSelector(selectUser, userState => userState.currentUser)

export const makeSelectUserExists = () =>
  createSelector(selectUser, userState => !isEmpty(userState.currentUser))

export const makeSelectLoginError = () =>
  createSelector(selectUser, userState => userState.loginError)

export const makeSelectRegisterError = () =>
  createSelector(selectUser, userState => userState.registerError)

export const makeSelectChangePasswordError = () =>
  createSelector(selectUser, userState => userState.changePasswordError)

export const makeSelectAnonUser = () =>
  createSelector(selectUser, userState => userState.anonUser)
