import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import ArrowBackSharpIcon from '@material-ui/icons/ArrowBackSharp';
import Link from '@material-ui/core/Link';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import Description from './Description';

// import css modules
import style from './assets/css/image.module.css';
import home from './assets/images/home1.jpg'
import login from './assets/images/login.jpg'
import search from './assets/images/search2.jpg'
import details from './assets/images/details2.jpg'
import feedback from './assets/images/feedback2.png'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '80%',
        textAlign: "center",
        backgroundColor: "grey !important",
    },
    button: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    actionsContainer: {
        marginBottom: theme.spacing(2),
    },
    resetContainer: {
        padding: theme.spacing(3),
    },
    image: {
        height: 255,
        maxWidth: 400,
        overflow: 'hidden',
        display: 'block center',
        width: '100%',
        borderRadius: 20,
    },
    details: {
        marginTop: 50,
    },
}));

function getSteps() {
    return ['Go to home page', "Login to the website", 'Search a film', 'View the movie details', 'Give a feedback'];
}

function getStepContent(step) {
    switch (step) {
        case 0:
            return `You can see the Website name with icon called "Popcritic", Search bar and Login button  in the top of each and every pages.
      You can click website name or icon to visit the home page.`;
        case 1:
            return `There is a login button on the top right side coner of the website. After click that button you select a email to login to the website.
        This website is using google login method`;
        case 2:
            return `There is a Search bar in the top of the website. Click the search bar and search the movie which you need to get more information.
       After hitting Enter button this website will show you the relavent movie or movie list. Then you can select the movie for get further information `;
        case 3:
            return `There are two different ways to view the movie details. First one is visiting the Home page and you can just click a movie for get details. 
       Other one is you can select the movie in the search result.`;
        case 4:
            return `After you visit to the selected movie page. There is a text box to give your feedback about that movie.
         Before that you need to logging to the system.`;
        default:
            return 'Unknown step';
    }
}

export default function VerticalLinearStepper() {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    //   const darkTheme = {
    //       body : "#000",
    //       fontColor : "#fff"
    //   }

    //   const lighttTheme = {
    //     body : "#000",
    //     fontColor : "#fff"
    //   }

    //   let theme = lighttTheme;

    return (


        <div>
            <Description />

            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "2%" }}>

                <div className={classes.root} style={{ backgroundColor: "grey", color: "grey" }}>



                    <Stepper style={{ backgroundColor: "grey !important" }} activeStep={activeStep} orientation="vertical">
                        {steps.map((label, index) => (
                            <Step key={label} testid='stepId'>
                                <StepLabel testid='stepLabelId'>
                                    <Typography style={{ fontWeight: "bold" }} variant="subtitle1" gutterBottom>
                                        {label}
                                    </Typography>
                                </StepLabel>
                                <StepContent testid='stepContentId'>
                                    <div className={classes.actionsContainer}>
                                        <div>
                                            {
                                                index === 0 ?
                                                    <img
                                                        className={style.img}
                                                        alt=''
                                                        src={home}
                                                    /> :
                                                    index === 1 ?
                                                        <img
                                                            className={style.img}
                                                            alt=''
                                                            src={login}
                                                        /> :
                                                        index === 2 ?
                                                            <img
                                                                className={style.img}
                                                                alt=''
                                                                src={search}
                                                            /> :
                                                            index === 3 ?
                                                                <img
                                                                    className={style.img}
                                                                    alt=''
                                                                    src={details}
                                                                /> :
                                                                <img
                                                                    className={style.img}
                                                                    alt=''
                                                                    src={feedback}
                                                                />


                                            }


                                            <Typography testid='typographyId'>
                                                {getStepContent(index)}
                                            </Typography>

                                            <Button testid='backButtonId'
                                                id='BackButtonId'
                                                disabled={activeStep === 0}
                                                onClick={handleBack}
                                                className={classes.button}
                                                color="primary"
                                                variant="contained"
                                            >
                                                Back
                                    </Button>
                                            <Button testid='nextButtonId'
                                                id='NextButtonId'
                                                variant="contained"
                                                color="primary"
                                                onClick={handleNext}
                                                className={classes.button}
                                            >
                                                {activeStep === steps.length - 1 ?
                                                    'Finish' : 'Next'}
                                            </Button>

                                        </div>
                                    </div>
                                </StepContent>
                            </Step>
                        ))}
                    </Stepper>

                    {activeStep === steps.length && (
                        <Paper square elevation={0} className={classes.resetContainer}>
                            <Typography>All steps completed - you&apos;re finished</Typography>
                            {/* <Button onClick={handleReset} className={classes.button} style={{color:"green"}} variant="outlined" color="secondary">
            Reset
          </Button> */}
                            <Button onClick={handleReset}
                                variant="contained"
                                color="secondary"
                                className={classes.button}
                                startIcon={<DoneAllIcon />}
                            >
                                Reset
      </Button>
                        </Paper>
                    )}
                </div>
            </div>
        </div>
    );
}
