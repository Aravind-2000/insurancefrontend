import React, {useState} from 'react';
import InsuranceApi from "../../Service/InsuranceApi";
import {Box, Button,  Grid, TextField} from "@mui/material";

const AddTransactionCode = ({ close, close1, add1, getAll}) => {

    const [transactionCode, setTransactionCode] = useState("");
    const [transactionDesc, setTransactionDesc] = useState("");


    const formSubmit = (e) => {
        e.preventDefault()
        const body = {transactionCode, transactionDesc}
        InsuranceApi.addTransCode(body).then((res) => {
            if(add1 === true){
                close1()
            }
            else{
                getAll()
                close()
            }
        })
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
                            placeholder="Enter Transaction Code"
                            value={transactionCode}
                            name="transactionCode"
                            label=" Transaction Code"
                            onChange={(e) => setTransactionCode(e.target.value)}
                        />

                        <br/>

                        <TextField
                            fullWidth
                            className="formtext"
                            margin="dense"
                            variant="outlined"
                            placeholder="Enter Transaction Description"
                            value={transactionDesc}
                            name="transactionDesc"
                            label=" Transaction Description"
                            onChange={(e) => setTransactionDesc(e.target.value)}
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

export default AddTransactionCode;
