import React, {useState} from 'react';
import InsuranceApi from "../../Service/InsuranceApi";
import {Box, Button, FormControl, Grid, TextField} from "@mui/material";
import {MenuItem} from "@material-ui/core";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DatePicker from "@mui/lab/DatePicker";
import moment from "moment";

const ReceiptBookAdd = ({getAll, close, agent, method, currencies}) => {


    const [agentId, setAgentId] = useState("");
    const [receiptNo, setReceiptNo] = useState("");
    const [receiptdate, setReceiptDate] = useState("");
    const [originalReceiptCurrencyId, setOriginalReceiptCurrencyId] = useState("");
    const [receiptMethod, setReceiptMethod] = useState("");
    const [totalReceiptAmount, setTotalReceiptAmount] = useState("");


    const formSubmit = (e) => {
        e.preventDefault()
        const receiptDate = moment(receiptdate).format("MM-DD-YYYY")
        const body={
            agentId, receiptNo, receiptDate, originalReceiptCurrencyId, receiptMethod, totalReceiptAmount
        }
        InsuranceApi.addreceiptbook(body).then((res) => {
            getAll()
            close()
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
                                placeholder="Enter Agent ID"
                                value={agentId}
                                name="agentId"
                                label=" Agent ID"
                                onChange={(e) => setAgentId(e.target.value)}
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
                                value={receiptNo}
                                name="agentId"
                                label=" Receipt No"
                                onChange={(e) => setReceiptNo(e.target.value)}
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
                                        value={receiptdate}
                                        onChange={(date) => setReceiptDate(date)}
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
                                value={originalReceiptCurrencyId}
                                name="originalReceiptCurrencyId"
                                label=" Currency"
                                onChange={(e) => setOriginalReceiptCurrencyId(e.target.value)}
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
                                value={receiptMethod}
                                name="receiptMethod"
                                label=" Receipt Method"
                                onChange={(e) => setReceiptMethod(e.target.value)}
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
                                value={totalReceiptAmount}
                                name="totalReceiptAmount"
                                label=" Receipt Amount"
                                onChange={(e) => setTotalReceiptAmount(e.target.value)}
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

export default ReceiptBookAdd;
