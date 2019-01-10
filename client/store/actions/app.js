import * as types from '../constants/app'
import axios from 'axios'

export const appMessage = message => ({
  type: types.APP_MESSAGE,
  message
})

export const resolveAppMessage = () => ({
  type: types.RESOLVE_APP_MESSAGE
})

export const appErrorPage = (status, message) => ({
  type: types.APP_ERROR_PAGE,
  status,
  message
})

export const resourceLoading = () => ({
  type: types.RESOURCE_LOADING
})

export const resourceLoadingComplete = () => ({
  type: types.RESOURCE_LOADING_COMPLETE
})

/* thunk creators */
export const logout = () => {
  return dispatch => {
    dispatch(resourceLoading())

    fetch('/api/auth/logout')
      .then(response => response.json())
      .then(result => {
        if (result.error) {
          dispatch(appMessage(result.error.message, 'error-snackbar-message'))
        } else {
          console.log('removeUser')
        }
      })
      .catch(error => dispatch(appErrorPage(error.message)))
      .finally(() => dispatch(resourceLoadingComplete()))
  }
}
