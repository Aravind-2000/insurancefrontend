import React, {useState, useEffect} from 'react';
import {FloatingLabel, Form, Modal} from "react-bootstrap";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import {DatePicker, DateTimePicker, LocalizationProvider} from "@mui/lab";
import {TextField} from "@mui/material";
import {GrDocumentPdf} from "react-icons/gr";
import InsuranceApi from "../../Service/InsuranceApi";



const ViewCandidate = (
    {
        open,
        close,
        record,
        setRecord
    }
) => {

    const [employee, setEmployee] = useState([]);

    useEffect(() => {
       InsuranceApi.getEmployees().then((res) => {
           setEmployee(res.data);
       })
           .catch((error) => {
               console.log(error);
           })
    }, []);




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
                    <GrDocumentPdf
                        style={{cursor:"pointer", color:"red", marginRight:20}}
                        onClick={() => window.print()}
                    />

                </Modal.Header>

                <Modal.Body>
                    <Form className="container" >
                        <Form.Group>
                            <FloatingLabel
                                controlId="floatingInput"
                                style={{color:"purple"}}
                                className="mb-3"
                                label="Name"
                            >
                                <Form.Control type="text" value={record.name} placeholder="Candidate Name" id="name"   readOnly/>
                            </FloatingLabel>

                            <FloatingLabel
                                controlId="floatingInput"
                                label="Mobile Number"
                                style={{color:"purple"}}
                                className="mb-3"

                            >
                                <Form.Control type="number" value={record.mobileNumber} placeholder="Mobile Number" id="mobileNumber"  readOnly/>
                            </FloatingLabel>


                            <FloatingLabel
                                controlId="floatingInput"
                                label="Email address"
                                style={{color:"red"}}
                                className="mb-3"
                            >
                                <Form.Control type="email" placeholder="Email address" value={record.email} id="email" readOnly/>
                            </FloatingLabel>


                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    inputFormat="dd-MM-yyyy"
                                    id="dateOfBirth"
                                    label="Date of Birth"
                                    style={{color:"purple"}}
                                    value={record.dateOfBirth}
                                    readOnly
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>

                            <p> </p>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Highest Qualification"
                                style={{color:"purple"}}
                                className="mb-3"

                            >
                                <Form.Control type="text" value={record.highestQualification} placeholder= "Highest Qualification" id="highestQualification"  readOnly/>
                            </FloatingLabel>

                            <FloatingLabel controlId="floatingSelect" label="Proof">
                                <Form.Select
                                    id="proof"
                                    value={record.proof}
                                    style={{color:"purple"}}
                                    disabled
                                >
                                    <option/>
                                    <option value="AADHAR">Aadhar Card</option>
                                    <option value="PAN">Pan Card</option>
                                    <option value="VOTER_ID">Voter's ID</option>
                                </Form.Select>
                            </FloatingLabel>

                            <br/>

                            <FloatingLabel
                                controlId="floatingInput"
                                label="Proof's ID"
                                style={{color:"purple"}}
                                className="mb-3"

                            >
                                <Form.Control type="text" value={record.proofId}  placeholder="Proof's ID" id="proofId" readOnly/>
                            </FloatingLabel>

                            <FloatingLabel controlId="floatingSelect" label="Preferred Mode of Communication" style={{color:"red"}}>
                                <Form.Select
                                    id="communication"
                                    style={{color:"red"}}
                                    value={record.communication}
                                    disabled
                                >
                                    <option/>
                                    <option value="MOBILE">Through phone call or SMS</option>
                                    <option value="WHATSAPP"> Via Whatsapp</option>
                                    <option value="EMAIL">Via E-Mail</option>
                                </Form.Select>
                            </FloatingLabel>

                            <p> </p>

                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DateTimePicker
                                    inputFormat="dd-MM-yyyy HH:mm"
                                    label="Available Date and Time"
                                    id="availableDateAndTime"
                                    value={record.availableDateAndTime}
                                    style={{color:"red"}}
                                    readOnly
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>

                            <p> </p>

                            <FloatingLabel
                                controlId="floatingInput"
                                label="Assigned Employee"
                                style={{color:"red"}}
                                className="mb-3"
                            >
                                <Form.Control id="employee" style={{color:"red"}}  value={record.employee} readOnly/>

                            </FloatingLabel>

                            <FloatingLabel
                                controlId="floatingInput"
                                label="Application Status"
                                style={{color:"red"}}
                                className="mb-3"
                            >
                                <Form.Control id="currentStatus" style={{color:"red"}}  value={record.currentStatus} readOnly/>
                            </FloatingLabel>
                        </Form.Group>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default ViewCandidate;
