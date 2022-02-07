import React,{useState} from 'react';
import {Form, FloatingLabel, Modal, Button} from "react-bootstrap";
import InsuranceApi from "../../Service/InsuranceApi";
import {DatePicker, DateTimePicker, LocalizationProvider} from "@mui/lab";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { TextField} from "@mui/material";
import moment from "moment";


const AddCandidate = () => {

    const [name, setName] = useState(" ");
    const [mobileNumber, setMobileNumber] = useState(" ");
    const [email, setEmail] = useState(" ");
    const [dateofBirth, setDateofBirth] = useState(" ");
    const [communication, setCommunication] = useState(" ");
    const [proof, setProof] = useState(" ");
    const [proofId, setProofId] = useState(" ");
    const [appointment, setAppointment] = useState(" ");
    const [highestQualification, setHighestQualification] = useState(" ");


    const saveCandidate = () => {

       const dateOfBirth = moment(dateofBirth).format("DD-MM-YYYY")

        const availableDateAndTime =  moment(appointment).format(
            "DD-MM-YYYY HH:mm"
        )

       const candidate = {name, mobileNumber, email,  dateOfBirth , communication, proof, proofId, availableDateAndTime, highestQualification };

       InsuranceApi.addCandidate(candidate).then((res) => {
           console.log(res.data);
       })
           .catch((error) => {
               console.log(error);
           })

        hidemodal();
    }


    const [modal, setModal] = useState(false);
    const showmodal = () => {
        setModal(true);
    }
    const hidemodal = () => {
        setModal(false);
        window.location.reload();
    }


    return (
        <div>
            <br/> <br/> <br/> <br/> <br/>
            <div className="container">


                    <Form className="container">
                <Form.Group>

                    <div>
                    <div className="row">

                        <div className="col"> <h3> Personal Details </h3> </div>

                        <div className="col">
                    <FloatingLabel
                        controlId="floatingInput"
                        style={{color:"purple"}}
                        className="mb-3"
                        label="Enter your name ......"
                    >
                        <Form.Control type="text" placeholder="Candidate Name" id={name} onChange={(e) => setName(e.target.value)} />
                    </FloatingLabel> </div>  </div>


                    <div className="row">
                        <div className="col"> <h6> Enter your personal details such as name, email, date of birth and mobile number.  </h6> </div>
                        <div className="col">
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Enter your mobile number......"
                        style={{color:"purple"}}
                        className="mb-3"
                    >
                        <Form.Control type="number" placeholder="Mobile Number" id={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} />
                    </FloatingLabel> </div> </div>


                    <div className="row">
                        <div className="col"> </div>
                        <div className="col">
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Email address"
                        style={{color:"purple"}}
                        className="mb-3"
                    >
                        <Form.Control type="email" placeholder="Email address" id={email} onChange={(e) =>setEmail(e.target.value)} />
                    </FloatingLabel> </div> </div>


                        <div className="row">
                            <div className="col"> </div>
                            <div className="col">
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            inputFormat="dd/MM/yyyy"
                            id="dateOfJoin"
                            name="dateOfJoin"
                            label="Date of Birth"
                            style={{color:"purple"}}
                            value={dateofBirth}
                            onChange={(date) => setDateofBirth(date)}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider> </div> </div> </div>

<br/> <br/> <br/>

                    <div>

                        <div className="row">
                            <div className="col"> <h3> Education Details </h3> </div>
                            <div className="col">
                                <FloatingLabel
                                    controlId="floatingInput"
                                    label="Highest Qualification"
                                    style={{color:"purple"}}
                                    className="mb-3"
                                >
                                    <Form.Control type="text" placeholder= "Highest Qualification" id={highestQualification} onChange={(e) =>setHighestQualification(e.target.value)} />
                                </FloatingLabel>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col"> <h6> Provide us your education details </h6> </div>
                            <div className="col">
                                <FloatingLabel
                                    controlId="floatingInput"
                                    label="Institution of your highest qualification"
                                    style={{color:"purple"}}
                                    className="mb-3"
                                >
                                    <Form.Control type="text" placeholder= "Highest Qualification" />
                                </FloatingLabel>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">  </div>
                            <div className="col">
                                <FloatingLabel
                                    controlId="floatingInput"
                                    label="Overall Percentage"
                                    style={{color:"purple"}}
                                    className="mb-3"
                                >
                                    <Form.Control type="number" placeholder= "Highest Qualification" />
                                </FloatingLabel>
                            </div>
                        </div>
                    </div>


                    <br/> <br/>


                    <div>

                        <div className="row">

                            <div className="col"> <h3>   Identity Proof  </h3> </div>
                            <div className="col">
                                <FloatingLabel controlId="floatingSelect" label="Proof">
                                    <Form.Select
                                        id={proof}
                                        onChange={(e) => setProof(e.target.value)}
                                        style={{color:"purple"}}
                                    >
                                        <option/>
                                        <option value="AADHAR">Aadhar Card</option>
                                        <option value="PAN">Pan Card</option>
                                        <option value="VOTER_ID">Voter's ID</option>
                                    </Form.Select>
                                </FloatingLabel></div>
                            <div className="row"> <h6> Select any of the listed proof available here </h6></div>
                            </div>

                        <div className="row">
                            <div className="col"> </div>
                            <div className="col">
                            <FloatingLabel
                        controlId="floatingInput"
                        label="Proof's ID"
                        style={{color:"purple"}}
                        className="mb-3"
                    >
                        <Form.Control type="text" placeholder="Proof's ID" id={proofId} onChange={(e) => setProofId(e.target.value)} />
                            </FloatingLabel> </div> </div> </div>

                    <br/><br/>
                    <div>
                    <div className="row">
                        <div className="col"> <h3> Communication Mode and Availability </h3> </div>
                        <div className="col">
                    <FloatingLabel controlId="floatingSelect" label="Preferred Mode of Communication">
                        <Form.Select
                            id={communication}
                            style={{color:"purple"}}
                            onChange={(e) => setCommunication(e.target.value)}
                        >
                            <option/>
                            <option value="MOBILE">Through phone call or SMS</option>
                            <option value="WHATSAPP"> Via Whatsapp</option>
                            <option value="EMAIL">Via E-Mail</option>
                        </Form.Select>
                    </FloatingLabel> </div>
                        <div className="row"> <h6> Please provide us a specific date and time so that our staff will  </h6> </div>
                        <div className="row"> <h6> connect you through your preferred mode. </h6> </div>
                    </div>


                        <div className="row">
                            <div className="col"> </div>
                            <div className="col">
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DateTimePicker
                            label="Available Date and Time"
                            value={appointment}
                            style={{color:"purple"}}
                            onChange={(date) => setAppointment(date)}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider> </div> </div>
                    </div>
                    <br/>
                </Form.Group>
<hr/>

                        <div className="container">
                <Button
                    className="btn"
                    style={{background:"purple", color:"whitesmoke", marginLeft: 1200}}
                    onClick={showmodal}
                    >
                    Submit
                </Button> </div>
                        <br/><br/>
            </Form>

            </div>
            
            <Modal
                show={modal}
                onHide={hidemodal}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Body>
                    <h6> Thanks for applying with our company. Soon our company staff will reach you out. </h6>
                    <h6>  For queries reach us at queriesFutura@futurainstech.com </h6>
                </Modal.Body>
                <Modal.Footer>

                    <button
                        className="btn"
                        style={{color:"purple"}}
                        onClick={(e) => saveCandidate(e)}
                    >
                        Okay
                    </button>
                </Modal.Footer>
            </Modal>
            
            
        </div>
    );

};



export default AddCandidate;
