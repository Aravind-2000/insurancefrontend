import React, {useState} from 'react';
import moment from "moment";
import InsuranceApi from "../../Service/InsuranceApi";
import {Box, Grid, MenuItem} from "@material-ui/core";
import "../Css/Content.css"
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


const TrainingAdd = ({close, getAll, modes, levels, types, agents}) => {

    const [trainingTopic, setTrainingTopic] = useState("");
    const [trainingDesc, setTrainingDesc] = useState("");
    const [trainingType, setTrainingType] = useState("");
    const [trainingMode, setTrainingMode] = useState("");
    const [trainingLevel, setTrainingLevel] = useState("");
    const [startdate, setStartDate] = useState("");
    const [enddate, setEndDate] = useState("");
    const [trainingTime, setTrainingTime] = useState("");
    const [trainer, setTrainer] = useState("");
    const [trainingCost, setTrainingCost] = useState("");
    const [sponsoredBy, setSponsoredBy] = useState("");


    const [dateError, setDateError] = useState("");

    const setendDate = (date) => {

        const start = moment(startdate).format("DD-MM-YYYY")
        const end = moment(date).format("DD-MM-YYYY")

        InsuranceApi.trainingDateValidation(start.toString(), end.toString()).then((res) => {

            if(res.data !== null){
                setDateError(res.data)
            }
            setEndDate(date)

        }).catch(err => console.log(err))




    }

    const formSubmit = () => {

        const startDate = moment(startdate).format("MM-DD-YYYY")
        const endDate = moment(enddate).format("MM-DD-YYYY")

        const body = {
            trainingTopic, trainingDesc, trainingType, trainingMode, trainingLevel,
            startDate, endDate, trainingTime, trainer, trainingCost, sponsoredBy
        }

        InsuranceApi.addTraining(body).then((res) => {
            close()
            getAll()
        }).catch(err => console.log(err))

    }

    return (
        <div>
            <br/>
            <form autoComplete="off" onSubmit={formSubmit}>
                <Box sx={{flexGrow: 1}}>
                    <Grid container spacing={2}>
                        <Grid item xs={8} md={6} lg={4}>
                            <TextField
                                fullWidth
                                className="formtext"
                                margin="dense"
                                variant="outlined"
                                placeholder="Enter Training Topic "
                                value={trainingTopic}
                                label="Topic"
                                onChange={(e) => setTrainingTopic(e.target.value)}
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
                                value={trainingDesc}
                                label="Description"
                                onChange={(e) => setTrainingDesc(e.target.value)}
                                required
                            />
                        </Grid>

                        <Grid item xs={8} md={6} lg={4}>
                            <FormControl>
                                <FormLabel className="formtext"> <b>  Training Type </b></FormLabel>
                                <RadioGroup
                                    className="formtext"
                                    value={trainingType}
                                    onChange={(e) => setTrainingType(e.target.value)}
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
                                    value={trainingMode}
                                    onChange={(e) => setTrainingMode(e.target.value)}
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
                            <TextField
                                select
                                fullWidth
                                className="formtext"
                                margin="dense"
                                variant="outlined"
                                placeholder="Enter Training Level "
                                value={trainingLevel}
                                label="Level"
                                onChange={(e) => setTrainingLevel(e.target.value)}
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
                                        value={startdate}
                                        onChange={(date) => setStartDate(date)}
                                        renderInput={(params) => <TextField {...params} required />}
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
                                        value={enddate}
                                        onChange={(date) => setendDate(date)}
                                        renderInput={(params) => <TextField {...params} required />}
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
                                value={trainingTime}
                                label="Timing"
                                onChange={(e) => setTrainingTime(e.target.value)}
                            />
                        </Grid>

                        {
                            trainingType === "EXTERNAL" ?

                                <Grid item xs={8} md={6} lg={4}>
                                    <TextField
                                        fullWidth
                                        className="formtext"
                                        margin="dense"
                                        variant="outlined"
                                        placeholder="Enter Trainer "
                                        value={trainer}
                                        label="Trainer"
                                        onChange={(e) => setTrainer(e.target.value)}
                                        required
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
                                        value={trainer}
                                        label="Trainer"
                                        onChange={(e) => setTrainer(e.target.value)}
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
                                placeholder="₹ "
                                value={trainingCost}
                                label="Training Cost"
                                onChange={(e) => setTrainingCost(e.target.value)}
                            />
                        </Grid>

                        <Grid item xs={8} md={6} lg={4}>
                            <TextField
                                fullWidth
                                className="formtext"
                                margin="dense"
                                variant="outlined"
                                placeholder="Sponsorship "
                                value={sponsoredBy}
                                label="Sponsered By"
                                onChange={(e) => setSponsoredBy(e.target.value)}
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

export default TrainingAdd;
