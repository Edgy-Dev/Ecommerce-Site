import React from 'react'
import AppToolbar from '../AppToolbar'
import AppNavbar from '../AppNavbar'

class ToolNavbar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false
    }
  }

  handleDrawerOpen = () => {
    this.setState({open: true})
  }
  handleDrawerClose = () => {
    this.setState({open: false})
  }

  render() {
    return (
      <React.Fragment>
        <AppToolbar
          handleDrawerOpen={this.handleDrawerOpen}
          open={this.state.open}
        />
        <AppNavbar
          open={this.state.open}
          handleDrawerClose={this.handleDrawerClose}
        />
      </React.Fragment>
    )
  }
}

export default ToolNavbar
