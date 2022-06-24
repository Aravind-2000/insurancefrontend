import React,{useEffect, useState} from 'react';
import InsuranceApi from "../../Service/InsuranceApi";
import axios from "axios";
import {Button, makeStyles, TablePagination, Paper} from "@material-ui/core";
import AddBoxIcon from "@mui/icons-material/AddBox";
import "../Css/Content.css";
import {InputAdornment, TextField} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import Table from "@mui/material/Table";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoIcon from "@mui/icons-material/Info";
import moment from "moment";
import {Modal} from "react-bootstrap";
import DraggableComponent from "../../Service/DraggableComponent";
import TransactionJournalInfo from "./TransactionJournalInfo";
import TransactionJournalAdd from "./TransactionJournalAdd";
import TransactionJournalEdit from "./TransactionJournalEdit";



const useStyles = makeStyles((theme) => ({
    BackGround: {
        backgroundColor: "#d50000",
        color: "white",
    },
}));

const TransactionJournalDetails = () => {

    const classes = useStyles();

    const access = JSON.parse(sessionStorage.getItem("specialaccess"))


    const [transactionJournal, setTransactionJournal] = useState([]);
    const [receiptBook, setReceiptBook] = useState([]);
    const [currencyCodes, setCurrencyCodes] = useState([]);
    const [transactionCode, setTransactionCode] = useState([]);
    const [accountSigns, setAccountSigns] = useState([]);
    const [accountingRule, setAccountingRule] = useState([]);


    useEffect(() => {
        getAllTransactionJournals()
        getAllCurrCodes()
        getAllTransactionCodes()
        getAccountSigns()
        getAllReceiptBook()
        getAllAccountingRules()
    }, []);


    const getAllAccountingRules = () => {
        InsuranceApi.getAllAccountRule().then((res) => {
            setAccountingRule(res.data)
        }).catch(err => console.log(err))
    }

    const getAllTransactionJournals = () => {
        InsuranceApi.getAlltransactionjournal().then((res) => {
            setTransactionJournal(res.data)
        }).catch(err => console.log(err))
    }

    const getAllCurrCodes = () => {
        InsuranceApi.getAllCurrCodes().then((res) => {
            setCurrencyCodes(res.data)
        }).catch(err => console.log(err))
    }

    const getAllReceiptBook = () => {
        InsuranceApi.getAllreceiptbook().then((res) => {
            setReceiptBook(res.data)
        }).catch(err => console.log(err))
    }

    const getAllTransactionCodes = () => {
        InsuranceApi.getAllTransCodes().then((res) => {
            setTransactionCode(res.data)
        }).catch(err => console.log(err))
    }

    const getAccountSigns = () => {
        InsuranceApi.getParameterRule("AC001").then((res) => {
            setAccountSigns(res.data)
        }).catch(err => console.log(err))
    }


    const [search, setSearch] = useState("");
    const globalsearch = (val) =>{
        val === "" ? getAllTransactionJournals() : axios.get(`http://localhost:8090/transactionjournal/search/${val}`, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            }
        }).then((res) => {
            setTransactionJournal(res.data);
        })
            .catch((err) => {
                console.log(err)
            })
    }


    //Pagination
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


    const [add, setAdd] = useState(false);
    const addOpen = () => {
        setAdd(true)
    }
    const addClose = () => {
        setAdd(false)
    }

    //Edit Open
    const [updateDetails, setUpdateDetails] = useState("");
    const [edit, setEdit] = useState(false);
    const editOpen = (value) => {
        setUpdateDetails(value)
        setEdit(true)
    }
    const editClose = () => {
        setEdit(false)
    }


    //Info Open
    const [infoDetails, setInfoDetails] = useState("");
    const [info, setInfo] = useState(false);
    const infoOpen = (value) => {
        setInfoDetails(value)
        setInfo(true)
    }
    const infoClose = () => {
        setInfo(false)
    }

    const deactivateTransJournal = (id) => {
        if( window.confirm("Do you want to delete this trainee ? ")){
            InsuranceApi.softtransactionjournal(id).then((res) => {
                getAllTransactionJournals()
            }).catch(err => console.log(err))
        }
    }


    return (
        <div>
            <div className="container">

                <div className="classTitle">
                    <h2> <b> Transaction Journal Details </b> </h2>
                </div>
                <br/>
                {
                    access?.find(element => element === "add-transactionjournal") ?
                        <Button>
                            <AddBoxIcon
                                fontSize="large"
                                className={classes.BackGround}
                                onClick={() => addOpen()}
                            />
                        </Button> : null
                }
                <TextField
                    type="text"
                    label="Search"
                    value={search}
                    onChange={(e) => {setSearch(e.target.value); globalsearch(e.target.value)}}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <SearchIcon/>
                            </InputAdornment>
                        )
                    }
                    }
                    fullwidth
                />


                <Paper className="paperStyle">
                    <TableContainer sx={{ maxHeight: 440, maxWidth: 1200, marginLeft:5 }}>
                        <Table sx={{ minWidth: 700 }} aria-label="customized table">
                            <TableHead className="tableheader">
                                <TableRow className="tablerow">
                                    <TableCell className="tblhd" align="left">
                                        ID
                                    </TableCell>
                                    <TableCell className="tblhd" align="left">
                                        Reason
                                    </TableCell>
                                    <TableCell className="tblhd" align="left">
                                        Transaction Code
                                    </TableCell>
                                    <TableCell className="tblhd" align="left">
                                        Receipt ID
                                    </TableCell>
                                    <TableCell className="tblhd" align="left">
                                        Actions
                                    </TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>

                                {
                                    transactionJournal
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((value, index) => (
                                            <TableRow key={index} className={index % 2 ? "classEven" : "classOdd"}>
                                                <TableCell align="left">{value.id}</TableCell>
                                                <TableCell align="left"> {value.receiptReason?.accountingRuleId} - {value.receiptReason?.accountCodeTable?.accountCode} - {value.receiptReason?.subAccountTable?.subAccountCode} </TableCell>
                                                <TableCell align="left">{value.transactionCode?.transactionCode}</TableCell>
                                                <TableCell align="left">{value.receiptId}</TableCell>
                                                <TableCell align="left">
                                                    <div className="TableClass">

                                                        {
                                                            access?.find(element => element === "get-transactionjournal") ?
                                                                <InfoIcon
                                                                    color="primary"
                                                                    style={{cursor: "pointer", marginRight: 10}}
                                                                    onClick={() =>infoOpen(value)}
                                                                /> : null
                                                        }

                                                        {
                                                            access?.find(element => element === "update-transactionjournal") ?
                                                                <EditIcon
                                                                    color="primary"
                                                                    style={{cursor: "pointer", marginRight: 10}}
                                                                    onClick={() =>editOpen(value)}
                                                                /> : null
                                                        }
                                                        {
                                                            access?.find(element => element === "soft-delete-transactionjournal") ?
                                                                <DeleteIcon
                                                                    style={{cursor:"pointer"}}
                                                                    className="deleteClass"
                                                                    color="error"
                                                                    onClick={() =>deactivateTransJournal(value.id)}
                                                                /> : null
                                                        }
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                }
                            </TableBody>
                        </Table>
                        <br/>
                        <TablePagination
                            className="contentPagination"
                            rowsPerPageOptions={[5, 10, 25, 50, 100]}
                            component="div"
                            count={transactionJournal.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                        />
                    </TableContainer>
                    <br/>
                </Paper>
                <br/>
            </div>
            <div className="footerdescription">
                <h6 className="footerContent">
                    Copyright © www.futurainstech.com @{moment().format("YYYY")}
                </h6>
            </div>

            <Modal
                dialogAs={DraggableComponent}
                show={info}
                onHide={infoClose}
                centered
                size="lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title>  Transaction Journal Info </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                        <TransactionJournalInfo data={infoDetails}/>
                    </div>
                </Modal.Body>
            </Modal>

            <Modal
                dialogAs={DraggableComponent}
                show={add}
                onHide={addClose}
                centered
                size="lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title>  Transaction Journal Add </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                        <TransactionJournalAdd getAll={getAllTransactionJournals} close={addClose} currencies={currencyCodes}
                                               transCodes={transactionCode} signs={accountSigns} accountRules={accountingRule} receiptBooks={receiptBook}/>
                    </div>
                </Modal.Body>
            </Modal>

            <Modal
                dialogAs={DraggableComponent}
                show={edit}
                onHide={editClose}
                centered
                size="lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title>  Transaction Journal Edit </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                        <TransactionJournalEdit getAll={getAllTransactionJournals} close={editClose} currencies={currencyCodes} setRecord={setUpdateDetails}
                                                transCodes={transactionCode} signs={accountSigns} accountRules={accountingRule} receiptBooks={receiptBook} record={updateDetails}/>
                    </div>
                </Modal.Body>
            </Modal>


        </div>
    );
};

export default TransactionJournalDetails;
