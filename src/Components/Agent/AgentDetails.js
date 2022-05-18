import React, {useEffect, useState} from 'react';
import InsuranceApi from "../../Service/InsuranceApi";
import {Button, makeStyles, Paper, TableContainer, TablePagination, TableRow} from "@material-ui/core";
import AddBoxIcon from "@mui/icons-material/AddBox";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import {Modal} from "react-bootstrap";
import AgentAdd from "./AgentAdd";
import AgentEdit from "./AgentEdit";
import moment from "moment";
import {InputAdornment, OutlinedInput} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DraggableComponent from "../../Service/DraggableComponent";
import AgentInfo from "./AgentInfo";
import InfoIcon from "@mui/icons-material/Info";
import PeopleIcon from "@mui/icons-material/People";



const useStyles = makeStyles((theme) => ({
    BackGround: {
        backgroundColor: "#d50000",
        color: "white",
    },
}));

const AgentDetails = () => {

    const [agents, setAgents] = useState([]);
    const [clients, setClients] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [paymethod, setPaymethod] = useState([]);
    const [agenttype, setAgenttype] = useState([]);
    const [offices, setOffices] = useState([]);
    const [currencyType, setCurrencyType] = useState([]);
    const [payFrequency, setPayFrequency] = useState([]);
    const [invalids, setInvalids] = useState([]);
    const [ex, setEx] = useState([]);

    useEffect(() => {
        getallAgents()
        getAllClients()
        getallEmps()
        getpayemthod()
        getagentType()
        getOffices()
        getCurrency()
        getPayFrequency()
        getInvalidAgents()
        getExclusives()
    }, []);


    const getExclusives = () => {
        InsuranceApi.getParameterRule("EX001").then((res) => {
            setEx(res.data)
        }).catch((err) => console.log(err))
    }

    const getInvalidAgents = () => {
        axios.get(`http://localhost:8090/agent/getallinvalids`).then((res) => {
            console.log(res.data)
            setInvalids(res.data)
        }).catch((err) => console.log(err))
    }

    const getPayFrequency = () => {
        InsuranceApi.getParameterRule("PF001").then((res) => {
            setPayFrequency(res.data)
        }).catch((err) => console.log(err))
    }

    const getCurrency = () => {
        InsuranceApi.getParameterRule("CR001").then((res) => {
            setCurrencyType(res.data)
        }).catch((err) => console.log(err))
    }

    const getOffices = () => {
        axios.get(`http://localhost:8090/officestructure/getall/` + sessionStorage.getItem("userid"), {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            }
        }).then((res) => {
            setOffices(res.data)
        }).catch((err) => console.log(err))
    }

    const getallAgents = () => {
        InsuranceApi.getAgents(sessionStorage.getItem("userid")).then((res) => {
            setAgents(res.data)
        }).catch((err) => console.log(err))
    }

    const getAllClients = () => {
        InsuranceApi.getAllClients(sessionStorage.getItem("userid")).then((res) => {
            setClients(res.data)
        }).catch((err) => {console.log(err)})
    }

    const getallEmps = () => {
        InsuranceApi.getEmployees().then((res) => {
            setEmployees(res.data)
        }).catch((err) => {console.log(err)})
    }

    const getpayemthod = () => {
        InsuranceApi.getParameterRule("PM001").then((res) => {
            setPaymethod(res.data)
        }).catch((err) => {console.log(err)})
    }

    const getagentType = () => {
        InsuranceApi.getAllAgentType().then((res) => {
            setAgenttype(res.data)
        }).catch((err) => {console.log(err)})
    }
    const classes = useStyles();

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
        if(access.find(element => element === "add-agent")){
            setAdd(true)
        }
        else{
            window.alert("UNAUTHORIZED")
        }
    }
    const addClose = () => {
        setAdd(false)
    }

    //Edit Open
    const [record, setRecord] = useState("");
    const [edit, setEdit] = useState(false);
    const editOpen = (item) => {
        if(access.find(element => element === "update-agent")){
            setRecord(item)
            setEdit(true)
        }
        else{
            window.alert("UNAUTHORIZED")
        }
    }
    const editClose = () => {
        setEdit(false);
    }

    //Info
    const [infoRecord, setInfoRecord] = useState("");
    const [info, setInfo] = useState(false);
    const infoShow = (val) => {
        setInfoRecord(val)
        setInfo(true)
    }
    const infoHide = () => {
        setInfo(false)
    }

    //Down Level Agents
    const [downLevelAgents, setDownLevelAgents] = useState([]);
    const [downLevelModal, setDownLevelModal] = useState(false);
    const downLevelOpen = (arr) => {
        setDownLevelAgents(arr)
        setDownLevelModal(true)
    }
    const downLevelClose = () => {
        setDownLevelModal(false)
    }


    //Delete
    const deleteAgent = (id) => {
        if(access.find(element => element === "soft-delete-agent")){
            InsuranceApi.deleteAgent(id, sessionStorage.getItem("userid")).then((res) => {
                getallAgents()
            }).catch((err) => {console.log(err)})
        }
        else{
            window.alert("UNAUTHORIZED")
        }
    }

    const [search, setSearch] = useState("");
    const globalsearch = (val) =>{
        val === "" ? getallAgents() : axios.get(`http://localhost:8090/agent/search/${val}`, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            }
        }).then((res) => {
            setAgents(res.data);
        })
            .catch((err) => {
                console.log(err)
            })

    }

    const access = JSON.parse(sessionStorage.getItem("specialaccess"))


    return (
        <div>
            <div className="container">
                <div className="classTitle">
                    <h2> <b> Agent Details </b> </h2>
                </div>
                <br/>
                <Button>
                    <AddBoxIcon
                        fontSize="large"
                        className={classes.BackGround}
                        onClick={addOpen}
                    />
                </Button>
                {/*<input type="search" placeholder="search" value={search} onChange={(e) => {setSearch(e.target.value); globalsearch(e.target.value)}} />*/}
                <OutlinedInput
                    className="outlinedInput"
                    type="text"
                    label="Search"
                    value={search}
                    onChange={(e) => {setSearch(e.target.value); globalsearch(e.target.value)}}
                    endAdornment={
                        <InputAdornment position="end">
                            <SearchIcon/>
                        </InputAdornment>
                    }
                    fullwidth
                />
                <Paper className="paperStyle">
                    <TableContainer sx={{ maxHeight: 440, maxWidth: 1200, marginLeft:5 }}>
                        <Table sx={{ minWidth: 700 }} aria-label="customized table">
                            <TableHead className="tableheader">
                                <TableRow className="tablerow">
                                    <TableCell className="tblhd" align="left">
                                        Agent ID
                                    </TableCell>
                                    <TableCell className="tblhd" align="left">
                                        Name
                                    </TableCell>
                                    <TableCell className="tblhd" align="left">
                                       Actions
                                    </TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {
                                    agents
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((value, index) => (
                                            <TableRow key={index} className={index % 2 ? "classEven" : "classOdd"}>
                                                <TableCell align="left">{value.id}</TableCell>
                                                <TableCell align="left">{value.client?.givenName} {value.client?.surName} </TableCell>
                                                <TableCell align="left">
                                                    <div className="TableClass">

                                                        <EditIcon
                                                            color="primary"
                                                            style={{cursor: "pointer", marginRight: 10}}
                                                            onClick={() => editOpen(value)}
                                                        />

                                                        <DeleteIcon
                                                            style={{cursor:"pointer"}}
                                                            className="deleteClass"
                                                            color="error"
                                                            onClick={() => deleteAgent(value.id)}
                                                        />

                                                        <InfoIcon
                                                            color="primary"
                                                            style={{cursor: "pointer", marginLeft: 10}}
                                                            onClick={() => infoShow(value)}
                                                        />

                                                        <PeopleIcon
                                                            color="primary"
                                                            style={{cursor: "pointer", marginLeft: 10}}
                                                            onClick={() => downLevelOpen(value.downLevelAgents)}
                                                        />



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
                            count={agents.length}
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
                onHide={addClose}
                centered
                size="xl"
            >
                <Modal.Header closeButton>
                    <Modal.Title> Add Agent Details </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                        <AgentAdd close={addClose} Exclusives={ex} Invalid={invalids} Paying={payFrequency} Currency = {currencyType} Offices={offices}  getall={getallAgents} clients={clients} setClients={setClients} employees={employees} paymethod={paymethod} agenttype={agenttype}/>
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
                    <Modal.Title> Edit Agent Details </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                    <AgentEdit close={editClose} Exclusives={ex} Paying={payFrequency} Currency = {currencyType} Offices = {offices}  getAll={getallAgents} record={record} setRecord={setRecord} clients={clients}  employees={employees} paymethod={paymethod} agenttype={agenttype} />
                    </div>
                </Modal.Body>
            </Modal>

            <Modal
                show={info}
                onHide={infoHide}
                centered
                size="xl"
            >
                <Modal.Header closeButton>
                    <Modal.Title>  Agent Information </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                        <AgentInfo data={infoRecord}/>
                    </div>
                </Modal.Body>
            </Modal>

            <Modal
                show={downLevelModal}
                onHide={downLevelClose}
                centered
                size="lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title> Down Level Agents </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">

                        <Table>
                            <TableHead>
                                <TableCell> Agent ID </TableCell>
                                <TableCell> Agent Name </TableCell>
                                <TableCell> Info  </TableCell>
                            </TableHead>
                            <TableBody>
                                {
                                    downLevelAgents.map((val, index) => (
                                        <TableRow key={index}>
                                            <TableCell> {val.id} </TableCell>
                                            <TableCell> {val.client?.givenName} {val.client?.surName} </TableCell>
                                            <TableCell>
                                                <InfoIcon
                                                    color="primary"
                                                    style={{cursor: "pointer", marginLeft: 10}}
                                                    onClick={() => infoShow(val)}
                                                />
                                            </TableCell>
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

export default AgentDetails;
