import React, {useEffect, useState} from 'react';
import InsuranceApi from "../../Service/InsuranceApi";
import {Modal, Table} from "react-bootstrap";
import {MdOutlineViewInAr} from "react-icons/md";

const ListEmployee = (props) => {

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
            <div >
                <div className="card card-lg shadow-lg p-3 mb-5 bg-body rounded">
                    <div className="card-body">
                        <Table striped bordered>
                            <thead>
                            <tr>
                                <td> Employee Name </td>
                                <td> Employee ID </td>
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
                {...props}
                show={empmodal}
                onHide={hideempmodal}
                centered
                dialogClassName="modal-100w"
                aria-labelledby="example-custom-modal-styling-title"
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
                            <td> Date of Birth </td>
                            <td> Highest Qualification </td>
                            <td> Communication Mode </td>
                            <td> Proof </td>
                            <td> Proof ID </td>
                            <td> Available Date </td>
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
