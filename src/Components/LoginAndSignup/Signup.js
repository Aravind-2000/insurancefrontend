import React, { useEffect, useState } from "react";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link,
  Box,
  MenuItem,
  IconButton,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { InputAdornment } from "@material-ui/core";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Notifications from "../Dialogs/Notifications";
import { FileUploader } from "react-drag-drop-files";

const Signup = () => {
  let navigate = useNavigate();
  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: 500,
    margin: "20px auto",
  };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const btnstyle = { margin: "8px 0", marginLeft: "1.5rem" };

  const fileTypes = ["JPG", "PNG", "GIF", "JPEG"];
  const [file, setFile] = useState(null);
  const handleFileChange = (file) => {
    setFile(file);
  };

  const [roles, setRoles] = useState([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agentId, setAgentId] = useState("");
  const [roleId, setRoleId] = useState("");
  // const [profilePicture, setprofilePicture] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8090/role/getall")
      .then((res) => {
        setRoles(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      const base64 = await convertBase64(file)
      if (agentId !== "") {
        axios
          .post(`http://localhost:8090/api/auth/signup`, {
            username,
            password,
            agentId,
            roleId,
            email,
            profilePicture: base64,
          })
          .then((res) => {
            setNotify({
              isOpen: true,
              message: res.data?.message,
              type: "success",
            });
            setTimeout(() => {
              navigate("/login");
            }, 2000);
          })
          .catch((err) =>
            setNotify({
              isOpen: true,
              message: err.data?.message,
              type: "error",
            })
          );
      } else {
        axios
          .post(`http://localhost:8090/api/auth/signup`, {
            username,
            password,
            roleId,
            email,
            profilePicture: base64,
          })
          .then((res) => {
            setNotify({
              isOpen: true,
              message: res.data?.message,
              type: "success",
            });
            setTimeout(() => {
              navigate("/login");
            }, 2000);
          })
          .catch((err) =>
            setNotify({
              isOpen: true,
              message: err.data?.message,
              type: "error",
            })
          );
      }
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // const uploadImage = async (e) => {
  //   const file = e.target.files[0];
  //   const base64 = await convertBase64(file);
  //   setprofilePicture(base64);
  // };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  return (
    <div>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <LockOutlinedIcon />
          </Avatar>
          <h2>Sign Up</h2>
          <br />
        </Grid>
        <form onSubmit={handleSubmit} autoComplete="off">
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <TextField
                className="formtext"
                label="Username"
                value={username}
                placeholder="Enter username"
                onChange={(e) => setUsername(e.target.value)}
                fullWidth
                required
              />
              <br />
              <TextField
                className="formtext"
                label="E-Mail"
                value={email}
                placeholder="Enter your E-Mail"
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
              <br />
              <TextField
                className="formtext"
                label="Agent"
                value={agentId}
                placeholder="Enter Agent ID"
                onChange={(e) => setAgentId(e.target.value)}
                fullWidth
              />
              <br />

              <TextField
                select
                className="formtext"
                label="Role"
                value={roleId}
                placeholder="Enter Role"
                onChange={(e) => setRoleId(e.target.value)}
                fullWidth
                required
              >
                {roles.map((val) => (
                  <MenuItem value={val.id}> {val.roleName} </MenuItem>
                ))}
              </TextField>

              <div style={{ margin: 30 }}>
                <FileUploader
                  hoverTitle="Drop Here"
                  label="Drop your picture here"
                  handleChange={handleFileChange}
                  name="file"
                  types={fileTypes}
                />
              </div>

              <br />

              <Button
                type="submit"
                color="primary"
                variant="contained"
                style={btnstyle}
                fullWidth
              >
                Sign Up
              </Button>
            </Grid>

            <br />
            {/*<Grid container spacing={2}>*/}
            {/*    <Typography style={{marginLeft:150}}>*/}
            {/*        <Link href="#">Forgot password ?</Link>*/}
            {/*    </Typography>*/}
            {/*</Grid>*/}

            <br />
            <Grid container spacing={2}>
              <Typography style={{ marginLeft: 100 }}>
                Already have an Account ? <Link href="login">Login</Link>
              </Typography>
            </Grid>
          </Box>
        </form>
      </Paper>
      <Notifications notify={notify} setNotify={setNotify} />
    </div>
  );
};

export default Signup;
