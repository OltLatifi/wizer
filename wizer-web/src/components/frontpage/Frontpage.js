import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%', 
        minHeight:800,
        backgroundColor:'#1a1a1aff',
        display: 'flex',
        flexDirection:'column',
        },
    mainText: {
        fontSize:70,
        fontFamily: "Lucida Console",
        color:'white',
    },
    smallText: {
        fontSize:28,
        fontFamily: "Candara",
        color:'white',
    },
    blueText:{
        color: 'aqua'
    },
    button:{
        width:150,
        height:50,
        marginRight:'2%',
    }
}));

function Frontpage() {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <div style={{width: '50%', marginTop:' 10%', marginLeft:'33%'}}>
                <h1 className={classes.mainText}>
                    Keep track<br/>of your <span className={classes.blueText}>work</span>
                </h1>
                <div style={{lineHeight: '60%'}}>
                    <p className={classes.smallText}>
                        Have your homework be <span className={classes.blueText}>organized</span>
                    </p>
                    <p className={classes.smallText}>
                        Help yourself be more <span className={classes.blueText}>productive</span>
                    </p>
                </div>
                <br/>
                <div>
                    <Button className={classes.button} style={{backgroundColor:'aqua'}}>Dashboard</Button>
                    <Button className={classes.button} style={{color:'aqua', border:'2px solid aqua'}}>Pomodoro</Button>
                </div>

            </div>
        </div>
    )
}

export default Frontpage
