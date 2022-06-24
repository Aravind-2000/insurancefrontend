import React from 'react';
import {Box, Button, FormControl, Grid, TextField} from "@mui/material";
import {MenuItem} from "@material-ui/core";
import InsuranceApi from "../../Service/InsuranceApi";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DatePicker from "@mui/lab/DatePicker";
import moment from "moment";

const ReceiptBookEdit = ({record, setRecord, getAll, close, agent, method, currencies}) => {


    const editChange = (e) => {
        const { name, value } = e.target;
        setRecord({ ...record, [name]: value });
    };

    const changeStartDate = (date) => {
        setRecord({ ...record, receiptDate: date });
    };


    const formEdit = (id) => {
        const body = {
            agentId: record.agentId,
            receiptNo: record.receiptNo,
            receiptDate: moment(record.receiptDate).format("MM-DD-YYYY"),
            originalReceiptCurrencyId: record.originalReceiptCurrencyId,
            receiptMethod: record.receiptMethod,
            totalReceiptAmount: record.totalReceiptAmount
        }
        InsuranceApi.updatereceiptbook(id, body).then((res) => {
            getAll()
            close()
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
                                placeholder="Enter Agent ID"
                                value={record.agentId}
                                name="agentId"
                                label=" Agent ID"
                                onChange={(e) => editChange(e)}
                                required
                            >
                                {
                                    agent.map((val) => (
                                        <MenuItem value={val.id}> {val.id} - {val.client?.givenName}  </MenuItem>
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
                                placeholder="Enter Receipt Number"
                                value={record.receiptNo}
                                name="agentId"
                                label=" Receipt No"
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
                                        label="Receipt Date"
                                        placeholder="Enter the date of receipt"
                                        fullWidth
                                        value={record.receiptDate}
                                        onChange={(date) => changeStartDate(date)}
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
                                placeholder="Enter the Original Currency"
                                value={record.originalReceiptCurrencyId}
                                name="originalReceiptCurrencyId"
                                label=" Currency"
                                onChange={(e) => editChange(e)}
                                required
                            >
                                {
                                    currencies.map((val) => (
                                        <MenuItem value={val.id}> {val.currencyCode}  </MenuItem>
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
                                placeholder="Enter the receipt Method"
                                value={record.receiptMethod}
                                name="receiptMethod"
                                label=" Receipt Method"
                                onChange={(e) => editChange(e)}
                                required
                            >
                                {
                                    method.map((val) => (
                                        <MenuItem value={val}> {val}  </MenuItem>
                                    ))
                                }
                            </TextField>
                        </Grid>

                        <Grid item xs={8} md={6} lg={4}>
                            <TextField
                                type="number"
                                fullWidth
                                className="formtext"
                                margin="dense"
                                variant="outlined"
                                placeholder="Enter Total Receipt Amount"
                                value={record.totalReceiptAmount}
                                name="totalReceiptAmount"
                                label=" Receipt Amount"
                                onChange={(e) => editChange(e)}
                            />
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

export default ReceiptBookEdit;
