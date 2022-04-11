import React, {useEffect, useState} from 'react';
import InsuranceApi from "../../Service/InsuranceApi";
import {Table} from "react-bootstrap";
import ViewCandidate from "./ViewCandidate";
import {AiFillEdit} from "react-icons/ai";
import EditCandidate from "./EditCandidate";
import {TablePagination} from "@material-ui/core";
import "../Css/Content.css";
import {InputAdornment, OutlinedInput} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import moment from "moment";

const ListCandidates = () => {

    const access = JSON.parse(sessionStorage.getItem("specialaccess"))

    const [candidates, setCandidates] = useState([]);
    const [candidaterecord, setCandidaterecord] = useState("");
    const [proofs, setProofs] = useState([]);
    const [communications, setCommunications] = useState([]);
    const [degree, setDegree] = useState([]);

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


    const [view, setView] = useState(false);
    // const handleformview = (id) => {
    //     InsuranceApi.getcandidatebyid(id).then((res) => {
    //         setCandidaterecord(res.data);
    //         console.log(res.data);
    //     })
    //         .catch((error) => {
    //             console.log(error);
    //         })
    //     setView(true);
    // }
    const hideeformview = () =>setView(false);

    const [edit, setEdit] = useState(false);
    const handleformedit = (id) => {
        if(access.find(element => element === "get-candidate")){
            InsuranceApi.getcandidatebyid(id).then((res) => {
                setCandidaterecord(res.data);
                console.log(res.data);
            })
                .catch((error) => {
                    console.log(error);
                })
            setEdit(true);
        }
        else{
            window.alert("UNAUTHORIZED")
        }
    }
    const hideformedit = () =>setEdit(false);

    const getAllCandidates = () => {
        InsuranceApi.getCandidates().then((res) => {
            setCandidates(res.data);
        })
            .catch((error) => {
                console.log(error);
            });
    }

    useEffect(() => {

        getAllCandidates();
        InsuranceApi.getParameterRule("P0001").then((res) => {
            setProofs(res.data);
        })
            .catch((error) => {
                console.log(error)
            });

        InsuranceApi.getParameterRule("C0001").then((res) => {
            setCommunications(res.data);
        })
            .catch((error) => {
                console.log(error)
            });

        InsuranceApi.getParameterRule("E0001").then((res) => {
            setDegree(res.data);
        })
            .catch((error) => {
                console.log(error)
            });
    }, []);

    const [search, setSearch] = useState("");

    function getByNameLike(val){
        console.log(val, "value");
         val === "" ? getAllCandidates() : InsuranceApi.seacrhAll(val).then((res) => {
            setCandidates(res.data);
            console.log(res.data)
        })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <div>

            <br /> <br />
            <div >
                <div className="container container-md container-sm container-lg container-xl">
                    <div className="classTitle">
                        <h2> <b> Enrolled Candidates </b>  </h2> </div> <br/>
                    {/*<input type="search" placeholder="search" value={search} onChange={(e) => {setSearch(e.target.value); getByNameLike(e.target.value)}} />*/}
                    <OutlinedInput
                        className="outlinedInput"
                        type="text"
                        label="Search"
                        value={search}
                        onChange={(e) => {setSearch(e.target.value); getByNameLike(e.target.value)}}
                        endAdornment={
                            <InputAdornment position="end">
                                <SearchIcon/>
                            </InputAdornment>
                        }
                        fullwidth
                    />
                    <p/>  <br/>
                <Table  bordered className="sm md lg xl">
                    <thead className="tableheader">
                    <tr className="tablerow">
                        <td className="tblhd" align="left"> Name </td>
                        <td className="tblhd" align="left"> Mobile Number </td>
                        <td className="tblhd" align="left"> E-Mail </td>
                        <td className="tblhd" align="left"> Current Status of Candidate </td>
                        <td className="tblhd" align="left"> Result </td>
                        <td className="tblhd" align="left"> Actions </td>
                    </tr>
                    </thead>

                    <tbody>
                    {
                        candidates
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((value, index) => (
                            <tr key={index} className={index % 2 ? "classEven" : "classOdd"}>
                                <td> {value.name}</td>
                                <td> {value.mobileNumber} </td>
                                <td> {value.email} </td>
                                <td> {value.currentStatus} </td>
                                <td> {value.result} </td>
                                <td>
                                    {/*<MdViewList*/}
                                    {/*    style={{cursor:"pointer", marginLeft:10, color:"red"}}*/}
                                    {/*    onClick={() => handleformview(value.id)}*/}
                                    {/*    />*/}

                                    <AiFillEdit
                                        style={{cursor:"pointer", marginLeft:20, color:"red"}}
                                        onClick={() => handleformedit(value.id)}
                                    />
                                </td>
                            </tr
                                >
                        ))
                    }
                    </tbody>
                </Table>
                    <TablePagination
                        className="contentPagination"
                        rowsPerPageOptions={[5, 10, 25, 50, 100]}
                        component="div"
                        count={candidates.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                </div>
            </div>
            <br/>
            <div className="footerdescription">
                <h6 className="footerContent">
                    Copyright © www.futurainstech.com @{moment().format("YYYY")}
                </h6>
            </div>

            <ViewCandidate
                open={view}
                close={() => hideeformview()}
                record={candidaterecord}
                setRecord={setCandidaterecord}
            />

            <EditCandidate
                open={edit}
                close={() => hideformedit()}
                record = {candidaterecord}
                setRecord = {setCandidaterecord}
                proofs={proofs}
                communications={communications}
                degrees={degree}
                getall={getAllCandidates}
            />
        </div>
    );
};

export default ListCandidates;