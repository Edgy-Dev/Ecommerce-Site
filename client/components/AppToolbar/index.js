import React from 'react'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'

import {makeSelectCurrentUser, makeSelectCurrentTitle} from '../App/selectors'
import {logout} from '../App/actions'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Hidden from '@material-ui/core/Hidden'
import {withStyles} from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import classNames from 'classnames'

import UserProfileOptions from './UserProfileOptions'
import styles from './styles'

const AppToolbar = props => {
  const {classes} = props
  return (
    <AppBar
      position="fixed"
      className={classNames(classes.appBar, {
        [classes.appBarShift]: props.open
      })}
      color="default"
    >
      <Toolbar disableGutters={!props.open}>
        <Hidden xsDown implementation="css">
          <img
            src="/images/bigspool.png"
            className={classNames(classes.menuButton, {
              [classes.hide]: props.open
            })}
            alt="Bigspool"
          />
        </Hidden>
        <Hidden smUp implementation="css">
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={props.handleDrawerOpen}
            className={classNames(classes.menuButton, {
              [classes.hide]: props.open
            })}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>

        <h2 className={classes.title}>{props.currentTitle}</h2>
        <UserProfileOptions
          user={props.user}
          logout={props.logout}
          className="user-profile"
        />
      </Toolbar>
    </AppBar>
  )
}

const mapStateToProps = () =>
  createStructuredSelector({
    user: makeSelectCurrentUser(),
    currentTitle: makeSelectCurrentTitle()
  })

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(AppToolbar)
)
