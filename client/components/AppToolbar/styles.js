const drawerWidth = 240
const styles = theme => ({
  root: {display: 'flex'},
  appBar: {
    height: '64px',
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 12
  },
  hide: {
    display: 'none'
  },
  title: {
    flexGrow: 1
  },
  logo: {
    length: '60px',
    width: '60px'
  }
})

export default styles
