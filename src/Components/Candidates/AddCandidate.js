import React, {useEffect, useState} from 'react';
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
    const [proofs, setProofs] = useState([]);
    const [communications, setCommunications] = useState([]);
    const [degree, setDegree] = useState([]);

    useEffect(() => {
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


    const saveCandidate = (e) => {
        e.preventDefault();

       const dateOfBirth = moment(dateofBirth).format("MM-DD-YYYY")

        const availableDateAndTime =  moment(appointment).format(
            "MM-DD-YYYY HH:mm"
        )

       const candidate = {name, mobileNumber, email,  dateOfBirth , communication, proof, proofId, availableDateAndTime, highestQualification, resume };

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
        // window.location.reload();
    }


    // Upload file method 1
    let resume = []
    const uploadResume = async (e) => {
        resume = await getAsByteArray(e.target.files[0])
        console.log(resume, "input")
    }

    async function getAsByteArray(file) {
        return new Uint8Array(await readFile(file))
    }

    async function readFile(file) {
        return new Promise((resolve, reject) => {
            // Create file reader
            let reader = new FileReader()
            // Register event listeners
            reader.addEventListener("loadend", e => resolve(e.target.result))
            reader.addEventListener("error", reject)
            // Read file
            reader.readAsArrayBuffer(file)
        })
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
                        style={{color:"red"}}
                        className="mb-3"
                        label="Enter your name ......"
                    >
                        <Form.Control type="text" placeholder="Candidate Name"  id={name} style={{color:"red"}}  onChange={(e) => setName(e.target.value)} required/>
                    </FloatingLabel> </div>  </div>



                    <div className="row">
                        <div className="col"> <h6> Enter your personal details such as name, email, date of birth and mobile number.  </h6> </div>
                        <div className="col ">
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Enter your mobile number......"
                        style={{color:"red"}}
                        className="mb-3"
                    >
                        <Form.Control type="number" placeholder="Mobile Number" id={mobileNumber} style={{color:"red"}} onChange={(e) => setMobileNumber(e.target.value)} required/>
                    </FloatingLabel> </div> </div>


                    <div className="row">
                        <div className="col"> </div>
                        <div className="col">
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Email address"
                        style={{color:"red"}}
                        className="mb-3"
                    >
                        <Form.Control type="email" placeholder="Email address" id={email} style={{color:"red"}} onChange={(e) =>setEmail(e.target.value)} required/>
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
                            style={{color:"red"}}
                            value={dateofBirth}
                            onChange={(date) => setDateofBirth(date)}
                            renderInput={(params) => <TextField {...params} />}
                            required
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
                                    style={{color:"red"}}
                                    className="mb-3"
                                >
                                    <Form.Select
                                        id={highestQualification}
                                        value={highestQualification}
                                        style={{color:"red"}}
                                        onChange={(e) => setHighestQualification(e.target.value)}
                                        required
                                    >
                                        <option> Select your option </option>
                                        {
                                            degree.map((value) => (
                                                <option value={value}> {value} </option>
                                            ))
                                        }
                                    </Form.Select>


                                </FloatingLabel>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col"> <h6> Provide us your education details </h6> </div>
                            <div className="col">
                                <FloatingLabel
                                    controlId="floatingInput"
                                    label="Institution of your highest qualification"
                                    style={{color:"red"}}
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
                                    style={{color:"red"}}
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
                                <FloatingLabel controlId="floatingSelect" label="Proof" style={{color:"red"}}>
                                    <Form.Select
                                        id={proof}
                                        onChange={(e) => setProof(e.target.value)}
                                        style={{color:"red"}}
                                        required
                                    >
                                        <option> Select your option </option>
                                        {
                                            proofs.map((value) => (
                                                <option value={value}> {value} </option>
                                            ))
                                        }
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
                        style={{color:"red"}}
                        className="mb-3"
                    >
                        <Form.Control type="text" placeholder="Proof's ID" style={{color:"red"}} id={proofId} onChange={(e) => setProofId(e.target.value)} required/>
                            </FloatingLabel> </div> </div> </div>

                    <br/><br/>
                    <div>
                    <div className="row">
                        <div className="col"> <h3> Communication Mode and Availability </h3> </div>
                        <div className="col">
                    <FloatingLabel controlId="floatingSelect" label="Preferred Mode of Communication" style={{color:"red"}}>
                        <Form.Select
                            id={communication}
                            value={communication}
                            style={{color:"red"}}
                            onChange={(e) => setCommunication(e.target.value)}
                            required
                        >
                            <option> Select your option </option>
                            {
                                communications.map((value) => (
                                    <option value={value}> {value} </option>
                                ))
                            }
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
                            inputFormat="dd-MM-yyyy HH:mm"
                            label="Available Date and Time"
                            value={appointment}
                            style={{color:"red"}}
                            onChange={(date) => setAppointment(date)}
                            renderInput={(params) => <TextField {...params} />}
                            required
                        />
                    </LocalizationProvider> </div> </div>
                    </div>

                    <p/>
                    <div className="row">
                        <div className="col"> Upload your resume </div>
                        <div className="col">
                            <input
                                type="file"
                                id="file"
                                onChange={(e) => uploadResume(e)}
                            />
                        </div>
                    </div>

                    <br/>
                </Form.Group>
<hr/>

                        <div className="container">
                <Button
                    className="btn"
                    style={{background:"red", color:"whitesmoke", marginLeft: 1200}}
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
                        style={{color:"whitesmoke", background:"red"}}
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
