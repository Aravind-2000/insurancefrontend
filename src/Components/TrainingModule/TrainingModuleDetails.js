import React, {useEffect, useState} from 'react';
import {
    Button,
    makeStyles,
    Table,
    TableBody,
    TableHead,
    TablePagination
} from "@material-ui/core";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import InsuranceApi from "../../Service/InsuranceApi";
import AddBoxIcon from "@mui/icons-material/AddBox";
import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import InfoIcon from "@mui/icons-material/Info";
import moment from "moment";
import {Modal} from "react-bootstrap";
import TrainingModuleInfo from "./TrainingModuleInfo";
import TrainingModuleAdd from "./TrainingModuleAdd";
import TrainingModuleEdit from "./TrainingModuleEdit";
import axios from "axios";
import {InputAdornment, TextField} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";


const useStyles = makeStyles((theme) => ({
    BackGround: {
        backgroundColor: "#d50000",
        color: "white",
    },
}));
const TrainingModuleDetails = () => {

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
    const [trainingModules, setTrainingModules] = useState([]);
    const [levels, setLevels] = useState([]);

    const [updateDetails, setUpdateDetails] = useState("");
    const [infoRecord, setInfoRecord] = useState("");


    useEffect(() => {
        getAllTrainingCosts()
        getAllTrainingModules()
        getLevels()
    }, []);



    const getAllTrainingCosts = () => {
        InsuranceApi.getAllTrainingCost().then((res) => {
            setTrainingCosts(res.data)
        }).catch(err => console.log(err))
    }

    const getAllTrainingModules = () => {
        InsuranceApi.getAllTrainingModule().then((res) => {
            setTrainingModules(res.data)
        }).catch(err => console.log(err))
    }

    const getLevels = () => {
        InsuranceApi.getParameterRule("TL001").then((res) => {
            setLevels(res.data)
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

    const deactivateTrainingModule = (id) => {
        InsuranceApi.deactivateTrainingModule(id).then((res) => {
            getAllTrainingCosts();
        }).catch(err => console.log(err))
    }

    const [search, setSearch] = useState("");
    const globalsearch = (val) =>{
        val === "" ? getAllTrainingModules() : axios.get(`http://localhost:8090/trainingmodule/search/${val}`,{
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            }
        }).then((res) => {
            setTrainingModules(res.data);
        })
            .catch((err) => {
                console.log(err)
            })
    }



    return (
        <div>
            <div className="container">
                <div className="classTitle">
                    <h2> <b> Training Module Details </b> </h2>
                </div>
                <br/>

                {
                    access?.find(element => element === "add-module") ?
                        <Button>
                            <AddBoxIcon
                                fontSize="large"
                                className={classes.BackGround}
                                onClick={openAdd}
                            />
                        </Button> : null
                }

                {/*<input type="search" placeholder="search" value={search} onChange={(e) => {setSearch(e.target.value); globalsearch(e.target.value)}} />*/}

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
                                <TableCell className="tblhd" align="left">
                                    Training Module ID
                                </TableCell>
                                <TableCell className="tblhd" align="left">
                                    Training Topic
                                </TableCell>
                                <TableCell className="tblhd" align="left">
                                    Training Level
                                </TableCell>
                                <TableCell className="tblhd" align="left">
                                    Actions
                                </TableCell>
                            </TableHead>

                            <TableBody>
                                {
                                    trainingModules
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((value, index) =>(
                                            <TableRow key={index} className={index % 2 ? "classEven" : "classOdd"}>
                                                <TableCell  align="left">
                                                    {value.id}
                                                </TableCell>
                                                <TableCell  align="left">
                                                    {value.trainingTopic}
                                                </TableCell>
                                                <TableCell  align="left">
                                                    {value.trainingLevel}
                                                </TableCell>
                                                <TableCell>
                                                    <div className="tableClass">
                                                        {
                                                            access?.find(element => element === "get-module") ?
                                                                <InfoIcon
                                                                    color="primary"
                                                                    style={{cursor: "pointer", marginRight: 10}}
                                                                    onClick={() => infoOpen(value)}
                                                                /> : null
                                                        }

                                                        {
                                                            access?.find(element => element === "update-module") ?
                                                                <InfoIcon
                                                                    color="primary"
                                                                    style={{cursor: "pointer", marginRight: 10}}
                                                                    onClick={() => editOpen(value)}
                                                                /> : null
                                                        }

                                                        {
                                                            access?.find(element => element === "soft-delete-module") ?
                                                                <InfoIcon
                                                                    color="primary"
                                                                    style={{cursor: "pointer", marginRight: 10}}
                                                                    onClick={() => deactivateTrainingModule(value.id)}
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
                            count={trainingModules.length}
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
                onHide={closeAdd}
                centered
                size="lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title> Add Training Module Details </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                        <TrainingModuleAdd getAll={getAllTrainingModules} close={closeAdd} costs={trainingCosts} level={levels} setCosts={setTrainingCosts}/>
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
                    <Modal.Title>  Training Module Details </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                        <TrainingModuleInfo data={infoRecord}/>
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
                        <TrainingModuleEdit record={updateDetails} setRecord={setUpdateDetails} getAll={getAllTrainingModules} close={editClose} level={levels}/>
                    </div>
                </Modal.Body>
            </Modal>

        </div>
    );
};

export default TrainingModuleDetails;
