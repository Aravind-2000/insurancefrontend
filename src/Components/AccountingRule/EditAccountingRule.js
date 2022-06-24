import React from 'react';
import {Box, Button,  Grid, TextField} from "@mui/material";
import {MenuItem} from "@material-ui/core";
import InsuranceApi from "../../Service/InsuranceApi";
import axios from "axios";


const EditAccountingRule = ({record, setRecord, getAll, close, accountMasters, signs, subAccountCode, currencies}) => {

    const editChange = (e) => {
        const { name, value } = e.target;
        setRecord({ ...record, [name]: value });
    };

    const editChange1 = (e) => {
        editChange(e)
        const userid = sessionStorage.getItem("userid")
        axios.get(`http://localhost:8090/subaccount/${e.target.value}/${userid}`, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            }
        }).then((res) => {
            record.accountSign = res.data.accountSign
        }).catch(err => console.log(err))

    }


    const formEdit = (id) => {

        const body ={
            accountingRuleId: record.accountingRuleId,
            accountCodeId: record.accountCodeId,
            subAccountCodeId: record.subAccountCodeId,
            accountSign: record.accountSign,
            companyCurrencyId: record.companyCurrencyId
        }
        InsuranceApi.updateAccountRule(id, body).then((res) => {
            getAll()
            close()
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
                                placeholder="Enter Account Rule Id"
                                value={record.accountingRuleId}
                                name="accountingRuleId"
                                label=" Account Rule "
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
                                placeholder="Enter Account Code ID"
                                value={record.accountCodeId}
                                name="accountCodeId"
                                label=" Account Code"
                                onChange={(e) => editChange(e)}
                                required
                            >
                                {
                                    accountMasters.map((val) => (
                                        <MenuItem value={val.id}> {val.accountCode} - {val.accountShortDescription} </MenuItem>
                                    ))
                                }
                            </TextField>
                        </Grid>

                        <Grid item xs={8} md={6} lg={4}>
                            <TextField
                                select
                                fullWidth
                                className="formtext"
                                margin="dense"
                                variant="outlined"
                                placeholder="Enter Account Master ID"
                                value={record.subAccountCodeId}
                                name="subAccountCodeId"
                                label=" Sub Account Code"
                                onChange={(e) => editChange1(e)}
                                required
                            >
                                {
                                    subAccountCode.map((val) => (
                                        <MenuItem value={val.id}> {val.subAccountCode} - {val.subAccountShortDesc} </MenuItem>
                                    ))
                                }
                            </TextField>
                        </Grid>

                        <Grid item xs={8} md={6} lg={4}>
                            <TextField
                                select
                                fullWidth
                                className="formtext"
                                margin="dense"
                                variant="outlined"
                                placeholder="Enter Account Sign"
                                value={record.accountSign}
                                name="accountSign"
                                label=" Account Sign"
                                onChange={(e) => editChange(e)}
                                required
                            >
                                {
                                    signs.map((val) => (
                                        <MenuItem value={val}> {val} </MenuItem>
                                    ))
                                }
                            </TextField>
                        </Grid>

                        <Grid item xs={8} md={6} lg={4}>
                            <TextField
                                select
                                fullWidth
                                className="formtext"
                                margin="dense"
                                variant="outlined"
                                placeholder="Enter Company Currency"
                                value={record.companyCurrencyId}
                                name="companyCurrencyId"
                                label=" Currency "
                                onChange={(e) => editChange(e)}
                                required
                            >
                                {
                                    currencies.map((val) => (
                                        <MenuItem value={val.id}> {val.currencyCode} </MenuItem>
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

export default EditAccountingRule;
