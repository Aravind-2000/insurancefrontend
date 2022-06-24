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
import AccountMasterInfo from "./AccountMasterInfo";
import AddAccountMaster from "./AddAccountMaster";
import DraggableComponent from "../../Service/DraggableComponent";
import EditAccountMaster from "./EditAccountMaster";





const useStyles = makeStyles((theme) => ({
    BackGround: {
        backgroundColor: "#d50000",
        color: "white",
    },
}));
const AccountCodeDetails = () => {


    const classes = useStyles();

    const access = JSON.parse(sessionStorage.getItem("specialaccess"))

    const [accountMaster, setAccountMaster] = useState([]);


    useEffect(() => {
        getAllAccountMaster()
    }, []);


    const getAllAccountMaster = () => {
        InsuranceApi.getAllAccountMaster().then((res) => {
            setAccountMaster(res.data)
        }).catch(err =>console.log(err))
    }

    const [search, setSearch] = useState("");
    const globalsearch = (val) =>{
        val === "" ? getAllAccountMaster() : axios.get(`http://localhost:8090/accountmaster/search/${val}`, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            }
        }).then((res) => {
            setAccountMaster(res.data);
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

    const deactivateAccMaster = (id) => {
        if( window.confirm("Do you want to delete this trainee ? ")){
            InsuranceApi.softDeleteAccountMaster(id).then((res) => {
                getAllAccountMaster()
            }).catch(err => console.log(err))
        }
    }


    return (
        <div>
            <div className="container">
                <div className="classTitle">
                    <h2> <b> Account Master Details </b> </h2>
                </div>
                <br/>
                {
                    access?.find(element => element === "add-accountmaster") ?
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
                                        Account Code
                                    </TableCell>
                                    <TableCell className="tblhd" align="left">
                                        Account Short Description
                                    </TableCell>
                                    <TableCell className="tblhd" align="left">
                                       Actions
                                    </TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>

                                {
                                    accountMaster
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((value, index) => (
                                            <TableRow key={index} className={index % 2 ? "classEven" : "classOdd"}>
                                                <TableCell align="left">{value.id}</TableCell>
                                                <TableCell align="left">{value.accountCode}</TableCell>
                                                <TableCell align="left">{value.accountShortDescription}</TableCell>
                                                <TableCell align="left">
                                                    <div className="TableClass">

                                                        {
                                                            access?.find(element => element === "get-accountmaster") ?
                                                                <InfoIcon
                                                                    color="primary"
                                                                    style={{cursor: "pointer", marginRight: 10}}
                                                                    onClick={() =>infoOpen(value)}
                                                                /> : null
                                                        }

                                                        {
                                                            access?.find(element => element === "update-accountmaster") ?
                                                                <EditIcon
                                                                    color="primary"
                                                                    style={{cursor: "pointer", marginRight: 10}}
                                                                    onClick={() =>editOpen(value)}
                                                                /> : null
                                                        }
                                                        {
                                                            access?.find(element => element === "soft-delete-accountmaster") ?
                                                                <DeleteIcon
                                                                    style={{cursor:"pointer"}}
                                                                    className="deleteClass"
                                                                    color="error"
                                                                    onClick={() =>deactivateAccMaster(value.id) }
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
                            count={accountMaster.length}
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
                    <Modal.Title>  Account Master Info </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                        <AccountMasterInfo data={infoDetails}/>
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
                    <Modal.Title>  Add Account Master  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                        <AddAccountMaster getAll={getAllAccountMaster} close={addClose} />
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
                    <Modal.Title>  Edit Account Master  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                        <EditAccountMaster getAll={getAllAccountMaster} close={editClose} record={updateDetails} setRecord={setUpdateDetails} />
                    </div>
                </Modal.Body>
            </Modal>



        </div>
    );
};

export default AccountCodeDetails;
