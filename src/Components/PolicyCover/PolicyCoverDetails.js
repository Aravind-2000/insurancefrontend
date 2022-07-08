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
import DraggableComponent from "../../Service/DraggableComponent";
import PolicyCoverAdd from "./PolicyCoverAdd";
import PolicyCoverEdit from "./PolicyCoverEdit";
import PolicyCoverInfo from "./PolicyCoverInfo";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import PolicyCoverClone from "./PolicyCoverClone";







const useStyles = makeStyles((theme) => ({
    BackGround: {
        backgroundColor: "#d50000",
        color: "white",
    },
}));

const PolicyCoverDetails = () => {


    const classes = useStyles();

    const access = JSON.parse(sessionStorage.getItem("specialaccess"))


    const [policyHeaders, setPolicyHeaders] = useState([]);
    const [companys, setCompanys] = useState([]);
    const [policyCovers, setPolicyCovers] = useState([]);
    const [coverageStatus, setCoverageStatus] = useState([]);
    const [coverageNames, setCoverageNames] = useState([]);


    const getCompanys= () => {
        axios
            .get(`http://localhost:8090/company/getall/` + sessionStorage.getItem("userid"), {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                }
            })
            .then((resp) => {
                setCompanys(resp.data);
            })
            .catch((err) => console.log(err));
    };
    const getPolicyHeaders = () => {
        InsuranceApi.getAllPolicyHeader().then((Res) => {
            setPolicyHeaders(Res.data)
        }).catch(err => console.log(err))
    }
    const getPolicyCovers = () => {
        InsuranceApi.getAllPolicyCover().then((res) => {
            setPolicyCovers(res.data)
        }).catch(err => console.log(err))
    }

    const getCoverageStatus = () => {
        InsuranceApi.getAllCoverageStatus().then((res) => {
            setCoverageStatus(res.data)
        }).catch(err => console.log(err))
    }

    const getCoverageNames = () => {
        InsuranceApi.getAllCoverageProductNames().then((res) => {
            setCoverageNames(res.data)
        }).catch(err => console.log(err))
    }

    useEffect(() => {
        getPolicyHeaders()
        getCompanys()
        getPolicyCovers()
        getCoverageStatus()
        getCoverageNames()
    }, []);

    const [search, setSearch] = useState("");
    const globalsearch = (val) =>{
        val === "" ? getPolicyCovers() : axios.get(`http://localhost:8090/policycover/search/${val}`, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            }
        }).then((res) => {
            setPolicyCovers(res.data);
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

    const [clone, setClone] = useState(false);
    const cloneOpen = () => {
        setClone(true)
    }
    const cloneClose = () => {
        setClone(false)
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

    const deactivatePolicyCover = (id) => {
        if( window.confirm("Do you want to delete this trainee ? ")){
            InsuranceApi.softPolicyCover(id).then((res) => {
                getPolicyCovers()
            }).catch(err => console.log(err))
        }
    }


    return (
        <div>

            <div className="container">


                <div className="classTitle">
                    <h2> <b> Policy Cover Details </b> </h2>
                </div>
                <br/>
                {
                    access?.find(element => element === "add-policycover") ?
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

                {
                    access?.find(element=> element === "clone-policycover") ?
                        <Button style={{marginLeft:800}}>
                            <FileCopyIcon
                                fontSize="medium"
                                className={classes.BackGround}
                                onClick={() => cloneOpen()}
                            />
                        </Button> : null
                }

                <Paper className="paperStyle">
                    <TableContainer sx={{ maxHeight: 440, maxWidth: 1200, marginLeft:5}}>
                        <Table sx={{ minWidth: 700 }} aria-label="customized table">
                            <TableHead className="tableheader">
                                <TableRow className="tablerow">
                                    <TableCell className="tblhd" align="left">
                                        ID
                                    </TableCell>
                                    <TableCell className="tblhd" align="left">
                                        Company
                                    </TableCell>
                                    <TableCell className="tblhd" align="left">
                                        Coverage Name
                                    </TableCell>
                                    <TableCell className="tblhd" align="left">
                                        Life
                                    </TableCell>
                                    <TableCell className="tblhd" align="left">
                                       Coverage
                                    </TableCell>
                                    <TableCell className="tblhd" align="left">
                                        Rider
                                    </TableCell>
                                    <TableCell className="tblhd" align="left">
                                        Actions
                                    </TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>

                                {
                                    policyCovers
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((value, index) => (
                                            <TableRow key={index} className={index % 2 ? "classEven" : "classOdd"}>
                                                <TableCell align="left">{value.id}</TableCell>
                                                <TableCell align="left">{value.company?.companyName} </TableCell>
                                                <TableCell align="left">{value.coverageName?.statusDesc} </TableCell>
                                                <TableCell align="left">{value.life}</TableCell>
                                                <TableCell align="left">{value.coverage}</TableCell>
                                                <TableCell align="left">{value.rider}</TableCell>
                                                <TableCell align="left">
                                                    <div className="TableClass">

                                                        {
                                                            access?.find(element => element === "get-policycover") ?
                                                                <InfoIcon
                                                                    color="primary"
                                                                    style={{cursor: "pointer", marginRight: 10}}
                                                                    onClick={() =>infoOpen(value)}
                                                                /> : null
                                                        }

                                                        {
                                                            access?.find(element => element === "update-policycover") ?
                                                                <EditIcon
                                                                    color="primary"
                                                                    style={{cursor: "pointer", marginRight: 10}}
                                                                    onClick={() =>editOpen(value)}
                                                                /> : null
                                                        }
                                                        {
                                                            access?.find(element => element === "soft-delete-policycover") ?
                                                                <DeleteIcon
                                                                    style={{cursor:"pointer"}}
                                                                    className="deleteClass"
                                                                    color="error"
                                                                    onClick={() =>deactivatePolicyCover(value.id)}
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
                            count={policyCovers.length}
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
                    <Modal.Title>  Policy Cover Info </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                        <PolicyCoverInfo data={infoDetails}/>
                    </div>
                </Modal.Body>
            </Modal>

            <Modal
                dialogAs={DraggableComponent}
                show={clone}
                onHide={cloneClose}
                size="lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title>  Clone Policy Cover  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                        <PolicyCoverClone policyCovers={policyCovers} getAll={getPolicyCovers} close={cloneClose}/>
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
                    <Modal.Title>  Policy Cover Add </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                        <PolicyCoverAdd status={coverageStatus} coverages={coverageNames} policyHeader={policyHeaders} company={companys} close={addClose} getAll={getPolicyCovers}/>
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
                    <Modal.Title>  Policy Cover Edit </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                        <PolicyCoverEdit policyHeader={policyHeaders} coverages={coverageNames} company={companys} status={coverageStatus}
                                         close={editClose} getAll={getPolicyCovers} record={updateDetails} setRecord={setUpdateDetails}/>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default PolicyCoverDetails;
