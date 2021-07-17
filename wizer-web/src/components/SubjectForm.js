import React from 'react'
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';



const useStyles = makeStyles({
    root:{
        padding:'4%',
    },
    input: {
        width: '60%',
        marginRight:'1%',
    },
  });

function SubjectForm({setSubject, submitButton, setShowSubjectForm}) {
    const classes = useStyles();

    return(
        <div className={classes.root}>
            <Typography variant="h6">Add a new subject</Typography>
            <TextField
                size='small'
                className={classes.input}
                placeholder="e.g. Math"
                label="Subject"
                variant="outlined"
                onChange={(e)=>{setSubject(e.target.value)}}
                />
            {submitButton}  {/* button from parent*/}
            <Typography variant="body2">Fill in the form to create a new subject.
                <Button onClick={()=>setShowSubjectForm(false)}>Cancel</Button>
            </Typography>
        </div>
    )
}

export default SubjectForm
