import React from 'react';
import {Box, Button, Grid, TextField} from "@mui/material";
import InsuranceApi from "../../Service/InsuranceApi";

const EditCurrencyCode = ({record, setRecord, getAll, close}) => {


    const editChange = (e) => {
        const { name, value } = e.target;
        setRecord({ ...record, [name]: value });
    };


    const formEdit = (id) => {
       const body = {
           currencyCode: record.currencyCode,
           currencyDescription: record.currencyDescription
       }
       InsuranceApi.updateCurrCode(id,body).then((res) => {
           getAll()
           close()
       }).catch(err => console.log(err))
    }

    return (
        <div>
            <form autoComplete="off" >
                <Box sx={{flexGrow:1}}>
                    <Grid container spacing={2}>
                        <TextField
                            fullWidth
                            className="formtext"
                            margin="dense"
                            variant="outlined"
                            placeholder="Enter Currency Code "
                            value={record?.currencyCode}
                            name="currencyCode"
                            label="Code"
                            onChange={(e) => editChange(e)}
                            required
                        />
                        <br/>
                        <TextField
                            fullWidth
                            className="formtext"
                            margin="dense"
                            variant="outlined"
                            placeholder="Enter Currency Description "
                            value={record?.currencyDescription}
                            name="currencyDescription"
                            label="Description"
                            onChange={(e) =>  editChange(e)}
                            required
                        />

                    </Grid>
                </Box>
                <div style={{display: "flex", margin:20}}>
                    <Button
                        color="primary"
                        onClick={() => formEdit(record.id)}
                        variant="contained"> Save </Button>

                    <Button
                        color="error" variant="contained" style={{marginLeft:20}} onClick={() => close()}> Cancel </Button>
                </div>
            </form>

        </div>
    );
};

export default EditCurrencyCode;
