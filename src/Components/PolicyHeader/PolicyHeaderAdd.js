import React, {useState} from 'react';
import InsuranceApi from "../../Service/InsuranceApi";
import {Box, Button, FormControl, Grid, TextField} from "@mui/material";
import {MenuItem} from "@material-ui/core";
import moment from "moment";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DatePicker from "@mui/lab/DatePicker";



const PolicyHeaderAdd = ({getAll, close, company, agent, currencies, status, products}) => {

    const [companyId, setCompanyId] = useState("");
    const [agentId, setAgentId] = useState("");
    const [policyNumber, setPolicyNumber] = useState("");
    const [premium, setPremium] = useState("");
    const [coverageStatusId, setCoverageStatusId] = useState("");
    const [coveragePolicyStatusId, setCoveragePolicyStatusId] = useState("");
    const [startdate, setStartdate] = useState("");
    const [billdate, setBilldate] = useState("");
    const [paiddate, setPaiddate] = useState("");
    const [currency, setCurrency] = useState("");
    const [productId, setProductId] = useState("");




    const formSubmit = (e) => {
        e.preventDefault()
        const startDate = moment(startdate).format("MM-DD-YYYY")
        const billDate = moment(billdate).format("MM-DD-YYYY")
        const paidDate = moment(paiddate).format("MM-DD-YYYY")

        const body = {companyId, agentId, policyNumber, premium, coverageStatusId, coveragePolicyStatusId, startDate, billDate, paidDate, productId, currency }

        InsuranceApi.addPolicyHeader(body).then((res) => {
            close()
            getAll()
        }).catch(err => console.log(err))

    }

    return (
        <div>

            <form autoComplete="off" onSubmit={formSubmit}>
                <Box sx={{flexGrow:1}}>
                    <Grid container spacing={2}>

                        <Grid item xs={8} md={6} lg={4}>
                            <TextField
                                fullWidth
                                className="formtext"
                                margin="dense"
                                variant="outlined"
                                placeholder="Enter Policy Number"
                                value={policyNumber}
                                name="policyNumber"
                                label=" Policy Number"
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
                                select
                                fullWidth
                                className="formtext"
                                margin="dense"
                                variant="outlined"
                                placeholder="Enter Agent ID "
                                value={agentId}
                                name="agentId"
                                label=" Agent ID"
                                onChange={(e) => setAgentId(e.target.value)}
                                required
                            >
                                {
                                    agent.map((val) => (
                                        <MenuItem value={val.id}> {val.client?.givenName}</MenuItem>
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
                                placeholder="Enter Premium"
                                value={premium}
                                name="premium"
                                label=" Premium"
                                onChange={(e) => setPremium(e.target.value)}
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
                                placeholder="Enter Coverage Status"
                                value={coverageStatusId}
                                name="CoverageStatusId"
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
                                placeholder="Enter premium  Status"
                                value={coveragePolicyStatusId}
                                name="CoveragePolicyStatusId"
                                label=" Premium Status"
                                onChange={(e) => setCoveragePolicyStatusId(e.target.value)}
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
                            <FormControl
                                style={{ marginTop: "0.5rem" }}
                                className="formtext"
                                fullWidth
                            >
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                        inputFormat="dd/MM/yyyy"
                                        label="Start Date"
                                        placeholder="Enter Start Date"
                                        fullWidth
                                        value={startdate}
                                        onChange={(date) => setStartdate(date)}
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
                                        label="Bill Date"
                                        placeholder="Enter Bill Date"
                                        fullWidth
                                        value={billdate}
                                        onChange={(date) => setBilldate(date)}
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
                                        label="Paid Date"
                                        placeholder="Enter Paid Date"
                                        fullWidth
                                        value={paiddate}
                                        onChange={(date) => setPaiddate(date)}
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
                                placeholder="Enter Policy Currency  "
                                value={currency}
                                name="currency"
                                label=" Currency "
                                onChange={(e) => setCurrency(e.target.value)}
                                required
                            >
                                {
                                    currencies.map((val) => (
                                        <MenuItem value={val.id}> {val.currencyCode}</MenuItem>
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
                                placeholder="Enter Product"
                                value={productId}
                                name="productId"
                                label=" Product"
                                onChange={(e) => setProductId(e.target.value)}
                                required
                            >
                                {
                                    products.map((val) => (
                                        <MenuItem value={val.id}> {val.statusCode}-{val.statusDesc} </MenuItem>
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

export default PolicyHeaderAdd;
