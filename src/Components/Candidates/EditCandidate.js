import React, {useEffect, useState} from 'react';
import insuranceApi from "../../Service/InsuranceApi";
import {FloatingLabel, Form, Modal} from "react-bootstrap";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import {DatePicker, DateTimePicker, LocalizationProvider} from "@mui/lab";
import {TextField} from "@mui/material";
import InsuranceApi from "../../Service/InsuranceApi";
import {GrDocumentPdf} from "react-icons/gr";
import moment from "moment";



const EditCandidate = (
    {
        open,
        close,
        record,
        setRecord,
        proofs,
        communications,
        degrees, getall
    }
) => {
    const [employees, setEmployees] = useState([]);
    useEffect(() => {
        insuranceApi.getEmployees().then((res) =>{
            setEmployees(res.data);
        })
            .catch((error) => {
                console.log(error);
            });
        InsuranceApi.getParameterRule("S0001").then((res) => {
            setStatus(res.data);
        })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const [status, setStatus] = useState([]);

    const updateCandidate = (id) => {
        const body =
            {
                name: record.name,
                mobileNumber : record.mobileNumber,
                email : record.email,
                dateOfBirth: moment(record.dateOfBirth).format("MM-DD-YYYY"),
                communication: record.communication,
                proof: record.proof,
                proofId: record.proofId,
                availableDateAndTime: moment(record.availableDateAndTime).format("MM-DD-YYYY HH:mm"),
                highestQualification: record.highestQualification,
                employee: record.employee,
                currentStatus: record.currentStatus
            }
        InsuranceApi.updatecandidate(id, body).then((respo) => {
            console.log(respo.data);
            getall();
        })
            .catch((error) => {
                console.log(error);
            })
    }

    const editChange = (e) => {
        const { value, id } = e.target;
        setRecord({ ...record, [id]: value });
    };

    const dateChange = (date) =>{
        setRecord({...record, dateOfBirth: date});
    }

    const dateAndTimeChange = (date) =>{
        setRecord({...record, availableDateAndTime: date});
    }


    return (
        <div>
            <Modal
                show={open}
                onHide={close}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    {/*<GrDocumentPdf*/}
                    {/*    style={{cursor:"pointer", color:"red", marginRight:20}}*/}
                    {/*    onClick={() => window.print()}*/}
                    {/*/>*/}

                </Modal.Header>

                <Modal.Body>
                    <Form className="container" >
                        <Form.Group>

                            <div className="row">
                                <div className="col">
                            <FloatingLabel
                                controlId="floatingInput"
                                style={{color:"red"}}
                                className="mb-3"
                                label="Name"
                            >
                                <Form.Control type="text" value={record?.name} placeholder="Candidate Name" id="name" onChange={(e) => editChange(e)}  />
                            </FloatingLabel></div>

                                <div className="col">
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Mobile Number"
                                style={{color:"red"}}
                                className="mb-3"

                            >
                                <Form.Control type="number" value={record?.mobileNumber} placeholder="Mobile Number" id="mobileNumber" onChange={(e) => editChange(e)} />
                            </FloatingLabel></div> </div>


                            <div className="row">
                                <div className="col">
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Email address"
                                style={{color:"red"}}
                                className="mb-3"
                            >
                                <Form.Control type="email" placeholder="Email address" value={record?.email} id="email" onChange={(e) =>editChange(e)}/>
                            </FloatingLabel></div>


                                <div className="col">
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    inputFormat="dd-MM-yyyy"
                                    id="dateOfBirth"
                                    label="Date of Birth"
                                    style={{color:"red"}}
                                    value={record?.dateOfBirth}
                                    onChange={(date) => dateChange(date)}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider></div> </div>

                            <p> </p>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Highest Qualification"
                                style={{color:"red"}}
                                className="mb-3"

                            >
                                <Form.Select
                                    id="highestQualification"
                                    value={record?.highestQualification}
                                    onChange={(e) => editChange(e)}
                                >
                                    {
                                        degrees.map((value) => (
                                            <option value={value}> {value} </option>
                                        ))
                                    }

                                </Form.Select>
                            </FloatingLabel>

                            <FloatingLabel controlId="floatingSelect" label="Proof">
                                <Form.Select
                                    id="proof"
                                    value={record?.proof}
                                    style={{color:"red"}}
                                    onChange={(e) => editChange(e)}
                                >
                                    {
                                        proofs.map((value) => (
                                            <option value={value}> {value} </option>
                                        ))
                                    }

                                </Form.Select>
                            </FloatingLabel>

                            <br/>

                            <FloatingLabel
                                controlId="floatingInput"
                                label="Proof's ID"
                                style={{color:"red"}}
                                className="mb-3"

                            >
                                <Form.Control type="text" value={record?.proofId}  onChange={(e) => editChange(e)} placeholder="Proof's ID" id="proofId" />
                            </FloatingLabel>

                            <div className="row">
                                <div className="col">
                            <FloatingLabel controlId="floatingSelect" label="Preferred Mode of Communication">
                                <Form.Select
                                    id="communication"
                                    style={{color:"red"}}
                                    value={record?.communication}
                                    onChange={(e) => editChange(e)}
                                >
                                    {
                                        communications.map((value) => (
                                            <option value={value}> {value} </option>
                                        ))
                                    }
                                </Form.Select>
                            </FloatingLabel> </div>



                                <div className="col">
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DateTimePicker
                                    inputFormat="dd-MM-yyyy HH:mm"
                                    label="Available Date and Time"
                                    id="availableDateAndTime"
                                    value={record?.availableDateAndTime}
                                    style={{color:"red"}}
                                    onChange={(date) => dateAndTimeChange(date)}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider></div> </div>

                            <p> </p>

                            <FloatingLabel
                                controlId="floatingInput"
                                label="Assigned Employee"
                                style={{color:"red"}}
                                className="mb-3"
                            >
                                <Form.Select
                                    id="employee"
                                    style={{color:"red"}}
                                    value={record?.employee}
                                    onChange={(e) => editChange(e)}
                                >
                                    <option> </option>
                                    {
                                        employees.map((value) => (
                                            <option value={value.id}> {value.employeeName} </option>
                                        ))
                                    }
                                </Form.Select>
                            </FloatingLabel>

                            <FloatingLabel
                                controlId="floatingInput"
                                label="Application Status"
                                style={{color:"red"}}
                                className="mb-3"
                            >
                                <Form.Select
                                    id="currentStatus"
                                    style={{color:"red"}}
                                    value={record?.currentStatus}
                                    onChange={(e) => editChange(e)}
                                >
                                    {
                                        status.map((value) => (
                                            <option value={value}> {value} </option>
                                        ))
                                    }
                                </Form.Select>
                            </FloatingLabel>
                        </Form.Group>
                        <button
                            className="btn"
                            style={{color:"whitesmoke", backgroundColor:"red"}}
                            onClick={() => updateCandidate(record.id)}
                        >
                            Submit
                        </button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default EditCandidate;
