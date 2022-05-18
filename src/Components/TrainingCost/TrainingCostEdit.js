import React from 'react';
import {Box, Grid, MenuItem} from "@material-ui/core";
import {Button, TextField} from "@mui/material";
import InsuranceApi from "../../Service/InsuranceApi";

const TrainingCostEdit = ({getAll, close, record, setRecord, currencies }) => {


    const editChange = (e) =>{
        const { value, name } = e.target;
        setRecord({ ...record, [name]: value });
    }

    const formSubmit = (id) => {

        const body = {
            baseFee: record.baseFee,
            trainerFee: record.trainerFee,
            venueFee: record.venueFee,
            payBeforeDays: record.payBeforeDays,
            currency: record.currency
        }
        InsuranceApi.updateTrainingCost(id, body).then((res) => {
            getAll()
            close()
        }).catch(err => console.log(err))

    }




    return (
        <div>

            <form autoComplete="off" >
                <Box sx={{flexGrow: 1}}>
                    <Grid container spacing={2}>
                        <Grid item xs={8} md={6} lg={4}>
                            <TextField
                                fullWidth
                                className="formtext"
                                margin="dense"
                                variant="outlined"
                                placeholder="Enter Base Fee "
                                value={record?.baseFee}
                                name="baseFee"
                                label="Base Fee"
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
                                placeholder="Enter Trainer Fee "
                                value={record?.trainerFee}
                                name="trainerFee"
                                label="Trainer Fee"
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
                                placeholder="Enter Venue Topic "
                                value={record?.venueFee}
                                label="Venue Fee"
                                name="venueFee"
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
                                placeholder="Enter Currency Type "
                                value={record?.currency}
                                name="currency"
                                label="Currency"
                                onChange={(e) => editChange(e)}
                                required
                            >
                                {
                                    currencies.map((val) => (
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
                                placeholder="Enter No of days before to pay "
                                value={record?.payBeforeDays}
                                name="payBeforeDays"
                                label="Pay Days"
                                onChange={(e) => editChange(e)}
                                required
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

export default TrainingCostEdit;
