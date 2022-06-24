import React, {useState} from 'react';
import InsuranceApi from "../../Service/InsuranceApi";
import {Box, Button,  Grid, TextField} from "@mui/material";
import {MenuItem} from "@material-ui/core";
import moment from "moment";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import {Modal} from "react-bootstrap";
import AddTransactionCode from "../TransactionCode/AddTransactionCode";
import Notifications from "../Dialogs/Notifications";
import AddAccountingRule from "../AccountingRule/AddAccountingRule";

const TransactionJournalAdd = ({getAll, close, currencies, signs, accountRules, receiptBooks, transCodes}) => {


    const [receiptId, setReceiptId] = useState("");
    const [agentId, setAgentId] = useState("");
    const [accountingRuleId, setAccountingRuleId] = useState("");
    const [transactionId, setTransactionId] = useState("");
    const [originalCurrencyId, setOriginalCurrencyId] = useState("");
    const [originalAmount, setOriginalAmount] = useState("");
    const [accountCurrencyId, setAccountCurrencyId] = useState("");
    const [accountAmount, setAccountAmount] = useState("");
    const [accountSign, setAccountSign] = useState("");
    const [sequenceNo, setSequenceNo] = useState("");


    const onChangeReceiptId = (value) => {
        setReceiptId(value);
        InsuranceApi.getreceiptbook(value).then((res) => {
            setAgentId(res.data.agentId);
            setOriginalCurrencyId(res.data.originalReceiptCurrencyId)
        }).catch(err => console.log(err))
    }

    const onChangeAccountRule = (value) => {
        setAccountingRuleId(value);
        InsuranceApi.getAccountRule(value).then((res) => {
            setAccountSign(res.data.accountSign)
            setAccountCurrencyId(res.data.companyCurrencyId)
        }).catch(err => console.log(err))
    }


    const [getAllWithin, setGetAllWithin] = useState([]);


    const transOnChange = (value) => {
        setTransactionId(value);
        InsuranceApi.getTransCode(value).then((res) => {
            InsuranceApi.getAllWithin(moment(res.data.transactionDate).format("MM-DD-YYYY"), originalCurrencyId, accountCurrencyId).then((res) => {
                setGetAllWithin(res.data)
            }).catch(err => console.log(err))
        }).catch(err => console.log(err))
    }

    const [notify, setNotify] = useState({
        isOpen: false,
        message: "",
        type: "",
    });

    const formSubmit = (e) => {
        e.preventDefault()
        const body = {
            receiptId, agentId, accountingRuleId, accountSign,  transactionId, originalCurrencyId, originalAmount, accountCurrencyId, sequenceNo}
        InsuranceApi.addtransactionjournal(body).then((res) => {
            close()
            getAll()
            setNotify({
                isOpen: true,
                message: res.data,
                type: "success"
            });
        }).catch(err => console.log(err))
    }

    //Add Open
    const [add, setAdd] = useState(false);
    const addOpen = () => {
        setAdd(true)
    }
    const addClose = () => {
        setAdd(false)
    }


    //Acc Rule

    const [accRule, setAccRule] = useState(false);
    const accRuleOpen = () => {
        setAccRule(true)
    }
    const accRuleClose = () => {
        setAccRule(false)
    }


    return (
        <div>
            <form autoComplete="off" onSubmit={formSubmit}>
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
                                value={receiptId}
                                name="receiptId"
                                label=" Receipt ID"
                                onChange={(e) => onChangeReceiptId(e.target.value)}
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
                                value={agentId}
                                name="agentId"
                                label=" Agent ID"
                                onChange={(e) => setAgentId(e.target.value)}
                                required
                            />
                        </Grid>
                        <Grid item xs={8} md={6} lg={4}>
                        </Grid>
                        <Grid item xs={8} md={6} lg={4}>
                            <TextField
                                select
                                fullWidth
                                className="formtext"
                                margin="dense"
                                variant="outlined"
                                placeholder="Enter Accounting Reason "
                                value={accountingRuleId}
                                name="accountingRuleId"
                                label=" Entry Reason "
                                onChange={(e) => onChangeAccountRule(e.target.value)}
                                required
                            >
                                {
                                    accountRules.map((value) => (
                                        <MenuItem value={value.id}> {value.accountingRuleId} - {value.accountCodeTable?.accountCode} - {value.subAccountTable?.subAccountCode}  </MenuItem>
                                    ))
                                }
                            </TextField>
                        </Grid>

                        <Grid item xs={8} md={6} lg={4}>
                            {/*<Button*/}
                            {/*    style={{ marginTop: "1rem", marginLeft:20 }}*/}
                            {/*    variant="contained"*/}
                            {/*    color="error"*/}
                            {/*    onClick={() => accRuleOpen()}*/}
                            {/*    startIcon={<AddCircleIcon />}*/}
                            {/*/>*/}
                        </Grid>

                        <Grid item xs={8} md={6} lg={4}>
                            <TextField
                                select
                                fullWidth
                                className="formtext"
                                margin="dense"
                                variant="outlined"
                                placeholder="Enter Accounting Sign "
                                value={accountSign}
                                name="accountSign"
                                label=" Account Sign "
                                onChange={(e) => setAccountSign(e.target.value)}
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
                                value={originalCurrencyId}
                                name="originalCurrencyId"
                                label="Original Currency "
                                onChange={(e) => setOriginalCurrencyId(e.target.value)}
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
                                value={originalAmount}
                                name="originalAmount"
                                label=" Original Amount "
                                onChange={(e) => setOriginalAmount(e.target.value)}
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
                                value={accountCurrencyId}
                                name="accountCurrencyId"
                                label="Account Currency "
                                onChange={(e) => setAccountCurrencyId(e.target.value)}
                                required
                            >
                                {
                                    currencies.map((val) => (
                                        <MenuItem value={val.id}> {val.currencyCode}</MenuItem>
                                    ))
                                }
                            </TextField>
                        </Grid>

                        {/*<Grid item xs={8} md={6} lg={4}>*/}
                        {/*    <TextField*/}
                        {/*        type="number"*/}
                        {/*        fullWidth*/}
                        {/*        className="formtext"*/}
                        {/*        margin="dense"*/}
                        {/*        variant="outlined"*/}
                        {/*        placeholder="Enter Account Amount "*/}
                        {/*        value={accountAmount}*/}
                        {/*        name="accountAmount"*/}
                        {/*        label=" Account Amount "*/}
                        {/*        onChange={(e) => setAccountAmount(e.target.value)}*/}
                        {/*        required*/}
                        {/*    />*/}
                        {/*</Grid>*/}
                        <Grid item xs={8} md={6} lg={4}>
                            <TextField
                                select
                                fullWidth
                                className="formtext"
                                margin="dense"
                                variant="outlined"
                                placeholder="Enter Transaction Code "
                                value={transactionId}
                                name="transactionId"
                                label=" Transaction ID"
                                onChange={(e) => transOnChange(e.target.value)}
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
                                placeholder="Enter Sequence of Conversion"
                                value={sequenceNo}
                                name="sequenceNo"
                                label=" Sequence "
                                onChange={(e) => setSequenceNo(e.target.value)}
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
                        type="submit"
                        color="primary"
                        variant="contained"> Save </Button>

                    <Button
                        color="error" variant="contained" style={{marginLeft:20}} onClick={() => close()}> Cancel </Button>
                </div>
            </form>

            <Modal
                show={add}
                onHide={addClose}
                centered
                size="sm"
            >
                <Modal.Header closeButton>
                    <Modal.Title>   Add Transaction Code   </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                        <AddTransactionCode add1={add} close1={addClose}/>
                    </div>
                </Modal.Body>
            </Modal>


            <Modal
                show={accRule}
                onHide={accRuleClose}
                centered
                size="sm"
            >
                <Modal.Header closeButton>
                    <Modal.Title>   Add Accounting Rule   </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                        <AddAccountingRule add1={accRule} close1={accRuleClose} currencies={currencies} signs={signs} />
                    </div>
                </Modal.Body>
            </Modal>

            <Notifications notify={notify} setNotify={setNotify} />
        </div>
    );
};

export default TransactionJournalAdd;
