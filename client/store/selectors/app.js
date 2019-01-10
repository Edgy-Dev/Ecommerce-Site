import {createSelector} from 'reselect'

const selectApp = state => state.app

export const makeSelectAppMessage = () =>
  createSelector(selectApp, appState => {
    return appState.appMessage
  })

export const makeSelectAppLoading = () =>
  createSelector(selectApp, appState => {
    return appState.appLoading
  })
