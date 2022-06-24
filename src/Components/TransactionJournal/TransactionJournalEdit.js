import React, {useEffect, useState} from 'react';
import InsuranceApi from "../../Service/InsuranceApi";
import {Box, Button,  Grid, TextField} from "@mui/material";
import {MenuItem} from "@material-ui/core";
import moment from "moment";

const TransactionJournalEdit = ({getAll, close, currencies, signs, accountRules, receiptBooks, transCodes, record, setRecord}) => {

    const editChange = (e) => {
        const { name, value } = e.target;
        setRecord({ ...record, [name]: value });
    };




    const onChangeReceiptId = (value) => {
        InsuranceApi.getreceiptbook(value).then((res) => {
            setRecord({ ...record, agentId: res.data.agentId});
            setRecord({ ...record, originalCurrencyId: res.data.originalReceiptCurrencyId})
        }).catch(err => console.log(err))
    }

    const onChangeAccountRule = (e) => {
        setRecord({ ...record, accountingRuleId: e.target.value});
        InsuranceApi.getAccountRule(e.target.value).then((res) => {
            setRecord({ ...record, accountSign: res.data.accountSign});
            setRecord({ ...record, accountCurrencyId: res.data.companyCurrencyId});
        }).catch(err => console.log(err))
    }

    const [getAllWithin, setGetAllWithin] = useState([]);
    useEffect(() => {
        InsuranceApi.getTransCode(record.transactionId).then((res) => {
            InsuranceApi.getAllWithin(moment(res.data.transactionDate).format("MM-DD-YYYY"), record.originalCurrencyId, record.accountCurrencyId).then((res) => {
                setGetAllWithin(res.data)
            }).catch(err => console.log(err))
        }).catch(err => console.log(err))
    }, [record.transactionId, record.accountCurrencyId, record.originalCurrencyId]);



    const formEdit = (id) => {
        const body = {
            receiptId: record.receiptId,
            agentId: record.agentId,
            accountingRuleId: record.accountingRuleId,
            transactionId: record.transactionId,
            originalCurrencyId: record.originalCurrencyId,
            originalAmount: record.originalAmount,
            accountCurrencyId: record.accountCurrencyId,
            accountAmount: record.accountAmount,
            accountSign: record.accountSign,
            sequenceNo: record.sequenceNo
        }
        InsuranceApi.updatetransactionjournal(id, body).then((res) => {
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
                                select
                                fullWidth
                                className="formtext"
                                margin="dense"
                                variant="outlined"
                                placeholder="Enter Receipt ID "
                                value={record.receiptId}
                                name="receiptId"
                                label=" Receipt ID"
                                onChange={(e) => editChange(e)}
                                required
                            >
                                {
                                    receiptBooks.map((val) => (
                                        <MenuItem value={val.id}> {val.receiptNo} - {moment(val.receiptDate).format("DD-MM-YYYY")}  </MenuItem>
                                    ))
                                }
                            </TextField>
                        </Grid>

                        <Grid item xs={8} md={6} lg={4}>
                            <TextField
                                fullWidth
                                className="formtext"
                                margin="dense"
                                variant="outlined"
                                placeholder="Enter Agent ID "
                                value={record.agentId}
                                name="agentId"
                                label=" Agent ID"
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
                                placeholder="Enter Accounting Reason "
                                value={record.accountingRuleId}
                                name="accountingRuleId"
                                label=" Entry Reason "
                                onChange={(e) => editChange(e)}
                                required
                            >
                                {
                                    accountRules.map((val) => (
                                        <MenuItem value={val.id}> {val.accountingRuleId} - {val.accountCodeTable?.accountCode} - {val.subAccountTable?.subAccountCode}  </MenuItem>
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
                                placeholder="Enter Accounting Sign "
                                value={record.accountSign}
                                name="accountSign"
                                label=" Account Sign "
                                onChange={(e) => editChange(e)}
                                required
                            >
                                {
                                    signs.map((val) => (
                                        <MenuItem value={val}> {val}</MenuItem>
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
                                placeholder="Enter Original Currency  "
                                value={record.originalCurrencyId}
                                name="originalCurrencyId"
                                label="Original Currency "
                                onChange={(e) => editChange(e)}
                                required
                            >
                                {
                                    currencies.map((val) => (
                                        <MenuItem value={val.id}> {val.currencyCode}</MenuItem>
                                    ))
                                }
                            </TextField>
                        </Grid>

                        <Grid item xs={8} md={6} lg={4}>
                            <TextField
                                type="number"
                                fullWidth
                                className="formtext"
                                margin="dense"
                                variant="outlined"
                                placeholder="Enter Original Amount "
                                value={record.originalAmount}
                                name="originalAmount"
                                label=" Original Amount "
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
                                placeholder="Enter Accounting Currency  "
                                value={record.accountCurrencyId}
                                name="accountCurrencyId"
                                label="Account Currency "
                                onChange={(e) => editChange(e)}
                                required
                            >
                                {
                                    currencies.map((val) => (
                                        <MenuItem value={val.id}> {val.currencyCode}</MenuItem>
                                    ))
                                }
                            </TextField>
                        </Grid>

                        <Grid item xs={8} md={6} lg={4}>
                            <TextField
                                type="number"
                                fullWidth
                                className="formtext"
                                margin="dense"
                                variant="outlined"
                                placeholder="Enter Account Amount "
                                value={record.accountAmount}
                                name="accountAmount"
                                label=" Account Amount "
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
                                placeholder="Enter Transaction Code "
                                value={record.transactionId}
                                name="transactionId"
                                label=" Transaction ID"
                                onChange={(e) => editChange(e)}
                                required
                            >
                                {
                                    transCodes.map((val) => (
                                        <MenuItem value={val.id}> {val.transactionCode} - {val.transactionDesc}  </MenuItem>
                                    ))
                                }
                            </TextField>
                        </Grid>
                        <Grid item xs={8} md={6} lg={4}>
                            <TextField
                                select
                                type="number"
                                fullWidth
                                className="formtext"
                                margin="dense"
                                variant="outlined"
                                placeholder="Enter Sequence Number "
                                value={record.sequenceNo}
                                name="sequenceNo"
                                label=" Sequence Number "
                                onChange={(e) => editChange(e)}
                                required
                            >
                                {
                                    getAllWithin.map((val) => (
                                        <MenuItem value={val.slUniqueNumber}> {val.slUniqueNumber} - {val.exchangeRate} </MenuItem>
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

export default TransactionJournalEdit;
