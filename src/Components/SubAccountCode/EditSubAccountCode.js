import React from 'react';
import {Box, Button, Grid, MenuItem, TextField} from "@mui/material";
import axios from "axios";

const EditSubAccountCode = ({record, setRecord, getAll, close, sign}) => {



    const editChange = (e) => {
        const { name, value } = e.target;
        setRecord({ ...record, [name]: value });
    };


    const formEdit = (id) => {

        const userid = sessionStorage.getItem("userid")
        const body = {
            subAccountCode: record.subAccountCode,
            subAccountShortDesc: record.subAccountShortDesc,
            subAccountLongDesc: record.subAccountLongDesc,
            accountSign: record.accountSign
        }
        axios.patch(`http://localhost:8090/subaccount/${id}/${userid}`, body, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            }
        }).then((res) => {
            getAll()
            close()
        })
    }



    return (
        <div>
            <form autoComplete="off" >
                <Box sx={{flexGrow:1}}>
                    <Grid container spacing={2}>
                        <Grid item xs={8} md={6} lg={4}>
                            <TextField
                                fullWidth
                                className="formtext"
                                margin="dense"
                                variant="outlined"
                                placeholder="Enter Sub Account Code"
                                value={record.subAccountCode}
                                name="subAccountCode"
                                label=" Sub Account Code"
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
                                placeholder="Enter Sub Account Short  Description"
                                value={record.subAccountShortDesc}
                                name="subAccountShortDesc"
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
                                placeholder="Enter Sub Account Long  Description"
                                value={record.subAccountLongDesc}
                                name="subAccountLongDesc"
                                label=" Long Description"
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
                                placeholder="Enter Sub Account Account Sign"
                                value={record.accountSign}
                                name="accountSign"
                                label=" Account Sign "
                                onChange={(e) => editChange(e)}
                                required
                            >
                                {
                                    sign.map((val) => (
                                        <MenuItem value={val}> {val} </MenuItem>
                                    ))
                                }

                            </TextField>
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

export default EditSubAccountCode;
