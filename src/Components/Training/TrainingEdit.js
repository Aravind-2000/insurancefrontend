import React from 'react';
import {Box, Grid, MenuItem} from "@material-ui/core";
import {Button, FormControl, TextField} from "@mui/material";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DatePicker from "@mui/lab/DatePicker";
import moment from "moment";
import InsuranceApi from "../../Service/InsuranceApi";

const TrainingEdit = ({close, getAll, modes, levels, record, setRecord, types, agents}) => {



    const updateSubmit = (id) => {

        const body = {
            trainingTopic: record.trainingTopic,
            trainingDesc: record.trainingDesc,
            trainingType: record.trainingType,
            trainingMode: record.trainingMode,
            trainingLevel: record.trainingLevel,
            startDate: moment(record.startDate).format("MM-DD-YYYY"),
            endDate: moment(record.endDate).format("MM-DD-YYYY"),
            trainingTime: record.trainingTime,
            trainer: record.trainer,
            trainingCost: record.trainingCost,
            sponsoredBy: record.sponsoredBy,
            continuanceId: record.continuanceId
        }

        InsuranceApi.updateTraining(id, body).then((res) => {
            close()
            getAll()
        }).catch(err => console.log(err))

    }


    const editChange = (e) =>{
        const { value, name } = e.target;
        setRecord({ ...record, [name]: value });
    }

    const startDateChange = (date) =>{
        setRecord({...record, startDate: date});
    }

    const endDateChange = (date) =>{
        setRecord({...record, endDate: date});
    }

    return (
        <div>
            <br/>
            <form autoComplete="off">
                <Box sx={{flexGrow: 1}}>
                    <Grid container spacing={2}>
                        <Grid item xs={8} md={6} lg={4}>
                            <TextField
                                fullWidth
                                className="formtext"
                                margin="dense"
                                variant="outlined"
                                placeholder="Enter Training Topic "
                                value={record?.trainingTopic}
                                name="trainingTopic"
                                label="Topic"
                                onChange={(e) => editChange(e)}
                                required
                            />
                        </Grid>

                        <Grid item xs={8} md={6} lg={4}>
                            <TextField
                                fullWidth
                                className="formtext"
                                margin="dense"
                                variant="outlined"
                                placeholder="Enter Training Description "
                                value={record?.trainingDesc}
                                name="trainingDesc"
                                label="Description"
                                onChange={(e) => editChange(e)}
                                required
                            />
                        </Grid>

                        <Grid item xs={8} md={6} lg={4}>
                            <TextField
                                select
                                fullWidth
                                className="formtext"
                                margin="dense"
                                variant="outlined"
                                placeholder="Enter Training Description "
                                value={record?.trainingType}
                                name="trainingType"
                                label="Type"
                                onChange={(e) => editChange(e)}
                                required
                            >
                                {
                                    types.map((val) => (
                                        <MenuItem value={val}> {val} </MenuItem>
                                    ))
                                }
                            </TextField>
                        </Grid>

                        <Grid item xs={8} md={6} lg={4}>
                            <TextField
                                select
                                fullWidth
                                className="formtext"
                                margin="dense"
                                variant="outlined"
                                placeholder="Enter Training Mode "
                                value={record?.trainingMode}
                                name="trainingMode"
                                label="Mode"
                                onChange={(e) => editChange(e)}
                                required
                            >
                                {
                                    modes.map((val) => (
                                        <MenuItem value={val}> {val} </MenuItem>
                                    ))
                                }
                            </TextField>
                        </Grid>

                        <Grid item xs={8} md={6} lg={4}>
                            <TextField
                                select
                                fullWidth
                                className="formtext"
                                margin="dense"
                                variant="outlined"
                                placeholder="Enter Training Level "
                                value={record?.trainingLevel}
                                name="trainingLevel"
                                label="Level"
                                onChange={(e) => editChange(e)}
                                required
                            >
                                {
                                    levels.map((val) => (
                                        <MenuItem value={val}> {val} </MenuItem>
                                    ))
                                }
                            </TextField>
                        </Grid>

                        <Grid item xs={8} md={6} lg={4}>
                            <FormControl
                                style={{ marginTop: "0.5rem" }}
                                className="formtext"
                                fullWidth
                            >
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                        inputFormat="dd/MM/yyyy"
                                        label="Start Date"
                                        placeholder="Training Start Date"
                                        fullWidth
                                        value={record?.startDate}
                                        name="startDate"
                                        onChange={(date) => startDateChange(date)}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>
                            </FormControl>
                        </Grid>

                        <Grid item xs={8} md={6} lg={4}>
                            <FormControl
                                style={{ marginTop: "0.5rem" }}
                                className="formtext"
                                fullWidth
                            >
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                        inputFormat="dd/MM/yyyy"
                                        label="End Date"
                                        placeholder="Training End Date"
                                        fullWidth
                                        value={record?.endDate}
                                        name="endDate"
                                        onChange={(date) => endDateChange(date)}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>
                            </FormControl>
                        </Grid>

                        <Grid item xs={8} md={6} lg={4}>
                            <TextField
                                fullWidth
                                className="formtext"
                                margin="dense"
                                variant="outlined"
                                placeholder="Enter Training Timing "
                                value={record?.trainingTime}
                                name="trainingTime"
                                label="Timing"
                                onChange={(e) => editChange(e)}
                            />
                        </Grid>

                        {
                            record.trainingType === "EXTERNAL" ?

                                <Grid item xs={8} md={6} lg={4}>
                                    <TextField
                                        fullWidth
                                        className="formtext"
                                        margin="dense"
                                        variant="outlined"
                                        placeholder="Enter Trainer "
                                        value={record?.trainer}
                                        name="trainer"
                                        label="Trainer"
                                        onChange={(e) => editChange(e)}
                                    />
                                </Grid>

                                :

                                <Grid item xs={8} md={6} lg={4}>
                                    <TextField
                                        select
                                        fullWidth
                                        className="formtext"
                                        margin="dense"
                                        variant="outlined"
                                        placeholder="Enter Trainer "
                                        value={record?.trainer}
                                        name="trainer"
                                        label="Trainer"
                                        onChange={(e) => editChange(e)}
                                        required
                                    >
                                        {
                                            agents.map((val) => (
                                                <MenuItem value={val.client?.givenName}> {val.client?.givenName} </MenuItem>
                                            ))
                                        }
                                    </TextField>
                                </Grid>
                        }


                        <Grid item xs={8} md={6} lg={4}>
                            <TextField
                                type="number"
                                fullWidth
                                className="formtext"
                                margin="dense"
                                variant="outlined"
                                placeholder="Enter Cost of Training "
                                value={record?.trainingCost}
                                name="trainingCost"
                                label="Training Cost"
                                onChange={(e) => editChange(e)}
                            />
                        </Grid>

                        <Grid item xs={8} md={6} lg={4}>
                            <TextField
                                fullWidth
                                className="formtext"
                                margin="dense"
                                variant="outlined"
                                placeholder="Sponsorship "
                                value={record?.sponsoredBy}
                                name="sponsoredBy"
                                label="Sponsered By"
                                onChange={(e) => editChange(e)}
                            />
                        </Grid>

                        <Grid item xs={8} md={6} lg={4}>
                            <TextField
                                fullWidth
                                className="formtext"
                                margin="dense"
                                variant="outlined"
                                placeholder="Suggested To "
                                value={record?.continuanceId}
                                name="continuanceId"
                                label="Suggestion ID"
                                onChange={(e) => editChange(e)}
                            />
                        </Grid>
                    </Grid>
                </Box>

                <div style={{display: "flex", margin:20}}>
                    <Button
                        onClick={() => updateSubmit(record.id)}
                        color="primary"
                        variant="contained"> Save </Button>

                    <Button
                        color="error" variant="contained" style={{marginLeft:20}} onClick={() => close()}> Cancel </Button>
                </div>
            </form>
        </div>
    );
};

export default TrainingEdit;
