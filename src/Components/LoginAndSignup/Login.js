import React, { useState } from "react";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link,
  Box,
  IconButton,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import axios from "axios";
import { InputAdornment } from "@material-ui/core";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Login = () => {
  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: 500,
    margin: "20px auto",
  };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const btnstyle = { margin: "8px 0", marginLeft: "12.5rem" };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [access, setSpecialAccess] = useState([]);

  const [error, setError] = useState(false);

  const accessMethod = (arr) => {
    arr.map((val) => access.push(val.method));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8090/api/auth/signin", {
        email,
        password,
      })
      .then((response) => {
        sessionStorage.setItem("token", response.data.accessToken);
        sessionStorage.setItem("userid", response.data.id);
        response.data.agent !== null
          ? sessionStorage.setItem("agent", response.data.agent?.id)
          : sessionStorage.setItem("agent", null);
        sessionStorage.setItem("username", response.data.username);
        localStorage.setItem("username", response.data.username);
        sessionStorage.setItem("email", response.data.email);
        sessionStorage.setItem("refreshtoken", response.data.refreshToken);
        accessMethod(response.data.specialAccess);
        sessionStorage.setItem("specialaccess", JSON.stringify(access));
        sessionStorage.setItem("condition", "true");
        window.location = "logindetails";
      })
      .catch((err) => {
        console.log(err.message);
        setError(true);
      });
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <LockOutlinedIcon />
          </Avatar>
          <h2>Sign In</h2>
          <br />
        </Grid>
        <form onSubmit={handleSubmit} autoComplete="off">
          <Box sx={{ flexGrow: 1 }}>
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
                type={showPassword ? "text" : "password"}
                className="formtext"
                label="Password"
                value={password}
                placeholder="Enter Password"
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                variant="outlined"
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <div className="row">
                <div className="col">
                  <Button
                    type="submit"
                    color="primary"
                    variant="contained"
                    style={btnstyle}
                  >
                    Sign in
                  </Button>
                </div>

                <div className="col">
                  <Button
                    style={{
                      color: "white",
                      backgroundColor: "red",
                      marginLeft: 160,
                    }}
                  >
                    <Link
                      href="changePass"
                      style={{ color: "white", textDecoration: "none" }}
                    >
                      Forgot Password ?
                    </Link>
                  </Button>
                </div>
              </div>
            </Grid>

            <Grid container spacing={2}>
              <Button
                style={{
                  color: "white",
                  backgroundColor: "green",
                  marginLeft: 160,
                  marginTop: 75,
                }}
              >
                <Link
                  href="signup"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  Create An Account{" "}
                </Link>
              </Button>

              {error ? (
                <Typography style={{ color: "red", margin: 50 }}>
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
