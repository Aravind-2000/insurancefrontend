import React from 'react';
import axios from "axios";
import {Box, Grid, MenuItem, TextField} from "@mui/material";
import Button from "@mui/material/Button";

const OfficeStructureEdit = ({
    record, setRecord, close, getAll, company, OfficeLevels,data, status
                             }) => {

    // Write your edit change method here
    const editChange = (e) => {
        const { value, name } = e.target;
        setRecord({ ...record, [name]: value });
    };

    // update api call
    const editFormSubmit = (e) => {
        const userid = sessionStorage.getItem("userid")
        axios
            .patch(`http://localhost:8090/officestructure/${record.officeId}/${userid}`, record, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                }
            })
            .then((response) => {
                close();
                getAll();
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };


    return (
        <div >
            <form autoComplete="off">
                <Box sx={{flexGrow: 1}}>
                    <Grid container spacing={2}>
                        <Grid item xs={8} md={6} lg={4}>
                    <TextField
                        name="companyId"
                        select
                        value={record?.company?.companyId}
                        margin="dense"
                        fullWidth
                        className="formtext"
                        variant="outlined"
                        label="Company Id"
                        placeholder="Company Id"
                        onChange={(e) => editChange(e)}
                    >
                        {
                            company.map((value, index)=>(
                                <MenuItem value={value.companyId}> {value.companyName} </MenuItem>
                            ))
                        }
                    </TextField>

                        </Grid>


                        <Grid item xs={8} md={6} lg={4}>
                    <TextField
                        value={record?.officeLevelId}
                        select
                        margin="dense"
                        name="officeLevelId"
                        variant="outlined"
                        fullWidth
                        className="formtext"
                        label="Office Level Id"
                        placeholder="Office Level Id"
                        onChange={(e) => editChange(e)}
                    >
                        {
                            OfficeLevels.map((value,index) => (
                                <MenuItem value={value.id}> {value.officeLevelDesc} {value.officeLevelId} </MenuItem>
                            ))
                        }
                    </TextField>

                        </Grid>


                        <Grid item xs={8} md={6} lg={4}>
                    <TextField
                        select
                        value={record?.officeStatus}
                        margin="dense"
                        name="officeStatus"
                        variant="outlined"
                        fullWidth
                        className="formtext"
                        label="Office Status"
                        placeholder="Office Status"
                        onChange={(e) => editChange(e)}
                    >
                        {
                            status.map((val) => (
                                <MenuItem value={val}> {val.toUpperCase()} </MenuItem>
                            ))
                        }
                    </TextField>

                        </Grid>

                        <Grid item xs={8} md={6} lg={4}>
                    <TextField
                        value={record?.officeName}
                        margin="dense"
                        name="officeName"
                        variant="outlined"
                        fullWidth
                        className="formtext"
                        label="Office Name"
                        placeholder="Office Name"
                        onChange={(e) => editChange(e)}
                    /></Grid>

                        <Grid item xs={8} md={6} lg={4}>
                    <TextField
                        select
                        value={record?.upLevelOfficeId}
                        margin="dense"
                        name="upLevelOfficeId"
                        variant="outlined"
                        fullWidth
                        className="formtext"
                        label="Up Level Office Id"
                        placeholder="Up Level Office Id"
                        onChange={(e) => editChange(e)}
                    >
                        <MenuItem value={0}> --NULL-- </MenuItem>
                        {
                            data.map((val) => (
                                <MenuItem value={val.officeId}> {val.officeName.toUpperCase()}  </MenuItem>
                            ))
                        }


                    </TextField>

                        </Grid>
                    </Grid>
                </Box>
            </form>
            <br/>
            <Button
                color="primary"
                variant="contained"
                style={{marginRight:10}}
                onClick={() => editFormSubmit()}
            >
                Update
            </Button>

            <Button
                color="error"
                variant="contained"
                onClick={() => close()}
            >
                Cancel
            </Button>

        </div>
    );
};

export default OfficeStructureEdit;
