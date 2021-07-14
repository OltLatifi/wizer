import {useEffect, useState} from 'react'
import Homework from './Homework'
import axios from 'axios'
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';

// the 'css'
const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection:'row',
        width: '100%',
    },
    text: {
        color: '#000',
    },
    input: {
        minWidth: 100,
        width: '80%',
        // backgroundColor:'#47597E',
        // color:'white',
    },
    round: {
        margin: '1%',
        borderRadius:'25px'
    },
    form:{
        width:'50%',
        backgroundColor:'white'
    },
    homework:{
        width:'50%',
        backgroundColor:'#f0f0f0',
        display: 'flex',
        flexDirection:'row',
        minHeight: '100vh',
    },
    checkbox: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height:50,
        minWidth: 100,
        width: '80%',
    }
  });

function YourHomework(props) {
    const classes = useStyles();

    // the state that handles the homework
    const[homework, setHomework] = useState([]);
    // menu items are what is actually going to be displayed, when we filter we change this hook,
    // not the data that we get from the api
    const[menuItems, setMenuItems] = useState([]);

    // buttons for filtering by subjects
    const[subjects, setSubjects] = useState([]);

    // get the homework from the api
    const getHomework=()=>{
        axios.get('http://localhost:8000/api/see-homework/')
        .then(response => {
            setHomework(response.data)
            setMenuItems(response.data)
        })
    }
    // get the subjects from the api
    const getSubjects=()=>{
        axios.get('http://localhost:8000/api/see-subject/')
        .then(response => {
            setSubjects(response.data)
        })
    }

    // on render call the function that gets the homework data
    useEffect(()=> {
        getHomework()
        getSubjects()
    }, [])

    // these functions filter the homework, just changes the menuitems, the useState makes
    // the page re-render
    const finished =()=>{
        const filteredData = homework.filter(homework_=> homework_.finished===true)
        setMenuItems(filteredData)
    }
    const toFinish =()=>{
        const filteredData = homework.filter(homework_=> homework_.finished===false)
        setMenuItems(filteredData)
    }
    // turns things back to normal by reusing the data we got from the api
    const all =()=>{
        setMenuItems(homework)
    }
    // filter by subjects
    const filter =(subject)=>{
        const filteredData = homework.filter(homework_=> homework_.subject.name===subject)
        setMenuItems(filteredData)
    }

    return (
    <div className={classes.root}>

        {/* the form */}
        <div className={classes.form}>
            <form autoComplete="off" style={{marginTop: '4%',}}>
                <TextField
                    id="outlined-basic"
                    label="Title"
                    variant="outlined"
                    className={classes.input}
                    />
                    <br/><br/>
                <TextField
                    variant="outlined"
                    type="datetime-local"
                    rows={12}
                    className={classes.input}
                    // value={value}
                    // onChange={handleChange}
                    />
                    <br/><br/>
                <TextField
                    id="outlined-multiline-flexible"
                    variant="outlined"
                    label="Description"
                    multiline
                    rows={12}
                    className={classes.input}
                    // value={value}
                    // onChange={handleChange}
                    />
                    <br/><br/>
                <center>
                <Card variant="outlined" className={classes.checkbox}>
                    <label htmlFor="finished">Finished: </label>
                    <input
                        id="finished"
                        name="finished"
                        type="checkbox"
                        className={classes.input}
                        // value={value}
                        // onChange={handleChange}
                        />
                </Card>
                </center>
                <br/>
                {/* the select input */}
                <TextField
                    select
                    label="Subject"
                    variant="outlined"
                    className={classes.input}
                    // value={currency}
                    // onChange={handleChange}
                    >
                    {subjects.map((option) => (
                        <MenuItem key={option.name} value={option.name}>
                        {option.name}
                        </MenuItem>
                    ))}
                </TextField>
                <br/><br/>
                <Button variant="outlined" className={classes.input}>To finish</Button>
                
                
            </form>
        </div>
        
        
        {/* the homework */}
        
        
            <div className={classes.homework}>
            <div style={{margin: '4% 25%',}}>
            <Card style={{padding: '2%', width:'100%', height:'auto',}}>
                <Typography variant="h6" component="h6" className={classes.text}>Filter by categories</Typography>

                <ButtonGroup variant="outlined" aria-label="small outlined primary button group">
                    <Button onClick={toFinish}>To finish</Button>
                    <Button onClick={all}>All</Button>
                    <Button onClick={finished}>Finished</Button>
                </ButtonGroup><br/><br/>

                {/* generating subject buttons so we can filter by subjects */}
                <Typography variant="h6" component="h6" className={classes.text}>Filter by subjects</Typography>
                    {subjects.map((b, key) => {
                        return(
                            <Button
                                variant="outlined"
                                onClick={()=> filter(b.name)}
                                key={key}
                                className={classes.round}>
                                    {b.name}
                            </Button>
                        )
                    })}
            </Card>
            <br/><br/>
            {menuItems.map((h, key)=>{
                return(
                    <Homework
                    title={h.title}
                    due_date={h.due_date.split("T")[0]} // cuts off the hour and timezone rubbish
                    finished={h.finished? '✅': 'False'}
                    description={h.description}
                    subject={h.subject.name}
                    key={h.id}
                    />
                    )
                })}
            </div>
            
        
        </div>
    </div>
    );
}

export default YourHomework;
