import React, {useState} from 'react';
import { Button, TextField} from "@mui/material";
import "../Css/Content.css"
import {Box, Grid, MenuItem} from "@material-ui/core";
import InsuranceApi from "../../Service/InsuranceApi";

const TrainingCostAdd = ({currencies, getAll, open, close, fromModuleClose}) => {


    const [baseFee, setBaseFee] = useState("");
    const [trainerFee, setTrainerFee] = useState("");
    const [venueFee, setVenueFee] = useState("");
    const [currency, setCurrency] = useState("");
    const [payBeforeDays, setPayBeforeDays] = useState("");


    const formSubmit = () => {

        const body = {baseFee, trainerFee, venueFee, currency, payBeforeDays}
        InsuranceApi.addTrainingCost(body).then((res) => {
            if(open === true){
                close()
                getAll()
            }
            else{
                fromModuleClose()
            }
        }).catch(err => console.log(err))


    }

    return (
        <div>
            <br/>
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
                                value={baseFee}
                                label="Base Fee"
                                onChange={(e) => setBaseFee(e.target.value)}
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
                                value={trainerFee}
                                label="Trainer Fee"
                                onChange={(e) => setTrainerFee(e.target.value)}
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
                                value={venueFee}
                                label="Venue Fee"
                                onChange={(e) => setVenueFee(e.target.value)}
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
                                value={currency}
                                label="Currency"
                                onChange={(e) => setCurrency(e.target.value)}
                                required
                            >
                                {
                                    currencies?.map((val) => (
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
                                value={payBeforeDays}
                                label="Pay Days"
                                onChange={(e) => setPayBeforeDays(e.target.value)}
                                required
                            />
                        </Grid>
                    </Grid>
                </Box>

                <div style={{display: "flex", margin:20}}>
                    <Button
                        onClick={() => formSubmit()}
                        color="primary"
                        variant="contained"> Save </Button>

                    { open === true ?  <Button
                        color="error" variant="contained" style={{marginLeft: 20}}
                        onClick={() => close()}> Cancel </Button> : null }
                </div>

            </form>
        </div>
    );
};

export default TrainingCostAdd;
