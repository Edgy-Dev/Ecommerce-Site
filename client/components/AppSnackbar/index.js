import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import SnackbarContent from '@material-ui/core/SnackbarContent'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Icon from '@material-ui/core/Icon'

import PropTypes from 'prop-types'
import {createStructuredSelector} from 'reselect'
import {connect} from 'react-redux'

import {makeSelectAppMessage} from '../../store/selectors/app'
import {resolveAppMessage} from '../../store/actions/app'

const AppSnackbar = props => {
  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        open={!!props.appMessage.message}
        autoHideDuration={6000}
        onClose={props.resolveAppMessage}
      >
        <SnackbarContent
          className={props.appMessage.className}
          message={
            <span className="snackbar-message">
              <Icon className="snackbar-icon">
                {props.appMessage.icon || 'message'}
              </Icon>
              {props.appMessage.message}
            </span>
          }
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={props.resolveAppMessage}
            >
              <CloseIcon />
            </IconButton>
          ]}
        />
      </Snackbar>
    </div>
  )
}

const mapStateToProps = () =>
  createStructuredSelector({
    appMessage: makeSelectAppMessage()
  })

const mapDistpatchToProps = dispatch => ({
  resolveAppMessage: () => dispatch(resolveAppMessage())
})

AppSnackbar.propTypes = {
  appMessage: PropTypes.object.isRequired,
  resolveAppMessage: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDistpatchToProps)(AppSnackbar)
