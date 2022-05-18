import React from 'react';
import {Box, Button, FormControl, Grid, TextField} from "@mui/material";
import {Checkbox, MenuItem} from "@material-ui/core";
import FormControlLabel from "@mui/material/FormControlLabel";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DatePicker from "@mui/lab/DatePicker";
import moment from "moment";
import InsuranceApi from "../../Service/InsuranceApi";

const TraineeAgentEdit = ({agents,close,getAll,record,setRecord,status,trainings,pay}) => {


    const editChange = (e) => {
        const { name, value } = e.target;
        setRecord({ ...record, [name]: value });
    };

    const editCheck = (e) => {
        const { checked, name } = e.target;

        setRecord({ ...record, [name]: checked });
    }

    const editDateApproved = (date) => {
        setRecord({ ...record, approvedDate: date });
    };

    const formSubmit = (id) => {

        const body = {
            trainingId: record.trainingId,
            agentId: record.agentId,
            isApproved: record.isApproved,
            approvedBy: record.approvedBy,
            approvedDate: moment(record.approvedDate).format("MM-DD-YYYY"),
            totalDays: record.totalDays,
            daysAttended: record.daysAttended,
            sponsoredBy: record.sponsoredBy,
            sponsoredPer: record.sponsoredPer,
            sponsoredAmount: record.sponsoredAmount,
            agentContribution: record.agentContribution,
            paymentStatus: record.paymentStatus,
            trainingScore: record.trainingScore,
            trainingStatus: record.trainingStatus,
            comments: record.comments
        }

        InsuranceApi.updateTrainee(id, body).then((res) => {
            close()
            getAll()
        }).catch(err => console.log(err))



    }


    return (
        <div>
            <form autoComplete="off" >
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
                                value={record?.trainingId}
                                name="trainingId"
                                label="Training ID"
                                onChange={(e) => editChange(e)}
                                required
                            >
                                {
                                    trainings.map((val) => (
                                        <MenuItem value={val.id}> {val.trainingModule?.trainingTopic} - {val.trainingModule?.trainingLevel} </MenuItem>
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
                                value={record?.agent?.id}
                                name="agentId"
                                label="Agent ID"
                                onChange={(e) => editChange(e)}
                                required
                            />
                        </Grid>

                        <Grid item xs={8} md={6} lg={4}>
                            <FormControlLabel
                                fullWidth
                                className="checktext"
                                control={
                                <Checkbox
                                    name = "isApproved"
                                    value={record?.isApproved}
                                    checked={record?.isApproved === true ? true : false}
                                    onChange={(e) => editCheck(e)} />}
                                label=" : Is Approved : "
                            />
                        </Grid>

                        {
                            record?.isApproved === true ?
                                <>
                                    <Grid item xs={8} md={6} lg={4}>
                                        <TextField
                                            select
                                            fullWidth
                                            className="formtext"
                                            margin="dense"
                                            variant="outlined"
                                            placeholder="Enter Approved by agent ID "
                                            value={record?.approvedBy}
                                            name="approvedBy"
                                            label="Approved Agent"
                                            onChange={(e) => editChange(e)}
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
                                                    value={record?.approvedDate}
                                                    name="approvedDate"
                                                    onChange={(date) => editDateApproved(date)}
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
                                            value={record?.approvedBy}
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
                                                    value={record?.approveddate}
                                                    onChange={(date) => editDateApproved(date)}
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
                                value={record?.totalDays}
                                name="totalDays"
                                label="Total Days"
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
                                placeholder="Enter  days attended "
                                value={record?.daysAttended}
                                name="daysAttended"
                                label="Attended Days"
                                onChange={(e) => editChange(e)}
                            />
                        </Grid>

                        <Grid item xs={8} md={6} lg={4}>
                            <TextField
                                fullWidth
                                className="formtext"
                                margin="dense"
                                variant="outlined"
                                placeholder="Enter the sponsor name "
                                value={record?.sponsoredBy}
                                name="sponsoredBy"
                                label="Sponsored By"
                                onChange={(e) => editChange(e)}
                            />
                        </Grid>

                        <Grid item xs={8} md={6} lg={4}>
                            <TextField
                                fullWidth
                                className="formtext"
                                margin="dense"
                                variant="outlined"
                                placeholder="Enter the percent of sponsorship "
                                value={record?.sponsoredPer}
                                name="sponsoredPer"
                                label="Sponsored Percentage"
                                onChange={(e) => editChange(e)}
                            />
                        </Grid>

                        <Grid item xs={8} md={6} lg={4}>
                            <TextField
                                fullWidth
                                className="formtext"
                                margin="dense"
                                variant="outlined"
                                placeholder="Enter the sponsored amount "
                                value={record?.sponsoredAmount}
                                name="sponsoredAmount"
                                label="Sponsored Amount"
                                onChange={(e) => editChange(e)}
                            />
                        </Grid>

                        <Grid item xs={8} md={6} lg={4}>
                            <TextField
                                fullWidth
                                className="formtext"
                                margin="dense"
                                variant="outlined"
                                placeholder="Enter agent contribution "
                                value={record?.agentContribution}
                                name="agentContribution"
                                label="Agent Contribution"
                                onChange={(e) => editChange(e)}
                            />
                        </Grid>

                        <Grid item xs={8} md={6} lg={4}>
                            <TextField
                                select
                                fullWidth
                                className="formtext"
                                margin="dense"
                                variant="outlined"
                                placeholder="Enter the payment status "
                                value={record?.paymentStatus}
                                name="paymentStatus"
                                label="Payment Status"
                                onChange={(e) => editChange(e)}
                            >
                                {
                                    pay.map((val) => (
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
                                placeholder="Enter Training Score "
                                value={record?.trainingScore}
                                name="trainingScore"
                                label=" Training Score "
                                onChange={(e) => editChange(e)}
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
                                value={record?.trainingStatus}
                                name="trainingStatus"
                                label="Status"
                                onChange={(e) => editChange(e)}
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
                            placeholder="Enter Comments "
                            value={record?.comments}
                            style={{width:"max-content"}}
                            multiline
                            rows={5}
                            name="comments"
                            label=" Comments "
                            onChange={(e) => editChange(e)}
                        />
                        </Grid>
                    </Grid>
                </Box>
                <div style={{display: "flex", margin:20}}>
                    <Button
                        onClick={() => formSubmit(record.id)}
                        color="primary"
                        variant="contained"> Save </Button>

                    <Button
                        color="error" variant="contained" style={{marginLeft:20}} onClick={() => close()}> Cancel </Button>
                </div>
            </form>
        </div>
    );
};

export default TraineeAgentEdit;
