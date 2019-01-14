import React from 'react'
import {connect} from 'react-redux'
import {compose} from 'redux'
import {createStructuredSelector} from 'reselect'
import {NavLink, Link} from 'react-router-dom'
import {isEmpty} from 'lodash'

import history from '../../history'
import {logout} from '../../store/actions/user'
import {makeSelectUser} from '../../store/selectors/user'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Hidden from '@material-ui/core/Hidden'
import addWidth from '@material-ui/core/withWidth'
import {withStyles as addStyles} from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import Button from '@material-ui/core/Button'
import classNames from 'classnames'
import UserProfileOptions from './UserProfileOptions'
import styles from './styles'

const getNameLogoHiddenOptions = (config, permNavbarOpen) => {
  return Object.keys(config).reduce((acum, size) => {
    if (permNavbarOpen) {
      acum[size] = true
    } else {
      acum[size] = false
    }
    return acum
  }, {})
}
const AppToolbar = props => {
  const {classes} = props
  const appBarShift = props.permOpen && !['sm', 'xs'].includes(props.width)
  const nameLogoHidden = getNameLogoHiddenOptions(
    props.nameHidden,
    props.permOpen
  )

  return (
    <AppBar
      position="fixed"
      color="default"
      className={classNames(classes.appBar, {
        [classes.appBarShift]: appBarShift
      })}
    >
      <Toolbar disableGutters={true} className={classes.toolbar}>
        <Hidden {...props.menuHidden} implementation="css">
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={props.handleDrawerOpen}
            className={classNames(classes.menuButton, {
              [classes.hide]: props.tempOpen
            })}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
        <Hidden {...nameLogoHidden}>
          <img
            src="/images/logo.svg"
            className={classNames(classes.menuButton, classes.logo, {
              [classes.hide]: props.tempOpen
            })}
            alt="EdgyDev"
          />
        </Hidden>
        <Hidden {...nameLogoHidden}>
          <Link to="/" className={classes.title}>
            <h2>Edgy Dev</h2>
          </Link>
        </Hidden>
        <div className={classes.categoryBtns}>
          <NavLink className={classes.link} to="/products">
            All Products
          </NavLink>
          <NavLink className={classes.link} to="/products/tees">
            Long Sleeves
          </NavLink>
          <NavLink className={classes.link} to="/products/longsleeves">
            Short Sleeves
          </NavLink>
          <NavLink className={classes.link} to="/products/hoodies">
            Hoodies
          </NavLink>
        </div>
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

const withConnect = connect(mapStateToProps, mapDispatchToProps)
const withStyles = addStyles(styles)
const withWidth = addWidth()

export default compose(withConnect, withWidth, withStyles)(AppToolbar)
