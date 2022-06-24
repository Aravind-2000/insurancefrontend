import React, { useState} from 'react';
import InsuranceApi from "../../Service/InsuranceApi";
import {Box, Button, Grid, TextField} from "@mui/material";
import {MenuItem} from "@material-ui/core";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DraggableComponent from "../../Service/DraggableComponent";
import {Modal} from "react-bootstrap";
import AddAccountMaster from "../AccountCode/AddAccountMaster";
import axios from "axios";
import AddSubAccountCode from "../SubAccountCode/AddSubAccountCode";

const AddAccountingRule = ({getAll, close, accountCode, subAccountCode, setAccountCode, setSubAccountCode , signs, currencies, add1, close1 }) => {


    const [accountCodeId, setAccountCodeId] = useState("");
    const [subAccountCodeId, setSubAccountCodeId] = useState("");
    const [accountSign, setAccountSign] = useState("");
    const [companyCurrencyId, setCompanyCurrencyId] = useState("");
    const [accountingRuleId, setAccountingRuleId] = useState([]);


    const onChangeSubAccId = (value) => {
        const userid = sessionStorage.getItem("userid")
        setSubAccountCodeId(value);
        axios.get(`http://localhost:8090/subaccount/${value}/${userid}`, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            }
        }).then((res) => {
            setAccountSign(res.data.accountSign)
        }).catch(err => console.log(err))
    }


    const formSubmit = (e) => {
        e.preventDefault()

        const body = {accountingRuleId,accountCodeId,  subAccountCodeId, accountSign, companyCurrencyId}
        InsuranceApi.addAccountRule(body).then((res) => {
            if(add1 === true){
                close1()
            }
            else{
                getAll()
                close()
            }
        }).catch(err => console.log(err))

    }

    //Add Acc Master Open
    const [accMasteradd, setaccMasterAdd] = useState(false);

    const addOpen = () => {
        setaccMasterAdd(true)
    }

    const addClose = () => {
        InsuranceApi.getAllAccountMaster().then((res) => {
            setAccountCode(res.data)
        }).catch(err => console.log(err))
        setaccMasterAdd(false)
    }

    //Sub Account
    const [subAccAdd, setSubAccAdd] = useState(false);
    const addOpen1 = () => {
        setSubAccAdd(true)
    }

    const addClose1 = () => {
        const userid = sessionStorage.getItem("userid")
        axios.get(`http://localhost:8090/subaccount/getall/${userid}`, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            }
        }).then((res) => {
            setSubAccountCode(res.data)
        }).catch(err => console.log(err))
        setSubAccAdd(false)
    }

    return (
        <div>

            <form autoComplete="off" onSubmit={formSubmit}>
                <Box sx={{flexGrow:1}}>
                    <Grid container spacing={2}>

                        <Grid item xs={8} md={6} lg={4}>
                            <TextField
                                fullWidth
                                className="formtext"
                                margin="dense"
                                variant="outlined"
                                placeholder="Enter Account Rule Id"
                                value={accountingRuleId}
                                name="accountingRuleId"
                                label=" Account Rule "
                                onChange={(e) => setAccountingRuleId(e.target.value)}
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
                                value={accountCodeId}
                                name="accountCodeId"
                                label=" Account Code"
                                onChange={(e) => setAccountCodeId(e.target.value)}
                                required
                            >
                                {
                                    accountCode.map((val) => (
                                        <MenuItem value={val.id}> {val.accountCode} - {val.accountShortDescription} </MenuItem>
                                    ))
                                }
                            </TextField>
                        </Grid>
                        <Grid item xs={8} md={6} lg={4}>
                            <Button
                                style={{ marginTop: "1rem", marginLeft:20 }}
                                variant="contained"
                                color="error"
                                onClick={() => addOpen()}
                                startIcon={<AddCircleIcon />}
                            />
                        </Grid>
                        <Grid item xs={8} md={6} lg={4}>
                            <TextField
                                select
                                fullWidth
                                className="formtext"
                                margin="dense"
                                variant="outlined"
                                placeholder="Enter Sub Account Code ID"
                                value={subAccountCodeId}
                                name="subAccountCodeId"
                                label=" Sub Account Code"
                                onChange={(e) => onChangeSubAccId(e.target.value)}
                                required
                            >
                                {
                                    subAccountCode.map((val) => (
                                        <MenuItem value={val.id}> {val.subAccountCode} - {val.subAccountShortDesc}</MenuItem>
                                    ))
                                }
                            </TextField>
                        </Grid>
                        <Grid item xs={8} md={6} lg={4}>
                            <Button
                                style={{ marginTop: "1rem", marginLeft:20 }}
                                variant="contained"
                                color="error"
                                onClick={() => addOpen1()}
                                startIcon={<AddCircleIcon />}
                            />
                        </Grid>

                        <Grid item xs={8} md={6} lg={4}>
                            <TextField
                                select
                                fullWidth
                                className="formtext"
                                margin="dense"
                                variant="outlined"
                                placeholder="Enter Account Sign"
                                value={accountSign}
                                name="accountSign"
                                label=" Account Sign"
                                onChange={(e) => setAccountSign(e.target.value)}
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
                                value={companyCurrencyId}
                                name="companyCurrencyId"
                                label=" Currency "
                                onChange={(e) => setCompanyCurrencyId(e.target.value)}
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
                        type="submit"
                        color="primary"
                        variant="contained"> Save </Button>

                    <Button
                        color="error" variant="contained" style={{marginLeft:20}} onClick={() => close()}> Cancel </Button>
                </div>
            </form>


            <Modal
                dialogAs={DraggableComponent}
                show={accMasteradd}
                onHide={addClose}
                centered
                size="lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title>  Add Account Master  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                        <AddAccountMaster accRuleAdd={accMasteradd}    accRuleClose={addClose}  />
                    </div>
                </Modal.Body>
            </Modal>

            <Modal
                dialogAs={DraggableComponent}
                show={subAccAdd}
                onHide={addClose1}
                centered
                size="lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title>  Add Account Master  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                        <AddSubAccountCode accRuleAdd={subAccAdd}  accRuleClose={addClose1} sign={signs} />
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default AddAccountingRule;
