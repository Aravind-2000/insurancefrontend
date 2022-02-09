import React, {useEffect, useState} from 'react';
import InsuranceApi from "../../Service/InsuranceApi";
import {Table} from "react-bootstrap";
import ViewCandidate from "./ViewCandidate";
import {MdViewList} from "react-icons/md";
import {AiFillEdit} from "react-icons/ai";
import EditCandidate from "./EditCandidate";

const ListCandidates = () => {

    const [candidates, setCandidates] = useState([]);
    const [candidaterecord, setCandidaterecord] = useState("");


    const [view, setView] = useState(false);
    const handleformview = (id) => {
        InsuranceApi.getcandidatebyid(id).then((res) => {
            setCandidaterecord(res.data);
            console.log(res.data);
        })
            .catch((error) => {
                console.log(error);
            })
        setView(true);
    }
    const hideeformview = () =>setView(false);

    const [edit, setEdit] = useState(false);
    const handleformedit = (id) => {
        InsuranceApi.getcandidatebyid(id).then((res) => {
            setCandidaterecord(res.data);
            console.log(res.data);
        })
            .catch((error) => {
                console.log(error);
            })
        setEdit(true);
    }
    const hideformedit = () =>setEdit(false);


    useEffect(() => {
        InsuranceApi.getCandidates().then((res) => {
            setCandidates(res.data);
        })
            .catch((error) => {
                console.log(error);
            })
    }, []);


    return (
        <div>
            <br /> <br /> <br />
            <div >
                <div className="container container-md container-sm container-lg container-xl">
                <Table striped bordered className="sm md lg xl">
                    <thead>
                    <tr>
                        <td> Name </td>
                        <td> Mobile Number </td>
                        <td> E-Mail </td>
                        <td> Current Status of Candidate </td>
                        <td> Actions </td>
                    </tr>
                    </thead>

                    <tbody>
                    {
                        candidates.map((value, index) => (
                            <tr key={index}>
                                <td> {value.name}</td>
                                <td> {value.mobileNumber} </td>
                                <td> {value.email} </td>
                                <td> {value.currentStatus} </td>
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
                            </tr>
                        ))
                    }
                    </tbody>
                </Table>
                </div>
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
            />
        </div>
    );
};

export default ListCandidates;