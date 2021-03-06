import React, { useEffect, useState } from "react";
import ReactDOM from 'react-dom';
import SearchAppBar from './header';
import Home from './home';
import Search from './search';
import Me from './me';
import Movie from './movie';
import People from './people';
import User from './user';
import Help from './Help';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router';

import image404 from './assets/images/404.gif';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  notFound: {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%,-50%)"
  },
  header: {
    // marginTop:50,
    paddingTop:100
  }
}));

export default function App() {
  const classes = useStyles();

  const [message, setMessage] = useState(true);

  function saveLogin() {
    var query = new URLSearchParams(window.location.search);
    var token = query.get("token");
    if (token && token.length > 0) localStorage.setItem("token",token);
    setMessage(false);
    window.location.href = "/";
  }

  return (
    	<div>
    	<SearchAppBar/>
      <div className={classes.header}>

      </div>
    	<Router>
    	<Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/PopCritic">
            <Home />
          </Route>
          <Route path="/me">
            <Me />
          </Route>
          <Route path="/help">
            <Help />
          </Route>
          <Route path="/login">
            <Snackbar open={message} autoHideDuration={1000} onClose={ saveLogin }>
              <MuiAlert elevation={6} variant="filled" severity="success">SuccessFully Logged In</MuiAlert>
            </Snackbar>
          </Route>
          <Route path="/search/:query">
            <Search />
          </Route>
          <Route path="/movie/:query">
            <Movie />
          </Route>
          <Route path="/people/:query">
            <People />
          </Route>
          <Route path="/user/:query">
            <User />
          </Route>
          <Route path="*">
            <img src={image404} className={classes.notFound} />
          </Route>
        </Switch>
    	</Router>
    	</div>
    );
}