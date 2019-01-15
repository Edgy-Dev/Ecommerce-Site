import React from 'react'
import {Link} from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton'
import {withStyles} from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import Hidden from '@material-ui/core/Hidden'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import classNames from 'classnames'
import NavItem from './NavItem'
import styles from './styles'

const SideNav = props => {
  const {classes} = props

  const iconAction = () =>
    props.variant === 'permanent' ? null : (
      <IconButton onClick={props.handleDrawerClose}>
        <ChevronLeftIcon />
      </IconButton>
    )

  return (
    <div className={classes.sidenav}>
      <div className={classes.toolbar}>
        <div className={classes.logoContainer}>
          <img
            className={classes.logo}
            src="/images/logo.svg"
            alt="/images/logo.svg"
          />
          <span>
            <Link to="/" className={classes.title}>
              EDGY DEV
            </Link>
          </span>
        </div>
        {iconAction()}
      </div>
      <Divider />
      <List>
        {props.navItems.map(navItem => (
          <NavItem
            key={navItem.id}
            {...navItem}
            drawerClose={
              props.variant === 'temporary' ? props.handleDrawerClose : null
            }
          />
        ))}
      </List>
      <Divider />
    </div>
  )
}

const Navbar = props => {
  const {classes} = props
  const navItems = props.navigation

  return (
    <React.Fragment>
      <Hidden {...props.permHidden} implementation="js">
        <Drawer
          variant="persistent"
          className={classNames(classes.drawer, {
            [classes.drawerOpen]: props.permOpen,
            [classes.drawerClose]: !props.permOpen
          })}
          classes={{
            paper: classNames({
              [classes.drawerOpen]: props.permOpen,
              [classes.drawerClose]: !props.permOpen
            })
          }}
          open={props.permOpen}
        >
          <SideNav
            className={classes.sidenav}
            navItems={navItems}
            classes={classes}
            variant="permanent"
          />
        </Drawer>
      </Hidden>
      <Hidden {...props.tempHidden} implementation="js">
        <Drawer
          variant="temporary"
          className={classNames(classes.drawer, {
            [classes.drawerOpen]: props.tempOpen,
            [classes.drawerClose]: !props.tempOpen
          })}
          classes={{
            paper: classNames({
              [classes.drawerOpen]: props.tempOpen,
              [classes.drawerClose]: !props.tempOpen
            })
          }}
          onClose={props.handleDrawerClose}
          open={props.tempOpen}
        >
          <SideNav
            className={classes.sidenav}
            navItems={navItems}
            classes={classes}
            variant="temporary"
            handleDrawerClose={props.handleDrawerClose}
          />
        </Drawer>
      </Hidden>
    </React.Fragment>
  )
}

export default withStyles(styles, {withTheme: true})(Navbar)
