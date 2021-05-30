import React, { useEffect, useState } from "react";
import {withStyles, makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { shadows } from '@material-ui/system';
import Rating from '@material-ui/lab/Rating';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';


import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

const useStyles = makeStyles((theme) => ({
  heading: {
  	fontSize: 30,
  	color: "white",
  	margin: 15
  },
  rating: {
  	margin: "0px 0px 20px 20px"
  },
  reviewBox: {
  	maxWidth: 500,
  	fontSize: 20,
  	fontWeight: "bolder",
  	width: "250%",
  	background: "rgb(30,30,30)",
  	border: "none",
  	padding: 15,
  	color: "white",
  	borderRadius: 30,
    letterSpacing: 3,
    wordSpacing: 7,
  	[theme.breakpoints.down('sm')]: {
  		width: "80%"
  	},
  	'&:focus': {
      outline: "none"
    }
  },
  postButton: {
  	background: "transparent",
  	border: "2px solid white",
  	color: "white",
  	fontWeight: "bolder",
  	borderRadius: 17
  },
  disabledButton: {
    borderColor: "grey"
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
  });

function postReview(rating,review,type) {
  var id = window.location.pathname.substring(type=="movie"?7:8);
  fetch("https://popcritic.herokuapp.com/"+type+"/"+id+"/reviews",{method: "POST", body: JSON.stringify({ rating, review }), headers: {'Content-Type': "application/json", token: window.localStorage.getItem("token")}}).then(x=>x.text()).then(function() {
  	window.location.reload();
  }).catch(console.log);
}



export default function CreateReview(props) {
  const classes = useStyles();
  const [review, setReview] = useState(window.localStorage.getItem("review") || "");
  const [rating, setRating] = useState(5);
  var isLoggedIn = window.localStorage.getItem("token")?true:false;

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCliseWithSubmit = () => {
	setOpen(false);
	postReview(rating,review,props.type)
  }

  return (
  	<div>
    { window.localStorage.setItem("review",review) }
  	<Typography className={classes.heading}>Post Review</Typography>
  	<Rating button value={rating} onChange={ (e,rtg) => setRating(rtg) } className={classes.rating} />

	  {!isLoggedIn? 
	  <TextareaAutosize 
	  aria-label = "Posting review is disabled. Please login and write your review about movie." aria-required = {true}
	  disabled={true} value={review} onChange={ (e) => setReview(e.target.value) } maxLength={300} className={classes.reviewBox} boxShadow={3} rowsMin={6} columnsMin={3} placeholder={isLoggedIn?"Write Your Review Here ...":"Please Log In to Write Your Review Here ..."} />
		:
	  <TextareaAutosize 
	  aria-label = "Write your review about movie" aria-required = {true}
	  value={review} onChange={ (e) => setReview(e.target.value) } maxLength={300} className={classes.reviewBox} boxShadow={3} rowsMin={6} columnsMin={3} placeholder={isLoggedIn?"Write Your Review Here ...":"Please Log In to Write Your Review Here ..."} />
	  }
	 {isLoggedIn? 
	<Button onClick={ () => handleClickOpen()} classes={{ disabled: classes.disabledButton }} className={classes.postButton} >Post Review</Button>
		
	:
	<Button onClick={ () => postReview(rating,review,props.type) }classes={{ disabled: classes.disabledButton }} disabled={true}>Post Review</Button>
	
	}
	 {/* <Button onClick={ () => postReview(rating,review,props.type) } className={classes.postButton} classes={{ disabled: classes.disabledButton }} disabled={!review.length>0}>Post Review</Button> */}
	 
	 

	 <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"Are you sure to submit your feedback?"}</DialogTitle>
        <DialogContent>
          {/* <DialogContentText id="alert-dialog-slide-description">
            Are you sure to submit your feedback?
          </DialogContentText> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            No
          </Button>
          <Button onClick={handleCliseWithSubmit} color="primary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
	  </div>
  )
}