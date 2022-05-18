import React, {useState, useEffect} from 'react';
import InsuranceApi from "../../Service/InsuranceApi";
import {
    Button,
    makeStyles, Paper,
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow
} from "@material-ui/core";
import AddBoxIcon from "@mui/icons-material/AddBox";
import TableCell from "@mui/material/TableCell";
import moment from "moment";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoIcon from '@mui/icons-material/Info';
import PeopleIcon from '@mui/icons-material/People';
import {Modal} from "react-bootstrap";
import TrainingAdd from "./TrainingAdd";
import TrainingEdit from "./TrainingEdit";
import TrainingInfo from "./TrainingInfo";
import axios from "axios";


const useStyles = makeStyles((theme) => ({
    BackGround: {
        backgroundColor: "#d50000",
        color: "white",
    },
}));
const TrainingDetails = () => {

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
    const [trainingDetails, setTrainingDetails] = useState([]);
    const [moduleDetails, setModuleDetails] = useState([]);
    const [updateDetails, setUpdateDetails] = useState("");
    const [infoRecord, setInfoRecord] = useState("");
    const [mode, setMode] = useState([]);
    const [type, setType] = useState([]);
    const [trainee, setTrainee] = useState([]);
    const [agents, setAgents] = useState([]);

    useEffect(() => {
        getAllTrainings()
        getAllModules()
        getModes()
        getTypes()
        getAgents()
    }, []);

    const getAllTrainings = () => {
        InsuranceApi.getAllTrainings().then((res) => {
            setTrainingDetails(res.data)
        }).catch(err => console.log(err))
    }

    const getAllModules = () => {
        InsuranceApi.getAllTrainingModule().then((res) => (
            setModuleDetails(res.data)
        )).catch(err => console.log(err))
    }

    const getAgents = () => {
        InsuranceApi.getAgents(sessionStorage.getItem("userid")).then((res) => {
            setAgents(res.data)
        }).catch(err => console.log(err))
    }

    const getModes = () => {
        InsuranceApi.getParameterRule("TM001").then((res) => {
            setMode(res.data)
        }).catch(err => console.log(err))
    }

    const getTypes = () => {
        InsuranceApi.getParameterRule("TT001").then((res) => {
            setType(res.data)
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

    const [traineeInfo, setTraineeInfo] = useState(false);
    const traineeInfoOpen = (value) => {
        setTrainee(value);
        setTraineeInfo(true)
    }
    const traineeInfoClose = () => {
        setTraineeInfo(false)
    }

    const deactivateTraining = (id) => {

        if( window.confirm("Do you want to delete this training ? ")){
            InsuranceApi.deactivateTraining(id).then((res) => {
                getAllTrainings()
            }).catch(err => console.log(err))
        }
    }

    const [search, setSearch] = useState("");
    const globalsearch = (val) =>{
        val === "" ? getAllTrainings() : axios.get(`http://localhost:8090/training/search/${val}`,{
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            }
        }).then((res) => {
            setTrainingDetails(res.data);
        })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <div>
            <div className="container">
                <div className="classTitle">
                    <h2> <b> Training Details </b> </h2>
                </div>
                <br/>

                {
                    access?.find(element => element === "add-training") ?
                        <Button>
                            <AddBoxIcon
                                fontSize="large"
                                className={classes.BackGround}
                                onClick={openAdd}
                            />
                        </Button> : null
                }

                <input type="search" placeholder="search" value={search} onChange={(e) => {setSearch(e.target.value); globalsearch(e.target.value)}} />

                <Paper className="paperStyle">
                    <TableContainer sx={{ maxHeight: 440, maxWidth: 1200, marginLeft:5 }}>
                        <Table sx={{ minWidth: 700 }} aria-label="customized table">
                            <TableHead className="tableheader">
                                <TableCell className="tblhd" align="left">
                                    Training ID
                                </TableCell>
                                <TableCell className="tblhd" align="left">
                                    Training Module
                                </TableCell>
                                <TableCell className="tblhd" align="left">
                                    Training Type
                                </TableCell>
                                <TableCell className="tblhd" align="left">
                                    Training Mode
                                </TableCell>
                                <TableCell className="tblhd" align="left">
                                    Actions
                                </TableCell>
                            </TableHead>

                            <TableBody>
                                {
                                    trainingDetails
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((value, index) => (
                                        <TableRow key={index} className={index % 2 ? "classEven" : "classOdd"}>
                                            <TableCell  align="left">
                                                {value.id}
                                            </TableCell>
                                            <TableCell  align="left">
                                                {value.trainingModule?.id} - {value.trainingModule?.trainingTopic} -    {value.trainingModule?.trainingLevel}
                                            </TableCell>
                                            <TableCell  align="left">
                                                {value.trainingType}
                                            </TableCell>
                                            <TableCell  align="left">
                                                {value.trainingMode}
                                            </TableCell>
                                            <TableCell align="left">
                                                <div className="tableClass">

                                                    {
                                                        access?.find(element => element === "get-training") ?
                                                            <InfoIcon
                                                                color="primary"
                                                                style={{cursor: "pointer", marginRight: 10}}
                                                                onClick={() => infoOpen(value)}
                                                            /> : null
                                                    }

                                                    {
                                                        access?.find(element => element === "update-training") ?
                                                            <EditIcon
                                                                color="primary"
                                                                style={{cursor: "pointer", marginRight: 10}}
                                                                onClick={() => editOpen(value)}
                                                            /> : null
                                                    }

                                                    {
                                                        access?.find(element => element === "soft-delete-training") ?
                                                            <DeleteIcon
                                                                style={{cursor:"pointer"}}
                                                                className="deleteClass"
                                                                color="error"
                                                                onClick={() => deactivateTraining(value.id)}
                                                            /> : null
                                                    }

                                                    {
                                                        access?.find(element => element === "get-training") ?
                                                            <PeopleIcon
                                                                color="primary"
                                                                style={{cursor: "pointer", marginLeft: 10}}
                                                                onClick={() => traineeInfoOpen(value.listOfAgents)}
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
                            count={trainingDetails.length}
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
                    <Modal.Title> Add Training Details </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                        <TrainingAdd close={closeAdd} modules={moduleDetails} getAll={getAllTrainings} modes={mode} types={type} agents={agents} />
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
                        <TrainingInfo data={infoRecord} />
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
                        <TrainingEdit close={editClose}  modules={moduleDetails} agents={agents} getAll={getAllTrainings} record={updateDetails} setRecord={setUpdateDetails} modes={mode} types={type}  />
                    </div>
                </Modal.Body>
            </Modal>

            <Modal
                show={traineeInfo}
                onHide={traineeInfoClose}
                centered
                size="lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title>  Trainees Details </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                        <h4> Enrolled Agents </h4>
                        <Table>
                            <TableHead>
                                <TableCell> Agent ID </TableCell>
                                <TableCell> Agent Name </TableCell>
                            </TableHead>
                            <TableBody>
                                {
                                    trainee.map((val, index) => (
                                        <TableRow key={index}>
                                            <TableCell> {val.agent?.id} </TableCell>
                                            <TableCell> {val.agent?.client?.givenName}{val?.client?.surName} </TableCell>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default TrainingDetails;
