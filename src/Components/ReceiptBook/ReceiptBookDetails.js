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
import PeopleIcon from "@mui/icons-material/People";
import InfoIcon from "@mui/icons-material/Info";
import moment from "moment";
import {Modal} from "react-bootstrap";
import DraggableComponent from "../../Service/DraggableComponent";
import ReceiptBookInfo from "./ReceiptBookInfo";
import ReceiptBookAdd from "./ReceiptBookAdd";
import ReceiptBookEdit from "./ReceiptBookEdit";
import ReceiptReasons from "./ReceiptReasons";





const useStyles = makeStyles((theme) => ({
    BackGround: {
        backgroundColor: "#d50000",
        color: "white",
    },
}));


const ReceiptBookDetails = () => {

    const classes = useStyles();

    const access = JSON.parse(sessionStorage.getItem("specialaccess"))

    const [receiptBook, setReceiptBook] = useState([]);
    const [agents, setAgents] = useState([]);
    const [currencyCodes, setCurrencyCodes] = useState([]);
    const [methods, setMethods] = useState([]);

    useEffect(() => {
        getAllCurrCodes()
        getAllMethods()
        getAllAgents()
        getAllReceiptBook()
    }, []);

    const getAllCurrCodes = () => {
        InsuranceApi.getAllCurrCodes().then((res) => {
            setCurrencyCodes(res.data)
        }).catch(err => console.log(err))
    }

    const getAllMethods = () => {
        InsuranceApi.getParameterRule("TM001").then((res) => {
            setMethods(res.data)
        }).catch(err => console.log(err))
    }

    const getAllAgents = () => {
        InsuranceApi.getAgents(sessionStorage.getItem("userid")).then((res) => {
            setAgents(res.data)
        }).catch(err => console.log(err))
    }

    const getAllReceiptBook = () => {
        InsuranceApi.getAllreceiptbook().then((res) => {
            setReceiptBook(res.data)
        }).catch(err => console.log(err))
    }


    const [search, setSearch] = useState("");
    const globalsearch = (val) =>{
        val === "" ? getAllReceiptBook() : axios.get(`http://localhost:8090/receiptbook/search/${val}`, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            }
        }).then((res) => {
            setReceiptBook(res.data);
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


    //TransJournals Open
    const [transJournalDetails, setTransJournalDetails] = useState([]);
    const [trans, setTrans] = useState(false);
    const transOpen = (value) => {
        setTransJournalDetails(value.receiptReasons)
        setTrans(true)
    }
    const transClose = () => {
        setTrans(false)
    }


    const deactivateReceiptBook = (id) => {
        if( window.confirm("Do you want to delete this trainee ? ")){
            InsuranceApi.softreceiptbook(id).then((res) => {
                getAllReceiptBook()
            }).catch(err => console.log(err))
        }
    }


    return (
        <div>
            <div className="container">
                <div className="classTitle">
                    <h2> <b> Receipt Book Details </b> </h2>
                </div>
                <br/>
                {
                    access?.find(element => element === "add-receiptbook") ?
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
                                        Receipt Number
                                    </TableCell>
                                    <TableCell className="tblhd" align="left">
                                        Agent
                                    </TableCell>
                                    <TableCell className="tblhd" align="left">
                                      Receipt Date
                                    </TableCell>
                                    <TableCell className="tblhd" align="left">
                                        Actions
                                    </TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>

                                {
                                    receiptBook
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((value, index) => (
                                            <TableRow key={index} className={index % 2 ? "classEven" : "classOdd"}>
                                                <TableCell align="left">{value.id}</TableCell>
                                                <TableCell align="left">{value.receiptNo}</TableCell>
                                                <TableCell align="left">{value.agent?.id} - {value.agent?.client?.givenName}</TableCell>
                                                <TableCell align="left">{moment(value.receiptDate).format("DD-MM-YYYY")}</TableCell>
                                                <TableCell align="left">
                                                    <div className="TableClass">

                                                        {
                                                            access?.find(element => element === "get-receiptbook") ?
                                                                <InfoIcon
                                                                    color="primary"
                                                                    style={{cursor: "pointer", marginRight: 10}}
                                                                    onClick={() =>infoOpen(value)}
                                                                /> : null
                                                        }

                                                        {
                                                            access?.find(element => element === "update-receiptbook") ?
                                                                <EditIcon
                                                                    color="primary"
                                                                    style={{cursor: "pointer", marginRight: 10}}
                                                                    onClick={() =>editOpen(value)}
                                                                /> : null
                                                        }
                                                        {
                                                            access?.find(element => element === "soft-delete-receiptbook") ?
                                                                <DeleteIcon
                                                                    style={{cursor:"pointer"}}
                                                                    className="deleteClass"
                                                                    color="error"
                                                                    onClick={() =>deactivateReceiptBook(value.id)}
                                                                /> : null
                                                        }
                                                        {
                                                            access?.find(element => element === "get-receiptbook") ?
                                                                <PeopleIcon
                                                                    color="primary"
                                                                    style={{cursor: "pointer", marginRight: 10}}
                                                                    onClick={() => transOpen(value)}
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
                            count={receiptBook.length}
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
                    <Modal.Title>  Receipt Book Info </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                        <ReceiptBookInfo data={infoDetails}/>
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
                    <Modal.Title>  Receipt Book Add </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                        <ReceiptBookAdd close={addClose} getAll={getAllReceiptBook} currencies={currencyCodes} agent={agents} method={methods}/>
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
                    <Modal.Title>  Receipt Book Edit </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                        <ReceiptBookEdit agent={agents} method={methods} currencies={currencyCodes} getAll={getAllReceiptBook} close={editClose} record={updateDetails}
                                         setRecord={setUpdateDetails}/>
                    </div>
                </Modal.Body>
            </Modal>

            <Modal
                dialogAs={DraggableComponent}
                show={trans}
                onHide={transClose}
                centered
                size="lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title> Receipt's Transaction Journals</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                        <ReceiptReasons value={transJournalDetails}/>
                    </div>
                </Modal.Body>
            </Modal>


        </div>
    );
};

export default ReceiptBookDetails;
