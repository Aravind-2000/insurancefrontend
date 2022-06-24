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
import AddCurrencyCode from "./AddCurrencyCode";
import EditCurrencyCode from "./EditCurrencyCode";






const useStyles = makeStyles((theme) => ({
    BackGround: {
        backgroundColor: "#d50000",
        color: "white",
    },
}));

const CurrencyCodeDetails = () => {
    const classes = useStyles();

    const access = JSON.parse(sessionStorage.getItem("specialaccess"))


    const [currencyCodes, setCurrencyCodes] = useState([]);

    useEffect(() => {
        getAllCurrCodes()
    }, []);


    const getAllCurrCodes = () => {
        InsuranceApi.getAllCurrCodes().then((res) => {
            setCurrencyCodes(res.data)
        }).catch(err => console.log(err))
    }


    const [search, setSearch] = useState("");
    const globalsearch = (val) =>{
        val === "" ? getAllCurrCodes() : axios.get(`http://localhost:8090/currencycode/search/${val}`, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            }
        }).then((res) => {
            setCurrencyCodes(res.data);
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

    const deactivateCode = (id) => {
        if( window.confirm("Do you want to delete this trainee ? ")){
            InsuranceApi.softDeleteCurrCode(id).then((res) => {
                getAllCurrCodes()
            }).catch(err => console.log(err))
        }
    }

    return (
        <div>
            <div className="container">
                <div className="classTitle">
                    <h2> <b> Currency Code Details </b> </h2>
                </div>
                <br/>
                {
                    access?.find(element => element === "add-currency") ?
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
                                        Currency Code
                                    </TableCell>
                                    <TableCell className="tblhd" align="left">
                                        Currency Description
                                    </TableCell>
                                    <TableCell className="tblhd" align="left">
                                        Actions
                                    </TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>

                                {
                                    currencyCodes
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((value, index) => (
                                            <TableRow key={index} className={index % 2 ? "classEven" : "classOdd"}>
                                                <TableCell align="left">{value.id}</TableCell>
                                                <TableCell align="left">{value.currencyCode}</TableCell>
                                                <TableCell align="left">{value.currencyDescription}</TableCell>
                                                <TableCell align="left">
                                                    <div className="TableClass">
                                                        {
                                                            access?.find(element => element === "update-currency") ?
                                                                <EditIcon
                                                                    color="primary"
                                                                    style={{cursor: "pointer", marginRight: 10}}
                                                                    onClick={() =>editOpen(value)}
                                                                /> : null
                                                        }
                                                        {
                                                            access?.find(element => element === "soft-delete-currency") ?
                                                                <DeleteIcon
                                                                    style={{cursor:"pointer"}}
                                                                    className="deleteClass"
                                                                    color="error"
                                                                    onClick={() =>deactivateCode(value.id) }
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
                            count={currencyCodes.length}
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
                    <Modal.Title> Add Currency Code </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                        <AddCurrencyCode getAll={getAllCurrCodes} close={addClose}/>
                    </div>
                </Modal.Body>
            </Modal>

            <Modal
                show={edit}
                onHide={editClose}
                centered
                size="sm"
            >
                <Modal.Header closeButton>
                    <Modal.Title> Edit Currency Code </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                        <EditCurrencyCode record={updateDetails} setRecord={setUpdateDetails} getAll={getAllCurrCodes} close={addClose} />
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default CurrencyCodeDetails;
