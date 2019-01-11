import * as types from '../constants/app'

export const appMessage = messageOptions => ({
  type: types.APP_MESSAGE,
  messageOptions
})

export const resolveAppMessage = () => ({
  type: types.RESOLVE_APP_MESSAGE
})

export const openDialog = dialogOptions => ({
  type: types.OPEN_APP_DIALOG,
  dialogOptions
})

export const closeDialog = () => ({
  type: types.CLOSE_APP_DIALOG
})

export const resetDialog = () => ({
  type: types.RESET_APP_DIALOG
})

export const resourceLoading = () => ({
  type: types.RESOURCE_LOADING
})

export const resourceLoadingComplete = () => ({
  type: types.RESOURCE_LOADING_COMPLETE
})
