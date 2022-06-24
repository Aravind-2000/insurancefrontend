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
import moment from "moment";
import {Modal} from "react-bootstrap";
import AddTransactionCode from "./AddTransactionCode";
import EditTransactionCode from "./EditTransactionCode";




const useStyles = makeStyles((theme) => ({
    BackGround: {
        backgroundColor: "#d50000",
        color: "white",
    },
}));


const TransactionCodeDetails = () => {

    const classes = useStyles();

    const access = JSON.parse(sessionStorage.getItem("specialaccess"))

    useEffect(() => {
        getAllTransactionCodes()
    }, []);

    const [transactionCodes, setTransactionCodes] = useState([]);

    const getAllTransactionCodes = () => {
        InsuranceApi.getAllTransCodes().then((res) => {
            setTransactionCodes(res.data)
        }).catch(err => console.log(err))
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

    const deactivateTransCode = (id) => {
        if( window.confirm("Do you want to delete this trainee ? ")){
            InsuranceApi.softDeleteTransCode(id).then((res) => {
                getAllTransactionCodes()
            }).catch(err => console.log(err))
        }
    }


    const [search, setSearch] = useState("");
    const globalsearch = (val) =>{
        val === "" ? getAllTransactionCodes() : axios.get(`http://localhost:8090/transactioncode/search/${val}`, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            }
        }).then((res) => {
            setTransactionCodes(res.data);
        })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <div>
            <div className="container">
                <div className="classTitle">
                    <h2> <b> Currency Conversion Details </b> </h2>
                </div>
                <br/>
                {
                    access?.find(element => element === "add-transactioncode") ?
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
                                        Transaction Code
                                    </TableCell>
                                    <TableCell className="tblhd" align="left">
                                        Transaction Description
                                    </TableCell>
                                    <TableCell className="tblhd" align="left">
                                        Transaction Date and Time
                                    </TableCell>
                                    <TableCell className="tblhd" align="left">
                                       Actions
                                    </TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {
                                    transactionCodes
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((value, index) => (
                                            <TableRow key={index} className={index % 2 ? "classEven" : "classOdd"}>
                                                <TableCell align="left">{value.id}</TableCell>
                                                <TableCell align="left">{value.transactionCode}</TableCell>
                                                <TableCell align="left">{value.transactionDesc}</TableCell>
                                                <TableCell align="left">{moment(value.transactionDate).format("DD-MM-YYYY HH:mm")}</TableCell>
                                                <TableCell align="left">
                                                    <div className="TableClass">
                                                        {
                                                            access?.find(element => element === "update-transactioncode") ?
                                                                <EditIcon
                                                                color="primary"
                                                                style={{cursor: "pointer", marginRight: 10}}
                                                                onClick={() =>editOpen(value)}
                                                                /> : null
                                                        }
                                                        {
                                                            access?.find(element => element === "soft-delete-transactioncode") ?
                                                                <DeleteIcon
                                                                style={{cursor:"pointer"}}
                                                                className="deleteClass"
                                                                color="error"
                                                                onClick={() =>deactivateTransCode(value.id) }
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
                            count={transactionCodes.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                        />
                    </TableContainer>
                    <br/>
                </Paper>
            </div>
            <div className="footerdescription">
                <h6 className="footerContent">
                    Copyright © www.futurainstech.com @{moment().format("YYYY")}
                </h6>
            </div>


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
                        <AddTransactionCode getAll={getAllTransactionCodes} close={addClose}/>
                    </div>
                </Modal.Body>
            </Modal>


            <Modal
                show={edit}
                onHide={editClose}
                centered
                size="lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title>  Edit Transaction Code Details </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                        <EditTransactionCode getAll={getAllTransactionCodes} close={editClose} record={updateDetails} setRecord={setUpdateDetails}/>
                    </div>
                </Modal.Body>
            </Modal>

        </div>
    );
};

export default TransactionCodeDetails;
