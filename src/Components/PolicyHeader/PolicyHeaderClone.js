import React,{useState} from 'react';
import {Box, Button, Grid, TextField} from "@mui/material";
import {MenuItem} from "@material-ui/core";
import InsuranceApi from "../../Service/InsuranceApi";

const PolicyHeaderClone = ({policyHeaders, close, getAll}) => {

    const [body, setBody] = useState("");
    const [id, setId] = useState("");


    const onChangeHeader = (value) => {
        setId(value)
        InsuranceApi.getPolicyHeader(value).then((res) => {
            setBody(res.data)
        }).catch(err => console.log(err))
    }


    const formSubmit = (e) => {
        e.preventDefault()
        InsuranceApi.clonePolicyHeader(body).then((res) => {
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
                                placeholder="Enter policy header ID "
                                name="id"
                                label=" Policy Header ID"
                                value={id}
                                onChange={(e) => onChangeHeader(e.target.value)}
                                required
                            >
                                {
                                    policyHeaders.map((val) => (
                                        <MenuItem value={val.id}> {val.id} {val.policyNumber} </MenuItem>
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

export default PolicyHeaderClone;
