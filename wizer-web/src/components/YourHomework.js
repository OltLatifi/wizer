import {useEffect, useState} from 'react'
import Homework from './Homework'
import axios from 'axios'
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { createTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';


//  create a theme so we can change the primary color on the buttons
const Theme = createTheme({ palette: { primary:{main:'#47597E'}}})

// the 'css'
const useStyles = makeStyles({
    text: {
        color: '#fff',
    },
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
    const[btnSubjects, setBtnSubjects] = useState([]);

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
            setBtnSubjects(response.data)
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
        const filteredData = homework.filter(homework_=> homework_.finished==true)
        setMenuItems(filteredData)
    }
    const toFinish =()=>{
        const filteredData = homework.filter(homework_=> homework_.finished==false)
        setMenuItems(filteredData)
    }
    // turns things back to normal by reusing the data we got from the api
    const all =()=>{
        setMenuItems(homework)
    }
    // filter by subjects
    const filter =(subject)=>{
        const filteredData = homework.filter(homework_=> homework_.subject.name==subject)
        setMenuItems(filteredData)
    }

    return (
    <>
        <ThemeProvider theme={Theme}>
            <Typography variant="h6" component="h6" className={classes.text}>Filter by categories</Typography>
            <ButtonGroup color="primary" variant="contained" aria-label="small contained primary button group">
                <Button onClick={toFinish}>To finish</Button>
                <Button onClick={all}>All</Button>
                <Button onClick={finished}>Finished</Button>
            </ButtonGroup><br/><br/>

            {/* generating subject buttons so we can filter by subjects */}
            <Typography variant="h6" component="h6" className={classes.text}>Filter by subjects</Typography>
            <ButtonGroup color="primary" variant="contained" aria-label="small contained primary button group">
                {subjects.map((b, key) => {
                    return(
                        <Button onClick={()=> filter(b.name)}>{b.name}</Button>
                    )
                })}
            </ButtonGroup>
            
        </ThemeProvider>
        
        
        
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
        
    </>
    );
}

export default YourHomework;
