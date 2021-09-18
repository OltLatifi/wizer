import { makeStyles } from "@material-ui/core/styles";
import Draggable from 'react-draggable';
import React from 'react'


const useStyles = makeStyles({
    box: {
      position: "absolute",
      cursor: "move",
      color: "black",
      maxWidth: "215px",
      marginTop: "10%",
      border: "1px solid black",
    },
  });


function Kanban({homework}) {
    const classes = useStyles();
    return (
        <div>
            {homework.map((homework) => {
                return(
                    <Draggable>
                        <div className={classes.box}>
                            <div>{homework.title}</div>
                        </div>
                    </Draggable>
                )
            })}
        </div>
    )
}

export default Kanban
