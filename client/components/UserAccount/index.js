import React from 'react'
import {Switch, Route} from 'react-router-dom'
import {connect} from 'react-redux'
import {setNavbar, resetNavbar} from '../../store/actions/app'
import userProfilNavigation from '../AppTool&Navbar/userProfileNavigation'

import AccountSettings from './AccountSettings'
import Orders from './Orders'

class UserProfile extends React.Component {
  componentDidMount() {
    this.props.setNavbar({
      tempOpen: false,
      permOpen: true,
      nameHidden: {mdUp: true},
      menuHidden: {mdUp: true},
      permHidden: {smDown: true},
      tempHidden: {mdUp: true},
      navigation: userProfilNavigation
    })
  }

  componentWillUnmount() {
    this.props.resetNavbar()
  }

  render() {
    const path = this.props.match.path
    return (
      <div className="app-page fixed">
        <div className="aligned scrollable">
          <Switch>
            <Route path={`${path}/orders`} component={Orders} />
            <Route path={`${path}`} component={AccountSettings} />
          </Switch>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  setNavbar: config => dispatch(setNavbar(config)),
  resetNavbar: () => dispatch(resetNavbar())
})

export default connect(null, mapDispatchToProps)(UserProfile)
