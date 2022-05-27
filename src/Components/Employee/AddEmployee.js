import React, {useState} from 'react';
import InsuranceApi from "../../Service/InsuranceApi";
import {Box, Grid} from "@material-ui/core";
import { Button, TextField} from "@mui/material";

const AddEmployee = ({close, getAll}) => {

    const [employeeId, setEmployeeId] = useState("");
    const [employeeName, setEmployeeName] = useState("");
    const [employeeEmail, setEmployeeEmail] = useState("");
    const [employeeDesignation, setEmployeeDesignation] = useState("");


    const formSubmit = () => {
        const body = {employeeId, employeeName, employeeEmail, employeeDesignation}
        InsuranceApi.addEmployee(body).then(() => {
            close()
            getAll()
        }).catch(err => console.log(err))
    }

    return (
        <div>
            <form autoComplete="off" onSubmit={formSubmit}>
                <Box sx={{flexGrow: 1}}>
                    <Grid container spacing={2}>

                        <Grid item xs={8} md={6} lg={4}>
                            <TextField
                                fullWidth
                                className="formtext"
                                margin="dense"
                                variant="outlined"
                                placeholder="Enter Employee ID "
                                value={employeeId}
                                label="Employee ID"
                                onChange={(e) => setEmployeeId(e.target.value)}
                                required
                            />
                        </Grid>
                        <Grid item xs={8} md={6} lg={4}>
                            <TextField
                                fullWidth
                                className="formtext"
                                margin="dense"
                                variant="outlined"
                                placeholder="Enter Employee Name "
                                value={employeeName}
                                label="Employee Name"
                                onChange={(e) => setEmployeeName(e.target.value)}
                                required
                            />
                        </Grid>
                        <Grid item xs={8} md={6} lg={4}>
                            <TextField
                                fullWidth
                                className="formtext"
                                margin="dense"
                                variant="outlined"
                                placeholder="Enter Employee E-Mail "
                                value={employeeEmail}
                                label="Employee E-Mail"
                                onChange={(e) => setEmployeeEmail(e.target.value)}
                                required
                            />
                        </Grid>
                        <Grid item xs={8} md={6} lg={4}>
                            <TextField
                                fullWidth
                                className="formtext"
                                margin="dense"
                                variant="outlined"
                                placeholder="Enter Employee Designation "
                                value={employeeDesignation}
                                label="Designation"
                                onChange={(e) => setEmployeeDesignation(e.target.value)}
                                required
                            />
                        </Grid>
                    </Grid>
                </Box>
                <div style={{display: "flex", margin:20}}>
                    <Button
                        type="submit"
                        color="primary"
                        variant="contained"> Save </Button>

                    <Button
                        color="error" variant="contained" style={{marginLeft:20}} onClick={() => close()}> Cancel </Button>
                </div>
            </form>



        </div>
    );
};

export default AddEmployee;
