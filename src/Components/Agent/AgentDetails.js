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

    useEffect(() => {
        getallAgents()
        getAllClients()
        getallEmps()
        getpayemthod()
        getagentType()
    }, []);



    const getallAgents = () => {
        InsuranceApi.getAgents().then((res) => {
            setAgents(res.data)
        }).catch((err) => {console.log(err)})
    }

    const getAllClients = () => {
        InsuranceApi.getAllClients().then((res) => {
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
        InsuranceApi.getParameterRule("AT001").then((res) => {
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
        setAdd(true)
    }
    const addClose = () => {
        setAdd(false)
    }

    //Edit Open
    const [record, setRecord] = useState("");
    const [edit, setEdit] = useState(false);
    const editOpen = (item) => {
        setRecord(item)
        setEdit(true)
    }
    const editClose = () => {
        setEdit(false);
    }

    //Delete
    const deleteAgent = (id) => {
        InsuranceApi.deleteAgent(id).then((res) => {
            getallAgents()
        }).catch((err) => {console.log(err)})

    }

    const [search, setSearch] = useState("");
    const globalsearch = (val) =>{
        val === "" ? getallAgents() : axios.get(`http://localhost:8090/agent/search/${val}`).then((res) => {
            setAgents(res.data);
        })
            .catch((err) => {
                console.log(err)
            })

    }

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
                <input type="search" placeholder="search" value={search} onChange={(e) => {setSearch(e.target.value); globalsearch(e.target.value)}} />
                <Paper className="paperStyle">
                    <TableContainer sx={{ maxHeight: 440, maxWidth: 1200, marginLeft:5 }}>
                        <Table sx={{ minWidth: 700 }} aria-label="customized table">
                            <TableHead className="tableheader">
                                <TableRow className="tablerow">
                                    <TableCell className="tblhd" align="left">
                                        Name
                                    </TableCell>
                                    <TableCell className="tblhd" align="left">
                                        Date Appointed
                                    </TableCell>
                                    <TableCell className="tblhd" align="left">
                                        Distribution Channel
                                    </TableCell>
                                    <TableCell className="tblhd" align="left">
                                        Branch
                                    </TableCell>
                                    <TableCell className="tblhd" align="left">
                                        Area Code
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
                                            <TableRow key={index}>
                                                <TableCell align="left">{value.client?.givenName} {value.client?.surName} </TableCell>
                                                <TableCell align="left">{moment(value.dateAppointed).format("DD-MM-YYYY")}</TableCell>
                                                <TableCell align="left">{value.distributionChannel}</TableCell>
                                                <TableCell align="left">{value.branch}</TableCell>
                                                <TableCell align="left">{value.areaCode}</TableCell>
                                                <TableCell align="left">
                                                    <div className="TableClass">
                                                        <EditIcon
                                                            color="primary"
                                                            style={{cursor:"pointer", marginRight:10}}
                                                            onClick={() => editOpen(value)}
                                                        />
                                                        <DeleteIcon
                                                            style={{cursor:"pointer"}}
                                                            className="deleteClass"
                                                            color="error"
                                                            onClick={() => deleteAgent(value.id)}
                                                        /> </div> </TableCell>
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

            <Modal
                show={add}
                onHide={addClose}
                centered
                size="lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title> Add Agent Details </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AgentAdd close={addClose} getall={getallAgents} clients={clients} setClients={setClients} employees={employees} paymethod={paymethod} agenttype={agenttype}/>
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
                    <AgentEdit close={editClose} getAll={getallAgents} record={record} setRecord={setRecord} clients={clients}  employees={employees} paymethod={paymethod} agenttype={agenttype} />
                </Modal.Body>
            </Modal>


        </div>
    );
};

export default AgentDetails;
