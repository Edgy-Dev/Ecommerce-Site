import React from 'react'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import {isEmpty} from 'lodash'

import history from '../../history'
import {logout} from '../../store/actions/user'
import {makeSelectUser} from '../../store/selectors/user'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Hidden from '@material-ui/core/Hidden'
import {withStyles} from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import Button from '@material-ui/core/Button'
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
            src="/images/logo.svg"
            className={classNames(classes.menuButton, {
              [classes.hide]: props.open
            })}
            alt="EdgyDev"
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
        <img className={classes.logo} src="/images/logo.svg" alt="EdgyDev" />
        <h2 className={classes.title}>Edgy Dev</h2>
        {isEmpty(props.user) ? (
          <React.Fragment>
            <div className="vertical-divider" />
            <Button
              className={classes.loginBtn}
              onClick={() => history.push('/register')}
            >
              REGISTER
            </Button>
            <div className="vertical-divider" />
            <Button
              className={classes.loginBtn}
              onClick={() => history.push('/login')}
            >
              LOGIN
            </Button>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div className="vertical-divider" />
            <UserProfileOptions
              user={props.user}
              logout={props.logout}
              className="user-profile"
            />
          </React.Fragment>
        )}
        <div className="vertical-divider" />
        <IconButton color="inherit">
          <ShoppingCartIcon />
        </IconButton>
        <span>
          {(props.user && props.user.cart && props.user.cart.length) || 0}
        </span>
        <div className="vertical-divider" />
      </Toolbar>
    </AppBar>
  )
}

const mapStateToProps = () =>
  createStructuredSelector({
    user: makeSelectUser()
  })

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(AppToolbar)
)
