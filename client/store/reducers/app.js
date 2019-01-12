import * as types from '../constants/app'
import navigation from '../../components/AppTool&Navbar/navigation'

const initialState = {
  appMessage: defaultAppMessage(),
  dialogOptions: defaultAppDialogOptions(),
  navbarConfig: defaultNavbarConfig(),
  appLoading: false
}

/* eslint-disable complexity*/
const appReducer = (state = initialState, action) => {
  switch (action.type) {
    // App snackbar
    case types.APP_MESSAGE:
      return {...state, appMessage: action.messageOptions}
    case types.RESOLVE_APP_MESSAGE:
      return {...state, appMessage: defaultAppMessage()}

    // App loading indicator
    case types.RESOURCE_LOADING:
      return {...state, appLoading: true}
    case types.RESOURCE_LOADING_COMPLETE:
      return {...state, appLoading: false}

    // App dialog
    case types.OPEN_APP_DIALOG:
      return {...state, dialogOptions: action.dialogOptions}
    case types.CLOSE_APP_DIALOG:
      return {...state, dialogOptions: {...state.dialogOptions, open: false}}
    case types.RESET_APP_DIALOG:
      return {...state, dialogOptions: defaultAppDialogOptions()}

    // App navbar
    case types.SET_NAVBAR:
      return {...state, navbarConfig: action.config}
    case types.RESET_NAVBAR:
      return {...state, navbarConfig: defaultNavbarConfig()}

    case types.OPEN_TEMP_NAVBAR:
      return {...state, navbarConfig: {...state.navbarConfig, tempOpen: true}}
    case types.CLOSE_TEMP_NAVBAR:
      return {
        ...state,
        navbarConfig: {...state.navbarConfig, tempOpen: false}
      }

    case types.OPEN_PERM_NAVBAR:
      return {
        ...state,
        navbarConfig: {...state.navbarConfig, permOpen: true}
      }
    case types.CLOSE_PERM_NAVBAR:
      return {
        ...state,
        navbarConfig: {...state.navbarConfig, permOpen: false}
      }

    default:
      return state
  }
}

function defaultAppMessage() {
  return {
    message: '',
    icon: '',
    className: ''
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

function defaultNavbarConfig() {
  return {
    tempOpen: false,
    permOpen: false,
    nameHidden: {mdUp: true},
    menuHidden: {mdUp: true},
    permHidden: {smDown: true},
    tempHidden: {mdUp: true},
    navigation: navigation
  }
}

export default appReducer
