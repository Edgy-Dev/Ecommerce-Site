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

export const openTempNavbar = () => ({
  type: types.OPEN_TEMP_NAVBAR
})

export const closeTempNavbar = () => ({
  type: types.CLOSE_TEMP_NAVBAR
})

export const openPermNavbar = () => ({
  type: types.OPEN_PERM_NAVBAR
})

export const closePermNavbar = () => ({
  type: types.CLOSE_PERM_NAVBAR
})

export const setNavbar = config => ({
  type: types.SET_NAVBAR,
  config
})

export const resetNavbar = () => ({
  type: types.RESET_NAVBAR
})
