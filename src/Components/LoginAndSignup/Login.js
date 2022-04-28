import React, { useState } from "react";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link, Box,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ContextProvide from "../ContextAPI/ContextProvider";

const Login = () => {
  let navigate = useNavigate();
  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: 500,
    margin: "20px auto",
  };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const btnstyle = { margin: "8px 0" , marginLeft: "12.5rem"};

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [access, setSpecialAccess] = useState([]);

  const [error, setError] = useState(false);

  const accessMethod = (arr) => {
    arr.map((val) => (
        access.push(val.method)
    ))
  }

  const [userDetails, setUserDetails] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8090/api/auth/signin", {
        email,
        password,
      })
      .then((response) => {
        setUserDetails(response.data)
        sessionStorage.setItem("token", response.data.accessToken);
        sessionStorage.setItem("userid", response.data.id);
        sessionStorage.setItem("agent", response.data.agent.id)
        sessionStorage.setItem("username", response.data.username)
        sessionStorage.setItem("email", response.data.email)
        sessionStorage.setItem("refreshtoken", response.data.refreshToken)
        accessMethod(response.data.specialAccess)
        sessionStorage.setItem("specialaccess", JSON.stringify(access))
        sessionStorage.setItem("condition", "true")
        navigate('/logindetails')
      })
      .catch((err) => {
        console.log(err.message);
        setError(true);
      });
  };

  return (
    <div>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <LockOutlinedIcon />
          </Avatar>
          <h2>Sign In</h2>
          <br/>
        </Grid>
        <form onSubmit={handleSubmit} autoComplete="off">
          <Box sx={{flexGrow: 1}}>
          <Grid container spacing={2}>
            <TextField
                className="formtext"
                label="E-Mail"
                value={email}
                placeholder="Enter E-Mail"
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                required
            />
            <br />
            <TextField
                className="formtext"
                label="Password"
                value={password}
                placeholder="Enter password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                required
            />




            <Button
                type="submit"
                color="primary"
                variant="contained"
                style={btnstyle}
            >
              Sign in
            </Button>
          </Grid>

            <br/>

            <br/>
            <Grid container spacing={2}>

              <Link href="/signup">
                <Button style={{color:"white", backgroundColor:"green", marginLeft:160}}> Create An Account </Button>
              </Link>

            {error ? (
                <Typography style={{ color: "red" }}>
                  Bad Credentials , Username or Password is wrong
                </Typography>
            ) : null}
            </Grid>

          </Box>
        </form>
      </Paper>

    </div>
  );
};

export default Login;
