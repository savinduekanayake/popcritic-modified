import React, { useEffect, useState } from "react";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import GitHubIcon from '@material-ui/icons/GitHub';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';

import HelpOutlineRoundedIcon from '@material-ui/icons/HelpOutlineRounded';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

import headerImage from './assets/images/header.png'

const useStyles = makeStyles((theme) => ({
  header: {
    flexGrow: 1,
    position: 'fixed',
    zIndex: 10,
    width:'100%'
  },
  bar: {
    background: 'rgb(30,30,30)',
    minHeight:90,
    justifyContent: 'center'
  },
  title: {
    flexGrow: 1,
    display: 'none',
    fontSize: 25,
    fontWeight: "bolder",
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  login: {
    margin: 20,
    fontWeight: "bolder",
    [theme.breakpoints.down('sm')]: {
      padding: 5,
    },
  },
  search: {
    position: 'relative',
    borderRadius: 20,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  avatar: {
    marginRight: 20,
    border: "2px solid white"
  },
  user: {
    margin: 25
  },
  gh: {
    color: "white",
    margin: 15,
    [theme.breakpoints.down('sm')]: {
      display: "none"
    }
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '20ch',
      '&:focus': {
        width: '30ch',
      },
    },
  },
  titleDev: {
    flex:1,

  },
}));



export default function SearchAppBar() {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [profile, setProfile] = useState(1);
  const [logIn, setLogIn] = useState(false);

  const [open, setOpen] = React.useState(false);

  const handleLogin = () => {
    setLogIn(!logIn);
    window.localStorage.setItem('login', !logIn);
    
  };


  useEffect(() => {
    fetch("https://popcritic.herokuapp.com/me",{headers: {token: window.localStorage.getItem("token")}}).then(resp => resp.json()).then((data) => setProfile(data)).catch(console.log);
  },[])



  function search(e) {
    if (e.keyCode==13) window.location.href="/search/"+e.target.value
  }

  return (
    <div className={classes.header}>
      <AppBar position="static" className={classes.bar}>
        <Toolbar>
        
          <Link href="/">
          <Avatar alt="PopCritic" src={headerImage} className={classes.avatar} />
          </Link>
    
        <dev className={classes.titleDev}>
        
          <Typography className={classes.title} variant="h6" noWrap>
          <Link color="inherit" href="/" underline="none">
            PopCritic
            </Link>
          </Typography>
          
        </dev>

 
          <Link aria-label="Github link" href="https://github.com/savinduekanayake/PopCritic">
            <GitHubIcon fontSize="large" className={classes.gh} />
          </Link>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
            <SearchIcon />
            </div>

            <InputBase
              placeholder="Search Movie"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              onChange={ (e) => setValue(e.target.value) }
              onKeyDown={search}
            />
          </div>
          <Button variant="contained" href="/help" className={classes.login}>
             <HelpOutlineIcon/> <span>&nbsp;</span> Help </Button>

             {/* <Button onClick={handleLogin} variant="contained" className={classes.login}>{logIn == false? "LogIn" : "LogOut"}</Button> */}
          {
           profile.pic?<Link href="/me"><Avatar alt="PopCritic" src={ profile?profile.pic:"" } className={classes.user} /></Link>:<Button variant="contained" href="https://popcritic.herokuapp.com/login" className={classes.login}>Log In</Button>
          }
        </Toolbar>
      </AppBar>
    </div>
  );
}
