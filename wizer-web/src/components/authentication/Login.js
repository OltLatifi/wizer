import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import axiosInstance from '../../axios';



const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
          }},
  }));

function Login(props) {



    const[username, setUsername] = useState('');
    const[password, setPassword] = useState('');
    

    const buttonPressed=(e)=>{

        axiosInstance.post('http://localhost:8000/api/token/', {
            username:username,
            password:password
        })
        .then((response)=>{
            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);
            axiosInstance.defaults.headers['Authorization'] = 
            `JWT ${localStorage.getItem('access_token')}`
            window.location.reload(false)
        })


        
    }

    const classes = useStyles();


    

    
    return (
        <>
        <center>
        <div style={{display:'flex', flexDirection:'row', paddingBottom:'14%'}}>
            <form className={classes.root} style={{margin:'4%'}} method="post" autoComplete="off">
                <Typography variant="h2" component="h2">
                    Log In
                </Typography>
                <Typography variant="body2" component="h6" style={{margin:'2% 0'}}>
                    Don't have an account?
                </Typography>
                <div className="Login">
                    <div>
                        <TextField style={{width: '60%'}} id="outlined-basic" onChange={(e)=>{setUsername(e.target.value)}} label="Name" variant="outlined" />
                    </div>
                    <div>
                        <TextField style={{width: '60%'}} id="outlined-basic" onChange={(e)=>{setPassword(e.target.value)}} label="Password" type="password" variant="outlined" />
                    </div>
                    <div>
                        <Button style={{margin:'1%', width: '60%'}} variant="contained" color="primary" onClick={buttonPressed}>Log in</Button>
                    </div>
                </div>
                <br/>
            </form>
        </div>
        </center>

        
        </>
        )
    }

export default Login