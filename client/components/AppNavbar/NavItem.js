import React from 'react'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Icon from '@material-ui/core/Icon'

const NavLinkItem = props => {
  return (
    <NavLink to={props.to} className="nav-item" onClick={props.drawerClose}>
      <ListItem button>
        <ListItemIcon>
          <Icon>{props.icon}</Icon>
        </ListItemIcon>
        <ListItemText primary={props.label} />
      </ListItem>
    </NavLink>
  )
}

const renderNavItem = props => {
  return <NavLinkItem {...props} />
}

const NavReduxItem = props => {
  const handleClick = () => {
    props.handleItemClick()
    if (props.drawerClose) {
      props.drawerClose()
    }
  }
  return (
    <ListItem button onClick={handleClick}>
      <ListItemIcon>
        <Icon>{props.icon}</Icon>
      </ListItemIcon>
      <ListItemText primary={props.label} />
    </ListItem>
  )
}

const connectReduxItem = ({dispatcher, ...rest}) => {
  const mapDispatchToProps = dispatch => ({
    handleItemClick: () => dispatch(dispatcher())
  })

  return connect(null, mapDispatchToProps)(
    class ConnectedItem extends React.Component {
      render() {
        return <NavReduxItem {...rest} {...this.props} />
      }
    }
  )
}

const renderReduxItem = props => {
  const ReduxItem = connectReduxItem(props)
  return <ReduxItem />
}

const NavItem = props => {
  return props.to ? renderNavItem(props) : renderReduxItem(props)
}

export default NavItem
