import React, {useState} from 'react';
import InsuranceApi from "../../Service/InsuranceApi";
import {Box, Button, Grid, TextField} from "@mui/material";
import {MenuItem} from "@material-ui/core";

const PolicyCoverClone = ({policyCovers, close, getAll}) => {
    const [body, setBody] = useState("");
    const [id, setId] = useState("");


    const onChangeCover = (value) => {
        setId(value)
        InsuranceApi.getPolicyCover(value).then((res) => {
            setBody(res.data)
        }).catch(err => console.log(err))
    }


    const formSubmit = (e) => {
        e.preventDefault()
        InsuranceApi.clonePolicyCover(body).then((res) => {
            close()
            getAll()
        }).catch(err => console.log(err))
    }
    return (
        <div>
            <form autoComplete="off" onSubmit={formSubmit}>
                <Box sx={{flexGrow:1}}>
                    <Grid container spacing={2}>
                        <TextField
                            select
                            fullWidth
                            className="formtext"
                            margin="dense"
                            variant="outlined"
                            placeholder="Enter policy cover ID "
                            name="id"
                            label=" Policy Cover ID"
                            value={id}
                            onChange={(e) => onChangeCover(e.target.value)}
                            required
                        >
                            {
                                policyCovers.map((val) => (
                                    <MenuItem value={val.id}> PolicyNumber-{val.policyNumber} || Life-{val.life} || Coverage Name-{val.coverageName?.statusDesc}</MenuItem>
                                ))
                            }
                        </TextField>
                    </Grid>
                </Box>
                <div style={{display: "flex", margin:20}}>
                    <Button
                        type="submit"
                        color="primary"
                        variant="contained"> Clone </Button> </div>
            </form>

        </div>
    );
};

export default PolicyCoverClone;
