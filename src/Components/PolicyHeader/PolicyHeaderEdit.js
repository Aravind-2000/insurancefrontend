import React from 'react';
import {Box, Button, FormControl, Grid, TextField} from "@mui/material";
import {MenuItem} from "@material-ui/core";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DatePicker from "@mui/lab/DatePicker";
import moment from "moment";
import InsuranceApi from "../../Service/InsuranceApi";

const PolicyHeaderEdit = ({getAll, close, company, agent, currencies, record, setRecord, status, products}) => {

    const editChange = (e) => {
        const { name, value } = e.target;
        setRecord({ ...record, [name]: value });
    };


    const changeStartDate = (date) => {
        setRecord({ ...record, startDate: date });
    };

    const changeBillDate = (date) => {
        setRecord({ ...record, billDate: date });
    };

    const changePaidDate = (date) => {
        setRecord({ ...record, paidDate: date });
    };

    const formEdit = (id) => {
        const body = {
            id:record.id,
            companyId:record.companyId,
            agentId:record.agentId,
            policyNumber:record.policyNumber,
            premium:record.premium,
            coverageStatusId:record.coverageStatusId,
            coveragePolicyStatusId:record.coveragePolicyStatusId,
            startDate:moment(record.startDate).format("MM-DD-YYYY"),
            billDate:moment(record.billDate).format("MM-DD-YYYY"),
            paidDate:moment(record.paidDate).format("MM-DD-YYYY"),
            currency:record.currency,
            productId:record.productId
        }

        InsuranceApi.updatePolicyHeader(id, body).then((res) => {
            close()
            getAll()
        }).catch(err => console.log(err))

    }

    return (
        <div>

            <form autoComplete="off">
                <Box sx={{flexGrow:1}}>
                    <Grid container spacing={2}>
                            <TextField
                                fullWidth
                                className="formtext"
                                value={record?.id}
                                name="id"
                                required
                                hidden
                            />
                        <Grid item xs={8} md={6} lg={4}>
                            <TextField
                                fullWidth
                                className="formtext"
                                margin="dense"
                                variant="outlined"
                                placeholder="Enter Policy Number"
                                value={record?.policyNumber}
                                name="policyNumber"
                                label=" Policy Number"
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
                                value={record?.companyId}
                                name="companyId"
                                label=" Company ID"
                                onChange={(e) => editChange(e)}
                                required
                            >
                                {
                                    company?.map((val) => (
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
                                value={record?.agentId}
                                name="agentId"
                                label=" Agent ID"
                                onChange={(e) => editChange(e)}
                                required
                            >
                                {
                                    agent?.map((val) => (
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
                                value={record?.premium}
                                name="premium"
                                label=" Premium"
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
                                placeholder="Enter C Status"
                                value={record?.coverageStatusId}
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
                                placeholder="Enter CP Status"
                                value={record?.coveragePolicyStatusId}
                                name="coveragePolicyStatusId"
                                label=" Coverage Policy Status"
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
                                        value={record?.startDate}
                                        onChange={(date) => changeStartDate(date)}
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
                                        value={record?.billDate}
                                        onChange={(date) => changeBillDate(date)}
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
                                        value={record?.paidDate}
                                        onChange={(date) => changePaidDate(date)}
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
                                value={record?.currency}
                                name="currency"
                                label=" Currency "
                                onChange={(e) => editChange(e)}
                                required
                            >
                                {
                                    currencies?.map((val) => (
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
                                value={record?.productId}
                                name="productId"
                                label=" Product"
                                onChange={(e) => editChange(e)}
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

export default PolicyHeaderEdit;
