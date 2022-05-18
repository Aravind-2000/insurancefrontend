import React, {useState} from 'react';
import {Box, Grid, MenuItem} from "@material-ui/core";
import {
    Button,
    FormControl,
    FormControlLabel,
    FormHelperText,
    FormLabel,
    Radio,
    RadioGroup,
    TextField
} from "@mui/material";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DatePicker from "@mui/lab/DatePicker";
import moment from "moment";
import InsuranceApi from "../../Service/InsuranceApi";

const TrainingEdit = ({close, getAll, modes, modules, record, setRecord, types, agents}) => {



    const updateSubmit = (id) => {

        const body = {
            trainingModuleId: record.trainingModuleId,
            trainingType: record.trainingType,
            trainingMode: record.trainingMode,
            startDate: moment(record.startDate).format("MM-DD-YYYY"),
            endDate: moment(record.endDate).format("MM-DD-YYYY"),
            trainingTime: record.trainingTime,
            trainer: record.trainer,
            trainingCost: record.trainingCost,
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

    const [dateError, setDateError] = useState("");
    const setendDate = (date) => {
        const start = moment(record?.startDate).format("DD-MM-YYYY")
        const end = moment(date).format("DD-MM-YYYY")
        InsuranceApi.trainingDateValidation(start.toString(), end.toString()).then((res) => {

            if(res.data !== null){
                setDateError(res.data)
            }
            setRecord({...record, endDate: date});
        }).catch(err => console.log(err))
    }

    // const endDateChange = (date) =>{
    //     setRecord({...record, endDate: date});
    // }

    return (
        <div>
            <br/>
            <form autoComplete="off">
                <Box sx={{flexGrow: 1}}>
                    <Grid container spacing={2}>

                        <Grid item xs={8} md={6} lg={4}>
                            <TextField
                                select
                                fullWidth
                                className="formtext"
                                margin="dense"
                                variant="outlined"
                                placeholder="Enter Training Module ID "
                                value={record?.trainingModuleId}
                                name="trainingModuleId"
                                label="Module ID"
                                onChange={(e) => editChange(e)}
                                required
                            >
                                {
                                    modules.map((val) => (
                                        <MenuItem value={val.id}> {val.trainingTopic} -{val.trainingLevel} </MenuItem>
                                    ))
                                }
                            </TextField>
                        </Grid>


                        <Grid item xs={8} md={6} lg={4}>
                            <FormControl>
                                <FormLabel className="formtext"> <b>  Training Type </b></FormLabel>
                                <RadioGroup
                                    className="formtext"
                                    value={record?.trainingType}
                                    name="trainingType"
                                    onChange={(e) => editChange(e)}
                                >
                                    {
                                        types.map((val) => (
                                            <FormControlLabel value={val} control={<Radio />} label={val.toUpperCase()} />
                                        ))
                                    }
                                </RadioGroup>
                            </FormControl>
                        </Grid>

                        <Grid item xs={8} md={6} lg={4}>
                            <FormControl>
                                <FormLabel className="formtext"> <b>  Training Mode </b></FormLabel>
                                <RadioGroup
                                    className="formtext"
                                    value={record?.trainingMode}
                                    name="trainingMode"
                                    onChange={(e) => editChange(e)}
                                >
                                    {
                                        modes.map((val) => (
                                            <FormControlLabel value={val} control={<Radio />} label={val.toUpperCase()} />
                                        ))
                                    }
                                </RadioGroup>
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
                                        onChange={(date) => setendDate(date)}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>
                                <FormHelperText error> {dateError === null ? null : dateError} </FormHelperText>
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
