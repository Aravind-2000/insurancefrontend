import React from 'react';
import {Box, Button, FormControl, Grid, TextField} from "@mui/material";
import {MenuItem} from "@material-ui/core";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DatePicker from "@mui/lab/DatePicker";
import moment from "moment";
import InsuranceApi from "../../Service/InsuranceApi";

const EditCurrencyConversion = ({record, setRecord, getAll, close, codes}) => {


    const editChange = (e) => {
        const { name, value } = e.target;
        setRecord({ ...record, [name]: value });
    };

    const editStartDate = (date) => {
        setRecord({ ...record, startDate: date });
    };
    const editEndDate = (date) => {
        setRecord({ ...record, endDate: date });
    };


    const editSubmit = (id) => {
        const body = {
            slUniqueNumber: record.slUniqueNumber,
            originalCurrencyCode: record.originalCurrencyCode,
            originalCurrencyUnit: record.originalCurrencyUnit,
            accountCurrencyCode: record.accountCurrencyCode,
            exchangeRate: record.exchangeRate,
            startDate: moment(record.startDate).format("MM-DD-YYYY"),
            endDate: moment(record.endDate).format("MM-DD-YYYY")
        }
        InsuranceApi.updateCurrConv(id, body).then((res) => {
            getAll()
            close()
        }).catch(err => console.log(err))

    }

    return (
        <div>
            <form autoComplete="off"  >
                <Box sx={{flexGrow:1}}>
                    <Grid container spacing={2}>
                        <Grid item xs={8} md={6} lg={4}>
                            <TextField
                                fullWidth
                                className="formtext"
                                margin="dense"
                                variant="outlined"
                                placeholder="Enter Sl Unique Number"
                                value={record.slUniqueNumber}
                                name="slUniqueNumber"
                                label=" Unique No"
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
                                placeholder="Enter Original Currency"
                                value={record.originalCurrencyCode}
                                name="originalCurrencyCode"
                                label=" Original Currency"
                                onChange={(e) => editChange(e)}
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
                                value={record.originalCurrencyUnit}
                                name="originalCurrencyUnit"
                                label="Original Unit"
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
                                placeholder="Enter Account Currency"
                                value={record.accountCurrencyCode}
                                name="accountCurrencyCode"
                                label=" Account Currency"
                                onChange={(e) => editChange(e)}
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
                                value={record.exchangeRate}
                                name="exchangeRate"
                                label="Exchange Rate"
                                onChange={(e) => editChange(e)}
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
                                        value={record.startDate}
                                        onChange={(date) => editStartDate(date)}
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
                                        value={record.endDate}
                                        onChange={(date) =>editEndDate(date) }
                                        renderInput={(params) => <TextField {...params} required />}
                                    />
                                </LocalizationProvider>
                            </FormControl>
                        </Grid>
                    </Grid>
                </Box>
                <div style={{display: "flex", margin:20}}>
                    <Button
                        onClick={() => editSubmit(record.id)}
                        color="primary"
                        variant="contained"> Save </Button>

                    <Button
                        color="error" variant="contained" style={{marginLeft:20}} onClick={() => close()}> Cancel </Button>
                </div>
            </form>


        </div>
    );
};

export default EditCurrencyConversion;
