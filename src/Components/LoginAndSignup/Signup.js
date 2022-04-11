import React, {useEffect, useState} from 'react';
import {
    Grid,
    Paper,
    Avatar,
    TextField,
    Button,
    Typography,
    Link, Box, MenuItem,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {

    let navigate = useNavigate();
    const paperStyle = {
        padding: 20,
        height: "70vh",
        width: 500,
        margin: "20px auto",
    };
    const avatarStyle = { backgroundColor: "#1bbd7e" };
    const btnstyle = { margin: "8px 0" , marginLeft: "1.5rem"};

    const [roles, setRoles] = useState([]);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [agentId, setAgentId] = useState("");
    const [roleId, setRoleId] = useState("");


    useEffect(() => {
        axios.get("http://localhost:8090/role/getall").then((res) => {
            setRoles(res.data);
        }).catch((err) => console.log(err))
    }, []);



    const handleSubmit = (e) => {
        e.preventDefault();
        if(agentId !== ""){
            axios.post(`http://localhost:8090/api/auth/signup`, {
                username, password, agentId, roleId, email
            }).then((res) => {
                console.log(res.data)
                navigate("/login");
            }).catch((err) => console.log(err))
        }
        else{
            axios.post(`http://localhost:8090/api/auth/signup`, {
                username, password, roleId, email
            }).then((res) => {
                console.log(res.data)
                navigate("/login");
            }).catch((err) => console.log(err))
        }
    }

    return (

        <div>
            <Paper elevation={10} style={paperStyle}>
                <Grid align="center">
                    <Avatar style={avatarStyle}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <h2>Sign Up</h2>
                    <br/>
                </Grid>
                <form onSubmit={handleSubmit} autoComplete="off">
                    <Box sx={{flexGrow: 1}}>
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
                            <br/>
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
                            <br/>
                            <TextField
                                className="formtext"
                                label="Agent"
                                value={agentId}
                                placeholder="Enter Agent ID"
                                onChange={(e) => setAgentId(e.target.value)}
                                fullWidth
                            />
                            <br/>

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
                                {
                                    roles.map((val) => (
                                        <MenuItem value={val.id}> {val.roleName}  </MenuItem>
                                    ))
                                }
                            </TextField>
                            <br/>

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

                        <br/>
                        {/*<Grid container spacing={2}>*/}
                        {/*    <Typography style={{marginLeft:150}}>*/}
                        {/*        <Link href="#">Forgot password ?</Link>*/}
                        {/*    </Typography>*/}
                        {/*</Grid>*/}

                        <br/>
                        <Grid container spacing={2}>
                            <Typography style={{marginLeft:100}} >
                                Already have an Account ? <Link href="/login">Login</Link>
                            </Typography>
                        </Grid>
                    </Box>
                </form>
            </Paper>
        </div>
    );
};

export default Signup;
