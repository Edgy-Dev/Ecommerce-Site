const drawerWidth = 240

const styles = theme => ({
  sidenav: {
    backgroundColor: '#f6f6f6'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap'
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: 'hidden',
    width: theme.spacing.unit * 7 + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9 + 1
    }
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar
  },
  logoContainer: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center'
  },
  logo: {
    width: '50px',
    height: '50px',
    marginRight: '15px'
  },
  title: {
    textDecoration: 'none',
    color: '#3f51b5',
    [theme.breakpoints.down('xs')]: {
      fontSize: '0.7em'
    }
  }
})

export default styles
