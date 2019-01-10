import * as types from '../constants/app'

const initialState = {
  appMessage: '',
  dialogOptions: defaultAppDialogOptions(),
  appLoading: false
}

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.APP_MESSAGE:
      return {...state, appMessage: action.message}
    case types.RESOLVE_APP_MESSAGE:
      return {...state, appMessage: ''}
    case types.OPEN_APP_DIALOG:
      return {...state, dialogOptions: action.dialogOptions}
    case types.CLOSE_APP_DIALOG:
      return {...state, dialogOptions: {...state.dialogOptions, open: false}}
    case types.RESET_APP_DIALOG:
      return {...state, dialogOptions: defaultAppDialogOptions()}
    default:
      return state
  }
}

function defaultAppDialogOptions() {
  return {
    open: false,
    title: '',
    contentText: '',
    width: 'sm',
    handleClose: null,
    renderContent: null,
    renderActions: null
  }
}

export default appReducer
