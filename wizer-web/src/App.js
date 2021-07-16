import './css/App.css'
import axios from 'axios'
import {useEffect, useState} from 'react'
import YourHomework from './components/YourHomework'

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


    // submit button on the homework form
    const buttonPressed=()=>{
      // textInput.current.focus();

      let formData = new FormData()

      formData.append('title', title)
      formData.append('date', `${date.split(" ")[0]}T${date.split(" ")[1]}:00Z`) // just making it compatible 
      formData.append('description', description) //with the api
      formData.append('finished', finished_)
      formData.append('subject', subjects_)

      axios.post("http://localhost:8000/api/homework/", formData)
      .then((response) =>getHomework())
      .then(response=> alert('Homework added succesfully!'))
      .catch((error) =>alert(`${error.message}\nTitle and subject are required to create homework.`))


  }
  // updates homework(finished or not)
  const updateHomework=(title, finished, subject, id) => {
      let formData = new FormData()
      
      formData.append('title', title)
      formData.append('finished', finished)
      formData.append('subject', subject)
      
      console.log(formData)
      axios.put(`http://localhost:8000/api/update-homework/${id}`, formData)
      .then((response) =>{
          getHomework()
          setHomework([response.data, ...homework])
      })

  }

  // deletes the homework
  const deleteHomework =(id)=>{
      axios.delete(`http://localhost:8000/api/delete-homework/${id}`, {
        data: {
          source: 'source'
        }
      }).then(response=>getHomework())
      
    }


    // post request for the subject form
    const createSubject=()=>{
      let formData = new FormData()
      formData.append('name', subjectText)
      axios.post("http://localhost:8000/api/subject/", formData)
      .then((response) =>getSubjects())
      .catch((error) =>alert(`${error.message}\nYou need to provide a name for the subject.`))
  }
  
  return (
    <div className="App">
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
        deleteHomework={deleteHomework}/>
    </div>
  );
}

export default App;
