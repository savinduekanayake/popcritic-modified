import React, { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
  card: {
    height : 618.4,
    maxWidth: 250,
    margin: 20,
    display: "inline-block",
    background: "rgb(30,30,30)",
    color: "white",
    [theme.breakpoints.down('xs')]: {
      maxWidth: "100%",
      marginLeft: 30,
      marginRight: 30
    }
  },
  cardMobile: {
    maxHeight : 618.4,
    maxWidth: 250,
    margin: 20,
    display: "inline-block",
    background: "rgb(30,30,30)",
    color: "white",
    [theme.breakpoints.down('xs')]: {
      maxWidth: "100%",
      marginLeft: 30,
      marginRight: 30
    }
  },
  container: {
    width: "90%",
    margin: "auto",
    textAlign: "center"
  },
  media: {
    height: 375,
    filter: "brightness(0.7)"
  },
  plot: {
    letterSpacing: 2,
    color: "lightgrey",
    marginTop: 10,
    marginBottom: 15
  },
  rate : {
    width: "100%",
    height : "100%",
    display: "inline-block",
    paddingBottom: 15,
    paddingLeft:15
  }
}));

export default function Home() {

  const windowWidth =  window.innerWidth;
  const windowHeight = window.innerHeight;

  const width = window.innerwidth

  const classes = useStyles();
  const [movies, setMovies] = useState(0);
  
  useEffect(() => {
    fetch("https://popcritic.herokuapp.com/movies").then(resp => resp.json()).then((data) => setMovies(data));
  },[])

  return (
   <div className={classes.container}>
   <CircularProgress style={{ display: movies?"none":"block", margin: "20px auto" }} />
   { movies?movies.map(movie =>
    <Card className={windowWidth >500? classes.card : classes.cardMobile} key={movie.movie_id} >
      {/* <div style={{backgroundColor: 'red', flex :1, minHeight:200}}> */}
        <CardMedia className={classes.media} image={ "https://image.tmdb.org/t/p/w500" + movie.poster } title={ movie.title } />
        <CardContent style={{padding: 10}}>
        <div style={{minHeight:169, maxHeight:220}}>
          <Link href={ "/movie/" + movie.movie_id } color="inherit" style={{ textDecoration: "none" }}>
          <Typography className={classes.title} gutterBottom variant="h5" component="h2">
          
          { movie.title.split(":")}
          </Typography>
          </Link>
          
          <Typography variant="body2" component="p" className={classes.plot}>
          {  movie.plot.slice(0,70) + "..." }
          </Typography>
        </div>
          {/* <Rating  readOnly value={movie.movie_id %3 + 3} /> */}
        </CardContent>   
        {/* </div> */}
       
        <Rating  readOnly value={movie.movie_id %3 + 3} />
       
    </Card>
   ):""}
   </div>
  );
}
