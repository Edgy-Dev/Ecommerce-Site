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
  toolbar: {
    height: '64px'
  },
  menuButton: {
    marginLeft: 12
  },
  hide: {
    display: 'none'
  },
  categoryBtns: {
    flexGrow: 1,
    marginLeft: 10,
    display: 'flex',
    justifyContent: 'space-around'
  },
  logo: {
    length: '60px',
    width: '60px'
  },
  loginBtn: {
    height: 64,
    width: 80,
    padding: '0 10px'
  },
  title: {
    textDecoration: 'none',
    color: '#3f51b5',
    [theme.breakpoints.down('xs')]: {
      fontSize: '0.7em'
    }
  },
  link: {
    color: '#3f51b5',
    '&:hover': {
      textDecoration: 'underline'
    },
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  }
})

export default styles
