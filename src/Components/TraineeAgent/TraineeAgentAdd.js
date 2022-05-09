import React, {useState} from 'react';
import {Box, Button, FormControl, Grid,  TextField} from "@mui/material";
import {Checkbox, MenuItem} from "@material-ui/core";
import FormControlLabel from "@mui/material/FormControlLabel";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DatePicker from "@mui/lab/DatePicker";
import moment from "moment";
import InsuranceApi from "../../Service/InsuranceApi";

const TraineeAgentAdd = ({close, getAll, agents, trainings, status}) => {


    const [trainingId, setTrainingId] = useState("");
    const [agentId, setAgentId] = useState("");
    const [isApproved, setIsApproved] = useState(false);
    const [approvedBy, setApprovedBy] = useState("");
    const [approveddate, setApprovedDate] = useState("");
    const [totalDays, setTotalDays] = useState("");
    const [daysAttended, setDaysAttended] = useState("");
    const [trainingScore, setTrainingScore] = useState("");
    const [trainingStatus, setTrainingStatus] = useState("");
    const [comments, setComments] = useState("");


    function toggle(value){
        return !value;
    }


    const formSubmit = (e) => {

       if(isApproved === true){
           const approvedDate = moment(approveddate).format("MM-DD-YYYY")
           const body = {trainingId, agentId, isApproved, approvedBy, approvedDate, totalDays, daysAttended, trainingScore, trainingStatus, comments}
           InsuranceApi.addTrainee(body).then((res) => {
               close()
               getAll()
           }).catch(err => console.log(err))
       }
       else{
           const body = {trainingId, agentId, isApproved, approvedBy, totalDays, daysAttended, trainingScore, trainingStatus, comments}
           InsuranceApi.addTrainee(body).then((res) => {
               close()
               getAll()
           }).catch(err => console.log(err))
       }

    }



    return (
        <div>
            <form autoComplete="off" onSubmit={formSubmit} >
                <Box sx={{flexGrow:1}}>
                    <Grid container spacing={2}>
                        <Grid item xs={8} md={6} lg={4}>
                            <TextField
                                select
                                fullWidth
                                className="formtext"
                                margin="dense"
                                variant="outlined"
                                placeholder="Enter Training ID "
                                value={trainingId}
                                label="Training ID"
                                onChange={(e) => setTrainingId(e.target.value)}
                                required
                            >
                                {
                                    trainings.map((val) => (
                                        <MenuItem value={val.id}> {val.trainingTopic} </MenuItem>
                                    ))
                                }
                            </TextField>
                        </Grid>
                        <Grid item xs={8} md={6} lg={4}>
                            <TextField
                                fullWidth
                                className="formtext"
                                margin="dense"
                                variant="outlined"
                                placeholder="Enter Agent ID "
                                value={agentId}
                                label="Agent ID"
                                onChange={(e) => setAgentId(e.target.value)}
                                required
                            />
                        </Grid>

                        <Grid item xs={8} md={6} lg={4}>
                            <FormControlLabel
                                fullWidth
                                className="checktext"
                                control={<Checkbox  onChange={(e) => setIsApproved(toggle)} />}
                                label=" : Is Approved : "
                            />
                        </Grid>

                        {
                            isApproved === true ?
                                <>
                                <Grid item xs={8} md={6} lg={4}>
                                    <TextField
                                        select
                                        fullWidth
                                        className="formtext"
                                        margin="dense"
                                        variant="outlined"
                                        placeholder="Enter Approved by agent ID "
                                        value={approvedBy}
                                        label="Approved Agent"
                                        onChange={(e) => setApprovedBy(e.target.value)}
                                    >
                                        {
                                            agents.map((val) => (
                                                <MenuItem value={val.id}> {val.client?.givenName} {val.client?.surName} </MenuItem>
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
                                                label="Approved Date"
                                                placeholder="Training Approved Date"
                                                fullWidth
                                                value={approveddate}
                                                onChange={(date) => setApprovedDate(date)}
                                                renderInput={(params) => <TextField {...params} />}
                                            />
                                        </LocalizationProvider>
                                    </FormControl>
                                </Grid>
                                </>

                                :
                                <>
                                <Grid item xs={8} md={6} lg={4}>
                                    <TextField
                                        fullWidth
                                        className="formtext"
                                        margin="dense"
                                        variant="outlined"
                                        placeholder="Enter Approved by agent ID "
                                        value={approvedBy}
                                        label="Approved Agent"
                                        required
                                        disabled
                                    /></Grid>

                                <Grid item xs={8} md={6} lg={4}>
                                    <FormControl
                                        style={{ marginTop: "0.5rem" }}
                                        className="formtext"
                                        fullWidth
                                    >
                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                            <DatePicker
                                            inputFormat="dd/MM/yyyy"
                                            label="Approved Date"
                                            placeholder="Training Approved Date"
                                            fullWidth
                                            value={approveddate}
                                            onChange={(date) => setApprovedDate(date)}
                                            disabled
                                            renderInput={(params) => <TextField {...params} />}
                                            />
                                        </LocalizationProvider>
                                    </FormControl>
                                </Grid></>
                        }



                        <Grid item xs={8} md={6} lg={4}>
                            <TextField
                                fullWidth
                                className="formtext"
                                margin="dense"
                                variant="outlined"
                                placeholder="Enter Total days of training "
                                value={totalDays}
                                label="Total Days"
                                onChange={(e) => setTotalDays(e.target.value)}
                                required
                            />
                        </Grid>

                        <Grid item xs={8} md={6} lg={4}>
                            <TextField
                                fullWidth
                                className="formtext"
                                margin="dense"
                                variant="outlined"
                                placeholder="Enter  days attended "
                                value={daysAttended}
                                label="Attended Days"
                                onChange={(e) => setDaysAttended(e.target.value)}
                            />
                        </Grid>

                        <Grid item xs={8} md={6} lg={4}>
                            <TextField
                                fullWidth
                                className="formtext"
                                margin="dense"
                                variant="outlined"
                                placeholder="Enter Training Score "
                                value={trainingScore}
                                label=" Training Score "
                                onChange={(e) => setTrainingScore(e.target.value)}
                            />
                        </Grid>

                        <Grid item xs={8} md={6} lg={4}>
                            <TextField
                                select
                                fullWidth
                                className="formtext"
                                margin="dense"
                                variant="outlined"
                                placeholder="Enter Training Status "
                                value={trainingStatus}
                                label="Status"
                                onChange={(e) => setTrainingStatus(e.target.value)}
                                required
                            >
                                {
                                    status.map((val) => (
                                        <MenuItem value={val}> {val} </MenuItem>
                                    ))
                                }
                            </TextField>
                        </Grid>
                        <Grid item xs={8} md={6} lg={4}>
                            <TextField
                                fullWidth
                                className="formtext"
                                margin="dense"
                                variant="outlined"
                                placeholder="Enter your Comments... "
                                style={{width:"max-content"}}
                                multiline
                                rows={5}
                                value={comments}
                                label=" Comments "
                                onChange={(e) => setComments(e.target.value)}
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

export default TraineeAgentAdd;
