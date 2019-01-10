import * as types from '../constants/app'

const initialState = {
  appMessage: '',
  defaultAppDialogOptions: defaultAppDialogOptions(),
  appLoading: false
}

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.APP_MESSAGE:
      return {...state, appMessage: action.message}
    case types.RESOLVE_APP_MESSAGE:
      return {...state, appMessage: ''}
    default:
      return state
  }
}

function defaultAppDialogOptions() {
  return {
    open: false,
    title: '',
    contentText: '',
    width: 'md',
    handleClose: null,
    renderContent: null,
    renderActions: null
  }
}

export default appReducer
