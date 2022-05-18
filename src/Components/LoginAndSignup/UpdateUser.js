import React, {useEffect, useState} from 'react';
import InsuranceApi from "../../Service/InsuranceApi";
import {Box, Grid, MenuItem, TextField} from "@mui/material";
import Button from "@mui/material/Button";

const UpdateUser = ({userid, roles, close}) => {



    const [userDetails, setUserDetails] = useState("");

    const editChange = (e) => {
        const { name, value } = e.target;
        setUserDetails({ ...userDetails, [name]: value });
    };

    useEffect(() => {
        InsuranceApi.getUser(userid).then((res) => {
            setUserDetails(res.data)
        }).catch(err => console.log(err))
    }, []);


    const formSubmit = () => {

        const body = {
            username: userDetails.username,
            email: userDetails.email,
            agentId: userDetails.agentId,
            roleId: userDetails.roleId
        }
        sessionStorage.setItem("username", userDetails.username)
        sessionStorage.setItem("agent", userDetails.agentId)
        InsuranceApi.updateUser(userid, body).then((res) => {
            close()
            window.location = "logindetails"
        }).catch(err => console.log(err))

    }



    return (
        <div>

            <form autoComplete="off">

                <Box sx={{flexGrow: 1}}>
                    <Grid container spacing={2}>
                        <br/>
                        <TextField
                            className="formtext"
                            label="Username"
                            value={userDetails?.username}
                            name="username"
                            placeholder="Enter username"
                            onChange={(e) => editChange(e)}
                            fullWidth
                            required
                        />

                        <br/>

                        <TextField
                            className="formtext"
                            label="E-Mail"
                            value={userDetails?.email}
                            name="email"
                            placeholder="Enter E-Mail"
                            onChange={(e) => editChange(e)}
                            fullWidth
                            required
                        />

                        <br/>

                        <TextField
                            className="formtext"
                            label="Agent ID"
                            value={userDetails?.agentId}
                            name="agentId"
                            placeholder="Enter your Agent ID"
                            onChange={(e) => editChange(e)}
                            fullWidth
                            required
                        />

                        <br/>

                        <TextField
                            select
                            className="formtext"
                            label="Role"
                            value={userDetails.roleId}
                            name="roleId"
                            placeholder="Enter your role"
                            onChange={(e) => editChange(e)}
                            fullWidth
                            required
                        >
                            {
                                roles.map((val) => (
                                    <MenuItem value={val.id}> {val.roleName}  </MenuItem>
                                ))
                            }
                        </TextField>



                        <div style={{margin:30}}>
                            <Button
                                color="primary"
                                variant="contained"
                                style={{marginRight:10}}
                                onClick={() => formSubmit()}> Update </Button>
                            <Button
                                color="error"
                                variant="contained"
                                style={{marginRight:10}}
                                onClick={() => close()}> Cancel </Button>
                        </div>


                    </Grid>
                </Box>
            </form>

        </div>
    );
};

export default UpdateUser;
