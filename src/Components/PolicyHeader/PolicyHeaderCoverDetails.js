import React, {useEffect, useState} from 'react';
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import InfoIcon from "@mui/icons-material/Info";
import DraggableComponent from "../../Service/DraggableComponent";
import {Modal} from "react-bootstrap";
import PolicyCoverInfo from "../PolicyCover/PolicyCoverInfo";
import {Button, makeStyles, TablePagination} from "@material-ui/core";
import AddBoxIcon from "@mui/icons-material/AddBox";
import PolicyCoverAdd from "../PolicyCover/PolicyCoverAdd";
import axios from "axios";
import InsuranceApi from "../../Service/InsuranceApi";


const useStyles = makeStyles((theme) => ({
    BackGround: {
        backgroundColor: "#d50000",
        color: "white",
    },
}));
const PolicyHeaderCoverDetails = ({policyCover, setPolicyCover, headerId, policyNumber, companyId, getAll}) => {
    const classes = useStyles();
    const access = JSON.parse(sessionStorage.getItem("specialaccess"))

    const [policyHeaders, setPolicyHeaders] = useState([]);
    const [companys, setCompanys] = useState([]);
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
        InsuranceApi.getPolicyCoverByHeader(headerId).then((Res) => {
            setPolicyCover(Res.data)
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
        getCoverageStatus()
        getCoverageNames()
    }, []);

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

    const [add, setAdd] = useState(false);
    const addOpen = () => {
        setAdd(true)
    }
    const addClose = () => {
        setAdd(false)
        getPolicyCovers()
        getAll()
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


    return (
        <div>

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

            <div className="container">
                    <TableContainer sx={{ maxHeight: 440, maxWidth: 1200 }}>
                        <br/>
                        <Table sx={{ minWidth: 700 }} aria-label="customized table">
                            <TableHead className="tableheader">
                                <TableRow className="tablerow">
                                    <TableCell className="tblhd" align="left">
                                        ID
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
                                    policyCover
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((value, index) => (
                                        <TableRow key={index}>
                                            <TableCell align="left">{value.id}</TableCell>
                                            <TableCell align="left">{value.coverageName?.statusDesc} </TableCell>
                                            <TableCell align="left">{value.life}</TableCell>
                                            <TableCell align="left">{value.coverage}</TableCell>
                                            <TableCell align="left">{value.rider}</TableCell>
                                            <TableCell align="left">
                                                <div className="TableClass">
                                                    <InfoIcon
                                                        color="primary"
                                                        style={{cursor: "pointer", marginRight: 10}}
                                                        onClick={() =>infoOpen(value)}
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
                            count={policyCover.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                        />
                    </TableContainer>
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
                        <PolicyCoverAdd  headerId={headerId} companyId1={companyId} policyNumber1={policyNumber}
                           coverages={coverageNames} status={coverageStatus} policyHeader={policyHeaders} company={companys} open1={add} close1={addClose}/>
                    </div>
                </Modal.Body>
            </Modal>


        </div>
    );
};

export default PolicyHeaderCoverDetails;
