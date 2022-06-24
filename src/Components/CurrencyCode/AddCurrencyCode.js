import React,{useEffect, useState} from 'react';
import InsuranceApi from "../../Service/InsuranceApi";
import {Box, Button, FormControl, Grid,  TextField} from "@mui/material";
import { MenuItem} from "@material-ui/core";


const AddCurrencyCode = ({getAll, close}) => {

    const [currencyCode, setCurrencyCode] = useState("");
    const [currencyDescription, setCurrencyDescription] = useState("");
    
    const formSubmit = () => {
        const body = { currencyCode ,currencyDescription}
        InsuranceApi.addCurrCode(body).then((res) => {
            getAll()
            close()
        }).catch(err => console.log(err))
    }


    return (
        <div>
            <form autoComplete="off" onSubmit={formSubmit} >
                <Box sx={{flexGrow:1}}>
                    <Grid container spacing={2}>
                            <TextField
                                fullWidth
                                className="formtext"
                                margin="dense"
                                variant="outlined"
                                placeholder="Enter Currency Code "
                                value={currencyCode}
                                name="currencyCode"
                                label="Code"
                                onChange={(e) => setCurrencyCode(e.target.value)}
                                required
                            />
                        <br/>
                            <TextField
                                fullWidth
                                className="formtext"
                                margin="dense"
                                variant="outlined"
                                placeholder="Enter Currency Description "
                                value={currencyDescription}
                                name="currencyDescription"
                                label="Description"
                                onChange={(e) => setCurrencyDescription(e.target.value)}
                                required
                            />

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

export default AddCurrencyCode;
