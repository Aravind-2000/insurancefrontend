import React, {useEffect, useState} from 'react';
import InsuranceApi from "../../Service/InsuranceApi";
import {Box, Grid, MenuItem} from "@material-ui/core";
import {Button, TextField} from "@mui/material";
import axios from 'axios';
import {Col, Row} from "react-bootstrap";
import {Autocomplete} from "@mui/lab";



const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const PermissionsUI = ({close}) => {

    const btnstyle = { margin: "8px 0" , marginLeft: "1.5rem"};
    useEffect(() => {
        getAllServices()
        getAllRoles()
    }, []);


    const [methods, setMethods] = useState([]);
    const [service, setService] = useState([]);
    const [roles, setRoles] = useState([]);

    // const getAllMethods = () => {
    //     InsuranceApi.getAllPermissionMethods().then((res) => {
    //         setMethods(res.data)
    //     }).catch((err) => console.log(err))
    // }

    const getAllServices = () => {
        InsuranceApi.getAllServices().then((res) => {
            setService(res.data)
        }).catch((err) => console.log(err))
    }

    const getAllRoles = () => {
        axios.get(`http://localhost:8090/role/getall`).then((res) => {
            setRoles(res.data)
        }).catch((err) => console.log(err))
    }

    const [userId, setUserId] = useState("");
    const [serviceId, setServiceId] = useState("");
    const [roleId, setRoleId] = useState("");
    const [method, setMethod] = useState("");

    const [access, setAccess] = useState([]);
    const accessMethod = (arr) => {
        arr.map((val) => (
            access.push(val.method)
        ))
        sessionStorage.setItem("specialaccess", JSON.stringify(access))
    }

    const onChangeServiceId = (value) => {
        setServiceId(value);
        InsuranceApi.getAllMethodsByServiceId(value).then((res) => {
            setMethods(res.data)
        }).catch(err => console.log(err))
    }

    const SubmitPermission = () => {
        const body = {userId, serviceId, roleId, method}
        InsuranceApi.addPermission(body).then((res) => {
            console.log(res.data)
            accessMethod(res.data)
        }).catch((err) => console.log(err))
    }

    return (
        <div>
            
            <form onSubmit={SubmitPermission} autoComplete="off">
                <Box sx={{flexGrow: 1}}>
                    <Grid container spacing={2}>

                        <TextField
                            className="formtext"
                            label="User"
                            value={userId}
                            placeholder="Enter User ID"
                            onChange={(e) => setUserId(e.target.value)}
                            fullWidth
                            required
                        />
                        <br/>
                        <TextField
                            select
                            className="formtext"
                            label="Service"
                            value={serviceId}
                            placeholder="Enter Service "
                            onChange={(e) => onChangeServiceId(e.target.value)}
                            fullWidth
                            SelectProps={{
                                MenuProps:MenuProps
                            }}
                            required
                        >
                            {
                                service.map((val) => (
                                    <MenuItem value={val.id}> {val.serviceName} </MenuItem>
                                ))
                            }
                        </TextField>
                        <br/>

                        <TextField
                            select
                            className="formtext"
                            label="Role"
                            value={roleId}
                            placeholder="Enter Role "
                            onChange={(e) => setRoleId(e.target.value)}
                            fullWidth
                            SelectProps={{
                                MenuProps:MenuProps
                            }}
                            required
                        >
                            {
                                roles.map((val) => (
                                    <MenuItem  value={val.id}> {val.roleName} </MenuItem>
                                ))
                            }
                        </TextField>
                        <br/>

                        <Autocomplete
                            id="combo-box-demo"
                            freeSolo
                            fullWidth
                            className="formtext"
                            options={methods}
                            renderInput={(params) =>
                                <TextField {...params}
                                           placeholder="Enter Method Name"
                                           onChange={(e) => setMethod(e.target.value)}
                                           required
                                           value={method}
                                           label="Method" />}
                        />
                        <br/>
                        <br/>

                        <Row>
                            <Col>
                                <Button
                                    type="submit"
                                    color="primary"
                                    variant="contained"
                                    style={btnstyle}
                                    fullWidth
                                >
                                    Save
                                </Button>
                            </Col>
                            <Col>
                                <Button
                                    color="error"
                                    variant="contained"
                                    style={btnstyle}
                                    fullWidth
                                    onClick={close}
                                >
                                    Cancel
                                </Button>
                            </Col>
                        </Row>
                    </Grid>
                </Box>
            </form>
            
        </div>
    );
};

export default PermissionsUI;
