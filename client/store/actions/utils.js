import {appMessage, resourceLoading, resourceLoadingComplete} from './app'

export const errorMessage = error => ({
  message: error.message,
  icon: 'error',
  className: 'error-snackbar-content'
})

export const request = (url, options, dispatch, success, fail) => {
  dispatch(resourceLoading())

  fetch(url, options)
    .then(response => {
      return response.json()
    })
    .then(result => {
      if (result.error) {
        if (fail) {
          fail(result.error)
        } else {
          dispatch(appMessage(errorMessage(result.error)))
        }
      } else {
        success(result.data)
      }
    })
    .catch(error => {
      console.error(error)
      dispatch(appMessage(errorMessage(error)))
    })
    .finally(() => {
      dispatch(resourceLoadingComplete())
    })
}
