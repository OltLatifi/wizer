import { useState } from "react";

import SubjectForm from "./SubjectForm";
import HomeworkForm from "./HomeworkForm";
import Filters from "./Filters";
import ListOfHomework from "./ListOfHomework";

import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import { makeStyles } from "@material-ui/core/styles";

// the 'css'
const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
  },
  homework: {
    width: "50%",
    backgroundColor: "#1a1a1aff",
    display: "flex",
    flexDirection: "row",
    minHeight: "100vh",
  },
  ribbon: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "lightgray",
    color: "black",
  },
});

function YourHomework({
  homework,
  setMenuItems,
  setSubjectText,
  createSubject,
  setTitle,
  setDate,
  setDescription,
  setFinished_,
  setSubjects_,
  subjects,
  buttonPressed,
  menuItems,
  updateHomework,
  deleteHomework,
  deleteSubject_,
  showSubjectDelete,
  setShowSubjectDelete,
  showSubjectForm,
  setShowSubjectForm,
}) {
  const classes = useStyles();

  // if all homework is finished and homework exists
  const [everythingFinished, setEverythingFinished] = useState(false);
  const finishedEverything = () => {
    if (
      homework.filter((hw) => !hw.finished).length === 0 &&
      homework.length !== 0
    ) {
      setEverythingFinished(true);
      // dont bother the user if there isn't anything to delete
    } else if (homework.length === 0) {
      setEverythingFinished(false);
    }
  };

  // these functions filter the homework, just changes the menuitems, the useState makes
  // the page re-render
  const finished = () => {
    const filteredData = homework.filter(
      (homework_) => homework_.finished === true
    );
    setMenuItems(filteredData);
    finishedEverything();
  };
  const toFinish = () => {
    const filteredData = homework.filter(
      (homework_) => homework_.finished === false
    );
    setMenuItems(filteredData);
    finishedEverything();
  };
  // turns things back to normal by reusing the data we got from the api
  const all = () => {
    setMenuItems(homework);
    finishedEverything();
  };
  // filter by subjects
  const filter = (subject) => {
    const filteredData = homework.filter(
      (homework_) => homework_.subject.name === subject
    );
    setMenuItems(filteredData);
    finishedEverything();
  };

  // ========================== THINGS THAT SHOW AFTER A CLICK OF A BUTTON =================

  const showThatItsFinished = () => {
    if (everythingFinished) {
      return (
        <div className={classes.ribbon}>
          <Typography style={{ width: "90%", marginLeft: "5%" }}>
            🎉You finished all your homework! Feel free to delete them🎉
            <Button
              onClick={() => {
                setEverythingFinished(false);
              }}
            >
              Ok
            </Button>
          </Typography>
        </div>
      );
    }
  };

  const showSubjectF = () => {
    if (showSubjectForm) {
      return (
        <SubjectForm
          setSubject={setSubjectText}
          setShowSubjectForm={setShowSubjectForm}
          submitButton={
            <Button
              variant="outlined"
              style={{ height: 40, marginTop: "20px", color: "white" }}
              onClick={createSubject}
            >
              Submit
            </Button>
          }
        />
      );
    }
  };

  const deleteSubjects = () => {
    if (showSubjectDelete) {
      return (
        <Typography variant="body2" style={{ color: "white" }}>
          Click the subject you want to delete.
          <Button
            onClick={() => setShowSubjectDelete(false)}
            style={{ color: "white" }}
          >
            Cancel
          </Button>
        </Typography>
      );
    }
  };

  return (
    <>
      {showThatItsFinished()}
      <div className={classes.root}>
        {/* the homework form */}
        <HomeworkForm
          title={setTitle}
          date={setDate}
          description={setDescription}
          finished={setFinished_}
          subjects={setSubjects_} // this gets the text from the field
          subjectArray={subjects} // this gets the array of the subjects
          buttonPressed={buttonPressed}
        />

        {/* the homework */}

        <div className={classes.homework}>
          <div style={{ margin: "4% 25%" }}>
            {/* the filters go here */}
            <Filters
              toFinish={toFinish}
              all={all}
              finished={finished}
              subjects={subjects}
              filter={filter}
              setShowSubjectForm={setShowSubjectForm}
              showSubjectF={showSubjectF}
              setShowSubjectDelete={setShowSubjectDelete}
              showSubjectDelete={showSubjectDelete}
              deleteSubjects={deleteSubjects}
              deleteSubject_={deleteSubject_}
            />
            {/* ^^^^ the one that actually deletes, the one on top sets the hook to true */}

            <br />
            <br />
            {/* homework 'posts' */}
            <ListOfHomework
              menuItems={menuItems}
              updateHomework={updateHomework}
              deleteHomework={deleteHomework}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default YourHomework;
