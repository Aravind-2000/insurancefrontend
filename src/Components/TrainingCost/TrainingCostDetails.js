import React, {useEffect, useState} from 'react';
import {
    Button,
    makeStyles,
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow
} from "@material-ui/core";
import InsuranceApi from "../../Service/InsuranceApi";
import AddBoxIcon from "@mui/icons-material/AddBox";
import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import InfoIcon from "@mui/icons-material/Info";
import moment from "moment";
import {Modal} from "react-bootstrap";
import TrainingCostAdd from "./TrainingCostAdd";
import TrainingCostInfo from "./TrainingCostInfo";
import TrainingCostEdit from "./TrainingCostEdit";



const useStyles = makeStyles((theme) => ({
    BackGround: {
        backgroundColor: "#d50000",
        color: "white",
    },
}));

const TrainingCostDetails = () => {

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

    const classes = useStyles();

    const access = JSON.parse(sessionStorage.getItem("specialaccess"))
    const [trainingCosts, setTrainingCosts] = useState([]);
    const [currencies, setCurrencies] = useState([]);
    const [updateDetails, setUpdateDetails] = useState("");
    const [infoRecord, setInfoRecord] = useState("");

    useEffect(() => {
        getAllTrainingCosts()
        getCurrencies()
    }, []);

    const getAllTrainingCosts = () => {
        InsuranceApi.getAllTrainingCost().then((res) => {
            setTrainingCosts(res.data)
        }).catch(err => console.log(err))
    }

    const getCurrencies = () => {
        InsuranceApi.getParameterRule("CR001").then((res) => {
            setCurrencies(res.data)
        }).catch(err => console.log(err))
    }

    const [add, setAdd] = useState(false);
    const openAdd = () =>{
        setAdd(true)
    }
    const closeAdd = () => {
        setAdd(false)
    }

    const [info, setInfo] = useState(false);
    const infoOpen = (value) => {
        setInfoRecord(value)
        setInfo(true)
    }
    const infoClose = () => {
        setInfo(false)
    }

    const [edit, setEdit] = useState(false);
    const editOpen = (value) => {
        setUpdateDetails(value)
        setEdit(true)
    }
    const editClose = () => {
        setEdit(false)
    }

    const deactivateTrainingCost = (id) => {
        InsuranceApi.deactivateTrainingCost(id).then((res) => {
            getAllTrainingCosts();
        }).catch(err => console.log(err))
    }
    return (
        <div>
            <div className="container">
                <div className="classTitle">
                    <h2> <b> Training Cost Details </b> </h2>
                </div>
                <br/>

                {
                    access?.find(element => element === "add-cost") ?
                        <Button>
                            <AddBoxIcon
                                fontSize="large"
                                className={classes.BackGround}
                                onClick={openAdd}
                            />
                        </Button> : null
                }


                <Paper className="paperStyle">
                    <TableContainer sx={{ maxHeight: 440, maxWidth: 1200, marginLeft:5 }}>
                        <Table sx={{ minWidth: 700 }} aria-label="customized table">
                            <TableHead className="tableheader">
                                <TableCell className="tblhd" align="left">
                                    Training Cost ID
                                </TableCell>
                                <TableCell className="tblhd" align="left">
                                    Base Fee
                                </TableCell>
                                <TableCell className="tblhd" align="left">
                                   Trainee Fee
                                </TableCell>
                                <TableCell className="tblhd" align="left">
                                   Venue Fee
                                </TableCell>
                                <TableCell className="tblhd" align="left">
                                    Actions
                                </TableCell>
                            </TableHead>

                            <TableBody>
                                {
                                    trainingCosts
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((value, index) =>(
                                            <TableRow key={index} className={index % 2 ? "classEven" : "classOdd"}>
                                                <TableCell  align="left">
                                                    {value.id}
                                                </TableCell>
                                                <TableCell  align="left">
                                                    {value.baseFee}
                                                </TableCell>
                                                <TableCell  align="left">
                                                    {value.trainerFee}
                                                </TableCell>
                                                <TableCell  align="left">
                                                    {value.venueFee}
                                                </TableCell>

                                                <TableCell>
                                                    <div className="tableClass">
                                                        {
                                                            access?.find(element => element === "get-cost") ?
                                                                <InfoIcon
                                                                    color="primary"
                                                                    style={{cursor: "pointer", marginRight: 10}}
                                                                    onClick={() => infoOpen(value)}
                                                                /> : null
                                                        }

                                                        {
                                                            access?.find(element => element === "update-cost") ?
                                                                <InfoIcon
                                                                    color="primary"
                                                                    style={{cursor: "pointer", marginRight: 10}}
                                                                    onClick={() => editOpen(value)}
                                                                /> : null
                                                        }

                                                        {
                                                            access?.find(element => element === "soft-delete-cost") ?
                                                                <InfoIcon
                                                                    color="primary"
                                                                    style={{cursor: "pointer", marginRight: 10}}
                                                                    onClick={() => deactivateTrainingCost(value.id)}
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
                            count={trainingCosts.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                        />
                    </TableContainer>
                </Paper>
            </div>

            <div className="footerdescription">
                <h6 className="footerContent">
                    Copyright © www.futurainstech.com @{moment().format("YYYY")}
                </h6>
            </div>

            <Modal
                show={add}
                onHide={closeAdd}
                centered
                size="lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title> Add Training Cost Details </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                        <TrainingCostAdd currencies={currencies} getAll={getAllTrainingCosts} open={add} close={closeAdd}/>
                    </div>
                </Modal.Body>
            </Modal>

            <Modal
                show={info}
                onHide={infoClose}
                centered
                size="lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title>  Training Details </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                        <TrainingCostInfo data={infoRecord}/>
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
                    <Modal.Title> Edit Training Details </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                        <TrainingCostEdit close={editClose} getAll={getAllTrainingCosts} currencies={currencies} record={updateDetails} setRecord={setUpdateDetails}/>
                    </div>
                </Modal.Body>
            </Modal>

        </div>
    );
};

export default TrainingCostDetails;
