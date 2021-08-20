import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";

import axios from "axios";

const loginInstance = axios.create({
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const buttonPressed = (e) => {
    loginInstance
      .post("http://localhost:8000/auth/token/", {
        grant_type: "password",
        username: username,
        password: password,
        client_id: "v64mPi1R9ofTJqsuzyjOtZJe6O0zTM6VmGDVgYOG",
        client_secret:
          "Ylf6nay64p5GCYrenSLpsJofAj8F2QC0sfbykc58ocYctkyQ51bheTAwzY7JBqMQqDreqwm4UNccTK1utfhhElTTuwSd9mDZ9UXLUPIFzpGWrcWMT4j1gz5R7WznO5II",
      })
      .then((response) => {
        localStorage.setItem("access_token", response.data.access_token);
        localStorage.setItem("refresh_token", response.data.refresh_token);
        loginInstance.defaults.headers[
          "Authorization"
        ] = `Bearer ${localStorage.getItem("access_token")}`;
        window.location.reload(false);
        // console.log(response)
      });
  };

  const classes = useStyles();

  return (
    <>
      <center>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            paddingBottom: "14%",
          }}
        >
          <form
            className={classes.root}
            style={{ margin: "4%" }}
            method="post"
            autoComplete="off"
          >
            <Card
              style={{
                padding: "2%",
                width: "80%",
                backgroundColor: "#2d2d2d",
              }}
            >
              <Typography variant="h2" component="h2" style={{ color: "#fff" }}>
                Log In
              </Typography>
              <Typography
                variant="body2"
                component="h6"
                style={{ margin: "2% 0", color: "#fff" }}
              >
                Don't have an account?{" "}
                <a
                  href={"/register"}
                  style={{ color: "aqua", textDecoration: "none" }}
                >
                  Register
                </a>
              </Typography>
              <div className="form_">
                <div>
                  <TextField
                    style={{ width: "70%" }}
                    InputLabelProps={{ style: { color: "white" } }}
                    InputProps={{ style: { color: "white" } }}
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                    label="Username"
                    variant="outlined"
                  />
                </div>
                <div>
                  <TextField
                    style={{ width: "70%" }}
                    InputLabelProps={{ style: { color: "white" } }}
                    InputProps={{ style: { color: "white" } }}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    label="Password"
                    type="password"
                    variant="outlined"
                  />
                </div>
                <div>
                  <Button
                    style={{
                      margin: "1%",
                      width: "70%",
                      backgroundColor: "#1a1a1aff",
                      color: "white",
                    }}
                    variant="contained"
                    onClick={buttonPressed}
                  >
                    Log in
                  </Button>
                  <br />
                </div>
              </div>
              <br />
            </Card>
          </form>
        </div>
      </center>
    </>
  );
}

export default Login;
