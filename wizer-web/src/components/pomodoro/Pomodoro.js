import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import SettingsIcon from "@material-ui/icons/Settings";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "10%",
  },
  circle: {
    width: "400px",
    height: "400px",
    border: "2px dashed aqua",
    borderRadius: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: "#2d2d2d",
    color: "aqua",
  },
});

function Pomodoro() {
  const classes = useStyles();

  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);

  const [rest, setRest] = useState(5);
  const [displayMessage, setDisplayMessage] = useState(false);
  const [start, setStart] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const timer = () => {
    let interval = setInterval(() => {
      clearInterval(interval);

      if (seconds === 0) {
        if (minutes !== 0) {
          setSeconds(59);
          setMinutes(minutes - 1);
        } else {
          let minutes_ = displayMessage ? minutes - 1 : rest - 1;
          let seconds = 59;

          setSeconds(seconds);
          setMinutes(minutes_);
          setDisplayMessage(!displayMessage);
        }
      } else {
        setSeconds(seconds - 1);
      }
    }, 1000);
  };

  const initiateTimer = () => {
    if (start) {
      timer();
    }
  };

  const renderSettingsButtons = () => {
    if (showSettings) {
      const workButtons = [15, 25, 35];
      const restButtons = [5, 10, 15];
      return (
        <>
          <Typography variant="body">Set the work duration: </Typography>
          {workButtons.map((button) => {
            return (
              <Button
                onClick={() => {
                  if (!displayMessage) {
                    setMinutes(button - 1);
                  }
                }}
              >
                {button} minutes
              </Button>
            );
          })}
          <br />
          <Typography variant="body">Set the rest duration: </Typography>
          {restButtons.map((button) => {
            return (
              <Button
                onClick={() => {
                  setRest(button);
                }}
              >
                {button} minutes
              </Button>
            );
          })}
        </>
      );
    }
  };

  const timerMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const timerSeconds = seconds < 10 ? `0${seconds}` : seconds;

  return (
    <>
      <div className={classes.root}>
        <div className="message">
          {displayMessage && (
            <Typography variant="h5" style={{ color: "#fff" }}>
              Break time!🎉 New session starts in:
            </Typography>
          )}
        </div>
        <br />
        <div className={classes.circle}>
          <Typography variant="h1">
            {timerMinutes}:{timerSeconds}
          </Typography>
          <Button onClick={() => setStart(!start)} style={{ color: "aqua" }}>
            {start ? "Stop" : "Start"}
          </Button>
        </div>
        {initiateTimer()}
      </div>
      <div style={{ display: "flex", flexDirection: "row", marginTop: "8%" }}>
        <Button
          onClick={() => setShowSettings(!showSettings)}
          style={{ height: 40 }}
        >
          <SettingsIcon />
        </Button>
        <div style={{ marginLeft: "1%", marginTop: "-2%" }}>
          {renderSettingsButtons()}
        </div>
      </div>
    </>
  );
}

export default Pomodoro;
