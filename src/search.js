import React, { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import {Helmet} from "react-helmet";
import Link from '@material-ui/core/Link';

const tmdb_api_key = "bd5bc8c3eee4f9fd19f8c9cb07bb4cb9"; //generated TMDB API KEY

const useStyles = makeStyles((theme) => ({
  list: {
  	background: '#121212',
    color: 'white',
    marginTop: 30,
    marginLeft: 40
  },
  heading: {
  	fontSize: 30,
  	color: "white",
  	margin: 15
  },
  poster: {
  	maxWidth: 50
  },
  date: {
  	fontSize: 16,
  	margin: 5,
  	color: "lightgrey"
  },
  title: {
  	fontSize: 20,
  	margin: 15
  }
}));

function addMovie(id) {
  fetch("https://popcritic-modified.herokuapp.com/add/"+id,{method: "POST", headers: {token: window.localStorage.getItem("token")}}).then(x=>x.text()).then(function() {
  	window.location.href = "/movie/"+id;
  }).catch(console.log);
}

export default function Search() {
  const classes = useStyles();

  const [movies, setMovies] = useState(0);

  const [query, setQuery] = useState(0);

  useEffect(() => {
    var query = window.location.pathname.substring(8);
    setQuery(decodeURIComponent(query));
    fetch("https://api.themoviedb.org/3/search/movie?api_key="+tmdb_api_key+"&query="+query).then(resp => resp.json()).then((data) => setMovies(data.results));
  },[])




  return (
  	<div>
  	<Helmet>
      <title>{ "Search Results For " + query }</title>
    </Helmet>
    
    <Typography className={classes.heading}>{ "Search Results:  " + query }</Typography> 
  	<CircularProgress style={{ display: movies?"none":"block", margin: "20px auto" }} />
    <List component="nav" className={classes.list} aria-label="mailbox folders">
    { movies?movies.map(x=> (
      <Link href={ "/movie/" + x.id } color="inherit" style={{ textDecoration: "none" }}> 
      <ListItem button onClick={ () => addMovie(x.id) } key={x.id}>
         
        <img src={ x.poster_path?("https://image.tmdb.org/t/p/w500"+x.poster_path):"https://via.placeholder.com/400x600" } className={classes.poster} />
        
        <Typography className={classes.title}>{ x.original_title }</Typography>
        <Typography className={classes.date}>{ x.release_date?(x.release_date.split("-")[0]):"" }</Typography>
        
      </ListItem>
      </Link>
    )):"" }
    </List>
    </div>
  );
}
