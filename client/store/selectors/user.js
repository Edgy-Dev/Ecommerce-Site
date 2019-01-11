import {createSelector} from 'reselect'

export const selectUser = state => state.user

export const makeSelectUser = () =>
  createSelector(selectUser, userState => userState.currentUser)

export const makeSelectLoginError = () =>
  createSelector(selectUser, userState => userState.loginError)

export const makeSelectRegisterError = () =>
  createSelector(selectUser, userState => userState.registerError)
