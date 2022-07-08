import React, {useState} from 'react';
import InsuranceApi from "../../Service/InsuranceApi";
import {Box, Button, FormControl, Grid, TextField} from "@mui/material";
import {MenuItem} from "@material-ui/core";
import moment from "moment";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DatePicker from "@mui/lab/DatePicker";

const PolicyCoverAdd = ({company, policyHeader, getAll, close, open1,close1, status, headerId, policyNumber1, companyId1, coverages}) => {


    const [policyHeaderId, setPolicyHeaderId] = useState(open1 === true ? headerId : "");
    const [policyNumber, setPolicyNumber] = useState(open1 === true ? policyNumber1 : "");
    const [companyId, setCompanyId] = useState(open1 === true ? companyId1 : "" );
    const [life, setLife] = useState("");
    const [rider, setRider] = useState("");
    const [coverage, setCoverage] = useState("");
    const [coverageNameId, setCoverageNameId] = useState("");
    const [instantPremium, setInstantPremium] = useState("");
    const [sumAssured, setSumAssured] = useState("");
    const [riskEnddate, setRiskEnddate] = useState("");
    const [premiumEnddate, setPremiumEnddate] = useState("");
    const [coverageStatusId, setCoverageStatusId] = useState("");
    const [policyStatusId, setpolicyStatusId] = useState("");


    const onChangePolicyNumber = (value) => {
        setPolicyHeaderId(value);
        InsuranceApi.getPolicyHeader(value).then((res) => {
            setCompanyId(res.data.companyId);
            setPolicyNumber(res.data.policyNumber)
        }).catch(err => console.log(err))
    }

    const formSubmit = (e) => {
        e.preventDefault()
        const riskEndDate = moment(riskEnddate).format("MM-DD-YYYY")
        const premiumEndDate = moment(premiumEnddate).format("MM-DD-YYYY")

        const body = {policyHeaderId, policyNumber, companyId, riskEndDate, premiumEndDate, policyStatusId, coverageStatusId, life, rider, coverageNameId, coverage, instantPremium, sumAssured}
        InsuranceApi.addPolicyCover(body).then((res) => {

            if(open1 === true){
                close1()
            }
            else{
                close()
                getAll()
            }
        }).catch(err => console.log(err))


    }


    return (
        <div>
            <form autoComplete="off" onSubmit={formSubmit}>
                <Box sx={{flexGrow:1}}>
                    <Grid container spacing={2}>

                        <Grid item xs={8} md={6} lg={4}>
                            <TextField
                                select
                                fullWidth
                                className="formtext"
                                margin="dense"
                                variant="outlined"
                                placeholder="Enter Policy header id "
                                value={policyHeaderId}
                                name="policyHeaderId"
                                label=" Policy Header"
                                onChange={(e) => onChangePolicyNumber(e.target.value)}
                                required
                            >
                                {
                                    policyHeader.map((val) => (
                                        <MenuItem value={val.id}> {val.id} - {val.policyNumber} </MenuItem>
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
                                value={policyNumber}
                                name="policyNumber"
                                label=" Policy Number "
                                onChange={(e) => setPolicyNumber(e.target.value)}
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
                                value={companyId}
                                name="companyId"
                                label=" Company ID"
                                onChange={(e) => setCompanyId(e.target.value)}
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
                                value={life}
                                name="life"
                                label=" Life "
                                onChange={(e) => setLife(e.target.value)}
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
                                value={rider}
                                name="rider"
                                label=" Rider "
                                onChange={(e) => setRider(e.target.value)}
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
                                value={coverage}
                                name="coverage"
                                label=" Coverage "
                                onChange={(e) => setCoverage(e.target.value)}
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
                                placeholder="Enter Coverage Name"
                                value={coverageNameId}
                                name="coverageNameId"
                                label=" Coverage Name "
                                onChange={(e) => setCoverageNameId(e.target.value)}
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
                                value={instantPremium}
                                name="instantPremium"
                                label=" Instant Premium "
                                onChange={(e) => setInstantPremium(e.target.value)}
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
                                value={sumAssured}
                                name="sumAssured"
                                label=" Sum Assured "
                                onChange={(e) => setSumAssured(e.target.value)}
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
                                        value={riskEnddate}
                                        onChange={(date) => setRiskEnddate(date)}
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
                                        value={premiumEnddate}
                                        onChange={(date) => setPremiumEnddate(date)}
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
                                placeholder="Enter Coverage Status"
                                value={coverageStatusId}
                                name="coverageStatusId"
                                label=" Coverage status"
                                onChange={(e) => setCoverageStatusId(e.target.value)}
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
                                placeholder="Enter Premium Status"
                                value={policyStatusId}
                                name="policyStatusId"
                                label=" Premium Status"
                                onChange={(e) => setpolicyStatusId(e.target.value)}
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

export default PolicyCoverAdd;
