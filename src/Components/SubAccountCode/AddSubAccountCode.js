import React,{useState} from 'react';
import {Box, Button, Grid, MenuItem, TextField} from "@mui/material";
import axios from "axios";
import Notifications from "../Dialogs/Notifications";

const AddSubAccountCode = ({sign, getAll, close, accRuleAdd, accRuleClose}) => {

    const [subAccountCode, setSubAccountCode] = useState("");
    const [subAccountShortDesc, setSubAccountShortDesc] = useState("");
    const [subAccountLongDesc, setSubAccountLongDesc] = useState("");
    const [accountSign, setAccountSign] = useState("");

    const [notify, setNotify] = useState({
        isOpen: false,
        message: "",
        type: "",
    });

    const formSubmit = () => {
        const userid = sessionStorage.getItem("userid")
        const body={subAccountCode, subAccountShortDesc, subAccountLongDesc, accountSign}
        axios.post(`http://localhost:8090/subaccount/add/${userid}`, body, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            }
        }).then((res) => {
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
                }, 1500)

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
                                placeholder="Enter Sub Account Code"
                                value={subAccountCode}
                                name="subAccountCode"
                                label=" Sub Account Code"
                                onChange={(e) => setSubAccountCode(e.target.value)}
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
                                value={subAccountShortDesc}
                                name="subAccountShortDesc"
                                label=" Short Description"
                                onChange={(e) => setSubAccountShortDesc(e.target.value)}
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
                                value={subAccountLongDesc}
                                name="subAccountLongDesc"
                                label=" Long Description"
                                onChange={(e) => setSubAccountLongDesc(e.target.value)}
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
                                value={accountSign}
                                name="accountSign"
                                label=" Account Sign "
                                onChange={(e) => setAccountSign(e.target.value)}
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

export default AddSubAccountCode;
