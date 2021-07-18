import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import axiosInstance from '../../axios';
import { withRouter } from 'react-router';




const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
          }},
    input: {
        width: '60%'
    }
  }));
  
function Register(props) {
    const classes = useStyles();



    const[username, setUsername] = useState('');
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[confirmPassword, setConfirmPassword] = useState('');
    const[showEmailWarning, setShowEmailWarning] = useState(false);
    const[showPasswordWarning, setShowPasswordWarning] = useState(false);
    const[showUsernameWarning, setUsernameWarning] = useState(false)

    

    const buttonPressed=(e)=>{

        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json"},
        
            body: JSON.stringify({
                username: username,
                email: email,
                password: password,
            })
        }
        
        if(password === confirmPassword){
            if(username.split(' ').length < 2){
                setUsernameWarning(false)
            } else{
                setUsernameWarning(true)
            }
            if(password.split('').length>=8 && (email.includes('@','`','!','#','$','%','^','&','*','(',')','-','=','+','[',']','{','}',';',':','\'','"','<','>',',','.','?','/','|') && email.includes('1','2','3','4','5','6','7','8','9','0'))){
                setShowPasswordWarning(false)
                
                // if the email is not valid (doesn't contain '@example.com')
                if(email.split('@').length>1 ){
                    fetch("/api/register/", requestOptions)
                    // .then((response) => props.history.push('/'));
                }else{
                    setShowEmailWarning(true)
                }

            }else{
                if(email.split('@').length===1){
                    setShowEmailWarning(true)
                } else{
                    setShowEmailWarning(false)
                }
                setShowPasswordWarning(true)
                }
            } else{
                if(email.split('@').length===1){
                    setShowEmailWarning(true)
                }else{
                    setShowEmailWarning(false)
                }
                alert('Your password and confirmation do not match')
            }
    }

    const renderEmailWarning=()=>{
        if(showEmailWarning){
            return(
                <Typography variant='body2'>Please enter a valid email address</Typography>
            )
        }
    }

    const renderPasswordWarning=()=>{
        if(showPasswordWarning){
            return(
                <Typography variant='body2'>Please enter a password longer than 8 characters and include numbers and symbols</Typography>
            )
        }
    }

    const renderUsernameWarning=()=>{
        if(showUsernameWarning){
            return(
                <Typography variant='body2'>Your username cannot include spaces in beetween</Typography>
            )
        }
    }

    
    return(
        <>
        <center>
        <div  style={{display:'flex', flexDirection:'row', paddingBottom:'9%'}}>
            <form className={classes.root} style={{margin:'4%'}} method="post" autoComplete="off">
                <Typography variant="h2" component="h2">
                    Register
                </Typography><br/>
                <div className="Login">
                    <div>
                        <TextField
                            className={classes.input}
                            onChange={(e)=>setUsername(e.target.value)}
                            label="Username"
                            variant="outlined"
                            placeholder="e.g. JohnDoe" />
                            {renderUsernameWarning()}
                    </div>
                    <div>            
                        <TextField
                            className={classes.input}
                            onChange={(e)=>setEmail(e.target.value)}
                            label="Email"
                            variant="outlined"
                            placeholder="e.g. name@company.com" />
                            {renderEmailWarning()}
                    </div>
                    <div>
                        <TextField
                            className={classes.input}
                            onChange={(e)=>setPassword(e.target.value)}
                            label="Password"
                            type="password"
                            variant="outlined" />
                    </div>
                    <div>
                        <TextField
                            className={classes.input}
                            onChange={(e)=>setConfirmPassword(e.target.value)}
                            label="Confirm password"
                            type="password"
                            variant="outlined" />
                    </div>
                    {renderPasswordWarning()}
                    <div>
                        <Button
                            style={{margin:'1%', width: '60%'}}
                            variant="contained"
                            onClick={buttonPressed}>Register</Button>
                    </div>
                </div>
            </form>
        </div>
        </center>
        
        </>
        );

  }

export default Register