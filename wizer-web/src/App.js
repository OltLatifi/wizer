import './css/App.css'
import axiosInstance from './axios'
import {useEffect, useState} from 'react'
import YourHomework from './components/dashboard/YourHomework'
import Pomodoro from './components/pomodoro/Pomodoro'
import Login from './components/authentication/Login'
import Register from './components/authentication/Register'
import Navbar from './components/Navbar'
import Frontpage from './components/frontpage/Frontpage'
import Kanban from './components/kanban/Kanban'

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {

    // the state that handles the homework
    const[homework, setHomework] = useState([]);
    // menu items are what is actually going to be displayed, when we filter we change this hook,
    // not the data that we get from the api
    const[menuItems, setMenuItems] = useState([]);

    // buttons for filtering by subjects
    const[subjects, setSubjects] = useState([]);

    // data for the homework form
    const[title, setTitle] = useState('')
    const[date, setDate] = useState('')
    const[description, setDescription] = useState('')
    const[finished_, setFinished_] = useState('')
    const[subjects_, setSubjects_] = useState('')
    // data for the subject form
    const[subjectText, setSubjectText] = useState('')

    // the one used to delete the subjects
    const[showSubjectDelete, setShowSubjectDelete] = useState(false)    
    // data for the subject form
    const[showSubjectForm, setShowSubjectForm] = useState(false)
    

    // get the homework from the api
    const getHomework=()=>{
      axiosInstance.get('http://localhost:8000/api/see-homework/')
      .then(response => {
          setHomework(response.data)
          setMenuItems(response.data)
      })
  
      }
    // get the subjects from the api
    const getSubjects=()=>{
        axiosInstance.get('http://localhost:8000/api/see-subject/')
        .then(response => {
            setSubjects(response.data)
        })
    }

    // on render call the function that gets the homework data
    useEffect(()=> {
      if(localStorage.getItem('access_token')!==null){
        getHomework()
        getSubjects()
      }
    }, [])


    // submit button on the homework form
    const buttonPressed=()=>{
      // textInput.current.focus();

      let formData = new FormData()

      formData.append('title', title)
      formData.append('date', `${date.split(" ")[0]}T${date.split(" ")[1]}:00Z`) // just making it compatible 
      formData.append('description', description) //with the api
      formData.append('finished', finished_)
      formData.append('subject', subjects_)

      axiosInstance.post("http://localhost:8000/api/homework/", formData)
      .then((response) =>getHomework())
      .then(response=> alert('Homework added succesfully!'))
      .catch((error) =>{
        if(title==='' && subjects_===''){
          alert(`${error.message}\nTitle and subject are required to create homework. You also need to be logged in.`)
        } else if(title===''){
          alert(`${error.message}\nTitle is required to create homework. You also need to be logged in.`)
        } else if(subjects_===''){
          alert(`${error.message}\nSubject is required to create homework. You also need to be logged in.`)
        }
      })


  }
  // updates homework(finished or not)
  const updateHomework=(title, finished, subject, id) => {
      let formData = new FormData()
      
      formData.append('title', title)
      formData.append('finished', finished)
      formData.append('subject', subject)
      
      console.log(formData)
      axiosInstance.put(`http://localhost:8000/api/update-homework/${id}`, formData)
      .then((response) =>{
          getHomework()
          setHomework([response.data, ...homework])
      })

  }

  // deletes the homework
  const deleteHomework =(id)=>{
      axiosInstance.delete(`http://localhost:8000/api/delete-homework/${id}`, {
        data: {
          source: 'source'
        }
      }).then(response=>getHomework())
      
    }


    // post request for the subject form
    const createSubject=()=>{
      let formData = new FormData()
      formData.append('name', subjectText)
      axiosInstance.post("http://localhost:8000/api/subject/", formData)
      .then((response) =>getSubjects())
      .then((response)=> setShowSubjectForm(false))
      .catch((error) =>alert(`${error.message}\nYou need to login and provide a name for your subject`))
  }

  // deletes the subject
  const deleteSubject_ =(id)=>{
    axiosInstance.delete(`http://localhost:8000/api/delete-subject/${id}`, {
      data: {
        source: 'source'
      }
    }).then(response=>getSubjects())
    .then(response=>setShowSubjectDelete(false))
    
  }
  
  return (
    <Router>
      <div>

        <Switch>

        <Route exact path="/">
          <Frontpage/>
        </Route>

        <div className="App" style={{backgroundColor:'#1a1a1aff', minHeight:'100%'}}>
          <Navbar/>
          <Route path='/dashboard'>
          <YourHomework
            homework={homework}
            setMenuItems={setMenuItems}
            setSubjectText={setSubjectText}
            createSubject={createSubject}
            setTitle={setTitle}
            setDate={setDate}
            setDescription={setDescription}
            setFinished_={setFinished_}
            setSubjects_={setSubjects_}
            subjects={subjects}
            buttonPressed={buttonPressed}
            menuItems={menuItems}
            updateHomework={updateHomework}
            deleteHomework={deleteHomework}
            deleteSubject_={deleteSubject_}
            showSubjectDelete={showSubjectDelete}
            setShowSubjectDelete={setShowSubjectDelete}
            showSubjectForm={showSubjectForm}
            setShowSubjectForm={setShowSubjectForm}
            />
            </Route>

        <Route path="/pomodoro">
          <Pomodoro/>
        </Route>
        <Route exact path="/login">
          <Login/>
        </Route>
        <Route exact path="/register">
          <Register/>
        </Route>
        <Route exact path="/kanban">
          <Kanban homework={homework} />
        </Route>
        </div>
        
        
      </Switch>
      </div>
    </Router>
    
  );
}

export default App;
