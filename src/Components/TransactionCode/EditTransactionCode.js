import React from 'react';
import {Box, Button, FormControl, Grid, TextField} from "@mui/material";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import {DateTimePicker} from "@mui/lab";
import moment from "moment";
import InsuranceApi from "../../Service/InsuranceApi";

const EditTransactionCode = ({record, setRecord, getAll, close}) => {

    const editChange = (e) => {
        const { name, value } = e.target;
        setRecord({ ...record, [name]: value });
    };

    const transDate = (date) => {
        setRecord({ ...record, transactionDate: date });
    };

    const formEdit  = (id) => {
        const body = {
            transactionCode: record.transactionCode,
            transactionDesc: record.transactionDesc,
            transactionDate: moment(record.transactionDate).format("MM-DD-YYYY HH:mm")
        }
        InsuranceApi.updateTransCode(id, body).then((res) => {
            getAll()
            close()
        })
    }

    return (
        <div>
            <form autoComplete="off"  >
                <Box sx={{flexGrow:1}}>
                    <Grid container spacing={2}>

                        <TextField
                            fullWidth
                            className="formtext"
                            margin="dense"
                            variant="outlined"
                            placeholder="Enter Transaction Code"
                            value={record.transactionCode}
                            name="transactionCode"
                            label=" Transaction Code"
                            onChange={(e) => editChange(e)}
                            required
                        />

                        <br/>

                        <TextField
                            fullWidth
                            className="formtext"
                            margin="dense"
                            variant="outlined"
                            placeholder="Enter Transaction Description"
                            value={record.transactionDesc}
                            name="transactionDesc"
                            label=" Transaction Description"
                            onChange={(e) => editChange(e)}
                            required
                        />

                        <br/>

                        <FormControl
                            style={{ marginTop: "0.5rem" }}
                            className="formtext"
                            fullWidth
                        >
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DateTimePicker
                                    inputFormat="dd-MM-yyyy HH:mm"
                                    label="Transaction Date and Time"
                                    placeholder="Transaction Date and Time"
                                    fullWidth
                                    value={record.transactionDate}
                                    onChange={(date) => transDate(date)}
                                    renderInput={(params) => <TextField {...params} required />}
                                />
                            </LocalizationProvider>
                        </FormControl>

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

export default EditTransactionCode;
