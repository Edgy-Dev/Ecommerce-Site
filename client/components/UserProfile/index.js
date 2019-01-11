import React from 'react'
import {compose} from 'redux'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'

import {makeSelectUser} from '../../store/selectors/user'
import {makeSelectChangePasswordError} from '../../store/actions/user'
import {changePassword} from '../../store/actions/user'

import UserCard from './UserCard'
import ChangePasswordForm from './ChangePasswordForm'
import withTransition from '../shared/transitionWrapper'

const UserProfile = props => {
  return (
    <div className="app-page fixed">
      <div className="aligned scrollable">
        <UserCard
          email={props.user}
          renderCardContent={() => (
            <ChangePasswordForm
              email={props.user}
              changePassword={props.changePassword}
              changePasswordError={props.changePasswordError}
            />
          )}
        />
      </div>
    </div>
  )
}

const mapStateToProps = () =>
  createStructuredSelector({
    changePasswordError: makeSelectChangePasswordError()
  })

const mapDispatchToProps = dispatch => ({
  changePassword: data => dispatch(changePassword(data))
})

const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default compose(withTransition, withConnect)(UserProfile)
