import React, {useState, useEffect} from 'react';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';

import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import PostAddRoundedIcon from '@material-ui/icons/PostAddRounded';
// import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import AccessTimeRoundedIcon from '@material-ui/icons/AccessTimeRounded';

import Button from '@material-ui/core/Button';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import axiosInstance from '../axios';
import clsx from 'clsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
// import { useHistory } from "react-router";





const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    marginBottom:'60px',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));




function Navbar() {
  const classes = useStyles();
  const theme = useTheme();

  const [open, setOpen] = React.useState(false);

  const [accessToken, setAccessToken] = useState((localStorage.getItem('access_token')));

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(()=>{
    checkLogIn();

    }, []
  );

  const logout=(props)=>{

    axiosInstance.post(`http://localhost:8000/api/logout`, {
        refresh_token: localStorage.getItem('refresh_token'),
            }
        );
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        axiosInstance.defaults.headers['Authorization'] = null;

        window.location.reload(false);
        

  
  }


  function checkLogIn(){
    if(accessToken !== null){
      return(
              <>
                <Button onClick={logout} style={{marginRight: theme.spacing(2), color:'aqua'}}>Logout</Button>
              </>
            );
    } else {
      return(
              <>
                <Button href={'/login'} style={{marginRight: theme.spacing(2), color:'aqua'}}>Login</Button>
              </>);
    }

  }

  return (
    <div className={classes.root}>
      <ToastContainer />
      <CssBaseline />
      <AppBar
        // color='default'
        style={{display:'flex',flexDirection:'row', backgroundColor:'#1a1a1aff', }}
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        
        <Toolbar style={{flexGrow:1, }}>
          <IconButton
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
            style={{color:'aqua'}}
          >
            <MenuIcon />
          </IconButton>
          {/* <a href={'/'} style={{color:'white'}}><img src={'../../../images/icon_w.svg'} width="50" height="50" alt="icon"/></a> */}
          <Typography variant="h6" noWrap>
            <a href={'/'} style={{textDecoration:'none', color:'aqua'}}>Wizer</a>
          </Typography>
          
        </Toolbar>
        {checkLogIn()}
        <Button href={'/register'} style={{color:'aqua'}}>Register</Button>

      </AppBar>
      <Drawer
        style={{backgroundColor:'#1a1a1aff',}}
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div style={{backgroundColor:'#1a1a1aff', minHeight: '100%',}}>
        <div className={classes.drawerHeader} style={{backgroundColor:'#1a1a1aff',}}
        >
          <IconButton onClick={handleDrawerClose} style={{color:'aqua'}}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List style={{backgroundColor:'#1a1a1aff', color:'aqua'}}>
        {/* <ListItem>
          <img src={'../../../images/logo.svg'} width="300" height="150" alt="logo"/>
        </ListItem> */}
        {/* <Divider /> */}
        <ListItem button ><HomeOutlinedIcon/>
          <Button href={'/'} style={{color:'white'}}>Home</Button>
        </ListItem>
        <ListItem button><PostAddRoundedIcon/>
          <Button href={'/dashboard'} style={{color:'white'}}>Dashboard</Button>
        </ListItem>
        <ListItem button><AccessTimeRoundedIcon/>
          <Button href={'/pomodoro'} style={{color:'white'}}>Pomodoro</Button>
        </ListItem>
        {/* <ListItem button><DescriptionOutlinedIcon/>
          <Button href={'/articles'}>Artikuj</Button>
        </ListItem>
        <ListItem button><InfoOutlinedIcon/>
          <Button href={'/about-us'}>Rreth Nesh</Button>
        </ListItem> */}
        
        </List>
        </div>
        
      </Drawer>
      </div>
    
  );
}

export default Navbar