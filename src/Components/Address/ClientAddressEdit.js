import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import {
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    InputLabel,
    Select,
    FormControl,
    Grid,
    Box,
} from "@mui/material";
import "../Css/ContentAdd.css";
import { Checkbox, MenuItem } from "@material-ui/core";
import FormControlLabel from "@mui/material/FormControlLabel";
import InsuranceApi from "../../Service/InsuranceApi";

function ClientAddressEdit({ open, close,data, setData, getall
                          }) {

    const [address, setAddress] = useState([]);


    useEffect(() => {
        InsuranceApi.getParameterRule("A0001").then((res) => {
            setAddress(res.data);
        })
            .catch((error) => {
                console.log(error);
            })
    }, []);


    const editChange = (e) => {
        const { value, name } = e.target;
        setData({ ...data, [name]: value });
    };

    const editCheck = (e) => {
        const { checked, name} = e.target;
        setData({...data, [name]: checked});
    }



    const updateAddress = (id, val) => {
        InsuranceApi.updateAddress(id, val).then((res) => {
            console.log(res.data);
            close();
            getall();
        })
            .catch((error) => {
                console.log(error)
            })
    }


    return (
        <div>
            <Dialog
                open={open}
                onClose={close}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth="md"
            >
                <h2 className="headings">Client Details Add</h2>
                <DialogContent>
                    <form autoComplete="off">
                        <Box sx={{ flexGrow: 1 }}>
                            <Grid container spacing={2}>

                                <Grid item xs={8} md={6} lg={4}>
                                    <TextField
                                        label="To"
                                        className="formtext"
                                        placeholder="To"
                                        name="toAddress"
                                        value={data.toAddress}
                                        onChange={(e) => editChange(e)}
                                        fullWidth
                                        variant="outlined"
                                        margin="dense"
                                    />
                                </Grid>

                                <Grid item xs={8} md={6} lg={4}>
                                    <TextField
                                        label="Address Line 1"
                                        className="formtext"
                                        placeholder="Address Line 1"
                                        fullWidth
                                        variant="outlined"
                                        name="addressLine1"
                                        value={data.addressLine1}
                                        onChange={(e) => editChange(e)}
                                        margin="dense"
                                    />
                                </Grid>
                                <Grid item xs={8} md={6} lg={4}>
                                    <TextField
                                        label="Address Line 2"
                                        className="formtext"
                                        placeholder="Address Line 2"
                                        fullWidth
                                        variant="outlined"
                                        name="addressLine2"
                                        value={data.addressLine2}
                                        onChange={(e) => editChange(e)}
                                        margin="dense"
                                    />
                                </Grid>
                                <Grid item xs={8} md={6} lg={4}>
                                    <TextField
                                        label="City"
                                        className="formtext"
                                        placeholder="City"
                                        fullWidth
                                        name="city"
                                        value={data.city}
                                        onChange={(e) => editChange(e)}
                                        variant="outlined"
                                        margin="dense"
                                    />
                                </Grid>
                                <Grid item xs={8} md={6} lg={4}>
                                    <TextField
                                        label="State"
                                        labelId="demo-simple-select-label"
                                        className="formtext"
                                        placeholder="State"
                                        fullWidth
                                        variant="outlined"
                                        name="state"
                                        value={data.state}
                                        onChange={(e) => editChange(e)}
                                        margin="dense"
                                    >
                                    </TextField>
                                </Grid>
                                <Grid item xs={8} md={6} lg={4}>
                                    <TextField
                                        label="Country"
                                        className="formtext"
                                        placeholder="Country"
                                        fullWidth
                                        name="country"
                                        value={data.country}
                                        onChange={(e) => editChange(e)}
                                        variant="outlined"
                                        margin="dense"
                                    />
                                </Grid>
                                <Grid item xs={8} md={6} lg={4}>
                                    <TextField
                                        type="number"
                                        label="Pincode"
                                        className="formtext"
                                        placeholder="Pincode"
                                        fullWidth
                                        name="pincode"
                                        value={data.pincode}
                                        onChange={(e) => editChange(e)}
                                        variant="outlined"
                                        margin="dense"
                                    />
                                </Grid>

                                <Grid item xs={8} md={6} lg={4}>
                                    <TextField
                                        select
                                        label="Address Type"
                                        className="formtext"
                                        placeholder="Address Type"
                                        fullWidth
                                        name="addressType"
                                        value={data.addressType}
                                        onChange={(e) => editChange(e)}
                                        variant="outlined"
                                        margin="dense"
                                    >
                                        {
                                            address.map((address) => (
                                                <MenuItem value={address}> {address} </MenuItem>
                                            ))
                                        }
                                    </TextField>
                                </Grid>

                                <Grid item xs={8} md={6} lg={4}>
                                    <FormControlLabel
                                        fullWidth
                                        className="checktext"
                                        control={<Checkbox lable="isPresentAddress:"  name="isPresentAddress" checked={data.isPresentAddress} onChange={(e) => editCheck(e)} />}
                                        label="isPresentAddress:"
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={close} color="error" variant="contained">
                        Cancel
                    </Button>
                    <Button color="primary" variant="contained" onClick={(e) => updateAddress(data.id, data)} >
                        {"Submit"}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default ClientAddressEdit;
