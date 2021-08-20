import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles({
    input: {
        minWidth: 100,
        width: '80%',
    },
    form:{
        width:'50%',
        backgroundColor:'gray',
    },
    checkbox: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height:50,
        minWidth: 100,
        width: '80%',
        backgroundColor:'gray',

    },
  });

function HomeworkForm({title, date, description, finished, subjects, buttonPressed, subjectArray}) {
    const classes = useStyles()

    return (
        <div className={classes.form}>
            <form autoComplete="off" style={{marginTop: '4%',}}>
            <TextField
                id="outlined-basic"
                label="Title"
                variant="outlined"
                className={classes.input}
                onChange={e => title(e.target.value)}
                // ref={textInput}
                />
                <br/><br/>
            <TextField
                variant="outlined"
                type="datetime-local"
                rows={12}
                className={classes.input}
                onChange={e => date(e.target.value)}
                // ref={textInput}
                />
                <br/><br/>
            <TextField
                id="outlined-multiline-flexible"
                variant="outlined"
                label="Description"
                multiline
                rows={12}
                className={classes.input}
                onChange={e =>description(e.target.value)}
                // ref={textInput}
                />
                <br/><br/>
            <center>
            <Card variant="outlined" className={classes.checkbox}>
                <label htmlFor="finished" style={{marginLeft:'-4%'}}><Typography variant="body1" color="textSecondary">Finished </Typography></label>
                <input
                    id="finished"
                    name="finished"
                    type="checkbox"
                    className={classes.input}
                    onChange={e => finished(e.target.checked)}
                    // ref={textInput}
                    />
            </Card>
            </center>
            <br/>
            {/* the select input */}
            <TextField
                select defaultValue=""
                label="Subject"
                variant="outlined"
                className={classes.input}
                onChange={e =>subjects(e.target.value)}
                // ref={textInput}
                >
                {subjectArray.map((option, key) => (
                    <MenuItem key={key} value={option.id} >
                    {option.name}
                    </MenuItem>
                ))}
            </TextField>
            <br/><br/>
            <Button variant="outlined" className={classes.input} onClick={buttonPressed}>Submit</Button>
            
            
        </form>
        </div>
    )
}

export default HomeworkForm
