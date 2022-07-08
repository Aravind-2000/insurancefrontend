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
import PeopleIcon from "@mui/icons-material/People";
import FileCopyIcon from '@mui/icons-material/FileCopy';
import moment from "moment";
import {Modal} from "react-bootstrap";
import DraggableComponent from "../../Service/DraggableComponent";
import PolicyHeaderAdd from "./PolicyHeaderAdd";
import PolicyHeaderEdit from "./PolicyHeaderEdit";
import PolicyHeaderInfo from "./PolicyHeaderInfo";
import PolicyHeaderCoverDetails from "./PolicyHeaderCoverDetails";
import PolicyHeaderClone from "./PolicyHeaderClone";





const useStyles = makeStyles((theme) => ({
    BackGround: {
        backgroundColor: "#d50000",
        color: "white",
    },
}));


const PolicyHeaderDetails = () => {



    const classes = useStyles();

    const access = JSON.parse(sessionStorage.getItem("specialaccess"))


    const [policyHeaders, setPolicyHeaders] = useState([]);
    const [companys, setCompanys] = useState([]);
    const [agents, setAgents] = useState([]);
    const [currencies, setCurrencies] = useState([]);
    const [coverageStatus, setCoverageStatus] = useState([]);
    const [productNames, setProductNames] = useState([]);


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


    const getAgents = () => {
        InsuranceApi.getAgents(sessionStorage.getItem("userid")).then((res) => {
            setAgents(res.data)
        }).catch(err => console.log(err))
    }

    const getPolicyHeaders = () => {
        InsuranceApi.getAllPolicyHeader().then((Res) => {
            setPolicyHeaders(Res.data)
        }).catch(err => console.log(err))
    }

    const getAllCurrencies = () => {
        InsuranceApi.getAllCurrCodes().then((res) => {
            setCurrencies(res.data)
        }).catch(err => console.log(err))
    }

    const getCoverageStatus = () => {
        InsuranceApi.getAllCoverageStatus().then((res) => {
            setCoverageStatus(res.data)
        }).catch(err => console.log(err))
    }

    const getProductNames = () => {
        InsuranceApi.getAllCoverageProductNames().then((res) => {
            setProductNames(res.data)
        }).catch(err => console.log(err))
    }


    useEffect(() => {
        getAgents()
        getPolicyHeaders()
        getCompanys()
        getAllCurrencies()
        getCoverageStatus()
        getProductNames()
    }, []);

    const [search, setSearch] = useState("");
    const globalsearch = (val) =>{
        val === "" ? getPolicyHeaders() : axios.get(`http://localhost:8090/policyheader/search/${val}`, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            }
        }).then((res) => {
            setPolicyHeaders(res.data);
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

    //PolicyCovers
    const [headerId, setHeaderId] = useState("");
    const [compId, setCompId] = useState("");
    const [polNum, setPolNum] = useState("");


    const [policyCovers, setPolicyCovers] = useState([]);
    const [covers, setCovers] = useState(false);
    const coverOpen  = (value, id, comId, polNo) => {
        setCovers(true)
        setHeaderId(id);
        setCompId(comId)
        setPolNum(polNo)
        setPolicyCovers(value)
    }
    const coversClose = () => {
        setCovers(false)
    }

    const deactivatePolicyHeader = (id) => {
        if( window.confirm("Do you want to delete this trainee ? ")){
            InsuranceApi.softPolicyHeader(id).then((res) => {
                getPolicyHeaders()
            }).catch(err => console.log(err))
        }
    }


    return (
        <div>
            <div className="container">
                <div className="classTitle">
                    <h2> <b> Policy Header Details </b> </h2>
                </div>
                <br/>
                {
                    access?.find(element => element === "add-policyheader") ?
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
                    access?.find(element=> element === "clone-policyheader") ?
                        <Button style={{marginLeft:800}}>
                            <FileCopyIcon
                                fontSize="medium"
                                className={classes.BackGround}
                                onClick={() => cloneOpen()}
                            />
                        </Button> : null
                }


                <Paper className="paperStyle">
                    <TableContainer sx={{ maxHeight: 440, maxWidth: 1200, marginLeft:5 }}>
                        <br/>
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
                                        Agent
                                    </TableCell>
                                    <TableCell className="tblhd" align="left">
                                        Policy Number
                                    </TableCell>
                                    <TableCell className="tblhd" align="left">
                                        Premium
                                    </TableCell>
                                    <TableCell className="tblhd" align="left">
                                        Actions
                                    </TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>

                                {
                                    policyHeaders
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((value, index) => (
                                            <TableRow key={index} className={index % 2 ? "classEven" : "classOdd"}>
                                                <TableCell align="left">{value.id}</TableCell>
                                                <TableCell align="left">{value.company?.companyName} </TableCell>
                                                <TableCell align="left">{value.agent?.client?.givenName} </TableCell>
                                                <TableCell align="left">{value.policyNumber} </TableCell>
                                                <TableCell align="left">{value.premium} </TableCell>
                                                <TableCell align="left">
                                                    <div className="TableClass">
                                                        {
                                                            access?.find(element => element === "get-policyheader") ?
                                                                <InfoIcon
                                                                    color="primary"
                                                                    style={{cursor: "pointer", marginRight: 10}}
                                                                    onClick={() =>infoOpen(value)}
                                                                /> : null
                                                        }

                                                        {
                                                            access?.find(element => element === "update-policyheader") ?
                                                                <EditIcon
                                                                    color="primary"
                                                                    style={{cursor: "pointer", marginRight: 10}}
                                                                    onClick={() =>editOpen(value)}
                                                                /> : null
                                                        }
                                                        {
                                                            access?.find(element => element === "soft-delete-policyheader") ?
                                                                <DeleteIcon
                                                                    style={{cursor:"pointer"}}
                                                                    className="deleteClass"
                                                                    color="error"
                                                                    onClick={() =>deactivatePolicyHeader(value.id)}
                                                                /> : null
                                                        }
                                                        {
                                                            access?.find(element => element === "get-policyheader") ?
                                                                <PeopleIcon
                                                                    color="primary"
                                                                    style={{cursor: "pointer", marginRight: 10}}
                                                                    onClick={() =>coverOpen(value.policyCovers, value.id, value.companyId, value.policyNumber)}
                                                                /> : null
                                                        }
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                }
                            </TableBody>
                        </Table>
                        <br/>
                        <TablePagination
                            className="contentPagination"
                            rowsPerPageOptions={[5, 10, 25, 50, 100]}
                            component="div"
                            count={policyHeaders.length}
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
                    <Modal.Title>  Policy Header Info </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                        <PolicyHeaderInfo data={infoDetails}/>
                    </div>
                </Modal.Body>
            </Modal>


            <Modal
                dialogAs={DraggableComponent}
                show={clone}
                onHide={cloneClose}
                size="sm"
            >
                <Modal.Header closeButton>
                    <Modal.Title>  Policy Header Clone </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                        <PolicyHeaderClone close={cloneClose} policyHeaders={policyHeaders} getAll={getPolicyHeaders}/>
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
                    <Modal.Title>  Policy Header Add </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                        <PolicyHeaderAdd currencies={currencies} getAll={getPolicyHeaders} close={addClose} agent={agents} company={companys}
                                         products={productNames} status={coverageStatus}/>
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
                    <Modal.Title>  Policy Header Edit </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                        <PolicyHeaderEdit currencies={currencies} getAll={getPolicyHeaders} close={editClose} agent={agents} company={companys}
                                          products={productNames} record={updateDetails} setRecord={setUpdateDetails} status={coverageStatus}/>
                    </div>
                </Modal.Body>
            </Modal>

            <Modal
                dialogAs={DraggableComponent}
                show={covers}
                onHide={coversClose}
                centered
                size="xl"
            >
                <Modal.Header closeButton>
                    <Modal.Title>  Policy Header Cover Details </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                        <PolicyHeaderCoverDetails headerId={headerId} companyId={compId} policyNumber={polNum} policyCover={policyCovers} setPolicyCover={setPolicyCovers}/>
                    </div>
                </Modal.Body>
            </Modal>

        </div>
    );
};

export default PolicyHeaderDetails;
