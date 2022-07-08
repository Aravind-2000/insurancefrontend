import React from 'react';
import {Box, Button, FormControl, Grid, TextField} from "@mui/material";
import {MenuItem} from "@material-ui/core";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DatePicker from "@mui/lab/DatePicker";
import moment from "moment";
import InsuranceApi from "../../Service/InsuranceApi";

const PolicyCoverEdit = ({getAll,close,record, setRecord,company, policyHeader, status, coverages}) => {
    const editChange = (e) => {
        const { name, value } = e.target;
        setRecord({ ...record, [name]: value });
    };


    const changeRiskDate = (date) => {
        setRecord({ ...record, riskEndDate: date });
    };

    const changePremiumDate = (date) => {
        setRecord({ ...record, premiumEndDate: date });
    };

    const formEdit = (id) => {

        const body={
            id:record.id,
            policyHeaderId: record.policyHeaderId,
            policyNumber:record.policyNumber,
            companyId:record.companyId,
            life:record.life,
            rider:record.rider,
            coverage:record.coverage,
            coverageNameId: record.coverageNameId,
            instantPremium: record.instantPremium,
            sumAssured: record.sumAssured,
            riskEndDate: moment(record.riskEndDate).format("MM-DD-YYYY"),
            premiumEndDate: moment(record.premiumEndDate).format("MM-DD-YYYY"),
            coverageStatusId:record.coverageStatusId,
            policyStatusId: record.policyStatusId
        }
        InsuranceApi.updatePolicyCover(id, body).then((res) => {
            close()
            getAll()
        }).catch(err => console.log(err))
    }

    return (
        <div>
            <form autoComplete="off">
                <Box sx={{flexGrow:1}}>
                    <Grid container spacing={2}>

                        <Grid item xs={8} md={6} lg={4}>
                            <TextField
                                select
                                fullWidth
                                className="formtext"
                                margin="dense"
                                variant="outlined"
                                placeholder="Enter Policy header "
                                value={record.policyHeaderId}
                                name="policyHeaderId"
                                label=" Policy Header"
                                onChange={(e) => editChange(e)}
                                required
                            >
                                {
                                    policyHeader.map((val) => (
                                        <MenuItem value={val.id}> {val.policyNumber} </MenuItem>
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
                                placeholder="Enter policy number"
                                value={record.policyNumber}
                                name="policyNumber"
                                label=" Policy Number "
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
                                placeholder="Enter Company ID "
                                value={record.companyId}
                                name="companyId"
                                label=" Company ID"
                                onChange={(e) => editChange(e)}
                                required
                            >
                                {
                                    company.map((val) => (
                                        <MenuItem value={val.companyId}> {val.companyName} </MenuItem>
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
                                placeholder="Enter life"
                                value={record.life}
                                name="life"
                                label=" Life "
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
                                placeholder="Enter Rider"
                                value={record.rider}
                                name="rider"
                                label=" Rider "
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
                                placeholder="Enter Coverage"
                                value={record.coverage}
                                name="coverage"
                                label=" Coverage "
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
                                placeholder="Enter Coverage Name"
                                value={record.coverageNameId}
                                name="coverageNameId"
                                label=" Coverage Name "
                                onChange={(e) => editChange(e)}
                                required
                            >
                                {
                                    coverages.map((val) => (
                                        <MenuItem value={val.id}> {val.statusCode}-{val.statusDesc} </MenuItem>
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
                                placeholder="Enter Instant premium"
                                value={record.instantPremium}
                                name="instantPremium"
                                label=" Instant Premium "
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
                                placeholder="Enter Sum Assured"
                                value={record.sumAssured}
                                name="sumAssured"
                                label=" Sum Assured "
                                onChange={(e) => editChange(e)}
                                required
                            />
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
                                        label="Risk End Date"
                                        placeholder="Enter risk end date"
                                        fullWidth
                                        value={record.riskEndDate}
                                        onChange={(date) => changeRiskDate(date)}
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
                                        label="Premium End Date"
                                        placeholder="Enter premium end date"
                                        fullWidth
                                        value={record.premiumEndDate}
                                        onChange={(date) => changePremiumDate(date)}
                                        renderInput={(params) => <TextField {...params} required />}
                                    />
                                </LocalizationProvider>
                            </FormControl>
                        </Grid>


                        <Grid item xs={8} md={6} lg={4}>
                            <TextField
                                select
                                fullWidth
                                className="formtext"
                                margin="dense"
                                variant="outlined"
                                placeholder="Enter C Status"
                                value={record.coverageStatusId}
                                name="coverageStatusId"
                                label=" Coverage status"
                                onChange={(e) => editChange(e)}
                                required
                            >
                                {
                                    status.map((val) => (
                                        <MenuItem value={val.id}> {val.statusCode} - {val.statusDesc} </MenuItem>
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
                                placeholder="Enter P Status"
                                value={record.policyStatusId}
                                name="policyStatusId"
                                label=" Premium Status"
                                onChange={(e) => editChange(e)}
                                required
                            >
                                {
                                    status.map((val) => (
                                        <MenuItem value={val.id}> {val.statusCode} - {val.statusDesc} </MenuItem>
                                    ))
                                }
                            </TextField>
                        </Grid>
                    </Grid>
                </Box>

                <div style={{display: "flex", margin:20}}>
                    <Button
                        onClick={() => formEdit(record.id)}
                        color="primary"
                        variant="contained"> Save </Button>

                    <Button
                        color="error" variant="contained" style={{marginLeft:20}} onClick={() => close()}> Cancel </Button>
                </div>
            </form>

        </div>
    );
};

export default PolicyCoverEdit;
