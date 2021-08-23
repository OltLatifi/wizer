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
    },
    navbar:{
        display: 'flex',
        flexDirection: 'row',
        margin: '0 33%',
    },
    navbarElements:{
        margin:'4%',
        color:'gray',
        textDecoration:'none',
    }
}));

function Frontpage() {
    const classes = useStyles()
    return (
        <>
        <section className={classes.root}>
            <div className={classes.navbar}>
                <h3 className={classes.navbarElements}>
                    Wizer
                </h3>
                <h3 className={classes.navbarElements}>
                    <a href='/register' style={{textDecoration:'none', color:'gray'}}>
                        Register
                    </a>
                </h3>
                <h3 className={classes.navbarElements}>
                    <a href='/login' style={{textDecoration:'none', color:'gray'}}>
                        Login
                    </a>
                </h3>
                <h3 className={classes.navbarElements}>Get the app</h3>
            </div>
            <div style={{width: '50%', marginTop:' 6%', marginLeft:'33%'}}>
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
                    <Button href='/dashboard' className={classes.button} style={{backgroundColor:'aqua'}}>Dashboard</Button>
                    <Button href='/pomodoro'className={classes.button} style={{color:'aqua', border:'2px solid aqua'}}>Pomodoro</Button>
                </div>
            </div>
            </section>
           
            <section style={{height:'600px', backgroundColor:'#2d2d2d'}}>
                
                <div className="wave">
                    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="shape-fill"></path>
                    </svg>
                </div>haha
            </section>
        </>
    )
}

export default Frontpage
