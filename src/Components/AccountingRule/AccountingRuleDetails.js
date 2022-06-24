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
import AddAccountingRule from "./AddAccountingRule";
import AccountingRuleInfo from "./AccountingRuleInfo";
import EditAccountingRule from "./EditAccountingRule";



const useStyles = makeStyles((theme) => ({
    BackGround: {
        backgroundColor: "#d50000",
        color: "white",
    },
}));


const AccountingRuleDetails = () => {

    const classes = useStyles();

    const access = JSON.parse(sessionStorage.getItem("specialaccess"))





    const [accountingRule, setAccountingRule] = useState([]);
    const [accountMaster, setAccountMaster] = useState([]);
    const [subAccounts, setSubAccounts] = useState([]);
    const [accountSigns, setAccountSigns] = useState([]);
    const [currency, setCurrency] = useState([]);


    useEffect(() => {
        getAllAccountMaster()
        getAllAccountingRules()
        getAccountSigns()
        getAllSubAccount()
        getAllCurrencies()
    }, []);


    const getAllAccountingRules = () => {
        InsuranceApi.getAllAccountRule().then((res) => {
            setAccountingRule(res.data)
        }).catch(err => console.log(err))
    }

    const getAllAccountMaster = () => {
        InsuranceApi.getAllAccountMaster().then((res) => {
            setAccountMaster(res.data)
        }).catch(err =>console.log(err))
    }

    const getAllSubAccount = () => {
        const userid = sessionStorage.getItem("userid")
        axios.get(`http://localhost:8090/subaccount/getall/${userid}`, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            }
        }).then((res) => {
            setSubAccounts(res.data)
        }).catch(err => console.log(err))
    }

    const getAllCurrencies = () => {
        InsuranceApi.getAllCurrCodes().then((res) => {
            setCurrency(res.data)
        }).catch(err => console.log(err))
    }


    const getAccountSigns = () => {
        InsuranceApi.getParameterRule("AC001").then((res) => {
            setAccountSigns(res.data)
        }).catch(err => console.log(err))
    }


    const [search, setSearch] = useState("");
    const globalsearch = (val) =>{
        val === "" ? getAllAccountingRules() : axios.get(`http://localhost:8090/accountrule/search/${val}`, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            }
        }).then((res) => {
            setAccountingRule(res.data);
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


    //Add Open
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

    const deactivateAccRule = (id) => {
        if( window.confirm("Do you want to delete this trainee ? ")){
            InsuranceApi.softDeleteAccountRule(id).then((res) => {
                getAllAccountMaster()
            }).catch(err => console.log(err))
        }
    }

    return (
        <div>
            <div className="container">
                <div className="classTitle">
                    <h2> <b> Accounting Rule Details </b> </h2>
                </div>
                <br/>
                {
                    access?.find(element => element === "add-accountrule") ?
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
                                        Account Rule
                                    </TableCell>
                                    <TableCell className="tblhd" align="left">
                                        Account Code
                                    </TableCell>
                                    <TableCell className="tblhd" align="left">
                                        Sub Account Code
                                    </TableCell>
                                    <TableCell className="tblhd" align="left">
                                        Actions
                                    </TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>

                                {
                                    accountingRule
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((value, index) => (
                                            <TableRow key={index} className={index % 2 ? "classEven" : "classOdd"}>
                                                <TableCell align="left">{value.id}</TableCell>
                                                <TableCell align="left">{value.accountingRuleId}</TableCell>
                                                <TableCell align="left">{value.accountCodeTable?.accountCode}</TableCell>
                                                <TableCell align="left">{value.subAccountTable?.subAccountCode}</TableCell>
                                                <TableCell align="left">
                                                    <div className="TableClass">

                                                        {
                                                            access?.find(element => element === "get-accountrule") ?
                                                                <InfoIcon
                                                                    color="primary"
                                                                    style={{cursor: "pointer", marginRight: 10}}
                                                                    onClick={() =>infoOpen(value)}
                                                                /> : null
                                                        }

                                                        {
                                                            access?.find(element => element === "update-accountrule") ?
                                                                <EditIcon
                                                                    color="primary"
                                                                    style={{cursor: "pointer", marginRight: 10}}
                                                                    onClick={() =>editOpen(value)}
                                                                /> : null
                                                        }
                                                        {
                                                            access?.find(element => element === "soft-delete-accountrule") ?
                                                                <DeleteIcon
                                                                    style={{cursor:"pointer"}}
                                                                    className="deleteClass"
                                                                    color="error"
                                                                    onClick={() =>deactivateAccRule(value.id) }
                                                                /> : null
                                                        }
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                            </TableBody>
                        </Table>
                        <br/>
                        <TablePagination
                            className="contentPagination"
                            rowsPerPageOptions={[5, 10, 25, 50, 100]}
                            component="div"
                            count={accountingRule.length}
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
                    <Modal.Title>  Accounting Rule Info </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                        <AccountingRuleInfo data={infoDetails}/>
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
                    <Modal.Title> Add Accounting Rule  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                        <AddAccountingRule getAll={getAllAccountingRules} subAccountCode={subAccounts} setSubAccountCode={setSubAccounts}
                                           close={addClose} accountCode={accountMaster} setAccountCode={setAccountMaster}
                                           signs={accountSigns} currencies={currency}/>
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
                    <Modal.Title>  Accounting Rule Edit </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                        <EditAccountingRule getAll={getAllAccountingRules} close={editClose} subAccountCode={subAccounts}
                                            accountMasters={accountMaster} signs={accountSigns} setRecord={setUpdateDetails}
                                            record={updateDetails} currencies={currency}/>
                    </div>
                </Modal.Body>
            </Modal>

        </div>
    );
};

export default AccountingRuleDetails;
