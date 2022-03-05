import React, {useEffect, useState} from 'react';
import InsuranceApi from "../../Service/InsuranceApi";
import {Modal, Table} from "react-bootstrap";
import {MdOutlineViewInAr} from "react-icons/md";

const ListEmployee = () => {

    const [employees, setEmployees] = useState([]);
    const [candidates, setAssignedcandidates] = useState([]);

    const [empmodal, setEmpmodal] = useState(false);
    const showempmodal = (id) => {
        InsuranceApi.getEmployeeById(id).then((resp) => {
            setAssignedcandidates(resp.data.assignedCandidates);
        })
            .catch((error) => {
                console.log(error);
            });
        setEmpmodal(true);
    }
    const hideempmodal = () => setEmpmodal(false);


    useEffect(() => {
        getAllEmployee();
    }, []);

    const getAllEmployee = () => {
        InsuranceApi.getEmployees().then((res) => {
            setEmployees(res.data);

        })
            .catch((error) => {
                console.log(error);
            })
    }


    return (
        <div>
            <br /> <br /> <br />
            <div className="container" >
                <div className="card card-lg shadow-lg p-3 mb-5 bg-body rounded">
                    <div className="card-body">
                        <Table striped bordered>
                            <thead>
                            <tr>
                                <td> Employee Name </td>
                                <td> Employee ID </td>
                                <td> Employee E-Mail </td>
                                <td> Employee Designation </td>
                                <td> Assigned Candidates </td>
                            </tr>
                            </thead>

                            <tbody>
                            {
                                employees.map((value, index) => (
                                    <tr key={index}>
                                        <td> {value.employeeName}</td>
                                        <td> {value.employeeId} </td>
                                        <td> {value.employeeEmail} </td>
                                        <td> {value.employeeDesignation} </td>
                                        <td>
                                            <MdOutlineViewInAr
                                                onClick={() => showempmodal(value.id)}
                                                style={{cursor:"pointer"}}
                                            />
                                        </td>
                                    </tr>
                                ))
                            }
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>

            <Modal
                show={empmodal}
                onHide={hideempmodal}
                centered
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
            >
                <Modal.Header closeButton>
                    <Modal.Title > Assigned Candidates </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Table striped bordered>
                        <thead>
                        <tr>
                            <td> Name </td>
                            <td> Mobile Number </td>
                            <td> E-Mail </td>
                            <td> Highest Qualification </td>
                            <td> Communication Mode </td>
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
                                    <td> {value.highestQualification} </td>
                                    <td> {value.communication} </td>
                                    <td> {value.currentStatus} </td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </Table>


                </Modal.Body>

            </Modal>

        </div>
    );
};

export default ListEmployee;
