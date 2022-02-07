import React, {useEffect, useState} from 'react';
import InsuranceApi from "../../Service/InsuranceApi";
import {Table} from "react-bootstrap";

const ListCandidates = () => {

    const [candidates, setCandidates] = useState([]);

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
                <div className="card card-lg shadow-lg p-3 mb-5 bg-body rounded">
                    <div className="card-body">
                <Table striped bordered>
                    <thead>
                    <tr>
                        <td> Name </td>
                        <td> Mobile Number </td>
                        <td> E-Mail </td>
                        <td> Date of Birth </td>
                        <td> Highest Qualification </td>
                        <td> Communication Mode </td>
                        <td> Proof </td>
                        <td> Proof ID </td>
                        <td> Available Date </td>
                        <td> Assigned Employee </td>
                        <td> Current Status of Candidate </td>
                    </tr>
                    </thead>

                    <tbody>
                    {
                        candidates.map((value, index) => (
                            <tr key={index}>
                                <td> {value.name}</td>
                                <td> {value.mobileNumber} </td>
                                <td> {value.email} </td>
                                <td> {
                                 value.dateOfBirth
                                } </td>
                                <td> {value.highestQualification} </td>
                                <td> {value.communication} </td>
                                <td> {value.proof} </td>
                                <td> {value.proofId} </td>
                                <td> {value.availableDateAndTime} </td>
                                <td> {value.employee} </td>
                                <td> {value.currentStatus} </td>
                            </tr>
                        ))
                    }
                    </tbody>
                </Table>
            </div>
                </div>
            </div>
        </div>
    );
};

export default ListCandidates;