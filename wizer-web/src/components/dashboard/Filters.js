import React from "react";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";

import RemoveRoundedIcon from "@material-ui/icons/RemoveRounded";
import AddRoundedIcon from "@material-ui/icons/AddRounded";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  text: {
    color: "aqua",
  },
  round: {
    margin: "1%",
    borderRadius: "25px",
  },
});

function Filters(props) {
  const classes = useStyles();

  return (
    <Card
      style={{
        padding: "2%",
        width: "100%",
        height: "auto",
        backgroundColor: "#2d2d2d",
      }}
    >
      <Typography variant="h6" component="h6" className={classes.text}>
        Filter by categories
      </Typography>

      <ButtonGroup
        variant="outlined"
        aria-label="small outlined primary button group"
      >
        <Button onClick={props.toFinish} style={{ color: "white", backgroundColor:'#1a1a1aff' }}>
          To finish
        </Button>
        <Button onClick={props.all} style={{ color: "white", backgroundColor:'#1a1a1aff' }}>
          All
        </Button>
        <Button onClick={props.finished} style={{ color: "white", backgroundColor:'#1a1a1aff' }}>
          Finished
        </Button>
      </ButtonGroup>
      <br />
      <br />

      {/* generating subject buttons so we can filter by subjects */}
      <Typography variant="h6" component="h6" className={classes.text}>
        Subjects:
      </Typography>
      {props.subjects.map((b, key) => {
        return (
          <Button
            style={{ color: "white", backgroundColor:'#1a1a1aff' }}
            variant="outlined"
            // if delete button is pressed delete...
            onClick={
              props.showSubjectDelete
                ? () => props.deleteSubject_(b.id)
                : () => props.filter(b.name)
            }
            key={key}
            className={classes.round}
          >
            {b.name}
          </Button>
        );
      })}

      {/* the button that opens the subject form */}
      <Button
        style={{ color: "white", backgroundColor:'#1a1a1aff'}}
        onClick={() => props.setShowSubjectForm(true)}
        variant="outlined"
        className={classes.round}
      >
        <AddRoundedIcon />
      </Button>

      <Button
        style={{ color: "white",  backgroundColor:'#1a1a1aff' }}
        onClick={() => props.setShowSubjectDelete(true)}
        variant="outlined"
        className={classes.round}
      >
        <RemoveRoundedIcon />
      </Button>

      {/* subject form */}
      {props.showSubjectF()}
      {props.deleteSubjects()}
    </Card>
  );
}

export default Filters;
