import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';


import axiosInstance from '../../axios';
// import { withRouter } from 'react-router';




const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
          }},
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

        
        if(password === confirmPassword){
            if(username.split(' ').length < 2){
                setUsernameWarning(false)
            } else{
                setUsernameWarning(true)
            }
            if(password.split('').length>=8 && (email.includes('@','`','!','#','$','%','^','&','*','(',')','-','=','+','[',']','{','}',';',':','\'','"','<','>',',','.','?','/','|') || email.includes('1','2','3','4','5','6','7','8','9','0'))){
                setShowPasswordWarning(false)
                
                // if the email is not valid (doesn't contain '@example.com')
                if(email.split('@').length>1 ){
                    setShowEmailWarning(false)

                    const registerFormData = new FormData()
                    registerFormData.append('username', username)
                    registerFormData.append('email', email)
                    registerFormData.append('password', password)

                    const loginFormData = new FormData()
                    loginFormData.append('username', username)
                    loginFormData.append('password', password)

                    axiosInstance.post("http://localhost:8000/api/register/", registerFormData)
                    .catch(error=> alert(`Your username is already taken or contains a space.\n${error.message}`))
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
                <div style={{
                    width: '70%',
                    backgroundColor:'#ffd1d6',
                    color:'black',
                    border:'2px solid #fca4ad',
                    borderRadius:4}}>
                    <Typography variant='body2'>Please enter a valid email address</Typography>
                </div>
                
            )
        }
    }

    const renderPasswordWarning=()=>{
        if(showPasswordWarning){
            return(
                <div style={{
                    width: '70%',
                    backgroundColor:'#ffd1d6',
                    color:'black',
                    border:'2px solid #fca4ad',
                    borderRadius:4}}>
                    <Typography variant='body2'>
                        Please enter a password that contains 8 or more characters and includes at least a number or a symbol
                    </Typography>
                    </div>
                
            )
        }
    }

    const renderUsernameWarning=()=>{
        if(showUsernameWarning){
            return(
                <div style={{
                    width: '70%',
                    backgroundColor:'#ffd1d6',
                    color:'black',
                    border:'2px solid #fca4ad',
                    borderRadius:4}}>
                    <Typography variant='body2'>Your username cannot include spaces in beetween</Typography>
                    </div>
            )
        }
    }

    
    return(
        <>
        <center>
        <div  style={{display:'flex', flexDirection:'row', paddingBottom:'9%'}}>
            <form className={classes.root} style={{margin:'4%'}} method="post" autoComplete="off">
                <Card style={{padding:'2%', width:'80%'}}>
                <Typography variant="h2" component="h2">
                    Register
                </Typography><br/>
                <div className="form_">
                    <div>
                        <TextField
                            style={{width:'70%'}}
                            onChange={(e)=>setUsername(e.target.value)}
                            label="Username"
                            variant="outlined"
                            placeholder="e.g. JohnDoe" />
                            {renderUsernameWarning()}
                    </div>
                            
                    <div>            
                        <TextField
                            style={{width:'70%'}}
                            onChange={(e)=>setEmail(e.target.value)}
                            label="Email"
                            variant="outlined"
                            placeholder="e.g. name@company.com" />
                            {renderEmailWarning()}
                    </div>
                    <div>
                        <TextField
                            style={{width:'70%'}}
                            onChange={(e)=>setPassword(e.target.value)}
                            label="Password"
                            type="password"
                            variant="outlined" />
                    </div>
                    <div>
                        <TextField
                            style={{width:'70%'}}
                            onChange={(e)=>setConfirmPassword(e.target.value)}
                            label="Confirm password"
                            type="password"
                            variant="outlined" />
                    </div>
                    {renderPasswordWarning()}
                    <div>
                        <Button
                            style={{margin:'1%', width: '70%'}}
                            variant="contained"
                            onClick={buttonPressed}>Register</Button>
                    </div>
                </div>
            </Card>
            </form>
        </div>
        </center>
        
        </>
        );

  }

export default Register