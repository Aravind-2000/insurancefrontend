import React from 'react';
import {Box, Grid} from "@material-ui/core";
import {Button, TextField} from "@mui/material";
import InsuranceApi from "../../Service/InsuranceApi";

const EditEmployee = ({record, setRecord, close, getAll}) => {

    const editCheck = (e) => {
        const { name, value } = e.target;
        setRecord({ ...record, [name]: value });
    };

    const updateEmployee = (id) => {
        const body = {
            employeeId: record.employeeId,
            employeeName: record.employeeName,
            employeeEmail: record.employeeEmail,
            employeeDesignation: record.employeeDesignation
        }
        InsuranceApi.updateEmployee(id, body).then(() => {
            close()
            getAll()
        }).catch(err => console.log(err))
    }

    return (
        <div>
            <form autoComplete="off">
                <Box sx={{flexGrow: 1}}>
                    <Grid container spacing={2}>

                        <Grid item xs={8} md={6} lg={4}>
                            <TextField
                                fullWidth
                                className="formtext"
                                margin="dense"
                                variant="outlined"
                                placeholder="Enter Employee ID "
                                value={record?.employeeId}
                                name="employeeId"
                                label="Employee ID"
                                onChange={(e) => editCheck(e)}
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
                                value={record?.employeeName}
                                name="employeeName"
                                label="Employee Name"
                                onChange={(e) =>  editCheck(e)}
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
                                value={record?.employeeEmail}
                                name="employeeEmail"
                                label="Employee E-Mail"
                                onChange={(e) =>  editCheck(e)}
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
                                value={record?.employeeDesignation}
                                name="employeeDesignation"
                                label="Designation"
                                onChange={(e) =>  editCheck(e)}
                                required
                            />
                        </Grid>
                    </Grid>
                </Box>
                <div style={{display: "flex", margin:20}}>
                    <Button
                        onClick={() => updateEmployee(record?.id)}
                        color="primary"
                        variant="contained"> Save </Button>

                    <Button
                        color="error" variant="contained" style={{marginLeft:20}} onClick={() => close()}> Cancel </Button>
                </div>
            </form>

        </div>
    );
};

export default EditEmployee;
