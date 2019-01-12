import React from 'react'
import {Switch, Route} from 'react-router-dom'
import {compose} from 'redux'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'

import {makeSelectChangePasswordError} from '../../store/selectors/user'
import {changePassword} from '../../store/actions/user'
import {setNavbar, resetNavbar} from '../../store/actions/app'
import userProfilNavigation from '../AppTool&Navbar/userProfileNavigation'
import ChangePasswordForm from './ChangePasswordForm'
import withTransition from '../shared/transitionWrapper'

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
            <Route
              path={`${path}`}
              render={() => (
                <ChangePasswordForm
                  email={this.props.user}
                  changePassword={this.props.changePassword}
                  changePasswordError={this.props.changePasswordError}
                />
              )}
            />
          </Switch>
        </div>
      </div>
    )
  }
}

const mapStateToProps = () =>
  createStructuredSelector({
    changePasswordError: makeSelectChangePasswordError()
  })

const mapDispatchToProps = dispatch => ({
  changePassword: data => dispatch(changePassword(data)),
  setNavbar: config => dispatch(setNavbar(config)),
  resetNavbar: () => dispatch(resetNavbar())
})

const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default compose(withTransition, withConnect)(UserProfile)
