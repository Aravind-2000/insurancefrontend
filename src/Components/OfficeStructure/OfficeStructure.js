import React, {useState, useEffect} from 'react';
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Paper } from "@mui/material";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddBoxIcon from "@mui/icons-material/AddBox";
import OfficeStructureEdit from "./OfficeStructureEdit";
import OfficeStructureAdd from  "./OfficeStructureAdd";
import {makeStyles, TablePagination} from "@material-ui/core";
import {Modal} from "react-bootstrap";
import moment from "moment";



const useStyles = makeStyles((theme) => ({
    BackGround: {
        backgroundColor: "#d50000",
        color: "white",
    },
}));

const OfficeStructure = () => {

    const access = JSON.parse(sessionStorage.getItem("specialaccess"))
    const classes = useStyles();
    //UseEffect for Get all API , and  Get office param level
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


    const [officeLevels, setOfficeLevels] = useState([]);
    const [companys, setCompanys] = useState([]);

    useEffect(() => {
        getData();
        getCompanys();
        getOfficeLevels();
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

            <Paper className="paperStyle" >
                <TableContainer sx={{ maxHeight: 440, maxWidth: 1200, marginLeft:5 }}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead className="tableheader">
                            <TableRow className="tablerow">
                                <TableCell className="tblhd" align="left">Office Id</TableCell>
                                <TableCell className="tblhd" align="left">Office Name</TableCell>
                                <TableCell className="tblhd" align="left">Company Name</TableCell>
                                <TableCell className="tblhd" align="left">Office Status</TableCell>
                                <TableCell className="tblhd" align="left">Action</TableCell>
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
                                    <TableCell align="left">{value.officeStatus}</TableCell>
                                    <TableCell align="left">
                                        <div style={{ display: "flex" }}>
                                            {/*<VisibilityIcon*/}
                                            {/*    color="success"*/}
                                            {/*    onClick={() => infoClickOpen(value)}*/}
                                            {/*/>*/}
                                            <EditIcon
                                                color="primary"
                                                style={{cursor:"pointer"}}
                                                onClick={() => editClickOpen(value)}
                                            />
                                            <DeleteIcon
                                                color="error"
                                                style={{cursor:"pointer"}}
                                                onClick={() => handleDeactivate(value.officeId)}
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
                            OfficeLevels={officeLevels}
                            company={companys}
                            setCompany={setCompanys}
                        />

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
                            close={editClickClose}
                            getAll={getData}
                            OfficeLevels={officeLevels}
                            company={companys}
                        />
                    </div>
                </Modal.Body>
            </Modal>

        </div>
    );
};

export default OfficeStructure;
