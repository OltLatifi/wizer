import {useEffect, useState} from 'react'
import Homework from './Homework'
import axios from 'axios'
import Button from '@material-ui/core/Button';


function YourHomework(props) {
    // the state that handles the homework
    const[homework, setHomework] = useState([]);
    // menu items are what is actually going to be displayed, when we filter we change this hook,
    // not the data that we get from the api
    const[menuItems, setMenuItems] = useState([]);

    // get the homework from the api
    const getHomework=()=>{
        axios.get('http://localhost:8000/api/see-homework/')
        .then(response => {
            setHomework(response.data)
            setMenuItems(response.data)
        })
    }

    // on render call the function that gets the homework data
    useEffect(()=> {getHomework()}, [])

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

    return (
    <>
        <Button onClick={toFinish} variant="outlined">To finish</Button>
        <Button onClick={all}>All</Button>
        <Button onClick={finished}>Finished</Button>
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
