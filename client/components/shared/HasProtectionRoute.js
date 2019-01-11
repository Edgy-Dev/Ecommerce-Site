import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import {createStructuredSelector} from 'reselect'
import {connect} from 'react-redux'
import {isEmpty} from 'lodash'

import {makeSelectUser} from '../../store/selectors/user'

const HasProtectionRoute = ({
  component: Component,
  currentUser,
  dispatch,
  ...rest
}) => {
  if (isEmpty(currentUser)) {
    return <Route {...rest} render={props => <Component {...props} />} />
  } else {
    return <Route {...rest} render={_ => <Redirect to="/" />} />
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: makeSelectUser()
})

export default connect(mapStateToProps)(HasProtectionRoute)
