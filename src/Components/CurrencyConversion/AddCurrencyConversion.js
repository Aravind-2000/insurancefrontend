import React,{useState} from 'react';
import InsuranceApi from "../../Service/InsuranceApi";
import {Box, Button, FormControl,  Grid, TextField} from "@mui/material";
import { MenuItem} from "@material-ui/core";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DatePicker from "@mui/lab/DatePicker";
import moment from "moment";

const AddCurrencyConversion = ({codes, getAll, close}) => {

    const [slUniqueNumber, setSlUniqueNumber] = useState("");
    const [originalCurrencyCode, setOriginalCurrencyCode] = useState("");
    const [originalCurrencyUnit, setOriginalCurrencyUnit] = useState(1);
    const [accountCurrencyCode, setAccountCurrencyCode] = useState("");
    const [exchangeRate, setExchangeRate] = useState("");
    const [startdate, setStartDate] = useState("");
    const [enddate, setEndDate] = useState("");


    const formSubmit = (e) => {
        e.preventDefault()
        const startDate = moment(startdate).format("MM-DD-YYYY")
        const endDate = moment(enddate).format("MM-DD-YYYY")

        const body = {
            slUniqueNumber, originalCurrencyCode, accountCurrencyCode, originalCurrencyUnit, exchangeRate, startDate, endDate
        }
        InsuranceApi.addCurrConv(body).then((res) => {
            getAll()
            close()
        }).catch(err => console.log(err))

    }


    return (
        <div>
            <form autoComplete="off" onSubmit={formSubmit} >
                <Box sx={{flexGrow:1}}>
                    <Grid container spacing={2}>
                        <Grid item xs={8} md={6} lg={4}>
                            <TextField
                                fullWidth
                                className="formtext"
                                margin="dense"
                                variant="outlined"
                                placeholder="Enter Sl Unique Number"
                                value={slUniqueNumber}
                                name="slUniqueNumber"
                                label=" Unique No"
                                onChange={(e) => setSlUniqueNumber(e.target.value)}
                            />
                        </Grid>

                        <Grid item xs={8} md={6} lg={4}>
                            <TextField
                                select
                                fullWidth
                                className="formtext"
                                margin="dense"
                                variant="outlined"
                                placeholder="Enter Original Currency"
                                value={originalCurrencyCode}
                                name="originalCurrencyCode"
                                label=" Original Currency"
                                onChange={(e) => setOriginalCurrencyCode(e.target.value)}
                                required
                            >
                                {
                                    codes.map((val) => (
                                        <MenuItem value={val.id}> {val.currencyCode} </MenuItem>
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
                                placeholder="Enter original currency unit"
                                value={originalCurrencyUnit}
                                name="originalCurrencyUnit"
                                label="Original Unit"
                                onChange={(e) => setOriginalCurrencyUnit(e.target.value)}
                            />
                        </Grid>


                        <Grid item xs={8} md={6} lg={4}>
                            <TextField
                                select
                                fullWidth
                                className="formtext"
                                margin="dense"
                                variant="outlined"
                                placeholder="Enter Account Currency"
                                value={accountCurrencyCode}
                                name="accountCurrencyCode"
                                label=" Account Currency"
                                onChange={(e) => setAccountCurrencyCode(e.target.value)}
                                required
                            >
                                {
                                    codes.map((val) => (
                                        <MenuItem value={val.id}> {val.currencyCode} </MenuItem>
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
                                placeholder="Enter Exchange Rate"
                                value={exchangeRate}
                                name="exchangeRate"
                                label="Exchange Rate"
                                onChange={(e) => setExchangeRate(e.target.value)}
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
                                        label="Start Date"
                                        placeholder="Conversion End Date"
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
                                        placeholder="Conversion End Date"
                                        fullWidth
                                        value={enddate}
                                        onChange={(date) => setEndDate(date)}
                                        renderInput={(params) => <TextField {...params} required />}
                                    />
                                </LocalizationProvider>
                            </FormControl>
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

export default AddCurrencyConversion;
