import React, {useState, useEffect} from 'react';
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {InputAdornment, Paper, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddBoxIcon from "@mui/icons-material/AddBox";
import OfficeStructureEdit from "./OfficeStructureEdit";
import OfficeStructureAdd from  "./OfficeStructureAdd";
import {makeStyles, TablePagination} from "@material-ui/core";
import {Modal} from "react-bootstrap";
import moment from "moment";
import PeopleIcon from "@mui/icons-material/People";
import InfoIcon from "@mui/icons-material/Info";
import LocalConvenienceStoreIcon from '@mui/icons-material/LocalConvenienceStore';
import OfficeStructureInfo from "./OfficeStructureInfo";
import InsuranceApi from "../../Service/InsuranceApi";
import SearchIcon from "@mui/icons-material/Search";



const useStyles = makeStyles((theme) => ({
    BackGround: {
        backgroundColor: "#d50000",
        color: "white",
    },
}));

const OfficeStructure = () => {

    const access = JSON.parse(sessionStorage.getItem("specialaccess"))
    const classes = useStyles();
    const [data, setData] = useState([]);
    const [record, setRecord] = useState("");
    const getData = () => {
        axios
            .get(`http://localhost:8090/officestructure/getall/` + sessionStorage.getItem("userid"), {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                }
            })
            .then((resp) => {
                console.log(resp.data);
                setData(resp.data);
            })
            .catch((err) => console.log(err));
    };

    const getCompanys = () => {
        axios.get(`http://localhost:8090/company/getall/` + sessionStorage.getItem("userid"), {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            }
        }).then((res) => {
            setCompanys(res.data)
        }).catch((err) => console.log(err))
    }

    const getOfficeLevels = () => {
        axios.get(`http://localhost:8090/officeLevel/getall`).then((res) => {
            setOfficeLevels(res.data)
        }).catch((err) => console.log(err))
    }


    const [status, setStatus] = useState([]);
    const getStatus  = () => {
        InsuranceApi.getParameterRule("ST001").then((res) => {
            setStatus(res.data)
        }).catch(err => console.log(err))
    }


    const [officeLevels, setOfficeLevels] = useState([]);
    const [companys, setCompanys] = useState([]);

    useEffect(() => {
        getData();
        getCompanys();
        getOfficeLevels();
        getStatus()
    }, []);


    const handleDeactivate = (oldData) => {
        if(access.find(element => element === "soft-delete-office")){
            const confirm = window.confirm(
                "Are you sure, you want to delete this row",
                oldData
            );
            if (confirm) {
                axios
                    .patch(`http://localhost:8090/officestructure/softdelete/${oldData}`)
                    .then((resp) => {
                        console.log(resp);
                        getData();
                    });
            }
        }
        else{
            window.alert("UNAUTHORIZED")
        }
    };


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


    //Create two boolean states for each add and edit modal/dialog boxes
    const [addOpen, setAddOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [info, setInfo] = useState("");
    const [infoOpen, setInfoOpen] = useState(false);

    const handleClickOpen = () => {
        if(access.find(element => element === "add-office")){
            setAddOpen(true);
        }
       else{
           window.alert("UNAUTHORIZED")
        }
    };

    const handleClickClose = () => {

        setAddOpen(false);
    };

    const editClickOpen = (item) => {
        if(access.find(element => element === "update-office")){
            setRecord(item);
            setEditOpen(true);
        }
        else{
            window.alert("UNAUTHORIZED")
        }
    };

    const editClickClose = () => {
        setEditOpen(false);
    };

    const infoClickOpen = (item) => {
        setInfoOpen(true);
        setInfo(item);
    };

    const infoClickClose = () => {
        setInfoOpen(false);
    };

    const [agents, setAgents] = useState([]);
    const [downLevelAgents, setDownLevelAgents] = useState(false);
    const showDownLevel = (val) => {
        setAgents(val)
        setDownLevelAgents(true)
    }
    const hideDownLevel = () => {
        setDownLevelAgents(false)
    }

    const [offices, setOffices] = useState([]);
    const [downLevelOffices, setDownLevelOffices] = useState(false);
    const showDownLevelOffice = (val) => {
        setOffices(val)
        setDownLevelOffices(true)
    }
    const hideDownLevelOffice = () => {
        setDownLevelOffices(false)
    }

    const [search, setSearch] = useState("");
    const globalsearch = (val) =>{
        val === "" ? getData() : axios.get(`http://localhost:8090/officestructure/search/${val}`, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            }
        }).then((res) => {
            setData(res.data);
        })
            .catch((err) => {
                console.log(err)
            })
    }


    return (
        <div>
        <div className="container">
            <div className="classTitle">
                <h2> <b> Office Details </b> </h2>
            </div>
<br/>
            <Button>
                <AddBoxIcon
                    fontSize="large"
                    className={classes.BackGround}
                    onClick={handleClickOpen}
                />
            </Button>
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

            <Paper className="paperStyle" >
                <TableContainer sx={{ maxHeight: 440, maxWidth: 1200, marginLeft:5 }}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead className="tableheader">
                            <TableRow className="tablerow">
                                <TableCell className="tblhd" align="left">Office Id</TableCell>
                                <TableCell className="tblhd" align="left">Office Name</TableCell>
                                <TableCell className="tblhd" align="left">Company Name</TableCell>
                                <TableCell className="tblhd" align="left">Up Level Office ID </TableCell>
                                <TableCell className="tblhd" align="center">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((value, index) => (
                                <TableRow key={index} className={index % 2 ? "classEven" : "classOdd"}>
                                    <TableCell align="left">{value.officeId}</TableCell>
                                    <TableCell align="left">{value.officeName}</TableCell>
                                    <TableCell align="left"> {value?.company?.companyId} - {value?.company?.companyName}</TableCell>
                                    <TableCell align="left">{ value.upLevelOfficeId !== null ? value.upLevelOfficeId  : "NULL"}</TableCell>
                                    <TableCell align="left">
                                        <div style={{ display: "flex" }}>
                                            <InfoIcon
                                                color="primary"
                                                style={{cursor:"pointer"}}
                                                onClick={() => infoClickOpen(value)}
                                            />
                                            <EditIcon
                                                color="primary"
                                                style={{cursor:"pointer",  marginLeft: 10}}
                                                onClick={() => editClickOpen(value)}
                                            />
                                            <DeleteIcon
                                                color="error"
                                                style={{cursor:"pointer",  marginLeft: 10}}
                                                onClick={() => handleDeactivate(value.officeId)}
                                            />
                                            <PeopleIcon
                                                color="primary"
                                                style={{cursor: "pointer", marginLeft: 10}}
                                                onClick={() => showDownLevel(value.agents)}
                                            />
                                            <LocalConvenienceStoreIcon
                                                color="primary"
                                                style={{cursor: "pointer", marginLeft: 10}}
                                                onClick={() => showDownLevelOffice(value.downLevelOffice)}
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
                        count={data.length}
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

            <Modal show={addOpen} onHide={handleClickClose} centered size="xl">

                    <Modal.Header closeButton>
                        <Modal.Title> Add Office Structure </Modal.Title>
                    </Modal.Header>

                <Modal.Body>
                    <div className="container">
                        <OfficeStructureAdd
                            close={handleClickClose}
                            getAll={getData}
                            data={data}
                            status={status}
                            OfficeLevels={officeLevels}
                            company={companys}
                            setCompany={setCompanys}
                        />
                    </div>
                </Modal.Body>
            </Modal>


            <Modal show={infoOpen} onHide={infoClickClose} centered size="lg">

                <Modal.Header closeButton>
                    <Modal.Title>  Office Information </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className="container">
                        <OfficeStructureInfo data={info}/>
                    </div>
                </Modal.Body>
            </Modal>

            <Modal show={editOpen} onHide={editClickClose} centered size="lg">

                    <Modal.Header closeButton> <Modal.Title> Edit Office Structure</Modal.Title></Modal.Header>

                <Modal.Body>
                    <div className="container">
                        <OfficeStructureEdit
                            record={record}
                            setRecord={setRecord}
                            data={data}
                            status={status}
                            close={editClickClose}
                            getAll={getData}
                            OfficeLevels={officeLevels}
                            company={companys}
                        />
                    </div>
                </Modal.Body>
            </Modal>

            <Modal show={downLevelAgents} onHide={hideDownLevel} centered size="lg">
                <Modal.Header closeButton> <Modal.Title>  Agents in this Office </Modal.Title></Modal.Header>
                <Modal.Body>
                    <div className="container">
                        <Table>
                            <TableHead>
                                <TableCell> Agent ID </TableCell>
                                <TableCell> Agent Name </TableCell>
                            </TableHead>
                            <TableBody>
                                {
                                    agents.map((val, index) => (
                                        <TableRow key={index}>
                                            <TableCell> {val.id} </TableCell>
                                            <TableCell> {val.client?.givenName} {val.client?.surName} </TableCell>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </div>
                </Modal.Body>
            </Modal>


            <Modal show={downLevelOffices} onHide={hideDownLevelOffice} centered size="lg">
                <Modal.Header closeButton> <Modal.Title>  Down Level Offices </Modal.Title></Modal.Header>
                <Modal.Body>
                    <div className="container">
                        <Table>
                            <TableHead>
                                <TableCell> Office ID </TableCell>
                                <TableCell> Office Name </TableCell>
                            </TableHead>
                            <TableBody>
                                {
                                    offices.map((val, index) => (
                                        <TableRow key={index}>
                                            <TableCell> {val.officeId} </TableCell>
                                            <TableCell> {val.officeName}  </TableCell>
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

export default OfficeStructure;
