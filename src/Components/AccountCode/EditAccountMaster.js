import React, {useState} from 'react';
import {Box, Button, Grid, TextField} from "@mui/material";
import InsuranceApi from "../../Service/InsuranceApi";
import Notifications from "../Dialogs/Notifications";

const EditAccountMaster = ({record, setRecord, getAll, close}) => {

    const editChange = (e) => {
        const { name, value } = e.target;
        setRecord({ ...record, [name]: value });
    };



    const formEdit = (id) => {

        const body = {
            accountCode: record.accountCode,
            accountShortDescription: record.accountShortDescription,
            accountLongDescription: record.accountLongDescription

        }
        InsuranceApi.updateAccountMaster(id, body).then((res) => {
            close()
            getAll()

        }).catch(err => console.log(err))
    }


    return (
        <div>
            <form autoComplete="off">
                <Box sx={{flexGrow:1}}>
                    <Grid container spacing={2}>
                        <Grid item xs={8} md={6} lg={4}>
                            <TextField
                                fullWidth
                                className="formtext"
                                margin="dense"
                                variant="outlined"
                                placeholder="Enter Account Code"
                                value={record.accountCode}
                                name="accountCode"
                                label=" Account Code"
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
                                placeholder="Enter Account Short  Description"
                                value={record.accountShortDescription}
                                name="accountShortDescription"
                                label=" Short Description"
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
                                placeholder="Enter Account Long  Description"
                                value={record.accountLongDescription}
                                name="accountLongDescription"
                                label=" Long Description"
                                onChange={(e) => editChange(e)}
                                required
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

export default EditAccountMaster;
