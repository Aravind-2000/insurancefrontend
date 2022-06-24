import React,{useState} from 'react';
import InsuranceApi from "../../Service/InsuranceApi";
import {Box, Button, Grid, TextField} from "@mui/material";
import Notifications from "../Dialogs/Notifications";


const AddAccountMaster = ({getAll, close, accRuleAdd, accRuleClose}) => {

    const [accountCode, setAccountCode] = useState("");
    const [accountShortDescription, setAccountShortDescription] = useState("");
    const [accountLongDescription, setAccountLongDescription] = useState("");

    const [notify, setNotify] = useState({
        isOpen: false,
        message: "",
        type: "",
    });

    const formSubmit = () => {
        const body = {
            accountCode,accountShortDescription, accountLongDescription
        }
        InsuranceApi.addAccountMaster(body).then((res) => {
            if(accRuleAdd === true){
                accRuleClose()
            }
            else{
                setNotify({
                    isOpen: true,
                    message: res.data,
                    type: "success"
                })
                setTimeout(() => {
                    close()
                    getAll()
                }, 1000)
            }
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
                                value={accountCode}
                                name="accountCode"
                                label=" Account Code"
                                onChange={(e) => setAccountCode(e.target.value)}
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
                                value={accountShortDescription}
                                name="accountShortDescription"
                                label=" Short Description"
                                onChange={(e) => setAccountShortDescription(e.target.value)}
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
                                value={accountLongDescription}
                                name="accountLongDescription"
                                label=" Long Description"
                                onChange={(e) => setAccountLongDescription(e.target.value)}
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

                    <Button
                        color="error" variant="contained" style={{marginLeft:20}} onClick={() => close()}> Cancel </Button>
                </div>
            </form>
            <Notifications notify={notify} setNotify={setNotify} />
        </div>
    );
};

export default AddAccountMaster;
