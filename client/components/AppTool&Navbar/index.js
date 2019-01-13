import React from 'react'
import {connect} from 'react-redux'
import {compose} from 'redux'
import {createStructuredSelector} from 'reselect'
// import WithWidth from '@material-ui/core/withWidth'

import AppToolbar from '../AppToolbar'
import AppNavbar from '../AppNavbar'

import {openTempNavbar, closeTempNavbar} from '../../store/actions/app'
import {me} from '../../store/actions/user'
import {makeSelectNavbarConfig} from '../../store/selectors/app'
import {makeSelectUserExists} from '../../store/selectors/user'
import dataLoader, {LoaderFn} from '../shared/dataLoader'

class ToolNavbar extends React.Component {
  render() {
    const {config} = this.props
    return (
      <React.Fragment>
        <AppToolbar
          handleDrawerOpen={this.props.openTempNavbar}
          tempOpen={config.tempOpen}
          permOpen={config.permOpen}
          menuHidden={config.menuHidden}
          nameHidden={config.nameHidden}
        />
        <AppNavbar
          tempOpen={config.tempOpen}
          permOpen={config.permOpen}
          handleDrawerClose={this.props.closeTempNavbar}
          navigation={config.navigation}
          permHidden={config.permHidden}
          tempHidden={config.tempHidden}
        />
      </React.Fragment>
    )
  }
}

const mapStateToProps = () =>
  createStructuredSelector({
    config: makeSelectNavbarConfig()
  })

const mapDispatchToProps = dispatch => ({
  closeTempNavbar: () => dispatch(closeTempNavbar()),
  openTempNavbar: () => dispatch(openTempNavbar())
})

const withConnect = connect(mapStateToProps, mapDispatchToProps)

const loaders = [new LoaderFn('user', me, makeSelectUserExists)]

const withData = dataLoader(loaders)

export default compose(withData, withConnect)(ToolNavbar)
