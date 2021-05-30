import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    backgroundColor: "grey",
    margin: 20,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function OutlinedCard() {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        {/* <Typography className={classes.title} color="textSecondary" gutterBottom>
          Word of the Day
        </Typography> */}
        <Typography style={{textAlign:'center', paddingBottom: 40}} variant="h5" component="h2">
          {/* be{bull}nev{bull}o{bull}lent */}
          Popcritic is a Movie review website. 
          
        </Typography>
        <Typography style={{textAlign:'center', paddingBottom: 40}} variant="h6" component="h2">
        Using this website you can get some breaf idea about movies before watch it.
           And also you can give opinion about the movie you watched which will help other users to select a better movie to watch.
        </Typography>

        <Typography></Typography>

        <Typography style={{padding:0}} className={classes.pos} color="textSecondary">
        {bull}Below steps will help you if you have some trouble to navigate through this website. 
        </Typography>
      </CardContent>
    </Card>
  );
}
