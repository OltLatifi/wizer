import React from 'react'
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';

import RemoveRoundedIcon from '@material-ui/icons/RemoveRounded';
import AddRoundedIcon from '@material-ui/icons/AddRounded';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    text: {
        color: '#000',
    },
    round: {
        margin: '1%',
        borderRadius:'25px'
    },
  });


function Filters(props) {
    const classes = useStyles();

    return (
        <Card style={{padding: '2%', width:'100%', height:'auto'}}>
        <Typography variant="h6" component="h6" className={classes.text}>Filter by categories</Typography>

        <ButtonGroup variant="outlined" aria-label="small outlined primary button group">
            <Button onClick={props.toFinish}>To finish</Button>
            <Button onClick={props.all}>All</Button>
            <Button onClick={props.finished}>Finished</Button>
        </ButtonGroup><br/><br/>


        {/* generating subject buttons so we can filter by subjects */}
        <Typography variant="h6" component="h6" className={classes.text}>Subjects:</Typography>
            {props.subjects.map((b, key) => {
                return(
                    <Button
                        variant="outlined"
                        onClick={props.showSubjectDelete? ()=> props.deleteSubject_(b.id):()=>props.filter(b.name)}
                        // onClick={props.showSubjectDelete? ()=>console.log('delete'):()=>console.log('filter')}
                        // if delete button is pressed delete...
                        key={key}
                        className={classes.round}>
                            {b.name}
                    </Button>
                )
            })}

        {/* the button that opens the subject form */}
        <Button
            onClick={()=>props.setShowSubjectForm(true)}
            variant="outlined"
            className={classes.round}>
                    <AddRoundedIcon/>
            </Button>
            
        <Button
            onClick={()=>props.setShowSubjectDelete(true)}
            variant="outlined"
            className={classes.round}>
                    <RemoveRoundedIcon/>
            </Button>


    {/* subject form */}
    {props.showSubjectF()}
    {props.deleteSubjects()}

    </Card>
    )
}

export default Filters
