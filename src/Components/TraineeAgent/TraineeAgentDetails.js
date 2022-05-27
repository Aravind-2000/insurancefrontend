import React, {useEffect, useState} from 'react';
import InsuranceApi from "../../Service/InsuranceApi";
import AddBoxIcon from "@mui/icons-material/AddBox";
import TableCell from "@mui/material/TableCell";
import {
    Button,
    makeStyles, Paper,
    Table,
    TableBody,
    TableHead,
    TablePagination
} from "@material-ui/core";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import InfoIcon from "@mui/icons-material/Info";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import moment from "moment";
import {Modal} from "react-bootstrap";
import TraineeAgentAdd from "./TraineeAgentAdd";
import TraineeAgentInfo from "./TraineeAgentInfo";
import TraineeAgentEdit from "./TraineeAgentEdit";
import axios from "axios";
import {InputAdornment, TextField} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";


const useStyles = makeStyles((theme) => ({
    BackGround: {
        backgroundColor: "#d50000",
        color: "white",
    },
}));
const TraineeAgentDetails = () => {

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

    useEffect(() => {
        getAllTrainees()
        getAllTrainings()
        getAgents()
        getStatus()
        getPayStatus()
    }, []);


    const [traineeAgents, setTraineeAgents] = useState([]);
    const [trainings, setTrainings] = useState([]);
    const [agents, setAgents] = useState([]);
    const [status, setStatus] = useState([]);
    const [payStatus, setPayStatus] = useState([]);
    const [updateDetails, setUpdateDetails] = useState("");
    const [infoRecord, setInfoRecord] = useState("");

    const getAllTrainees = () => {
        InsuranceApi.getAllAgentTrainees().then((res) => {
            setTraineeAgents(res.data)
        }).catch(err => console.log(err))
    }

    const getAllTrainings = () => {
        InsuranceApi.getAllTrainings().then((res) => {
            setTrainings(res.data)
        }).catch(err => console.log(err))
    }

    const getAgents = () => {
        InsuranceApi.getAgents(sessionStorage.getItem("userid")).then((res) => {
            setAgents(res.data)
        }).catch(err => console.log(err))
    }

    const getStatus = () => {
        InsuranceApi.getParameterRule("TR001").then((res) => {
            setStatus(res.data)
        }).catch(err => console.log(err))
    }

    const getPayStatus = () => {
        InsuranceApi.getParameterRule("PY001").then((res) => {
            setPayStatus(res.data)
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


    const deactivateTraining = (id) => {
        if( window.confirm("Do you want to delete this trainee ? ")){
            InsuranceApi.deactivateTrainee(id).then((res) => {
                getAllTrainees()
            }).catch(err => console.log(err))
        }
    }

    const [search, setSearch] = useState("");
    const globalsearch = (val) =>{
        val === "" ? getAllTrainees() : axios.get(`http://localhost:8090/traineeagent/search/${val}`,{
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            }
        }).then((res) => {
            setTraineeAgents(res.data);
        })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <div>
            <div className="container">
                <div className="classTitle">
                    <h2> <b> Agent Trainee Details </b> </h2>
                </div>
                <br/>
                {
                    access?.find(element => element === "add-trainee") ?
                        <Button>
                            <AddBoxIcon
                                fontSize="large"
                                className={classes.BackGround}
                                onClick={openAdd}
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
                                <TableCell className="tblhd" align="left">
                                    Trainee ID
                                </TableCell>
                                <TableCell className="tblhd" align="left">
                                    Training
                                </TableCell>
                                <TableCell className="tblhd" align="left">
                                    Agent ID
                                </TableCell>
                                <TableCell className="tblhd" align="left">
                                    Agent Name
                                </TableCell>
                                <TableCell className="tblhd" align="left">
                                    Training Status
                                </TableCell>
                                <TableCell className="tblhd" align="left">
                                    Actions
                                </TableCell>
                            </TableHead>

                            <TableBody>
                                {
                                    traineeAgents
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((value, index) => (
                                            <TableRow key={index} className={index % 2 ? "classEven" : "classOdd"}>
                                                <TableCell  align="left">
                                                    {value.id}
                                                </TableCell>
                                                <TableCell  align="left">
                                                    {value.training?.trainingModule?.trainingTopic} - {value.training?.trainingModule?.trainingLevel}
                                                </TableCell>
                                                <TableCell  align="left">
                                                    {value.agent?.id}
                                                </TableCell>
                                                <TableCell  align="left">
                                                    {value.agent?.client?.givenName} {value.agent?.client?.surName}
                                                </TableCell>
                                                <TableCell  align="left">
                                                    {value.trainingStatus}
                                                </TableCell>
                                                <TableCell>
                                                <div className="tableClass">

                                                    {
                                                        access?.find(element => element === "get-trainee-agent") ?
                                                            <InfoIcon
                                                                color="primary"
                                                                style={{cursor: "pointer", marginRight: 10}}
                                                                onClick={() => infoOpen(value)}
                                                            /> : null
                                                    }

                                                    {
                                                        access?.find(element => element === "update-trainee-agent") ?
                                                            <EditIcon
                                                                color="primary"
                                                                style={{cursor: "pointer", marginRight: 10}}
                                                                onClick={() => editOpen(value)}
                                                            /> : null
                                                    }

                                                    {
                                                        access?.find(element => element === "soft-delete-trainee-agent") ?
                                                            <DeleteIcon
                                                                style={{cursor:"pointer"}}
                                                                className="deleteClass"
                                                                color="error"
                                                                onClick={() => deactivateTraining(value.id)}
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
                            count={traineeAgents.length}
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
                    <Modal.Title> Add Agent Trainee Details </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                        <TraineeAgentAdd close={closeAdd} getAll={getAllTrainees} trainings={trainings}  pay={payStatus} status={status} agents={agents} />
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
                    <Modal.Title>  Trainee Agent Details </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                        <TraineeAgentInfo data={infoRecord}/>
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
                        <TraineeAgentEdit close={editClose} getAll={getAllTrainees} record={updateDetails} pay={payStatus} setRecord={setUpdateDetails} trainings={trainings} status={status} agents={agents} />
                    </div>
                </Modal.Body>
            </Modal>

        </div>
    );
};

export default TraineeAgentDetails;
