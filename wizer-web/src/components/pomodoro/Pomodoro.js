import React, { useState } from "react";
import Button from '@material-ui/core/Button';
// import ButtonGroup from '@material-ui/core/ButtonGroup';
// import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';

import SettingsIcon from '@material-ui/icons/Settings';

import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection:'row',
        margin:'10% 0',
    },
    circle:{
        width: '400px',
        height: '400px',
        border: '2px dashed black',
        borderRadius: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection:'column',
        backgroundColor:'#f0f0f0',
    }
  });



function Pomodoro() {
    const classes = useStyles()
    
    const[minutes, setMinutes] = useState(0);
    const[seconds, setSeconds] = useState(10);
    const[displayMessage, setDisplayMessage] = useState(false);
    const[start, setStart] = useState(false);
  
    const timer=()=>{
        let interval = setInterval(() => {
            clearInterval(interval);
    
            if (seconds === 0) {
                if (minutes !== 0) {
                setSeconds(59);
                setMinutes(minutes - 1);
                } else {
                let minutes = displayMessage ? 24 : 4;
                let seconds = 59;
    
                setSeconds(seconds);
                setMinutes(minutes);
                setDisplayMessage(!displayMessage);
                }
            } else {
                setSeconds(seconds - 1);
            }
            }, 1000)
    }

    const initiateTimer=()=>{
        if(start){
            timer()
        }
    }

    const timerMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const timerSeconds = seconds < 10 ? `0${seconds}` : seconds;

    return (
        <>
        <div className={classes.root}>
        <div className="message">
            {displayMessage && <Typography variant="h5">Break time! New session starts in:</Typography>}
        </div>
        <div className={classes.circle}>
            
            <Typography variant="h1">
                {timerMinutes}:{timerSeconds}
            </Typography>
            <Button onClick={()=>setStart(!start)}>{start? 'Stop': 'Start'}</Button>
        </div>
        {initiateTimer()}
        </div>
        <Button onClick={()=>setStart(!start)}><SettingsIcon/></Button>
        </>
    );
    }

export default Pomodoro
