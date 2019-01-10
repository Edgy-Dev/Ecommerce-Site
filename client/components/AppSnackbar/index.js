import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import SnackbarContent from '@material-ui/core/SnackbarContent'
import IconButton from '@material-ui/core/IconButton'
import Icon from '@material-ui/core/Icon'
import ErrorIcon from '@material-ui/icons/Error'

import PropTypes from 'prop-types'
import {createStructuredSelector} from 'reselect'
import {connect} from 'react-redux'

import {makeSelectAppMessage} from './selectors'
import {resolveAppMessage} from './actions'

class AppSnackbar extends React.PureComponent {
  handleClose() {
    this.props.resolveAppMessage()
  }

  render() {
    return (
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center'
          }}
          open={!!this.props.appMessage}
          autoHideDuration={6000}
          onClose={this.handleClose}
        >
          <SnackbarContent
            className={this.props.className}
            message={
              <span className="snackbar-message">
                <ErrorIcon className="snackbar-icon" />
                {this.props.appError}
              </span>
            }
            action={[
              <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
                onClick={this.handleClose}
              >
                <Icon>{this.props.iconName}</Icon>
              </IconButton>
            ]}
          />
        </Snackbar>
      </div>
    )
  }
}

const mapStateToProps = () =>
  createStructuredSelector({
    appMessage: makeSelectAppMessage()
  })

const mapDistpatchToProps = dispatch => ({
  resolveAppMessage: () => dispatch(resolveAppMessage())
})

AppSnackbar.propTypes = {
  appMessage: PropTypes.string.isRequired,
  resolveAppMessage: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
  iconName: PropTypes.string.isRequired
}

export default connect(mapStateToProps, mapDistpatchToProps)(AppSnackbar)
