import React from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import styles from './appStyles'

import {
  AppSnackbar,
  AppResourceLoading,
  AppToolbar,
  AppNavbar
} from './components'
import Routes from './routes'

const App = props => {
  const {classes} = props

  return (
    <div className="app-wrapper">
      <AppResourceLoading />
      <div className={classes.contentWrapper}>
        <CssBaseline />
        <AppToolbar handleDrawerOpen={() => console.log('open')} open={true} />
        <AppNavbar />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Routes />
        </main>
      </div>
      <AppSnackbar />
      {/* <AppDialog /> */}
    </div>
  )
}

App.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles, {withTheme: true})(App)
