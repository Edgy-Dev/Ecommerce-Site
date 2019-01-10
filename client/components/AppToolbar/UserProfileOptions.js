import React from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import MenuItem from '@material-ui/core/MenuItem'
import Typography from '@material-ui/core/Typography'
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown'
import AccountCircle from '@material-ui/icons/AccountCircle'
import PowerSettingsNew from '@material-ui/icons/PowerSettingsNew'
import {withStyles} from '@material-ui/core/styles'

import history from '../../history'
import CenteredMenu from '../shared/Menus/CenteredMenu'

const styles = theme => ({
  root: {
    display: 'flex'
  },
  paper: {
    marginRight: theme.spacing.unit * 2
  },
  profileIcon: {
    marginRight: '10px'
  },
  profileLogo: {
    width: '50px',
    height: '50px',
    borderRadius: '50%'
  },
  user: {
    textTransform: 'none !important',
    [theme.breakpoints.down('xs')]: {
      display: 'none'
    }
  }
})

class UserProfileOptions extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      anchorEl: null
    }
  }

  handleOpen = event => {
    this.setState({anchorEl: event.currentTarget})
  }

  handleLogoutOut = () => {
    this.props.logout()
    this.handleClose()
  }

  handleViewProfile = () => {
    history.push('/user-profile')
    this.handleClose()
  }

  handleClose = () => {
    this.setState({anchorEl: null})
  }

  render() {
    const {classes} = this.props
    const {anchorEl} = this.state
    const open = !!anchorEl

    return (
      <div className={classes.root}>
        <div>
          <Button
            aria-owns={open ? 'user-profile-options' : undefined}
            aria-haspopup="true"
            onClick={this.handleOpen}
          >
            <img
              className={classes.profileLogo}
              src="/images/profile.jpg"
              alt="/images/profile.jpg"
            />
            <Typography className={classes.user} variant="subtitle1">
              {this.props.user}
            </Typography>
            <KeyboardArrowDown style={{marginLeft: '5px'}} />
          </Button>

          <CenteredMenu
            open={open}
            anchorEl={anchorEl}
            handleClose={this.handleClose}
          >
            <MenuItem
              onClick={this.handleViewProfile}
              className={classes.profileOption}
            >
              <AccountCircle className={classes.profileIcon} />
              <span>Profile</span>
            </MenuItem>
            <MenuItem
              onClick={this.handleLogoutOut}
              className={classes.profileOption}
            >
              <PowerSettingsNew className={classes.profileIcon} />
              <span>Logout</span>
            </MenuItem>
          </CenteredMenu>
        </div>
      </div>
    )
  }
}

UserProfileOptions.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(UserProfileOptions)
